/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import Header from "@/layout/header";
import Footer from "@/layout/footer";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  ChevronRight,
  ChevronDown,
  ChevronLeft,
  Loader,
  ChevronUp,
  Minus,
  Plus,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { ROUTES } from "@/utils/route";
import { ProductService } from "@/services/product";
import { HELPER } from "@/utils/helper";
import { GlobalComponent } from "@/components/global";
import { IMAGES } from "@/utils/image";
import "../../../styles/helper.css";

export default function ProductDetailClient() {
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const [data, setData] = useState<any | null>([] as any);
  const [currentData, setCurrentData] = useState<any | null>(null);
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const [thumbnailSwiperInstance, setThumbnailSwiperInstance] =
    useState<any>(null);
  const [swiperInstance, setSwiperInstance] = useState<any>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [quantity, setQuantity] = useState(1);

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

  interface Review {
    id: number;
    rating: number;
    author: string;
    date: string;
    content: string;
    avatar: string;
  }

  const reviews: Review[] = [
    {
      id: 1,
      rating: 5,
      author: "Ngọc Quí",
      date: "03/03/2023",
      content:
        "Tôi rất hài lòng về sản phẩm và dịch vụ của bạn. Hy vọng chúng ta có nhiều cơ hội làm việc với nhau hơn. Sản phẩm tốt ngoài mong đợi, giá cả hợp lý lại giao hàng nhanh.",
      avatar:
        "data:image/jpeg;base64,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",
    },
    {
      id: 2,
      rating: 4,
      author: "Ngọc Mai",
      date: "02/03/2023",
      content:
        "Tôi rất hài lòng về sản phẩm và dịch vụ của bạn. Hy vọng chúng ta có nhiều cơ hội làm việc với nhau hơn. Sản phẩm tốt ngoài mong đợi, giá cả hợp lý lại giao hàng nhanh.",
      avatar:
        "data:image/jpeg;base64,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",
    },
    {
      id: 3,
      rating: 4,
      author: "Ngọc Mai",
      date: "01/03/2023",
      content:
        "Tôi rất hài lòng về sản phẩm và dịch vụ của bạn. Hy vọng chúng ta có nhiều cơ hội làm việc với nhau hơn. Sản phẩm tốt ngoài mong đợi, giá cả hợp lý lại giao hàng nhanh.",
      avatar:
        "data:image/jpeg;base64,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",
    },
    {
      id: 4,
      rating: 5,
      author: "Ngọc Mai",
      date: "01/03/2023",
      content:
        "Tôi rất hài lòng về sản phẩm và dịch vụ của bạn. Hy vọng chúng ta có nhiều cơ hội làm việc với nhau hơn. Sản phẩm tốt ngoài mong đợi, giá cả hợp lý lại giao hàng nhanh.",
      avatar:
        "data:image/jpeg;base64,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",
    },
  ];

  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, index) => (
        <span
          key={index}
          className={`text-base ${
            index < rating ? "text-yellow-400" : "text-gray-300"
          }`}
        >
          ★
        </span>
      ));
  };

  const init = async () => {
    const res = await ProductService.getAll();
    if (res && res.data.length > 0) {
      setData(res?.data);
      const product = res.data?.find(
        (pro: Product) => HELPER.getLastFourChars(pro._id).toString() === id
      );
      setCurrentData(product || null);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    init();
  }, []);

  const handleQuantityChange = (type: "increase" | "decrease") => {
    if (type === "increase") {
      setQuantity((prev) => prev + 1);
    } else if (type === "decrease" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleSwiper = (swiper: any) => {
    setSwiperInstance(swiper);
  };

  const handleSlideChange = (swiper: any) => {
    setActiveSlide(swiper.activeIndex);
    thumbnailSwiperInstance?.slideTo(swiper.activeIndex);
  };

  const handleThumbnailClick = (index: number) => {
    setActiveSlide(index);
    swiperInstance?.slideTo(index);
  };

  const handleThumbnailSlideChange = (swiper: any) => {
    const firstVisibleIndex = swiper.realIndex;
    setActiveSlide(firstVisibleIndex);
    swiperInstance?.slideTo(firstVisibleIndex);
  };

  const [expanded, setExpanded] = useState(false);
  const [expanded1, setExpanded1] = useState(false);
  const [expanded2, setExpanded2] = useState(false);
  const description = currentData?.description || "";
  const introduction = currentData?.introduction || "";

  const getPartialContent = (content: string) => {
    const words = content.split(" ");
    return words.slice(0, Math.ceil(words.length / 6)).join(" ") + "...";
  };

  const getPartialContent1 = (content: string) => {
    const words = content.split(" ");
    return words.slice(0, Math.ceil(words.length / 3)).join(" ") + "...";
  };

  return (
    <div className="w-full flex flex-col justify-center items-center">
      {/* HELPER */}
      <label className="main top-[92%] lg:top-[60%] z-50">
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
          <Link
            href="#"
            target="_blank"
            className="menu-list bg-[#FFB413] flex flex-row gap-3 items-center justify-end w-2/3 -right-[46px]"
          >
            <p>Zalo</p>
            <div>
              <Image src={IMAGES.ZALO} alt="alt" width={25} height={25} />
            </div>
          </Link>
          <Link
            href="#"
            target="_blank"
            className="menu-list bg-[#FFB413] flex flex-row gap-3 items-center justify-end rounded-full"
          >
            <p>Messenger</p>
            <div>
              <Image src={IMAGES.MESSENGER} alt="alt" width={30} height={30} />
            </div>
          </Link>
          <Link
            href="#"
            target="_blank"
            className="menu-list bg-[#FFB413] flex flex-row gap-3 items-center justify-end w-[95%] -right-[7px]"
          >
            <p>Facebook</p>
            <div>
              <Image src={IMAGES.FACEBOOK} alt="alt" width={25} height={25} />
            </div>
          </Link>
        </section>
      </label>
      <div className="flex flex-col justify-center items-center w-full bg-[#F0F0F0] py-1 text-center text-[#A98F57] text-sm font-semibold">
        <span className="text-md font-light">Các phong cách</span>
        <span className="text-lg font-semibold">
          THIẾT KẾ ALBUM CƯỚI HOT NHẤT
        </span>
      </div>
      <Header />
      <div className="container px-5 lg:px-8 pb-5 lg:pb-16 pt-2">
        {isLoading ? (
          <div className="col-span-2 text-center w-full flex justify-center items-center py-40">
            <Loader className="animate-spin" size={32} />
          </div>
        ) : (
          <>
            <div className="w-full pt-3 pb-4 px-0 flex flex-col justify-center items-start">
              <nav className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                <Link
                  href={`${ROUTES.HOME}`}
                  className="hover:text-[rgb(var(--primary-rgb))] text-md"
                >
                  Trang chủ
                </Link>
                <ChevronRight className="w-4 h-4" />
                <Link
                  href={`${ROUTES.PRODUCT}`}
                  className="hover:text-[rgb(var(--primary-rgb))] text-md"
                >
                  Sản phẩm
                </Link>
                <ChevronRight className="w-4 h-4" />
                <p className="hover:text-[rgb(var(--primary-rgb))] text-md truncate">
                  {currentData?.name?.slice(0, 14)}...
                </p>
              </nav>
              <div className="mt-3 lg:mt-3">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                  <div className="relative col-span-6">
                    <Swiper
                      onSwiper={handleSwiper}
                      onSlideChange={handleSlideChange}
                      slidesPerView={1}
                      spaceBetween={10}
                      navigation={false}
                    >
                      {currentData?.images?.map((proImg: any, index: any) => (
                        <SwiperSlide key={index}>
                          <div className="aspect-square w-full relative bg-gray-50">
                            <Image
                              src={proImg}
                              alt="Product Image"
                              className="object-cover rounded-sm border border-gray-200"
                              fill
                              priority
                            />
                          </div>
                        </SwiperSlide>
                      ))}
                      {activeSlide !== 0 && (
                        <button
                          onClick={() => swiperInstance?.slidePrev()}
                          className="absolute left-4 top-1/2 -translate-y-1/2 z-10"
                        >
                          <ChevronLeft className="w-6 h-6" />
                        </button>
                      )}
                      {activeSlide !==
                        (currentData?.images?.length ?? 0) - 1 && (
                        <button
                          onClick={() => swiperInstance?.slideNext()}
                          className="absolute right-4 top-1/2 -translate-y-1/2 z-10"
                        >
                          <ChevronRight className="w-6 h-6" />
                        </button>
                      )}
                    </Swiper>
                    <div className="mt-4">
                      <Swiper
                        onSwiper={setThumbnailSwiperInstance}
                        slidesPerView={3}
                        spaceBetween={16}
                        navigation={false}
                        centeredSlides={false}
                        onSlideChange={handleThumbnailSlideChange}
                      >
                        {currentData?.images?.map((proImg: any, index: any) => (
                          <SwiperSlide key={index}>
                            <div
                              key={index}
                              className={`w-full h-28 rounded-sm overflow-hidden cursor-pointer relative transition-all duration-300 ${
                                activeSlide === index
                                  ? "border-[#6B3410]  border-2"
                                  : "border-transparent"
                              }`}
                              onClick={() => handleThumbnailClick(index)}
                            >
                              <Image
                                src={proImg}
                                alt={`variant ${index + 1}`}
                                className="object-cover border border-gray-200"
                                layout="fill"
                              />
                            </div>
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </div>
                  </div>
                  <div className="col-span-6 lg:ml-8">
                    <div className="flex flex-col w-full space-y-4 rounded-md ">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-1 bg-red-500 text-white text-xs lg:text-base px-2 py-1">
                          Miễn phí Vận Chuyển
                        </div>
                      </div>
                      <h1 className="text-2xl font-bold text-navy-700">
                        {currentData?.name}
                      </h1>
                      <div className="flex justify-start items-center gap-4">
                        <div className="text-2xl lg:text-3xl font-medium text-brown-700">
                          {HELPER.formatVND(currentData?.price)}
                        </div>
                        <div className="text-md lg:text-xl font-normal line-through text-brown-700">
                          {HELPER.formatVND(HELPER.upPrice(currentData?.price))}
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="w-1/4 lg:w-2/12">Số lượng</span>
                        <div className="flex rounded-sm">
                          <button
                            className="px-2 py-1 border border-gray-400 items-center"
                            onClick={() => handleQuantityChange("decrease")}
                          >
                            <Minus size={17} />
                          </button>
                          <div className="w-1/4 pl-0 lg:pl-3 text-center border-y border-gray-400">
                            <input
                              type="number"
                              className="w-full text-center"
                              value={quantity}
                              readOnly
                            />
                          </div>
                          <button
                            className="px-2 py-1 border border-gray-400 items-center"
                            onClick={() => handleQuantityChange("increase")}
                          >
                            <Plus size={17} />
                          </button>
                        </div>
                      </div>

                      <div className="flex space-x-2 lg:space-x-4">
                        <button className="text-sm lg:text-base px-1 lg:px-6 py-2 w-52 lg:w-60 border-2 border-[rgb(var(--primary-rgb))] text-[rgb(var(--primary-rgb))] hover:bg-orange-50">
                          Thêm Vào Giỏ Hàng
                        </button>
                        <button
                          onClick={() => {
                            window.location.href = `/tai-khoan?tab=order-single&product=${currentData?._id}`;
                          }}
                          className="text-sm lg:text-base px-1 lg:px-6 py-2 w-52 lg:w-60 bg-[rgb(var(--primary-rgb))] text-white hover:bg-[rgb(var(--primary-rgb))]"
                        >
                          Mua Ngay
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col w-full lg:pr-6 lg:pl-0 pt-7 pb-1 space-y-4">
                      <h2 className="text-xl lg:text-2xl font-bold text-navy-700">
                        CHI TIẾT SẢN PHẨM
                      </h2>
                      <div className="space-y-4">
                        <div className="text-gray-500 leading-relaxed overflow-hidden">
                          <div
                            dangerouslySetInnerHTML={{
                              __html: expanded
                                ? description
                                : getPartialContent(description),
                            }}
                          />
                        </div>
                        <div className="flex justify-center relative">
                          {!expanded && (
                            <div className="absolute bottom-[135%] left-0 right-0 h-20 bg-gradient-to-t from-gray-50 to-transparent pointer-events-none" />
                          )}
                          <button
                            className="text-black cursor-pointer font-semibold px-4 py-2 lg:py-4 lg:px-8 border border-gray-300 flex items-center gap-4 rounded-md"
                            onClick={() => setExpanded(!expanded)}
                          >
                            {expanded ? (
                              <>
                                <p className="text-[12px] lg:text-base">
                                  Thu gọn
                                </p>{" "}
                                <ChevronUp size={16} />
                              </>
                            ) : (
                              <>
                                <p className="text-[12px] lg:text-base">
                                  Xem thêm
                                </p>{" "}
                                <ChevronDown size={16} />
                              </>
                            )}
                          </button>
                        </div>
                        <div className="pt-4 mt-4 border-t border-gray-200">
                          <p>
                            <span className="font-medium">Mã:</span>{" "}
                            {HELPER.getLastFourChars(currentData?._id)}
                          </p>
                          <p>
                            <span className="font-medium">Danh mục:</span>{" "}
                            {HELPER.renderCategory2(currentData?.category)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="pt-4 pb-7 lg:pb-14 lg:pt-14 grid grid-cols-1 lg:grid-cols-12 gap-4">
              <div className="hidden lg:flex flex-col w-full col-span-6">
                <div className="flex items-center gap-2 mb-4">
                  <h2 className="text-xl font-bold">Đánh giá</h2>
                  <span className="text-gray-500">(4)</span>
                </div>
                <div className="max-h-[500px] space-y-2 overflow-y-auto scroll-bar-style scrollbar-thumb-gray-100 scrollbar-track-gray-100">
                  {reviews.map((review) => (
                    <div key={review.id} className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Image
                          src={review.avatar}
                          alt="Avatar"
                          width={1000}
                          height={1000}
                          className="rounded-full w-9 h-9"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            {renderStars(review.rating)}
                          </div>
                          <div className="text-[12.5px] text-gray-600">
                            <span>{review.author}</span>
                            <span> , </span>
                            <span>{review.date}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-700 text-justify">
                        {review.content}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-span-12 lg:col-span-6 lg:pl-9 space-y-4">
                <h2 className="text-xl lg:text-2xl font-bold text-navy-700">
                  MÔ TẢ SẢN PHẨM
                </h2>
                <div className="space-y-4">
                  <div className="text-gray-500 leading-relaxed overflow-hidden">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: expanded1
                          ? introduction
                          : getPartialContent1(introduction),
                      }}
                    />
                  </div>
                  <div className="flex justify-center relative">
                    {!expanded1 && (
                      <div className="absolute bottom-[135%] left-0 right-0 h-20 bg-gradient-to-t from-gray-50 to-transparent pointer-events-none" />
                    )}
                    <button
                      className="text-black cursor-pointer font-semibold px-4 py-2 lg:py-4 lg:px-8 border border-gray-300 flex items-center gap-4 rounded-md"
                      onClick={() => setExpanded1(!expanded1)}
                    >
                      {expanded1 ? (
                        <>
                          <p className="text-[12px] lg:text-base">Thu gọn</p>{" "}
                          <ChevronUp size={16} />
                        </>
                      ) : (
                        <>
                          <p className="text-[12px] lg:text-base">Xem thêm</p>{" "}
                          <ChevronDown size={16} />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex flex-col lg:hidden col-span-12 mt-5">
                <div className="flex items-center gap-2 mb-4">
                  <h2 className="text-xl font-bold">Đánh giá</h2>
                  <span className="text-gray-500">(4)</span>
                </div>
                <div>
                  <div
                    className={`space-y-2 overflow-hidden transition-all duration-300 ease-in-out ${
                      expanded2 ? "max-h-[1000px]" : "max-h-[300px]"
                    }`}
                  >
                    {reviews.map((review) => (
                      <div
                        key={review.id}
                        className="bg-gray-50 p-4 rounded-lg"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <Image
                            src={review.avatar}
                            alt="Avatar"
                            width={1000}
                            height={1000}
                            className="rounded-full w-9 h-9"
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              {renderStars(review.rating)}
                            </div>
                            <div className="text-[12.5px] text-gray-600">
                              <span>{review.author}</span>
                              <span> , </span>
                              <span>{review.date}</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-700 text-justify">
                          {review.content}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-center relative mt-5">
                    {!expanded2 && (
                      <div className="absolute bottom-[140%] left-0 right-0 h-20 bg-gradient-to-t from-gray-50 to-transparent pointer-events-none" />
                    )}
                    <button
                      className="text-black cursor-pointer font-base px-4 py-2 lg:py-4 lg:px-8 flex items-center gap-4"
                      onClick={() => setExpanded2(!expanded2)}
                    >
                      {expanded2 ? (
                        <>
                          <p className="text-[12px] lg:text-base">Thu gọn</p>{" "}
                          <ChevronUp size={16} />
                        </>
                      ) : (
                        <>
                          <p className="text-[12px] lg:text-base">Xem thêm</p>{" "}
                          <ChevronDown size={16} />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-black mb-4 mt-2">
              Bạn cũng có thể thích
            </h2>
            <div className="w-full grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
              {data
                ?.filter(
                  (product: any) => HELPER.getLastFourChars(product?._id) !== id
                )
                ?.slice(0, 4)
                ?.map((product: any, index: any) => (
                  <div key={index}>
                    <Link
                      href={`${ROUTES.PRODUCT}/${HELPER.getLastFourChars(
                        product?._id
                      )}?sp=${HELPER.convertSpacesToDash(product?.name)}`}
                    >
                      <GlobalComponent.ProductCardMobile
                        image={product?.thumbnail}
                        title={product?.name}
                        price={product?.price}
                        sold={product?.sold}
                      />
                    </Link>
                  </div>
                ))}
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}
