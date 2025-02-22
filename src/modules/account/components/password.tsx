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
import { Input } from "@/components/ui/input";

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
  avatar: string;
  email: string;
  phone: string;
  address: string;
  ward?: string;
  district?: string;
  province?: string;
}

export interface FormData {
  password: string;
  newPassword: string;
  confirmPassword: string;
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

export default function AccountPassword() {
  const emailCookie = Cookies.get("isLogin");
  const isLogin = Cookies.get("isLogin");
  const [loading, setLoading] = React.useState(false);
  const [customerAccount, setCustomerAccount] =
    useState<CustomerAccount | null>(null);
  const router = useRouter();
  const tab = new URLSearchParams(window.location.search).get("tab");

  const [provinces, setProvinces] = React.useState<Province[]>([]);
  const [formData, setFormData] = React.useState<FormData>({
      password: "",
      newPassword: "",
      confirmPassword: "",
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

  useEffect(() => {
    // if (emailCookie) {
    //   init(emailCookie);
    // }

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
  }, []);

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
    const formattedData = {
      ...formData,
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
                <h1 className="text-2xl font-medium mb-6">Đổi Mật khẩu</h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="flex justify-between items-center gap-4">
                    <Label htmlFor="password" className="text-gray-600 w-2/6">Nhập mật khẩu cũ:</Label>
                    <div className="w-full">
                      <Input
                        id="password"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 pr-16 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>

                  </div>

                  <div className="flex justify-between items-center gap-4">
                    <Label htmlFor="newPassword" className="text-gray-600 w-2/6">Nhập mật khẩu mới:</Label>
                    <div className=" w-full">
                      <Input
                        type="newPassword"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 pr-16 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="flex justify-between items-center gap-4">
                    <Label htmlFor="confirmPassword" className="text-gray-600 w-2/6">Nhập lại mật khẩu mới:</Label>
                    <div className="w-full">
                      <Input
                        id="confirmPassword"
                        type="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        className="w-full px-3 py-2 pr-16 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
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
