export const resolveCatalogImageUrl = (image) => {
  const imageUrl = typeof image === "string" ? image : image?.url;
  if (typeof imageUrl !== "string" || !imageUrl.trim()) return "";

  try {
    const url = new URL(imageUrl);
    const isLocalHost = ["localhost", "127.0.0.1"].includes(url.hostname);

    if (isLocalHost && url.pathname.startsWith("/catalog/")) {
      return `${url.pathname}${url.search}${url.hash}`;
    }
  } catch {
    return imageUrl;
  }

  return imageUrl;
};
