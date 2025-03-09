import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { OrderService } from "@/services/order";
import { ROUTES } from "@/utils/route";
import { ProductService } from "@/services/product";
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

const CancelOrderModal = ({ order, customerAccount }: any) => {
  const [productPrice, setProductPrice] = useState<Number | 0>(0);
  const shippingFee = 30000;
  const total = Number(productPrice) + shippingFee;
  const [product, setProduct] = useState<Product | null>(null);

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

  const handleUpdateStatus = async (id: string, status: string) => {
    const body = {
      status: status,
    };

    await OrderService.updateOrder(id, body);
    window.location.href = `${ROUTES.ACCOUNT}?tab=history`;
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="cursor-pointer bg-red-500 text-white text-sm lg:text-base px-2 py-2 lg:py-2 rounded-sm flex items-center justify-center text-center w-1/2 lg:w-52"
        >
          Hủy đơn hàng
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Hủy đơn hàng #{order?._id?.slice(-6)}</DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-center lg:!text-left">
          <span className="!text-[16px]">
            Để hủy đơn hàng #{order?._id?.slice(-6)} vui lòng bấm{" "}
            <strong className="text-red-600">Xác nhận</strong> để hủy.
          </span>
        </DialogDescription>
        <DialogFooter className="flex flex-row justify-between">
          <DialogClose>
            <Button
              type="button"
              variant="secondary"
              className="!px-10 !text-[16px] w-32"
            >
              Hủy
            </Button>
          </DialogClose>
          <Button
            type="button"
            variant="destructive"
            className="!px-10 !text-[16px] w-32"
            onClick={() => handleUpdateStatus(order?._id, "cancelled")}
          >
            Xác nhận
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CancelOrderModal;
