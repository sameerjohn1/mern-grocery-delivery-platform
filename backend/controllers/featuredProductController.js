import Hookah from "../models/Hookah.js";
import cloudinary from "../config/cloudinary.js";

export const addFeaturedProduct = async (req, res) => {
  try {
    const { image, name, company, sellingPrice, oldPrice, size } = req.body;
    const featuredProduct = await Hookah.create({
      image: { url: image.url, public_id: image.public_id },
      name,
      company,
      sellingPrice,
      oldPrice,
      size,
    });
    res
      .status(201)
      .json({
        success: true,
        message: "Product added successfully",
        hookah: featuredProduct,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getFeaturedProducts = async (req, res) => {
  try {
    const hookahs = await Hookah.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: hookahs.length, hookahs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getFeaturedProduct = async (req, res) => {
  try {
    const featuredProduct = await Hookah.findById(req.params.id);
    if (!featuredProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, hookah: featuredProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateFeaturedProduct = async (req, res) => {
  try {
    const featuredProduct = await Hookah.findById(req.params.id);
    if (!featuredProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    const { image, name, company, sellingPrice, oldPrice, size } = req.body;
    let oldImagePublicId = null;

    if (
      image?.url &&
      image.public_id &&
      featuredProduct.image?.public_id !== image.public_id
    ) {
      oldImagePublicId = featuredProduct.image?.public_id;
      featuredProduct.image = { url: image.url, public_id: image.public_id };
    }
    if (name) featuredProduct.name = name;
    if (company) featuredProduct.company = company;
    if (sellingPrice !== undefined) featuredProduct.sellingPrice = sellingPrice;
    if (oldPrice !== undefined) featuredProduct.oldPrice = oldPrice;
    if (size) featuredProduct.size = size;

    await featuredProduct.save();
    if (oldImagePublicId) {
      try {
        await cloudinary.uploader.destroy(oldImagePublicId, {
          invalidate: true,
        });
      } catch (cleanupError) {
        console.log("Old product image cleanup failed:", cleanupError.message);
      }
    }

    res
      .status(200)
      .json({ success: true, message: "Product updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteFeaturedProduct = async (req, res) => {
  try {
    const featuredProduct = await Hookah.findById(req.params.id);
    if (!featuredProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    if (featuredProduct.image?.public_id) {
      await cloudinary.uploader.destroy(featuredProduct.image.public_id, {
        invalidate: true,
      });
    }

    await Hookah.findByIdAndDelete(req.params.id);

    res
      .status(200)
      .json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
