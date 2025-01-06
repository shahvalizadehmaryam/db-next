import { Schema, models, model } from "mongoose";

const userSchema = new Schema({
  name: String,
});
// if we defined user model before show from models if not create model User
const User = models.User || model("User", userSchema);
export default User;
