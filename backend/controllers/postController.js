import asyncHandler from "../middlewares/asyncHandler.js";
import Category from "../models/categoryModel.js";
import Post from "../models/postModel.js";
import Topic from "../models/topicModel.js";
import User from "../models/userModel.js";

const createPost = asyncHandler(async (req, res) => {
  const { title, content, topic, thumbnail } = req.body;

  if (!title || !content || !topic) {
    return res.status(400).json({ error: "Vui lòng nhập đầy đủ thông tin" });
  }

  const post = new Post({
    title,
    content,
    topic,
    thumbnail,
    author: req.user._id,
  });

  const createdPost = await post.save();
  res.status(201).json(createdPost);
});

const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find()
    .populate("author", "username")
    .populate("topic", "name");
  res.status(200).json(posts);
});

const getOnePost = asyncHandler(async (req, res) => {
  const post = await Post.findOne({ slug: req.params.slug })
    .populate("author", "username avatar")
    .populate("topic", "name slug");
  if (!post) {
    return res.status(404).json({ error: "Không tìm thấy bài viết." });
  }
  res.status(200).json(post);
});

const updatePost = asyncHandler(async (req, res) => {
  const { title, thumbnail, content, topic } = req.body;

  // Kiểm tra bài viết có tồn tại không
  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(404).json({ error: "Không tìm thấy bài viết." });
  }

  // Kiểm tra người dùng có phải là author của bài viết không
  if (post.author.toString() !== req.user._id.toString()) {
    return res
      .status(403)
      .json({ error: "Bạn không có quyền chỉnh sửa bài viết này." });
  }

  // Cập nhật chỉ những trường có giá trị (tránh cập nhật null hoặc undefined)
  if (title) post.title = title;
  if (thumbnail) post.thumbnail = thumbnail;
  if (content) post.content = content;
  if (topic) post.topic = topic;

  // Lưu thay đổi
  const updatedPost = await post.save();
  res.status(200).json(updatedPost);
});

const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(404).json({ error: "Không tìm thấy bài viết." });
  }

  // Kiểm tra người dùng có phải là author của bài viết không
  if (post.author.toString() !== req.user._id.toString()) {
    return res
      .status(403)
      .json({ error: "Bạn không có quyền xóa bài viết này." });
  }

  await Post.deleteOne({ _id: req.params.id });

  res.status(200).json({ message: "Xóa bài viết thành công" });
});

const getLatestPost = asyncHandler(async (req, res) => {
  const posts = await Post.find({})
    .limit(5)
    .sort({ createdAt: -1 })
    .populate("author", "username")
    .populate("topic", "name slug");

  res.status(200).json(posts);
});

const getFeaturedPosts = async (req, res) => {
  try {
    const featuredPosts = await Post.find()
      .sort({ createdAt: -1 })
      .limit(3)
      .populate("author", "username")
      .populate("topic", "name slug");

    res.json(featuredPosts);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error });
  }
};

const getPostsPanigation = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Trang hiện tại (mặc định là 1)
    const limit = parseInt(req.query.limit) || 5; // Số bài viết mỗi trang (mặc định là 5)
    const skip = (page - 1) * limit; // Bỏ qua số bài viết tương ứng với trang

    const posts = await Post.find()
      .sort({ createdAt: 1 }) // Lấy bài mới nhất
      .skip(skip) // Bỏ qua bài viết cũ
      .limit(limit) // Lấy số bài theo limit
      .populate("author", "username email")
      .populate("topic", "name slug");

    const totalPosts = await Post.countDocuments(); // Tổng số bài viết

    res.json({
      posts,
      totalPages: Math.ceil(totalPosts / limit), // Tổng số trang
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error });
  }
};

const getPostCategory = asyncHandler(async (req, res) => {
  const { categorySlug } = req.params; // Lấy slug từ URL

  // Tìm danh mục theo slug
  const category = await Category.findOne({ slug: categorySlug });
  if (!category) return res.status(404).json({ message: "Category not found" });

  // Lấy danh sách topic thuộc category
  const topics = await Topic.find({ category: category._id }).select("_id");
  const topicIds = topics.map((topic) => topic._id);

  // Lấy 4 bài viết thuộc các topic đó
  const posts = await Post.find({ topic: { $in: topicIds } })
    .populate("author", "username")
    .populate("topic", "name slug")
    .sort({ createdAt: -1 }) // Mới nhất trước
    .limit(4);

  res.json(posts);
});
const getPostsPaginationByUserId = asyncHandler(async (req, res) => {
  const { page = 1, limit = 5, userId } = req.query;
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    if (!userId) {
      return res.status(400).json({ message: "UserId là bắt buộc" });
    }

    // Kiểm tra user có tồn tại không
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy người dùng" });
    }

    // Lọc bài viết theo userId
    const posts = await Post.find({ author: userId })
      .sort({ createdAt: -1 }) // Sắp xếp bài viết mới nhất trước
      .skip(skip)
      .limit(limitNum)
      .populate("author", "username email")
      .populate("topic", "name slug");

    // Đếm tổng số bài viết của user
    const totalPosts = await Post.countDocuments({ author: userId });

    res.json({
      posts,
      totalPages: Math.ceil(totalPosts / limitNum),
      currentPage: pageNum,
    });
});

export {
  createPost,
  getPosts,
  getOnePost,
  updatePost,
  deletePost,
  getLatestPost,
  getFeaturedPosts,
  getPostsPanigation,
  getPostCategory,
  getPostsPaginationByUserId,
};
