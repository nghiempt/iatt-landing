"use client";

import { useEffect } from "react";
import Cookies from "js-cookie";
import { ROUTES } from "@/utils/route";
import { Loader } from "lucide-react";

export default function SSOAuth() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const accountId = urlParams.get("account_id");

      if (accountId) {
        Cookies.set("isLogin", accountId, { expires: 7 });
        Cookies.set("userLogin", accountId, { expires: 7 });

        window.location.href = ROUTES.HOME;
      }
    }
  }, []);
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <Loader className="animate-spin" size={32} />
    </div>
  );
}
