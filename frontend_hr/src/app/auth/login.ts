import { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { email, password } = req.body;

  // Contoh data user (bisa ganti dengan database)
  const user = { email: "user@example.com", password: "123456" };

  if (email !== user.email || password !== user.password) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Set cookies untuk session
  res.setHeader("Set-Cookie", serialize("user", JSON.stringify(user), {
    httpOnly: true, // Tidak bisa diakses lewat JavaScript (keamanan)
    secure: process.env.NODE_ENV === "production", // Hanya https di production
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24, // 1 hari
  }));

  return res.status(200).json({ message: "Login successful" });
}
