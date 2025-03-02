import React, { useState } from "react";
import PanigationPost from "../../components/PanigationPost";
import {
  useDeletePostMutation,
  useGetPostsPaginationByUserQuery,
} from "../../redux/api/postApiSlice";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { GoTrash } from "react-icons/go";
import Loading from "../../components/Loading";

const MyPost = () => {
  const [page, setPage] = useState(1);
  const { userInfo } = useSelector((state) => state.auth);
  console.log(userInfo);
  const { data, refetch, isLoading, isError } =
    useGetPostsPaginationByUserQuery({
      page,
      limit: 8,
      userId: userInfo?._id,
    });
  const [deletePost] = useDeletePostMutation();

  const deleteHandler = async (id) => {
    await deletePost(id).unwrap();
    toast.success("Xóa bài viết thành công");
    refetch();
  };
  console.log(data);
  console.log(userInfo);
  return (
    <div className="container px-4 lg:px-0 max-w-screen-xl h-screen mx-auto bg-primary-light font-roboto">
      <div className="py-6">
        <h1 className="text-primary-bluebold text-2xl font-bold mb-2">
          Bài Viết Của Tôi
        </h1>

        <div className="max-w-screen-lg mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-4">
            {data?.posts.map((post, index) => (
              <div key={post?._id} className="flex gap-4 relative">
                <button
                  onClick={() => deleteHandler(post._id)}
                  className="absolute top-0 right-0 rounded-md bg-primary-greenpale"
                >
                  <GoTrash
                    size={18}
                    className="text-red-500 font-bold bg-primary-lightbold"
                  />
                </button>
                <img
                  src={post?.thumbnail}
                  alt={post?.title}
                  className="col-span-1 w-[140px] h-[80px] lg:w-[200px] lg:h-[120px] object-cover object-center"
                />
                <Link
                  className="w-full min-w-0"
                  to={`/${post.topic.slug}/${post.slug}`}
                >
                  <div>
                    <p className="font-bold  text-primary-greenpale text-sm">
                      {post?.topic.name}
                    </p>

                    <h2 className="mt-1 font-bold text-xl">
                      {post?.title.length > 80
                        ? `${post?.title.substring(0, 80)}...`
                        : post?.title}
                    </h2>
                    <div className="flex gap-2 items-center mt-2">
                      <p className="text-gray-500 text-xs font-bold">
                        {dayjs(post?.createdAt).format("DD/MM/YYYY")}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center gap-8 mt-4">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="font-bold uppercase text-gray-500 cursor-pointer"
            >
              Trước
            </button>
            <span>
              {page} / {data?.totalPages}
            </span>
            <button
              className="font-bold uppercase text-gray-500 cursor-pointer"
              disabled={page === data?.totalPages}
              onClick={() => setPage(page + 1)}
            >
              Sau
            </button>
          </div>
        </div>
      </div>
      {isLoading && <Loading />}
    </div>
  );
};

export default MyPost;
