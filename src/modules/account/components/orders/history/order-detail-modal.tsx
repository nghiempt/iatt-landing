import React, { useEffect, useState } from "react";
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
import { ProductService } from "@/services/product";
import { IMAGES } from "@/utils/image";

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

const OrderDetailModal = ({ order, customerAccount }: any) => {
  const [productPrice, setProductPrice] = useState<Number | 0>(0);
  const shippingFee = 30000;
  const total = Number(productPrice) + shippingFee;
  const [product, setProduct] = useState<Product | null>(null);
  const discountPrice = Number(
    (Number(productPrice) + shippingFee) * (order?.discount_price / 100)
  );

  const init = async () => {
    const fetchProduct = async () => {
      try {
        const data = await ProductService.getProductById(order?.product_id);
        setProduct(data.data);
        setProductPrice(data.data.price);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  };

  useEffect(() => {
    init();
  }, []);

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
          <DialogTitle>Chi tiết đơn hàng #{order?._id?.slice(-6)}</DialogTitle>
        </DialogHeader>
        <div className="flex items-center justify-center">
          <div className="bg-white rounded-lg w-full max-h-[70vh] overflow-y-auto scroll-bar-style">
            <div className="border-b border-gray-200 flex flex-col lg:flex-row justify-between py-2">
              <div className="flex justify-between items-center">
                <div className="text-black mb-2">
                  Ngày đặt đơn:{" "}
                  <strong>{HELPER.formatDate(order?.created_at)}</strong>
                </div>
              </div>
              <div className="flex justify-end">
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
                        order?.status === "cancelled"
                          ? "bg-red-500 text-white text-sm lg:text-base px-2"
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
                  {order?.status === "cancelled" && "Đã hủy đơn hàng"}
                </div>
              </div>
            </div>
            <div className="px-0 py-4 border-b border-gray-200">
              <div className="flex justify-center items-start gap-4">
                <div className="w-24 h-24 border border-gray-300 rounded">
                  <Image
                    src={order?.image}
                    alt="detail product"
                    width={1000}
                    height={1000}
                    className="w-full h-full object-contain rounded"
                  />
                </div>
                <div className="flex-1">
                  <div className="text-sm text-gray-500">
                    {order?.product_category}
                  </div>
                  <div className="text-xl font-medium mb-2">
                    {order?.product_name}
                  </div>
                  <div className="font-base">
                    Phân loại:{" "}
                    <span className="font-semibold">
                      {HELPER.renderCategory2(order?.product_price)}
                    </span>
                  </div>
                  <div className="text-black">
                    Kích thước:{" "}
                    <span className="font-semibold">{order?.size}</span>
                  </div>
                  <div className="font-base ">
                    Màu sắc:{" "}
                    <span className="font-semibold">
                      {HELPER.renderColor(order?.color)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-0 py-4 border-b border-gray-200">
              <div className="mb-2 text-lg font-medium text-black">
                Thông tin nhận hàng
              </div>
              <div className="text-black mb-1">
                Tên:{" "}
                <span className="font-semibold">{customerAccount?.name}</span>
              </div>
              <div className="text-black mb-1">
                Số điện thoại:{" "}
                <span className="font-semibold">{customerAccount?.phone}</span>
              </div>
              <div className="text-black">
                {" "}
                Địa chỉ:{" "}
                <span className="font-semibold">
                  {order?.address}, {order?.wardName}, {order?.districtName},{" "}
                  {order?.provinceName}
                </span>
              </div>
            </div>
            <div className="border-b border-gray-200">
              <div className="flex justify-between py-2 border-b border-gray-200">
                <div className="text-black px-0">Giá sản phẩm</div>
                <div className="text-black">
                  {HELPER.formatVND(String(product?.price))}
                </div>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <div className="text-black px-0">Phí vận chuyển</div>
                <div className="text-black"> {HELPER.formatVND("30000")}</div>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <div className="text-black px-0">Tạm tính</div>
                <div className="text-black">
                  {HELPER.formatVND(String(total))}
                </div>
              </div>
              <div className="flex justify-between py-2">
                <div className="text-black px-0">Khuyến mãi</div>
                <div className="text-red-500">
                  {HELPER.formatVND(String(discountPrice))}
                </div>
              </div>
            </div>
            <div className="px-0 py-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <div className="text-lg font-base">Tổng đơn:</div>
                <div className="text-xl font-bold">
                  {HELPER.formatVND(String(order?.total))}
                </div>
              </div>
            </div>
            <div className="py-4 flex flex-row justify-between items-center text-black">
              <div>Thanh toán: </div>
              <div
                className={`
                      ${
                        order?.payment_method === "cash"
                          ? "bg-green-700 text-white text-sm lg:text-base px-2"
                          : ""
                      }
                      ${
                        order?.payment_method === "bank"
                          ? "bg-orange-600 text-white text-sm lg:text-base px-2"
                          : ""
                      }
                      ${
                        order?.payment_method === "momo"
                          ? "bg-pink-500 text-white text-sm lg:text-base px-2"
                          : ""
                      }
                      ${
                        order?.payment_method === "vnpay"
                          ? "bg-blue-600 text-white text-sm lg:text-base px-2"
                          : ""
                      }
                      lg:py-2 rounded-md py-2 text-center w-1/2 lg:w-[34.5%]`}
              >
                {order?.payment_method === "cash" && (
                  <div className="flex flex-row items-center justify-center gap-3">
                    <Image
                      src={IMAGES.COD}
                      alt="momo"
                      width={1000}
                      height={1000}
                      className="w-6 h-6 object-cover rounded-lg"
                    />
                    <div>COD</div>
                  </div>
                )}
                {order?.payment_method === "bank" && (
                  <div className="flex flex-row items-center justify-center gap-3">
                    <Image
                      src={IMAGES.BANK}
                      alt="momo"
                      width={1000}
                      height={1000}
                      className="w-6 h-6 object-cover rounded-lg"
                    />
                    <div>Chuyển khoản</div>
                  </div>
                )}
                {order?.payment_method === "momo" && (
                  <div className="flex flex-row items-center justify-center gap-3">
                    <Image
                      src={IMAGES.MOMO}
                      alt="momo"
                      width={1000}
                      height={1000}
                      className="w-6 h-6 object-cover rounded-lg"
                    />
                    <div>MOMO</div>
                  </div>
                )}
                {order?.payment_method === "vnpay" && (
                  <div className="flex flex-row items-center justify-center gap-3">
                    <Image
                      src={IMAGES.VNPAY}
                      alt="momo"
                      width={1000}
                      height={1000}
                      className="w-6 h-6 object-cover rounded-lg"
                    />
                    <div>VNPay</div>
                  </div>
                )}
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
