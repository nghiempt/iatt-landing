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
import { DATA } from "@/utils/data";

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

const accountProfile = DATA?.USER_PROFILE as UserData;

export default function AccountProfile() {
  const emailCookie = Cookies.get("email");

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

  const getFullAddressName = () => {
    if (!provinces.length) return "";
    const provinceObj = provinces.find(
      (p) => p.code.toString() === accountProfile.province
    );
    const districtObj = provinceObj?.districts.find(
      (d) => d.code.toString() === accountProfile.district
    );
    const wardObj = districtObj?.wards.find(
      (w) => w.code.toString() === accountProfile.ward
    );
    return `${accountProfile.address}, ${wardObj?.name}, ${districtObj?.name}, ${provinceObj?.name}`;
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

  useEffect(() => {
    if (emailCookie) {
      init(emailCookie);
    }
  }, []);

  return (
    <div className="w-full">
      <Header />
      <div className="max-w-4xl lg:max-w-6xl mx-auto px-4 pt-4 pb-20">
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
                <div className="mb-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-1 sm:gap-8 lg:gap-5">
                  <div className="space-y-4">
                    <div className="flex space-x-4">
                      <Image
                        src={accountProfile.avatar}
                        width={1000}
                        height={1000}
                        className="w-14 h-14 rounded-md"
                        alt="avatar"
                      />
                      <div>
                        <span className="mb-1 inline-block rounded bg-primary-100 py-0.5 text-xs font-medium text-primary-800 dark:bg-primary-900 dark:text-primary-300">
                          Hạng vàng
                        </span>
                        <h2 className="flex items-center text-xl font-bold leading-none text-gray-900 dark:text-white sm:text-2xl">
                          {accountProfile.name}
                        </h2>
                      </div>
                    </div>
                    <dl className="">
                      <dt className="font-semibold text-gray-900 dark:text-white">
                        Địa chỉ email
                      </dt>
                      <dd className="text-gray-500 dark:text-gray-400">
                        {accountProfile.email}
                      </dd>
                    </dl>
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
                        {accountProfile.phone}
                      </dd>
                    </dl>
                  </div>
                </div>
                <EditProfileModal user={accountProfile} />
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}
