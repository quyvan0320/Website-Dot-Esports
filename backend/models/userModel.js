import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  avatar: {
    type: String,
    required: true,
    default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
  },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["reader", "author", "admin"],
    default: "reader",
  },
});

const User = mongoose.model("User", userSchema);

export default User;
