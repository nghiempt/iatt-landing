"use client"

import { Header } from "@/layout/header"
import Link from "next/link";
import { Footer } from "@/layout/footer";
import React from "react";

export default function SixthPage() {
    return (
        <div className="w-full flex flex-col justify-center">
            <div className="w-full">
                <Header />
                <div className="w-full flex justify-center">
                    <div className="flex flex-col w-5/6 justify-center">
                        <div className="grid grid-cols-3 lg:grid-cols-6 text-center gap-4 justify-between my-3">
                            <Link href="/in-anh-plastic" className="text-[#173B45] font-normal text-md py-2 border-b-2 border-white hover:border-[#173B45]">IN ẢNH PLASTIC</Link>
                            <Link href="/anh-de-ban" className="text-[#173B45] font-normal text-md py-2 border-b-2 border-white hover:border-[#173B45]">ẢNH ĐỂ BÀN</Link>
                            <Link href="/anh-treo-tuong" className="text-[#173B45] font-normal text-md py-2 border-b-2 border-white hover:border-[#173B45]">ẢNH TREO TƯỜNG</Link>
                            <Link href="/photo-book" className="text-[#173B45] font-normal text-md py-2 border-b-2 border-white hover:border-[#173B45]">PHOTO BOOK</Link>
                            <Link href="/bia-album" className="text-[#173B45] font-normal text-md py-2 border-b-2 border-white hover:border-[#173B45]">BÌA ALBUM</Link>
                            <Link href="/event" className="text-[#173B45] font-normal text-md py-2 border-b-2 border-white hover:border-[#173B45]">EVENT</Link>
                        </div>
                        <div className="w-full h-[3px] bg-[#B43F3F]"></div>
                        <div className="w-full text-center text-lg font-semibold text-[#B43F3F] py-40">Chức năng đang phát triển</div>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    )
}
