import Notification from "../models/Notification.js";
import {
  notificationEvents,
  serializeNotification,
} from "../services/notificationService.js";

const handle = (fn) => async (req, res) => {
  try {
    await fn(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const parsePositiveInt = (value, fallback) => {
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};

export const getNotifications = handle(async (req, res) => {
  const page = parsePositiveInt(req.query.page, 1);
  const limit = Math.min(parsePositiveInt(req.query.limit, 20), 100);
  const filter = { recipient: req.user._id };
  if (req.query.unread === "true") filter.isRead = false;

  const [notifications, total, unreadCount] = await Promise.all([
    Notification.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit),
    Notification.countDocuments(filter),
    Notification.countDocuments({
      recipient: req.user._id,
      isRead: false,
    }),
  ]);

  res.status(200).json({
    success: true,
    notifications: notifications.map(serializeNotification),
    total,
    unreadCount,
    page,
    limit,
    totalPages: Math.max(Math.ceil(total / limit), 1),
  });
});

export const getUnreadNotificationCount = handle(async (req, res) => {
  const unreadCount = await Notification.countDocuments({
    recipient: req.user._id,
    isRead: false,
  });

  res.status(200).json({ success: true, unreadCount });
});

export const markNotificationAsRead = handle(async (req, res) => {
  const notification = await Notification.findOneAndUpdate(
    { _id: req.params.id, recipient: req.user._id },
    { isRead: true, readAt: new Date() },
    { new: true },
  );

  if (!notification) {
    return res
      .status(404)
      .json({ success: false, message: "Notification Not Found" });
  }

  res.status(200).json({
    success: true,
    message: "Notification marked as read",
    notification: serializeNotification(notification),
  });
});

export const markAllNotificationsAsRead = handle(async (req, res) => {
  const result = await Notification.updateMany(
    { recipient: req.user._id, isRead: false },
    { isRead: true, readAt: new Date() },
  );

  res.status(200).json({
    success: true,
    message: "All notifications marked as read",
    modifiedCount: result.modifiedCount,
  });
});

export const deleteNotification = handle(async (req, res) => {
  const notification = await Notification.findOneAndDelete({
    _id: req.params.id,
    recipient: req.user._id,
  });

  if (!notification) {
    return res
      .status(404)
      .json({ success: false, message: "Notification Not Found" });
  }

  res
    .status(200)
    .json({ success: true, message: "Notification Deleted Successfully" });
});

const STREAM_HEARTBEAT_MS = 25_000;
const STREAM_POLL_MS = 5_000;

export const streamNotifications = async (req, res) => {
  res.status(200);
  res.set({
    "Content-Type": "text/event-stream; charset=utf-8",
    "Cache-Control": "no-cache, no-transform",
    Connection: "keep-alive",
    "X-Accel-Buffering": "no",
  });
  res.flushHeaders?.();
  res.write("retry: 5000\n\n");

  const recipientId = req.user._id.toString();
  const sentIds = new Set();
  let lastCheckedAt = new Date();
  let closed = false;

  const send = (event, payload) => {
    if (closed) return;
    res.write(`event: ${event}\n`);
    res.write(`data: ${JSON.stringify(payload)}\n\n`);
  };

  const push = (notification) => {
    if (!notification?.id || sentIds.has(notification.id)) return;
    sentIds.add(notification.id);
    send("notification", notification);
  };

  const handleNotification = (notification) => {
    if (notification?.recipient !== recipientId) return;
    push(notification);
  };

  // The in-process event bus delivers instantly on a single instance. The
  // periodic catch-up keeps multi-instance/serverless deployments in sync.
  const catchUp = async () => {
    try {
      const notifications = await Notification.find({
        recipient: req.user._id,
        createdAt: { $gte: lastCheckedAt },
      })
        .sort({ createdAt: 1 })
        .limit(50);

      notifications.forEach((notification) => {
        lastCheckedAt = notification.createdAt;
        push(serializeNotification(notification));
      });
    } catch (error) {
      console.error("Notification stream catch-up failed:", error.message);
    }
  };

  let pollTimer = null;
  let heartbeatTimer = null;

  const cleanup = () => {
    if (closed) return;
    closed = true;
    if (pollTimer) clearInterval(pollTimer);
    if (heartbeatTimer) clearInterval(heartbeatTimer);
    notificationEvents.off("notification", handleNotification);
    res.end();
  };

  req.on("close", cleanup);
  req.on("aborted", cleanup);
  notificationEvents.on("notification", handleNotification);

  let unreadCount = null;
  try {
    unreadCount = await Notification.countDocuments({
      recipient: req.user._id,
      isRead: false,
    });
  } catch (error) {
    console.error("Notification unread count failed:", error.message);
  }

  if (closed) return;

  send("connected", {
    success: true,
    connectedAt: new Date().toISOString(),
    unreadCount,
  });

  pollTimer = setInterval(catchUp, STREAM_POLL_MS);
  heartbeatTimer = setInterval(() => {
    if (!closed) res.write(": ping\n\n");
  }, STREAM_HEARTBEAT_MS);
};
