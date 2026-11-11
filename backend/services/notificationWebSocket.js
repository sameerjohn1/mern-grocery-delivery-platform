import { WebSocketServer, WebSocket } from "ws";
import Notification from "../models/Notification.js";
import { resolveUserFromToken } from "../middleware/authMiddleware.js";
import {
  notificationEvents,
  serializeNotification,
} from "./notificationService.js";

const WS_PATH = "/api/ws/notifications";
const HEARTBEAT_MS = 30_000;
const CATCH_UP_POLL_MS = 5_000;
const CATCH_UP_LIMIT = 50;

const socketsByUser = new Map();

const send = (socket, event, data) => {
  if (socket.readyState !== WebSocket.OPEN) return;
  socket.send(JSON.stringify({ event, data }));
};

const push = (socket, notification) => {
  if (!notification?.id || socket.sentIds.has(notification.id)) return;
  socket.sentIds.add(notification.id);
  send(socket, "notification", notification);
};

const handleBusNotification = (notification) => {
  const sockets = socketsByUser.get(notification?.recipient);
  if (!sockets) return;
  sockets.forEach((socket) => push(socket, notification));
};

const sendUnreadCount = async (socket, userId) => {
  let unreadCount = null;
  try {
    unreadCount = await Notification.countDocuments({
      recipient: userId,
      isRead: false,
    });
  } catch (error) {
    console.error("Notification socket unread count failed:", error.message);
  }

  send(socket, "connected", {
    success: true,
    connectedAt: new Date().toISOString(),
    unreadCount,
  });
};

// The in-process event bus delivers instantly on a single instance. The
// periodic catch-up keeps multi-instance deployments in sync.
const catchUp = async (socket, userId) => {
  if (socket.readyState !== WebSocket.OPEN) return;
  try {
    const notifications = await Notification.find({
      recipient: userId,
      createdAt: { $gte: socket.lastCheckedAt },
    })
      .sort({ createdAt: 1 })
      .limit(CATCH_UP_LIMIT);

    notifications.forEach((notification) => {
      socket.lastCheckedAt = notification.createdAt;
      push(socket, serializeNotification(notification));
    });
  } catch (error) {
    console.error("Notification socket catch-up failed:", error.message);
  }
};

const register = (userId, socket) => {
  if (!socketsByUser.has(userId)) socketsByUser.set(userId, new Set());
  socketsByUser.get(userId).add(socket);
};

const unregister = (userId, socket) => {
  const sockets = socketsByUser.get(userId);
  if (!sockets) return;
  sockets.delete(socket);
  if (sockets.size === 0) socketsByUser.delete(userId);
};

const rejectUpgrade = (socket, status, message) => {
  socket.write(`HTTP/1.1 ${status} ${message}\r\nConnection: close\r\n\r\n`);
  socket.destroy();
};

export const initNotificationWebSocket = (server) => {
  const wss = new WebSocketServer({ noServer: true });

  // Browsers cannot set headers on a WebSocket handshake, so the token is
  // passed as a query parameter (same contract as the SSE stream).
  server.on("upgrade", (request, socket, head) => {
    if (!request.url?.startsWith(WS_PATH)) {
      rejectUpgrade(socket, 404, "Not Found");
      return;
    }

    let token = null;
    try {
      token = new URL(request.url, "http://localhost").searchParams.get(
        "token",
      );
    } catch {
      token = null;
    }

    resolveUserFromToken(token)
      .then(({ user, error, status }) => {
        if (!user) {
          rejectUpgrade(socket, status || 401, "Unauthorized");
          return;
        }
        if (user.role !== "admin") {
          rejectUpgrade(socket, 403, "Forbidden");
          return;
        }

        wss.handleUpgrade(request, socket, head, (ws) => {
          wss.emit("connection", ws, request, user);
        });
      })
      .catch(() => rejectUpgrade(socket, 500, "Internal Server Error"));
  });

  wss.on("connection", (socket, request, user) => {
    const userId = user._id.toString();

    socket.sentIds = new Set();
    socket.lastCheckedAt = new Date();
    socket.isAlive = true;
    socket.on("pong", () => {
      socket.isAlive = true;
    });

    register(userId, socket);

    const catchUpTimer = setInterval(
      () => catchUp(socket, user._id),
      CATCH_UP_POLL_MS,
    );

    const cleanup = () => {
      clearInterval(catchUpTimer);
      unregister(userId, socket);
    };

    socket.on("close", cleanup);
    socket.on("error", cleanup);

    sendUnreadCount(socket, user._id);
  });

  const heartbeatTimer = setInterval(() => {
    wss.clients.forEach((socket) => {
      if (!socket.isAlive) {
        socket.terminate();
        return;
      }
      socket.isAlive = false;
      socket.ping();
    });
  }, HEARTBEAT_MS);

  wss.on("close", () => clearInterval(heartbeatTimer));

  notificationEvents.on("notification", handleBusNotification);

  return wss;
};
