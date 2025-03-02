import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineBars3 } from "react-icons/hi2";
import { IoMdLogIn } from "react-icons/io";
import { AiOutlineClose } from "react-icons/ai";
import LoginModal from "../../components/LoginModal";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../../redux/api/userApiSlice";
import { logout } from "../../redux/features/auth/authSlice";
import { useGetCategoryAndTopicQuery } from "../../redux/api/categoryApiSlice";

const Navigation = () => {
  const logo = "/dot-logo-dark.svg";
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [menuActive, setMenuActive] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };
  const { data: result } = useGetCategoryAndTopicQuery();
  const navigate = useNavigate();
  console.log(result);
  const [logoutUser, { isLoading }] = useLogoutMutation();
  const dispatch = useDispatch();
  const logoutHandler = async () => {
    await logoutUser();
    dispatch(logout());
    navigate("/");
  };
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <div className="border-b-2 border-primary-bluebold bg-primary-lightbold font-roboto">
      <nav className="container p-4 max-w-screen-xl lg:mx-auto flex items-center lg:py-2 justify-between">
        <Link to={"/"}>
          <img className="w-[160px] lg:w-30" src={logo} alt="" />
        </Link>
        <div className="flex items-center gap-4">
          <ul className="hidden lg:flex items-center gap-4 ">
            {result?.map((r) => (
              <Link to={`/${r.slug}`} key={r._id}>
                <li className="font-bold text-[16px] lg:text-lg text-primary-bluebold uppercase">
                  {r.name}
                </li>
              </Link>
            ))}
          </ul>
          <ul
            className={`${
              openMenu === false && "hidden"
            } p-4 absolute lg:hidden items-center gap-4 bg-primary-light shadow-lg w-full left-0 top-[66px] `}
          >
            {result?.map((r) => (
              <Link to={`/${r.slug}`} key={r._id}>
                <li className="font-bold text-[16px] lg:text-lg text-primary-bluebold uppercase">
                  {r.name}
                </li>
              </Link>
            ))}
          </ul>
          <button
            onClick={() => setOpenMenu(!openMenu)}
            className="block lg:hidden text-primary-bluebold"
          >
            {openMenu ? (
              <AiOutlineClose size={26} />
            ) : (
              <HiOutlineBars3 size={26} />
            )}
          </button>
          <div className="flex items-center gap-3">
            {userInfo ? (
              <div onClick={toggleMenu} className="flex items-center gap-2">
                <p className="hidden lg:block text-primary-bluebold font-bold">
                  {userInfo.username}
                </p>
                <div className="">
                  <img
                    className="w-[32px] h-[32px] rounded-[16px]"
                    src={userInfo.avatar}
                    alt={userInfo.username}
                  />
                </div>
                {menuActive && (
                  <div className="absolute bg-primary-light  right-5 top-14 lg:right-10 shadow-xl">
                    <Link
                      to={"/account"}
                      className="block px-4 py-2 font-bold text-primary-bluebold"
                    >
                      Tài Khoản
                    </Link>
                    <button
                      onClick={logoutHandler}
                      className="block px-4 py-2 font-bold text-red-500"
                    >
                      Đăng Xuất
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="hidden lg:block text-primary-bluebold px-2 py-2 bg-primary-gray font-bold"
                >
                  Đăng Nhập
                </button>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="block lg:hidden text-primary-bluebold font-bold"
                >
                  <IoMdLogIn size={26} />
                </button>
              </>
            )}
          </div>
        </div>
      </nav>
      <LoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Navigation;
