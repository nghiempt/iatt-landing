/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect, useState } from "react";
import Header from "@/layout/header";
import Footer from "@/layout/footer";
import Link from "next/link";
import { ChevronRight, Loader } from "lucide-react";
import { ROUTES } from "@/utils/route";
import { AccountService } from "@/services/account";
import Cookies from "js-cookie";
import Sidebar from "../sidebar";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

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

export default function AccountAddress() {
  const [openProvinces, setOpenProvinces] = useState(false);
  const [openDistrict, setOpenDistrict] = useState(false);
  const [openWard, setOpenWard] = useState(false);
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");

  const isLogin = Cookies.get("isLogin");

  const [provinces, setProvinces] = React.useState<Province[]>([]);
  const [districts, setDistricts] = React.useState<District[]>([]);
  const [wards, setWards] = React.useState<Ward[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [customerAccount, setCustomerAccount] =
    useState<CustomerAccount | null>(null);
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
    // setFormData((prev) => ({
    //   ...prev,
    //   ward: Number(wardCode),
    // }));

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

  const getFullAddressName = () => {
    if (!customerAccount || !customerAccount.province)
      return "Bạn chưa có địa chỉ giao hàng vui lòng bổ sung.";

    const provinceObj = provinces.find(
      (p) => p.code.toString() === customerAccount.province
    );
    const districtObj = provinceObj?.districts.find(
      (d) => d.code.toString() === customerAccount.district
    );
    const wardObj = districtObj?.wards.find(
      (w) => w.code.toString() === customerAccount.ward
    );

    return `${customerAccount.address}, ${wardObj?.name}, ${districtObj?.name}, ${provinceObj?.name}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const selectedProvince = provinces.find(
      (p) => p.code === formData.province
    );
    const selectedDistrict = districts.find(
      (d) => d.code === formData.district
    );
    const selectedWard = wards.find((w) => w.code === formData.ward);
    const formattedData = {
      ...formData,
      provinceName: selectedProvince?.name,
      districtName: selectedDistrict?.name,
      wardName: selectedWard?.name,
    };
    const response = await AccountService.updateAccount(
      customerAccount?._id,
      formattedData
    );
    if (response === false) {
      toast({
        title: "",
        description: "Số điện thoại đã được sử dụng!",
        variant: "destructive",
      });
      setLoading(false);
    } else {
      setLoading(false);
      window.location.href = "/tai-khoan?tab=profile";
    }
  };

  return (
    <div className="w-full">
      <div className="w-full bg-black p-2.5 text-center text-white text-sm font-semibold">
        <span>IN ẢNH TRỰC TUYẾN - In ảnh nhanh chóng, tiện lợi</span>
      </div>
      <Header />
      <div className="container px-5 lg:px-8 pb-6 pt-2">
        <nav className="flex items-center gap-2 text-sm text-gray-600 pt-2 pb-4">
          <Link href={`${ROUTES.HOME}`} className="hover:text-black">
            Trang chủ
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link
            href={`${ROUTES.ACCOUNT}`}
            className="hover:text-[rgb(var(--primary-rgb))] text-md"
          >
            Tài khoản
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link
            href={`${ROUTES.ACCOUNT}`}
            className="hover:text-[rgb(var(--primary-rgb))] text-md"
          >
            Hồ sơ cá nhân
          </Link>
        </nav>
        {customerAccount && (
          <div className=" grid lg:grid-cols-12 gap-4 pb-10 lg:pb-24">
            <Sidebar customerAccount={customerAccount} />
            <div className="flex-1 lg:col-span-8">
              <div className="max-w-2xl">
                <h1 className="text-2xl font-medium mb-6">Địa chỉ</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
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
                          className="text-left w-full px-3 py-2 pr-16 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent cursor-pointer"
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
                  <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                    <Label htmlFor="district" className="text-gray-600">
                      Quận/Huyện:
                    </Label>
                    <Dialog open={openDistrict} onOpenChange={setOpenDistrict}>
                      <DialogTrigger asChild>
                        <Input
                          readOnly
                          value={district || "Vui lòng chọn quận/huyện"}
                          className="text-left w-full px-3 py-2 pr-16 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent cursor-pointer"
                          onClick={() => setOpenDistrict(true)}
                        />
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Vui lòng chọn quận/huyện</DialogTitle>
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
                  <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                    <Label htmlFor="ward" className="text-gray-600">
                      Phường/Xã:
                    </Label>
                    <Dialog open={openWard} onOpenChange={setOpenWard}>
                      <DialogTrigger asChild>
                        <Input
                          readOnly
                          value={ward || "Vui lòng chọn phường/xã"}
                          className="text-left w-full px-3 py-2 pr-16 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent cursor-pointer"
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
                  <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 ">
                    <Label
                      htmlFor="address"
                      className="text-gray-600 w-full lg:w-2/6"
                    >
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
                  <div className="mt-8 flex justify-center items-center">
                    <Button
                      type="submit"
                      className="w-full lg:w-64 py-2 px-4 bg-[rgb(var(--primary-rgb))]  hover:bg-[rgb(var(--secondary-rgb))] text-white font-medium rounded-md transition-colors"
                    >
                      Lưu thay đổi
                      {loading && <Loader className="animate-spin" size={48} />}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
