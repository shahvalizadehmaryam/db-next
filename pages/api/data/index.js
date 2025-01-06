import mongoose from "mongoose";
import connectDb from "../../../utils/ConnectDb";
import User from "../../../models/User";

export default async function handler(req, res) {
  await connectDb();
  if (req.method === "POST") {
    const { name } = req.body;
    if (!name || name.length <= 3) {
      res.status(422).json({ status: "failed", message: "Invalid data" });
      return;
    }
    const user = await User.create({ name });
    console.log(user);
    res.status(201).json({
      status: "success",
      message: "posted successfully",
      data: user,
    });
  }
}
