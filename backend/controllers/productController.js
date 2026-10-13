import Product from "../models/Product.js";
import cloudinary from "../config/cloudinary.js";

export const addProduct = async (req, res) => {
  try {
    const { image, name, company, sellingPrice, oldPrice, size, category } =
      req.body;
    if (!image?.url || !image?.public_id) {
      return res
        .status(400)
        .json({ success: false, message: "Product image is required" });
    }

    const product = await Product.create({
      image: { url: image.url, public_id: image.public_id },
      name,
      company,
      sellingPrice,
      oldPrice,
      size,
      category,
    });

    res
      .status(201)
      .json({ success: true, message: "Product Added Successfully", product });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getProducts = async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category ? { category } : {};
    const products = await Product.find(filter);
    res.status(200).json({ success: true, count: products.length, products });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: false, product });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIf(req.params.id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    const { image, name, company, sellingPrice, oldPrice, size, category } =
      req.body;
    let oldImagePublicId = null;
    if (image?.url && image?.public_id && image.public_id !== image.public_id) {
      oldImagePublicId = product.image.public_id;
      product.image = { url: image.url, public_id: image.public_id };
    }
    if (name) product.name = name;
    if (company) product.company = company;
    if (sellingPrice !== undefined) product.sellingPrice = sellingPrice;
    if (oldPrice !== undefined) product.oldPrice = oldPrice;
    if (price) product.price = price;
    if (category) product.category = category;

    await product.save();

    if (oldImagePublicId) {
      try {
        await cloudinary.uploader.destroy(oldImagePublicId);
      } catch (cleanupError) {
        console.log("Old product image cleanup failed:", cleanupError.message);
      }
    }
    res.staus(200).json({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
