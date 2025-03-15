// components/NavigationBar.tsx
import { IMAGES } from "@/utils/image";
import { ROUTES } from "@/utils/route";
import { Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  path: string;
}

const NavItem: React.FC<NavItemProps> = ({
  icon,
  label,
  active = false,
  path,
}) => {
  return (
    <Link href={path}>
      <div className="flex flex-col items-center justify-center px-2">
        <div className={`mb-1 ${active ? "text-black" : "text-gray-400"}`}>
          {icon}
        </div>
        <span
          className={`text-xs ${
            active ? "text-black font-medium" : "text-gray-400"
          }`}
        >
          {label}
        </span>
      </div>
    </Link>
  );
};

interface NavigationBarProps {
  action: string | null;
}

const NavigationBar: React.FC<NavigationBarProps> = ({ action }) => {
  return (
    <div className="w-full border-t border-gray-400 fixed bottom-0 left-0 right-0">
      <div className="flex justify-evenly items-center py-3">
        <NavItem
          icon={
            action === null ? (
              <Image
                src={IMAGES.FUNCTION_1_ACTION}
                alt=""
                width={1000}
                height={1000}
                className="w-5 h-5"
              />
            ) : (
              <Image
                src={IMAGES.FUNCTION_1}
                alt=""
                width={1000}
                height={1000}
                className="w-5 h-5"
              />
            )
          }
          label="Mịn da"
          active={action === null}
          path={`${ROUTES.APP_FRAME}`}
        />

        <NavItem
          icon={<Sparkles size={20} />}
          label="Chất lượng"
          active={action === "cl"}
          path={`${ROUTES.APP_FRAME}?function=cl`}
        />

        <NavItem
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
              />
            </svg>
          }
          label="Xoá phông"
          active={action === "xp"}
          path={`${ROUTES.APP_FRAME}?function=xp`}
        />

        <NavItem
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
          }
          label="Tạo với AI"
          active={action === "ai"}
          path={`${ROUTES.APP_FRAME}?function=ai`}
        />
      </div>
    </div>
  );
};

export default NavigationBar;
