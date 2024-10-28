import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster"

const inter = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "In Ảnh Trực Tuyến",
  description: "In Ảnh Trực Tuyến chỉnh sửa hoàn toàn Miễn phí. In Ảnh Trực Tuyến quá dễ dàng. Chọn những tấm ảnh yêu thích & tải lên trình chỉnh sửa trực tuyến của chúng tôi."
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
