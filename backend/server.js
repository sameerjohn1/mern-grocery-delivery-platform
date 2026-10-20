import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectDB } from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import uploadRoutes from "./routes/uploadRoute.js";
import categoryRoutes from "./routes/categoryRoute.js";
import productRoutes from "./routes/productRoute.js";
import hookahRoutes from "./routes/hookahRoute.js";
import cartRoutes from "./routes/cartRoute.js";
import addressRoutes from "./routes/addressRoute.js";
import orderRoutes from "./routes/orderRoute.js";

const PORT = 5000;
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Db
connectDB();

// Routes
app.use("/api/users", userRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/hookahs", hookahRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/address", addressRoutes);
app.use("/api/orders", orderRoutes);

app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(PORT, () => {
  console.log(`Server Started on http://localhost:${PORT}`);
});
