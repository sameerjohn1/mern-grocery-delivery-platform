import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import generateOtp from "../utils/generateOtp.js";
import {
  sendVeritifcationEmail,
  sendResetOTP,
  sendVerificationOTP,
} from "../utils/sendEmail.js";

const handle = (fn) => async (req, res) => {
  try {
    await fn(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const registerUser = handle(async (req, res) => {
  const { name, email, phone, password } = req.body;
  if (!name || !email || !phone || !password) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }
  const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
  if (existingUser) {
    return res
      .status(400)
      .json({ success: false, message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const otp = generateOtp();
  const hashOtp = await bcrypt.hash(otp, 10);
  const user = User.create({
    name,
    email,
    phone,
    password: hashedPassword,
    isVerfied: false,
    verifyOtp: hashOtp,
    verifyOtpExpire: Date.now() + 10 * 60 * 1000,
  });

  await sendVerificationOTP(user.email, user.name, otp);
  res.status(201).json({
    success: true,
    message: "Verification OTP sent to your email",
    email: user.email,
  });
});
