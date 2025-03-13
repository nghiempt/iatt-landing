// components/NavigationBar.tsx
import React from "react";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, active = false }) => {
  return (
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
  );
};

const NavigationBar: React.FC = () => {
  return (
    <div className="w-full bg-white border-t border-gray-200 fixed bottom-0 left-0 right-0">
      <div className="flex justify-evenly items-center py-3">
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
                d="M10.5 6h3m-3 6h3m-3 6h3m4.5-12v12m0-12h-9m9 12h-9"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M18 6L6 18M6 6l12 12"
              />
            </svg>
          }
          label="Mịn da"
          active={true}
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
                d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
              />
            </svg>
          }
          label="Chất lượng"
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
        />
      </div>
    </div>
  );
};

export default NavigationBar;
