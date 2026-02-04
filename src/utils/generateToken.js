import jwt from "jsonwebtoken";

function generateToken(adminId) {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw Object.assign(new Error("JWT_SECRET is not set"), { statusCode: 500 });
  }

  return jwt.sign({ id: adminId }, secret, { expiresIn: "1d" });
}

export default generateToken;

