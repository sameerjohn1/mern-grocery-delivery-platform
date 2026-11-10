import Notification from "../models/Notification.js";
import { serializeNotification } from "../services/notificationService.js";

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
