import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";

import {
  getAllOrders,
  getSingleOrder,
  updateOrderStatus,
  deleteOrder,
} from "../controllers/adminOrderController.js";

const router = express.Router();

router.get("/", authMiddleware, adminMiddleware, getAllOrders);
router.get("/:id", authMiddleware, adminMiddleware, getSingleOrder);
router.put("/:id/status", authMiddleware, adminMiddleware, updateOrderStatus);
router.delete("/:id", authMiddleware, adminMiddleware, deleteOrder);

export default router;
