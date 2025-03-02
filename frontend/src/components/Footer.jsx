import React from "react";
import { MdOutlineWifiTethering } from "react-icons/md";
import { CiInstagram } from "react-icons/ci";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

const Footer = () => {
  const logo = "/dot-logo-dark.svg";

  return (
    <div className=" bg-primary-lightbold font-roboto">
      <div className="container max-w-screen-xl mx-auto p-4 lg:py-8">
        <img className="w-[160px] lg:w-22" src={logo} alt="" />
        <div className="flex-col lg:flex lg:flex-row items-center justify-between mt-4">
          <h1 className="font-bold lg:font-normal text-xl text-black">
            Điểm đến hàng đầu thế giới cho mọi thứ liên quan đến thể thao điện
            tử và trò chơi.
          </h1>
          <div className="mt-8 lg:mt-0 flex  items-center gap-6">
            <div className="h-[40px] w-[40px] flex items-center justify-center rounded-full bg-primary-gray">
              <MdOutlineWifiTethering size={22} />
            </div>
            <div className="h-[40px] w-[40px] flex items-center justify-center rounded-full bg-primary-gray">
              <CiInstagram size={22} />
            </div>
            <div className="h-[40px] w-[40px] flex items-center justify-center rounded-full bg-primary-gray">
              <FaXTwitter size={22} />
            </div>
            <div className="h-[40px] w-[40px] flex items-center justify-center rounded-full bg-primary-gray">
              <FaFacebook size={22} />
            </div>
            <div className="h-[40px] w-[40px] flex items-center justify-center rounded-full bg-primary-gray">
              <FaYoutube size={22} />
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 mt-8 w-full"></div>
        <div className="flex justify-between items-center mt-8">
          <p className="text-gray-500 text-sm">2025, DotEsports</p>
          <p className="text-gray-500 text-sm">Powered by QuyVan</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
