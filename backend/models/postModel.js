import mongoose from "mongoose";
import slugify from "slugify";

const postSchema = mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    thumbnail: { type: String, required: true },
    content: { type: String, required: true },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    topic: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Topic",
      required: true,
    },
    slug: { type: String, unique: true },
  },
  { timestamps: true }
);


postSchema.pre("save", function (next) {
  if (this.isModified("title") && this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

const Post = mongoose.model("Post", postSchema);

export default Post;
