import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Home, Phone, Mail, Clock } from 'lucide-react';
import Image from 'next/image';
import { IMAGES } from '@/utils/image';

const Footer = () => {
    return (
        <footer className="w-full flex flex-col justify-center items-center bg-[rgb(var(--quaternary-rgb))] pt-8 space-y-8">
            <div className='w-full lg:w-3/4 flex flex-col lg:flex-row gap-4 lg:gap-20'>
                <div className="flex flex-col px-4 lg:px-0 text-center lg:text-start space-y-4">
                    <div className="flex items-center justify-center lg:justify-start">
                        <Image
                            src={IMAGES.LOGO}
                            alt="logo"
                            width={32}
                            height={32}
                            priority
                        />
                        <span className="ml-2 text-xl font-bold">IN ẢNH TRỰC TUYẾN</span>
                    </div>
                    <p className="text-gray-700 max-w-[400px]">
                        Chuyên cung cấp các sản phẩm khung ảnh và album ảnh chất lượng cao, uy tín.
                    </p>
                    <div className='flex flex-row justify-center lg:justify-start items-center gap-4'>
                        <Image
                            src="https://cdn-icons-png.flaticon.com/128/5968/5968764.png"
                            alt="logo"
                            width={30}
                            height={30}
                            priority
                        />
                        <Image
                            src="https://cdn-icons-png.flaticon.com/128/3116/3116491.png"
                            alt="logo"
                            width={30}
                            height={30}
                            priority
                        />
                        <Image
                            src="https://tiemquatiko.com/wp-content/uploads/2022/08/shopee-circle-logo-design-shopping-bag-13.png"
                            alt="logo"
                            width={30}
                            height={30}
                            priority
                        />
                        <Image
                            src="https://bizweb.dktcdn.net/100/452/160/themes/889268/assets/lazada.png?1676621454117"
                            alt="logo"
                            width={30}
                            height={30}
                            priority
                        />
                    </div>
                </div>
                <div className="flex lg:hidden flex-col lg:w-80 py-6 lg:py-0 px-4 space-y-4">
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
                            <Home className="w-5 h-5 flex-shrink-0 mt-0.5" />
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
                <div className="px-4 space-y-4 mt-4 lg:mt-0">
                    <h3 className="text-xl font-bold text-navy-900">Phương thức thanh toán</h3>
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <Image
                                src="https://cdn-icons-png.flaticon.com/128/1052/1052866.png"
                                alt="logo"
                                width={24}
                                height={24}
                                priority
                            />
                            <p className="text-gray-700">COD (Tiền mặt)</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <Image
                                src="https://cdn-icons-png.flaticon.com/128/1341/1341632.png"
                                alt="logo"
                                width={24}
                                height={24}
                                priority
                            />
                            <p className="text-gray-700">Ngân hàng</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <Image
                                src="https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png"
                                alt="logo"
                                width={24}
                                height={24}
                                priority
                            />
                            <p className="text-gray-700">Momo</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <Image
                                src="https://cdn.haitrieu.com/wp-content/uploads/2022/10/Icon-VNPAY-QR.png"
                                alt="logo"
                                width={24}
                                height={24}
                                priority
                            />
                            <p className="text-gray-700">VNPay</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full text-center text-gray-600 py-4 bg-white">
                Copyright © 2025 In Ảnh Trực Tuyến.
            </div>
        </footer>
    );
};

export default Footer;