import "dotenv/config";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import mongoose from "mongoose";
import cloudinary from "../config/cloudinary.js";
import Category from "../models/Category.js";
import Product from "../models/Product.js";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const catalogDirectory = path.resolve(
  scriptDirectory,
  "../../frontend/public/catalog",
);

const CLOUDINARY_PREFIX = "GreenCart-Images/catalog";
const LOCAL_PREFIXES = ["frontend-static:", "greencart-demo/"];
const dryRun = process.argv.includes("--dry-run");
const remoteOptIn = process.argv.includes("--allow-remote");

const isRemoteMongo = (uri) => {
  const { hostname } = new URL(uri);
  return !["localhost", "127.0.0.1", "::1"].includes(hostname);
};

const isCloudinaryUrl = (url = "") =>
  /^https?:\/\/res\.cloudinary\.com\//i.test(url);

const isLocalCatalogUrl = (url = "") =>
  /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?\/catalog\//i.test(url);

const localFilenameFor = ({ url, public_id }) => {
  if (isLocalCatalogUrl(url)) {
    try {
      return path.basename(new URL(url).pathname);
    } catch {
      return null;
    }
  }

  if (/^frontend-static:catalog\//i.test(public_id || "")) {
    return path.basename(public_id.replace(/^frontend-static:catalog\//i, ""));
  }

  return null;
};

const publicIdFor = (kind, filename) =>
  `${CLOUDINARY_PREFIX}/${kind}/${path.basename(
    filename,
    path.extname(filename),
  )}`;

const uploadImage = async (filePath, publicId) =>
  cloudinary.uploader.upload(filePath, {
    public_id: publicId,
    overwrite: true,
    invalidate: true,
    resource_type: "image",
  });

const migrateCollection = async ({ label, kind, docs, update }) => {
  const result = { uploaded: 0, skipped: 0, missing: 0, failed: 0 };
  let permissionDenied = false;

  for (const doc of docs) {
    const displayName = doc.categoryName || doc.name || String(doc._id);

    if (isCloudinaryUrl(doc.image?.url)) {
      result.skipped += 1;
      continue;
    }

    const filename = localFilenameFor(doc.image || {});
    if (!filename) {
      result.skipped += 1;
      console.log(`- Skipped (not a catalog image): ${label} "${displayName}"`);
      continue;
    }

    const filePath = path.join(catalogDirectory, filename);

    try {
      await fs.access(filePath);
    } catch {
      result.missing += 1;
      console.log(`- Missing local file for ${label} "${displayName}": ${filePath}`);
      continue;
    }

    const publicId = publicIdFor(kind, filename);

    if (dryRun) {
      result.uploaded += 1;
      console.log(`- Would upload ${label} "${displayName}" -> ${publicId}`);
      continue;
    }

    try {
      const uploaded = await uploadImage(filePath, publicId);
      await update(doc, {
        url: uploaded.secure_url,
        public_id: uploaded.public_id,
      });
      result.uploaded += 1;
      console.log(`- Uploaded ${label} "${displayName}" -> ${uploaded.secure_url}`);
    } catch (error) {
      result.failed += 1;
      console.error(
        `- Failed ${label} "${displayName}": ${error.message}${
          error.error?.message ? ` (${error.error.message})` : ""
        }`,
      );
      if (error.http_code === 403) {
        permissionDenied = true;
        console.error(
          "  Cloudinary API key is missing upload permission. Create a key with 'create' access (or an unsigned upload preset) and update backend/.env.",
        );
        break;
      }
    }
  }

  if (permissionDenied) {
    throw new Error(
      "Cloudinary upload permission denied. Update CLOUDINARY_API_KEY/CLOUDINARY_API_SECRET in backend/.env, then rerun.",
    );
  }

  return result;
};

const main = async () => {
  const uri = process.env.MONGO_URI;
  if (!uri) throw new Error("MONGO_URI is not configured in backend/.env");

  if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY) {
    throw new Error("Cloudinary credentials are not configured in backend/.env");
  }

  if (isRemoteMongo(uri) && !remoteOptIn && !dryRun) {
    throw new Error(
      "Refusing to modify a remote MongoDB. Confirm the database, then rerun with --allow-remote.",
    );
  }

  await mongoose.connect(uri);

  const [categories, products] = await Promise.all([
    Category.find().lean(),
    Product.find().lean(),
  ]);

  console.log(
    `Catalog image migration ${dryRun ? "(dry run) " : ""}started: ` +
      `${categories.length} categories, ${products.length} products.`,
  );

  const categoryResult = await migrateCollection({
    label: "category",
    kind: "categories",
    docs: categories,
    update: (category, image) =>
      Category.updateOne({ _id: category._id }, { $set: { image } }),
  });

  const productResult = await migrateCollection({
    label: "product",
    kind: "products",
    docs: products,
    update: (product, image) =>
      Product.updateOne({ _id: product._id }, { $set: { image } }),
  });

  const totals = [categoryResult, productResult].reduce(
    (sum, item) => ({
      uploaded: sum.uploaded + item.uploaded,
      skipped: sum.skipped + item.skipped,
      missing: sum.missing + item.missing,
      failed: sum.failed + item.failed,
    }),
    { uploaded: 0, skipped: 0, missing: 0, failed: 0 },
  );

  console.log("Catalog image migration complete:");
  console.log(`- Uploaded: ${totals.uploaded}`);
  console.log(`- Skipped (already Cloudinary / non-catalog): ${totals.skipped}`);
  console.log(`- Missing local files: ${totals.missing}`);
  console.log(`- Failed: ${totals.failed}`);

  if (totals.failed > 0) {
    process.exitCode = 1;
  }
};

main()
  .catch((error) => {
    console.error(`Catalog image migration failed: ${error.message}`);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });
