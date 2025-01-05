"use client"

import React from 'react';

export default function Dev() {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <video autoPlay loop muted className='w-40'>
        <source src="https://cdn-icons-mp4.flaticon.com/512/17122/17122456.mp4" type="video/mp4" />
      </video>
      <span className='mt-2 font-medium text-[16px] md:text-lg lg:text-lg'>Website đang trong quá trình nâng cấp</span>
      <span className='mt-1 text-[14px] md:text-md lg:text-md'>Dự kiến: 12:00 07/01/2025</span>
    </div>
  );
}
