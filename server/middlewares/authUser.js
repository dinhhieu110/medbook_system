import jwt from "jsonwebtoken";

// user authentication middlewares
const authUser = async (req, res, next) => {
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
        // Get userId that we signed when login in token, then assign to body
        req.body.userId = token_decode.id
        next();
    } catch (error) {
        console.error(error.message);
        return res.json({
            success: false,
            message: error.message,
        });
    }
};

export default authUser;
