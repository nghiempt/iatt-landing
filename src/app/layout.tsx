import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster"

const font = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "IN ẢNH TRỰC TUYẾN",
  description: "In Ảnh Trực Tuyến chỉnh sửa hoàn toàn Miễn phí. In Ảnh Trực Tuyến quá dễ dàng. Chọn những tấm ảnh yêu thích & tải lên trình chỉnh sửa trực tuyến."
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className} suppressHydrationWarning={true}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
