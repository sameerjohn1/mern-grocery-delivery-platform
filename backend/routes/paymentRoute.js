import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  createCheckoutSession,
  verifyPayment,
} from "../controllers/paymentController.js";

const router = express.Router();

router.post("/create-session", authMiddleware, createCheckoutSession);
router.post("/verify-payment", authMiddleware, verifyPayment);

export default router;
