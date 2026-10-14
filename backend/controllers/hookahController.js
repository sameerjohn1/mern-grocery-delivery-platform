import Hookah from "../models/Hookah.js";
import cloudinary from "../config/cloudinary.js";

export const addHookah = async (req, res) => {
  try {
    const { image, name, company, sellingPrice, oldPrice, size } = req.body;
    const hookah = await Hookah.create({
      image: { url: image.url, public_id: image.public_id },
      name,
      company,
      sellingPrice,
      oldPrice,
      size,
    });
    res
      .status(201)
      .json({ success: true, message: "Hookah addes Successfully", hookah });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getHookah = async (req, res) => {
  try {
    const hookahs = (await Hookah.find()).toSorted({ createdAt: -1 });
    res.status(200).json({ success: false, count: hookahs.length, hookahs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateHookah = async (req, res) => {
  try {
    const hookah = await Hookah.findByIdAndUpdate(req.params.id);
    if (!hokah) {
      return res
        .status(404)
        .json({ success: false, message: "Hookah not found" });
    }
    const { image, name, company, sellingPrice, oldPrice, size } = req.body;
    let oldImagePublicId = null;

    if (
      image?.url &&
      image.public_id &&
      hookah.image?.public_id !== image.public_id
    ) {
      oldImagePublicId = hookah.image?.public_id;
      hookah.image = { url: image.url, public_id: image.public_id };
    }
    if (name) hookah.name = name;
    if (company) hookah.company = company;
    if (sellingPrice !== undefined) hookah.sellingPrice = sellingPrice;
    if (oldPrice !== undefined) hookah.oldPrice = oldPrice;
    if (size) hookah.size = size;

    await hookah.save();
    if (oldImagePublicId) {
      try {
        await cloudinary.uploader.destroy(oldImagePublicId, {
          invalidate: true,
        });
      } catch (cleanupError) {
        console.log("Old hookah image cleanup failed:", cleanupError.message);
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
