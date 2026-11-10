import stripe from "../config/stripe.js";
import Order from "../models/Order.js";
import Address from "../models/Address.js";
import { notifyAdminsOfNewOrder } from "../services/notificationService.js";

const getClientUrl = (requestOrigin) => {
  const clientUrl = (
    requestOrigin ||
    process.env.CLIENT_URL ||
    "http://localhost:5173"
  )
    .trim()
    .replace(/\/+$/, "");

  try {
    const url = new URL(clientUrl);
    if (!["http:", "https:"].includes(url.protocol)) throw new Error();
  } catch {
    throw new Error(
      "CLIENT_URL must be an absolute HTTP or HTTPS URL, such as http://localhost:5173",
    );
  }

  return new URL(clientUrl).origin;
};

const handle = (fn) => async (req, res) => {
  try {
    await fn(req, res);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const buildLineItems = (products = [], totalAmount = 0) => {
  const item = products.map((item) => ({
    price_data: {
      currency: "pkr",
      product_data: {
        name: item?.name || "GreenCart Items",
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

export const createCheckoutSession = handle(async (req, res) => {
  const { order } = req.body;
  if (
    !order ||
    !Array.isArray(order.products) ||
    order.products.length === 0 ||
    !order.address ||
    !order.totalAmount
  )
    return res
      .status(400)
      .json({ success: false, message: "Invalid checkout details" });
  const address = await Address.findOne({
    _id: order.address,
    user: req.user._id,
  });
  if (!address)
    return res
      .status(400)
      .json({ success: false, message: "Please add a delivery address first" });
  const clientUrl = getClientUrl(req.get("origin"));
  const session = await stripe.checkout.sessions.create({
    line_items: buildLineItems(order.products, order.totalAmount),
    mode: "payment",
    success_url: `${clientUrl}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${clientUrl}/payment-cancel`,
    metadata: {
      userId: req.user._id.toString(),
      address: order.address.toString(),
      totalAmount: String(order.totalAmount),
    },
  });
  res.status(200).json({ success: true, url: session.url });
});

export const verifyPayment = handle(async (req, res) => {
  const { sessionId, order: orderPayload } = req.body;
  const session = await stripe.checkout.sessions.retrieve(sessionId);
  if (session.payment_status !== "paid")
    return res.status(400).json({ success: false, message: "Payment Failed" });
  if (session.metadata?.userId !== req.user._id.toString())
    return res.status(403).json({
      success: false,
      message: "Payment session does not belong to this user",
    });
  const existingOrder = await Order.findOne({ stripeSessionId: session.id });
  if (existingOrder)
    return res.status(200).json({
      success: true,
      message: "Payment Already Verified",
      order: existingOrder,
    });
  if (
    !orderPayload ||
    !Array.isArray(orderPayload.products) ||
    orderPayload.products.length === 0 ||
    !orderPayload.address ||
    !orderPayload.totalAmount
  )
    return res
      .status(400)
      .json({ success: false, message: "Invalid order details" });
  const address = await Address.findOne({
    _id: orderPayload.address,
    user: req.user._id,
  });
  if (!address)
    return res
      .status(400)
      .json({ success: false, message: "Please add a delivery address first" });
  const expectedAmount = Math.round(
    Number(orderPayload.totalAmount || 0) * 100,
  );
  if (session.amount_total !== expectedAmount)
    return res.status(400).json({
      success: false,
      message: "Payment amount does not match order total",
    });
  const order = await Order.create({
    user: req.user._id,
    products: orderPayload.products,
    address: orderPayload.address,
    totalAmount: orderPayload.totalAmount,
    paymentMethod: "Online",
    paymentStatus: "Paid",
    orderStatus: "Processing",
    stripeSessionId: session.id,
  });
  await notifyAdminsOfNewOrder({
    order,
    customer: req.user,
    address,
  });
  res
    .status(200)
    .json({ success: true, message: "Payment Verified Successfully", order });
});
