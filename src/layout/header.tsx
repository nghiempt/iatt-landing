'use client'

import { IMAGES } from '@/utils/image';
import { ROUTES } from '@/utils/route';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';

export default function Header() {

    const [open, setOpen] = useState(false);
    const [openLogin, setOpenLogin] = useState(false);
    const modalRef = useRef<HTMLDivElement | null>(null);
    const scrollToSection = (sectionId: string) => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setOpenLogin(false);
            }
        };

        if (openLogin) {
            document.addEventListener("mousedown", handleClickOutside);
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.body.style.overflow = "";
        };
    }, [openLogin]);

    return (
        <div className={`${openLogin ? 'bg-gray-100' : ''}`}>
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
                    <Image
                        src={IMAGES.LOGO}
                        alt="logo"
                        width={32}
                        height={32}
                    />
                    <span className="ml-2 text-lg font-semibold">IN ẢNH TRỰC TUYẾN</span>
                </div>
                <div
                    onClick={() => scrollToSection('body')}
                    className="flex items-center space-x-4">
                    <button onClick={() => setOpenLogin(!openLogin)}>
                        <Image
                            src={"https://cdn-icons-png.flaticon.com/128/1999/1999625.png"}
                            alt="user"
                            width={32}
                            height={32}
                        />
                    </button>
                </div>
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
                            <li className='font-bold '>
                                <a href={`${ROUTES.ACCOUNT}?tab=profile`} className="text-gray-700 hover:text-black">
                                    Hồ sơ
                                </a>
                            </li>
                            <li className='font-bold '>
                                <a href={`${ROUTES.ACCOUNT}?tab=history`} className="text-gray-700 hover:text-black">
                                    Lịch sử mua hàng
                                </a>
                            </li>
                            <li className='font-bold '>
                                <a href={`${ROUTES.ACCOUNT}?tab=order-single`} className="text-gray-700 hover:text-black">
                                    Tạo đơn hàng mới
                                </a>
                            </li>
                        </ul>
                    </div>
                )}
                {openLogin && (
                    <div>
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 z-20"></div>
                        <div className='absolute top-0 left-0 bottom-0 right-0 pl-8 pr-8 pt-44 z-30'>
                            <div
                                ref={modalRef}
                                className="flex flex-col items-center justify-center mx-auto md:h-screen lg:py-0">
                                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                                    <div
                                        onClick={() => { setOpenLogin(!openLogin) }}
                                        className='flex justify-end pr-3 pt-3'>
                                        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </div>
                                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                            Đăng nhập
                                        </h1>
                                        <form className="space-y-4 md:space-y-6" action="#">
                                            <div>
                                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                                <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" />
                                            </div>
                                            <div>
                                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mật khẩu</label>
                                                <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                            </div>
                                            <div className="flex items-center justify-end">
                                                <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Quên mật khẩu?</a>
                                            </div>
                                            <button type="submit" className="w-full text-white bg-[rgb(var(--primary-rgb))] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-md px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Đăng nhập</button>
                                            <button className="w-full px-4 py-2 border flex justify-center gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150">
                                                <Image className="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" width={1000} height={1000} loading="lazy" alt="google logo" />
                                                <span className='text-md'>Đăng nhập bằng Google</span>
                                            </button>
                                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                                Bạn chưa có tài khoản? <Link href="#" className="font-medium text-primary-600 hover:underline text-black">Đăng ký</Link>
                                            </p>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </header>
        </div>
    );
}