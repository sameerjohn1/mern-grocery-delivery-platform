import express from "express";
import {
  authMiddleware,
  sseAuthMiddleware,
} from "../middleware/authMiddleware.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";
import {
  deleteNotification,
  getNotifications,
  getUnreadNotificationCount,
  markAllNotificationsAsRead,
  markNotificationAsRead,
  streamNotifications,
} from "../controllers/notificationController.js";

const router = express.Router();

router.get("/stream", sseAuthMiddleware, adminMiddleware, streamNotifications);

router.use(authMiddleware, adminMiddleware);

router.get("/", getNotifications);
router.get("/unread-count", getUnreadNotificationCount);
router.patch("/read-all", markAllNotificationsAsRead);
router.patch("/:id/read", markNotificationAsRead);
router.delete("/:id", deleteNotification);

export default router;
