/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect, useState } from "react";
import Header from "@/layout/header";
import Footer from "@/layout/footer";
import Link from "next/link";
import { Bell, ChevronRight, Clock, Loader, User } from "lucide-react";
import { ROUTES } from "@/utils/route";
import Image from "next/image";
import EditProfileModal from "./edit-profile-modal";
import { AccountService } from "@/services/account";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Sidebar from "./sidebar";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
  const isLogin = Cookies.get("isLogin");

  const [provinces, setProvinces] = React.useState<Province[]>([]);
  const [districts, setDistricts] = React.useState<District[]>([]);
  const [wards, setWards] = React.useState<Ward[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [customerAccount, setCustomerAccount] =
    useState<CustomerAccount | null>(null);
  const [formData, setFormData] = React.useState<FormData>({
    name:  "",
    email:  "",
    avatar:  "",
    phone:  "",
    address:  "",
    ward:  0,
    district:  0,
    province:  0,
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
        if (selectedDistrict) {
          setWards(selectedDistrict.wards);

        }
          
      }
    }
  }, [formData.province, formData.district, provinces]);

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
    const selectedProvince = provinces.find((p) => p.code === Number(provinceCode));
    if (selectedProvince) {
      console.log("selectedProvince: ", selectedProvince.districts);
      setDistricts(selectedProvince.districts);
      setWards([]);
      setFormData((prev) => ({
        ...prev,
        province: Number(provinceCode),
        district: 0,
        ward: 0,
      }));
    } else {
      setDistricts([]);
      setWards([]);
    }
  };

    const handleDistrictChange = (districtCode: string) => {
    const selectedDistrict = districts.find((d) => d.code === Number(districtCode));
    if (selectedDistrict) {
      console.log("selectedDistrict: ", selectedDistrict.wards);
      setWards(selectedDistrict.wards || []);
      setFormData((prev) => ({
        ...prev,
        district: Number(districtCode),
        ward: 0,
      }));
    } else {
      setWards([]);
    }
  };

  const handleWardChange = (wardCode: String) => {
    setFormData((prev) => ({
      ...prev,
      ward: Number(wardCode),
    }));
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
      <Header />
      <div className="container pb-6 pt-2">
        <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6 px-4 py-4">
          <Link href={`${ROUTES.HOME}`} className="hover:text-black">
            Trang chủ
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link href={`${ROUTES.ACCOUNT}`} className="hover:text-[rgb(var(--primary-rgb))] text-md">
            Tài khoản
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link href={`${ROUTES.ACCOUNT}`} className="hover:text-[rgb(var(--primary-rgb))] text-md">
            Hồ sơ cá nhân
          </Link>
        </nav>
        {customerAccount && (
          <div className=" grid grid-cols-12 gap-4 py-6 pb-24">
            {/* Sidebar */}
            <Sidebar customerAccount={customerAccount} />

            {/* Main Content */}
            <div className="flex-1 p-8 col-span-8">
              <div className="max-w-2xl">
                <h1 className="text-2xl font-medium mb-6">Địa chỉ</h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="flex justify-between items-center gap-4">
                    <Label htmlFor="province" className="text-gray-600 w-2/6" >Tỉnh/Thành phố:</Label>
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
                          <SelectItem key={province.code} value={String(province.code)}>
                            {province.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                  </div>

                  <div className="flex justify-between items-center gap-4">
                    <Label htmlFor="district" className="text-gray-600 w-2/6">Quận/Huyện:</Label>
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
                          <SelectItem key={district.code} value={String(district.code)}>
                            {district.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex justify-between items-center gap-4">
                    <Label htmlFor="ward" className="text-gray-600 w-2/6">Phường/Xã:</Label>
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

                  <div className="flex justify-between items-center gap-4 ">
                    <Label htmlFor="address" className="text-gray-600 w-2/6">Số nhà, tên đường:</Label>
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
                      className="w-64 py-2 px-4 bg-[rgb(var(--primary-rgb))]  hover:bg-[rgb(var(--secondary-rgb))] text-white font-medium rounded-md transition-colors"
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
