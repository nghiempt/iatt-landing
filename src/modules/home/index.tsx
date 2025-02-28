"use client";

import Footer from "@/layout/footer";
import Header from "@/layout/header";
import Image from "next/image";
import CategoryListSection from "./components/category-list";
import ProductSection from "./components/product";
import CategorySpecialSection from "./components/category-special";
import BannerSlider from "./components/slider";
import "../../styles/helper.css";
import { IMAGES } from "@/utils/image";

export default function HomeClient() {
  return (
    <div className="relative w-full flex flex-col justify-center items-center">
      <label className="main z-50">
        <svg
          width="30"
          height="30"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className=""
        >
          <path
            d="M5 18.3335H10C10.8841 18.3335 11.7319 18.6847 12.357 19.3098C12.9821 19.9349 13.3333 20.7828 13.3333 21.6668V26.6668C13.3333 27.5509 12.9821 28.3987 12.357 29.0239C11.7319 29.649 10.8841 30.0002 10 30.0002H8.33333C7.44928 30.0002 6.60143 29.649 5.97631 29.0239C5.35119 28.3987 5 27.5509 5 26.6668V18.3335ZM5 18.3335C5 16.3637 5.38799 14.4131 6.14181 12.5932C6.89563 10.7734 8.00052 9.11977 9.3934 7.72689C10.7863 6.33402 12.4399 5.22912 14.2597 4.4753C16.0796 3.72148 18.0302 3.3335 20 3.3335C21.9698 3.3335 23.9204 3.72148 25.7403 4.4753C27.5601 5.22912 29.2137 6.33402 30.6066 7.72689C31.9995 9.11977 33.1044 10.7734 33.8582 12.5932C34.612 14.4131 35 16.3637 35 18.3335M35 18.3335V26.6668C35 27.5509 34.6488 28.3987 34.0237 29.0239C33.3986 29.649 32.5507 30.0002 31.6667 30.0002H30C29.1159 30.0002 28.2681 29.649 27.643 29.0239C27.0179 28.3987 26.6667 27.5509 26.6667 26.6668V21.6668C26.6667 20.7828 27.0179 19.9349 27.643 19.3098C28.2681 18.6847 29.1159 18.3335 30 18.3335H35Z"
            stroke="white"
            stroke-width="3.33333"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M35 26.667V30.0003C35 31.7684 34.2976 33.4641 33.0474 34.7144C31.7971 35.9646 30.1014 36.667 28.3333 36.667H20"
            stroke="white"
            stroke-width="3.33333"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>

        <input className="inp" type="checkbox" />
        <section className="menu-container">
          <div className="menu-list bg-[#FFB413] flex flex-row gap-3 items-center justify-end">
            <p>Messenger</p>
            <div>
              <Image src={IMAGES.LOGO} alt="alt" width={30} height={30} />
            </div>
          </div>
          <div className="menu-list bg-[#FFB413] flex flex-row gap-3 items-center justify-end">
            <p>Facebook</p>
            <div>
              <Image src={IMAGES.LOGO} alt="alt" width={30} height={30} />
            </div>
          </div>
          <div className="menu-list bg-[#FFB413] flex flex-row gap-3 items-center justify-end">
            <p>Zalo</p>
            <div>
              <Image src={IMAGES.LOGO} alt="alt" width={30} height={30} />
            </div>
          </div>
        </section>
      </label>
      <div className="w-full bg-black p-2.5 text-center text-white text-sm font-semibold">
        <span>IN ẢNH TRỰC TUYẾN - In ảnh nhanh chóng, tiện lợi</span>
      </div>
      <Header />
      <div className="w-full flex flex-col justify-center items-center text-center py-6 px-5 gap-1">
        <span className="text-md font-semibold">Thông tin thanh toán: </span>

        <span className="text-sm font-light">
          Vui lòng đảm bảo địa chỉ giao hàng và tên thành phố được định dạng
          chính xác trước khi tiến hành thanh toán. Để biết thêm chi tiết, vui
          lòng tham khảo{" "}
          <span className="text-[rgb(var(--primary-rgb))]">Thêm chi tiết</span>{" "}
          hoặc{" "}
          <span className="text-[rgb(var(--primary-rgb))]">
            Liên hệ với chúng tôi
          </span>
          .
        </span>
      </div>

      <div className="container px-5 lg:px-8 pb-10 lg:pb-20 pt-2">
        <BannerSlider />
        <CategoryListSection />
        <ProductSection type="Frame" />
        <div className="relative w-full h-full lg:h-[600px]">
          <Image
            src="https://res.cloudinary.com/farmcode/image/upload/v1737355887/iatt/vw0razvbguqvcumvyfxa.png"
            alt="alt"
            width={1000}
            height={1000}
            className="object-cover w-full lg:h-full rounded-lg"
          />
        </div>
        <ProductSection type="Album" />
        <CategorySpecialSection />
        <div className="relative w-full h-[400px] lg:h-[600px] mt-4 lg:mt-8 rounded-lg">
          <Image
            src="https://res.cloudinary.com/farmcode/image/upload/v1739871597/iatt/gvvwloyp3qjmrcygbxsg.png"
            alt="alt"
            fill
            className="object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-white/40 to-transparent rounded-lg">
            <div className="absolute bottom-[30%] left-0 right-0 p-6 text-white">
              <h3 className="text-2xl font-bold mb-2 text-black">
                IN ẢNH TRỰC TUYẾN
              </h3>
              <p className="text-sm mb-2 text-black w-[50%]">
                Biến khoảnh khắc yêu thích của bạn thành những bức ảnh đẹp lung
                linh! Chỉ cần tải ảnh lên, chọn kích thước, chất liệu và đặt
                hàng trong vài phút.
              </p>
            </div>
          </div>
        </div>
        <ProductSection type="Plastic" />
        <div className="relative w-full grid grid-cols-1 lg:grid-cols-2 gap-4 pb-8">
          <Image
            src="https://res.cloudinary.com/farmcode/image/upload/v1737356705/iatt/ryuyf5j3kg5d02hlm1lc.png"
            alt="alt"
            className=" h-full mb-8 lg:mb-0 lg:h-[400px] object-cover rounded-lg"
            width={1000}
            height={0}
          />
          <Image
            src="https://res.cloudinary.com/farmcode/image/upload/v1737355998/iatt/j8arjpmms7r5w2vlu78w.png"
            alt="alt"
            className=" h-21 lg:h-[400px] object-cover rounded-lg"
            width={1000}
            height={0}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}
