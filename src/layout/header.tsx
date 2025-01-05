'use client'

import { IMAGES } from '@/utils/image';
import { ROUTES } from '@/utils/route';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { LoginModal } from './login';
import Cookies from "js-cookie";

export default function Header() {

    const isLogin = Cookies.get("isLogin")
    const [logined, setLogined] = useState(false);

    useEffect(() => {
        if (isLogin) {
            setLogined(true)
        }
    }, [])

    const [open, setOpen] = useState(false);

    const renderLogin = (isLogin: any) => {
        if (isLogin) {
            return <Image
                src={IMAGES.USER}
                alt="logo"
                width={40}
                height={40}
                priority
                className="rounded-full"
            />
        } else {
            return <LoginModal />
        }
    }

    const handleLogOut = () => {
        Cookies.remove("isLogin");
        window.location.href = ROUTES.HOME
    }

    return (
        <div>
            <header className="relative bg-[rgb(var(--quaternary-rgb))] p-4 flex items-center justify-between">
                <div className="flex flex-col justify-center">
                    <button
                        className="text-gray-500 w-10 h-10 relative focus:outline-none"
                        onClick={() => setOpen(!open)}
                    >
                        <span className="sr-only">Open main menu</span>
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
                <div className="flex items-center">
                    <span className="text-lg font-semibold">IN ẢNH TRỰC TUYẾN</span>
                </div>
                {
                    renderLogin(logined)
                }
                {open && (
                    <div className="absolute top-16 left-0 h-[830px] w-full bg-white shadow-md z-20">
                        <ul className="flex flex-col space-y-10 py-10 px-5">
                            <li className='font-bold '>
                                <a href={`${ROUTES.HOME}`} className="text-gray-700 hover:text-black">
                                    Trang chủ
                                </a>
                            </li>
                            <li className='font-bold '>
                                <a href={`${ROUTES.ABOUT}`} className="text-gray-700 hover:text-black">
                                    Giới thiệu
                                </a>
                            </li>
                            <li className='font-bold '>
                                <a href={`${ROUTES.PRODUCT}`} className="text-gray-700 hover:text-black">
                                    Sản phẩm
                                </a>
                            </li>
                            <li className='font-bold '>
                                <a href={`${ROUTES.BLOG}`} className="text-gray-700 hover:text-black">
                                    Tin tức
                                </a>
                            </li>
                            {
                                logined
                                &&
                                (
                                    <li className='font-bold '>
                                        <a href={`${ROUTES.ACCOUNT}?tab=profile`} className="text-gray-700 hover:text-black">
                                            Hồ sơ cá nhân
                                        </a>
                                    </li>
                                )
                            }
                            {
                                logined
                                &&
                                (
                                    <li className='font-bold '>
                                        <a href={`${ROUTES.ACCOUNT}?tab=history`} className="text-gray-700 hover:text-black">
                                            Lịch sử mua hàng
                                        </a>
                                    </li>
                                )
                            }
                            {
                                logined
                                &&
                                (
                                    <li className='font-bold '>
                                        <a href={`${ROUTES.ACCOUNT}?tab=order-single`} className="text-gray-700 hover:text-black">
                                            Tạo đơn hàng mới
                                        </a>
                                    </li>
                                )
                            }
                            {
                                logined
                                &&
                                (
                                    <li className='font-bold '>
                                        <button onClick={handleLogOut} className="w-1/2 flex items-center justify-center px-4 py-2 text-md font-medium text-white rounded-lg bg-orange-700">
                                            Đăng xuất
                                        </button>
                                    </li>
                                )
                            }
                        </ul>
                    </div>
                )}
            </header>
        </div>
    );
}