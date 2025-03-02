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

export interface FormData extends UserData {
  ward: string;
  district: string;
  province: string;
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

export default function AccountProfile() {
  const emailCookie = Cookies.get("isLogin");
  const isLogin = Cookies.get("isLogin");
  const [loading, setLoading] = React.useState(false);
  const [customerAccount, setCustomerAccount] =
    useState<CustomerAccount | null>(null);
  const [formData, setFormData] = React.useState<FormData>({
    name: customerAccount?.name || "",
    email: customerAccount?.email || "",
    avatar: customerAccount?.avatar || "",
    phone: customerAccount?.phone || "",
    address: customerAccount?.address || "",
    ward: customerAccount?.ward || "",
    district: customerAccount?.district || "",
    province: customerAccount?.province || "",
  });


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
            <div className="flex-1 py-8 px-8 col-span-8">
              <div className="max-w-2xl">
                <h1 className="text-2xl font-medium mb-6">Hồ sơ cá nhân</h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="flex justify-between items-center gap-4">
                    <Label htmlFor="name" className="text-gray-600 w-2/6 ">Họ và tên:</Label>
                    <div className="w-full">
                      <Input
                        id="name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full py-2 pr-16 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="flex justify-between items-center gap-4">
                    <Label htmlFor="phone" className="text-gray-600 w-2/6">Số điện thoại:</Label>
                    <div className=" w-full">
                      <Input
                        type="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 pr-16 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="flex justify-between items-center gap-4">
                    <Label htmlFor="email" className="text-gray-600 w-2/6">Email:</Label>
                    <div className="w-full">
                      <Input
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        disabled={true}
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
