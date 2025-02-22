/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect, useState } from "react";
import Header from "@/layout/header";
import Footer from "@/layout/footer";
import Link from "next/link";
import { Bell, ChevronRight, Clock, User } from "lucide-react";
import { ROUTES } from "@/utils/route";
import Image from "next/image";
import EditProfileModal from "./edit-profile-modal";
import { AccountService } from "@/services/account";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

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

interface SidebarProps {
  customerAccount: CustomerAccount;
}

export default function Sidebar({ customerAccount }: SidebarProps) {
  const tab = new URLSearchParams(window.location.search).get("tab");

  const checkTabEnable = (tab: string, pathname: any) => {
    if (pathname === tab) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className=" bg-white shadow-lg p-4 col-span-4 rounded-md">
      <div className="flex flex-col items-center mb-8">
        <Image
          src={customerAccount.avatar}
          width={1000}
          height={1000}
          className="w-24 h-24 rounded-full"
          alt="avatar"
        />
        <h2 className="text-lg font-medium">{customerAccount.name}</h2>
      </div>

      <nav className="space-y-2">
        <a href={`${ROUTES.ACCOUNT}?tab=profile`} className={`${((tab === "profile") || (tab === "address") || (tab === "password")) 
          ? "text-[rgb(var(--primary-rgb))] font-semibold bg-gray-100" 
          : "text-gray-600"
          } flex items-center space-x-3 px-4 py-2 hover:bg-gray-50 rounded-lg `}>
          <User className="w-5 h-5" />
          <span>Thông tin tài khoản</span>
        </a>
        <div className="pl-8 flex flex-col space-y-2">

          <Link href={`${ROUTES.ACCOUNT}?tab=profile`}
            className={`${checkTabEnable('profile', tab)
              ? "text-[rgb(var(--primary-rgb))] font-semibold"
              : "text-gray-600"
              }block py-2 `}>Hồ sơ cá nhân</Link>

          <Link href={`${ROUTES.ACCOUNT}?tab=address`} className={`${checkTabEnable('address', tab)
            ? "text-[rgb(var(--primary-rgb))] font-semibold"
            : "text-gray-600"
            }block py-2  `}>Địa chỉ</Link>

          <Link href={`${ROUTES.ACCOUNT}?tab=password`} className={`${checkTabEnable('password', tab)
            ? "text-[rgb(var(--primary-rgb))] font-semibold"
            : "text-gray-600"
            } block py-2  `}>Mật khẩu</Link>
        </div>
        <a href="#" className="flex items-center space-x-3 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
          <Bell className="w-5 h-5" />
          <span>Thông báo</span>
        </a>
        <a href={`${ROUTES.ACCOUNT}?tab=history`} className={`${"history" === tab
          ? "text-[rgb(var(--primary-rgb))] font-semibold bg-gray-100" 
          : "text-gray-600" 
          } flex items-center space-x-3 px-4 py-2 hover:bg-gray-50 rounded-lg`}>
          <Clock className="w-5 h-5" />
          <span>Lịch sử mua hàng</span>
        </a>
      </nav>
    </div>
  );
}
