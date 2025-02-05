"use client";

import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import AccountProfile from "./components/profile";
import OrderHistory from "./components/history";
import OrderSingleCreate from "./components/order-single";
import Loading from "./components/loading";
import OrderAlbumCreate from "./components/order-album";

export default function AccountClient() {
  const param = useSearchParams();

  const [tab, setTab] = React.useState("");

  const renderTab = () => {
    switch (tab) {
      case "profile":
        return <AccountProfile />;
      case "history":
        return <OrderHistory />;
      // case "order-single":
      //   return <OrderSingleCreate />;
      case "order-album":
        return <OrderAlbumCreate />;
      default:
        return <Loading />;
    }
  };

  useEffect(() => {
    setTab(param.get("tab") || "profile");
  }, [param]);

  return <div className="w-full">{renderTab()}</div>;
}
