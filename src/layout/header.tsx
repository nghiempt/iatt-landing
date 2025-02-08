/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { IMAGES } from "@/utils/image";
import { ROUTES } from "@/utils/route";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import {
  CircleDollarSign,
  CircleUserRound,
  Download,
  FolderPlus,
  Gift,
  History,
  House,
  Info,
  Loader,
  LogOut,
  NotepadText,
  PhoneCall,
  ShoppingCart,
  UserRound,
} from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { API } from "@/utils/api";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import { AccountService } from "@/services/account";

export interface CustomerAccount {
  _id: string;
  email: string;
  password: string;
  name: string;
  phone: string;
  avatar: string;
  address: string;
  ward: string;
  district: string;
  province: string;
  role: string;
  status: boolean;
  created_at: string;
  districtName: string;
  provinceName: string;
  wardName: string;
}

export default function Header() {
  const isLogin = Cookies.get("isLogin");
  const [logined, setLogined] = useState(false);
  const [open, setOpen] = useState(false);
  const [customerAccount, setCustomerAccount] =
    useState<CustomerAccount | null>(null);

  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const pathname = usePathname();

  const checkTabEnable = (tab: string, pathname: any) => {
    if (pathname === tab) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    const fetchAccount = async () => {
      if (isLogin) {
        try {
          const data = await AccountService.getAccountById(isLogin);
          if (data) {
            setCustomerAccount(data);
            setLogined(true);
          } else {
            setLogined(false);
          }
        } catch (error) {
          console.error("Error fetching account:", error);
          setLogined(false);
        }
      }
    };

    fetchAccount();
  }, []);

  const handleLogOut = () => {
    Cookies.remove("isLogin");
    Cookies.remove("userLogin");
    setLogined(false);
    window.location.href = ROUTES.HOME;
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
      const data = await AccountService.loginAccount(username, password);

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

  const handleSubmitWithGoogle = async (e: any) => {
    e.preventDefault();
    window.location.href = API.AUTH.LOGIN_WITH_GOOGLE;
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

          {logined ? (
            <>
              <div className="flex lg:hidden">
                <Image
                  src={customerAccount?.avatar || ""}
                  alt="avatar"
                  width={1000}
                  height={1000}
                  className="w-11 h-11 object-cover rounded-full cursor-pointer"
                />
              </div>
              <Link
                href="#"
                className="hidden lg:flex bg-orange-700 items-center rounded-full px-6 py-2.5 cursor-pointer"
              >
                <Download size={18} className="mr-3" color="white" />
                <p className="text-white text-md font-semibold ">Tải App</p>
              </Link>
              <div className="hidden lg:flex mr-4">
                <Dropdown>
                  <DropdownTrigger>
                    <Image
                      src={customerAccount?.avatar || ""}
                      alt="avatar"
                      width={1000}
                      height={1000}
                      className="w-11 h-11 object-cover rounded-full cursor-pointer"
                    />
                  </DropdownTrigger>
                  <DropdownMenu
                    className="bg-white rounded-md border border-gray-200"
                    aria-label="Static Actions"
                  >
                    <DropdownItem
                      className="px-3 py-2.5 text-left text-md hover:bg-gray-200 rounded-md"
                      key="Quản lí hồ sơ"
                    >
                      <a
                        href={`${ROUTES.ACCOUNT}?tab=profile`}
                        className="flex items-center justify-start gap-4 text-gray-700 hover:text-black"
                      >
                        <UserRound size={18} /> Quản lí hồ sơ
                      </a>
                    </DropdownItem>
                    <DropdownItem
                      className="px-3 py-2.5 text-left text-md hover:bg-gray-200 rounded-md"
                      key="Lịch sử mua hàng"
                    >
                      <a
                        href={`${ROUTES.ACCOUNT}?tab=history`}
                        className="flex items-center justify-start gap-4 text-gray-700 hover:text-black"
                      >
                        <History size={18} /> Lịch sử mua hàng
                      </a>
                    </DropdownItem>
                    <DropdownItem
                      className="px-3 py-2.5 text-left text-md hover:bg-gray-200 rounded-md"
                      key="Tạo đơn hàng mới"
                    >
                      <a
                        href={`${ROUTES.ACCOUNT}?tab=order-single`}
                        className="flex items-center justify-start gap-4 text-gray-700 hover:text-black"
                      >
                        <FolderPlus size={18} /> Tạo đơn hàng mới
                      </a>
                    </DropdownItem>
                    <DropdownItem
                      key="delete"
                      className="text-red-700 hover:text-white hover:bg-red-700 font-medium rounded-lg text-md px-3 py-2.5 text-left me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                    >
                      <button
                        onClick={handleLogOut}
                        className="flex items-center justify-start gap-4 hover:text-white"
                      >
                        <LogOut size={18} /> Đăng xuất
                      </button>
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </>
          ) : (
            <>
              <div>
                <Dialog>
                  <DialogTrigger className="flex lg:hidden" asChild>
                    <div className="">
                      <CircleUserRound size={24} className="mr-3" />
                    </div>
                  </DialogTrigger>
                  <DialogTrigger className="lg:flex hidden" asChild>
                    <button
                      type="button"
                      className="flex items-center justify-center px-4 lg:px-8 py-2 text-md font-semibold text-white rounded-full bg-orange-700 lg:bg-white lg:text-orange-700 lg:border-orange-700 lg:border-2"
                    >
                      Đăng nhập
                    </button>
                  </DialogTrigger>
                  <DialogContent
                    className="w-full"
                    onOpenAutoFocus={(e) => e.preventDefault()}
                  >
                    <div>
                      <div className="w-full">
                        <div className="flex flex-col items-center justify-center mx-auto lg:py-0">
                          <div className="w-full bg-white dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                            <div className="space-y-4">
                              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Đăng nhập
                              </h1>
                              <div className="space-y-4 md:space-y-6">
                                <div>
                                  <label
                                    htmlFor="email"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                  >
                                    Tài khoản
                                  </label>
                                  <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="name@company.com"
                                    onChange={(e) =>
                                      setUsername(e.target.value)
                                    }
                                  />
                                </div>
                                <div>
                                  <label
                                    htmlFor="password"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                  >
                                    Mật khẩu
                                  </label>
                                  <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    onChange={(e) =>
                                      setPassword(e.target.value)
                                    }
                                  />
                                </div>
                                <div className="flex items-center justify-end">
                                  <a
                                    href="#"
                                    className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                                  >
                                    Quên mật khẩu?
                                  </a>
                                </div>
                                <button
                                  onClick={handleSubmit}
                                  className="flex flex-row justify-center items-center gap-2 w-full text-white bg-orange-700 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-md px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                >
                                  Đăng nhập
                                  {isLoading && (
                                    <Loader
                                      className="animate-spin"
                                      size={20}
                                    />
                                  )}
                                </button>
                                <div
                                  onClick={(e: any) =>
                                    handleSubmitWithGoogle(e)
                                  }
                                  className="cursor-pointer w-full px-4 py-2 border flex justify-center items-center gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150"
                                >
                                  <Image
                                    className="w-5 h-5"
                                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                                    width={1000}
                                    height={1000}
                                    loading="lazy"
                                    alt="google logo"
                                  />
                                  <span className="text-md font-medium">
                                    Đăng nhập bằng Google
                                  </span>
                                </div>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                  Bạn chưa có tài khoản?{" "}
                                  <Link
                                    href="#"
                                    className="font-medium text-primary-600 hover:underline text-black"
                                  >
                                    Đăng ký
                                  </Link>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              <Link
                href="#"
                className="hidden lg:flex bg-orange-700 items-center rounded-full px-6 py-2.5 cursor-pointer"
              >
                <Download size={18} className="mr-3" color="white" />
                <p className="text-white text-md font-semibold ">Tải App</p>
              </Link>
            </>
          )}
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
            href={`${ROUTES.PLASTIC}?tag=Plastic`}
            className={`${
              checkTabEnable(ROUTES.PLASTIC, pathname)
                ? "bg-white text-orange-700 font-bold"
                : "font-semibold"
            } text-lg px-4 py-2 rounded-full hover:text-orange-700 hover:bg-white`}
          >
            IN ẤN
          </a>
          <a
            href={`${ROUTES.FRAME}?tag=Frame`}
            className={`${
              checkTabEnable(ROUTES.FRAME, pathname)
                ? "bg-white text-orange-700 font-bold"
                : "font-semibold"
            } text-lg px-4 py-2 rounded-full hover:text-orange-700 hover:bg-white`}
          >
            KHUNG ẢNH
          </a>
          <a
            href={`${ROUTES.ALBUM}?tag=Album`}
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
