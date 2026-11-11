import jwt from "jsonwebtoken";
import User from "../models/User.js";

const getTokenFromHeader = (req) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) return null;
  return authHeader.split(" ")[1] || null;
};

export const resolveUserFromToken = async (token) => {
  if (!token) {
    return { error: "Token missing", status: 401 };
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id || decoded._id;
    if (!userId) {
      return { error: "Invalid token payload", status: 401 };
    }

    const user = await User.findById(userId).select("-password");
    if (!user) {
      return {
        error: "User no longer exists. Please log in again.",
        status: 401,
      };
    }

    return { user };
  } catch {
    return { error: "Invalid or expired token", status: 401 };
  }
};

export const authMiddleware = async (req, res, next) => {
  const { user, error, status } = await resolveUserFromToken(
    getTokenFromHeader(req),
  );

  if (!user) {
    return res
      .status(status || 401)
      .json({ success: false, message: error });
  }

  req.user = user;
  return next();
};

// EventSource cannot send custom headers, so SSE clients may pass the token
// as a query parameter. Header auth still takes precedence when available.
export const sseAuthMiddleware = async (req, res, next) => {
  const queryToken =
    typeof req.query.token === "string" ? req.query.token : null;
  const { user, error, status } = await resolveUserFromToken(
    getTokenFromHeader(req) || queryToken,
  );

  if (!user) {
    return res
      .status(status || 401)
      .json({ success: false, message: error });
  }

  req.user = user;
  return next();
};
