import jwt from "jsonwebtoken";

// Middleware to authenticate Doctor
const authDoctor = (req, res, next) => {
  try {
    const { dtoken } = req.headers;
    if (!dtoken) {
      res.json({ success: false, message: "Not Authorized login Again" });
    }
    const token_decode = jwt.verify(dtoken, process.env.JWT_SECRET);
    req.body.docId = token_decode.id;
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
export default authDoctor;
