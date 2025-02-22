"use client";

import Footer from "@/layout/footer";
import Header from "@/layout/header";
import Image from "next/image";
import CategoryListSection from "./components/category-list";
import ProductSection from "./components/product";
import CategorySpecialSection from "./components/category-special";
import { Ban } from "lucide-react";
import BannerSlider from "./components/slider";

export default function HomeClient() {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="w-full bg-black p-2.5 text-center text-white text-sm font-semibold">
        <span>IN ẢNH TRỰC TUYẾN - In ảnh nhanh chóng, tiện lợi</span>
      </div>
      <Header />
      <div className="w-full flex flex-col justify-center items-center text-center py-6 gap-1">
        <span className="text-md font-semibold">Thông tin thanh toán: </span>
        <span className="text-sm font-light">Vui lòng đảm bảo địa chỉ giao hàng và tên thành phố được định dạng chính xác trước khi tiến hành thanh toán. Để biết thêm chi tiết, vui lòng tham khảo <span className="text-[rgb(var(--primary-rgb))]">Thêm chi tiết</span> hoặc <span className="text-[rgb(var(--primary-rgb))]">Liên hệ với chúng tôi</span>.</span>
      </div>
      <div className="container">
        <BannerSlider />
        <CategoryListSection />
        <ProductSection type="Frame" />
        <div className="relative w-full h-[600px]">
          <Image
            src="https://res.cloudinary.com/farmcode/image/upload/v1737355887/iatt/vw0razvbguqvcumvyfxa.png"
            alt="alt"
            fill
            className="object-cover rounded-lg"
          />
        </div>
        <ProductSection type="Album"/>
        <CategorySpecialSection />
        <div className="relative w-full h-96 mt-8 rounded-lg">
          <Image
            src="https://res.cloudinary.com/farmcode/image/upload/v1739871597/iatt/gvvwloyp3qjmrcygbxsg.png"
            alt="alt"
            fill
            className="object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-white/40 to-transparent rounded-lg">
            <div className="absolute bottom-[30%] left-0 right-0 p-6 text-white">
              <h3 className="text-2xl font-bold mb-2 text-black">IN ẢNH TRỰC TUYẾN</h3>
              <p className="text-sm mb-2 text-black w-[50%]">Biến khoảnh khắc yêu thích của bạn thành những bức ảnh đẹp lung linh! Chỉ cần tải ảnh lên, chọn kích thước, chất liệu và đặt hàng trong vài phút.</p>
            </div>
          </div>
        </div>
        <ProductSection type="Plastic"/>
        <div className="relative w-full grid grid-cols-2 gap-4 pb-8">
          <Image
            src="https://res.cloudinary.com/farmcode/image/upload/v1737356705/iatt/ryuyf5j3kg5d02hlm1lc.png"
            alt="alt"
            className="h-[400px] object-cover rounded-lg"
            width={1000}
            height={0}
          />
          <Image
            src="https://res.cloudinary.com/farmcode/image/upload/v1737355998/iatt/j8arjpmms7r5w2vlu78w.png"
            alt="alt"
            className="h-[400px] object-cover rounded-lg"
            width={1000}
            height={0}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}
