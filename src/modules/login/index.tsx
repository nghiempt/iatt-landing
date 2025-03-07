"use client";

import { toast } from "@/hooks/use-toast";
import Footer from "@/layout/footer";
import Header from "@/layout/header";
import { AccountService } from "@/services/account";
import { API } from "@/utils/api";
import { ROUTES } from "@/utils/route";
import Image from "next/image";
import { useState } from "react";
import Cookies from "js-cookie";
import Link from "next/link";
import { IMAGES } from "@/utils/image";
import "../../styles/helper.css";
import { Loader } from "lucide-react";

export default function LoginClient() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [logined, setLogined] = useState(false);

  const handleSubmitWithGoogle = async (e: any) => {
    e.preventDefault();
    window.location.href = API.AUTH.LOGIN_WITH_GOOGLE;
  };

  const validateForm = () => {
    if (username === "" || password === "") {
      toast({
        variant: "destructive",
        title: "Vui lòng điền đầy đủ thông tin",
      });
      return false;
    } else {
      return true;
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    setIsLoading(true);

    try {
      let data;

      if (/^\d+$/.test(username)) {
        data = await AccountService.loginAccountPhone(username, password);
      } else {
        data = await AccountService.loginAccountEmail(username, password);
      }

      if (data?.message === "SUCCESS") {
        Cookies.set("isLogin", data?.data, { expires: 7 });
        Cookies.set("userLogin", data?.data, { expires: 7 });
        setLogined(true);
        window.location.href = ROUTES.HOME;
      } else {
        throw new Error("Email hoặc mật khẩu chưa chính xác");
      }
    } catch (error) {
      console.error("========= Error Login:", error);
      toast({
        variant: "destructive",
        title: "Email hoặc mật khẩu chưa chính xác",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col justify-center items-center">
      {/* HELPER */}
      <label className="main top-[92%] lg:top-[60%] z-50">
        <svg
          width="30"
          height="30"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className=""
        >
          <path
            d="M5 18.3335H10C10.8841 18.3335 11.7319 18.6847 12.357 19.3098C12.9821 19.9349 13.3333 20.7828 13.3333 21.6668V26.6668C13.3333 27.5509 12.9821 28.3987 12.357 29.0239C11.7319 29.649 10.8841 30.0002 10 30.0002H8.33333C7.44928 30.0002 6.60143 29.649 5.97631 29.0239C5.35119 28.3987 5 27.5509 5 26.6668V18.3335ZM5 18.3335C5 16.3637 5.38799 14.4131 6.14181 12.5932C6.89563 10.7734 8.00052 9.11977 9.3934 7.72689C10.7863 6.33402 12.4399 5.22912 14.2597 4.4753C16.0796 3.72148 18.0302 3.3335 20 3.3335C21.9698 3.3335 23.9204 3.72148 25.7403 4.4753C27.5601 5.22912 29.2137 6.33402 30.6066 7.72689C31.9995 9.11977 33.1044 10.7734 33.8582 12.5932C34.612 14.4131 35 16.3637 35 18.3335M35 18.3335V26.6668C35 27.5509 34.6488 28.3987 34.0237 29.0239C33.3986 29.649 32.5507 30.0002 31.6667 30.0002H30C29.1159 30.0002 28.2681 29.649 27.643 29.0239C27.0179 28.3987 26.6667 27.5509 26.6667 26.6668V21.6668C26.6667 20.7828 27.0179 19.9349 27.643 19.3098C28.2681 18.6847 29.1159 18.3335 30 18.3335H35Z"
            stroke="white"
            stroke-width="3.33333"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M35 26.667V30.0003C35 31.7684 34.2976 33.4641 33.0474 34.7144C31.7971 35.9646 30.1014 36.667 28.3333 36.667H20"
            stroke="white"
            stroke-width="3.33333"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <input className="inp" type="checkbox" />
        <section className="menu-container">
          <Link
            href="#"
            target="_blank"
            className="menu-list bg-[#FFB413] flex flex-row gap-3 items-center justify-end w-2/3 -right-[46px]"
          >
            <p>Zalo</p>
            <div>
              <Image src={IMAGES.ZALO} alt="alt" width={25} height={25} />
            </div>
          </Link>
          <Link
            href="#"
            target="_blank"
            className="menu-list bg-[#FFB413] flex flex-row gap-3 items-center justify-end rounded-full"
          >
            <p>Messenger</p>
            <div>
              <Image src={IMAGES.MESSENGER} alt="alt" width={30} height={30} />
            </div>
          </Link>
          <Link
            href="#"
            target="_blank"
            className="menu-list bg-[#FFB413] flex flex-row gap-3 items-center justify-end w-[95%] -right-[7px]"
          >
            <p>Facebook</p>
            <div>
              <Image src={IMAGES.FACEBOOK} alt="alt" width={25} height={25} />
            </div>
          </Link>
        </section>
      </label>
      <div className="flex flex-col justify-center items-center w-full bg-[#F0F0F0] py-1 text-center text-[#A98F57] text-sm font-semibold">
        <span className="text-md font-light">Các phong cách</span>
        <span className="text-lg font-semibold">
          THIẾT KẾ ALBUM CƯỚI HOT NHẤT
        </span>
      </div>
      <Header />
      <div className="container flex items-center justify-center py-16 ">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-medium text-gray-900">
              Đăng nhập với
            </h2>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center gap-4">
              <button
                onClick={(e: any) => handleSubmitWithGoogle(e)}
                className="w-full flex items-center justify-center gap-3 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                <Image
                  className="w-5 h-5"
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  width={1000}
                  height={1000}
                  loading="lazy"
                  alt="google logo"
                />
                <span className="text-gray-700">Google</span>
              </button>
              {/* <button className="w-full flex items-center justify-center gap-3 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                <Image
                  src="https://s3-alpha-sig.figma.com/img/e639/9094/af2115f2fefe8b0ee78b87cb1d047faf?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=L09K4ct3QucB0H4mvLdiuhN91RWTtdG4MAyPbvtlkX-4G0WbSCvRffz8pHalOPKKTq7BuyuVYnciXJsO~o~EX1M8PDIm0YqdJ2ireJXoH81eG7F-iRLf1ySz-oSpTZwXkYNpd7zkVjCoKb2e-x1nTzDaWaCRKHLS7OzWWSIUhjd0Gc9jLCOzZwZ8Q9XuKj~YRobCokYnDLctmeSKZ2V62NpG98uY6mwn1QB-JFg8bBtp1WIn62YzCtyebuCwN~z7gYREgrX2T1D8AwO-ZfxNnqqaEdWc56gEkDKtJadZDkVlieP5dxj77j2L8AR8JWkC2GJ43AjnUgn7GANpYDpyRQ__"
                  alt="Facebook"
                  className="w-5 h-5"
                  width={1000}
                  height={200}
                />
                <span className="text-gray-700">Facebook</span>
              </button> */}
            </div>
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">hoặc</span>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Nhập SĐT hoặc Email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex justify-end">
                <a
                  href="#"
                  className="text-sm text-gray-600 hover:text-gray-800"
                >
                  Quên mật khẩu?
                </a>
              </div>
              <button
                type="submit"
                onClick={handleSubmit}
                className="flex flex-row justify-center items-center gap-4 w-full py-2 px-4 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-md transition-colors"
              >
                Đăng nhập
                {isLoading && <Loader className="animate-spin" size={22} />}
              </button>
            </div>
            <p className="text-center text-sm text-gray-600">
              Bạn chưa có tài khoản?{" "}
              <a
                href="#"
                className="text-orange-500 hover:text-orange-600 font-medium"
              >
                Đăng ký ngay
              </a>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
