"use client"

import Dev from "@/modules/dev";
import HomeClient from "@/modules/home";
import React, { Suspense } from 'react';

export default function Home() {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <Suspense fallback={<div>...</div>}>
        {/* <HomeClient /> */}
        <Dev />
      </Suspense>
    </div>
  );
}
