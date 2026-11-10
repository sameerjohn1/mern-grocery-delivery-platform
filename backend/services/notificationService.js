import { EventEmitter } from "node:events";
import Notification from "../models/Notification.js";
import User from "../models/User.js";

export const notificationEvents = new EventEmitter();
notificationEvents.setMaxListeners(0);

export const normalizePaymentMethod = (method) =>
  ["Online", "Stripe"].includes(method) ? "Online" : "COD";

const formatAmount = (amount) =>
  Number(amount || 0).toLocaleString("en-PK", { maximumFractionDigits: 2 });

const getOrderId = (order) => {
  if (!order) return null;
  if (order._id) return order._id.toString();
  return order.toString?.() || null;
};

const buildOrderNotification = (order, customer, address) => {
  const paymentMethod = normalizePaymentMethod(order.paymentMethod);
  const paymentLabel =
    paymentMethod === "Online" ? "Online payment" : "Cash on delivery";
  const customerName = customer?.name?.trim() || "a customer";

  return {
    type: "order",
    event: "order.created",
    title: "New order received",
    message: `New ${paymentLabel} order of Rs ${formatAmount(
      order.totalAmount,
    )} from ${customerName}.`,
    order: order._id,
    data: {
      orderId: getOrderId(order),
      customerId: customer?._id?.toString() || null,
      customerName,
      customerPhone: customer?.phone || "",
      customerEmail: customer?.email || "",
      totalAmount: order.totalAmount,
      paymentMethod,
      paymentStatus: order.paymentStatus,
      orderStatus: order.orderStatus,
      itemCount: order.products?.length || 0,
      city: address?.city || "",
    },
  };
};

export const serializeNotification = (notification) => {
  const doc = notification?.toObject ? notification.toObject() : notification;
  if (!doc) return null;

  return {
    id: doc._id?.toString() || null,
    recipient: doc.recipient?.toString() || null,
    type: doc.type,
    event: doc.event,
    title: doc.title,
    message: doc.message,
    orderId: getOrderId(doc.order),
    data: doc.data || {},
    isRead: Boolean(doc.isRead),
    readAt: doc.readAt || null,
    createdAt: doc.createdAt,
  };
};

export const notifyAdminsOfNewOrder = async ({ order, customer, address }) => {
  try {
    const admins = await User.find({ role: "admin" }).select("_id");
    if (admins.length === 0) return [];

    const payload = buildOrderNotification(order, customer, address);
    const notifications = await Notification.insertMany(
      admins.map((admin) => ({ ...payload, recipient: admin._id })),
    );

    notifications.forEach((notification) => {
      notificationEvents.emit(
        "notification",
        serializeNotification(notification),
      );
    });

    return notifications;
  } catch (error) {
    console.error(
      `Failed to notify admins about order ${getOrderId(order)}:`,
      error.message,
    );
    return [];
  }
};
