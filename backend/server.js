import express from "express";
import cors from "cors";
import "dotenv/config";
import uploadsDir from "./utils/uploadsDir.js";
import { connectDB } from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import uploadRoutes from "./routes/uploadRoute.js";
import categoryRoutes from "./routes/categoryRoute.js";
import productRoutes from "./routes/productRoute.js";
import featuredProductRoutes from "./routes/featuredProductRoute.js";
import cartRoutes from "./routes/cartRoute.js";
import addressRoutes from "./routes/addressRoute.js";
import orderRoutes from "./routes/orderRoute.js";
import paymentRoutes from "./routes/paymentRoute.js";
import adminRoutes from "./routes/adminRoutes.js";
import adminOrderRoutes from "./routes/adminOrderRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import { initNotificationWebSocket } from "./services/notificationWebSocket.js";

const PORT = process.env.PORT || 5000;
const app = express();

// Middlewares
app.disable("etag");
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(uploadsDir));

// API data is dynamic, so never let browsers/CDNs serve a stale 304 response
app.use((req, res, next) => {
  res.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  res.set("Pragma", "no-cache");
  res.set("Expires", "0");
  next();
});

// Ensure a database connection exists for every request (required on serverless)
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error("Database connection failed:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Database connection failed" });
  }
});

// Routes
app.use("/api/users", userRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/hookahs", featuredProductRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/address", addressRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/admin/orders", adminOrderRoutes);
app.use("/api/admin/notifications", notificationRoutes);

app.get("/", (req, res) => {
  res.send("API Working");
});

// Locally we start a long-running server. On Vercel, server.js is used as the
// handler, where WebSocket upgrades are unavailable and SSE remains the
// realtime transport.
if (!process.env.VERCEL) {
  connectDB()
    .then(() => {
      const server = app.listen(PORT, () => {
        console.log(`Server Started on http://localhost:${PORT}`);
      });
      initNotificationWebSocket(server);
    })
    .catch((error) => {
      console.error(`Failed to connect to MongoDB: ${error.message}`);
      process.exit(1);
    });
}

export default app;
