import Address from "../models/Address";

const handle = (fn) => async (req, res) => {
  try {
    await fn(req, res);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const addAddress = handle(async (req, res) => {
  try {
    const address = await Address.create({ user: req.user._id, ...req.body });
    res.status(201).json({
      success: true,
      message: "Address Added Successfully",
      address,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
