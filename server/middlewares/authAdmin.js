import jwt from "jsonwebtoken";

// admin authentication middlewares
const authAdmin = async (req, res, next) => {
  try {
    const { admintoken } = req.headers;
    if (!admintoken) {
      return res.json({
        success: false,
        message: "Not authorized, please login!",
      });
    }
    // Decode admintoken before verified
    const admintoken_decode = jwt.verify(admintoken, process.env.JWT_SECRET);
    if (
      admintoken_decode !==
      process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD
    ) {
      return res.json({
        success: false,
        message: "Decoded admintoken is not matched!",
      });
    }
    next();
  } catch (error) {
    console.error(error.message);
    return res.json({
      success: false,
      message: "Error at authAdmin, middleware",
    });
  }
};

export default authAdmin;
