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
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { IMAGES } from "@/utils/image";
import "../../../../styles/helper.css";

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
  const [oldformData, setOldFormData] = React.useState<FormData>({
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
          setOldFormData({
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
    const areEqual =
      formData.name === oldformData.name &&
      formData.email === oldformData.email &&
      formData.avatar === oldformData.avatar &&
      formData.phone === oldformData.phone &&
      formData.address === oldformData.address &&
      formData.ward === oldformData.ward &&
      formData.district === oldformData.district &&
      formData.province === oldformData.province;
    if (areEqual) {
      toast({
        title: "",
        description: "Không có thay đổi nào được thực hiện!",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }
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
      {/* HELPER */}
      <label className="main top-[92%] lg:top-[60%] z-50">
        <svg
          width="30"
          height="30"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className=""
        >
          <path
            d="M5 18.3335H10C10.8841 18.3335 11.7319 18.6847 12.357 19.3098C12.9821 19.9349 13.3333 20.7828 13.3333 21.6668V26.6668C13.3333 27.5509 12.9821 28.3987 12.357 29.0239C11.7319 29.649 10.8841 30.0002 10 30.0002H8.33333C7.44928 30.0002 6.60143 29.649 5.97631 29.0239C5.35119 28.3987 5 27.5509 5 26.6668V18.3335ZM5 18.3335C5 16.3637 5.38799 14.4131 6.14181 12.5932C6.89563 10.7734 8.00052 9.11977 9.3934 7.72689C10.7863 6.33402 12.4399 5.22912 14.2597 4.4753C16.0796 3.72148 18.0302 3.3335 20 3.3335C21.9698 3.3335 23.9204 3.72148 25.7403 4.4753C27.5601 5.22912 29.2137 6.33402 30.6066 7.72689C31.9995 9.11977 33.1044 10.7734 33.8582 12.5932C34.612 14.4131 35 16.3637 35 18.3335M35 18.3335V26.6668C35 27.5509 34.6488 28.3987 34.0237 29.0239C33.3986 29.649 32.5507 30.0002 31.6667 30.0002H30C29.1159 30.0002 28.2681 29.649 27.643 29.0239C27.0179 28.3987 26.6667 27.5509 26.6667 26.6668V21.6668C26.6667 20.7828 27.0179 19.9349 27.643 19.3098C28.2681 18.6847 29.1159 18.3335 30 18.3335H35Z"
            stroke="white"
            stroke-width="3.33333"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M35 26.667V30.0003C35 31.7684 34.2976 33.4641 33.0474 34.7144C31.7971 35.9646 30.1014 36.667 28.3333 36.667H20"
            stroke="white"
            stroke-width="3.33333"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <input className="inp" type="checkbox" />
        <section className="menu-container">
          <Link
            href="#"
            target="_blank"
            className="menu-list bg-[#FFB413] flex flex-row gap-3 items-center justify-end w-2/3 -right-[46px]"
          >
            <p>Zalo</p>
            <div>
              <Image src={IMAGES.ZALO} alt="alt" width={25} height={25} />
            </div>
          </Link>
          <Link
            href="#"
            target="_blank"
            className="menu-list bg-[#FFB413] flex flex-row gap-3 items-center justify-end rounded-full"
          >
            <p>Messenger</p>
            <div>
              <Image src={IMAGES.MESSENGER} alt="alt" width={30} height={30} />
            </div>
          </Link>
          <Link
            href="#"
            target="_blank"
            className="menu-list bg-[#FFB413] flex flex-row gap-3 items-center justify-end w-[95%] -right-[7px]"
          >
            <p>Facebook</p>
            <div>
              <Image src={IMAGES.FACEBOOK} alt="alt" width={25} height={25} />
            </div>
          </Link>
        </section>
      </label>
      <div className="flex flex-col justify-center items-center w-full bg-[#F0F0F0] py-1 text-center text-[#A98F57] text-sm font-semibold">
        <span className="text-md font-light">Các phong cách</span>
        <span className="text-lg font-semibold">
          THIẾT KẾ ALBUM CƯỚI HOT NHẤT
        </span>
      </div>
      <Header />
      <div className="container px-5 lg:px-8 pb-6 pt-3">
        <nav className="flex items-center gap-2 text-sm text-gray-600 pt-2 pb-2 lg:pb-4">
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
          <div className="grid lg:grid-cols-12 gap-4 pb-0 lg:pb-24">
            <Sidebar customerAccount={customerAccount} />
            <div className="flex-1 lg:col-span-8 ml-0 lg:ml-5">
              <div className="max-w-2xl">
                <h1 className="text-2xl font-semibold mb-3">Hồ sơ cá nhân</h1>
                <form
                  onSubmit={handleSubmit}
                  className="space-y-4 lg:space-y-6"
                >
                  <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-2">
                    <Label htmlFor="name" className="text-black w-2/6">
                      Họ và tên:
                    </Label>
                    <div className="w-full">
                      <Input
                        id="name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full py-2 pr-16 border border-gray-200 rounded-md focus:outline-none focus:border-none"
                        style={{ fontSize: "16px" }}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-2">
                    <Label htmlFor="phone" className="text-black w-2/6">
                      Số điện thoại:
                    </Label>
                    <div className=" w-full">
                      <Input
                        type="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 pr-16 border border-gray-200 rounded-md focus:outline-none focus:border-none"
                        style={{ fontSize: "16px" }}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-2">
                    <Label htmlFor="email" className="text-black w-2/6">
                      Email:
                    </Label>
                    <div className="w-full">
                      <Input
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        disabled={true}
                        className="w-full px-3 py-2 pr-16 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        style={{ fontSize: "16px" }}
                      />
                    </div>
                  </div>
                  <div className="mt-8 flex justify-center items-center">
                    <Button
                      type="submit"
                      className="text-md w-full lg:w-64 py-2 px-4 mt-2 bg-[rgb(var(--primary-rgb))]  hover:bg-[rgb(var(--secondary-rgb))] text-white font-medium rounded-md transition-colors"
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
