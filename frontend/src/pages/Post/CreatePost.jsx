import React, { useState } from "react";
import { useGetAllTopicsQuery } from "../../redux/api/topicApiSlice";
import Editor from "../../components/Editor";
import {
  useCreatePostMutation,
  useUploadImageMutation,
} from "../../redux/api/postApiSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [topic, setTopic] = useState("");
  const [content, setContent] = useState("");
  const { data: topics } = useGetAllTopicsQuery();

  const [uploadImage] = useUploadImageMutation();
  const [createPost] = useCreatePostMutation();
  const navigate = useNavigate();
  const submitHandle = async (e) => {
    e.preventDefault();
    try {
      if (!title || !topic || !thumbnail || !content) {
        toast.error("Vui lòng nhập đầy đủ thông tin!");
        return;
      }

      let imageUrl = "";
      if (thumbnail) {
        const formData = new FormData();
        formData.append("image", thumbnail);
        const res = await uploadImage(formData).unwrap();
        if (!res.image) {
          toast.error("Upload ảnh thất bại!");
          return;
        }
        imageUrl = res.image;
      }

      const postData = { title, topic, thumbnail: imageUrl, content };
      await createPost(postData).unwrap();
      toast.success("Tạo bài viết thành công!");
      navigate("/my-post");
    } catch (error) {
      console.error(error);
      toast.error(error?.data?.error || "Có lỗi xảy ra");
    }
  };

  return (
    <div className="container px-4 lg:px-0  max-w-screen-xl mx-auto bg-primary-light font-roboto">
      <div className="py-6">
        <h1 className="text-primary-bluebold text-2xl font-bold mb-2">
          Tạo Bài Viết
        </h1>

        <div className="max-w-screen-md mx-auto">
          <form
            onSubmit={submitHandle}
            action=""
            className="bg-gray-100 p-6 rounded-md space-y-6"
          >
            <div className="">
              <label className="text-primary-bluebold font-bold text-lg">
                Chủ đề:
              </label>
              <select
                name=""
                id=""
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="rounded-md border-2 border-gray-300 ring-1 ring-gray-500 w-full bg-primary-lightbold px-4 py-2 text-primary-bluebold"
              >
                <option value="">Chọn chủ đề</option>
                {topics?.map((t) => (
                  <option key={t._id} value={t._id}>
                    {t.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-primary-bluebold font-bold text-lg">
                Tên Bài Viết:
              </label>
              <input
                type="text"
                placeholder="tên bài viết..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="rounded-md border-2 border-gray-300 ring-1 ring-gray-500 w-full bg-primary-lightbold px-4 py-2 text-primary-bluebold"
              />
            </div>
            <div>
              <label className="text-primary-bluebold font-bold text-lg">
                Ảnh Bài Viết:
              </label>
              <input
                type="file"
                placeholder="tên bài viết..."
                onChange={(e) => setThumbnail(e.target.files[0])}
                className="rounded-md border-2 border-gray-300 ring-1 ring-gray-500 w-full bg-primary-lightbold px-4 py-2 text-primary-bluebold"
              />
            </div>
            <div>
              <label className="text-primary-bluebold font-bold text-lg">
                Nội Dung:
              </label>

              <Editor value={content} onChange={setContent} />
            </div>

            <button
              type="submit"
              className="mt-2 p-2 w-full bg-emerald-500/50 text-primary-bluebold font-bold"
            >
              Đăng bài
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
