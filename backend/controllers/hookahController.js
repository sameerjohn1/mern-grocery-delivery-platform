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
