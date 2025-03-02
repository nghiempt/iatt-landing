"use client";

import Footer from "@/layout/footer";
import Header from "@/layout/header";
import { ROUTES } from "@/utils/route";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import AboutSection from "./components/about-section";


export default function AboutClient() {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="w-full bg-black p-2.5 text-center text-white text-sm font-semibold">
        <span>IN ẢNH TRỰC TUYẾN - In ảnh nhanh chóng, tiện lợi</span>
      </div>
      <Header />
      <div className="container pb-20 pt-2">
        <div className="px-4 py-4 lg:pb-0 lg:px-0">
          <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6 ">
            <Link href={`${ROUTES.HOME}`} className="hover:text-[rgb(var(--primary-rgb))] text-md">Trang chủ</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href={`${ROUTES.ABOUT}`} className="hover:text-[rgb(var(--primary-rgb))] text-md">Về Chúng tôi</Link>
          </nav>
        </div>
        <AboutSection />
      </div>
      <Footer />
    </div>
  );
}
