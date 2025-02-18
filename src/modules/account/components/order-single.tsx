"use client";

import React, { useEffect, useState } from "react";
import Header from "@/layout/header";
import Footer from "@/layout/footer";
import Link from "next/link";
import { ChevronRight, Frame, Images, Loader } from "lucide-react";
import { ROUTES } from "@/utils/route";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import ImageUpload from "./image-upload";
import { useToast } from "@/hooks/use-toast";
import { OrderService } from "@/services/order";
import Cookies from "js-cookie";
import { UploadService } from "@/services/upload";
import { AccountService } from "@/services/account";
import { ProductService } from "@/services/product";
import { HELPER } from "@/utils/helper";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

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
  code: string;
  codename: string;
  districts: District[];
  division_type: string;
  name: string;
  phone_code: number;
}

export interface District {
  code: string;
  codename: string;
  division_type: string;
  name: string;
  short_codename: string;
  wards: Ward[];
}

export interface Ward {
  code: string;
  codename: string;
  division_type: string;
  name: string;
  short_codename: string;
}

export interface UserData {
  name: string;
  email: string;
  avatar: string;
  phone: string;
  address: string;
  ward?: string;
  district?: string;
  province?: string;
}

export interface FormData extends UserData {
  ward: string;
  district: string;
  province: string;
}

export default function OrderSingleCreate({ user }: { user: any }) {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ADDRESS
  const [provinces, setProvinces] = React.useState<Province[]>([]);
  const [districts, setDistricts] = React.useState<District[]>([]);
  const [wards, setWards] = React.useState<Ward[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [formData, setFormData] = React.useState<FormData>({
    name: user?.name || "",
    email: user?.email || "",
    avatar: user?.avatar || "",
    phone: user?.phone || "",
    address: user?.address || "",
    ward: user?.ward || "",
    district: user?.district || "",
    province: user?.province || "",
  });

  const isLogin = Cookies.get("isLogin");

  useEffect(() => {
    // if (emailCookie) {
    //   init(emailCookie);
    // }

    const fetchAccount = async () => {
      if (isLogin) {
        try {
          const data = await AccountService.getAccountById(isLogin);
          setFormData(data);
          setUserData(data);
          console.log("check account address: ", data);
        } catch (error) {
          console.error("Error fetching account:", error);
        }
      }
    };

    fetchAccount();
  }, []);

  React.useEffect(() => {
    const fetchProvinces = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://provinces.open-api.vn/api/?depth=3"
        );
        const data = await response.json();
        const formattedData = data.map((province: any) => ({
          ...province,
          code: province.code.toString(),
          districts: province.districts.map((district: any) => ({
            ...district,
            code: district.code.toString(),
            wards: district.wards.map((ward: any) => ({
              ...ward,
              code: ward.code.toString(),
            })),
          })),
        }));
        setProvinces(formattedData);
      } catch (error) {
        console.error("Error fetching provinces:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProvinces();
  }, []);

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
        if (selectedDistrict) {
          setWards(selectedDistrict.wards);
        }
      }
      router.refresh();
    }
  }, [formData.province, formData.district, formData.ward, wards, provinces]);

  const handleProvinceChange = (provinceCode: string) => {
    const selectedProvince = provinces.find((p) => p.code === provinceCode);
    if (selectedProvince) {
      setDistricts(selectedProvince.districts);
      setWards([]);
      setFormData((prev) => ({
        ...prev,
        province: provinceCode,
        district: "",
        ward: "",
      }));
      setUserData((prev: any) => ({
        ...prev,
        province: provinceCode,
        district: "",
        ward: "",
      }));
    } else {
      setDistricts([]);
      setWards([]);
    }
  };

  const handleDistrictChange = (districtCode: string) => {
    const selectedDistrict = districts.find((d) => d.code === districtCode);
    if (selectedDistrict) {
      setWards(selectedDistrict.wards || []);
      setFormData((prev) => ({
        ...prev,
        district: districtCode,
        ward: "",
      }));
      setUserData((prev: any) => ({
        ...prev,
        district: districtCode,
        ward: "",
      }));
    } else {
      setWards([]);
    }
  };

  const handleWardChange = (wardCode: string) => {
    setFormData((prev) => ({
      ...prev,
      ward: wardCode,
    }));
    setUserData((prev: any) => ({
      ...prev,
      ward: wardCode,
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setUserData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const { toast } = useToast();

  // const emailCookie = Cookies.get("email");
  const param = useSearchParams();
  const [customerList, setCustomerList] = useState([] as any);
  const [products, setProducts] = useState([] as any);
  const [productsData, setProductsData] = useState({} as any);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [voucher, setVoucher] = useState<any>(null as any);
  const [currentImage, setCurrentImage] = React.useState("");
  const [selectedSize, setSelectedSize] = React.useState<string>("15x21");
  const [selectedPayment, setSelectedPayment] = React.useState<string>("cash");
  // const [selectedProduct, setSelectedProduct] = React.useState<any>(null);
  const [selectedProduct, setSelectedProduct] = React.useState<any>(
    param.get("product") || "Chon san pham"
  );
  const [selectedColor, setSelectedColor] = React.useState<string>(
    productsData.color?.[0] || "white"
  );
  const [uploadedFile, setUploadedFile] = React.useState<File | null>(null);
  const [userData, setUserData] = React.useState<any>({
    name: user?.name || "",
    email: user?.email || "",
    avatar: user?.avatar || "",
    phone: user?.phone || "",
    address: user?.address || "",
    ward: user?.ward || "",
    district: user?.district || "",
    province: user?.province || "",
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

  useEffect(() => {
    setCurrentImage(param.get("source") || "tab");
    // setSelectedProduct(param.get("product") || "6778b702de4214f1277c438d");
    const productParam = param.get("product");
    setSelectedProduct(productParam ? productParam : "Chon san pham");
  }, [param]);

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

  const preventNavigate = () => {
    toast({
      title: "Gợi ý",
      description: "Vui lòng tải app để tạo album riêng của bạn!",
    });
    setTimeout(() => {
      window.open(
        "https://play.google.com/store/apps/details?id=com.google.android.apps.photos"
      );
    }, 1000);
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
    // if (!emailCookie) {
    //   toast({
    //     title: "",
    //     description: "Vui lòng đăng nhập để tiếp tục!",
    // variant: "destructive",
    //   });
    //   return false;
    // }
    if (!uploadedFile) {
      toast({
        title: "",
        description: "Vui lòng tải lên một hình ảnh!",
        variant: "destructive",
      });
      return false;
    }
    if (!selectedColor) {
      toast({
        title: "",
        description: "Vui lòng chọn màu sắc!",
        variant: "destructive",
      });
      return false;
    }
    if (!selectedSize) {
      toast({
        title: "",
        description: "Vui lòng chọn kích thước!",
        variant: "destructive",
      });
      return false;
    }
    if (!userData?.address) {
      toast({
        title: "",
        description: "Vui lòng nhập địa chỉ giao hàng!",
        variant: "destructive",
      });
      return false;
    }
    if (!userData?.ward) {
      toast({
        title: "",
        description:
          "Vui lòng chọn đầy đủ Tỉnh/Thành phố, Quận/Huyện, Phường/Xã.",
        variant: "destructive",
      });
      return false;
    }
    if (!userData?.phone) {
      toast({
        title: "",
        description: "Vui lòng nhập số điện thoại!",
        variant: "destructive",
      });
      return false;
    }
    const phoneRegex = /^\d{10,11}$/;
    if (!phoneRegex.test(userData.phone)) {
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

    setIsLoading(true);
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
        // avatar: formData?.avatar || "",
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
        color: selectedColor,
        size: selectedSize,
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
      } else {
        response = await OrderService.createOrder({
          account: { _id: isLogin, ...commonAccountData },
          order: orderData,
        });

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
        window.location.href = isLogin
          ? `${ROUTES.ACCOUNT}?tab=history`
          : `${ROUTES.HOME}`;
      } else {
        window.location.href = isLogin
          ? `${ROUTES.ACCOUNT}?tab=history`
          : `${ROUTES.HOME}`;
      }
    } catch (error) {
      console.error("Error submitting order:", error);
      toast({
        title: "",
        description: "Đã xảy ra lỗi khi đặt hàng, vui lòng thử lại!",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderProduct = async () => {
    const res = await ProductService.getAll();
    if (res && res.data.length > 0) {
      setProducts(res.data);
    }
  };

  useEffect(() => {
    const fetchProductData = async () => {
      if (!selectedProduct || selectedProduct === "Chon san pham") return;
      try {
        const res = await ProductService.getProductById(selectedProduct);
        if (res && res.data) {
          setProductsData(res.data);
          setSelectedColor(res.data.color[0]);
        }
      } catch (error) {
        console.error("Error fetching product by ID:", error);
      }
    };

    fetchProductData();
  }, [selectedProduct]);

  const init = async (emailCookie: any) => {
    const res = await AccountService.getAll();
    if (res && res.data.length > 0) {
      const acc = res.data?.find(
        (account: any) => account.email === emailCookie
      );
      setUserData(acc);
    }
    renderProduct();
  };

  useEffect(() => {
    // if (emailCookie) {
    //   init(emailCookie);
    // } else {
    init("");
    // }
  }, []);

  useEffect(() => {}, [formData.ward, wards]);

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <Header />
      <div className="w-full md:w-3/4 px-4 lg:px-4 py-4">
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
          <section className="bg-white antialiased">
            <form action="#" className="">
              {/* <div className='w-full grid grid-cols-2 gap-4 justify-center items-center'>
                <Link href={"/tai-khoan?tab=order-single"} className="text-white font-semibold py-2 rounded-md flex justify-center items-center bg-gradient-to-br from-purple-600 to-orange-600 after:mx-2 after:text-gray-200 dark:after:text-gray-500 sm:after:hidden">
                  <Frame width={16} height={16} className='mr-2' />
                  Hình đơn
                </Link>
                <div onClick={preventNavigate} className="text-white font-semibold py-2 rounded-md flex justify-center items-center bg-gradient-to-r from-gray-400 to-gray-300 after:mx-2 after:text-gray-200 dark:after:text-gray-500 sm:after:hidden">
                  <Images width={16} height={16} className='mr-2' />
                  Album
                </div>
              </div> */}
              <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12 xl:gap-16">
                <div className="w-full md:w-3/4 flex-1 space-y-8">
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Tạo đơn hàng
                    </h2>
                    <div className="w-full flex flex-col justify-center items-center gap-4">
                      <div
                        className="w-full h-full"
                        style={getImageContainerStyle()}
                      >
                        {!currentImage.startsWith("http") ? (
                          <ImageUpload
                            onImageChange={setUploadedFile}
                            selectedColor={selectedColor}
                            selectedSize={selectedSize}
                          />
                        ) : (
                          <div
                            className={cn(
                              "relative w-full h-full overflow-hidden rounded-md",
                              `border-8 ${
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
                              }`
                            )}
                          >
                            <Image
                              src={currentImage}
                              alt="img"
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                      </div>
                      {products?.length > 0 && (
                        <select
                          defaultValue={selectedProduct}
                          onChange={(e) => setSelectedProduct(e.target.value)}
                          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-4"
                        >
                          <option value="Chon san pham" disabled>
                            Chọn sản phẩm
                          </option>
                          {products?.map((item: any, index: any) => {
                            return (
                              <option key={index} value={item?._id}>
                                {item?.name}
                              </option>
                            );
                          })}
                        </select>
                      )}
                      {selectedProduct !== "Chon san pham" && (
                        <>
                          <div className="w-full flex justify-center items-center gap-6 py-4">
                            {colorOptions
                              .filter((colorOptions) =>
                                productsData.color?.includes(colorOptions.id)
                              )
                              .map((color) => (
                                <button
                                  key={color.id}
                                  type="button"
                                  onClick={() => {
                                    setSelectedColor(color.id);
                                  }}
                                  className={cn(
                                    "w-10 h-10 rounded-full border-2 transition-all",
                                    color.bgColor,
                                    color.borderColor,
                                    selectedColor === color.id
                                      ? "ring-2 ring-offset-2 ring-orange-700"
                                      : ""
                                  )}
                                />
                              ))}
                          </div>
                          <div className="w-full grid grid-cols-3 justify-center items-center gap-4">
                            {sizeOptions.map((size) => (
                              <button
                                key={size.id}
                                type="button"
                                onClick={() => setSelectedSize(size.id)}
                                className={cn(
                                  "border rounded-md py-4 flex justify-center items-center transition-all",
                                  selectedSize === size.id
                                    ? "font-bold bg-orange-50 border-orange-600 text-orange-700"
                                    : "hover:bg-gray-50"
                                )}
                              >
                                {size.label}
                              </button>
                            ))}
                          </div>
                        </>
                      )}
                    </div>

                    <div className="lg:hidden grid grid-cols-1 gap-4 sm:grid-cols-1">
                      <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">
                        Thông tin cá nhân
                      </h3>
                      <div>
                        <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                          Tên *
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          className="block w-full rounded-lg border border-gray-200 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                          placeholder="Nguyễn Văn A"
                          value={formData?.name}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        {/* <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                          Địa chỉ *
                        </label>
                        <textarea
                          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                          placeholder=""
                        /> */}

                        <div className="grid gap-2 mb-4">
                          <Label htmlFor="province">Tỉnh/Thành phố *</Label>
                          <Select
                            value={formData.province}
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
                                  value={province.code}
                                  className="py-3"
                                >
                                  {province.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid gap-2 mb-4">
                          <Label htmlFor="district">Quận/Huyện *</Label>
                          <Select
                            value={formData.district}
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
                                  value={district.code}
                                  className="py-3"
                                >
                                  {district.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid gap-2 mb-4">
                          <Label htmlFor="ward">Phường/Xã *</Label>
                          <Select
                            value={formData.ward}
                            onValueChange={handleWardChange}
                            disabled={!formData.district || loading}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Chọn phường/xã" />
                            </SelectTrigger>
                            <SelectContent>
                              {wards.map((ward) => (
                                <SelectItem
                                  key={ward.code}
                                  value={ward.code}
                                  className="py-3"
                                >
                                  {ward.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="address">Số nhà, tên đường *</Label>
                          <Input
                            id="address"
                            name="address"
                            placeholder="Ví dụ: 123 Đường ABC"
                            value={formData?.address}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                          Số điện thoại *
                        </label>
                        <Input
                          id="phone"
                          name="phone"
                          type="number"
                          className="block w-full rounded-lg border p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                          placeholder="0123456789"
                          value={formData?.phone}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>

                  {!isDesktop && selectedProduct !== "Chon san pham" && (
                    <>
                      <div className="space-y-4 pb-0 md:pb-7">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                          Thanh toán
                        </h3>
                        <div className="grid grid-cols-1 gap-4">
                          <div
                            onClick={() => setSelectedPayment("cash")}
                            className="cursor-pointer rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800"
                          >
                            <div className="flex items-start">
                              <div className="flex h-5 items-center">
                                <input
                                  type="radio"
                                  name="payment-method"
                                  value=""
                                  className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
                                  checked={selectedPayment === "cash"}
                                />
                              </div>
                              <div className="ms-4 text-sm">
                                <label className="font-medium leading-none text-gray-900 dark:text-white flex justify-start items-center gap-2">
                                  <Image
                                    src="https://cdn-icons-png.flaticon.com/128/10499/10499979.png"
                                    alt="money"
                                    width={20}
                                    height={20}
                                  />
                                  Tiền mặt (COD)
                                </label>
                                <p className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400">
                                  Thanh toán khi nhận hàng
                                </p>
                              </div>
                            </div>
                          </div>
                          <div
                            onClick={() => setSelectedPayment("bank")}
                            className="cursor-pointer rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800"
                          >
                            <div className="flex items-start">
                              <div className="flex h-5 items-center">
                                <input
                                  type="radio"
                                  name="payment-method"
                                  value=""
                                  className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
                                  checked={selectedPayment === "bank"}
                                />
                              </div>
                              <div className="ms-4 text-sm">
                                <label className="font-medium leading-none text-gray-900 dark:text-white flex justify-start items-center gap-2">
                                  <Image
                                    src="https://cdn-icons-png.flaticon.com/128/8983/8983163.png"
                                    alt="money"
                                    width={20}
                                    height={20}
                                  />
                                  Ngân hàng
                                </label>
                                <p className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400">
                                  Quét QR để thanh toán
                                </p>
                              </div>
                            </div>
                            {selectedPayment === "bank" && (
                              <div className="w-full flex flex-row md:flex-col justify-center items-center gap-4 mt-4">
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
                          <div
                            onClick={() => setSelectedPayment("momo")}
                            className="cursor-pointer rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800"
                          >
                            <div className="flex items-start">
                              <div className="flex h-5 items-center">
                                <input
                                  type="radio"
                                  name="payment-method"
                                  value=""
                                  className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
                                  checked={selectedPayment === "momo"}
                                />
                              </div>
                              <div className="ms-4 text-sm">
                                <label className="font-medium leading-none text-gray-900 dark:text-white flex justify-start items-center gap-2">
                                  <Image
                                    src="https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-MoMo-Square.png"
                                    alt="money"
                                    width={18}
                                    height={18}
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
                    </>
                  )}
                </div>
                <div className="mt-6 w-full space-y-6 sm:mt-8 lg:mt-0 lg:max-w-xs xl:max-w-md md:pt-[3.5%] lg:pt-0">
                  {isDesktop && (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-1">
                      <h3 className="mt-0 text-xl font-semibold text-gray-900 dark:text-white">
                        Thông tin cá nhân
                      </h3>
                      <div>
                        <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                          Tên *
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          className="block w-full rounded-lg border border-gray-200 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                          placeholder="Nguyễn Văn A"
                          value={formData?.name}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        {/* <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                          Địa chỉ *
                        </label>
                        <textarea
                          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                          placeholder=""
                        /> */}

                        <div className="grid gap-2 mb-4">
                          <Label htmlFor="province">Tỉnh/Thành phố *</Label>
                          <Select
                            value={formData.province}
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
                                  value={province.code}
                                  className="py-3"
                                >
                                  {province.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid gap-2 mb-4">
                          <Label htmlFor="district">Quận/Huyện *</Label>
                          <Select
                            value={formData.district}
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
                                  value={district.code}
                                  className="py-3"
                                >
                                  {district.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid gap-2 mb-4">
                          <Label htmlFor="ward">Phường/Xã *</Label>
                          <Select
                            value={formData.ward}
                            onValueChange={handleWardChange}
                            disabled={!formData.district || loading}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Chọn phường/xã" />
                            </SelectTrigger>
                            <SelectContent>
                              {wards.map((ward) => (
                                <SelectItem
                                  key={ward.code}
                                  value={ward.code}
                                  className="py-3"
                                >
                                  {ward.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="address">Số nhà, tên đường *</Label>
                          <Input
                            id="address"
                            name="address"
                            placeholder="Ví dụ: 123 Đường ABC"
                            value={formData?.address}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                          Số điện thoại *
                        </label>
                        <Input
                          id="phone"
                          name="phone"
                          type="number"
                          className="block w-full rounded-lg border p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                          placeholder="0123456789"
                          value={formData?.phone}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  )}

                  {isDesktop && selectedProduct !== "Chon san pham" && (
                    <>
                      <div className="space-y-4 pb-0 md:pb-7">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                          Thanh toán
                        </h3>
                        <div className="grid grid-cols-1 gap-4">
                          <div
                            onClick={() => setSelectedPayment("cash")}
                            className="cursor-pointer rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800"
                          >
                            <div className="flex items-start">
                              <div className="flex h-5 items-center">
                                <input
                                  type="radio"
                                  name="payment-method"
                                  value=""
                                  className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
                                  checked={selectedPayment === "cash"}
                                />
                              </div>
                              <div className="ms-4 text-sm">
                                <label className="font-medium leading-none text-gray-900 dark:text-white flex justify-start items-center gap-2">
                                  <Image
                                    src="https://cdn-icons-png.flaticon.com/128/10499/10499979.png"
                                    alt="money"
                                    width={20}
                                    height={20}
                                  />
                                  Tiền mặt (COD)
                                </label>
                                <p className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400">
                                  Thanh toán khi nhận hàng
                                </p>
                              </div>
                            </div>
                          </div>
                          <div
                            onClick={() => setSelectedPayment("bank")}
                            className="cursor-pointer rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800"
                          >
                            <div className="flex items-start">
                              <div className="flex h-5 items-center">
                                <input
                                  type="radio"
                                  name="payment-method"
                                  value=""
                                  className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
                                  checked={selectedPayment === "bank"}
                                />
                              </div>
                              <div className="ms-4 text-sm">
                                <label className="font-medium leading-none text-gray-900 dark:text-white flex justify-start items-center gap-2">
                                  <Image
                                    src="https://cdn-icons-png.flaticon.com/128/8983/8983163.png"
                                    alt="money"
                                    width={20}
                                    height={20}
                                  />
                                  Ngân hàng
                                </label>
                                <p className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400">
                                  Quét QR để thanh toán
                                </p>
                              </div>
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
                          <div
                            onClick={() => setSelectedPayment("momo")}
                            className="cursor-pointer rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800"
                          >
                            <div className="flex items-start">
                              <div className="flex h-5 items-center">
                                <input
                                  type="radio"
                                  name="payment-method"
                                  value=""
                                  className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
                                  checked={selectedPayment === "momo"}
                                />
                              </div>
                              <div className="ms-4 text-sm">
                                <label className="font-medium leading-none text-gray-900 dark:text-white flex justify-start items-center gap-2">
                                  <Image
                                    src="https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-MoMo-Square.png"
                                    alt="money"
                                    width={18}
                                    height={18}
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
                    </>
                  )}
                  {selectedProduct !== "Chon san pham" && (
                    <>
                      <div className="flow-root">
                        <div className="-my-3 divide-y divide-gray-200 dark:divide-gray-800">
                          <dl className="flex items-center justify-between gap-4 py-3">
                            <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                              Giá sản phẩm
                            </dt>
                            <dd className="text-base font-medium text-gray-900 dark:text-white">
                              {selectedProduct &&
                                HELPER.formatVND(
                                  products.find(
                                    (pro: any) =>
                                      pro._id.toString() === selectedProduct
                                  )?.price
                                )}
                            </dd>
                          </dl>
                          <dl className="flex items-center justify-between gap-4 py-3">
                            <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                              Khuyến mãi
                            </dt>
                            {voucher ? (
                              <dd className="text-base font-medium text-green-500">
                                {HELPER.formatVND(voucher?.value)}
                              </dd>
                            ) : (
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="outline">
                                    Nhập mã khuyến mãi
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                  <DialogHeader>
                                    <DialogTitle>
                                      Nhập mã khuyến mãi
                                    </DialogTitle>
                                  </DialogHeader>
                                  <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                      <Input id="name" className="col-span-4" />
                                    </div>
                                  </div>
                                  <DialogFooter>
                                    <Button
                                      onClick={() =>
                                        setVoucher({ value: 10000 })
                                      }
                                    >
                                      Áp dụng
                                    </Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                            )}
                          </dl>
                          <dl className="flex items-center justify-between gap-4 py-3">
                            <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                              Vận chuyển
                            </dt>
                            <dd className="text-base font-medium text-gray-900 dark:text-white">
                              {HELPER.formatVND("30000")}
                            </dd>
                          </dl>
                          <dl className="flex items-center justify-between gap-4 py-3">
                            <dt className="text-base font-bold text-gray-900 dark:text-white">
                              Tổng
                            </dt>
                            <dd className="text-base font-bold text-gray-900 dark:text-white">
                              {selectedProduct &&
                                HELPER.calculateTotal(
                                  products.find(
                                    (pro: any) =>
                                      pro._id.toString() === selectedProduct
                                  )?.price,
                                  voucher?.value?.toString()
                                )}
                            </dd>
                          </dl>
                        </div>
                      </div>
                    </>
                  )}

                  <div className="space-y-3 pb-0 lg:pb-5">
                    <div
                      onClick={() => handleSubmit()}
                      className="cursor-pointer flex w-full items-center justify-center rounded-lg bg-[rgb(var(--quaternary-rgb))] border border-[rgb(var(--primary-rgb))] px-5 py-4 text-sm font-bold text-[rgb(var(--primary-rgb))] hover:bg-primary-800 focus:outline-none focus:ring-4  focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    >
                      ĐẶT HÀNG NGAY
                      {isLoading && (
                        <Loader className="animate-spin ml-4" size={24} />
                      )}
                    </div>
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
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}
