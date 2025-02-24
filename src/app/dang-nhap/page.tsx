"use client";

import LoginClient from "@/modules/login";
import { Loader } from "lucide-react";
import React, { Suspense } from "react";

export default function Home() {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <Suspense
        fallback={
          <div className="w-full h-[500px] flex flex-col justify-center items-center">
            <Loader className="animate-spin" size={24} />
          </div>
        }
      >
        <LoginClient />
      </Suspense>
    </div>
  );
}
