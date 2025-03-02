import express from "express";
import multer from "multer";
import path from "path";

const router = express.Router();

// Cấu hình lưu file vào thư mục uploads/
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

// Chỉ cho phép upload ảnh
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
  allowedTypes.includes(file.mimetype)
    ? cb(null, true)
    : cb(new Error("Chỉ nhận hình ảnh"), false);
};

const upload = multer({ storage, fileFilter });

// API upload ảnh
router.post("/", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "Không có ảnh để tải lên" });
  }

  res.status(200).json({
    message: "Tải ảnh lên thành công",
    image: `/${req.file.path}`, // Trả về đường dẫn ảnh
  });
});

export default router;
