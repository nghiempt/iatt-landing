"use client"

import HomeClient from "@/modules/home";
import { useSearchParams } from "next/navigation";
import Cookies from "js-cookie";

export default function Home() {

  const param = useSearchParams()

  if (param.get('email')) {
    Cookies.set("isLogin", "true", { expires: 7 })
    Cookies.set("email", param.get('email')?.toString() || '', { expires: 7 })
  }

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <HomeClient />
    </div>
  );
}
