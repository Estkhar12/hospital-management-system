import jwt from "jsonwebtoken";

// Middleware to authenticate user
const authUser = (req, res, next) => {
  try {
    const { token } = req.headers;
    console.log(" hello", token);
    if (!token) {
      return res.json({
        success: false,
        message: "Not Authorized login Again",
      });
    }
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = token_decode.id;
    next();
    console.log(token_decode);
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
export default authUser;
