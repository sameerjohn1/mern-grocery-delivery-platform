export const resolveCatalogImageUrl = (image) => {
  const imageUrl = typeof image === "string" ? image : image?.url;
  if (typeof imageUrl !== "string" || !imageUrl.trim()) return "";

  try {
    const url = new URL(imageUrl);

    // Catalog images ship with the storefront build, so always load them from
    // the current origin. This keeps seeded data working even if the database
    // still contains a localhost or old deployment origin.
    if (url.pathname.startsWith("/catalog/")) {
      return `${url.pathname}${url.search}${url.hash}`;
    }
  } catch {
    return imageUrl;
  }

  return imageUrl;
};
