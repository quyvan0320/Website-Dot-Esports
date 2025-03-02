import React from "react";
import { Link, useParams } from "react-router-dom";
import {
  useGetLatestPostQuery,
  useGetPostsByCategoryQuery,
} from "../redux/api/postApiSlice";
import dayjs from "dayjs";
import { useGetCategoryAndTopicQuery } from "../redux/api/categoryApiSlice";
import { MdOutlineWifiTethering } from "react-icons/md";
import Loading from "../components/Loading";
import { useSelector } from "react-redux";
import { FaEdit } from "react-icons/fa";

const CategoryPost = () => {
  const { categorySlug } = useParams();
  const {
    data: posts,
    error,
    isLoading,
  } = useGetPostsByCategoryQuery(categorySlug);
  const { data: latestPost } = useGetLatestPostQuery();
  const { userInfo } = useSelector((state) => state.auth);

  const { data: result } = useGetCategoryAndTopicQuery();
  const category = result?.find((p) => p.slug === categorySlug);

  return (
    <div>
      <div className="bg-primary-light">
        <div className="container p-4 lg:p-0 max-w-screen-xl mx-auto  font-roboto">
          <div className="flex items-center gap-1 mt-4">
            <h1 className="text-4xl text-primary-bluebold font-bold">
              {category?.name}
            </h1>
            <MdOutlineWifiTethering size={26} className="text-gray-500" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
            {posts.length > 0 ? (
              posts?.map((post, index) => (
                <div
                  key={post._id}
                  className={`${
                    index === 0
                      ? "md:col-span-1 md:row-span-3"
                      : "md:col-span-1 flex flex-row-reverse gap-6"
                  }`}
                >
                  <img
                    src={post.thumbnail}
                    alt={post.title}
                    className={`object-cover object-center ${
                      index === 0
                        ? " w-full h-[250px]  lg:h-[350px]"
                        : "w-[200px] h-[80px] lg:w-[200px] lg:h-[130px]"
                    }`}
                  />
                  <div>
                    <Link
                      className="w-full min-w-0"
                      to={`/${post.topic.slug}/${post.slug}`}
                    >
                      <p className="font-bold  text-primary-greenpale text-sm lg:text-lg">
                        {post.topic.name}
                      </p>

                      <h2
                        className={`mt-1 font-bold ${
                          index === 0
                            ? "text-lg lg:text-2xl "
                            : "text-lg lg:text-[18px]"
                        }`}
                      >
                        {post.title}
                      </h2>
                      <div className="flex gap-2 items-center mt-2">
                        <p className="font-bold text-sm text-primary-bluebold">
                          {post.author.username}
                        </p>
                        <p>·</p>
                        <p className="text-gray-500 text-xs font-bold">
                          {dayjs(post.createdAt).fromNow()}
                        </p>
                      </div>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <>
                <h1 className="font-bold text-xl text-center text-primary-bluebold mt-6 lg:mt-4">
                  Không có bài viết!
                </h1>
              </>
            )}
          </div>
          <div className="mt-6 pb-6 lg:grid lg:gap-20 lg:grid-cols-[2.5fr_1.5fr]">
            <div>
              <h1 className="font-bold text-2xl text-primary-bluebold">
                TẤT CẢ
              </h1>
              <div className="space-y-6 mt-4">
                {posts.length > 0 ? (
                  posts?.map((p) => (
                    <div key={p._id} className="flex gap-6">
                      <img
                        src={p.thumbnail}
                        className="w-[160px] h-[100px] md:w-[300px] md:h-[160px] lg:w-[260px] lg:h-[160px] object-cover object-center "
                        alt=""
                      />
                      <Link
                        className="w-full min-w-0"
                        to={`/${p.topic.slug}/${p.slug}`}
                      >
                        <div>
                          <p className="font-bold mt-0 text-sm  text-primary-greenpale  lg:text-sm">
                            {p?.topic?.name}
                          </p>
                          <p className="mt-1 text-[18px] font-bold lg:text-[18px] lg:mt-0  text-primary-bluebold">
                            {p.title.length > 80
                              ? `${p.title.substring(0, 80)}...`
                              : p.title}
                          </p>
                          <div className="flex gap-4 lg:gap-6 items-center mt-2">
                            <p className="font-bold text-[16px] lg:text-sm text-primary-bluebold">
                              {p.author.username}
                            </p>

                            <p className="text-gray-500 text-xs lg:text-xs  font-bold">
                              {dayjs(p.createdAt).format("DD/MM/YYYY")}
                            </p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))
                ) : (
                  <>
                    <h1 className="font-bold text-xl text-center text-primary-bluebold mt-6 lg:mt-4">
                      Không có bài viết!
                    </h1>
                  </>
                )}
              </div>
            </div>
            <div className="mt-6 lg:mt-0 lg:block">
              <h1 className=" font-bold text-2xl text-primary-bluebold">
                TƯƠNG TỰ
              </h1>
              <div className="space-y-6 mt-4">
                {latestPost.length > 0 ? (
                  latestPost?.map((p, index) => (
                    <div key={p._id} className="flex gap-6 items-center">
                      <div className="w-[60px] flex justify-center">
                        <p className="w-[40px] h-[40px] flex items-center justify-center rounded-full text-white bg-black font-bold">
                          {index + 1}
                        </p>
                      </div>
                      <Link
                        to={`/${p.topic.slug}/${p.slug}`}
                        className="w-full min-w-0"
                      >
                        <div>
                          <p className="font-bold text-primary-greenpale text-sm">
                            {p?.topic?.name}
                          </p>
                          <p className="font-extrabold text-black text-[20px] break-words">
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
                  ))
                ) : (
                  <>
                    <h1 className="font-bold text-xl text-center text-primary-bluebold mt-6 lg:mt-4">
                      Không có bài viết!
                    </h1>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        <Link to={"/create-post"}>
          <button
            className={`${
              userInfo?.role === "reader" || !userInfo ? "hidden" : null
            } p-[16px] lg:p-[12px]  fixed bottom-16 right-10 z-20 rounded-full bg-primary-gray shadow-lg`}
          >
            <FaEdit size={20} />
          </button>
        </Link>
        {isLoading && <Loading />}
      </div>
    </div>
  );
};

export default CategoryPost;
