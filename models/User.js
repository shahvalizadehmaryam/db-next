import { Schema, models, model } from "mongoose";

const userSchema = new Schema({
  name: String,
  age: {
    type: Number,
    min: 10,
    max: 50,
  },
  phone: String,
  email: {
    type: String,
    required: true,
  },
  address: {
    city: String,
    street: String,
  },
  courses: [String],
});
// if we defined user model before show from models if not create model User
const User = models.User || model("User", userSchema);
export default User;
