/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import Header from '@/layout/header';
import Footer from '@/layout/footer';
import React, { useEffect } from 'react';
import { useSearchParams } from "next/navigation";
import Cookies from "js-cookie";
import HomeContent from './main';
import BannerSlider from './slider';

export default function HomeClient() {

  const param = useSearchParams()

  useEffect(() => {
    if (param.get('email')) {
      Cookies.set("isLogin", "true", { expires: 7 })
      Cookies.set("email", param.get('email')?.toString() || '', { expires: 7 })
    }
  }, [])

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <Header />
      <BannerSlider />
      <div className="w-full md:w-3/4 lg:w-3/4 mb-4 lg:mb-10 lg:mt-4">
        <HomeContent />
      </div>
      <Footer />
    </div>
  );
}