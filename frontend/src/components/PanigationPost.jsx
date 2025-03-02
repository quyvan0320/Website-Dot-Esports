import React, { useState } from "react";
import { useGetPostsPaginationQuery } from "../redux/api/postApiSlice";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import Loading from "./Loading";

const PanigationPost = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useGetPostsPaginationQuery({
    page,
    limit: 6,
  });
  console.log(data);

  return (
    <div className="bg-primary-light">
      <div className="container px-4 lg:px-0 max-w-screen-xl mx-auto  font-roboto">
        <h1 className="font-bold text-3xl text-primary-bluebold mt-4">
          TẤT CẢ BÀI VIẾT
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 py-4">
          {data?.posts?.slice(0, 6).map((post, index) => (
            <div key={post?._id} className="flex gap-6 lg:block">
              <img
                src={post?.thumbnail}
                alt={post?.title}
                className="col-span-1 w-[200px] h-[80px] md:w-[300px] md:h-[200px] lg:w-full lg:h-[200px] object-cover object-center"
              />
              <Link className="w-full min-w-0" to={`/${post.topic.slug}/${post.slug}`}>
                <p className="font-bold mt-0 text-[16px] lg:mt-4 text-primary-greenpale  lg:text-sm">
                  {post?.topic.name}
                </p>
                <h2 className="mt-1 text-[18px] font-bold lg:text-xl">
                  {post?.title.length > 80
                    ? `${post?.title.substring(0, 80)}...`
                    : post?.title}
                </h2>
                <div className="flex gap-4 lg:gap-2 items-center mt-2">
                  <p className="font-bold text-[16px] lg:text-sm text-primary-bluebold">
                    {post?.author.username}
                  </p>

                  <p className="text-gray-500 text-sm lg:text-xs font-bold">
                    {dayjs(post?.createdAt).format("DD/MM/YYYY")}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center gap-8 my-4">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="font-bold text-lg uppercase text-gray-500 cursor-pointer"
          >
            Trước
          </button>
          <span className="text-lg">
            {page} / {data?.totalPages}
          </span>
          <button
            className="font-bold text-lg uppercase text-gray-500 cursor-pointer"
            disabled={page === data?.totalPages}
            onClick={() => setPage(page + 1)}
          >
            Sau
          </button>
        </div>
      </div>
      {isLoading && <Loading />}
    </div>
  );
};

export default PanigationPost;
