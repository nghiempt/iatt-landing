/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { IMAGES } from '@/utils/image';
import { ROUTES } from '@/utils/route';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { LoginModal } from './login';
import Cookies from "js-cookie";
import { FolderPlus, Gift, History, House, Info, LogOut, NotepadText, PhoneCall, UserRound } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function Header() {

    const isLogin = Cookies.get("isLogin")
    const [logined, setLogined] = useState(false);
    const [open, setOpen] = useState(false);

    const pathname = usePathname()

    const checkTabEnable = (tab: string, pathname: any) => {
        if (pathname === tab) {
            return true;
        } else {
            return false;
        }
    }

    useEffect(() => {
        if (isLogin) {
            // setLogined(true)
        }
    }, [])

    const renderLogin = (isLogin: any) => {
        if (false) {
            return <Image
                src={IMAGES.LOGO}
                alt="logo"
                width={32}
                height={32}
                priority
                className="rounded-full" />
        } else {
            return <LoginModal />
        }
    }

    const handleLogOut = () => {
        Cookies.remove("isLogin");
        window.location.href = ROUTES.HOME
    }

    return (
        <div className='w-full flex flex-col justify-center items-center'>
            <header className="w-full lg:w-3/4 relative bg-[rgb(var(--quaternary-rgb))] lg:bg-white p-4 lg:px-0 lg:py-6 flex items-center justify-between">
                <div className="lg:hidden flex flex-col justify-center">
                    <button
                        className="text-gray-800 w-10 h-10 relative focus:outline-none"
                        onClick={() => setOpen(!open)}
                    >
                        <div className="block w-5 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <span
                                aria-hidden="true"
                                className={`block absolute h-0.5 w-5 bg-current transform transition duration-300 ease-in-out ${open ? 'rotate-45 translate-y-0' : '-translate-y-1.5'
                                    }`}
                            ></span>
                            <span
                                aria-hidden="true"
                                className={`block absolute h-0.5 w-5 bg-current transform transition duration-300 ease-in-out ${open ? 'opacity-0' : 'opacity-100'
                                    }`}
                            ></span>
                            <span
                                aria-hidden="true"
                                className={`block absolute h-0.5 w-5 bg-current transform transition duration-300 ease-in-out ${open ? '-rotate-45 translate-y-0' : 'translate-y-1.5'
                                    }`}
                            ></span>
                        </div>
                    </button>
                </div>
                <div className="flex items-center justify-center gap-4 cursor-pointer">
                    <Image
                        src={IMAGES.LOGO}
                        alt="logo"
                        width={32}
                        height={32}
                        priority
                        className="hidden lg:flex rounded-full"
                    />
                    <span className="flex items-center justify-center mt-1 text-lg font-bold">IN ẢNH TRỰC TUYẾN</span>
                </div>
                <div className='flex justify-center items-center gap-4'>
                    <div className='hidden border border-gray-400 rounded-full px-6 py-1 lg:flex justify-center items-center gap-2'>
                        <PhoneCall size={15} /> Hotline: 0939.468.252
                    </div>
                    {
                        renderLogin(logined)
                    }
                </div>
                {open && (
                    <div className="absolute mt-2 top-16 left-0 h-[1000px] w-full bg-white shadow-md z-20">
                        <ul className="flex flex-col space-y-10 py-10 px-5">
                            <li className='font-bold '>
                                <a href={`${ROUTES.HOME}`} className="flex items-center justify-start gap-4 text-gray-700 hover:text-black">
                                    <House size={18} /> Trang chủ
                                </a>
                            </li>
                            <li className='font-bold '>
                                <a href={`${ROUTES.ABOUT}`} className="flex items-center justify-start gap-4 text-gray-700 hover:text-black">
                                    <Info size={18} /> Giới thiệu
                                </a>
                            </li>
                            <li className='font-bold '>
                                <a href={`${ROUTES.PRODUCT}`} className="flex items-center justify-start gap-4 text-gray-700 hover:text-black">
                                    <Gift size={18} /> Sản phẩm
                                </a>
                            </li>
                            <li className='font-bold '>
                                <a href={`${ROUTES.BLOG}`} className="flex items-center justify-start gap-4 text-gray-700 hover:text-black">
                                    <NotepadText size={18} /> Tin tức
                                </a>
                            </li>
                            {
                                logined
                                &&
                                (
                                    <li className='font-bold '>
                                        <a href={`${ROUTES.ACCOUNT}?tab=profile`} className="flex items-center justify-start gap-4 text-gray-700 hover:text-black">
                                            <UserRound size={18} /> Hồ sơ cá nhân
                                        </a>
                                    </li>
                                )
                            }
                            {
                                logined
                                &&
                                (
                                    <li className='font-bold '>
                                        <a href={`${ROUTES.ACCOUNT}?tab=history`} className="flex items-center justify-start gap-4 text-gray-700 hover:text-black">
                                            <History size={18} /> Lịch sử mua hàng
                                        </a>
                                    </li>
                                )
                            }
                            {
                                logined
                                &&
                                (
                                    <li className='font-bold '>
                                        <a href={`${ROUTES.ACCOUNT}?tab=order-single`} className="flex items-center justify-start gap-4 text-gray-700 hover:text-black">
                                            <FolderPlus size={18} /> Tạo đơn hàng mới
                                        </a>
                                    </li>
                                )
                            }
                            {
                                logined
                                &&
                                (
                                    <li className='font-bold '>
                                        <button onClick={handleLogOut} className="flex items-center justify-start gap-4 text-orange-700 hover:text-black">
                                            <LogOut size={18} />  Đăng xuất
                                        </button>
                                    </li>
                                )
                            }
                        </ul>
                    </div>
                )}
            </header>
            <div className='w-full bg-orange-700 hidden lg:flex justify-center items-center'>
                <div className='w-3/4 text-white flex justify-between items-center py-5'>
                    <a href={`${ROUTES.HOME}`} className={`${checkTabEnable(ROUTES.HOME, pathname) ? 'border px-3 py-1 rounded-md' : ''} font-semibold`}>TRANG CHỦ</a>
                    <a href={`${ROUTES.ABOUT}`} className={`${checkTabEnable(ROUTES.ABOUT, pathname) ? 'border px-3 py-1 rounded-md' : ''} font-semibold`}>VỀ CHÚNG TÔI</a>
                    <a href={`${ROUTES.PLASTIC}`} className={`${checkTabEnable(ROUTES.PLASTIC, pathname) ? 'border px-3 py-1 rounded-md' : ''} font-semibold`}>ÉP PLASTIC</a>
                    <a href={`${ROUTES.FRAME}`} className={`${checkTabEnable(ROUTES.FRAME, pathname) ? 'border px-3 py-1 rounded-md' : ''} font-semibold`}>KHUNG ẢNH</a>
                    <a href={`${ROUTES.ALBUM}`} className={`${checkTabEnable(ROUTES.ALBUM, pathname) ? 'border px-3 py-1 rounded-md' : ''} font-semibold`}>PHOTOBOOK</a>
                    <a href={`${ROUTES.PRICE}`} className={`${checkTabEnable(ROUTES.PRICE, pathname) ? 'border px-3 py-1 rounded-md' : ''} font-semibold`}>BẢNG GIÁ</a>
                    <a href={`${ROUTES.BLOG}`} className={`${checkTabEnable(ROUTES.BLOG, pathname) ? 'border px-3 py-1 rounded-md' : ''} font-semibold`}>TIN TỨC</a>
                </div>
            </div>
        </div>
    );
}