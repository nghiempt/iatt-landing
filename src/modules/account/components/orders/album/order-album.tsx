"use client";

import React, { useEffect, useState } from "react";
import Header from "@/layout/header";
import Footer from "@/layout/footer";
import Link from "next/link";
import { ChevronRight, Frame, Images } from "lucide-react";
import { ROUTES } from "@/utils/route";
import Image from "next/image";
import Cookies from "js-cookie";
import ImageUploadAlbum from "./image-upload-album";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProductService } from "@/services/product";
import { toast } from "@/hooks/use-toast";
import { UploadService } from "@/services/upload";
import { OrderService } from "@/services/order";
import { AccountService } from "@/services/account";
import ImageUpload from "../frame/image-upload";
import { HELPER } from "@/utils/helper";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export interface Province {
  code: number;
  codename: string;
  districts: District[];
  division_type: string;
  name: string;
  phone_code: number;
}

export interface District {
  code: number;
  codename: string;
  division_type: string;
  name: string;
  short_codename: string;
  wards: Ward[];
}

export interface Ward {
  code: number;
  codename: string;
  division_type: string;
  name: string;
  short_codename: string;
}
export interface UserData {
  name: string;
  avatar: string;
  email: string;
  phone: string;
  address: string;
}

export interface FormData extends UserData {
  ward: number;
  district: number;
  province: number;
}
export default function OrderAlbumCreate() {
  const [uploadedFile, setUploadedFile] = React.useState<File | null>(null);
  const [isPaper, setIsPaper] = React.useState(true);
  const [paperType, setPaperType] = React.useState(1);
  const [openProvinces, setOpenProvinces] = useState(false);
  const [openDistrict, setOpenDistrict] = useState(false);
  const [openWard, setOpenWard] = useState(false);
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [isLogin, setIsLogin] = useState(Cookies.get("isLogin"));
  const [orderNoLogin, setOrderNoLogin] = useState(false);
  const [products, setProducts] = useState([] as any);
  const [productsData, setProductsData] = useState({} as any);
  const [selectedPayment, setSelectedPayment] = React.useState<string>("cash");
  const [ward, setWard] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [provinces, setProvinces] = React.useState<Province[]>([]);
  const [districts, setDistricts] = React.useState<District[]>([]);
  const [wards, setWards] = React.useState<Ward[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentImage, setCurrentImage] = React.useState("");
  const [selectedProduct, setSelectedProduct] =
    React.useState<any>("Chon san pham");
  const [selectedPage, setSelectedPage] = React.useState<any>("Chon loai ruot");
  const [selectedCover, setSelectedCover] =
    React.useState<any>("Chon loai bia");
  const [formData, setFormData] = React.useState<FormData>({
    name: "",
    email: "",
    avatar: "",
    phone: "",
    address: "",
    ward: 0,
    district: 0,
    province: 0,
  });
  const pages = [
    {
      id: 1,
      name: "Ruột cán màng",
    },
    {
      id: 2,
      name: "Ruột không cán màng",
    },
    {
      id: 3,
      name: "Ruột tráng gương",
    },
  ];

  const covers = [
    {
      id: 1,
      name: "Bìa gói",
    },
    {
      id: 2,
      name: "Bìa da",
    },
    {
      id: 3,
      name: "Bìa cứng",
    },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const validateForm = () => {
    if (selectedProduct === "Chon san pham") {
      toast({
        title: "",
        description: "Vui lòng chọn một sản phẩm!",
        variant: "destructive",
      });
      return false;
    }
    if (!uploadedFile) {
      toast({
        title: "",
        description: "Vui lòng tải lên một hình ảnh!",
        variant: "destructive",
      });
      return false;
    }
    // if (!selectedColor) {
    //   toast({
    //     title: "",
    //     description: "Vui lòng chọn màu sắc!",
    //     variant: "destructive",
    //   });
    //   return false;
    // }
    // if (!selectedSize) {
    //   toast({
    //     title: "",
    //     description: "Vui lòng chọn kích thước!",
    //     variant: "destructive",
    //   });
    //   return false;
    // }
    if (!formData?.address) {
      toast({
        title: "",
        description: "Vui lòng nhập địa chỉ giao hàng!",
        variant: "destructive",
      });
      return false;
    }
    if (!formData?.ward || ward === "Vui lòng chọn phường/xã") {
      toast({
        title: "",
        description:
          "Vui lòng chọn đầy đủ Tỉnh/Thành phố, Quận/Huyện, Phường/Xã.",
        variant: "destructive",
      });
      return false;
    }
    if (!formData?.phone) {
      toast({
        title: "",
        description: "Vui lòng nhập số điện thoại!",
        variant: "destructive",
      });
      return false;
    }
    const phoneRegex = /^\d{10,11}$/;
    if (!phoneRegex.test(formData.phone)) {
      toast({
        title: "",
        description:
          "Số điện thoại phải là một dãy số hợp lệ (10 đến 11 chữ số)! ",
        variant: "destructive",
      });
      return false;
    }
    if (!selectedPayment) {
      toast({
        title: "",
        description: "Vui lòng chọn phương thức thanh toán!",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    setLoading(true);
    try {
      const upload: any = await UploadService.uploadToCloudinary([
        uploadedFile,
      ]);

      const selectedProvince = provinces.find(
        (p) => p.code === formData.province
      );
      const selectedDistrict = districts.find(
        (d) => d.code === formData.district
      );
      const selectedWard = wards.find((w) => w.code === formData.ward);

      const commonAccountData = {
        name: formData?.name || "",
        phone: formData?.phone || "",
        address: formData?.address || "",
        role: "personal",
        ward: selectedWard?.code,
        district: selectedDistrict?.code,
        province: selectedProvince?.code,
        status: true,
        districtName: selectedDistrict?.name,
        provinceName: selectedProvince?.name,
        wardName: selectedWard?.name,
      };

      const orderData = {
        product_id: selectedProduct,
        image: upload[0]?.secure_url,
        // color: selectedColor,
        // size: selectedSize,
        address: formData?.address || "",
        payment_method: selectedPayment || "",
        total: products.find(
          (pro: any) => pro._id.toString() === selectedProduct
        )?.price,
      };

      let response;
      if (!isLogin) {
        response = await OrderService.createOrder_no_login({
          account: commonAccountData,
          order: orderData,
        });
        setOrderNoLogin(true);
        try {
          let data;
          if (/^\d+$/.test(response?.data?.phone)) {
            data = await AccountService.loginAccountPhone(
              response?.data?.phone,
              response?.data?.password
            );
          } else {
            data = await AccountService.loginAccountEmail(
              response?.data?.phone,
              response?.data?.password
            );
          }

          // if (response?.data?.isAccountExisted === true) {
          //   setOrderNewAccount(false);
          // } else {
          //   setOrderNewAccount(true);
          // }

          if (data?.message === "SUCCESS") {
            Cookies.set("isLogin", data?.data, { expires: 7 });
            Cookies.set("userLogin", data?.data, { expires: 7 });
            setIsLogin(Cookies.set("isLogin", data?.data, { expires: 7 }));
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
          // setIsLoading(false);
        }
      } else {
        response = await OrderService.createOrder({
          account: { _id: isLogin, ...commonAccountData },
          order: orderData,
        });
        setOrderNoLogin(false);
        if (response === false) {
          toast({
            title: "",
            description: "Số điện thoại đã được sử dụng!",
            variant: "destructive",
          });
          return;
        }
      }

      if (selectedPayment === "momo" && response?.data) {
        window.open(response.data, "_blank");
        window.location.href = orderNoLogin
          ? `${ROUTES.ACCOUNT}?tab=history`
          : response?.data?.isAccountExisted === true
          ? `${ROUTES.ACCOUNT}?tab=history`
          : `${ROUTES.ACCOUNT}?tab=history&orderNoLogin=true`;
      } else {
        window.location.href = orderNoLogin
          ? `${ROUTES.ACCOUNT}?tab=history`
          : response?.data?.isAccountExisted === true
          ? `${ROUTES.ACCOUNT}?tab=history`
          : `${ROUTES.ACCOUNT}?tab=history&orderNoLogin=true`;
      }
    } catch (error) {
      console.error("Error submitting order:", error);
      toast({
        title: "",
        description: "Đã xảy ra lỗi khi đặt hàng, vui lòng thử lại!",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchProductData = async () => {
      if (!selectedProduct || selectedProduct === "Chon san pham") return;
      try {
        const res = await ProductService.getProductById(selectedProduct);
        if (res && res.data) {
          setProductsData(res.data);
          // setSelectedColor(res.data.color[0]);
        }
      } catch (error) {
        console.error("Error fetching product by ID:", error);
      }
    };

    fetchProductData();
  }, [selectedProduct]);

  React.useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await fetch(
          "https://provinces.open-api.vn/api/?depth=3"
        );
        const data = await response.json();
        setProvinces(data);
      } catch (error) {
        console.error("Error fetching provinces:", error);
      }
    };
    fetchProvinces();
  }, []);

  const handleProvinceChange = (provinceCode: string) => {
    const selectedProvince = provinces.find(
      (p) => p.code === Number(provinceCode)
    );
    if (selectedProvince) {
      setDistricts(selectedProvince.districts);
      setWards([]);
      setFormData((prev) => ({
        ...prev,
        province: Number(provinceCode),
        district: 0,
        ward: 0,
      }));
      setProvince(selectedProvince.name);
      setDistrict("Vui lòng chọn quận/huyện");
      setWard("Vui lòng chọn phường/xã");
      setOpenProvinces(false);
    } else {
      setDistricts([]);
      setWards([]);
    }
  };

  const handleDistrictChange = (districtCode: string) => {
    const selectedDistrict = districts.find(
      (d) => d.code === Number(districtCode)
    );
    if (selectedDistrict) {
      setWards(selectedDistrict.wards || []);
      setFormData((prev) => ({
        ...prev,
        district: Number(districtCode),
        ward: 0,
      }));
      setDistrict(selectedDistrict.name);
      setWard("Vui lòng chọn phường/xã");
      setOpenDistrict(false);
    } else {
      setWards([]);
    }
  };

  const handleWardChange = (wardCode: String) => {
    const selectedWard = wards.find((w) => w.code === Number(wardCode));

    if (selectedWard) {
      setFormData((prev) => ({
        ...prev,
        ward: Number(wardCode),
      }));

      setWard(selectedWard.name);
      setOpenWard(false);
    }
  };

  return (
    <div className="w-full">
      <Header />
      <div className="container px-5 lg:px-8 pb-6 pt-2">
        <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <Link href={`${ROUTES.HOME}`} className="hover:text-black">
            Trang chủ
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link href={`${ROUTES.ACCOUNT}`} className="hover:text-black">
            Tài khoản
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link href={`${ROUTES.ACCOUNT}`} className="hover:text-black">
            Tạo đơn hàng
          </Link>
        </nav>
        <div className="">
          <div className="w-full mx-auto pb-8">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="hidden lg:grid w-full h-full md:w-1/2">
                <div>
                  <h2 className="text-lg lg:text-xl font-medium mb-4">
                    Thông tin khách hàng k
                  </h2>
                  <div className="mb-4 ml-5">
                    <Label htmlFor="name" className="text-gray-600 ">
                      Họ và tên:
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 pr-16 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="mb-4 ml-5">
                    <Label htmlFor="email" className="text-gray-600">
                      Email:
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      disabled={true}
                      className="w-full px-3 py-2 pr-16 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="mb-4 ml-5">
                    <Label htmlFor="phone" className="text-gray-600">
                      Số điện thoại:
                    </Label>
                    <Input
                      type="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 pr-16 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <div>
                  <h2 className="text-lg lg:text-xl font-medium mb-4">
                    Địa chỉ nhận hàng
                  </h2>
                  <div className="grid grid-cols-2 gap-4 mb-4 ml-5">
                    <div>
                      <Label htmlFor="province" className="text-gray-600">
                        Tỉnh/Thành phố:
                      </Label>
                      <Select
                        value={String(formData.province)}
                        onValueChange={handleProvinceChange}
                        disabled={loading}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn tỉnh/thành phố" />
                        </SelectTrigger>
                        <SelectContent>
                          {provinces.map((province) => (
                            <SelectItem
                              key={province.code}
                              value={String(province.code)}
                            >
                              {province.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="district" className="text-gray-600">
                        Quận/Huyện:
                      </Label>
                      <Select
                        value={String(formData.district)}
                        onValueChange={handleDistrictChange}
                        disabled={!formData.province || loading}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn quận/huyện" />
                        </SelectTrigger>
                        <SelectContent>
                          {districts.map((district) => (
                            <SelectItem
                              key={district.code}
                              value={String(district.code)}
                            >
                              {district.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="mb-4 ml-5">
                    <Label htmlFor="ward" className="text-gray-600">
                      Phường/Xã:
                    </Label>
                    <Select
                      value={String(formData.ward)}
                      onValueChange={handleWardChange}
                      disabled={!formData.district || loading}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn phường/xã" />
                      </SelectTrigger>
                      <SelectContent>
                        {wards.map((ward) => (
                          <SelectItem key={ward.code} value={String(ward.code)}>
                            {ward.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="mb-4 ml-5">
                    <Label htmlFor="address" className="text-gray-600">
                      Số nhà, tên đường:
                    </Label>
                    <Input
                      id="address"
                      name="address"
                      placeholder="Ví dụ: 123 Đường ABC"
                      value={formData.address}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                {/* {selectedProduct !== "Chon san pham" && ( */}
                <>
                  <div>
                    <h2 className="text-lg lg:text-xl font-medium mb-4">
                      Tùy chọn thanh toán
                    </h2>
                    <div className="border border-gray-300 rounded divide-y ml-5">
                      <div
                        onClick={() => setSelectedPayment("cash")}
                        className=" cursor-pointer p-4 flex items-center"
                      >
                        <input
                          type="radio"
                          id="cash"
                          name="payment"
                          className="mr-2 w-4 h-4 accent-yellow-500"
                          checked={selectedPayment === "cash"}
                        />
                        <label htmlFor="cash" className="ml-2">
                          Thanh toán khi nhận hàng
                        </label>
                      </div>
                      <div
                        onClick={() => setSelectedPayment("bank")}
                        className="cursor-pointer p-4 items-center"
                      >
                        <div className="flex items-center">
                          <input
                            type="radio"
                            id="bank"
                            name="payment"
                            className="mr-2 w-4 h-4 accent-yellow-500"
                            checked={selectedPayment === "bank"}
                          />
                          <label htmlFor="bank" className="ml-2">
                            Thanh toán qua chuyển khoản ngân hàng
                          </label>
                        </div>

                        {selectedPayment === "bank" && (
                          <div className="w-full flex flex-row justify-center items-center gap-4 mt-4">
                            <Image
                              src="https://docs.lightburnsoftware.com/legacy/img/QRCode/ExampleCode.png"
                              alt="QR code"
                              width={100}
                              height={100}
                            />
                            <div className="flex flex-col gap-1">
                              <strong>NGUYEN VAN A</strong>
                              <span>ABC BANK</span>
                              <span>11223344556677</span>
                            </div>
                          </div>
                        )}
                      </div>
                      {/* <div
                    onClick={() => setSelectedPayment("momo")}
                    className=" cursor-pointer p-4 flex items-center"
                  >
                    <input
                      type="radio"
                      id="momo"
                      name="payment"
                      className="mr-2 w-4 h-4 accent-yellow-500"
                      checked={selectedPayment === "momo"}
                    />
                    <label htmlFor="momo" className="ml-2">
                      Thanh toán qua MOMO
                    </label>
                  </div> */}
                      {/* <div
                    onClick={() => setSelectedPayment("vnpay")}
                    className="p-4 flex items-center"
                  >
                    <input
                      type="radio"
                      id="vnpay"
                      name="payment"
                      className="mr-2 w-4 h-4 accent-yellow-500"
                      checked={selectedPayment === "vnpay"}
                    />
                    <label htmlFor="vnpay" className="ml-2">
                      Thanh toán qua VNPay
                    </label>
                  </div> */}
                    </div>
                  </div>
                  <div>
                    <h2 className="text-sm font-medium mb-2">
                      Thêm ghi chú cho đơn hàng
                    </h2>
                    <textarea
                      placeholder="Ghi chú về đơn hàng (Nếu có)"
                      className="w-full p-3 border border-gray-300 rounded h-24 ml-5 mx-10"
                    ></textarea>
                  </div>
                </>
                {/* )} */}
              </div>
              <div className="w-full lg:w-1/2 space-y-6">
                <div>
                  <h2 className="text-lg lg:text-xl font-medium mb-4">
                    Thông tin sản phẩm
                  </h2>
                  {/* <div className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full my-4">
                    <Select
                      value={selectedProduct}
                      onValueChange={setSelectedProduct}
                    >
                      <SelectTrigger>
                        {selectedProduct === "Chon san pham" ? "Chọn sản phẩm" : ""}
                        <SelectValue placeholder="Chọn sản phẩm" />
                      </SelectTrigger>

                      <SelectContent className="">
                        {products?.map((item: any, index: any) => (
                          <SelectItem
                            className="text-xs"
                            key={index}
                            value={String(item?._id)}
                          >
                            {item?.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div> */}
                  <div className="space-y-4">
                    <div className="flex flex-col justify-center items-start">
                      <span>
                        Mã đơn hàng: <strong>FWB12546800</strong>
                      </span>
                      <span>
                        Kích thước: <strong>Vuông 25x25</strong>
                      </span>
                      <span>
                        Tổng số trang: <strong>10</strong>
                      </span>
                    </div>
                    <div className="w-full flex flex-col justify-center items-center ">
                      {/* <div className="w-full grid grid-cols-2 justify-center items-center gap-4">
                        <div
                          onClick={() => {
                            setPaperType(1);
                            setIsPaper(true);
                          }}
                          className={`${paperType === 1
                            ? "border-orange-600 text-orange-600 font-bold bg-orange-50"
                            : ""
                            } border rounded-md py-4 flex justify-center items-center`}
                        >
                          Bìa gói
                        </div>
                        <div
                          onClick={() => {
                            setPaperType(2);
                            setIsPaper(false);
                          }}
                          className={`${paperType === 2
                            ? "border-orange-600 text-orange-600 font-bold bg-orange-50"
                            : ""
                            } border rounded-md py-4 flex justify-center items-center`}
                        >
                          Bìa da
                        </div>

                      </div> */}

                      <div className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full">
                        <Select
                          value={selectedCover}
                          onValueChange={setSelectedCover}
                        >
                          <SelectTrigger>
                            {selectedCover === "Chon loai bia"
                              ? "Chọn loại bìa"
                              : ""}
                            <SelectValue placeholder="Chọn loại bìa" />
                          </SelectTrigger>

                          <SelectContent className="">
                            {covers?.map((item: any, index: any) => (
                              <SelectItem
                                className="text-xs"
                                key={index}
                                value={String(item?.id)}
                              >
                                {item?.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full my-4">
                        <Select
                          value={selectedPage}
                          onValueChange={setSelectedPage}
                        >
                          <SelectTrigger>
                            {selectedPage === "Chon loai ruot"
                              ? "Chọn loại ruột"
                              : ""}
                            <SelectValue placeholder="Chọn loại ruột" />
                          </SelectTrigger>

                          <SelectContent className="">
                            {pages?.map((item: any, index: any) => (
                              <SelectItem
                                className="text-xs"
                                key={index}
                                value={String(item?.id)}
                              >
                                {item?.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      {isPaper && (
                        <div className="w-full">
                          <ImageUploadAlbum onImageChange={setUploadedFile} />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className=" lg:hidden w-full md:w-1/2 space-y-6">
                  <div>
                    <h2 className="text-lg lg:text-xl font-medium mb-4">
                      Thông tin khách hàng k
                    </h2>
                    <div className="mb-4">
                      <Label htmlFor="name" className="text-gray-600 ">
                        Họ và tên:
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 pr-16 border border-gray-300 rounded-md"
                        style={{ fontSize: "16px" }}
                      />
                    </div>
                    <div className="mb-4">
                      <Label htmlFor="email" className="text-gray-600">
                        Email:
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        disabled={true}
                        className="w-full px-3 py-2 pr-16 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="mb-4">
                      <Label htmlFor="phone" className="text-gray-600">
                        Số điện thoại:
                      </Label>
                      <Input
                        type="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 pr-16 border border-gray-300 rounded-md"
                        style={{ fontSize: "16px" }}
                      />
                    </div>
                  </div>
                  <div>
                    <h2 className="text-lg lg:text-xl font-medium mb-4">
                      Địa chỉ nhận hàng
                    </h2>
                    <div className="grid grid-cols-1 gap-4 mb-4">
                      <div>
                        <Label htmlFor="province" className="text-gray-600">
                          Tỉnh/Thành phố:
                        </Label>
                        <Dialog
                          open={openProvinces}
                          onOpenChange={setOpenProvinces}
                        >
                          <DialogTrigger asChild>
                            <Input
                              readOnly
                              value={province || "Vui lòng chọn thành phố"}
                              className="text-left w-full px-3 py-2 pr-16 border border-gray-300 rounded-md cursor-pointer"
                              onClick={() => setOpenProvinces(true)}
                            />
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Vui lòng chọn thành phố</DialogTitle>
                              <DialogDescription className="max-h-96 overflow-y-auto">
                                <div className="my-3">
                                  {provinces.map((province) => (
                                    <div
                                      key={province.code}
                                      className="p-2"
                                      onClick={() => {
                                        handleProvinceChange(
                                          String(province.code)
                                        );
                                      }}
                                    >
                                      {province.name}
                                    </div>
                                  ))}
                                </div>
                              </DialogDescription>
                            </DialogHeader>
                          </DialogContent>
                        </Dialog>
                      </div>
                      <div>
                        <Label htmlFor="district" className="text-gray-600">
                          Quận/Huyện:
                        </Label>
                        <Dialog
                          open={openDistrict}
                          onOpenChange={setOpenDistrict}
                        >
                          <DialogTrigger asChild>
                            <Input
                              readOnly
                              value={district || "Vui lòng chọn quận/huyện"}
                              className="text-left w-full px-3 py-2 pr-16 border border-gray-300 rounded-md cursor-pointer"
                              onClick={() => setOpenDistrict(true)}
                            />
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>
                                Vui lòng chọn quận/huyện
                              </DialogTitle>
                              <DialogDescription className="max-h-96 overflow-y-auto">
                                <div className="my-3">
                                  {districts.map((district) => (
                                    <div
                                      key={district.code}
                                      className="p-2"
                                      onClick={() => {
                                        handleDistrictChange(
                                          String(district.code)
                                        );
                                      }}
                                    >
                                      {district.name}
                                    </div>
                                  ))}
                                </div>
                              </DialogDescription>
                            </DialogHeader>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                    <div className="mb-4">
                      <Label htmlFor="ward" className="text-gray-600">
                        Phường/Xã:
                      </Label>
                      <Dialog open={openWard} onOpenChange={setOpenWard}>
                        <DialogTrigger asChild>
                          <Input
                            readOnly
                            value={ward || "Vui lòng chọn phường/xã"}
                            className="text-left w-full px-3 py-2 pr-16 border border-gray-300 rounded-md cursor-pointer"
                            onClick={() => setOpenWard(true)}
                          />
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Vui lòng chọn phường/xã</DialogTitle>
                            <DialogDescription className="max-h-96 overflow-y-auto">
                              <div className="my-3">
                                {wards.map((ward) => (
                                  <div
                                    key={ward.code}
                                    className="p-2"
                                    onClick={() => {
                                      handleWardChange(String(ward.code));
                                    }}
                                  >
                                    {ward.name}
                                  </div>
                                ))}
                              </div>
                            </DialogDescription>
                          </DialogHeader>
                        </DialogContent>
                      </Dialog>
                    </div>
                    <div className="mb-4">
                      <Label htmlFor="address" className="text-gray-600">
                        Số nhà, tên đường:
                      </Label>
                      <Input
                        id="address"
                        name="address"
                        placeholder="Ví dụ: 123 Đường ABC"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full"
                        style={{ fontSize: "16px" }}
                      />
                    </div>
                  </div>
                  {/* {selectedProduct !== "Chon san pham" && ( */}
                  <>
                    <div>
                      <h2 className="text-lg lg:text-xl font-medium mb-4">
                        Tùy chọn thanh toán
                      </h2>
                      <div className="border border-gray-300 rounded divide-y">
                        <div
                          onClick={() => setSelectedPayment("cash")}
                          className=" cursor-pointer p-4 flex items-center"
                        >
                          <input
                            type="radio"
                            id="cod"
                            name="payment"
                            className="mr-2 w-4 h-4 accent-yellow-500"
                            checked={selectedPayment === "cash"}
                          />
                          <label htmlFor="cod" className="ml-2">
                            Thanh toán khi nhận hàng
                          </label>
                        </div>
                        <div
                          onClick={() => setSelectedPayment("bank")}
                          className=" cursor-pointer p-4 items-center"
                        >
                          <div className="flex items-center">
                            <input
                              type="radio"
                              id="bank"
                              name="payment"
                              className="mr-2 w-4 h-4 accent-yellow-500"
                              checked={selectedPayment === "bank"}
                            />
                            <label htmlFor="bank" className="ml-2">
                              Thanh toán qua chuyển khoản ngân hàng
                            </label>
                          </div>

                          {selectedPayment === "bank" && (
                            <div className="w-full flex flex-row justify-center items-center gap-4 mt-4">
                              <Image
                                src="https://docs.lightburnsoftware.com/legacy/img/QRCode/ExampleCode.png"
                                alt="QR code"
                                width={100}
                                height={100}
                              />
                              <div className="flex flex-col gap-1">
                                <strong>NGUYEN VAN A</strong>
                                <span>ABC BANK</span>
                                <span>11223344556677</span>
                              </div>
                            </div>
                          )}
                        </div>
                        {/* <div
                      onClick={() => setSelectedPayment("momo")}
                      className=" cursor-pointer p-4 flex items-center"
                    >
                      <input
                        type="radio"
                        id="momo"
                        name="payment"
                        className="mr-2 w-4 h-4 accent-yellow-500"
                        checked={selectedPayment === "momo"}
                      />
                      <label htmlFor="momo" className="ml-2">
                        Thanh toán qua MOMO
                      </label>
                    </div> */}
                        {/* <div
                      onClick={() => setSelectedPayment("vnpay")}
                      className="p-4 flex items-center"
                    >
                      <input
                        type="radio"
                        id="vnpay"
                        name="payment"
                        className="mr-2 w-4 h-4 accent-yellow-500"
                        checked={selectedPayment === "vnpay"}
                      />
                      <label htmlFor="vnpay" className="ml-2">
                        Thanh toán qua VNPay
                      </label>
                    </div> */}
                      </div>
                    </div>
                    <div>
                      <h2 className="text-sm font-medium mb-2">
                        Thêm ghi chú cho đơn hàng
                      </h2>
                      <textarea
                        placeholder="Ghi chú về đơn hàng (Nếu có)"
                        className="w-full p-3 border border-gray-300 rounded h-24"
                      ></textarea>
                    </div>
                  </>
                  {/* )} */}
                  <p className="text-sm text-gray-600">
                    Bằng cách tiến hành mua hàng, bạn đã đồng ý với các điều
                    khoản và chính sách của chúng tôi.
                  </p>

                  {/* ORDER BUTTON  */}
                </div>
                {/* {selectedProduct !== "Chon san pham" && ( */}
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span>Giá sản phẩm</span>
                    <span>
                      {/* {selectedProduct &&
                          HELPER.formatVND(
                            products.find(
                              (pro: any) => pro._id.toString() === selectedProduct
                            )?.price
                          )} */}
                      100.000đ
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Phí vận chuyển</span>
                    <span>{HELPER.formatVND("30000")}</span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span>Tạm tính</span>
                    <span>
                      {/* {selectedProduct &&
                          HELPER.calculateTotal(
                            products.find(
                              (pro: any) => pro._id.toString() === selectedProduct
                            )?.price,
                            "30000",
                            "0"
                          )} */}
                      30.000đ
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span>Khuyến mãi</span>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Nhập mã khuyến mãi"
                        className="border border-gray-300 rounded p-2 text-sm"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex justify-between font-bold text-xl pt-4">
                    <span>Tổng</span>
                    <span>
                      {/* {selectedProduct &&
                          HELPER.calculateTotal(
                            products.find(
                              (pro: any) => pro._id.toString() === selectedProduct
                            )?.price,
                            "30000",
                            "0"
                          )} */}
                      130.000đ
                    </span>
                  </div>
                </div>
                {/* )} */}
                <p className="text-sm text-gray-600">
                  Bằng cách tiến hành mua hàng, bạn đã đồng ý với các điều khoản
                  và chính sách của chúng tôi.
                </p>
                <div className="flex flex-row justify-between items-center mt-6">
                  <Link
                    href={`${ROUTES.HOME}`}
                    className="flex items-center text-gray-600"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                    Quay lại Giỏ hàng
                  </Link>
                  <button
                    onClick={() => handleSubmit()}
                    className="w-2/5 lg:w-1/2 py-2 lg:py-4 bg-yellow-400 hover:bg-yellow-500 text-center rounded-md font-medium transition"
                  >
                    Đặt hàng
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* <section className="bg-white antialiased">
            <form action="#" className="">
              <div className="w-full grid grid-cols-2 gap-4 justify-center items-center">
                <Link
                  href={"/tai-khoan?tab=order-single"}
                  className="text-white font-semibold py-2 rounded-md flex justify-center items-center bg-gradient-to-br from-gray-400 to-gray-300 after:mx-2 after:text-gray-200 dark:after:text-gray-500 sm:after:hidden"
                >
                  <Frame width={16} height={16} className="mr-2" />
                  Hình đơn
                </Link>
                <Link
                  href={"/tai-khoan?tab=order-album"}
                  className="text-white font-semibold py-2 rounded-md flex justify-center items-center bg-gradient-to-r from-pink-500 to-orange-400 after:mx-2 after:text-gray-200 dark:after:text-gray-500 sm:after:hidden"
                >
                  <Images width={16} height={16} className="mr-2" />
                  Album
                </Link>
              </div>
              <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12 xl:gap-16">
                <div className="min-w-0 flex-1 space-y-8">
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Thông tin sản phẩm
                    </h2>
                    <div className="flex flex-col justify-center items-start">
                      <span>
                        Mã đơn hàng: <strong>FWB12546800</strong>
                      </span>
                      <span>
                        Kích thước: <strong>Vuông 25x25</strong>
                      </span>
                      <span>
                        Tổng số trang: <strong>10</strong>
                      </span>
                    </div>
                    <div className="w-full flex flex-col justify-center items-center gap-4">
                      <div className="w-full grid grid-cols-2 justify-center items-center gap-4">
                        <div
                          onClick={() => {
                            setPaperType(1);
                            setIsPaper(true);
                          }}
                          className={`${
                            paperType === 1
                              ? "border-orange-600 text-orange-600 font-bold bg-orange-50"
                              : ""
                          } border rounded-md py-4 flex justify-center items-center`}
                        >
                          Bìa gói
                        </div>
                        <div
                          onClick={() => {
                            setPaperType(2);
                            setIsPaper(false);
                          }}
                          className={`${
                            paperType === 2
                              ? "border-orange-600 text-orange-600 font-bold bg-orange-50"
                              : ""
                          } border rounded-md py-4 flex justify-center items-center`}
                        >
                          Bìa da
                        </div>
                      </div>
                      {isPaper && (
                        <div className="w-full">
                          <ImageUploadAlbum onImageChange={setUploadedFile} />
                        </div>
                      )}
                      <select
                        id="countries"
                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      >
                        <option>Ruột cán màng</option>
                        <option>Ruột không cán màng</option>
                        <option>Ruột tráng gương</option>
                      </select>
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">
                        Thông tin cá nhân
                      </h3>
                      <div>
                        <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                          Tên*
                        </label>
                        <input
                          type="text"
                          value="Phạm Thanh Nghiêm"
                          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                          placeholder=""
                          required
                        />
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                          Địa chỉ*
                        </label>
                        <input
                          type="email"
                          value="332/8 Phan Văn Trị, P11, Bình Thạnh, HCM"
                          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                          placeholder=""
                          required
                        />
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                          Số điện thoại*{" "}
                        </label>
                        <input
                          type="text"
                          value="0911558539"
                          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                          placeholder=""
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Thanh toán
                    </h3>
                    <div className="grid grid-cols-1 gap-4">
                      <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
                        <div className="flex items-start">
                          <div className="flex h-5 items-center">
                            <input
                              type="radio"
                              name="payment-method"
                              value=""
                              className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
                              checked
                            />
                          </div>
                          <div className="ms-4 text-sm">
                            <label className="font-medium leading-none text-gray-900 dark:text-white flex justify-start items-center gap-2">
                              <Image
                                src="https://cdn-icons-png.flaticon.com/128/10499/10499979.png"
                                alt="money"
                                width={20}
                                height={20}
                                priority
                              />
                              Tiền mặt (COD)
                            </label>
                            <p className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400">
                              Thanh toán khi nhận hàng
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
                        <div className="flex items-start">
                          <div className="flex h-5 items-center">
                            <input
                              type="radio"
                              name="payment-method"
                              value=""
                              className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
                              checked
                            />
                          </div>
                          <div className="ms-4 text-sm">
                            <label className="font-medium leading-none text-gray-900 dark:text-white flex justify-start items-center gap-2">
                              <Image
                                src="https://cdn-icons-png.flaticon.com/128/8983/8983163.png"
                                alt="money"
                                width={20}
                                height={20}
                                priority
                              />
                              Ngân hàng
                            </label>
                            <p className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400">
                              Quét QR để thanh toán
                            </p>
                          </div>
                        </div>
                        <div className="w-full flex justify-center items-center gap-4 mt-4">
                          <Image
                            src="https://docs.lightburnsoftware.com/legacy/img/QRCode/ExampleCode.png"
                            alt="QR code"
                            width={100}
                            height={100}
                            priority
                          />
                          <div className="flex flex-col gap-1">
                            <strong>NGUYEN VAN A</strong>
                            <span>ABC BANK</span>
                            <span>11223344556677</span>
                          </div>
                        </div>
                      </div>
                      <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
                        <div className="flex items-start">
                          <div className="flex h-5 items-center">
                            <input
                              type="radio"
                              name="payment-method"
                              value=""
                              className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
                              checked
                            />
                          </div>
                          <div className="ms-4 text-sm">
                            <label className="font-medium leading-none text-gray-900 dark:text-white flex justify-start items-center gap-2">
                              <Image
                                src="https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-MoMo-Square.png"
                                alt="money"
                                width={18}
                                height={18}
                                priority
                              />
                              Momo
                            </label>
                            <p className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400">
                              Thanh toán qua app Momo
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 w-full space-y-6 sm:mt-8 lg:mt-0 lg:max-w-xs xl:max-w-md">
                  <div className="flow-root">
                    <div className="-my-3 divide-y divide-gray-200 dark:divide-gray-800">
                      <dl className="flex items-center justify-between gap-4 py-3">
                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                          Giá sản phẩm
                        </dt>
                        <dd className="text-base font-medium text-gray-900 dark:text-white">
                          129.000 VND
                        </dd>
                      </dl>
                      <dl className="flex items-center justify-between gap-4 py-3">
                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                          Khuyến mãi
                        </dt>
                        <dd className="text-base font-medium text-green-500">
                          0 VND
                        </dd>
                      </dl>
                      <dl className="flex items-center justify-between gap-4 py-3">
                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                          Thuế VAT
                        </dt>
                        <dd className="text-base font-medium text-gray-900 dark:text-white">
                          0 VND
                        </dd>
                      </dl>
                      <dl className="flex items-center justify-between gap-4 py-3">
                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                          Vận chuyển
                        </dt>
                        <dd className="text-base font-medium text-gray-900 dark:text-white">
                          0 VND
                        </dd>
                      </dl>
                      <dl className="flex items-center justify-between gap-4 py-3">
                        <dt className="text-base font-bold text-gray-900 dark:text-white">
                          Tổng
                        </dt>
                        <dd className="text-base font-bold text-gray-900 dark:text-white">
                          129.000 VND
                        </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <button
                      type="submit"
                      className="flex w-full font-bold items-center justify-center rounded-lg bg-[rgb(var(--quaternary-rgb))] border border-[rgb(var(--primary-rgb))] px-5 py-4 text-sm text-[rgb(var(--primary-rgb))] focus:outline-none focus:ring-4  focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    >
                      ĐẶT HÀNG NGAY
                    </button>
                    <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
                      Bạn đã chấp nhận các điều khoản và chính sách của chúng
                      tôi.{" "}
                      <a
                        href="#"
                        title=""
                        className="font-medium text-primary-700 underline hover:no-underline dark:text-primary-500"
                      >
                        Chính sách bảo mật
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </form>
          </section> */}
        </div>
      </div>
      <Footer />
    </div>
  );
}
