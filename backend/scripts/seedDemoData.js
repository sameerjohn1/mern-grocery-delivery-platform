import "dotenv/config";
import bcrypt from "bcrypt";
import { createHash, randomBytes } from "node:crypto";
import mongoose from "mongoose";
import Address from "../models/Address.js";
import Cart from "../models/Cart.js";
import Category from "../models/Category.js";
import Hookah from "../models/Hookah.js";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import User from "../models/User.js";

const demoCustomers = [
  {
    name: "Ayesha Demo",
    email: "ayesha.demo@example.invalid",
    phone: "03009990101",
  },
  {
    name: "Hamza Demo",
    email: "hamza.demo@example.invalid",
    phone: "03009990102",
  },
  {
    name: "Sara Demo",
    email: "sara.demo@example.invalid",
    phone: "03009990103",
  },
];

const categoryData = [
  { categoryName: "Demo - Fresh Produce", slug: "fresh-produce" },
  { categoryName: "Demo - Dairy", slug: "dairy" },
  { categoryName: "Demo - Bakery", slug: "bakery" },
  { categoryName: "Demo - Pantry", slug: "pantry" },
];

const productData = [
  {
    name: "Demo Organic Apples",
    company: "GreenCart Demo Farms",
    sellingPrice: 420,
    oldPrice: 500,
    size: "1 kg",
    category: "Demo - Fresh Produce",
  },
  {
    name: "Demo Fresh Milk",
    company: "GreenCart Demo Dairy",
    sellingPrice: 280,
    oldPrice: 320,
    size: "1 litre",
    category: "Demo - Dairy",
  },
  {
    name: "Demo Wholegrain Bread",
    company: "GreenCart Demo Bakery",
    sellingPrice: 190,
    oldPrice: 220,
    size: "400 g",
    category: "Demo - Bakery",
  },
  {
    name: "Demo Green Tea",
    company: "GreenCart Demo Pantry",
    sellingPrice: 650,
    oldPrice: 750,
    size: "100 bags",
    category: "Demo - Pantry",
  },
];

const hookahData = [
  {
    name: "Demo Emerald Hookah",
    company: "GreenCart Demo",
    sellingPrice: 8500,
    oldPrice: 9900,
    size: "Standard",
  },
  {
    name: "Demo Classic Hookah",
    company: "GreenCart Demo",
    sellingPrice: 6200,
    oldPrice: 7200,
    size: "Compact",
  },
];

const orderData = [
  { customerIndex: 0, productIndex: 0, quantity: 2, status: "Delivered" },
  { customerIndex: 1, productIndex: 1, quantity: 1, status: "Processing" },
  { customerIndex: 2, productIndex: 2, quantity: 2, status: "On the way" },
  { customerIndex: 0, productIndex: 3, quantity: 1, status: "Cancelled" },
  { customerIndex: 2, productIndex: 0, quantity: 1, status: "Delivered" },
];

const imageFor = (label) =>
  `https://placehold.co/600x600/0D241D/34D399.png?text=${encodeURIComponent(label)}`;

const stableObjectId = (key) =>
  new mongoose.Types.ObjectId(
    createHash("sha256")
      .update(`greencart-demo:${key}`)
      .digest("hex")
      .slice(0, 24),
  );

const isRemoteMongo = (uri) => {
  const { hostname } = new URL(uri);
  return !["localhost", "127.0.0.1", "::1"].includes(hostname);
};

const ensureDemoUser = async (customer) => {
  const existing = await User.findOne({ email: customer.email });
  if (existing) return existing;

  const password = await bcrypt.hash(randomBytes(32).toString("hex"), 10);
  return User.create({
    ...customer,
    password,
    role: "user",
    isVerified: false,
  });
};

const ensureCategory = async ({ categoryName, slug }) => {
  const existing = await Category.findOne({ categoryName });
  if (existing) return existing;

  return Category.create({
    categoryName,
    image: {
      url: imageFor(categoryName),
      public_id: `greencart-demo/categories/${slug}`,
    },
  });
};

const ensureProduct = async (product) => {
  const existing = await Product.findOne({
    name: product.name,
    company: product.company,
    category: product.category,
  });
  if (existing) return existing;

  return Product.create({
    ...product,
    image: {
      url: imageFor(product.name),
      public_id: `greencart-demo/products/${product.name
        .toLowerCase()
        .replaceAll(" ", "-")}`,
    },
  });
};

const ensureHookah = async (hookah) => {
  const existing = await Hookah.findOne({
    name: hookah.name,
    company: hookah.company,
  });
  if (existing) return existing;

  return Hookah.create({
    ...hookah,
    image: {
      url: imageFor(hookah.name),
      public_id: `greencart-demo/hookahs/${hookah.name
        .toLowerCase()
        .replaceAll(" ", "-")}`,
    },
  });
};

const ensureAddress = async (customer, user) => {
  const addressLine = `GreenCart demo address for ${customer.name}`;
  const existing = await Address.findOne({
    user: user._id,
    address: addressLine,
  });
  if (existing) return existing;

  return Address.create({
    user: user._id,
    fullName: customer.name,
    mobileNumber: customer.phone,
    pinCode: "54000",
    city: "Lahore",
    landmark: "Demo address - not for delivery",
    addressType: "Home",
    address: addressLine,
  });
};

const ensureCartItem = async (user, product) => {
  const existing = await Cart.findOne({ user: user._id, product: product._id });
  if (existing) return false;
  await Cart.create({ user: user._id, product: product._id, quantity: 1 });
  return true;
};

const ensureOrder = async (
  { customerIndex, productIndex, quantity, status },
  index,
  users,
  addresses,
  products,
) => {
  const _id = stableObjectId(`order-${index + 1}`);
  const existing = await Order.findById(_id);
  if (existing) return false;

  const product = products[productIndex];
  const paymentMethod = index === 2 || index === 3 ? "Stripe" : "COD";
  const paymentStatus =
    paymentMethod === "COD"
      ? status === "Delivered"
        ? "Paid"
        : "Pending"
      : "Paid";

  await Order.create({
    _id,
    user: users[customerIndex]._id,
    address: addresses[customerIndex]._id,
    products: [
      {
        productModel: "Product",
        product: product._id,
        quantity,
      },
    ],
    totalAmount: product.sellingPrice * quantity,
    paymentMethod,
    paymentStatus,
    orderStatus: status,
    createdAt: new Date(Date.now() - (index + 1) * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - (index + 1) * 60 * 60 * 1000),
  });
  return true;
};

const main = async () => {
  const uri = process.env.MONGO_URI;
  if (!uri) throw new Error("MONGO_URI is not configured in backend/.env");
  if (process.env.NODE_ENV === "production") {
    throw new Error("Demo seeding is disabled when NODE_ENV=production");
  }
  if (isRemoteMongo(uri) && !process.argv.includes("--allow-remote")) {
    throw new Error(
      "Refusing to seed a remote MongoDB database. Confirm this is a development database, then rerun with --allow-remote.",
    );
  }

  await mongoose.connect(uri);

  const users = [];
  for (const customer of demoCustomers) {
    users.push(await ensureDemoUser(customer));
  }

  const categories = [];
  for (const category of categoryData) {
    categories.push(await ensureCategory(category));
  }

  const products = [];
  for (const product of productData) {
    products.push(await ensureProduct(product));
  }

  const hookahs = [];
  for (const hookah of hookahData) {
    hookahs.push(await ensureHookah(hookah));
  }

  const addresses = [];
  for (let index = 0; index < demoCustomers.length; index += 1) {
    addresses.push(await ensureAddress(demoCustomers[index], users[index]));
  }

  let cartsAdded = 0;
  for (let index = 0; index < users.length; index += 1) {
    if (await ensureCartItem(users[index], products[index % products.length])) {
      cartsAdded += 1;
    }
  }

  let ordersAdded = 0;
  for (let index = 0; index < orderData.length; index += 1) {
    if (
      await ensureOrder(orderData[index], index, users, addresses, products)
    ) {
      ordersAdded += 1;
    }
  }

  console.log("GreenCart demo data seed complete:");
  console.log(`- Customers available: ${users.length}`);
  console.log(`- Categories available: ${categories.length}`);
  console.log(`- Products available: ${products.length}`);
  console.log(`- Hookahs available: ${hookahs.length}`);
  console.log(`- Cart items added: ${cartsAdded}`);
  console.log(`- Orders added: ${ordersAdded}`);
};

main()
  .catch((error) => {
    console.error(`Demo data seed failed: ${error.message}`);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });
