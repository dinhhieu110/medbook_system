import jwt from "jsonwebtoken";

// admin authentication middlewares
const authAdmin = async (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res.json({
        success: false,
        message: "Not authorized, please login!",
      });
    }
    // Decode token before verified
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      return res.json({
        success: false,
        message: "Decoded token is not matched!",
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
