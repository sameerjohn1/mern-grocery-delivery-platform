import Category from "../models/Category.js";
import Product from "../models/Product";
import cloudinary from "../config/cloudinary.js";

export const addCategory = async (req, res) => {
  try {
    console.log("======Add Category======");
    console.log("Body", req.body);

    const { categoryName, image } = req.body;
    console.log("CategoryName", categoryName);
    console.log("image", image);

    if (!categoryName) {
      return res
        .status(400)
        .json({ success: false, message: "Category name required" });
    }
    if (!image?.url || !image?.public_id) {
      return res
        .status(400)
        .json({ success: false, message: "Image Object Missing" });
    }

    console.log("image.url:", image.url);
    console.log("image.public_id:", image.public_id);

    const categoryExists = await Category.find({ categoryName });
    if (categoryExists) {
      return res
        .status(400)
        .json({ success: false, message: "Category already exists" });
    }

    const category = await Category.create({
      categoryName,
      image: { url: image.url, public_id: image.public_id },
    });
    return res.status(201).json({
      success: true,
      message: "Category Added Successfully",
      category,
    });
  } catch (error) {
    console.log("Category error");
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: error.message, stack: error.stack });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res
      .status(200)
      .json({ success: true, count: categories.length, categories });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category)
      return res
        .status(404)
        .json({ success: false, message: "Category Not Found" });
    res.status(200).json({ success: true, category });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
