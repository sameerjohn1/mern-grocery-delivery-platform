export const adminMiddleware = async (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ success: false, message: "Access denied. Admins only." });
    }
    return next();
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
