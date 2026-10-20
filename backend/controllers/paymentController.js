import stripe from "../config/stripe.js";
import Order from "../models/Order.js";
import Address from "../models/Address.js";

const handle = (fn) => async (req, res) => {
  try {
    await fn(req, res);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getImageUrl = (image) =>
  typeof image === "string" ? image : image?.url || "";

const buildLineItems = (products = [], totalAmount = 0) => {
  const item = products.map((item) => ({
    price_data: {
      currency: "pkr",
      product_data: {
        name: item?.name || "FreshMart Items",
        images: item?.image ? [getImageUrl(item.image)] : [],
      },
      unit_amount: Math.round(Number(item?.sellingPrice || 0) * 100),
    },
    quantity: item.quantity,
  }));
  const prodTotal = products.reduce(
    (t, i) => t + Number(i?.sellingPrice || 0) * Number(i?.quantity || 0),
    0,
  );
  const deliveryFee = Number(totalAmount || 0) - prodTotal;
  if (deliveryFee > 0) {
    item.push({
      price_data: {
        currency: "pkr",
        product_data: { name: "Delivery fee" },
        unit_amount: Math.round(deliveryFee * 100),
      },
      quantity: 1,
    });
  }
  return item;
};
