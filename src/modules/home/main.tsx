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
import BannerSlider from './slider';

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
      <div className="mt-4 text-center px-4 lg:py-8">
        <h3 className="text-lg lg:text-2xl font-bold text-navy-blue mb-4 lg:mb-8">DANH MỤC SẢN PHẨM</h3>
        <div className="flex justify-center space-x-4">
          <Link href={`${ROUTES.PRODUCT}`}>
            <GlobalComponent.CategoryCard
              title="Ép Ảnh Plastic"
              icon={
                <Image
                  src="https://cdn-icons-png.flaticon.com/128/9089/9089872.png"
                  alt="alt"
                  className="w-20 object-cover"
                  width={1000}
                  height={0}
                />
              }
            />
          </Link>
          <Link href={`${ROUTES.PRODUCT}`}>
            <GlobalComponent.CategoryCard
              title="Khung Ảnh Viền"
              icon={
                <Image
                  src="https://cdn-icons-png.flaticon.com/128/1438/1438744.png"
                  alt="alt"
                  className="w-20 object-cover"
                  width={1000}
                  height={0}
                />
              }
            />
          </Link>
          <Link href={`${ROUTES.PRODUCT}`}>
            <GlobalComponent.CategoryCard
              title="Photobook"
              icon={
                <Image
                  src="https://cdn-icons-png.flaticon.com/128/1358/1358994.png"
                  alt="alt"
                  className="w-20 object-cover"
                  width={1000}
                  height={0}
                />
              }
            />
          </Link>
        </div>
      </div>
      <div className="p-4 md:p-0 lg:p-0 space-y-8">
        <div className='w-full grid grid-cols-1 lg:grid-cols-2 gap-4'>
          <div className="rounded-lg overflow-hidden border border-dashed border-[rgb(var(--primary-rgb))] p-4">
            <Image
              src="https://res.cloudinary.com/farmcode/image/upload/v1737355998/iatt/j8arjpmms7r5w2vlu78w.png"
              alt="alt"
              className="w-full h-48 lg:h-80 object-cover rounded-lg"
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
              className="w-full h-48 lg:h-80 object-cover rounded-lg"
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
      <div className="p-4 md:p-0 lg:p-0 space-y-10 pt-0">
        <div className="block lg:hidden space-y-4 lg:px-40">
          <h2 className="text-2xl lg:text-4xl lg:mb-10 font-bold text-center text-navy-900">
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
        <div className="w-full lg:block hidden space-y-4">
          <h2 className="text-2xl lg:text-4xl lg:mb-10 font-bold text-center text-navy-900">
            KHÁCH HÀNG NÓI GÌ?
          </h2>
          <div className='w-full flex gap-4'>
          {reviews?.map((review: any, index: any) => (
            <Card key={index} className="border-2 border-dashed border-gray-300 py-6 px-8 relative">
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
          ))}
          </div>
        </div>
        <div className="flex lg:hidden flex-col space-y-4 lg:py-10">
          <h2 className="text-2xl lg:text-4xl lg:mb-10 font-bold text-navy-900 text-center">
            XU HƯỚNG HIỆN ĐẠI
          </h2>
          <div className="relative flex md:hidden lg:hidden">
            <Image
              src="https://res.cloudinary.com/farmcode/image/upload/v1737356089/iatt/zuycr0ucepn49ro0qwyz.png"
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
        <div className="space-y-4 lg:py-4 hidden lg:flex justify-between items-start gap-10">
          <div className='w-2/3 flex flex-col justify-center items-start'>
            <h2 className="text-2xl lg:text-4xl lg:mb-10 font-bold text-navy-900">
              XU HƯỚNG HIỆN ĐẠI
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Mặc dù mùa xuân và mùa hè thường gắn liền với thời tiết ấm hơn, nhưng không phải lúc nào mọi chuyện cũng bắt đầu như vậy. Các nhà thiết kế đã trang bị cho bạn những chiếc áo khoác ngoài sang trọng để tăng thêm phong cách cho phong cách của bạn trong giai đoạn chuyển tiếp từ nhiệt độ lạnh hơn sang những buổi chiều ấm áp và đầy nắng. Ngay cả khi thời tiết ấm áp hơn vào mùa xuân tới, hãy thêm một chiếc áo blazer oversized kiểu dáng đẹp vào diện mạo nếu bạn muốn tạo điểm nhấn táo bạo cho phong cách của mình.
            </p>
          </div>
          <Image
            src="https://res.cloudinary.com/farmcode/image/upload/v1737611123/iatt/lnxejwbnytyqo23xfvi9.png"
            alt="alt"
            className="w-1/3 rounded-lg"
            width={200}
            height={0}
            priority
          />
        </div>
        <div className="space-y-4 lg:py-4 hidden lg:flex justify-between items-end gap-10">
          <Image
            src="https://res.cloudinary.com/farmcode/image/upload/v1737611123/iatt/lnxejwbnytyqo23xfvi9.png"
            alt="alt"
            className="w-1/3 rounded-lg"
            width={200}
            height={0}
            priority
          />
          <div className='w-2/3 flex flex-col justify-center items-end'>
            <h2 className="text-2xl lg:text-4xl lg:mb-10 font-bold text-navy-900">
              XU HƯỚNG HIỆN ĐẠI
            </h2>
            <p className="text-gray-700 leading-relaxed text-right">
              Mặc dù mùa xuân và mùa hè thường gắn liền với thời tiết ấm hơn, nhưng không phải lúc nào mọi chuyện cũng bắt đầu như vậy. Các nhà thiết kế đã trang bị cho bạn những chiếc áo khoác ngoài sang trọng để tăng thêm phong cách cho phong cách của bạn trong giai đoạn chuyển tiếp từ nhiệt độ lạnh hơn sang những buổi chiều ấm áp và đầy nắng. Ngay cả khi thời tiết ấm áp hơn vào mùa xuân tới, hãy thêm một chiếc áo blazer oversized kiểu dáng đẹp vào diện mạo nếu bạn muốn tạo điểm nhấn táo bạo cho phong cách của mình.
            </p>
          </div>
        </div>
      </div>
      <div className="p-4 md:p-0 lg:p-0 space-y-4">
        <h2 className="text-2xl lg:text-4xl font-bold text-center text-navy-900 lg:mb-10">TIN TỨC NỔI BẬT</h2>
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
            blogs?.slice(0, 3)?.map((blog: any, index: any) => (
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