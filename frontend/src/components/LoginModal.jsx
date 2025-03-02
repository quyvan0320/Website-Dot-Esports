import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import {
  useLoginMutation,
  useRegisterMutation,
} from "../redux/api/userApiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import { FaEyeSlash } from "react-icons/fa6";
import { FaEye } from "react-icons/fa6";
import { isEmail, isLength, isRequire } from "../utils/validate";
import Loading from "./Loading";

const LoginModal = ({ isOpen, onClose }) => {
  const logonotext = "/logomark-dark.svg";
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [continuePassword, setContinuePassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const [loginUser, { isLoading }] = useLoginMutation();
  const [registerUser, { isLoadingRegister }] = useRegisterMutation();

  const validateInputsLogin = () => {
    const emailError =
      isRequire(email, "Nhập trường email đăng nhập") ||
      isEmail(email, "Nhập đúng định dạng email");
    if (emailError) {
      toast.error(emailError);
      return false;
    }

    const passwordError =
      isRequire(password, "Nhập trường mật khẩu đăng nhập") ||
      isLength(6)(password, "Mật khẩu phải lớn hơn 6 ký tự");
    if (passwordError) {
      toast.error(passwordError);
      return false;
    }

    return true;
  };

  const validateInputsRegister = () => {
    const usernameError = isRequire(username, "Nhập trường tên người dùng");
    if (usernameError) {
      toast.error(usernameError);
      return false;
    }

    const emailError =
      isRequire(email, "Nhập trường email đăng nhập") ||
      isEmail(email, "Nhập đúng định dạng email");
    if (emailError) {
      toast.error(emailError);
      return false;
    }

    const passwordError =
      isRequire(password, "Nhập trường mật khẩu đăng nhập") ||
      isLength(6)(password, "Mật khẩu phải lớn hơn 6 ký tự");
    if (passwordError) {
      toast.error(passwordError);
      return false;
    }

    const confrimPasswordError =
      isRequire(continuePassword, "Nhập trường mật khẩu đăng nhập") ||
      isLength(6)(continuePassword, "Mật khẩu phải lớn hơn 6 ký tự");
    if (confrimPasswordError) {
      toast.error(confrimPasswordError);
      return false;
    }
    return true;
  };
  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!validateInputsLogin()) return;
    try {
      const res = await loginUser({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success("Đăng nhập thành công!");
      setEmail("");
      setPassword("");
      onClose();
    } catch (error) {
      console.log(error.message);
      toast.error(error?.data?.error);
    }
  };

  const registerHandler = async (e) => {
    e.preventDefault();
    if (!validateInputsRegister()) return;

    if (password !== continuePassword) {
      toast.error("Mật khẩu không trùng khớp!");
      return;
    } else {
      try {
        const res = await registerUser({ username, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success("Tạo tài khoản thành công");
        setEmail("");
        setUsername("");
        setPassword("");
        setContinuePassword("");
        onClose();
      } catch (error) {
        console.log(error.message);
        toast.error(error?.data?.error);
      }
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed top-0 left-0 px-4 lg:px-0 right-0 w-screen h-screen font-roboto bg-black/20 z-50 flex items-center justify-center">
          <div className="w-full md:w-2/3  lg:w-1/3 p-8 bg-primary-light rounded-md">
            {isLoading && <Loading />}
            {isLoadingRegister && <Loading />}
            <div className="flex items-center justify-between">
              <img src={logonotext} alt="" />
              <button onClick={onClose}>
                <IoMdClose
                  className="text-black/80 hover:text-primary-bluebold"
                  size={30}
                />
              </button>
            </div>
            <div>
              <h1 className="text-primary-bluebold font-bold text-2xl mb-2 mt-4">
                {isLogin ? "Đăng Nhập" : "Tạo Tài Khoản"}
              </h1>
              {isLogin ? (
                <form
                  onSubmit={submitHandler}
                  className="pt-6 border-t border-primary-gray"
                >
                  <div>
                    <label className="block text-primary-bluebold">Email</label>
                    <input
                      type="text"
                      value={email}
                      className="px-2 border-b-2 mt-1 border-primary-bluebold/50 bg-primary-lightbold w-full focus:outline-none py-2 text-primary-bluepale"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="mt-4">
                    <label className="block text-primary-bluebold">
                      Mật Khẩu
                    </label>
                    <div className="relative">
                      <p
                        className="absolute top-[50%] right-2 translate-y-[-50%]"
                        onClick={() => toggleShowPassword()}
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
                  <button
                    type="submit"
                    className="py-2 focus:outline-none bg-emerald-300 hover:bg-primary-greenpale mt-4 text-primary-bluebold font-bold w-full"
                  >
                    Đăng Nhập
                  </button>
                </form>
              ) : (
                <form
                  onSubmit={registerHandler}
                  className="pt-6 border-t border-primary-gray"
                >
                  <div>
                    <label className="block text-primary-bluebold">
                      Tên Người Dùng
                    </label>
                    <input
                      type="text"
                      value={username}
                      className="px-2 border-b-2 mt-1 border-primary-bluebold/50 bg-primary-lightbold w-full focus:outline-none py-2 text-primary-bluepale"
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className="mt-4">
                    <label className="block text-primary-bluebold">Email</label>
                    <input
                      type="text"
                      value={email}
                      className="px-2 border-b-2 mt-1 border-primary-bluebold/50 bg-primary-lightbold w-full focus:outline-none py-2 text-primary-bluepale"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="mt-4">
                    <label className="block text-primary-bluebold">
                      Mật Khẩu
                    </label>
                    <div className="relative">
                      <p
                        className="absolute top-[50%] right-2 translate-y-[-50%]"
                        onClick={() => toggleShowPassword()}
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
                      className="px-2 border-b-2 mt-1 border-primary-bluebold/50 bg-primary-lightbold w-full focus:outline-none py-2 text-primary-bluepale"
                      onChange={(e) => setContinuePassword(e.target.value)}
                    />
                  </div>
                  <button
                    type="submit"
                    className="py-2 focus:outline-none bg-emerald-300 hover:bg-primary-greenpale mt-4 text-primary-bluebold font-bold w-full"
                  >
                    Tạo Tài Khoản
                  </button>
                </form>
              )}

              <h4
                onClick={() => setIsLogin(!isLogin)}
                className="uppercase text-primary-greenpale hover:text-primary-bluebold font-bold text-center mt-4"
              >
                {isLogin ? "chưa có tài khoản?" : "Đã có tài khoản"}
              </h4>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginModal;
