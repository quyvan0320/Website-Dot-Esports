import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useDeletePostMutation,
  useGetLatestPostQuery,
  useGetPostBySlugQuery,
} from "../redux/api/postApiSlice";
import dayjs from "dayjs";
import Loading from "../components/Loading";
import { GoTrash } from "react-icons/go";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const PostPage = () => {
  const { postSlug } = useParams();
  const { userInfo } = useSelector((state) => state.auth);
  const {
    data: post,
    refetch,
    isLoading,
    error,
  } = useGetPostBySlugQuery(postSlug);

  const { data: latestPost } = useGetLatestPostQuery();
  const navigate = useNavigate();
  const [deletePost] = useDeletePostMutation();
  const deleteHandler = async (id) => {
    await deletePost(id).unwrap();
    toast.success("Xóa bài viết thành công");
    refetch();
    navigate("/");
  };
  return (
    <div className="bg-primary-light">
      <img
          className="lg:hidden w-full object-cover h-[400px] object-center"
          src={post?.thumbnail || "/default-thumbnail.jpg"}
          alt={post?.title || "Bài viết"}
        />
      <div className="container px-4 py-6 lg:px-0 max-w-screen-xl mx-auto  font-roboto">
        <div>
          <p className="font-bold mt-1 text-primary-greenpale text-lg">
            {post?.topic?.name || "Chưa có chủ đề"}
          </p>
          <h1 className="font-bold text-3xl mt-2 text-primary-bluebold">
            {post?.title || "Không có tiêu đề"}
          </h1>
          <div className="flex-row lg:flex items-center gap-4 mt-2 relative">
            <div className="flex items-center gap-2 mb-2 lg:mb-0">

            <img
              className="w-[40px] h-[40px] rounded-full"
              src={post?.author?.avatar || "/default-avatar.png"}
              alt={post?.author?.username || "Tác giả"}
            />
            <p className="text-primary-bluebold font-bold text-sm">
              {post?.author?.username || "Không rõ tác giả"}
            </p>
            </div>
            <p className="text-gray-600 font-light hidden lg:block">|</p>
            <p className="text-gray-600 font-light">
              Đăng vào lúc:{" "}
              {dayjs(post?.createdAt).format("HH:mm:ss DD-MM-YYYY")}
            </p>
            <button
              onClick={() => deleteHandler(post._id)}
              className={`${
                userInfo?.role === "admin" ? "" : "hidden"
              } absolute top-6 right-0 lg:top-0 p-2 rounded-md bg-primary-gray`}
            >
              <GoTrash size={18} className="text-red-500 font-bold" />
            </button>
          </div>
        </div>
        <img
          className="hidden lg:block w-full object-cover mt-4 h-[400px] object-center"
          src={post?.thumbnail || "/default-thumbnail.jpg"}
          alt={post?.title || "Bài viết"}
        />
        <div className="grid grid-rows-1 lg:grid-cols-[2.5fr_1.5fr] lg:gap-20">
          <div
            className="quill-content prose prose-lg leading-relaxed space-y-6 max-w-full mx-auto mt-6"
            dangerouslySetInnerHTML={{
              __html: post?.content || "<p>Chưa có nội dung.</p>",
            }}
          />
          <div className="border border-primary-greenpale mt-4 lg:hidden"></div>
          <div className="mt-6">
            <h1 className="font-bold text-2xl text-primary-bluebold">
              BÀI VIẾT TƯƠNG TỰ
            </h1>
            <div className="space-y-6 mt-4">
              {latestPost?.map((p) => (
                <div key={p._id} className="flex gap-6">
                  <img
                    src={p.thumbnail}
                    className="w-[160px] h-[100px] lg:w-[220px] lg:h-[100px] object-cover object-center "
                    alt=""
                  />
                  <Link className="w-full min-w-0" to={`/${p.topic.slug}/${p.slug}`}>
                    <div>
                      <p className="font-bold text-primary-greenpale text-sm">
                        {p?.topic?.name}
                      </p>
                      <p className="font-bold text-primary-bluebold text-[18px]">
                        {p.title.length > 80
                          ? `${p.title.substring(0, 80)}...`
                          : p.title}
                      </p>
                      <p className="text-primary-bluebold mt-2 font-bold text-sm">
                        {p?.author?.username || "Không rõ tác giả"}
                      </p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
        {isLoading && <Loading />}
      </div>
    </div>
  );
};

export default PostPage;
