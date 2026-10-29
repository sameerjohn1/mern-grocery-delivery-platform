import express from "express";
import {
  addFeaturedProduct,
  getFeaturedProduct,
  getFeaturedProducts,
  updateFeaturedProduct,
  deleteFeaturedProduct,
} from "../controllers/featuredProductController.js";

const router = express.Router();

router.post("/", addFeaturedProduct);
router.get("/", getFeaturedProducts);
router.get("/:id", getFeaturedProduct);
router.put("/:id", updateFeaturedProduct);
router.delete("/:id", deleteFeaturedProduct);

export default router;
