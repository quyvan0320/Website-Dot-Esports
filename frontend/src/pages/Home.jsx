import React from "react";
import {
  useGetFeaturedPostQuery,
  useGetLatestPostQuery,
} from "../redux/api/postApiSlice";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { FaEdit } from "react-icons/fa";
import "dayjs/locale/vi";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
dayjs.locale("vi");
import PanigationPost from "../components/PanigationPost";
import Loading from "../components/Loading";
import { useSelector } from "react-redux";

dayjs.locale("vi");

const Home = () => {
  const {
    data: posts,
    isLoading: loadingPosts,
    error,
  } = useGetLatestPostQuery();
  const {
    data: featuredPosts,
    isLoading: loadingFeatured,
    error: errorFeatured,
  } = useGetFeaturedPostQuery();
  console.log(posts);
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <div>
      <div className="bg-primary-lightbold">
        <div className="container max-w-screen-xl mx-auto  font-roboto">
          <div className="grid lg:grid-cols-4  gap-10 lg:gap-6 p-4 lg:py-4">
            {posts?.map((post, index) => (
              <div
                key={post._id}
                className={`overflow-hidden ${
                  index === 0 ? "md:col-span-2 md:row-span-2" : "md:col-span-1"
                }`}
              >
                <img
                  src={post.thumbnail}
                  alt={post.title}
                  className={`w-full object-cover ${
                    index === 0
                      ? "h-[200px] md:h-[400px] lg:h-[400px]"
                      : "h-[200px] lg:h-[130px]"
                  }`}
                />
                <Link
                  className="w-full min-w-0"
                  to={`/${post.topic.slug}/${post.slug}`}
                >
                  <p className="font-bold mt-2 text-primary-greenpale text-sm">
                    {post.topic.name}
                  </p>
                  <h2
                    className={`mt-1 font-bold ${
                      index === 0
                        ? "text-lg lg:text-2xl"
                        : "text-lg lg:text-[18px]"
                    }`}
                  >
                    {post.title}
                  </h2>
                  <div className="flex gap-2 items-center mt-2">
                    <p className="font-bold text-[16px] lg:text-sm text-primary-bluebold">
                      {post.author.username}
                    </p>
                    <p>·</p>
                    <p className="text-gray-500 text-sm lg:text-xs font-bold">
                      {dayjs(post.createdAt).fromNow()}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-primary-light">
        <div className="container p-4 lg:p-0 max-w-screen-xl mx-auto  font-roboto">
          <h1 className="font-bold text-3xl text-primary-bluebold mt-6 lg:mt-4">
            NỔI BẬT
          </h1>
          <div className="overflow-x-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-4">
              {featuredPosts?.map((post) => (
                <div key={post._id} className="min-w-[250px]">
                  <img
                    src={post.thumbnail}
                    alt={post.title}
                    className="w-full h-[180px] lg:h-[240px] object-cover object-center"
                  />
                  <Link
                    className="w-full block"
                    to={`/${post.topic.slug}/${post.slug}`}
                  >
                    <p className="font-bold mt-4 text-primary-greenpale text-sm">
                      {post.topic.name}
                    </p>
                    <h2 className="mt-1 font-bold text-xl">
                      {post.title.length > 70
                        ? `${post.title.substring(0, 70)}...`
                        : post.title}
                    </h2>
                    <div className="flex gap-2 items-center mt-2">
                      <p className="font-bold text-sm text-primary-bluebold">
                        {post.author.username}
                      </p>
                      <p className="text-gray-500 text-xs font-bold">
                        {dayjs(post.createdAt).format("DD/MM/YYYY")}
                      </p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        {loadingFeatured && <Loading />}
        {loadingPosts && <Loading />}
      </div>
      <PanigationPost />
      <Link to={"/create-post"}>
        <button
          className={`${
            userInfo?.role === "reader" || !userInfo ? "hidden" : null
          } p-[16px] lg:p-[12px] fixed bottom-16 right-10 z-20 rounded-full bg-primary-gray shadow-lg`}
        >
          <FaEdit size={20} />
        </button>
      </Link>
    </div>
  );
};

export default Home;
