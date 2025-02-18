"use client";

import Link from 'next/link'
import Image from 'next/image'
import { ChevronDown, Dot, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { IMAGES } from '@/utils/image';

export default function Header() {
  return (
    <header className="hidden lg:flex flex-col w-full bg-white shadow-md">
      <div className="container py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src={IMAGES.LOGO}
              alt="In Ảnh Trực Tuyến"
              width={40}
              height={40}
            />
            <span className="text-xl font-bold">IN ẢNH TRỰC TUYẾN</span>
          </Link>
          <div className="flex-1 max-w-xl mx-8">
            <div className="relative">
              <Input
                type="search"
                placeholder="Bạn đang tìm kiếm điều gì?"
                className="w-full pl-4 pr-10"
              />
              <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Image
                src={IMAGES.DELIVERY}
                alt="In Ảnh Trực Tuyến"
                width={50}
                height={50}
              />
              <div className="text-sm">
                <p className="font-semibold">Thông tin vận chuyển</p>
                <p className="text-gray-600">Phương thức giao hàng</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost">Đăng nhập</Button>
              <span className="text-gray-300">|</span>
              <Button variant="ghost">Đăng ký</Button>
            </div>
            <Image
              src={IMAGES.CART}
              alt="In Ảnh Trực Tuyến"
              width={32}
              height={32}
            />
          </div>
        </div>
      </div>
      <nav className="container py-4 flex justify-between">
        <ul className="flex items-center space-x-8">
          <li>
            <Link href="/" className="text-md font-semibold text-[rgb(var(--primary-rgb))]">
              TRANG CHỦ
            </Link>
          </li>
          <li>
            <Link href="/" className="text-md font-medium flex justify-center items-center gap-1 hover:text-[rgb(var(--primary-rgb))]">
              VỀ CHÚNG TÔI <ChevronDown size={16} />
            </Link>
          </li>
          <li>
            <Link href="/" className="text-md font-medium flex justify-center items-center gap-1 hover:text-[rgb(var(--primary-rgb))]">
              IN ẢNH <ChevronDown size={16} />
            </Link>
          </li>
          <li>
            <Link href="/" className="text-md font-medium flex justify-center items-center gap-1 hover:text-[rgb(var(--primary-rgb))]">
              KHUNG ẢNH <ChevronDown size={16} />
            </Link>
          </li>
          <li>
            <Link href="/" className="text-md font-medium flex justify-center items-center gap-1 hover:text-[rgb(var(--primary-rgb))]">
              PHOTOBOOK <ChevronDown size={16} />
            </Link>
          </li>
          <li>
            <Link href="/" className="text-md font-medium flex justify-center items-center gap-1 hover:text-[rgb(var(--primary-rgb))]">
              BẢNG GIÁ <ChevronDown size={16} />
            </Link>
          </li>
          <li>
            <Link href="/" className="text-md font-medium flex justify-center items-center gap-1 hover:text-[rgb(var(--primary-rgb))]">
              TIN TỨC <ChevronDown size={16} />
            </Link>
          </li>
        </ul>
        <ul className="flex items-center space-x-2">
          <li className="ml-auto">
            <Link href="/" className="text-md font-medium flex justify-center items-center text-[rgb(var(--primary-rgb))]">
              <Dot size={36} /> Vị trí của hàng
            </Link>
          </li>
          <li>
            <Link href="/" className="text-md font-medium flex justify-center items-center text-[rgb(var(--secondary-rgb))]">
              <Dot size={36} /> Yêu cầu xuất hóa đơn VAT
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
