"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import AccountProfile from "./components/profile/profile";
import OrderHistory from "./components/orders/history/history";
import Loading from "./components/loading";
import OrderAlbumCreate from "./components/orders/album/order-album";
import Cookies from "js-cookie";
import { AccountService } from "@/services/account";
import AccountAddress from "./components/profile/address";
import AccountPassword from "./components/profile/password";
import CreateOrderSingle from "./components/orders/frame/order-single";
import { OrderService } from "@/services/order";

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

export interface CustomerAccount {
  _id: string;
  email: string;
  password: string;
  name: string;
  phone: string;
  avatar: string;
  address: string;
  ward: string;
  district: string;
  province: string;
  role: string;
  status: boolean;
  created_at: string;
  districtName: string;
  provinceName: string;
  wardName: string;
}

interface Product {
  _id: string;
  name: string;
  description: string;
  introduction: string;
  price: string;
  thumbnail: string;
  category: string;
  sold: number;
  color: Array<string>;
  images: Array<string>;
  created_at: Date;
}

export interface Order {
  _id: string;
  created_at: string;
  total: string;
  status: string;
  product_id: string;
  product_price: string;
  image: string;
  size: string;
  color: string;
  product_name: string;
  product_category: string;
}

export default function AccountClient() {
  const isLogin = Cookies.get("isLogin");
  const [accountProfile, setAccountProfile] = useState(null as any);
  const param = useSearchParams();

  const [tab, setTab] = React.useState("");

  const [customerAccount, setCustomerAccount] =
    useState<CustomerAccount | null>(null);

  const [product, setProduct] = useState<Product | null>(null);
  const [orders, setOrders] = useState<Order[] | []>([]);

  const fetchOrdersAndAccount = async (loginId: string) => {
    try {
      const [accountData, ordersData] = await Promise.all([
        AccountService.getAccountById(loginId),
        OrderService.getOrderById(loginId),
      ]);

      setCustomerAccount(accountData || null);
      setAccountProfile(accountData || null);
      setOrders(
        Array.isArray(ordersData) && ordersData.length > 0 ? ordersData : []
      );
    } catch (error) {
      console.error("Error fetching data:", error);
      setCustomerAccount(null);
      setAccountProfile(null);
      setOrders([]);
    }
  };

  useEffect(() => {
    if (isLogin) {
      fetchOrdersAndAccount(isLogin);
    } else {
      setCustomerAccount(null);
      setAccountProfile(null);
      setOrders([]);
    }
    setTab(param.get("tab") || "profile");
  }, [isLogin, param]);

  const renderTab = () => {
    switch (tab) {
      case "profile":
        return <AccountProfile />;
      case "history":
        return (
          <OrderHistory
            customerAccount={customerAccount}
            product={product}
            orders={orders}
          />
        );
      case "order-single":
        return <CreateOrderSingle />;
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

  return <div className="w-full">{renderTab()}</div>;
}
