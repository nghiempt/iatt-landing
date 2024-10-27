"use client"

import { Header } from "@/layout/header"
import { products } from "@/utils/constant"
import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/layout/footer";

export default function BiaAlbumPage() {
    return (
        <div className="flex flex-col justify-center">
            <div>
                <Header />
                <div className="w-full flex justify-center">
                    <div className="flex flex-col w-5/6 justify-center">
                        <div className="flex flex-row gap-4 justify-between my-3">
                            <Link href="/in-anh-plastic" className="text-[#6B1346] font-normal text-md p-2 border-b-2 border-white hover:border-[#6B1346]">IN ẢNH PLASTIC</Link>
                            <Link href="/anh-de-ban" className="text-[#6B1346] font-normal text-md p-2 border-b-2 border-white hover:border-[#6B1346]">ẢNH ĐỂ BÀN</Link>
                            <Link href="/anh-treo-tuong" className="text-[#6B1346] font-normal text-md p-2 border-b-2 border-white hover:border-[#6B1346]">ẢNH TREO TƯỜNG</Link>
                            <Link href="/photo-book" className="text-[#6B1346] font-normal text-md p-2 border-b-2 border-white hover:border-[#6B1346]">PHOTO BOOK</Link>
                            <Link href="/bia-album" className="text-[#6B1346] font-normal text-md p-2 border-b-2 border-[#6B1346]">BÌA ALBUM</Link>
                            <Link href="/event" className="text-[#6B1346] font-normal text-md p-2 border-b-2 border-white hover:border-[#6B1346]">EVENT</Link>
                        </div>
                        <div className="flex flex-row text-start text-md gap-3">
                            <Link href="/" className="text-gray-300">Trang chủ /</Link>
                            <Link href="/bia-album">Bìa album</Link>
                        </div>
                        <div className="w-full justify-center mb-10">
                            <div className="py-5 mb-5 text-center text-3xl font-semibold text-[#6B1346]">Bìa album</div>
                            <div className="mb-3 text-center text-sm font-light text-black">Những bữa tiệc sinh nhật, lễ kỷ niệm sẽ không thể thiếu những khung ảnh để bàn</div>
                            <div className="mb-7 text-center text-sm font-light text-black">Ảnh để bàn gồm: In Ảnh Pha lê, In Ảnh Ép Gỗ, In Ảnh lên gỗ, Khung ảnh, Ảnh đế gỗ, Ảnh Mica đế gỗ...</div>
                            <div className="grid grid-cols-4 gap-10 mt-5">
                                {products.slice(0, 8)?.map((product: any, index: any) => (
                                    <Link href='#' key={index} className='relative group cursor-pointer rounded-lg'>
                                        <Card className="rounded-lg flex flex-col border-none">
                                            <div className='relative w-full h-[280px] rounded-lg'>
                                                <Image
                                                    src={product?.images[0]}
                                                    alt={product?.name + ' image'}
                                                    fill
                                                    style={{ objectFit: 'cover' }}
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                    className='rounded-lg hover:scale-105 transition-transform duration-500 ease-in-out hover:shadow-lg'
                                                />
                                            </div>
                                            <div className='flex flex-col justify-center py-6 text-start'>
                                                <div className="text-md mb-3 max-h-[28px] truncate">
                                                    {product?.name}
                                                </div>
                                                <div className='w-full grid grid-cols-5 items-center'>
                                                    <p className="col-span-3 max-h-[24px] text-lg font-semibold text-left truncate">
                                                        {Intl.NumberFormat('de-DE').format(product?.price)} đ
                                                    </p>
                                                </div>
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
