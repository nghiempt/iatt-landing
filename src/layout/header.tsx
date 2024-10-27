
export const Header = () => {
    return (
        <header>
            <nav className="bg-[#6B1346] border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
                <div className="flex flex-wrap justify-center gap-10 items-center mx-auto max-w-screen-xl">
                    <a href="/" className="flex items-center">
                        <span className="self-center text-3xl font-semibold whitespace-nowrap text-white">In Ảnh Siêu Sắc Nét</span>
                    </a>
                    <div className="flex items-center lg:order-2">
                        <a href="#" className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 rounded-lg text-sm pb-[2px] dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">Đặt Ngay</a>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-step-forward"><polygon points="10,4 20,12 10,20" /></svg>
                    </div>
                </div>
            </nav>
            <nav className="bg-[#FBBF39] border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    <a href="/" className="flex flex-row gap-2 items-center">
                        <img src="favicon.ico" className="h-16" alt="Flowbite Logo" />
                        <div className="flex flex-col gap-0 text-left text-[#6B1346]">
                            <span className="text-3xl font-bold">In Ảnh</span>
                            <span className="text-md font-normal">Trực Tuyến</span>
                        </div>
                    </a>
                    <div className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1 gap-20">
                        <a href="/" className="flex flex-row gap-2 items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="#6B1346" stroke="#6B1346" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-phone-call"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /><path d="M14.05 2a9 9 0 0 1 8 7.94" /><path d="M14.05 6A5 5 0 0 1 18 10" /></svg>
                            <div className="flex flex-col gap-0 text-left">
                                <span className="text-md font-semibold text-[#6B1346]">0123 456 789</span>
                                <span className="text-sm font-light text-black">Tổng đài hỗ trợ</span>
                            </div>
                        </a>
                        <a href="/" className="flex flex-row gap-2 items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#6B1346" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-map-pin"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" /><circle cx="12" cy="10" r="3" /></svg>
                            <div className="flex flex-col gap-0 text-left">
                                <span className="text-md font-semibold text-[#6B1346]">CÁC CỬA HÀNG</span>
                                <span className="text-sm font-light text-black">Giờ làm việc Thứ 2 - Thứ 7<br></br>(Từ 8h đến 17h30)</span>
                            </div>
                        </a>
                    </div>
                    <div className="flex items-center lg:order-2 gap-4">
                        <div className="flex flex-col gap-2 items-center">
                            <span className="text-sm font-light text-black">Góp ý dịch vụ:</span>
                            <span className="text-sm font-light text-black">0123 456 789</span>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#333333" stroke="#333333" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-bell"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /></svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#333333" stroke="#333333" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-shopping-cart"><circle cx="8" cy="21" r="1" /><circle cx="19" cy="21" r="1" /><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" /></svg>
                        <a href="#" className="text-gray-800 font-light rounded-lg text-lg">ĐĂNG NHẬP</a>
                        <svg width="24px" height="24px" viewBox="0 -4 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_503_2795)">
                                <rect width="28" height="20" rx="2" fill="white" />
                                <mask id="mask0_503_2795" maskUnits="userSpaceOnUse" x="0" y="0" width="28" height="20">
                                    <rect width="28" height="20" rx="2" fill="white" />
                                </mask>
                                <g mask="url(#mask0_503_2795)">
                                    <rect width="28" height="20" fill="#EA403F" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M14 12.34L10.4733 14.8541L11.7745 10.7231L8.29366 8.1459L12.6246 8.1069L14 4L15.3754 8.1069L19.7063 8.1459L16.2255 10.7231L17.5267 14.8541L14 12.34Z" fill="#FFFE4E" />
                                </g>
                            </g>
                            <defs>
                                <clipPath id="clip0_503_2795">
                                    <rect width="28" height="20" rx="2" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                        <a href="/" className="flex flex-row gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-upload"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" x2="12" y1="3" y2="15" /></svg>
                            <span className="text-sm font-light text-black">TẢI FILE LÊN</span>
                        </a>
                    </div>
                </div>
            </nav >
        </header >
    )
}