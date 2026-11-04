import "dotenv/config";
import fs from "node:fs/promises";
import mongoose from "mongoose";
import Category from "../models/Category.js";
import Product from "../models/Product.js";
import { fileURLToPath } from "node:url";
import path from "node:path";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const imageDirectory = path.resolve(
  scriptDirectory,
  "../../frontend/src/assets/product-images",
);
const publicImageDirectory = path.resolve(
  scriptDirectory,
  "../../frontend/public/catalog",
);
const seedPrefix = "frontend-static:catalog/";
const remoteOptIn = process.argv.includes("--allow-remote");
const dryRun = process.argv.includes("--dry-run");

const legacyDemoCategories = [
  "Demo - Fresh Produce",
  "Demo - Dairy",
  "Demo - Bakery",
  "Demo - Pantry",
];

const legacyDemoProducts = [
  "Demo Organic Apples",
  "Demo Fresh Milk",
  "Demo Wholegrain Bread",
  "Demo Green Tea",
];

const catalog = [
  {
    name: "Fresh Produce",
    slug: "fresh-produce",
    items: [
      ["Fresh Red Apples", 420, 500, "1 kg"],
      ["Ripe Bananas", 180, 220, "1 dozen"],
      ["Farm Fresh Tomatoes", 160, 200, "1 kg"],
    ],
  },
  {
    name: "Dairy & Eggs",
    slug: "dairy-eggs",
    items: [
      ["Full Cream Milk", 280, 320, "1 litre"],
      ["Farm Fresh Eggs", 390, 450, "12 pieces"],
      ["Creamy Plain Yogurt", 190, 230, "500 g"],
    ],
  },
  {
    name: "Bakery",
    slug: "bakery",
    items: [
      ["Whole Wheat Bread", 210, 250, "400 g"],
      ["Butter Croissants", 320, 380, "4 pieces"],
      ["Classic Burger Buns", 180, 220, "6 pieces"],
    ],
  },
  {
    name: "Meat & Poultry",
    slug: "meat-poultry",
    items: [
      ["Fresh Chicken Breast", 620, 700, "500 g"],
      ["Chicken Drumsticks", 480, 550, "500 g"],
      ["Lean Beef Mince", 760, 850, "500 g"],
    ],
  },
  {
    name: "Rice & Grains",
    slug: "rice-grains",
    items: [
      ["Premium Basmati Rice", 590, 680, "1 kg"],
      ["Rolled Oats", 360, 420, "500 g"],
      ["Red Lentils", 290, 340, "1 kg"],
    ],
  },
  {
    name: "Pantry Essentials",
    slug: "pantry-essentials",
    items: [
      ["Pure Cooking Oil", 560, 630, "1 litre"],
      ["Raw Honey", 780, 900, "500 g"],
      ["Iodized Table Salt", 90, 120, "800 g"],
    ],
  },
  {
    name: "Snacks & Biscuits",
    slug: "snacks-biscuits",
    items: [
      ["Salted Potato Crisps", 150, 180, "150 g"],
      ["Chocolate Chip Cookies", 260, 310, "250 g"],
      ["Roasted Mixed Nuts", 540, 620, "200 g"],
    ],
  },
  {
    name: "Beverages",
    slug: "beverages",
    items: [
      ["Fresh Orange Juice", 240, 290, "1 litre"],
      ["Sparkling Mineral Water", 110, 140, "1.5 litre"],
      ["Green Tea Bags", 380, 450, "25 bags"],
    ],
  },
  {
    name: "Frozen Foods",
    slug: "frozen-foods",
    items: [
      ["Frozen Sweet Corn", 220, 270, "500 g"],
      ["Crispy Chicken Nuggets", 620, 710, "500 g"],
      ["Frozen Green Peas", 190, 240, "500 g"],
    ],
  },
  {
    name: "Household Essentials",
    slug: "household-essentials",
    items: [
      ["Gentle Dishwashing Liquid", 230, 280, "500 ml"],
      ["Multipurpose Cleaning Spray", 340, 400, "500 ml"],
      ["Soft Paper Towels", 260, 320, "2 rolls"],
    ],
  },
];

const products = catalog.flatMap((category, categoryIndex) =>
  category.items.map(([name, sellingPrice, oldPrice, size], itemIndex) => {
    const index = categoryIndex * 3 + itemIndex + 1;
    return {
      name,
      company: "GreenCart Select",
      sellingPrice,
      oldPrice,
      size,
      category: category.name,
      imageIndex: index,
    };
  }),
);

const legacyFilter = {
  $or: [
    { name: { $in: legacyDemoProducts } },
    { category: { $in: legacyDemoCategories } },
  ],
};

const isRemoteMongo = (uri) => {
  const { hostname } = new URL(uri);
  return !["localhost", "127.0.0.1", "::1"].includes(hostname);
};

const getImageExtension = (buffer, filename) => {
  if (
    buffer.length >= 8 &&
    buffer.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))
  ) {
    return ".png";
  }
  if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
    return ".jpg";
  }
  if (
    buffer.toString("ascii", 0, 4) === "RIFF" &&
    buffer.toString("ascii", 8, 12) === "WEBP"
  ) {
    return ".webp";
  }
  if (
    buffer.toString("ascii", 4, 8) === "ftyp" &&
    /^(avif|avis)$/.test(buffer.toString("ascii", 8, 12))
  ) {
    return ".avif";
  }

  throw new Error(`Unsupported image format in ${filename}`);
};

const getFrontendOrigin = () => {
  const configuredOrigin = process.env.FRONTEND_URL || "http://localhost:5174";
  let url;
  try {
    url = new URL(configuredOrigin);
  } catch {
    throw new Error(
      "FRONTEND_URL must be an absolute URL, such as http://localhost:5174",
    );
  }
  if (!["http:", "https:"].includes(url.protocol)) {
    throw new Error("FRONTEND_URL must use HTTP or HTTPS");
  }
  return url.origin;
};

const findSourceImage = async (index) => {
  const imageNumber = String(index).padStart(3, "0");
  const files = await fs.readdir(imageDirectory);
  const sourceFilename = files.find((filename) =>
    new RegExp(`^product-${imageNumber}\\.(png|jpe?g|webp|avif)$`, "i").test(
      filename,
    ),
  );
  if (!sourceFilename) {
    throw new Error(`No source image found for product-${imageNumber}`);
  }
  return { sourceFilename, sourcePath: path.join(imageDirectory, sourceFilename) };
};

const copyImageToFrontend = async (index, slug) => {
  const { sourceFilename, sourcePath } = await findSourceImage(index);
  const imageBuffer = await fs.readFile(sourcePath);
  const extension = getImageExtension(imageBuffer, sourceFilename);
  const filename = `${slug}${extension}`;
  await fs.mkdir(publicImageDirectory, { recursive: true });
  await fs.writeFile(path.join(publicImageDirectory, filename), imageBuffer);

  return {
    url: new URL(`/catalog/${filename}`, getFrontendOrigin()).toString(),
    public_id: `${seedPrefix}${filename}`,
  };
};

const assertNoCatalogConflicts = async () => {
  const categoryNames = catalog.map(({ name }) => name);
  const productNames = products.map(({ name }) => name);
  const [existingCategories, existingProducts] = await Promise.all([
    Category.find({ categoryName: { $in: categoryNames } })
      .select("categoryName image.public_id")
      .lean(),
    Product.find({ name: { $in: productNames } })
      .select("name image.public_id")
      .lean(),
  ]);

  const categoryConflicts = existingCategories.filter(
    (category) => !category.image?.public_id?.startsWith(seedPrefix),
  );
  const productConflicts = existingProducts.filter(
    (product) => !product.image?.public_id?.startsWith(seedPrefix),
  );

  if (categoryConflicts.length || productConflicts.length) {
    const conflicts = [
      ...categoryConflicts.map(({ categoryName }) => `category: ${categoryName}`),
      ...productConflicts.map(({ name }) => `product: ${name}`),
    ];
    throw new Error(
      `Catalog names already exist outside this seed and will not be overwritten: ${conflicts.join(", ")}`,
    );
  }
};

const main = async () => {
  const uri = process.env.MONGO_URI;
  if (!uri) throw new Error("MONGO_URI is not configured in backend/.env");
  if (process.env.NODE_ENV === "production") {
    throw new Error("Catalog seeding is disabled when NODE_ENV=production");
  }
  if (isRemoteMongo(uri) && !remoteOptIn) {
    throw new Error(
      "Refusing to modify remote MongoDB. Confirm the target database, then rerun with --allow-remote.",
    );
  }

  await mongoose.connect(uri);
  await assertNoCatalogConflicts();

  const [legacyCategoryCount, legacyProductCount] = await Promise.all([
    Category.countDocuments({ categoryName: { $in: legacyDemoCategories } }),
    Product.countDocuments(legacyFilter),
  ]);

  if (dryRun) {
    console.log("Catalog seed dry run complete; no changes made.");
    console.log(`- Categories to replace: ${legacyCategoryCount}`);
    console.log(`- Legacy demo products to replace: ${legacyProductCount}`);
    console.log(`- New categories: ${catalog.length}`);
    console.log(`- New products: ${products.length}`);
    console.log("- Existing carts, orders, and accounts will be left untouched.");
    return;
  }

  const imageIndexes = [
    ...catalog.map((_, index) => 31 + index),
    ...products.map(({ imageIndex }) => imageIndex),
  ];
  await Promise.all(imageIndexes.map(findSourceImage));

  const categoryImages = [];
  for (let index = 0; index < catalog.length; index += 1) {
    const category = catalog[index];
    categoryImages.push(
      await copyImageToFrontend(31 + index, `category-${category.slug}`),
    );
  }

  const productImages = [];
  for (const product of products) {
    productImages.push(
      await copyImageToFrontend(
        product.imageIndex,
        `product-${product.category.toLowerCase().replaceAll(" ", "-")}-${product.name
          .toLowerCase()
          .replaceAll(" ", "-")}`,
      ),
    );
  }

  const session = await mongoose.startSession();
  try {
    await session.withTransaction(async () => {
      await Product.deleteMany(legacyFilter, { session });
      await Category.deleteMany(
        { categoryName: { $in: legacyDemoCategories } },
        { session },
      );

      for (let index = 0; index < catalog.length; index += 1) {
        await Category.updateOne(
          { categoryName: catalog[index].name },
          { $set: { image: categoryImages[index] } },
          { upsert: true, runValidators: true, session },
        );
      }

      for (let index = 0; index < products.length; index += 1) {
        const { imageIndex, ...product } = products[index];
        await Product.updateOne(
          { "image.public_id": productImages[index].public_id },
          { $set: { ...product, image: productImages[index] } },
          { upsert: true, runValidators: true, session },
        );
      }
    });
  } finally {
    await session.endSession();
  }

  console.log("GreenCart catalog seed complete:");
  console.log(`- Categories: ${catalog.length}`);
  console.log(`- Products: ${products.length}`);
  console.log(`- Legacy demo categories replaced: ${legacyCategoryCount}`);
  console.log(`- Legacy demo products replaced: ${legacyProductCount}`);
  console.log("- Category and product images copied to frontend/public/catalog.");
  console.log(`- Image URL origin: ${getFrontendOrigin()}`);
  console.log("- Existing carts, orders, hookahs, and accounts were left untouched.");
};

main()
  .catch((error) => {
    console.error(`Catalog seed failed: ${error.message}`);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });
