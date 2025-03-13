"use client";

import Cookies from "js-cookie";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { ROUTES } from "@/utils/route";
import { ProductService } from "@/services/product";
import React from "react";
import { useSearchParams } from "next/navigation";
import { AccountService } from "@/services/account";
import { cn } from "@/lib/utils";
import ImageUpload from "./image-upload";
import { HELPER } from "@/utils/helper";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { OrderService } from "@/services/order";
import { UploadService } from "@/services/upload";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogHeader } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Cropper from "react-easy-crop";
import { IMAGES } from "@/utils/image";

interface ColorOption {
  id: string;
  name: string;
  bgColor: string;
  borderColor: string;
}

interface SizeOption {
  id: string;
  label: string;
  dimensions: {
    width: number;
    height: number;
  };
}

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

const CreateOrderSingleSection = () => {
  // ADDRESS
  const [openProvinces, setOpenProvinces] = useState(false);
  const [openDistrict, setOpenDistrict] = useState(false);
  const [openWard, setOpenWard] = useState(false);
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedPayment, setSelectedPayment] = React.useState<string>("cash");
  const [provinces, setProvinces] = React.useState<Province[]>([]);
  const [districts, setDistricts] = React.useState<District[]>([]);
  const [wards, setWards] = React.useState<Ward[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const param = useSearchParams();
  const [promoCode, setPromoCode] = useState("");
  const [currentImage, setCurrentImage] = React.useState("");
  const [products, setProducts] = useState([] as any);
  const [productsData, setProductsData] = useState({} as any);
  const [isLogin, setIsLogin] = useState(Cookies.get("isLogin"));
  // const [orderNoLogin, setOrderNoLogin] = useState(false);
  // const [orderNewAccount, setOrderNewAccount] = useState(false);
  const [selectedSize, setSelectedSize] = React.useState<string>("");
  const [customerAccount, setCustomerAccount] =
    useState<CustomerAccount | null>(null);
  const [selectedProduct, setSelectedProduct] = React.useState<any>(
    param.get("product") || "Chon san pham"
  );
  const [selectedColor, setSelectedColor] = React.useState<string>("");
  const [confirmColor, setConfirmColor] = React.useState<string>("");
  const [confirmSize, setConfirmSize] = React.useState<string>("");
  const [originalImage, setOriginalImage] = React.useState<string | null>(null);

  const [uploadedFile, setUploadedFile] = React.useState<File | null>(null);
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

  const colorOptions: ColorOption[] = [
    {
      id: "white",
      name: "Trắng",
      bgColor: "bg-white",
      borderColor: "border-gray-300",
    },
    {
      id: "black",
      name: "Đen",
      bgColor: "bg-black",
      borderColor: "border-black",
    },
    {
      id: "gold",
      name: "Gold",
      bgColor: "bg-[#FFD700]",
      borderColor: "border-black",
    },
    {
      id: "silver",
      name: "Bạc",
      bgColor: "bg-[#C0C0C0]",
      borderColor: "border-black",
    },
    {
      id: "wood",
      name: "Gỗ",
      bgColor: "bg-[#8B5A2B]",
      borderColor: "border-black",
    },
  ];

  const sizeOptions: SizeOption[] = [
    { id: "15x21", label: "15x21", dimensions: { width: 150, height: 210 } },
    { id: "20x30", label: "20x30", dimensions: { width: 200, height: 300 } },
    { id: "40x20", label: "40x20", dimensions: { width: 400, height: 200 } },
  ];

  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [discountPercent, setDiscountPercent] = useState(0);
  const discountPrice =
    (Number(
      HELPER.calculateTotalNumber(
        products.find((pro: any) => pro._id.toString() === selectedProduct)
          ?.price,
        "30000",
        0
      )
    ) *
      discountPercent) /
    100;

  const handleCheckDiscount = async () => {
    if (promoCode === "") {
      toast({
        title: "",
        description: "Vui lòng nhập mã giảm giá!",
        variant: "destructive",
      });
      setIsValid(false);
      setDiscountPercent(0);
      return false;
    }

    try {
      setIsChecking(true);
      const valid = await OrderService.checkDiscount(promoCode);

      if (valid?.data === "Discount code not found") {
        setIsChecking(false);
        setIsValid(false);
        setDiscountPercent(0);
        toast({
          title: "",
          description: "Mã giảm giá không tồn tại!",
          variant: "destructive",
        });
        return false;
      } else {
        setIsValid(true);
        setIsChecking(false);
        setDiscountPercent(valid?.data?.percent);
        toast({
          title: "",
          description: "Sử dụng mã giảm giá thành công!",
          style: {
            backgroundColor: "#22c55e",
            color: "white",
          },
        });
        return false;
      }
    } catch (error) {
      console.error("Error checking discount:", error);
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

  const getImageContainerStyle = () => {
    const selectedSizeOption = sizeOptions.find(
      (size) => size.id === selectedSize
    );
    if (!selectedSizeOption) return {};
    const aspectRatio =
      selectedSizeOption.dimensions.width /
      selectedSizeOption.dimensions.height;
    return {
      aspectRatio: aspectRatio,
      maxWidth: "100%",
      width: "100%",
      position: "relative" as const,
    };
  };

  const renderProduct = async () => {
    const res = await ProductService.getAll();
    if (res && res.data.length > 0) {
      setProducts(res.data);
    }
  };

  const validateForm = () => {
    if (selectedProduct === "Chon san pham") {
      toast({
        title: "",
        description: "Vui lòng chọn một sản phẩm!",
        variant: "destructive",
      });
      setIsLoading(false);
      return false;
    }
    if (!uploadedFile) {
      toast({
        title: "",
        description: "Vui lòng tải lên một hình ảnh!",
        variant: "destructive",
      });
      setIsLoading(false);
      return false;
    }
    if (confirmColor === "") {
      toast({
        title: "",
        description: "Vui lòng chọn màu sắc!",
        variant: "destructive",
      });
      setIsLoading(false);
      return false;
    }
    if (confirmSize === "") {
      toast({
        title: "",
        description: "Vui lòng chọn kích thước!",
        variant: "destructive",
      });
      setIsLoading(false);
      return false;
    }
    if (!formData?.address) {
      toast({
        title: "",
        description: "Vui lòng nhập địa chỉ giao hàng!",
        variant: "destructive",
      });
      setIsLoading(false);
      return false;
    }
    if (!formData?.ward || ward === "Vui lòng chọn phường/xã") {
      toast({
        title: "",
        description:
          "Vui lòng chọn đầy đủ Tỉnh/Thành phố, Quận/Huyện, Phường/Xã.",
        variant: "destructive",
      });
      setIsLoading(false);
      return false;
    }
    if (!formData?.phone) {
      toast({
        title: "",
        description: "Vui lòng nhập số điện thoại!",
        variant: "destructive",
      });
      setIsLoading(false);
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
      setIsLoading(false);
      return false;
    }
    if (!selectedPayment) {
      toast({
        title: "",
        description: "Vui lòng chọn phương thức thanh toán!",
        variant: "destructive",
      });
      setIsLoading(false);
      return false;
    }

    // if (!isValid) {
    //   toast({
    //     title: "",
    //     description:
    //       "Vui lòng nhập đúng mã giảm giá hoặc không dùng mã giảm giá!",
    //     variant: "destructive",
    //   });
    //   return false;
    // }
    return true;
  };

  const handleImageUpload = (file: File | null) => {
    if (file) {
      setUploadedFile(file);
      const originalUrl = URL.createObjectURL(file);
      setOriginalImage(originalUrl);
      setCurrentImage(originalUrl);
      setCroppedImage(null);
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    setLoading(true);
    let accountOrderLogin = false;
    try {
      setIsLoading(true);
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
        color: confirmColor,
        size: confirmSize,
        address: formData?.address || "",
        payment_method: selectedPayment || "",
        discount_code: promoCode || "",
        discount_price: discountPercent || 0,
        total: HELPER.calculateTotalNumber(
          products.find((pro: any) => pro._id.toString() === selectedProduct)
            ?.price,
          "30000",
          discountPercent
        ),
      };

      let response;
      if (!isLogin) {
        response = await OrderService.createOrder_no_login({
          account: commonAccountData,
          order: orderData,
        });
        // setOrderNoLogin(true);
        accountOrderLogin = false;
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
          setIsLoading(false);
        } catch (error) {
          console.error("========= Error Login:", error);
          toast({
            variant: "destructive",
            title: "Email hoặc mật khẩu chưa chính xác",
          });
        } finally {
          setIsLoading(false);
        }
      } else {
        response = await OrderService.createOrder({
          account: { _id: isLogin, ...commonAccountData },
          order: orderData,
        });
        // setOrderNoLogin(false);
        accountOrderLogin = true;
        if (response === false) {
          toast({
            title: "",
            description: "Số điện thoại đã được sử dụng!",
            variant: "destructive",
          });
          setIsLoading(false);
          return;
        }
        setIsLoading(false);
      }

      if (selectedPayment === "momo" && response?.data) {
        window.open(response.data, "_blank");
        window.location.href = accountOrderLogin
          ? `${ROUTES.ACCOUNT}?tab=history`
          : response?.data?.isAccountExisted === true
          ? `${ROUTES.ACCOUNT}?tab=history`
          : `${ROUTES.ACCOUNT}?tab=history&orderNoLogin=true`;
      } else {
        window.location.href = accountOrderLogin
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

  React.useEffect(() => {
    if (formData.province) {
      const selectedProvince = provinces.find(
        (p) => p.code === formData.province
      );

      if (selectedProvince) {
        setDistricts(selectedProvince.districts);
        const selectedDistrict = selectedProvince.districts.find(
          (d) => d.code === formData.district
        );
        setProvince(selectedProvince.name);
        if (selectedDistrict) {
          setDistrict(selectedDistrict.name);
          setWards(selectedDistrict.wards);
          const selectedWard = selectedDistrict.wards.find(
            (w) => w.code === Number(formData.ward)
          );
          if (selectedWard) {
            setWard(selectedWard.name);
          }
        }
      }
    }
  }, [formData.province, formData.district, provinces, formData.ward]);

  useEffect(() => {
    // if (emailCookie) {
    //   init(emailCookie);
    // }

    const fetchAccount = async () => {
      if (isLogin) {
        try {
          const data = await AccountService.getAccountById(isLogin);
          setCustomerAccount(data);
          setFormData({
            name: data.name,
            email: data.email,
            avatar: data.avatar,
            phone: data.phone,
            address: data.address,
            ward: data.ward,
            district: data.district,
            province: data.province,
          });
        } catch (error) {
          console.error("Error fetching account:", error);
        }
      }
    };

    fetchAccount();
    renderProduct();
  }, []);

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
      setDistrict("Vui lòng chọn Quận/Huyện");
      setWard("Vui lòng chọn Phường/Xã");
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
      setWard("Vui lòng chọn Phường/Xã");
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);

  const onCropComplete = useCallback(
    async (croppedArea: any, croppedAreaPixels: any) => {
      if (!uploadedFile) return;

      try {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const image = new window.Image();
        image.src = originalImage || URL.createObjectURL(uploadedFile);

        await new Promise((resolve) => {
          image.onload = resolve;
        });

        canvas.width = croppedAreaPixels.width;
        canvas.height = croppedAreaPixels.height;

        ctx?.drawImage(
          image,
          croppedAreaPixels.x,
          croppedAreaPixels.y,
          croppedAreaPixels.width,
          croppedAreaPixels.height,
          0,
          0,
          croppedAreaPixels.width,
          croppedAreaPixels.height
        );

        const croppedImageUrl = canvas.toDataURL("image/jpeg");
        setCroppedImage(croppedImageUrl);
      } catch (error) {
        console.error("Error cropping image:", error);
        toast({
          title: "Lỗi",
          description: "Không thể xử lý hình ảnh",
          variant: "destructive",
        });
      }
    },
    [uploadedFile, originalImage]
  );

  const handleCropSave = () => {
    if (croppedImage) {
      setCurrentImage(croppedImage);
      const blob = dataURLtoBlob(croppedImage);
      const file = new File([blob], uploadedFile?.name || "cropped-image.jpg", {
        type: "image/jpeg",
      });
      setUploadedFile(file);
    }
    setConfirmColor(selectedColor);
    setConfirmSize(selectedSize);
    setIsLoading(false);
  };

  const handleCheckChange = () => {
    if (confirmSize === "" && confirmColor === "") {
      setSelectedSize("");
      setSelectedColor("");
    }
    setIsLoading(false);
  };

  const dataURLtoBlob = (dataURL: string) => {
    const arr = dataURL.split(",");
    const mime = arr[0].match(/:(.*?);/)?.[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  };

  const getAspectRatio = (sizeId: string) => {
    switch (sizeId) {
      case "15x21":
        return 5 / 7;
      case "20x30":
        return 2 / 3;
      case "40x20":
        return 2 / 1;
      default:
        return 2 / 1;
    }
  };

  return (
    <div className="w-full mx-auto pb-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="hidden lg:grid w-full md:w-1/2 space-y-6">
          <div>
            <h2 className="text-lg lg:text-xl font-medium mb-4">
              Thông tin khách hàng
            </h2>
            <div className="mb-4">
              <Label htmlFor="name" className="text-black">
                Họ và tên:
              </Label>
              <Input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 pr-16 border border-gray-300 rounded-md mt-1"
              />
            </div>
            {/* <div className="mb-4">
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
            </div> */}
            <div className="mb-4">
              <Label htmlFor="phone" className="text-black">
                Số điện thoại:
              </Label>
              <Input
                type="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-3 py-2 pr-16 border border-gray-300 rounded-md mt-1"
              />
            </div>
          </div>
          <div>
            <h2 className="text-lg lg:text-xl font-medium mb-4">
              Địa chỉ nhận hàng
            </h2>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="province" className="text-black">
                  Tỉnh/Thành phố:
                </Label>
                <Select
                  value={String(formData.province)}
                  onValueChange={handleProvinceChange}
                  disabled={loading}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn Tỉnh/Thành phố" />
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
              <div className="flex flex-col gap-2">
                <Label htmlFor="district" className="text-black">
                  Quận/Huyện:
                </Label>
                <Select
                  value={String(formData.district)}
                  onValueChange={handleDistrictChange}
                  disabled={!formData.province || loading}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn Quận/Huyện" />
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
            <div className="flex flex-col gap-2 mb-3">
              <Label htmlFor="ward" className="text-black">
                Phường/Xã:
              </Label>
              <Select
                value={String(formData.ward)}
                onValueChange={handleWardChange}
                disabled={!formData.district || loading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn Phường/Xã" />
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
            <div className="mb-4">
              <Label htmlFor="address" className="text-black">
                Số nhà, tên đường:
              </Label>
              <Input
                id="address"
                name="address"
                placeholder="Ví dụ: 123 Đường ABC"
                value={formData.address}
                onChange={handleInputChange}
                className="mt-1"
              />
            </div>
          </div>
          {selectedProduct !== "Chon san pham" && (
            <>
              <div>
                <h2 className="text-lg lg:text-xl font-medium mb-4">
                  Tùy chọn thanh toán
                </h2>
                <div className="border border-gray-300 rounded divide-y">
                  <div
                    onClick={() => setSelectedPayment("cash")}
                    className="cursor-pointer p-4 flex items-center"
                  >
                    <div
                      className={`cursor-pointer w-5 h-5 rounded-full mr-2 ${
                        selectedPayment === "cash"
                          ? "border border-gray-200 bg-yellow-500"
                          : "border border-gray-200"
                      }`}
                    ></div>
                    <label htmlFor="cash" className="cursor-pointer ml-2">
                      Thanh toán khi nhận hàng
                    </label>
                  </div>
                  <div
                    onClick={() => setSelectedPayment("bank")}
                    className="cursor-pointer p-4 items-center"
                  >
                    <div className="cursor-pointer flex items-center">
                      <div
                        className={`cursor-pointer w-5 h-5 rounded-full mr-2 ${
                          selectedPayment === "bank"
                            ? "border border-gray-200 bg-yellow-500"
                            : "border border-gray-200"
                        }`}
                      ></div>

                      <label htmlFor="bank" className="cursor-pointer ml-2">
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
                  className="w-full p-3 border border-gray-300 rounded h-24 ml-0 mx-10"
                ></textarea>
              </div>
            </>
          )}
        </div>
        <div className="w-full lg:w-1/2 space-y-6">
          <div>
            <h2 className="text-lg lg:text-xl font-medium mb-1">
              Thông tin sản phẩm
            </h2>
            <div className="bg-gray-50 border border-gray-300 text-black rounded-lg block w-full mt-1 mb-2">
              <Dialog>
                <DialogTrigger asChild>
                  <div className="cursor-pointer flex flex-row justify-between items-center gap-4 p-2 bg-white rounded-lg">
                    {selectedProduct && selectedProduct !== "Chon san pham" ? (
                      products?.find(
                        (item: any) => String(item?._id) === selectedProduct
                      ) ? (
                        <div className="cursor-pointer flex flex-row items-center gap-2">
                          <Image
                            src={
                              products?.find(
                                (item: any) =>
                                  String(item?._id) === selectedProduct
                              )?.thumbnail
                            }
                            alt=""
                            width={1000}
                            height={1000}
                            className="object-cover w-8 h-8 shrink-0"
                          />
                          <p className="text-xs line-clamp-2">
                            {
                              products?.find(
                                (item: any) =>
                                  String(item?._id) === selectedProduct
                              )?.name
                            }
                          </p>
                        </div>
                      ) : (
                        "Chọn sản phẩm"
                      )
                    ) : (
                      "Chọn sản phẩm"
                    )}
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="mb-3">
                      Vui lòng chọn sản phẩm
                    </DialogTitle>
                    <DialogDescription className="max-h-96 overflow-y-auto scroll-bar-style">
                      <div className="">
                        {products?.length > 0 ? (
                          products.map((item: any) => (
                            <DialogClose asChild key={item._id}>
                              <div
                                className="mb-0 cursor-pointer hover:bg-gray-100 py-2 rounded-md"
                                onClick={() => setSelectedProduct(item._id)}
                              >
                                <div className="flex flex-row items-center gap-4">
                                  <Image
                                    src={item.thumbnail}
                                    alt={item.name}
                                    width={1000}
                                    height={1000}
                                    className="object-cover border border-gray-200 w-8 h-8 shrink-0"
                                  />
                                  <p className="text-xs text-left w-full">
                                    {item.name}
                                  </p>
                                </div>
                              </div>
                            </DialogClose>
                          ))
                        ) : (
                          <p className="text-gray-500">
                            Không có sản phẩm nào để chọn.
                          </p>
                        )}
                      </div>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
            {selectedProduct !== "Chon san pham" && (
              <div className="flex flex-col lg:flex-row justify-evenly lg:justify-between h-full lg:h-[260px] lg:mt-5">
                <div className="flex justify-center items-center">
                  {!currentImage.startsWith("http") &&
                  selectedProduct !== "Chon san pham" &&
                  !uploadedFile ? (
                    <div className="mt-3 lg:mt-0 w-full">
                      <ImageUpload
                        onImageChange={handleImageUpload}
                        selectedColor={selectedColor}
                        selectedSize={selectedSize}
                      />
                    </div>
                  ) : (
                    <>
                      <div
                        className={`relative ${
                          selectedSize === "40x20"
                            ? "w-full h-full lg:w-2/3 lg:h-2/3"
                            : "w-full h-60"
                        }  flex items-center justify-center overflow-hidden rounded-md mt-3`}
                        style={getImageContainerStyle()}
                      >
                        <Image
                          src={
                            croppedImage
                              ? croppedImage
                              : uploadedFile
                              ? URL.createObjectURL(uploadedFile)
                              : currentImage || IMAGES.LOGO
                          }
                          alt="Selected product image"
                          width={1000}
                          height={1000}
                          className={`object-cover ${
                            selectedSize === "40x20"
                              ? "w-full h-full"
                              : "w-1/2 lg:w-full h-full"
                          } ${
                            selectedProduct !== "Chon san pham"
                              ? "border-8"
                              : ""
                          } ${
                            selectedColor === "white"
                              ? "border-gray-100"
                              : selectedColor === "black"
                              ? "border-black"
                              : selectedColor === "gold"
                              ? "border-yellow-400"
                              : selectedColor === "silver"
                              ? "border-gray-200"
                              : selectedColor === "wood"
                              ? "border-yellow-950"
                              : "border-gray-200"
                          } rounded-md`}
                          onError={(e) => {
                            e.currentTarget.src = IMAGES.LOGO;
                          }}
                        />
                      </div>
                    </>
                  )}
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <div
                      className="flex justify-center items-center mt-5 lg:mt-0"
                      onClick={handleCheckChange}
                    >
                      <div className="text-white flex flex-row justify-center items-center gap-4 w-full py-2 px-7 lg:py-4 bg-[rgb(var(--primary-rgb))] hover:bg-[rgb(var(--primary-rgb))] text-center rounded-md font-medium transition cursor-pointer">
                        Tùy chọn kích thước, màu sắc
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogContent
                    className="sm:max-w-[1000px] max-h-[48rem] overflow-y-auto"
                    onOpenAutoFocus={(e) => e.preventDefault()}
                  >
                    <DialogHeader>
                      <DialogTitle>
                        <span className="!text-[20px]">Tùy chọn hình ảnh</span>
                      </DialogTitle>
                      {currentImage.startsWith("http") && uploadedFile && (
                        <DialogDescription>
                          <span className="!text-[16px]">
                            Chọn kích thước, màu sắc và nhấn{" "}
                            <strong className="text-orange-700">Lưu</strong> để
                            tùy chọn hình ảnh.
                          </span>
                        </DialogDescription>
                      )}
                    </DialogHeader>
                    {!currentImage.startsWith("http") && !uploadedFile ? (
                      <div className="flex flex-col justify-center items-center gap-3">
                        <div className="w-full h-full flex justify-center text-gray-500 font-semibold items-center">
                          Vui lòng chọn hình ảnh để tùy chỉnh!
                        </div>
                        <DialogClose>
                          <div className="text-black bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500">
                            Quay về
                          </div>
                        </DialogClose>
                      </div>
                    ) : (
                      <>
                        <div className="flex flex-col lg:flex-row justify-center items-start gap-4 min-h-[500px]">
                          <div className="relative w-full h-full">
                            <Cropper
                              image={
                                originalImage ||
                                (uploadedFile
                                  ? URL.createObjectURL(uploadedFile)
                                  : IMAGES.LOGO)
                              }
                              crop={crop}
                              zoom={zoom}
                              aspect={getAspectRatio(selectedSize)}
                              onCropChange={setCrop}
                              onCropComplete={onCropComplete}
                              onZoomChange={setZoom}
                            />
                          </div>
                          <div className="flex flex-col gap-0">
                            <div>
                              <h2 className="text-lg lg:text-xl font-medium mb-2">
                                Kích thước khung ảnh:
                              </h2>
                              <div className="flex gap-4 mb-4">
                                {sizeOptions.map((size) => (
                                  <button
                                    key={size.id}
                                    className={`border px-4 py-2 rounded-md ${
                                      selectedSize === size.id
                                        ? "border-yellow-500 bg-yellow-50"
                                        : "border-gray-300"
                                    }`}
                                    onClick={() => setSelectedSize(size.id)}
                                  >
                                    {size.label}
                                  </button>
                                ))}
                              </div>
                            </div>
                            <div>
                              <h2 className="text-lg font-medium mb-2">
                                Màu sắc khung viền:
                              </h2>
                              <div className="flex gap-4 mb-6">
                                {colorOptions
                                  .filter((color) =>
                                    productsData.color?.includes(color.id)
                                  )
                                  .map((color) => (
                                    <button
                                      key={color.id}
                                      type="button"
                                      className={cn(
                                        "w-8 h-8 rounded-full transition-all border-2",
                                        color.bgColor,
                                        color.borderColor,
                                        selectedColor === color.id
                                          ? "ring-2 ring-offset-2 ring-orange-700"
                                          : ""
                                      )}
                                      onClick={() => setSelectedColor(color.id)}
                                    />
                                  ))}
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
                              Huỷ
                            </Button>
                          </DialogClose>
                          <DialogClose asChild>
                            <Button
                              type="button"
                              onClick={handleCropSave}
                              className="!px-10 !text-[16px] !mb-3 lg:!mb-0"
                              disabled={isLoading}
                            >
                              Lưu
                              {isLoading && (
                                <svg
                                  className="animate-spin ml-2 h-5 w-5"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                >
                                  <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                  />
                                  <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                  />
                                </svg>
                              )}
                            </Button>
                          </DialogClose>
                        </DialogFooter>
                      </>
                    )}
                  </DialogContent>
                </Dialog>
              </div>
            )}
          </div>
          <div className=" lg:hidden w-full md:w-1/2 space-y-6">
            <div>
              <h2 className="text-lg lg:text-xl font-medium mb-1 lg:mb-4">
                Thông tin khách hàng
              </h2>
              <div className="mb-4">
                <Label htmlFor="name" className="text-black">
                  Họ và tên:
                </Label>
                <Input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 pr-16 border border-gray-300 rounded-md mt-1"
                  style={{ fontSize: "16px" }}
                />
              </div>
              {/* <div className="mb-4">
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
              </div> */}
              <div className="mb-4">
                <Label htmlFor="phone" className="text-black">
                  Số điện thoại:
                </Label>
                <Input
                  type="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 pr-16 border border-gray-300 rounded-md mt-1"
                  style={{ fontSize: "16px" }}
                />
              </div>
            </div>
            <div>
              <h2 className="text-lg lg:text-xl font-medium mb-2">
                Địa chỉ nhận hàng
              </h2>
              <div className="grid grid-cols-1 gap-2 mb-3">
                <div className="mb-1">
                  <Label htmlFor="province" className="text-black">
                    Tỉnh/Thành phố:
                  </Label>
                  <Dialog open={openProvinces} onOpenChange={setOpenProvinces}>
                    <DialogTrigger asChild>
                      <Input
                        readOnly
                        value={province || "Vui lòng chọn Tỉnh/Thành phố"}
                        className="text-left w-full px-3 py-2 pr-16 border border-gray-300 rounded-md cursor-pointer mt-1 text-[16px]"
                        onClick={() => setOpenProvinces(true)}
                      />
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Vui lòng chọn Tỉnh/Thành phố</DialogTitle>
                        <DialogDescription className="max-h-96 overflow-y-auto">
                          <div className="my-3">
                            {provinces.map((province) => (
                              <div
                                key={province.code}
                                className="p-2"
                                onClick={() => {
                                  handleProvinceChange(String(province.code));
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
                  <Label htmlFor="district" className="text-black">
                    Quận/Huyện:
                  </Label>
                  <Dialog open={openDistrict} onOpenChange={setOpenDistrict}>
                    <DialogTrigger asChild>
                      <Input
                        readOnly
                        value={district || "Vui lòng chọn Quận/Huyện"}
                        className="text-left w-full px-3 py-2 pr-16 border border-gray-300 rounded-md cursor-pointer mt-1 text-[16px]"
                        onClick={() => setOpenDistrict(true)}
                      />
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Vui lòng chọn Quận/Huyện</DialogTitle>
                        <DialogDescription className="max-h-96 overflow-y-auto">
                          <div className="my-3">
                            {districts.map((district) => (
                              <div
                                key={district.code}
                                className="p-2"
                                onClick={() => {
                                  handleDistrictChange(String(district.code));
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
              <div className="mb-3">
                <Label htmlFor="ward" className="text-black">
                  Phường/Xã:
                </Label>
                <Dialog open={openWard} onOpenChange={setOpenWard}>
                  <DialogTrigger asChild>
                    <Input
                      readOnly
                      value={ward || "Vui lòng chọn Phường/Xã"}
                      className="text-left w-full px-3 py-2 pr-16 border border-gray-300 rounded-md cursor-pointer mt-1 text-[16px]"
                      onClick={() => setOpenWard(true)}
                    />
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Vui lòng chọn Phường/Xã</DialogTitle>
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
                <Label htmlFor="address" className="text-black">
                  Số nhà, tên đường:
                </Label>
                <Input
                  id="address"
                  name="address"
                  placeholder="Ví dụ: 123 Đường ABC"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full mt-1"
                  style={{ fontSize: "16px" }}
                />
              </div>
            </div>
            {selectedProduct !== "Chon san pham" && (
              <>
                <div>
                  <h2 className="text-lg lg:text-xl font-medium mb-4">
                    Tùy chọn thanh toán
                  </h2>
                  <div className="border border-gray-300 rounded divide-y">
                    <div
                      onClick={() => setSelectedPayment("cash")}
                      className="cursor-pointer p-4 flex items-center"
                    >
                      <div
                        className={`cursor-pointer w-5 h-5 rounded-full mr-2 ${
                          selectedPayment === "cash"
                            ? "border border-gray-200 bg-[rgb(var(--primary-rgb))]"
                            : "border border-gray-200"
                        }`}
                      ></div>
                      <label htmlFor="cash" className="cursor-pointer ml-2">
                        Thanh toán khi nhận hàng
                      </label>
                    </div>
                    <div
                      onClick={() => setSelectedPayment("bank")}
                      className="cursor-pointer p-4 items-center"
                    >
                      <div className="cursor-pointer flex items-center">
                        <div>
                          <div
                            className={`cursor-pointer w-5 h-5 rounded-full mr-2 ${
                              selectedPayment === "bank"
                                ? "border border-gray-200 bg-[rgb(var(--primary-rgb))]"
                                : "border border-gray-200"
                            }`}
                          ></div>
                        </div>

                        <label htmlFor="bank" className="cursor-pointer ml-2">
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
                  <h2 className="text-lg font-medium mb-2">
                    Thêm ghi chú cho đơn hàng
                  </h2>
                  <textarea
                    placeholder="Ghi chú về đơn hàng (Nếu có)"
                    className="w-full p-3 border border-gray-300 rounded h-24 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                  ></textarea>
                </div>
              </>
            )}
          </div>
          {selectedProduct !== "Chon san pham" && (
            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between">
                <span>Giá sản phẩm</span>
                <span>
                  {selectedProduct &&
                    HELPER.formatVND(
                      products.find(
                        (pro: any) => pro._id.toString() === selectedProduct
                      )?.price
                    )}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Phí vận chuyển</span>
                <span className="text-green-500">
                  + {HELPER.formatVND("30000")}
                </span>
              </div>
              <div className="flex justify-between font-base">
                <span>Tạm tính</span>
                <span>
                  {selectedProduct &&
                    HELPER.calculateTotal(
                      products.find(
                        (pro: any) => pro._id.toString() === selectedProduct
                      )?.price,
                      "30000",
                      "0"
                    )}
                </span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span>Khuyến mãi</span>
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="">
                      {!isValid ? (
                        <div className="cursor-pointer text-white text-sm flex flex-row justify-center items-center gap-4 w-full mx-auto py-2 px-5 lg:py-2 bg-[rgb(var(--primary-rgb))] hover:bg-[rgb(var(--primary-rgb))] text-center rounded-md font-medium transition">
                          Nhập mã
                        </div>
                      ) : (
                        <div className="flex flex-row gap-2">
                          <div className="text-white text-sm flex flex-row justify-center items-center gap-4 mx-auto py-2 px-2 lg:py-2 bg-green-400 hover:bg-yellow-500 text-center rounded-md font-medium transition">
                            Đã áp dụng mã
                          </div>
                          <div className="text-white text-sm flex flex-row justify-center items-center gap-4 mx-auto py-2 px-2 lg:py-2 bg-yellow-400 hover:bg-yellow-500 text-center rounded-md font-medium transition">
                            Đổi mã
                          </div>
                        </div>
                      )}
                    </div>
                  </DialogTrigger>
                  <DialogContent className="-translate-y-52">
                    <DialogHeader>
                      <DialogTitle>Vui lòng nhập mã giảm giá</DialogTitle>
                      <DialogDescription className="max-h-96 overflow-y-auto">
                        <div className="flex flex-col justify-center items-center gap-2 mt-5">
                          <input
                            type="text"
                            placeholder="Nhập mã khuyến mãi"
                            className={`w-full border border-gray-300 rounded p-2 text-sm focus:border-black focus:outline-none focus:ring-0 focus:ring-black ${
                              isValid === false
                                ? "border-none"
                                : isValid === true
                                ? "border-none"
                                : ""
                            }`}
                            value={promoCode}
                            onChange={(e) => {
                              setPromoCode(e.target.value);
                            }}
                            style={{ fontSize: "16px" }}
                          />
                        </div>
                      </DialogDescription>
                    </DialogHeader>
                    <DialogClose>
                      <div
                        className={`w-full px-5 py-2 mx-auto text-white bg-[rgb(var(--primary-rgb))] hover:bg-[rgb(var(--primary-rgb))] text-center rounded-md font-medium cursor-pointer ${
                          isChecking ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                        onClick={!isChecking ? handleCheckDiscount : undefined}
                      >
                        {isChecking ? "Đang kiểm tra..." : "Dùng mã"}
                      </div>
                    </DialogClose>
                  </DialogContent>
                </Dialog>
              </div>

              {isValid && (
                <div className="flex justify-between items-center pt-2">
                  <span>Giảm giá</span>
                  <div className="flex gap-2">
                    <div className={`text-red-500`}>
                      - {HELPER.formatVND(String(discountPrice))}
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-between font-bold text-xl pt-4">
                <span>Tổng</span>
                <span>
                  {selectedProduct &&
                    HELPER.calculateTotal(
                      products.find(
                        (pro: any) => pro._id.toString() === selectedProduct
                      )?.price,
                      "30000",
                      discountPercent
                    )}
                </span>
              </div>
            </div>
          )}
          <p className="text-sm text-black">
            Bằng cách tiến hành mua hàng, bạn đã đồng ý với các điều khoản và
            chính sách của chúng tôi.
          </p>
          <div className="flex flex-row justify-between items-center mt-6">
            <button
              onClick={() => handleSubmit()}
              className="text-white flex flex-row justify-center items-center gap-4 w-full mx-auto py-2 lg:py-4 bg-[rgb(var(--primary-rgb))] hover:bg-[rgb(var(--primary-rgb))] text-center rounded-md font-medium transition"
            >
              {isLoading ? "Đang xử lí đơn hàng..." : "Đặt hàng"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateOrderSingleSection;
