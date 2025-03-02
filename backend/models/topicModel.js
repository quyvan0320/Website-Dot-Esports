import mongoose from "mongoose";
import slugify from "slugify";

const topicSchema = mongoose.Schema({
  name: { type: String, required: true, unique: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
  slug: { type: String, unique: true },
});

// Tự động tạo slug trước khi lưu vào database
topicSchema.pre("save", function (next) {
  if (this.isModified("name")) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

const Topic = mongoose.model("Topic", topicSchema);
export default Topic;
