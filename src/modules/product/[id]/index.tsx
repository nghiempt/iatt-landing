/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import Header from "@/layout/header";
import Footer from "@/layout/footer";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronRight, ChevronDown, ChevronLeft, Loader } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { ROUTES } from "@/utils/route";
import { ProductService } from "@/services/product";
import { HELPER } from "@/utils/helper";
import { GlobalComponent } from "@/components/global";

export default function ProductDetailClient() {
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const [data, setData] = useState<any | null>([] as any);
  const [currentData, setCurrentData] = useState<any | null>(null);
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const [thumbnailSwiperInstance, setThumbnailSwiperInstance] =
    useState<any>(null);
  const [swiperInstance, setSwiperInstance] = useState<any>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const init = async () => {
    setIsLoading(true);
    const res = await ProductService.getAll();
    if (res && res.data.length > 0) {
      setData(res?.data);
      const product = res.data?.find(
        (pro: any) => HELPER.getLastFourChars(pro._id).toString() === id
      );
      setCurrentData(product || null);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    init();
  }, []);

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
  const description = currentData?.description || "";

  const getPartialContent = (content: string) => {
    const words = content.split(" ");
    return words.slice(0, Math.ceil(words.length / 6)).join(" ") + "...";
  };

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <Header />
      {isLoading ? (
        <div className="col-span-2 text-center w-full flex justify-center items-center py-40">
          <Loader className="animate-spin" size={32} />
        </div>
      ) : (
        <>
          <div className="w-full md:w-3/4 lg:w-3/4 lg:mt-4">
            <div className="w-full px-4 py-4 lg:px-0 flex flex-col justify-center items-start">
              <nav className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                <Link
                  href={`${ROUTES.HOME}`}
                  className="hover:text-black text-md"
                >
                  Trang chủ
                </Link>
                <ChevronRight className="w-4 h-4" />
                <Link
                  href={`${ROUTES.PRODUCT}`}
                  className="hover:text-black text-md"
                >
                  Sản phẩm
                </Link>
                <ChevronRight className="w-4 h-4" />
                <p className="hover:text-black truncate">
                  {currentData?.name?.slice(0, 14)}...
                </p>
              </nav>
              <div className="lg:mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <Swiper
                      onSwiper={handleSwiper}
                      onSlideChange={handleSlideChange}
                      slidesPerView={1}
                      spaceBetween={10}
                      navigation={false}
                    >
                      <Image
                        src={currentData?.thumbnail}
                        alt="Product Image"
                        className="object-cover rounded-sm"
                        fill
                        priority
                      />
                      {currentData?.images?.map((proImg: any, index: any) => (
                        <SwiperSlide key={index}>
                          <div className="aspect-square w-full relative bg-gray-50">
                            <Image
                              src={proImg}
                              alt="Product Image"
                              className="object-cover rounded-sm"
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
                                className="object-cover"
                                layout="fill"
                              />
                            </div>
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </div>
                  </div>
                  <div className="">
                    <div className="flex flex-col w-full space-y-4 rounded-md p-6 bg-[rgb(var(--tertiary-rgb))]">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <svg
                              key={star}
                              className="w-5 h-5 text-yellow-500"
                              fill="#FFFF00FF"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                              />
                            </svg>
                          ))}
                          <span className="text-sm text-gray-500">
                            ({currentData?.sold} đã bán)
                          </span>
                        </div>
                      </div>
                      <h1 className="text-2xl font-bold text-navy-700">
                        {currentData?.name}
                      </h1>
                      <div className="flex flex-col gap-2">
                        <span>
                          Dòng sản phẩm:{" "}
                          <strong>
                            {HELPER.renderCategory2(currentData?.category)}
                          </strong>
                        </span>
                      </div>
                      <div className="text-3xl font-bold text-brown-700">
                        {HELPER.formatVND(currentData?.price)}
                      </div>
                      <button
                        onClick={() => {
                          window.location.href = `/tai-khoan?tab=order-single&product=${currentData?._id}`;
                        }}
                        className="w-full bg-orange-700 rounded-md text-white text-md py-4"
                      >
                        TẠO ĐƠN HÀNG NGAY
                      </button>
                    </div>
                    <div className="hideen lg:flex flex-col w-full rounded-md lg:px-6 py-6 space-y-4">
                      <h2 className="text-2xl font-bold text-navy-700">
                        MÔ TẢ SẢN PHẨM
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
                          <button
                            className="text-gray-500 cursor-pointer font-semibold"
                            onClick={() => setExpanded(!expanded)}
                          >
                            {expanded ? "Thu gọn" : "Xem thêm"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-3/4 rounded-md lg:py-6 space-y-4 px-4 lg:px-0">
            <h2 className="text-2xl font-bold text-navy-700">
              GIỚI THIỆU SẢN PHẨM
            </h2>
            <div className="space-y-4">
              <div className={`text-gray-500 leading-relaxed`}>
                <div
                  dangerouslySetInnerHTML={{
                    __html: currentData?.introduction,
                  }}
                />
              </div>
            </div>
          </div>
          <div className="w-full px-4 lg:px-0 lg:w-3/4 flex flex-col justify-center items-start mt-5 lg:mt-0 mb-12">
            <h2 className="text-2xl font-bold text-black mb-4">
              SẢN PHẨM LIÊN QUAN
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
                      <GlobalComponent.ProductCardSmall
                        image={product?.thumbnail}
                        title={product?.name}
                        price={product?.price}
                        hot={true}
                        sold={product?.sold}
                      />
                    </Link>
                  </div>
                ))}
            </div>
          </div>
        </>
      )}
      <Footer />
    </div>
  );
}
