import slugify from "slugify";
import asyncHandler from "../middlewares/asyncHandler.js";
import Category from "../models/categoryModel.js";
import Topic from "../models/topicModel.js";

const createTopic = asyncHandler(async (req, res) => {
  const { category, name } = req.body;

  // Kiểm tra nếu không có dữ liệu đầu vào
  if (!category || !name) {
    return res.status(400).json({ error: "Vui lòng nhập đầy đủ thông tin." });
  }

  // Kiểm tra xem category có tồn tại không
  const existingCategory = await Category.findById(category);
  if (!existingCategory) {
    return res.status(404).json({ error: "Danh mục không tồn tại." });
  }

  // Kiểm tra xem topic có bị trùng không
  const existingTopic = await Topic.findOne({ name });
  if (existingTopic) {
    return res.status(400).json({ error: "Topic này đã tồn tại." });
  }

  // Tạo và lưu Topic
  const newTopic = await Topic.create({ category, name });

  res.status(201).json({
    message: "Tạo topic thành công!",
    topic: newTopic,
  });
});

const topicBySlug = asyncHandler(async (req, res) => {
  const topicSlug = await Topic.findOne({ slug: req.params.slug });
  if (!topicSlug) {
    return res.status(404).json({ error: "Không tìm thấy chủ đề" });
  }
  res.status(200).json(topicSlug);
});

const allTopics = asyncHandler(async (req, res) => {
  const topics = await Topic.find();

  res.status(200).json(topics);
});

const updateTopic = asyncHandler(async (req, res) => {
  const { name, category } = req.body;

  // Kiểm tra nếu topic có tồn tại không
  const topic = await Topic.findById(req.params.id);
  if (!topic) {
    return res.status(404).json({ error: "Không tìm thấy topic." });
  }

  // Kiểm tra xem category có tồn tại không
  if (category) {
    const existingCategory = await Category.findById(category);
    if (!existingCategory) {
      return res.status(404).json({ error: "Danh mục không tồn tại." });
    }
  }

  // Kiểm tra xem topic name có bị trùng không
  if (name) {
    const existingTopic = await Topic.findOne({ name });
    if (
      existingTopic &&
      existingTopic._id.toString() !== topic._id.toString()
    ) {
      return res.status(400).json({ error: "Tên topic đã tồn tại." });
    }
  }

  // Cập nhật thông tin
  if (category) topic.category = category;
  if (name) {
    topic.name = name;
    topic.slug = slugify(name, { lower: true, strict: true });
  }

  // Lưu vào database
  await topic.save();

  res.status(200).json({
    message: "Cập nhật topic thành công!",
    topic,
  });
});

const deleteTopic = asyncHandler(async (req, res) => {
  const topic = await Topic.findById(req.params.id);
  if (!topic) {
    return res.status(404).json({ error: "Không tìm thấy chủ đề" });
  }

  await topic.deleteOne({ _id: topic.id });
  res.status(200).json({ message: "Xóa chủ đề thành công" });
});

export { createTopic, topicBySlug, allTopics, updateTopic, deleteTopic };
