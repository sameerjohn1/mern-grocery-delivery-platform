import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

export const addToCart = async (req, res) => {
  try {
    const { product, quantity } = req.body;
    const productExists = await Product.findById(product);
    if (!productExists) {
      return res
        .status(404)
        .json({ success: true, message: "Product Not Found" });
    }
    const cartItem = await Cart.findOne({ user: user._id, product });
    if (cartItem) {
      cartItem.quantity += quantity || 1;
      await cartItem.save();
      return res.status(200).json({
        success: true,
        message: "Cart Updated Successfully",
        cart: cartItem,
      });
    }

    const cart = await Cart.create({
      user: req.user_id,
      product,
      quantity: quantity || 1,
    });

    return res.status(201).json({
      success: true,
      message: "Product Added To Cart",
      cart,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
