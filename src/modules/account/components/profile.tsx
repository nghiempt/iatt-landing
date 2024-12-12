"use client"

import React from 'react';
import Header from '@/layout/header';
import Footer from '@/layout/footer';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { ROUTES } from '@/utils/route';
import Image from 'next/image';
import EditProfileModal from './edit-profile-modal';

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
}

export interface UserData {
  name: string;
  email: string;
  phone: string;
  address: string;
  district?: string;
  province?: string;
}

export interface FormData extends UserData {
  district: string;
  province: string;
}

export default function AccountProfile() {
  const userData: UserData = {
    name: "Phạm Thanh Nghiêm",
    email: "nghiempt@gmail.com",
    phone: "+84 911 558 539",
    address: "332/8 Phan Văn Trị, P11, ",
    district: "Bình Thạnh",
    province: "Hồ Chí Minh"
  };

  return (
    <div className="w-full">
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-6">
        <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <Link href={`${ROUTES.HOME}`} className="hover:text-black">Trang chủ</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href={`${ROUTES.ACCOUNT}`} className="hover:text-black">Tài khoản</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href={`${ROUTES.ACCOUNT}`} className="hover:text-black">Hồ sơ cá nhân</Link>
        </nav>
        <div className="">
          <section className="bg-white antialiased dark:bg-gray-900">
            <div className="">
              <div className="">
                <div className="mb-4 grid gap-4 sm:grid-cols-2 sm:gap-8 lg:gap-16">
                  <div className="space-y-4">
                    <div className="flex space-x-4">
                      <Image
                        src="https://cdn-icons-png.flaticon.com/128/1999/1999625.png"
                        width={50}
                        height={50}
                        alt="avatar"
                      />
                      <div>
                        <span className="mb-1 inline-block rounded bg-primary-100 py-0.5 text-xs font-medium text-primary-800 dark:bg-primary-900 dark:text-primary-300">
                          Hạng vàng
                        </span>
                        <h2 className="flex items-center text-xl font-bold leading-none text-gray-900 dark:text-white sm:text-2xl">
                          {userData.name}
                        </h2>
                      </div>
                    </div>
                    <dl className="">
                      <dt className="font-semibold text-gray-900 dark:text-white">Địa chỉ email</dt>
                      <dd className="text-gray-500 dark:text-gray-400">{userData.email}</dd>
                    </dl>
                    <dl>
                      <dt className="font-semibold text-gray-900 dark:text-white">Địa chỉ giao hàng</dt>
                      <dd className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                        {userData.address}{userData.district}, {userData.province}
                      </dd>
                    </dl>
                  </div>
                  <div className="space-y-4">
                    <dl>
                      <dt className="font-semibold text-gray-900 dark:text-white">Số điện thoại</dt>
                      <dd className="text-gray-500 dark:text-gray-400">{userData.phone}</dd>
                    </dl>
                  </div>
                </div>
                <EditProfileModal user={userData} />
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}