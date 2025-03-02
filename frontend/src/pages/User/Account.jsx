import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaEyeSlash } from "react-icons/fa6";
import { FaEye } from "react-icons/fa6";
import { toast } from "react-toastify";
import {
  useFetchAllUserQuery,
  useUpdateProfileMutation,
} from "../../redux/api/userApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { FaBookReader } from "react-icons/fa";
import { FaReadme } from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";
import ModalUpdateRoles from "../../components/ModalUpdateRoles";
import { Link } from "react-router-dom";

const Account = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [password, setPassword] = useState("");
  const [continuePassword, setContinuePassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== continuePassword) {
      toast.error("Mật khẩu không khớp kiểm tra lại");
      return;
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          avatar,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success("Cập Nhật hồ sơ thành công");
        setPassword("");
        setContinuePassword("");
      } catch (error) {
        console.log(error.message);
        toast.error(error?.data?.error);
      }
    }
  };
  return (
    <div className="container px-4 lg:px-0 max-w-screen-xl mx-auto bg-primary-light">
      <div className="my-4">
        <h1 className="text-primary-bluebold text-2xl font-bold">
          Tài khoản của tôi
        </h1>
        <div className="flex-row lg:flex w-full gap-2 mt-4">
          <div className="lg:flex-[3] ">
            <h4 className="text-primary-bluepale text-xl font-bold">Hồ Sơ</h4>
            <div>
              <div className="flex items-center gap-6">
                <img
                  src={userInfo.avatar}
                  className="w-[100] mt-4 h-[100px] rounded-[50px]"
                  alt=""
                />
                {userInfo.role == "reader" && (
                  <div className="flex items-center gap-2 ">
                    <FaBookReader size={24} />{" "}
                    <p className="text-lg text-primary-bluebold font-bold">
                      Đọc Giả
                    </p>
                  </div>
                )}
                {userInfo.role == "author" && (
                  <div className="flex items-center gap-2 ">
                    <FaReadme size={24} />{" "}
                    <p className="text-lg text-primary-bluebold font-bold">
                      Tác Giả
                    </p>
                  </div>
                )}
                {userInfo.role == "admin" && (
                  <div className="flex items-center gap-2 ">
                    <RiAdminFill size={24} />{" "}
                    <p className="text-lg text-primary-bluebold font-bold">
                      Admin
                    </p>
                  </div>
                )}
              </div>
              <form onSubmit={submitHandler} action="" className="mt-4">
                <div className="mt-6">
                  <label className="block text-primary-bluebold">
                    Avatar Url
                  </label>
                  <input
                    type="text"
                    value={avatar}
                    className="px-2 border-b-2 mt-1 border-primary-bluebold/50 bg-primary-lightbold w-full lg:w-2/3 focus:outline-none py-2 text-primary-bluepale"
                    onChange={(e) => setAvatar(e.target.value)}
                  />
                </div>
                <div className="mt-4">
                  <label className="block text-primary-bluebold">
                    Tên Người Dùng
                  </label>
                  <input
                    type="text"
                    readOnly
                    value={userInfo.username}
                    className="px-2 border-b-2 mt-1 border-primary-bluebold/50 bg-primary-lightbold w-full lg:w-2/3 focus:outline-none py-2 text-primary-bluepale"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="mt-4">
                  <label className="block text-primary-bluebold">Email</label>
                  <input
                    type="text"
                    readOnly
                    value={userInfo.email}
                    className="px-2 border-b-2 mt-1 border-primary-bluebold/50 bg-primary-lightbold w-full lg:w-2/3 focus:outline-none py-2 text-primary-bluepale"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mt-4">
                  <label className="block text-primary-bluebold">
                    Mật Khẩu
                  </label>
                  <div className="relative w-full lg:w-2/3">
                    <p
                      className="absolute top-[50%] right-2 translate-y-[-50%]"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <FaEye size={26} className="text-primary-bluebold" />
                      ) : (
                        <FaEyeSlash
                          size={26}
                          className="text-primary-bluebold"
                        />
                      )}
                    </p>

                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      className="px-2 border-b-2 mt-1 border-primary-bluebold/50 bg-primary-lightbold w-full focus:outline-none py-2 text-primary-bluepale"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-primary-bluebold">
                    Nhập Lại Mật Khẩu
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={continuePassword}
                    className="px-2 border-b-2 mt-1 border-primary-bluebold/50 bg-primary-lightbold w-full lg:w-2/3 focus:outline-none py-2 text-primary-bluepale"
                    onChange={(e) => setContinuePassword(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  className="py-2 focus:outline-none bg-emerald-300 hover:bg-primary-greenpale mt-4 text-primary-bluebold font-bold w-full lg:w-2/3"
                >
                  Lưu
                </button>
              </form>
            </div>
          </div>
          <div
            className={`${userInfo.role === "reader" && "hidden"} mt-6 py-8 lg:py-0 lg:mt-6 lg:flex-[2]  `}
          >
            <h4 className="text-primary-bluepale text-xl font-bold">
              Chức Năng
            </h4>
            <div className="flex items-center gap-4 flex-wrap mt-4">
              {userInfo.role === "admin" && (
                <>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="text-primary-bluebold px-2  py-2 bg-primary-gray font-bold"
                  >
                    Cập Nhật Roles
                  </button>
                  <Link to={"/category"}>
                    <button className="text-primary-bluebold px-2  py-2 bg-primary-gray font-bold">
                      Quản Lý Danh Mục
                    </button>
                  </Link>
                  <Link to={"/topic"}>
                    <button className="text-primary-bluebold px-2  py-2 bg-primary-gray font-bold">
                      Quản Lý Chủ Đề
                    </button>
                  </Link>
                </>
              )}
              <Link to={"/my-post"}>
                <button
                  className={`${
                    userInfo.role === "reader" && "hidden"
                  } text-primary-bluebold px-2  py-2 bg-primary-gray font-bold`}
                >
                  Bài viết của tôi
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <ModalUpdateRoles
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Account;
