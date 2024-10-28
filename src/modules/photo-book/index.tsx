"use client"

import { Header } from "@/layout/header"
import { products } from "@/utils/constant"
import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/layout/footer";
import React from "react";

interface Product {
    row: number;
    id: number;
    name: string;
    category: string;
    price: number;
    description: string;
    images: string[];
}

export default function FourthPage() {

    const getProductByCategory = () => {
        return products.filter((product: Product) => product.category === "Album");
    }

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
                        <div className="w-full justify-center mb-10 mt-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mt-5">
                                {getProductByCategory().slice(0, 8)?.map((product: Product, index: any) => (
                                    <Link href={`/product?id=${product.id}`} key={index} className='relative group cursor-pointer rounded-lg'>
                                        <Card className="rounded-lg flex flex-col !border-none !outline-none shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
                                            <div className='absolute top-2 left-2 bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full'>
                                                Up to 35% off
                                            </div>
                                            <div className='relative w-full h-[280px] rounded-t-lg bg-gray-100 flex items-center justify-center'>
                                                <Image
                                                    src={product?.images[0]}
                                                    alt={product?.name + ' image'}
                                                    fill
                                                    style={{ objectFit: 'cover' }}
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                    className='rounded-t-lg hover:scale-105 transition-transform duration-500 ease-in-out hover:shadow-lg'
                                                />
                                            </div>
                                            <div className='flex flex-col justify-center py-4 px-3 text-start'>
                                                <div className="text-md font-medium mb-1 max-h-[28px] truncate">
                                                    {product?.name}
                                                </div>
                                                <div className='flex items-center mb-2'>
                                                    <div className='flex items-center space-x-1 text-yellow-500'>
                                                        <span>⭐️⭐️⭐️⭐️⭐️</span>
                                                    </div>
                                                    <p className='text-sm text-gray-500 ml-2'>
                                                        20 đánh giá
                                                    </p>
                                                </div>
                                                <div className='flex justify-between items-center'>
                                                    <div className='flex items-center space-x-2 text-sm text-gray-500'>
                                                        <span className='flex items-center space-x-1'>
                                                            <span>🚚</span>
                                                            <span>Giao hàng nhanh</span>
                                                        </span>
                                                    </div>
                                                    <p className="text-lg font-semibold text-black">
                                                        {Intl.NumberFormat('de-DE').format(product?.price)} VNĐ
                                                    </p>
                                                </div>
                                            </div>
                                            <div className='flex justify-center items-center px-3 pb-3'>
                                                <button className='w-full bg-[#B43F3F] text-white text-sm py-2 rounded-md transition-colors'>
                                                    Đặt hàng ngay
                                                </button>
                                            </div>
                                        </Card>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    )
}