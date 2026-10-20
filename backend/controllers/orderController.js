import Order from "../models/Order.js";
import Address from "../models/Address.js";

export const placeOrder = async (req, res) => {
  try {
    if (["Online", "Stripe"].includes(req.body.paymentMethod)) {
      return res.status(400).json({
        success: false,
        message: "Online orders are created only after successful payment",
      });
    }
    const address = await Address.findOne({
      _id: req.body.address,
      user: req.user._id,
    });
    if (!address) {
      res.status(400).json({
        success: false,
        message: "Please add a delivery address first",
      });
    }

    const order = await Order.create({
      user: req.user._id,
      ...req.body,
      paymentMethod: "COD",
      paymentStatus: "Pending",
    });
    res
      .status(201)
      .json({ success: true, message: "Order Place Successfully", order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
