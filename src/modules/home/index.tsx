/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import Header from "@/layout/header";
import Footer from "@/layout/footer";
import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Cookies from "js-cookie";
import HomeContent from "./main";
import BannerSlider from "./slider";
import Link from "next/link";
import { ROUTES } from "@/utils/route";
import { GlobalComponent } from "@/components/global";
import Image from "next/image";

export default function HomeClient() {
  const param = useSearchParams();

  useEffect(() => {
    if (param.get("email")) {
      Cookies.set("isLogin", "true", { expires: 7 });
      Cookies.set("email", param.get("email")?.toString() || "", {
        expires: 7,
      });
    }
  }, []);

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <Header />
      <BannerSlider />
      <div className="w-full text-center lg:py-16 mt-10 lg:bg-[rgb(var(--quaternary-rgb))]">
        <h3 className="text-2xl lg:text-3xl font-bold text-navy-blue mb-10">
          DANH MỤC SẢN PHẨM
        </h3>
        <div className="flex justify-between lg:justify-center lg:gap-4 items-center px-4 lg:px-0">
          <Link href={`${ROUTES.PLASTIC}?tag=Plastic`}>
            <GlobalComponent.CategoryCard
              title="In Ấn"
              icon={
                <Image
                  src="https://cdn-icons-png.flaticon.com/128/10206/10206530.png"
                  alt="alt"
                  className="w-20 object-cover"
                  width={1000}
                  height={0}
                />
              }
            />
          </Link>
          <Link href={`${ROUTES.FRAME}?tag=Frame`} className="hidden lg:flex">
            <GlobalComponent.CategoryCard
              title="Khung Ảnh Viền"
              icon={
                <Image
                  src="https://cdn-icons-png.flaticon.com/128/9483/9483471.png"
                  alt="alt"
                  className="w-20 object-cover"
                  width={1000}
                  height={0}
                />
              }
            />
          </Link>
          <Link href={`${ROUTES.FRAME}?tag=Frame`} className="flex lg:hidden">
            <GlobalComponent.CategoryCard
              title="Khung Ảnh"
              icon={
                <Image
                  src="https://cdn-icons-png.flaticon.com/128/9483/9483471.png"
                  alt="alt"
                  className="w-20 object-cover"
                  width={1000}
                  height={0}
                />
              }
            />
          </Link>
          <Link href={`${ROUTES.ALBUM}?tag=Album`}>
            <GlobalComponent.CategoryCard
              title="Photobook"
              icon={
                <Image
                  src="https://cdn-icons-png.flaticon.com/128/4334/4334000.png"
                  alt="alt"
                  className="w-20 object-cover"
                  width={1000}
                  height={0}
                />
              }
            />
          </Link>
        </div>
      </div>
      <div className="w-full md:w-3/4 lg:w-3/4 mb-10">
        <HomeContent />
      </div>
      <Footer />
    </div>
  );
}
