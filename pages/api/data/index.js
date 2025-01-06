import connectDb from "../../../utils/ConnectDb";
import User from "../../../models/User";

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

  if (req.method === "POST") {
    const { name } = req.body;
    if (!name || name.length <= 3) {
      res.status(422).json({ status: "failed", message: "Invalid data" });
      return;
    }
    try {
      const user = await User.create({
        name: "maryam",
        age: 20,
        phone: "09147367958",
        email: "milad@gmail.com",
        address: {
          city: "Tabriz",
          street: "vila",
        },
        courses: ["node", "javascript"],
      });
      console.log(user);
      res.status(201).json({
        status: "success",
        message: "posted successfully",
        data: user,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: "failed to connect",
        message: "server cannot store a user to db",
      });
    }
  } else if (req.method === "GET") {
    try {
      const users = await User.find();
      console.log(users);
      res.status(200).json({
        status: "success",
        data: users,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: "failed to connect",
        message: "server cannot retrieve data from db",
      });
    }
  }
}
