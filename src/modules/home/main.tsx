/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { IMAGES } from '@/utils/image';
import { Users2 } from 'lucide-react';
import { DATA } from '@/utils/data';
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from 'next/link';
import { ROUTES } from '@/utils/route';
import { ProductService } from '@/services/product';
import { BlogService } from '@/services/blog';
import { GlobalComponent } from '@/components/global';

export default function HomeContent() {

  const reviews = DATA.REVIEWS as any
  const [products, setProducts] = useState([] as any)
  const [filteredData, setFilteredData] = useState([] as any)
  const [blogs, setBlogs] = useState([] as any)
  const [selectedCategory, setSelectedCategory] = useState<string>('plastic');
  const [swiperInstance, setSwiperInstance] = useState<any>(null);

  const handleSwiper = (swiper: any) => {
    setSwiperInstance(swiper);
  };

  const renderProduct = async () => {
    const res = await ProductService.getAll()
    if (res && res.data.length > 0) {
      setProducts(res.data)
      setFilteredData(res.data.filter((item: any) => item.category === selectedCategory))
    }
  }

  const renderBlog = async () => {
    const res = await BlogService.getAll()
    if (res && res.data.length > 0) {
      setBlogs(res.data)
    }
  }

  const init = async () => {
    renderProduct()
    renderBlog()
  }

  useEffect(() => {
    init()
  }, [])

  return (
    <main id="body" className="space-y-6">
      <Card className="relative overflow-hidden rounded-none shadow-none">
        <Image
          src={IMAGES.SUB_BANNER}
          alt="logo"
          className="w-full lg:h-[480px] lg:rounded-md object-cover"
          width={1920}
          height={0}
          priority
        />
      </Card>
      <div className="mt-4 text-center px-4 lg:py-8">
        <h3 className="text-lg lg:text-2xl font-bold text-navy-blue mb-4 lg:mb-8">DANH MỤC SẢN PHẨM</h3>
        <div className="flex justify-center space-x-4">
          <Link href={`${ROUTES.PRODUCT}`}>
            <GlobalComponent.CategoryCard
              title="Ép Plastic"
              icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-hard-drive"><line x1="22" x2="2" y1="12" y2="12" /><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" /><line x1="6" x2="6.01" y1="16" y2="16" /><line x1="10" x2="10.01" y1="16" y2="16" /></svg>}
            />
          </Link>
          <Link href={`${ROUTES.PRODUCT}`}>
            <GlobalComponent.CategoryCard
              title="Khung ảnh"
              icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-frame"><line x1="22" x2="2" y1="6" y2="6" /><line x1="22" x2="2" y1="18" y2="18" /><line x1="6" x2="6" y1="2" y2="22" /><line x1="18" x2="18" y1="2" y2="22" /></svg>}
            />
          </Link>
          <Link href={`${ROUTES.PRODUCT}`}>
            <GlobalComponent.CategoryCard
              title="Album"
              icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-images"><path d="M18 22H4a2 2 0 0 1-2-2V6" /><path d="m22 13-1.296-1.296a2.41 2.41 0 0 0-3.408 0L11 18" /><circle cx="12" cy="8" r="2" /><rect width="16" height="16" x="6" y="2" rx="2" /></svg>}
            />
          </Link>
        </div>
      </div>
      <div className="p-4 md:p-0 lg:p-0 space-y-8">
        <div className='w-full grid grid-cols-1 lg:grid-cols-2 gap-4'>
          <div className="rounded-lg overflow-hidden border border-dashed border-[rgb(var(--primary-rgb))] p-4">
            <Image
              src={IMAGES.SUB_BANNER}
              alt="alt"
              className="w-full h-48 object-cover rounded-lg"
              width={200}
              height={200}
              priority
            />
            <div className="text-center mt-4">
              <p className="text-gray-600">Khuyến mãi cho người mới</p>
              <h2 className="text-xl font-semibold text-black">Thiết kế gia công sản phẩm</h2>
              <Button
                className="w-full md:w/1-3 lg:w-1/4 bg-[rgb(var(--primary-rgb))] hover:bg-[#6B3410] text-white px-8 mt-4"
              >
                Liên hệ ngay
              </Button>
            </div>
          </div>
          <div className="hidden lg:flex flex-col rounded-lg overflow-hidden border border-dashed border-[rgb(var(--primary-rgb))] p-4">
            <Image
              src={IMAGES.SUB_BANNER}
              alt="alt"
              className="w-full h-48 object-cover rounded-lg"
              width={200}
              height={200}
              priority
            />
            <div className="text-center mt-4">
              <p className="text-gray-600">Khuyến mãi cho người mới</p>
              <h2 className="text-xl font-semibold text-black">Thiết kế gia công sản phẩm</h2>
              <Button
                className="w-full md:w/1-3 lg:w-1/4 bg-[rgb(var(--primary-rgb))] hover:bg-[#6B3410] text-white px-8 mt-4"
              >
                Liên hệ ngay
              </Button>
            </div>
          </div>
        </div>
        <div className='lg:py-6'>
          <h2 className="text-lg lg:text-2xl font-bold text-black mb-4 lg:mb-8">SẢN PHẨM NỔI BẬT</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
            {products?.slice(0, 6)?.map((product: any, index: any) => (
              <div key={index}>
                <Link href={`${ROUTES.PRODUCT}/${product?._id}`}>
                  <GlobalComponent.ProductCard
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
      </div>
      <div className="md:hidden lg:hidden flex flex-col p-4 md:p-0 lg:p-0 space-y-4 pt-0">
        <div className="text-center space-y-2">
          <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-navy-900">TOP BÁN CHẠY</h2>
        </div>
        <div className="flex flex-col bg-[rgb(var(--quaternary-rgb))] rounded-lg p-4 space-y-3">
          {[
            { label: "ẢNH PLASTIC", cate: 'plastic' },
            { label: "KHUNG ẢNH", cate: 'frame' },
            { label: "ALBUM", cate: 'album' },
          ].map(({ label, cate }) => (
            selectedCategory === cate ? (
              <div key={cate} className="bg-[rgb(var(--primary-rgb))] text-white py-3 px-4 rounded-lg flex items-center">
                <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
                <span className='text-sm font-bold'>{label}</span>
              </div>
            ) : (
              <button
                key={cate}
                onClick={() => setSelectedCategory(cate)}
                className="text-black font-medium w-full text-left py-2"
              >
                <span className='text-sm font-bold'>{label}</span>
              </button>
            )
          ))}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredData?.slice(0, 4)?.map((product: any, index: any) => (
            <div key={index}>
              <Link href={`${ROUTES.PRODUCT}/${product?._id}`}>
                <GlobalComponent.ProductCard
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
      <div className="p-4 md:p-0 lg:p-0 space-y-10 pt-0">
        <div className="space-y-4 lg:px-40">
          <h2 className="text-2xl font-bold text-center text-navy-900">
            KHÁCH HÀNG NÓI GÌ?
          </h2>
          <Swiper
            onSwiper={handleSwiper}
            slidesPerView={1}
            spaceBetween={10}
            navigation={false}
            autoplay={{ delay: 5000 }}
            speed={800}
          >
            {reviews?.map((review: any, index: any) => (
              <SwiperSlide key={index}>
                <Card className="border-2 border-dashed border-gray-300 py-6 px-8 relative">
                  <div className="flex justify-center mb-4">
                    <div className="bg-[rgb(var(--quaternary-rgb))] p-4 rounded-full">
                      <Users2 className="w-8 h-8 text-black" />
                    </div>
                  </div>
                  <p className="text-center text-gray-700 text-lg mb-4">
                    {review?.review}
                  </p>
                  <div className="text-center">
                    <h3 className="font-bold text-lg text-black">{review?.name}</h3>
                    <p className="text-gray-500">{review?.role}</p>
                  </div>
                </Card>
              </SwiperSlide>
            ))}
            <button
              onClick={() => swiperInstance?.slidePrev()}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => swiperInstance?.slideNext()}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10">
              <ChevronRight className="w-6 h-6" />
            </button>
          </Swiper>
        </div>
        <div className="space-y-4 lg:py-10">
          <h2 className="text-2xl font-bold text-navy-900 text-center">
            XU HƯỚNG HIỆN ĐẠI
          </h2>
          <div className="relative flex md:hidden lg:hidden">
            <Image
              src={IMAGES.BANNER}
              alt="alt"
              className="w-full rounded-lg"
              width={200}
              height={0}
              priority
            />
          </div>
          <div className="space-y-4 lg:text-center lg:px-20">
            <p className="text-gray-700 leading-relaxed">
              Mặc dù mùa xuân và mùa hè thường gắn liền với thời tiết ấm hơn, nhưng không phải lúc nào mọi chuyện cũng bắt đầu như vậy. Các nhà thiết kế đã trang bị cho bạn những chiếc áo khoác ngoài sang trọng để tăng thêm phong cách cho phong cách của bạn trong giai đoạn chuyển tiếp từ nhiệt độ lạnh hơn sang những buổi chiều ấm áp và đầy nắng. Ngay cả khi thời tiết ấm áp hơn vào mùa xuân tới, hãy thêm một chiếc áo blazer oversized kiểu dáng đẹp vào diện mạo nếu bạn muốn tạo điểm nhấn táo bạo cho phong cách của mình.
            </p>
          </div>
        </div>
      </div>
      <div className="p-4 md:p-0 lg:p-0 space-y-4">
        <h2 className="text-2xl font-bold text-center text-navy-900">TIN TỨC</h2>
        <div className="space-y-2 lg:hidden flex flex-col">
          {blogs?.slice(0, 3)?.map((blog: any, index: any) => (
            <div key={index}>
              <Link href={`${ROUTES.BLOG}/${blog._id}`}>
                <GlobalComponent.BlogCard
                  id={blog?._id}
                  image={blog?.thumbnail}
                  title={blog?.title}
                  excerpt={blog?.excerpt}
                  date={blog?.date}
                  author={blog?.author}
                  isMain={index === 0}
                />
              </Link>
            </div>
          ))}
        </div>
        <div className="hidden lg:grid grid-cols-1 lg:grid-cols-3 gap-6">
          {
            blogs?.map((blog: any, index: any) => (
              <GlobalComponent.BlogCard
                key={index}
                id={blog?._id}
                image={blog?.thumbnail}
                title={blog?.title}
                excerpt={blog?.excerpt}
                date={blog?.date}
                author={blog?.author}
                isMain={true}
              />
            ))
          }
        </div>
      </div>
    </main>
  );
}