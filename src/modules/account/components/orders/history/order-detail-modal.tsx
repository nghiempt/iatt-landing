import React from "react";
import { HELPER } from "@/utils/helper";
import Image from "next/image";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const OrderDetailModal = ({ order, customerAccount }: any) => {
  const productPrice = Number(order?.total) || 0;
  const shippingFee = 30000;
  const total = productPrice + shippingFee;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 md:w-auto"
        >
          Xem chi tiết
          <svg
            className="-me-0.5 ms-1.5 h-4 w-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 9-7 7-7-7"
            />
          </svg>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Chi tiết đơn hàng #{order?._id}</DialogTitle>
        </DialogHeader>
        <div className="flex items-center justify-center">
          <div className="bg-white rounded-lg w-full max-h-[70vh] overflow-y-auto scroll-bar-style">
            <div className="border-b border-gray-200 flex flex-col lg:flex-row justify-between py-2">
              <div className="flex justify-between items-center">
                <div className="text-gray-600 mb-2">
                  Ngày đặt đơn:{" "}
                  <strong>{HELPER.formatDate(order?.created_at)}</strong>
                </div>
              </div>
              <div className="flex justify-end ">
                <div
                  className={`${
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
                        order?.status === "paid" ? "bg-pink-200 text-white" : ""
                      } rounded-sm flex items-center justify-center text-center py-2 px-0 lg:px-4 w-full lg:w-full`}
                >
                  {order?.status === "completed" && "Hoàn thành"}
                  {order?.status === "paid pending" && "Đang chờ thanh toán"}
                  {order?.status === "paid" && "Đã thanh toán"}
                  {order?.status === "delivering" && "Đang giao hàng"}
                  {order?.status === "pending" && "Đang chuẩn bị đơn hàng"}
                  {order?.status === "waiting" && "Đợi phản hồi"}
                </div>
              </div>
            </div>
            <div className="px-0 py-4 border-b border-gray-200">
              <div className="flex gap-4">
                <div className="w-24 h-24 bg-gray-100 rounded">
                  <Image
                    src={order?.image}
                    alt="detail product"
                    width={1000}
                    height={1000}
                    className="w-full h-full object-cover rounded"
                  />
                </div>
                <div className="flex-1">
                  <div className="text-sm text-gray-500">
                    {order?.product_category}
                  </div>
                  <div className="text-xl font-medium mb-2">
                    {order?.product_name}
                  </div>
                  <div className="text-gray-600">
                    Kích thước: {order?.size} | Màu sắc:{" "}
                    {HELPER.renderColor(order?.color)}
                  </div>
                </div>
              </div>
            </div>
            <div className="px-0 py-4 border-b border-gray-200">
              <div className="mb-2 text-lg font-medium">
                Thông tin nhận hàng
              </div>
              <div className="text-gray-800 mb-1">
                Tên: {customerAccount?.name}
              </div>
              <div className="text-gray-700 mb-1">
                Số điện thoại: {customerAccount?.phone}
              </div>
              <div className="text-gray-700">
                {" "}
                Địa chỉ: {customerAccount?.address}, {customerAccount?.wardName}
                , {customerAccount?.districtName},{" "}
                {customerAccount?.provinceName}
              </div>
            </div>
            <div className="border-b border-gray-200">
              <div className="flex justify-between py-2 border-b border-gray-200">
                <div className="text-gray-600 px-0">Giá sản phẩm</div>
                <div className="text-gray-800">
                  {HELPER.formatVND(order?.total)}
                </div>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <div className="text-gray-600 px-0">Phí vận chuyển</div>
                <div className="text-gray-800">
                  {" "}
                  {HELPER.formatVND("30000")}
                </div>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <div className="text-gray-600 px-0">Tạm tính</div>
                <div className="text-gray-800">
                  {HELPER.formatVND(String(total))}
                </div>
              </div>
              <div className="flex justify-between py-2">
                <div className="text-gray-600 px-0">Khuyến mãi</div>
                <div className="text-red-500">{HELPER.formatVND("0")}</div>
              </div>
            </div>
            <div className="px-0 py-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <div className="text-lg font-medium">Tổng đơn:</div>
                <div className="text-xl font-bold">
                  {HELPER.formatVND(String(total))}
                </div>
              </div>
            </div>
            <div className="py-4 flex justify-end text-center text-gray-600">
              <div
                className={`
                      ${
                        order?.payment_method === "cash"
                          ? "bg-green-700 text-white text-sm lg:text-base px-2"
                          : ""
                      }
                      ${
                        order?.payment_method === "momo"
                          ? "bg-pink-500 text-white text-sm lg:text-base px-2"
                          : ""
                      }
                      ${
                        order?.payment_method === "vnpay"
                          ? "bg-yellow-700 text-white text-sm lg:text-base px-2"
                          : ""
                      }
                      lg:py-2 rounded-sm py-2 flex items-center justify-center text-center w-full lg:w-72`}
              >
                {order?.payment_method === "cash" && "Thanh toán bằng tiền mặt"}
                {order?.payment_method === "momo" && "Thanh toán Momo"}
                {order?.payment_method === "vnpay" && "Thanh toán VNPay"}
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
              className="!px-10 !text-[16px]"
            >
              Đóng
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailModal;
