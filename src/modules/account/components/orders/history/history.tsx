"use client";

import Footer from "@/layout/footer";
import Header from "@/layout/header";
import { ROUTES } from "@/utils/route";
import { ChevronRight, Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Sidebar from "../../sidebar";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { AccountService } from "@/services/account";
import { OrderService } from "@/services/order";
import { HELPER } from "@/utils/helper";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCopyToClipboard } from "usehooks-ts";
import { toast } from "@/hooks/use-toast";
import { IMAGES } from "@/utils/image";
import "../../../../../styles/helper.css";
import OrderDetailModal from "./order-detail-modal";
import CancelOrderModal from "./cancel-order-modal";

export type OrderStatus = "pending" | "success" | "cancelled" | "failed";

export interface OrderItem {
  id: string;
  date: string;
  image: string;
  title: string;
  category: string;
  specs: string;
  total: number;
  status: OrderStatus;
}

export interface Order {
  _id: string;
  created_at: string;
  total: string;
  status: string;
  product_id: string;
  product_price: string;
  image: string;
  size: string;
  color: string;
  product_name: string;
  product_category: string;
}
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

interface Product {
  _id: string;
  name: string;
  description: string;
  introduction: string;
  price: string;
  thumbnail: string;
  category: string;
  sold: number;
  color: Array<string>;
  images: Array<string>;
  created_at: Date;
}

export default function OrderHistory({
  customerAccount,
  orders,
  product,
}: {
  customerAccount: CustomerAccount | null;
  orders: Order[] | [];
  product: Product | null;
}) {
  const [, copy] = useCopyToClipboard();
  const isLogin = Cookies.get("isLogin");
  const pathParams = new URLSearchParams(location.search);
  const tab = pathParams.get("orderNoLogin");

  const [openDialog, setOpenDialog] = useState(false);

  // const [customerAccount, setCustomerAccount] =
  //   useState<CustomerAccount | null>(null);

  // const [product, setProduct] = useState<Product | null>(null);
  // const [orders, setOrders] = useState([] as any);

  const [isLoading, setIsLoading] = useState(false);

  // const init = async () => {
  //   setIsLoading(true);
  //   const res = await OrderService.getOrderById(isLogin?.toString() ?? "");

  //   if (res && res.length > 0) {
  //     setOrders(res);
  //   }

  //   const fetchAccount = async () => {
  //     if (isLogin) {
  //       try {
  //         const data = await AccountService.getAccountById(isLogin);
  //         setCustomerAccount(data);
  //       } catch (error) {
  //         console.error("Error fetching account:", error);
  //       }
  //     }
  //   };

  //   fetchAccount();
  //   setIsLoading(false);
  // };

  // useEffect(() => {
  //   init();
  // }, []);

  // useEffect(() => {
  //   if (tab === "true") {
  //     setOpenDialog(true);
  //   }
  // }, [tab]);

  // const fetchOrdersAndAccount = async (loginId: string) => {
  //   setIsLoading(true);
  //   try {
  //     const res = await OrderService.getOrderById(loginId);
  //     if (res && res.length > 0) {
  //       setOrders(res);
  //     } else {
  //       setOrders([]);
  //     }

  //     if (loginId) {
  //       const data = await AccountService.getAccountById(loginId);
  //       setCustomerAccount(data);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //     setOrders([]);
  //     setCustomerAccount(null);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   if (isLogin) {
  //     fetchOrdersAndAccount(isLogin);
  //   } else {
  //     setOrders([]);
  //     setCustomerAccount(null);
  //     setIsLoading(false);
  //   }
  // }, [isLogin]);

  useEffect(() => {
    if (tab === "true") {
      setOpenDialog(true);
    }
  }, [tab]);

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
      <div className="container px-5 lg:px-8 pb-5 lg:pb-20 pt-4">
        <div className="lg:pb-0 lg:px-0">
          <nav className="flex items-center gap-2 text-sm text-gray-600 pt-2 pb-4">
            <Link
              href={`${ROUTES.HOME}`}
              className="hover:text-[rgb(var(--primary-rgb))] text-md"
            >
              Trang chủ
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link
              href={`${ROUTES.ACCOUNT}?tab=history`}
              className="hover:text-[rgb(var(--primary-rgb))] text-md"
            >
              Lịch sử đơn hàng
            </Link>
          </nav>
        </div>
        {isLoading ? (
          <div>
            <Loader />
          </div>
        ) : !isLogin ? (
          <div className="text-center py-4">
            <p className="text-gray-500 text-lg">
              Vui lòng đăng nhập để xem lịch sử đơn hàng.
            </p>
          </div>
        ) : (
          customerAccount && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              <Sidebar customerAccount={customerAccount} />
              <div className="space-y-4 lg:col-span-8">
                <h1 className="text-2xl font-semibold mb-6">
                  Đơn hàng của bạn
                </h1>
                {orders?.length === 0 ? (
                  <div className="col-span-2 text-center w-full flex justify-center items-center py-4">
                    <p className="text-gray-500 text-lg">
                      Bạn chưa có đơn hàng nào.
                    </p>
                  </div>
                ) : (
                  orders?.map((order, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 p-4 rounded-md"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="text-sm lg:text-base flex flex-col lg:flex-row justify-between items-start lg:items-center lg:gap-16">
                          <span>
                            Mã đơn hàng: <br />
                            <strong>#{order?._id?.slice(-6)}</strong>
                          </span>
                          <span>
                            Ngày đặt hàng: <br />
                            <strong>
                              {HELPER.formatDate(order?.created_at)}
                            </strong>
                          </span>
                        </div>
                        <div className="text-sm lg:text-base flex justify-center items-center gap-1">
                          <OrderDetailModal
                            order={order}
                            customerAccount={customerAccount}
                            product={product}
                          />
                        </div>
                      </div>
                      <div className="w-full h-[1px] bg-gray-300 mb-4"></div>
                      <div className="flex flex-col lg:flex-row gap-3 lg:gap-0 items-center justify-center">
                        <div className="flex flex-col gap-4 justify-center items-start">
                          <div className="flex flex-row gap-4 items-center w-full h-full">
                            <Image
                              src={order?.image}
                              alt={order?.product_name}
                              width={1000}
                              height={1000}
                              className="object-cover w-40 h-40"
                            />
                            <div className="space-y-1 lg:w-96">
                              <h3 className="text-base lg:text-xl font-medium">
                                {order?.product_name}
                              </h3>
                              <p className="text-sm text-black">
                                Phân loại:{" "}
                                <strong>
                                  {HELPER.renderCategory2(order?.product_price)}
                                </strong>
                              </p>
                              <p className="text-sm text-black">
                                Kích cỡ: <strong>{order?.size}</strong>
                              </p>
                              <p className="text-sm text-black">
                                Màu:{" "}
                                <strong>
                                  {HELPER.renderColor(order?.color)}
                                </strong>
                              </p>
                            </div>
                          </div>
                          {order?.status === "waiting" && (
                            <CancelOrderModal
                              order={order}
                              customerAccount={customerAccount}
                            />
                          )}
                        </div>
                        <div className="flex flex-row justify-between text-right space-y-2 w-full">
                          <div
                            className={`flex flex-row lg:items-end justify-between lg:flex-col gap-5 lg:gap-20 space-y-0 lg:space-y-4 w-full`}
                          >
                            <div
                              className={`
                                ${
                                  order?.status === "completed"
                                    ? "bg-green-700 text-white text-sm lg:text-base px-2"
                                    : ""
                                }
                                ${
                                  order?.status === "delivering"
                                    ? "bg-yellow-800 text-white text-sm lg:text-base px-2"
                                    : ""
                                }
                                ${
                                  order?.status === "waiting"
                                    ? "bg-blue-700 text-white text-sm lg:text-base px-2"
                                    : ""
                                }
                                ${
                                  order?.status === "pending"
                                    ? "bg-orange-600 text-white text-sm lg:text-base px-2"
                                    : ""
                                }
                                ${
                                  order?.status === "paid pending"
                                    ? "bg-yellow-400 text-white text-sm lg:text-base px-2"
                                    : ""
                                }
                                ${
                                  order?.status === "paid"
                                    ? "bg-pink-200 text-white"
                                    : ""
                                }
                                ${
                                  order?.status === "cancelled"
                                    ? "bg-red-500 text-white"
                                    : ""
                                } lg:py-2 rounded-sm flex items-center justify-center text-center w-1/2 lg:w-72`}
                            >
                              {order?.status === "completed" && "Hoàn thành"}
                              {order?.status === "paid pending" &&
                                "Đang chờ thanh toán"}
                              {order?.status === "paid" && "Đã thanh toán"}
                              {order?.status === "delivering" &&
                                "Đang giao hàng"}
                              {order?.status === "pending" &&
                                "Đang chuẩn bị đơn hàng"}
                              {order?.status === "waiting" && "Đợi phản hồi"}
                              {order?.status === "cancelled" &&
                                "Đã hủy đơn hàng"}
                            </div>
                            <div className="flex flex-row justify-between items-center gap-4">
                              <p className="text-md lg:text-xl font-medium">
                                Tổng đơn: <br />
                                {HELPER.formatVND(order?.total)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )
        )}
      </div>
      <Dialog open={openDialog} onOpenChange={() => setOpenDialog(false)}>
        <DialogTrigger asChild>
          <Button className="hidden" variant="outline">
            Edit Profile
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="mb-3">Thông báo</DialogTitle>
            <DialogDescription>
              <p className="mb-3">
                Đây là tài khoản được tạo để theo dõi đơn hàng của bạn. Vui lòng
                sao chép mật khẩu bên dưới và cập nhật lại mật khẩu mới của bạn
                để tiếp tục sử dụng tài khoản.
              </p>
              <p className="mb-3">
                Để cập nhật mật khẩu mới vui lòng nhấn nút{" "}
                <strong className="text-red-500">Sao chép</strong> mật khẩu bên
                dưới
              </p>
              <p className="mb-3">
                Sau đó nhấn nút{" "}
                <strong className="text-red-500">Tiếp theo</strong> để chuyển
                đến trang đổi mật khẩu.
              </p>
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Input
                disabled
                id="username"
                value={customerAccount?.password}
                className="col-span-3"
              />
              <Button
                onClick={() => {
                  if (customerAccount?.password) {
                    copy(customerAccount.password);
                    toast({
                      title: "Thành công",
                      description: "Đã sao chép mật khẩu!",
                      className: "bg-green-500 text-white border-green-600",
                    });
                  } else {
                    toast({
                      title: "Lỗi",
                      description: "Không có mật khẩu để sao chép!",
                      variant: "destructive",
                    });
                  }
                }}
                type="button"
              >
                Sao Chép
              </Button>
            </div>
          </div>
          <DialogFooter className="flex flex-row justify-end gap-4">
            <DialogClose asChild>
              <Button
                type="button"
                variant="secondary"
                className="!px-10 !text-[16px]"
              >
                Đóng
              </Button>
            </DialogClose>
            <Link href={`${ROUTES.ACCOUNT}?tab=password`}>
              <Button type="submit">Tiếp theo</Button>
            </Link>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Footer />
    </div>
  );
}
