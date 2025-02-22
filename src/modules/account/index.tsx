"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import AccountProfile from "./components/profile";
import OrderHistory from "./components/history";
import Loading from "./components/loading";
import OrderAlbumCreate from "./components/order-album";
import Cookies from "js-cookie";
import { AccountService } from "@/services/account";
import AccountAddress from "./components/address";
import AccountPassword from "./components/password";
import CreateOrderSingle from "./components/order-single";



export interface Province {
  code: string;
  codename: string;
  districts: District[];
  division_type: string;
  name: string;
  phone_code: number;
}

export interface District {
  code: string;
  codename: string;
  division_type: string;
  name: string;
  short_codename: string;
  wards: Ward[];
}

export interface Ward {
  code: string;
  codename: string;
  division_type: string;
  name: string;
  short_codename: string;
}

export interface UserData {
  name: string;
  avatar: string;
  email: string;
  phone: string;
  address: string;
  ward?: string;
  district?: string;
  province?: string;
}

export interface FormData extends UserData {
  ward: string;
  district: string;
  province: string;
}

export default function AccountClient() {
  const isLogin = Cookies.get("isLogin");
  const [accountProfile, setAccountProfile] = useState(null as any);
  const param = useSearchParams();

  const [tab, setTab] = React.useState("");

  const renderTab = () => {
    switch (tab) {
      case "profile":
        return <AccountProfile />;
      case "history":
        return <OrderHistory />;
      case "order-single":
        return <CreateOrderSingle  />;
      case "order-album":
        return <OrderAlbumCreate />;
      case "address":
        return <AccountAddress />;
      case "password":
        return <AccountPassword />;
      default:
        return <Loading />;
    }
  };

  useEffect(() => {
    const fetchAccount = async () => {
      if (isLogin) {
        try {
          const data = await AccountService.getAccountById(isLogin);
          setAccountProfile(data);
        } catch (error) {
          console.error("Error fetching account:", error);
        }
      }
    };

    fetchAccount();
    setTab(param.get("tab") || "profile");
  }, [param]);

  return <div className="w-full">{renderTab()}</div>;
}
