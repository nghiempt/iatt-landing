"use client"

import Header from '@/layout/header';
import Footer from '@/layout/footer';
import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import { ChevronRight, ChevronDown, ChevronLeft } from 'lucide-react';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { DATA } from '@/utils/data';
import { useParams } from 'next/navigation';
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { ROUTES } from '@/utils/route';

interface Products {
  id: number;
  cate: number;
  title: string;
  image: {
    id: number;
    img: string;
    color: string;
    colorLabel: string;
  }[];
  price: string;
  rating: number;
  review: number;
  description: string;
  discount: string;
}

interface Category {
  id: number,
  name: string,
}

const products = DATA.PRODUCTS as Products[]
const categories = DATA.CATEGORIES as Category[]

export default function ProductDetailClient() {

  const { id } = useParams();
  const [selectedColor, setSelectedColor] = useState<number>(1);
  const [currentData, setCurrentData] = useState<Products | null>(null);
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const [thumbnailSwiperInstance, setThumbnailSwiperInstance] = useState<any>(null);
  const [swiperInstance, setSwiperInstance] = useState<any>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (id) {
      const product = products.find((pro) => pro.id.toString() === id);
      setCurrentData(product || null);
    }
  }, [id])

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

  return (
    <div className='w-full'>
      <Header />
      <div id="body" className='w-full p-4 flex flex-col justify-center items-start'>
        <nav className="flex items-center gap-2 text-sm text-gray-600 mb-4">
          <Link href={`${ROUTES.HOME}`} className="hover:text-black">Trang chủ</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href={`${ROUTES.PRODUCT}`} className="hover:text-black">Sản phẩm</Link>
          <ChevronRight className="w-4 h-4" />
          <p className="hover:text-black truncate">{currentData?.title?.slice(0, 14)}...</p>
        </nav>
        <div className="">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Swiper
                onSwiper={handleSwiper}
                onSlideChange={handleSlideChange}
                slidesPerView={1}
                spaceBetween={10}
                navigation={false}
              >
                {currentData?.image?.map((proImg, index) => (
                  <SwiperSlide key={index}>
                    <div className="aspect-square w-full relative bg-gray-50">
                      <Image
                        src={proImg.img || ""}
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
                {activeSlide !== (currentData?.image?.length ?? 0) - 1 && (
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
                  spaceBetween={10}
                  navigation={false}
                  centeredSlides={false}
                  onSlideChange={handleThumbnailSlideChange}
                >
                  {currentData?.image?.map((proImg, index) => (
                    <SwiperSlide key={index}>
                      <div
                        key={index}
                        className={`w-28 h-28 rounded-sm overflow-hidden cursor-pointer relative transition-all duration-300 ${activeSlide === index ? 'border-[#6B3410]  border-4' : 'border-transparent'}`}
                        onClick={() => handleThumbnailClick(index)}
                      >
                        <Image
                          src={proImg.img}
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
            <div className="space-y-6">
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Đặc điểm nổi bật</h2>
                <p>
                  {currentData?.description}
                </p>
              </Card>
            </div>
          </div>
        </div>
        <div className="space-y-6 p-6 bg-[rgb(var(--tertiary-rgb))] mt-4">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg key={star} className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              ))}
              <span className="text-sm text-gray-500">(0 đánh giá)</span>
            </div>
            <Button variant="ghost" size="icon" className="border border-dashed border-primary">
              <Heart className="h-5 w-5" />
            </Button>
          </div>
          <h1 className="text-2xl font-bold text-navy-700">{currentData?.title}</h1>
          <div className="flex flex-col gap-2">
            <div className="flex gap-8">
              <span>Tình trạng: <strong>Còn hàng</strong></span>
              <span>Thương hiệu: <strong>Lullaby</strong></span>
            </div>
            <span>Dòng sản phẩm: <strong>{categories?.find((category) => category.id === currentData?.cate)?.name}</strong></span>
          </div>
          <div className="text-3xl font-bold text-brown-700">{currentData?.price} đ</div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span>Màu sắc:</span>
              <strong>
                {currentData?.image?.find(({ id }) => id === selectedColor)?.colorLabel || "Chọn màu"}
              </strong>
            </div>
            <div className='flex gap-2'>
              {currentData?.image?.map((color, index) => (
                color.color && color.color.trim() !== "" && (
                  <div
                    key={index}
                  >
                    <button
                      onClick={() => {
                        setSelectedColor(color.id);
                        setActiveSlide(index);
                        swiperInstance?.slideTo(index);
                        thumbnailSwiperInstance?.slideTo(index);
                        setTimeout(() => {
                          swiperInstance?.slideTo(index);
                          thumbnailSwiperInstance?.slideTo(index);
                        }, 50);

                        window.scrollTo({
                          top: 0,
                          behavior: "smooth",
                        });
                      }}
                      className={`w-8 h-8 rounded-full ${selectedColor === color.id ? `ring-2 ring-offset-2 ring-orange-800` : ''
                        }`}
                      style={{ backgroundColor: color.color }}
                    >
                    </button>
                  </div>
                )
              ))}
            </div>
          </div>

        </div>
        <div className="p-6 bg-[rgb(var(--tertiary-rgb))] space-y-4">
          <h2 className="text-xl font-bold text-navy-700">Mô tả sản phẩm</h2>
          <div className="space-y-4">
            <p className={`text-gray-500 leading-relaxed ${!isExpanded && 'line-clamp-2'}`}>
              {currentData?.description}
            </p>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 text-brown-700 hover:text-brown-800"
          >
            Xem thêm
            <ChevronDown className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>
      <div className='relative'>
        <div className='fixed -bottom-1 left-0 right-0 h-16 bg-white  shadow-[0px_0px_20px_10px_rgba(0,0,0,0.1)]'>
          <div className='h-full flex justify-center items-center'>
            <div className='bg-[rgb(var(--tertiary-rgb))] px-12 py-2 border-2 rounded-lg'>
              THÊM VÀO GIỎ
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}