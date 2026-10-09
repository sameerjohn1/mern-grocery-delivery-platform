export const adminMiddleware = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ success: false, message: "Access denied. Admins only." });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
