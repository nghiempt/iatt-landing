"use client";

import Link from "next/link";
import Image from "next/image";
import {
  CircleDollarSign,
  CircleUserRound,
  Dot,
  Download,
  FolderPlus,
  Gift,
  History,
  House,
  Info,
  Loader,
  LogOut,
  NotepadText,
  Phone,
  PhoneCall,
  Search,
  UserRound,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IMAGES } from "@/utils/image";
import { ROUTES } from "@/utils/route";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { AccountService } from "@/services/account";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";

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
  const pathname = usePathname();
  const [logined, setLogined] = useState(false);
  const [open, setOpen] = useState(false);
  const isLogin = Cookies.get("isLogin");
  const [customerAccount, setCustomerAccount] =
    useState<CustomerAccount | null>(null);

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
  }, [isLogin]);

  const handleLogOut = () => {
    Cookies.remove("isLogin");
    Cookies.remove("userLogin");
    setLogined(false);
    window.location.href = ROUTES.HOME;
  };
  return (
    <header className="relative flex flex-col w-full bg-white shadow-md">
      <div className="container pt-4 pb-2 lg:py-4 px-4 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="lg:hidden flex flex-col justify-center">
            <button
              className="text-gray-800 w-10 h-10 relative focus:outline-none"
              onClick={() => setOpen(!open)}
            >
              <Image
                src={"https://cdn-icons-png.flaticon.com/128/1828/1828859.png"}
                alt="alt"
                width={24}
                height={24}
              />
            </button>
          </div>
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src={IMAGES.LOGO}
              alt="In Ảnh Trực Tuyến"
              width={44}
              height={44}
            />
            <div className="flex flex-col justify-center items-start">
              <span className="text-lg font-bold">IN ẢNH TRỰC TUYẾN</span>
              <span className="text-xs font-light text-[#f6842c]">In ảnh đẹp giá rể</span>
            </div>
          </Link>
          <div className="flex lg:hidden gap-6">
            <Image
              src="https://cdn-icons-png.flaticon.com/128/555/555515.png"
              alt="alt"
              width={24}
              height={24}
            />
            <Image
              src={"https://cdn-icons-png.flaticon.com/128/16470/16470836.png"}
              alt="alt"
              width={24}
              height={24}
            />
          </div>
          <div className="hidden lg:flex-1 max-w-xl mx-8">
            <div className="relative">
              <Input
                type="search"
                placeholder="Bạn đang tìm kiếm điều gì?"
                className="w-full pl-4 pr-10"
              />
              <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
          <div className="hidden lg:flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Image
                src={IMAGES.DELIVERY}
                alt="In Ảnh Trực Tuyến"
                width={50}
                height={50}
              />
              <div className="text-sm">
                <p className="font-semibold">Thông tin vận chuyển</p>
                <p className="text-gray-600">Phương thức giao hàng</p>
              </div>
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
                  className="hidden lg:flex bg-[rgb(var(--primary-rgb))] hover:bg-[rgb(var(--secondary-rgb))] items-center rounded-full px-6 py-2.5 cursor-pointer"
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
                        className="text-[rgb(var(--primary-rgb))] hover:text-white hover:bg-[rgb(var(--primary-rgb))] font-medium rounded-lg text-md px-3 py-2.5 text-left me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
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
                <Image
                  src={IMAGES.CART}
                  alt="In Ảnh Trực Tuyến"
                  width={32}
                  height={32}
                />
              </>
            ) : (
              <>
                <div className="flex items-center space-x-2">
                  <Link href={`${ROUTES.LOGIN}`}>
                    <Button variant="ghost">Đăng nhập</Button>
                  </Link>
                  <span className="text-gray-300">|</span>
                  <Button variant="ghost">Đăng ký</Button>
                </div>
                <Image
                  src={IMAGES.CART}
                  alt="In Ảnh Trực Tuyến"
                  width={32}
                  height={32}
                />
                <div>
                  <Link
                    href="#"
                    className="hidden lg:flex bg-[rgb(var(--primary-rgb))] hover:bg-[rgb(var(--secondary-rgb))] items-center rounded-full px-6 py-2.5 cursor-pointer"
                  >
                    <Download size={18} className="mr-3" color="white" />
                    <p className="text-white text-md font-semibold ">Tải App</p>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="flex lg:hidden flex-row justify-between pt-2.5 pb-4 px-4">
        <div className="flex flex-col justify-center items-start gap-1">
          <span className="text-xs flex justify-start items-center gap-2">
            <Image
              src="https://cdn-icons-png.flaticon.com/128/724/724664.png"
              alt="alt"
              width={12}
              height={12}
            />
            0939.xxx.xxx
          </span>
          <span className="text-xs flex justify-start items-center gap-2">
            <Image
              src="https://cdn-icons-png.flaticon.com/128/2784/2784459.png"
              alt="alt"
              width={12}
              height={12}
            />
            Thứ 2 - Thứ 7 (Từ 8h - 17h30)
          </span>
        </div>
        <div className="flex justify-center items-center border border-blue-500 rounded-md gap-2 p-1">
          <div className="flex gap-2">
            <Image
              src="https://static.wikia.nocookie.net/logos/images/9/98/Google_Play_%28Favicon%29.png/revision/latest/scale-to-width-down/512?cb=20240508121626&path-prefix=vi"
              alt="alt"
              width={24}
              height={24}
            />
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/App_Store_%28iOS%29.svg/1024px-App_Store_%28iOS%29.svg.png"
              alt="alt"
              width={24}
              height={24}
            />
          </div>
          <div className="text-blue-500 font-semibold">
            Tải app
          </div>
        </div>
      </div>
      {pathname === "/dang-nhap" || pathname === "/dang-ky" ? null : (
        <nav className="hidden lg:flex container py-4 justify-between">
          <ul className="flex items-center space-x-8">
            <li>
              <Link
                href="/"
                className={`${checkTabEnable("/", pathname)
                  ? "text-[rgb(var(--primary-rgb))] font-semibold"
                  : "text-black"
                  } text-md font-medium hover:text-[rgb(var(--primary-rgb))]`}
              >
                TRANG CHỦ
              </Link>
            </li>
            <li>
              <Link
                href={`${ROUTES.ABOUT}`}
                className={`${checkTabEnable(ROUTES.ABOUT, pathname)
                  ? "text-[rgb(var(--primary-rgb))] font-semibold"
                  : "text-black"
                  } text-md font-medium flex justify-center items-center gap-1 hover:text-[rgb(var(--primary-rgb))]`}
              >
                VỀ CHÚNG TÔI
                {/* <ChevronDown size={16} /> */}
              </Link>
            </li>
            <li>
              <Link
                href={`${ROUTES.PLASTIC}?tag=Plastic`}
                className={`${checkTabEnable(ROUTES.PLASTIC, pathname)
                  ? "text-[rgb(var(--primary-rgb))] font-semibold"
                  : "text-black"
                  }text-md font-medium flex justify-center items-center gap-1 hover:text-[rgb(var(--primary-rgb))]`}
              >
                IN ẤN
                {/* <ChevronDown size={16} /> */}
              </Link>
            </li>
            <li>
              <Link
                href={`${ROUTES.FRAME}?tag=Frame`}
                className={`${checkTabEnable(ROUTES.FRAME, pathname)
                  ? "text-[rgb(var(--primary-rgb))] font-semibold"
                  : "text-black"
                  }text-md font-medium flex justify-center items-center gap-1 hover:text-[rgb(var(--primary-rgb))]`}
              >
                KHUNG ẢNH
                {/* <ChevronDown size={16} /> */}
              </Link>
            </li>
            <li>
              <Link
                href={`${ROUTES.ALBUM}?tag=Album`}
                className={`${checkTabEnable(ROUTES.ALBUM, pathname)
                  ? "text-[rgb(var(--primary-rgb))] font-semibold"
                  : "text-black"
                  }text-md font-medium flex justify-center items-center gap-1 hover:text-[rgb(var(--primary-rgb))]`}
              >
                PHOTOBOOK
                {/* <ChevronDown size={16} /> */}
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="text-md font-medium flex justify-center items-center gap-1 hover:text-[rgb(var(--primary-rgb))]"
              >
                BẢNG GIÁ
                {/* <ChevronDown size={16} /> */}
              </Link>
            </li>
            <li>
              <Link
                href={`${ROUTES.BLOG}`}
                className={`${checkTabEnable(ROUTES.BLOG, pathname)
                  ? "text-[rgb(var(--primary-rgb))] font-semibold"
                  : "text-black"
                  }text-md font-medium flex justify-center items-center gap-1 hover:text-[rgb(var(--primary-rgb))]`}
              >
                TIN TỨC
                {/* <ChevronDown size={16} /> */}
              </Link>
            </li>
          </ul>
          <ul className="hidden lg:flex items-center space-x-2">
            <li className="ml-auto">
              <Link
                href="/"
                className="text-md font-medium flex justify-center items-center text-[rgb(var(--primary-rgb))]"
              >
                <Dot size={36} /> Vị trí của hàng
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="text-md font-medium flex justify-center items-center text-[rgb(var(--secondary-rgb))]"
              >
                <Dot size={36} /> Yêu cầu xuất hóa đơn VAT
              </Link>
            </li>
          </ul>
        </nav>
      )}
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
  );
}
