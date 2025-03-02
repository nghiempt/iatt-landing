"use client";

import Footer from "@/layout/footer";
import Header from "@/layout/header";
import Image from "next/image";
import BannerSlider from "./components/slider";
import ProductSectionMobile from "./components/product-mobile";
import CategoryListSectionMobile from "./components/category-list-mobile";

export default function HomeClient() {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center w-full bg-[#F0F0F0] py-1 text-center text-[#A98F57] text-sm font-semibold">
        <span className="text-md font-light">Các phong cách</span>
        <span className="text-lg font-semibold">THIẾT KẾ ALBUM CƯỚI HOT NHẤT</span>
      </div>
      <Header />
      <BannerSlider />
      <div className="w-full flex flex-col justify-center items-start px-4 gap-4 pt-10">
        <div className="w-full h-[2px] bg-orange-600"></div>
        <span className="text-2xl font-semibold mt-6">IN ẢNH TRỰC TUYẾN</span>
        <span className="text-md text-[#888888] font-light text-justify">Chúng tôi thấu hiểu rằng những khoảnh khắc quan trọng trong cuộc đời không chỉ là dấu ấn của thời gian, mà còn là những cột mốc ý nghĩa trong hành trình sống của mỗi người. Được đồng hành cùng những giây phút đặc biệt, từ niềm hạnh phúc tròn vẹn trong ngày cưới, niềm vui tuổi già gặp ngày tân xuân, sự ấm áp của bữa tiệc thôi nôi bên gia đình, về đẹp rực rỡ của thanh xuân thời thiếu nữ, đến những bức ảnh gia đình tràn đầy yêu thương, gắn kết qua từng thế hệ.</span>
        <span className="text-md text-[#888888] font-light text-justify">Với niềm đam mê và chuyên môn trong thiết kế và gia công, chúng tôi tự hào mang đến những sản phẩm độc đáo, tinh tế, giúp bạn lưu giữ trọn vẹn những kỷ niệm quý giá. Đó là niềm vui, nơi nhớ, hay tình cảm gia đình sâu sắc, chúng tôi tin rằng mỗi khoảnh khắc đều xứng đáng được trân trọng và được hiện diện theo cách đặc biệt nhất.</span>
        <div className="w-full h-[2px] bg-orange-600 mt-6"></div>
      </div>
      <div className="w-full flex flex-col justify-center items-center px-4 gap-4 mt-4">
        <span className="text-2xl font-semibold mt-8 mb-4 text-center">SẢN PHẨM MỚI</span>
        <ProductSectionMobile type="Frame" />
        <div className="w-full h-[2px] bg-orange-600 mt-8"></div>
      </div>
      <div className="w-full flex flex-col justify-center items-center px-4 gap-4 mt-4">
        <span className="text-2xl font-semibold mt-8 mb-4 text-center">SẢN PHẨM ĐƯỢC YÊU THÍCH</span>
        <CategoryListSectionMobile />
      </div>
      <div className="relative w-full h-[600px] mb-10 mt-16">
        <Image
          src="https://res.cloudinary.com/farmcode/image/upload/v1740925245/iatt/tq0p7ekzpcmlkm3g6ccq.png"
          alt="alt"
          fill
          className="object-cover"
        />
      </div>
      <div className="w-full flex flex-col justify-center items-center px-4 gap-4">
      <div className="w-full h-[2px] bg-orange-600 mt-8"></div>
        <span className="text-2xl font-semibold mt-8 mb-4 text-center">GIÁ TỐT NHẤT CHO PHOTOGRAPHER</span>
        <span className="text-center">Chúng tôi luôn hướng đến sự chuyên nghiệp và Dịch vụ tốt nhất cho Photographer.
          Bạn là Photographer/ studio hãy đăng ký thành viên để nhận nhiều ưu đãi về giá & dịch vụ. Click tại đây để đăng ký thành viên.
          Chúng tôi sẽ xác nhận qua email trong vòng 24h nếu bạn là Photographer.</span>
      </div>
      <div className="relative w-full h-[600px] mt-16">
        <Image
          src="https://res.cloudinary.com/farmcode/image/upload/v1740925209/iatt/fhwyaaj9z4vxbtps6lqm.png"
          alt="alt"
          fill
          className="object-cover"
        />
      </div>
      <Footer />
    </div>
  );
}
