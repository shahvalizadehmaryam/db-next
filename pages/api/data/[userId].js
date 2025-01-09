import User from "../../../models/User";
import connectDb from "../../../utils/ConnectDb";

export default async function handler(req, res) {
  try {
    await connectDb();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "failed to connect",
      message: "server cannot connect to db",
    });
    return;
  }

  if (req.method === "GET") {
    try {
      const userId = req.query.userId;
      //   const user = await User.findById(userId);
      const user = await User.findOne({ _id: userId });
      res.status(200).json({ status: "Success", data: user });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ status: "Failed", message: "cannot retrieve a specific user" });
    }
  } else if (req.method === "PATCH") {
    try {
      const userId = req.query.userId;
      const { email } = req.body;
      //   const user = await User.findById(userId);
      const user = await User.findOne({ _id: userId });
      user.email = email;
      await user.save();
      res.status(200).json({ status: "Success", data: user });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ status: "Failed", message: "cannot retrieve a specific user" });
    }
  } else if (req.method === "DELETE") {
    try {
      const userId = req.query.userId;
      const user = await User.findOneAndDelete({ _id: userId });
      res
        .status(200)
        .json({ status: "Success", message: "deleted successfully." });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({
          status: "Failed",
          message: "cannot delete a user from data base",
        });
    }
  }
}
