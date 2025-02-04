/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { IMAGES } from "@/utils/image";
import { ROUTES } from "@/utils/route";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { LoginModal } from "./login";
import Cookies from "js-cookie";
import {
  CircleDollarSign,
  FolderPlus,
  Gift,
  History,
  House,
  Info,
  LogOut,
  NotepadText,
  PhoneCall,
  ShoppingCart,
  UserRound,
} from "lucide-react";
import { usePathname } from "next/navigation";

export default function Header() {
  const isLogin = Cookies.get("isLogin");
  const [logined, setLogined] = useState(false);
  const [open, setOpen] = useState(false);

  const pathname = usePathname();

  const checkTabEnable = (tab: string, pathname: any) => {
    if (pathname === tab) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    if (isLogin) {
      // setLogined(true)
    }
  }, []);

  const renderLogin = (isLogin: any) => {
    if (false) {
      return (
        <Image
          src={IMAGES.LOGO}
          alt="logo"
          width={32}
          height={32}
          priority
          className="rounded-full"
        />
      );
    } else {
      return <LoginModal />;
    }
  };

  const handleLogOut = () => {
    Cookies.remove("isLogin");
    window.location.href = ROUTES.HOME;
  };

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <header className="w-full lg:w-3/4 relative bg-[rgb(var(--quaternary-rgb))] lg:bg-white p-4 lg:px-0 lg:py-6 flex items-center justify-between">
        <div className="lg:hidden flex flex-col justify-center">
          <button
            className="text-gray-800 w-10 h-10 relative focus:outline-none"
            onClick={() => setOpen(!open)}
          >
            <div className="block w-5 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <span
                aria-hidden="true"
                className={`block absolute h-0.5 w-5 bg-current transform transition duration-300 ease-in-out ${
                  open ? "rotate-45 translate-y-0" : "-translate-y-1.5"
                }`}
              ></span>
              <span
                aria-hidden="true"
                className={`block absolute h-0.5 w-5 bg-current transform transition duration-300 ease-in-out ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              ></span>
              <span
                aria-hidden="true"
                className={`block absolute h-0.5 w-5 bg-current transform transition duration-300 ease-in-out ${
                  open ? "-rotate-45 translate-y-0" : "translate-y-1.5"
                }`}
              ></span>
            </div>
          </button>
        </div>
        <a
          href="/"
          className="flex items-center justify-center gap-4 cursor-pointer"
        >
          <Image
            src={IMAGES.LOGO}
            alt="logo"
            width={32}
            height={32}
            priority
            className="hidden lg:flex rounded-full"
          />
          <div className="flex gap-1.5 ml-2">
            <span className="text-xl flex items-center justify-center font-bold text-red-600">
              IN
            </span>
            <span className="text-xl flex items-center justify-center font-bold text-green-600">
              ẢNH
            </span>
            <span className="text-xl flex items-center justify-center font-bold text-blue-700">
              TRỰC
            </span>
            <span className="text-xl flex items-center justify-center font-bold text-purple-500">
              TUYẾN
            </span>
          </div>
        </a>
        <div className="flex justify-center items-center gap-4">
          <div className="hidden border-2 border-gray-600 text-md font-semibold rounded-full px-6 py-1.5 lg:flex justify-center items-center gap-2">
            <PhoneCall size={15} /> Hotline: 0939.468.252
          </div>
          <div className="hidden lg:flex">{renderLogin(logined)}</div>
          <div className="flex lg:hidden">
            <ShoppingCart size={24} className="mr-3" />
          </div>
        </div>
        {open && (
          <div className="absolute mt-2 top-16 left-0 h-[1000px] w-full bg-white shadow-md z-20">
            <ul className="flex flex-col space-y-10 py-10 px-5">
              <li className="font-bold ">
                <a
                  href={`${ROUTES.HOME}`}
                  className="flex items-center justify-start gap-4 text-gray-700 hover:text-black"
                >
                  <House size={18} /> Trang chủ
                </a>
              </li>
              <li className="font-bold ">
                <a
                  href={`${ROUTES.ABOUT}`}
                  className="flex items-center justify-start gap-4 text-gray-700 hover:text-black"
                >
                  <Info size={18} /> Giới thiệu
                </a>
              </li>
              <li className="font-bold ">
                <a
                  href={`${ROUTES.PRODUCT}`}
                  className="flex items-center justify-start gap-4 text-gray-700 hover:text-black"
                >
                  <Gift size={18} /> Sản phẩm
                </a>
              </li>
              <li className="font-bold ">
                <a
                  href={`${ROUTES.PRICE}`}
                  className="flex items-center justify-start gap-4 text-gray-700 hover:text-black"
                >
                  <CircleDollarSign size={18} /> Bảng giá
                </a>
              </li>
              <li className="font-bold ">
                <a
                  href={`${ROUTES.BLOG}`}
                  className="flex items-center justify-start gap-4 text-gray-700 hover:text-black"
                >
                  <NotepadText size={18} /> Tin tức
                </a>
              </li>
              {logined && (
                <li className="font-bold ">
                  <a
                    href={`${ROUTES.ACCOUNT}?tab=profile`}
                    className="flex items-center justify-start gap-4 text-gray-700 hover:text-black"
                  >
                    <UserRound size={18} /> Hồ sơ cá nhân
                  </a>
                </li>
              )}
              {logined && (
                <li className="font-bold ">
                  <a
                    href={`${ROUTES.ACCOUNT}?tab=history`}
                    className="flex items-center justify-start gap-4 text-gray-700 hover:text-black"
                  >
                    <History size={18} /> Lịch sử mua hàng
                  </a>
                </li>
              )}
              {logined && (
                <li className="font-bold ">
                  <a
                    href={`${ROUTES.ACCOUNT}?tab=order-single`}
                    className="flex items-center justify-start gap-4 text-gray-700 hover:text-black"
                  >
                    <FolderPlus size={18} /> Tạo đơn hàng mới
                  </a>
                </li>
              )}
              {logined && (
                <li className="font-bold ">
                  <button
                    onClick={handleLogOut}
                    className="flex items-center justify-start gap-4 text-orange-700 hover:text-black"
                  >
                    <LogOut size={18} /> Đăng xuất
                  </button>
                </li>
              )}

              <li className="font-bold ">
                <a
                  href={`${ROUTES.ACCOUNT}?tab=profile`}
                  className="flex items-center justify-start gap-4 text-gray-700 hover:text-black"
                >
                  <UserRound size={18} /> Hồ sơ cá nhân
                </a>
              </li>
              <li className="font-bold ">
                <a
                  href={`${ROUTES.ACCOUNT}?tab=history`}
                  className="flex items-center justify-start gap-4 text-gray-700 hover:text-black"
                >
                  <History size={18} /> Lịch sử mua hàng
                </a>
              </li>
              <li className="font-bold ">
                <a
                  href={`${ROUTES.ACCOUNT}?tab=order-single`}
                  className="flex items-center justify-start gap-4 text-gray-700 hover:text-black"
                >
                  <FolderPlus size={18} /> Tạo đơn hàng mới
                </a>
              </li>
              <li className="font-bold ">
                <button
                  onClick={handleLogOut}
                  className="flex items-center justify-start gap-4 text-orange-700 hover:text-black"
                >
                  <LogOut size={18} /> Đăng xuất
                </button>
              </li>
            </ul>
          </div>
        )}
      </header>
      <div className="w-full bg-orange-700 hidden lg:flex justify-center items-center">
        <div className="w-3/4 text-white flex justify-between items-center py-5">
          <a
            href={`${ROUTES.HOME}`}
            className={`${
              checkTabEnable(ROUTES.HOME, pathname)
                ? "bg-white text-orange-700 font-bold"
                : "font-semibold"
            } text-lg px-4 py-2 rounded-full hover:text-orange-700 hover:bg-white`}
          >
            TRANG CHỦ
          </a>
          <a
            href={`${ROUTES.ABOUT}`}
            className={`${
              checkTabEnable(ROUTES.ABOUT, pathname)
                ? "bg-white text-orange-700 font-bold"
                : "font-semibold"
            } text-lg px-4 py-2 rounded-full hover:text-orange-700 hover:bg-white`}
          >
            VỀ CHÚNG TÔI
          </a>
          <a
            href={`${ROUTES.PLASTIC}`}
            className={`${
              checkTabEnable(ROUTES.PLASTIC, pathname)
                ? "bg-white text-orange-700 font-bold"
                : "font-semibold"
            } text-lg px-4 py-2 rounded-full hover:text-orange-700 hover:bg-white`}
          >
            IN ẤN
          </a>
          <a
            href={`${ROUTES.FRAME}`}
            className={`${
              checkTabEnable(ROUTES.FRAME, pathname)
                ? "bg-white text-orange-700 font-bold"
                : "font-semibold"
            } text-lg px-4 py-2 rounded-full hover:text-orange-700 hover:bg-white`}
          >
            KHUNG ẢNH
          </a>
          <a
            href={`${ROUTES.ALBUM}`}
            className={`${
              checkTabEnable(ROUTES.ALBUM, pathname)
                ? "bg-white text-orange-700 font-bold"
                : "font-semibold"
            } text-lg px-4 py-2 rounded-full hover:text-orange-700 hover:bg-white`}
          >
            PHOTOBOOK
          </a>
          <a
            href={`${ROUTES.PRICE}`}
            className={`${
              checkTabEnable(ROUTES.PRICE, pathname)
                ? "bg-white text-orange-700 font-bold"
                : "font-semibold"
            } text-lg px-4 py-2 rounded-full hover:text-orange-700 hover:bg-white`}
          >
            BẢNG GIÁ
          </a>
          <a
            href={`${ROUTES.BLOG}`}
            className={`${
              checkTabEnable(ROUTES.BLOG, pathname)
                ? "bg-white text-orange-700 font-bold"
                : "font-semibold"
            } text-lg px-4 py-2 rounded-full hover:text-orange-700 hover:bg-white`}
          >
            TIN TỨC
          </a>
        </div>
      </div>
    </div>
  );
}
