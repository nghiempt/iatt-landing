/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { IMAGES } from "@/utils/image";
import { Users2 } from "lucide-react";
import { DATA } from "@/utils/data";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import { ROUTES } from "@/utils/route";
import { ProductService } from "@/services/product";
import { BlogService } from "@/services/blog";
import { GlobalComponent } from "@/components/global";
import { HELPER } from "@/utils/helper";

export default function HomeContent() {
  const reviews = DATA.REVIEWS as any;
  const [products, setProducts] = useState([] as any);
  const [filteredData, setFilteredData] = useState([] as any);
  const [blogs, setBlogs] = useState([] as any);
  const [selectedCategory, setSelectedCategory] = useState<string>("plastic");
  const [swiperInstance, setSwiperInstance] = useState<any>(null);

  const handleSwiper = (swiper: any) => {
    setSwiperInstance(swiper);
  };

  const renderProduct = async () => {
    const res = await ProductService.getAll();
    if (res && res.data.length > 0) {
      setProducts(res.data);
      setFilteredData(
        res.data.filter((item: any) => item.category === selectedCategory)
      );
    }
  };

  const renderBlog = async () => {
    const res = await BlogService.getAll();
    if (res && res.data.length > 0) {
      setBlogs(res.data);
    }
  };

  const init = async () => {
    renderProduct();
    renderBlog();
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <main className="">
      <div className="mt-10 lg:mt-20">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4 px-4 lg:px-0">
          <div className="rounded-lg overflow-hidden border border-gray-400 border-dashed p-4">
            <Image
              src="https://res.cloudinary.com/farmcode/image/upload/v1737355998/iatt/j8arjpmms7r5w2vlu78w.png"
              alt="alt"
              className="w-full h-48 lg:h-80 object-cover rounded-lg"
              width={200}
              height={200}
              priority
            />
            <div className="text-center mt-4">
              <p className="text-gray-600 text-md">Khuyến mãi cho người mới</p>
              <h2 className="text-xl font-semibold text-black">
                Ảnh Cổng Cưới Giá Ưu Đãi 199k
              </h2>
              <Link href={`${ROUTES.PLASTIC}`}>
                <Button className="w-full md:w/1-3 lg:w-1/4 bg-orange-700 hover:bg-orange-800 text-white px-8 mt-4 text-md">
                  Mua ngay
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex flex-col rounded-lg overflow-hidden border border-gray-400 border-dashed p-4">
            <Image
              src={IMAGES.SUB_BANNER}
              alt="alt"
              className="w-full h-48 lg:h-80 object-cover rounded-lg"
              width={200}
              height={200}
              priority
            />
            <div className="text-center mt-4">
              <p className="text-gray-600 text-md">Khuyến mãi cho người mới</p>
              <h2 className="text-xl font-semibold text-black">
                In Ấn - Thiết Kế - Gia Công
              </h2>
              <Link href={`${ROUTES.PLASTIC}`}>
                <Button className="text-md w-full md:w/1-3 lg:w-1/4 bg-orange-700 hover:bg-orange-800 text-white px-8 mt-4">
                  Liên hệ ngay
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-10 lg:mt-20 px-4 lg:px-0">
          <h2 className="text-2xl lg:text-3xl font-bold text-black mb-4 lg:mb-10">
            SẢN PHẨM NỔI BẬT
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
            {products?.slice(0, 6)?.map((product: any, index: any) => (
              <div key={index}>
                <Link
                  href={`${ROUTES.PRODUCT}/${HELPER.getLastFourChars(
                    product?._id
                  )}?sp=${HELPER.convertSpacesToDash(product?.name)}`}
                >
                  <GlobalComponent.ProductCard
                    product
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
      <div className="mt-10 lg:mt-20">
        <div className="block lg:hidden px-4 lg:px-0">
          <h2 className="text-2xl lg:text-4xl font-bold text-center text-navy-900 mb-4">
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
                    <h3 className="font-bold text-lg text-black">
                      {review?.name}
                    </h3>
                    <p className="text-gray-500">{review?.role}</p>
                  </div>
                </Card>
              </SwiperSlide>
            ))}
            <button
              onClick={() => swiperInstance?.slidePrev()}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => swiperInstance?.slideNext()}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </Swiper>
        </div>
        <div className="w-full lg:block hidden mb-20">
          <h2 className="text-2xl lg:text-3xl font-bold text-center text-navy-900 mb-10">
            KHÁCH HÀNG NÓI GÌ?
          </h2>
          <div className="w-full flex gap-4">
            {reviews?.map((review: any, index: any) => (
              <Card
                key={index}
                className="border border-gray-400 border-dashed py-6 px-8 relative"
              >
                <div className="flex justify-center mb-4">
                  <div className="bg-[rgb(var(--quaternary-rgb))] p-4 rounded-full">
                    <Users2 className="w-8 h-8 text-black" />
                  </div>
                </div>
                <p className="text-center text-gray-700 text-lg mb-4">
                  {review?.review}
                </p>
                <div className="text-center">
                  <h3 className="font-bold text-lg text-black">
                    {review?.name}
                  </h3>
                  <p className="text-gray-500 text-md">{review?.role}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
        <div className="flex lg:hidden flex-col mt-10 px-4 text-justify">
          <h2 className="text-2xl font-bold text-navy-900 text-center mb-4">
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
          <div className="space-y-4 mt-4">
            <p className="text-gray-700 leading-relaxed">
              Mặc dù mùa xuân và mùa hè thường gắn liền với thời tiết ấm hơn,
              nhưng không phải lúc nào mọi chuyện cũng bắt đầu như vậy. Các nhà
              thiết kế đã trang bị cho bạn những chiếc áo khoác ngoài sang trọng
              để tăng thêm phong cách cho phong cách của bạn trong giai đoạn
              chuyển tiếp từ nhiệt độ lạnh hơn sang những buổi chiều ấm áp và
              đầy nắng. Ngay cả khi thời tiết ấm áp hơn vào mùa xuân tới, hãy
              thêm một chiếc áo blazer oversized kiểu dáng đẹp vào diện mạo nếu
              bạn muốn tạo điểm nhấn táo bạo cho phong cách của mình.
            </p>
          </div>
        </div>
        <div className="hidden lg:flex justify-between items-start gap-10 mb-10">
          <div className="w-2/3 flex flex-col justify-center items-start">
            <h2 className="lg:text-3xl font-bold text-navy-900 mb-4">
              XU HƯỚNG HIỆN ĐẠI
            </h2>
            <p className="text-gray-700 leading-relaxed text-lg text-justify">
              Mặc dù mùa xuân và mùa hè thường gắn liền với thời tiết ấm hơn,
              nhưng không phải lúc nào mọi chuyện cũng bắt đầu như vậy. Các nhà
              thiết kế đã trang bị cho bạn những chiếc áo khoác ngoài sang trọng
              để tăng thêm phong cách cho phong cách của bạn trong giai đoạn
              chuyển tiếp từ nhiệt độ lạnh hơn sang những buổi chiều ấm áp và
              đầy nắng. Ngay cả khi thời tiết ấm áp hơn vào mùa xuân tới, hãy
              thêm một chiếc áo blazer oversized kiểu dáng đẹp vào diện mạo nếu
              bạn muốn tạo điểm nhấn táo bạo cho phong cách của mình.
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
        <div className="hidden lg:flex justify-between items-end gap-10">
          <Image
            src="https://res.cloudinary.com/farmcode/image/upload/v1737611123/iatt/lnxejwbnytyqo23xfvi9.png"
            alt="alt"
            className="w-1/3 rounded-lg"
            width={200}
            height={0}
            priority
          />
          <div className="w-2/3 flex flex-col justify-center items-end">
            <h2 className="lg:text-3xl font-bold text-navy-900 mb-4">
              XU HƯỚNG HIỆN ĐẠI
            </h2>
            <p className="text-gray-700 leading-relaxed text-lg text-justify">
              Mặc dù mùa xuân và mùa hè thường gắn liền với thời tiết ấm hơn,
              nhưng không phải lúc nào mọi chuyện cũng bắt đầu như vậy. Các nhà
              thiết kế đã trang bị cho bạn những chiếc áo khoác ngoài sang trọng
              để tăng thêm phong cách cho phong cách của bạn trong giai đoạn
              chuyển tiếp từ nhiệt độ lạnh hơn sang những buổi chiều ấm áp và
              đầy nắng. Ngay cả khi thời tiết ấm áp hơn vào mùa xuân tới, hãy
              thêm một chiếc áo blazer oversized kiểu dáng đẹp vào diện mạo nếu
              bạn muốn tạo điểm nhấn táo bạo cho phong cách của mình.
            </p>
          </div>
        </div>
      </div>
      <div className="mt-10 lg:mt-20 px-4 lg:px-0">
        <h2 className="text-2xl lg:text-3xl font-bold text-center text-navy-900 mb-4 lg:mb-10">
          TIN TỨC NỔI BẬT
        </h2>
        <div className="lg:hidden flex flex-col">
          {blogs?.slice(0, 3)?.map((blog: any, index: any) => (
            <div key={index}>
              <Link href={`${ROUTES.BLOG}/${blog._id}`}>
                <GlobalComponent.BlogCard
                  id={blog?._id}
                  image={blog?.thumbnail}
                  title={blog?.title}
                  excerpt={blog?.excerpt}
                  date={HELPER.formatDate(blog?.created_at)}
                  author={blog?.author}
                  isMain={index === 0}
                />
              </Link>
            </div>
          ))}
        </div>
        <div className="hidden lg:grid grid-cols-1 lg:grid-cols-3 gap-6">
          {blogs?.slice(0, 3)?.map((blog: any, index: any) => (
            <GlobalComponent.BlogCard
              key={index}
              id={blog?._id}
              image={blog?.thumbnail}
              title={blog?.title}
              excerpt={blog?.excerpt}
              date={HELPER.formatDate(blog?.created_at)}
              author={blog?.author}
              isMain={true}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
