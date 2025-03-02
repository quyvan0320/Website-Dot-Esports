import slugify from "slugify";
import asyncHandler from "../middlewares/asyncHandler.js";
import Category from "../models/categoryModel.js";
import Topic from "../models/topicModel.js";

const createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const newCategory = await new Category({ name }).save();
  res.status(200).json(newCategory);
});

const categoryBySlug = asyncHandler(async (req, res) => {
  const categorySlug = await Category.findOne({ slug: req.params.slug });
  if (!categorySlug) {
    return res.status(404).json({ error: "Không tìm thấy danh mục" });
  }
  res.status(200).json(categorySlug);
});

const allCategoies = asyncHandler(async (req, res) => {
  const categories = await Category.find();

  res.status(200).json(categories);
});

const updateCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;

  // Kiểm tra danh mục có tồn tại không
  const category = await Category.findById(req.params.id);
  if (!category) {
    return res.status(404).json({ error: "Không tìm thấy danh mục" });
  }

  // Cập nhật name và slug mới
  category.name = name;
  category.slug = slugify(name, { lower: true, strict: true });

  // Lưu vào database
  await category.save();

  res.status(200).json(category);
});

const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    return res.status(404).json({ error: "Không tìm thấy danh mục" });
  }

  await category.deleteOne({ _id: category.id });
  res.status(200).json("Xóa danh mục thành công");
});

const getCategoryAndTopic = asyncHandler(async (req, res) => {
  const categories = await Category.find().lean();
  const topics = await Topic.find().lean();

  const result = categories.map((category) => ({
    ...category,
    topics: topics.filter(
      (topic) => topic.category.toString() === category._id.toString()
    ),
  }));

  res.json(result);
});

export {
  createCategory,
  categoryBySlug,
  allCategoies,
  updateCategory,
  deleteCategory,
  getCategoryAndTopic,
};
