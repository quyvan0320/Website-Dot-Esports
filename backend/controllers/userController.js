import asyncHandler from "../middlewares/asyncHandler.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import createToken from "../utils/createToken.js";

const register = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ error: "Vui lòng nhập đủ thông tin đăng ký" });
  }

  const existUser = await User.findOne({ email });
  if (existUser) {
    return res.status(400).json({ error: "Email đã tồn tại" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  // Tạo token và gửi cookie
  createToken(newUser._id, res);

  res.status(201).json({
    _id: newUser._id,

    username: newUser.username,
    email: newUser.email,
    avatar: newUser.avatar,
    role: newUser.role,
  });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ error: "Vui lòng nhập đủ thông tin đăng nhập" });
  }
  const loginUser = await User.findOne({ email });
  if (!loginUser) {
    return res.status(400).json({ error: "Email không chính xác" });
  }

  const isValidPassword = await bcrypt.compare(password, loginUser.password);

  if (!isValidPassword) {
    return res.status(400).json({ error: "Mật khẩu không chính xác" });
  }

  createToken(loginUser._id, res);

  res.status(201).json({
    _id: loginUser._id,
    username: loginUser.username,
    email: loginUser.email,
    avatar: loginUser.avatar,
    role: loginUser.role,
  });
});

const logout = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", { expires: new Date(0), httpOnly: true });
  res.status(200).json({ message: "Đăng xuất thành công" });
});

const updateProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    const userAlready = await User.findOne({ email: req.body.email });
    if (userAlready && userAlready._id.toString() !== req.user._id.toString()) {
      return res.status(400).json({ error: "" });
    }

    user.avatar = req.body.avatar || user.avatar;

    if (req.body.password) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      user.password = hashedPassword;
    }

    await user.save();
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
      role: user.role,
    });
  } else {
    return res.status(400).json({ error: "User không tìm thấy" });
  }
});

const allUsers = asyncHandler(async (req, res) => {
  const users = await User.aggregate([
    {
      $addFields: {
        roleOrder: {
          $switch: {
            branches: [
              { case: { $eq: ["$role", "admin"] }, then: 1 },
              { case: { $eq: ["$role", "author"] }, then: 2 },
              { case: { $eq: ["$role", "reader"] }, then: 3 },
            ],
            default: 4,
          },
        },
      },
    },
    { $sort: { roleOrder: 1 } },
  ]);
  res.status(200).json(users);
});

const updateUserRoles = asyncHandler(async (req, res) => {
  const { role } = req.body;
  const { id } = req.params;

  // Kiểm tra role hợp lệ
  const validRoles = ["reader", "author", "admin"];
  if (!validRoles.includes(role)) {
    return res.status(400).json({ error: "Role không hợp lệ" });
  }

  // Tìm user theo ID
  const user = await User.findById(id);
  if (!user) {
    return res.status(404).json({ error: "Không tìm thấy người dùng" });
  }

  // Cập nhật role
  user.role = role;
  await user.save();

  res.status(200).json({ message: "Cập nhật role thành công", user });
});

const deleteUserById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    return res.status(400).json({ error: "Không tìm thấy người dùng" });
  }
  if (user.role === "admin") {
    return res.status(400).json({ error: "Không được xóa admin" });
  }
  await user.deleteOne({ _id: user._id });
  res.status(200).json({ message: "Xóa người dùng thành công" });
});

export {
  register,
  login,
  logout,
  updateProfile,
  allUsers,
  updateUserRoles,
  deleteUserById,
};
