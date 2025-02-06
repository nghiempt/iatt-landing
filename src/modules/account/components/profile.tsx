/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect, useState } from "react";
import Header from "@/layout/header";
import Footer from "@/layout/footer";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { ROUTES } from "@/utils/route";
import Image from "next/image";
import EditProfileModal from "./edit-profile-modal";
import { AccountService } from "@/services/account";
import Cookies from "js-cookie";

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
  const [customerAccount, setCustomerAccount] =
    useState<CustomerAccount | null>(null);

  const [provinces, setProvinces] = React.useState<Province[]>([]);
  const [userData, setUserData] = React.useState<UserData>({
    name: "",
    email: "",
    avatar: "",
    phone: "",
    address: "",
    ward: "",
    district: "",
    province: "",
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

  useEffect(() => {
    if (emailCookie) {
      init(emailCookie);
    }

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
    if (!customerAccount || !provinces) return "Address not found.";

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

  const init = async (emailCookie: any) => {
    const res = await AccountService.getAll();
    if (res && res.data.length > 0) {
      const acc = res.data?.find(
        (account: any) => account.email === emailCookie
      );
      setUserData(acc);
    }
  };

  return (
    <div className="w-full">
      <Header />
      <div className="w-full lg:w-3/4 mx-auto px-4 pt-4 pb-20">
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
            Hồ sơ cá nhân
          </Link>
        </nav>
        <div className="">
          <section className="bg-white antialiased dark:bg-gray-900">
            <div className="">
              <div className="">
                {customerAccount && (
                  <div className="mb-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-1 sm:gap-8 lg:gap-5">
                    <div className="space-y-4">
                      <div className="flex space-x-4">
                        <Image
                          src={customerAccount.avatar}
                          width={1000}
                          height={1000}
                          className="w-14 h-14 rounded-md"
                          alt="avatar"
                        />
                        <div className="flex flex-col items-start justify-center">
                          <h2 className="flex items-center text-xl font-bold leading-none text-gray-900 dark:text-white sm:text-2xl">
                            {customerAccount.name}
                          </h2>
                          <span className="mb-1 inline-block rounded bg-primary-100 py-0.5 text-sm font-medium text-gray-500 dark:bg-primary-900 dark:text-primary-300">
                            {customerAccount.email}
                          </span>
                        </div>
                      </div>
                      <dl>
                        <dt className="font-semibold text-gray-900 dark:text-white">
                          Địa chỉ giao hàng
                        </dt>
                        <dd className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                          {getFullAddressName()}
                        </dd>
                      </dl>
                    </div>
                    <div className="space-y-4">
                      <dl>
                        <dt className="font-semibold text-gray-900 dark:text-white">
                          Số điện thoại
                        </dt>
                        <dd className="text-gray-500 dark:text-gray-400">
                          {!customerAccount.phone
                            ? "Bạn chưa có thông tin liên lạc vui lòng bổ sung."
                            : customerAccount.phone}
                        </dd>
                      </dl>
                    </div>
                  </div>
                )}
                <EditProfileModal user={customerAccount} />
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}
