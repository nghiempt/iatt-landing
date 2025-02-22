"use client";

import Footer from "@/layout/footer";
import Header from "@/layout/header";
import { ROUTES } from "@/utils/route";
import { ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import Sidebar from "./sidebar";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { AccountService } from "@/services/account";
import { OrderService } from "@/services/order";
import { HELPER } from "@/utils/helper";
import { ProductService } from "@/services/product";

export type OrderStatus = 'pending' | 'success' | 'cancelled' | 'failed';

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

// export const formatCurrency = (amount: number) => {
//   return new Intl.NumberFormat('vi-VN', {
//     style: 'currency',
//     currency: 'VND',
//     minimumFractionDigits: 0,
//     maximumFractionDigits: 0
//   }).format(amount).replace('₫', 'đ');
// };

// const getStatusBadge = (status: OrderStatus) => {
//   const statusConfig = {
//     pending: { label: 'Đang giao hàng', class: 'bg-blue-500 hover:bg-blue-600' },
//     success: { label: 'Giao hàng thành công', class: 'bg-green-500 hover:bg-green-600' },
//     cancelled: { label: 'Đã hủy đơn hàng', class: 'bg-gray-500 hover:bg-gray-600' },
//     failed: { label: 'Giao hàng thất bại', class: 'bg-red-500 hover:bg-red-600' }
//   };

//   const config = statusConfig[status];
//   return (
//     <Badge className={`${config.class} text-white py-2 rounded-md`}>
//       {config.label}
//     </Badge>
//   );
// };

export interface Order {
  _id: string;
  created_at: string;
  total: string;
  status: string;
  product_id: string;
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


export default function OrderHistory() {

  const isLogin = Cookies.get("isLogin");
  const [customerAccount, setCustomerAccount] =
    useState<CustomerAccount | null>(null);
  const [orders, setOrders] = useState([] as any);


  const init = async () => {
    const res = await OrderService.getOrderById(isLogin?.toString() ?? "");
    if (res && res.length > 0) {
      setOrders(res);
    }

    const fetchAccount = async () => {
      if (isLogin) {
        try {
          const data = await AccountService.getAccountById(isLogin);
          setCustomerAccount(data);
        } catch (error) {
          console.error("Error fetching account:", error);
        }
      }
    };
    fetchAccount();
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="w-full bg-black p-2.5 text-center text-white text-sm font-semibold">
        <span>IN ẢNH TRỰC TUYẾN - In ảnh nhanh chóng, tiện lợi</span>
      </div>
      <Header />
      <div className="container pb-6 pt-2">
        <div className="px-4 pt-4 pb-4 lg:pb-0 lg:px-0">
          <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6 ">
            <Link href={`${ROUTES.HOME}`} className="hover:text-[rgb(var(--primary-rgb))] text-md">Trang chủ</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href={`${ROUTES.ACCOUNT}?tab=history`} className="hover:text-[rgb(var(--primary-rgb))] text-md">Lịch sử đơn hàng</Link>
          </nav>
        </div>
        {customerAccount && (
          <div className="grid grid-cols-12 gap-4">
            <Sidebar customerAccount={customerAccount} />
            <div className=" space-y-4 col-span-8">
              <h1 className="text-2xl font-semibold mb-6">Đơn hàng của bạn</h1>
              {orders.length === 0 ? (
                  <div className="col-span-2 text-center w-full flex justify-center items-center py-4">
                    <p className="text-gray-500 text-lg">
                      Bạn chưa có đơn hàng nào.
                    </p>
                  </div>
                ) :(
              orders.map(async (order: any, index: any) => (
                <div key={index} className="border border-gray-300 p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex justify-between items-center gap-16">
                      <span>Mã đơn hàng: #{order?._id?.slice(0, 6)}</span>
                      <span>Ngày đặt hàng: {HELPER.formatDate(order?.created_at)}</span>
                    </div>
                    <div className="flex justify-center items-center gap-1">Xem chi tiết <ChevronRight size={15} /></div>
                  </div>
                  <div className="w-full h-[1px] bg-gray-300 mb-4"></div>
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4 justify-center items-center">
                      <div className="relative w-24 h-24">
                        <Image
                          src={order?.image}
                          alt={order?.product_name}
                          fill
                          className="object-cover rounded-md border"
                        />
                      </div>
                      <div>
                        <div className="space-y-1">
                          <p className="text-sm text-gray-500">
                            {order?.product_category ==='Frame' && 'Khung ảnh'}
                            {order?.product_category ==='Plastic' && 'In ấn'}
                            {order?.product_category ==='Album' && 'Photobook'}
                          </p>
                          <h3 className="text-xl font-medium">{order?.product_name}</h3>
                          <p className="text-sm text-gray-500">Phân loại: {order?.size}, {order?.color}</p>
                        </div>
                      </div>
                    </div>
                    <div className="text-right space-y-2">
                      <div className={`
                      
                        space-y-4 `}>
                        <div className={`${order?.status === "completed"
                          ? "bg-green-700 text-white"
                          : ""
                          }
                      ${order?.status === "delivering"
                            ? "bg-yellow-800 text-white"
                            : ""
                          }
                      ${order?.status === "waiting"
                            ? "bg-blue-700 text-white"
                            : ""
                          }
                      ${order?.status === "pending"
                            ? "bg-orange-600 text-white"
                            : ""
                          }
                      ${order?.status === "paid pending"
                            ? "bg-yellow-400 text-white"
                            : ""
                          }
                      ${order?.status === "paid"
                            ? "bg-pink-200 text-white"
                            : ""
                          } py-2 rounded-sm flex items-center justify-center`}>
                          {order?.status === "completed" && "Hoàn thành"}
                          {order?.status === "paid pending" &&
                            "Đang chờ thanh toán"}
                          {order?.status === "paid" && "Đã thanh toán"}
                          {order?.status === "delivering" && "Đang giao hàng"}
                          {order?.status === "pending" &&
                            "Đang chuẩn bị đơn hàng"}
                          {order?.status === "waiting" && "Đợi phản hồi"}
                        </div>

                        <p className="text-xl font-medium">Tổng đơn: {HELPER.formatVND(order?.total)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )))}
            </div>
          </div>
        )}  
      </div>
      <Footer />
    </div>
  );
}