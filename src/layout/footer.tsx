import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Home, Phone, Mail, Clock } from 'lucide-react';
import Image from 'next/image';
import { IMAGES } from '@/utils/image';

const Footer = () => {
    return (
        <footer className="bg-[rgb(var(--quaternary-rgb))] pt-8 space-y-8">
            <div className="px-4 text-center space-y-4">
                <div className="flex items-center justify-center">
                    <Image
                        src={IMAGES.LOGO}
                        alt="logo"
                        width={32}
                        height={32}
                        priority
                    />
                    <span className="ml-2 text-xl font-bold">IN ẢNH TRỰC TUYẾN</span>
                </div>
                <p className="text-gray-700">
                    Chuyên cung cấp các sản phẩm khung ảnh và album ảnh chất lượng cao, uy tín.
                </p>
            </div>
            <div className="px-4 space-y-4">
                <div className="">
                    <Input
                        type="email"
                        placeholder="Nhập email của bạn"
                        className="w-full border-dashed border-2 border-gray-300 rounded-lg py-3 px-4 z-10"
                    />
                </div>
                <Button
                    className="w-full bg-[rgb(var(--primary-rgb))] hover:bg-[#6B3410] text-white py-3"
                >
                    Đăng ký
                </Button>
            </div>
            <div className="px-4 space-y-4">
                <h3 className="text-xl font-bold text-navy-900">Thông tin liên hệ</h3>
                <div className="space-y-4">
                    <div className="flex items-start gap-3">
                        <Home className="w-5 h-5 flex-shrink-0 mt-1" />
                        <p className="text-gray-700">
                            Ninh Kiều, Cần Thơ
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5" />
                        <p className="text-gray-700">0939.468.252</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5" />
                        <p className="text-gray-700">inanhtructuyen.2024@gmail.com</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5" />
                        <p className="text-gray-700">Cả tuần: 9:00 - 17:00</p>
                    </div>
                </div>
            </div>
            <div className="text-center text-gray-600 py-4 bg-white">
                Copyright © 2025 In Ảnh Trực Tuyến.
            </div>
        </footer>
    );
};

export default Footer;