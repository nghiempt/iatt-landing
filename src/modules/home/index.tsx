'use client'
import Header from '@/layout/header';
import Footer from '@/layout/footer';
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, UserRound } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { IMAGES } from '@/utils/image';
import { Star } from 'lucide-react';
import { Users2 } from 'lucide-react';
import { Calendar, User } from 'lucide-react';
import { DATA } from '@/utils/data';
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from 'next/link';
import { ROUTES } from '@/utils/route';

interface NewsItemProps {
  image: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  isMain?: boolean;
}

const NewsItem = ({ image, title, excerpt, date, author, isMain = false }: NewsItemProps) => (
  <Card className={`overflow-hidden ${isMain ? 'mb-4' : 'flex items-center gap-4 mb-4'}`}>
    <div className={`${isMain ? 'w-full' : 'w-24 h-28 flex-shrink-0'}`}>
      <Image
        src={image}
        alt={title}
        className={`w-full ${isMain ? 'h-48' : 'h-28'} object-cover`}
        width={200}
        height={200}
      />
    </div>
    <div className={`${isMain ? 'p-4' : 'py-2 pr-4'}`}>
      <h3 className={`font-bold line-clamp-2 text-navy-900 ${isMain ? 'text-xl mb-2' : 'text-sm mb-2'}`}>
        {title}
      </h3>
      <p className="text-gray-600 text-xs mb-2 line-clamp-2">{excerpt}</p>
      <div className="flex items-center text-sm text-gray-500 gap-4">
        <div className="flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          <span>{date}</span>
        </div>
        <div className="flex items-center gap-1">
          <UserRound className="w-4 h-4" />
          <span>{author}</span>
        </div>
      </div>
    </div>
  </Card>
);

interface ProductCardProps {
  image: string;
  title: string;
  price: string;
  originalPrice?: string;
  discount?: string;
  rating: number;
  reviews: number;
  soldAmount: string;
}

const ProductCard = ({
  image,
  title,
  price,
  originalPrice,
  discount,
  rating,
  reviews,
  soldAmount,
}: ProductCardProps) => (
  <Card className="bg-white h-full rounded-lg overflow-hidden">
    <div className="relative">
      {discount && (
        <div className="absolute top-2 left-2 bg-[rgb(var(--primary-rgb))] text-white px-2 py-1 rounded-md text-sm">
          {discount}
        </div>
      )}
      <Image src={image} alt={title} className="w-full h-48 object-cover" width={200} height={200} />
    </div>
    <div className="flex flex-col justify-between p-4">
      <div className="flex items-center space-x-2">
        <span className="text-xs font-bold text-black">{price}đ</span>
        {discount && (
          <span className="text-xs text-black line-through">{originalPrice}đ</span>
        )}
      </div>
      <h3 className="text-xs font-medium text-gray-900 line-clamp-2 mt-2">{title}</h3>
      <div className="flex items-center mt-2">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-3 h-3 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
          />
        ))}
        <span className="text-xs text-gray-500 ml-2">{soldAmount}</span>
      </div>
    </div>
  </Card>
);

interface CategoryCardProps {
  title: string;
  icon?: React.ReactNode;
}

const CategoryCard = ({ title, icon }: CategoryCardProps) => (
  <div className="w-28 flex-1 border border-gray-300 border-dashed rounded-lg p-4 flex flex-col items-center justify-center space-y-2">
    {icon}
    <span className="text-xs">{title}</span>
  </div>
);

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
  soldAmount: string;
}

interface CustomerReview {
  id: number,
  name: string,
  review:
  string,
  role: string,
}

interface BlogPost {
  id: number;
  image: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  slug: string;
  content: string;
}

const posts = DATA.POSTS as BlogPost[]
const products = DATA.PRODUCTS as Products[]
const customerRV = DATA.CUSTOMERREVIEW as CustomerReview[]

export default function HomeClient() {
  const [selectedCate, setSelectedCate] = useState<number>(1);
  const [swiperInstance, setSwiperInstance] = useState<any>(null);
  const filteredData = products.filter(item => item.cate === selectedCate);

  const handleSwiper = (swiper: any) => {
    setSwiperInstance(swiper);
  };

  return (
    <div className="w-full">
      <Header />
      <div>
        <main id="body" className="space-y-6">
          <Card className="relative overflow-hidden rounded-none shadow-none">
            <Image
              src={"https://img.freepik.com/free-photo/white-blank-background-texture-design-element_53876-132773.jpg?semt=ais_hybrid"}
              alt="logo"
              className="w-full h-96 object-cover"
              width={1920}
              height={1080}
            />
            <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-white">
              <h2 className="text-4xl font-bold mb-2">KHUNG ẢNH</h2>
              <h3 className="text-3xl font-light">ALBUM</h3>
            </div>
          </Card>
          <div className="mt-4 text-center px-4">
            <h3 className="text-lg font-bold text-navy-blue mb-4">DANH MỤC SẢN PHẨM</h3>
            <div className="flex justify-center space-x-4">
              <Link href={`${ROUTES.PRODUCT}`}>
                <CategoryCard
                  title="Ép Plastic"
                  icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-hard-drive"><line x1="22" x2="2" y1="12" y2="12" /><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" /><line x1="6" x2="6.01" y1="16" y2="16" /><line x1="10" x2="10.01" y1="16" y2="16" /></svg>}
                />
              </Link>
              <Link href={`${ROUTES.PRODUCT}`}>
                <CategoryCard
                  title="Khung ảnh"
                  icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-frame"><line x1="22" x2="2" y1="6" y2="6" /><line x1="22" x2="2" y1="18" y2="18" /><line x1="6" x2="6" y1="2" y2="22" /><line x1="18" x2="18" y1="2" y2="22" /></svg>}
                />
              </Link>
              <Link href={`${ROUTES.PRODUCT}`}>
                <CategoryCard
                  title="Album"
                  icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-images"><path d="M18 22H4a2 2 0 0 1-2-2V6" /><path d="m22 13-1.296-1.296a2.41 2.41 0 0 0-3.408 0L11 18" /><circle cx="12" cy="8" r="2" /><rect width="16" height="16" x="6" y="2" rx="2" /></svg>}
                />
              </Link>
            </div>
          </div>
          <div className="p-4 space-y-8">
            <div className="rounded-lg overflow-hidden border border-dashed border-[rgb(var(--primary-rgb))] p-4">
              <Image
                src={IMAGES.BLOG}
                alt="alt"
                className="w-full h-48 object-cover rounded-lg"
                width={200}
                height={200}
              />
              <div className="text-center mt-4">
                <p className="text-gray-600">Khuyến mãi cho người mới</p>
                <h2 className="text-xl font-semibold text-black">Khung ảnh hoa văn đặc biệt</h2>
                <Button
                  className="w-full bg-[rgb(var(--primary-rgb))] hover:bg-[#6B3410] text-white px-8 mt-4"
                >
                  Mua ngay
                </Button>
              </div>
            </div>
            <div>
              <h2 className="text-lg font-bold text-black mb-4">SẢN PHẨM NỔI BẬT</h2>
              <div className="grid grid-cols-2 gap-4">
                {products?.slice(0, 2)?.map((pro, index) => (
                  <div key={index}>
                    <Link href={`${ROUTES.PRODUCT}/${pro?.id}`}>
                      <ProductCard
                        image={pro?.image[0]?.img}
                        title={pro?.title}
                        price={pro?.price}
                        rating={pro?.rating}
                        reviews={pro?.review}
                        discount={pro?.discount}
                        originalPrice={pro?.price}
                        soldAmount={pro?.soldAmount}
                      />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="p-4 space-y-4 pt-0">
            <div className="text-center space-y-2">
              <h2 className="text-lg font-bold text-navy-900">TOP BÁN CHẠY</h2>
            </div>
            <div className="bg-[rgb(var(--quaternary-rgb))] rounded-lg p-4 space-y-3">
              {[
                { label: "ẢNH PLASTIC", cate: 1 },
                { label: "KHUNG ẢNH", cate: 2 },
                { label: "ALBUM", cate: 3 },
              ].map(({ label, cate }) => (
                selectedCate === cate ? (
                  <div key={cate} className="bg-[rgb(var(--primary-rgb))] text-white py-3 px-4 rounded-lg flex items-center">
                    <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
                    <span className='text-sm font-bold'>{label}</span>
                  </div>
                ) : (
                  <button
                    key={cate}
                    onClick={() => setSelectedCate(cate)}
                    className="text-black font-medium w-full text-left py-2"
                  >
                    <span className='text-sm font-bold'>{label}</span>
                  </button>
                )
              ))}
            </div>
            <div className="grid grid-cols-2 gap-4">
              {filteredData?.slice(0, 4)?.map((filPro, index) => (
                <div key={index}>
                  <Link href={`${ROUTES.PRODUCT}/${filPro?.id}`}>
                    <ProductCard
                      image={filPro?.image[0]?.img}
                      title={filPro?.title}
                      price={filPro?.price}
                      originalPrice={filPro?.price}
                      discount={filPro?.discount}
                      rating={filPro?.rating}
                      reviews={filPro?.review}
                      soldAmount={filPro?.soldAmount}
                    />
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <div className="p-4 space-y-10 pt-0">
            <div className="space-y-4">
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
                {customerRV?.map((cusRV, index) => (
                  <SwiperSlide key={index}>
                    <Card className="border-2 border-dashed border-gray-300 py-6 px-8 relative">
                      <div className="flex justify-center mb-4">
                        <div className="bg-[rgb(var(--quaternary-rgb))] p-4 rounded-full">
                          <Users2 className="w-8 h-8 text-black" />
                        </div>
                      </div>
                      <p className="text-center text-gray-700 text-lg mb-4">
                        {cusRV?.review}
                      </p>
                      <div className="text-center">
                        <h3 className="font-bold text-lg text-black">{cusRV?.name}</h3>
                        <p className="text-gray-500">{cusRV?.role}</p>
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
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-navy-900 text-center">
                XU HƯỚNG HIỆN ĐẠI
              </h2>
              <div className="relative">
                <Image
                  src={IMAGES.PRODUCT}
                  alt="alt"
                  className="w-full rounded-lg"
                  width={200}
                  height={200}
                />
              </div>
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  Mặc dù mùa xuân và mùa hè thường gắn liền với thời tiết ấm hơn, nhưng không phải lúc nào mọi chuyện cũng bắt đầu như vậy. Các nhà thiết kế đã trang bị cho bạn những chiếc áo khoác ngoài sang trọng để tăng thêm phong cách cho phong cách của bạn trong giai đoạn chuyển tiếp từ nhiệt độ lạnh hơn sang những buổi chiều ấm áp và đầy nắng. Ngay cả khi thời tiết ấm áp hơn vào mùa xuân tới, hãy thêm một chiếc áo blazer oversized kiểu dáng đẹp vào diện mạo nếu bạn muốn tạo điểm nhấn táo bạo cho phong cách của mình.
                </p>
              </div>
            </div>
          </div>
          <div className="p-4 space-y-4">
            <h2 className="text-2xl font-bold text-center text-navy-900">TIN TỨC</h2>
            <div className="space-y-2">
              {posts?.slice(0, 3)?.map((pot, index) => (
                <div key={index}>
                  <Link href={`${ROUTES.BLOG}/${pot.id}`}>
                    <NewsItem
                      image={pot.image}
                      title={pot.title}
                      excerpt={pot.excerpt}
                      date={pot.date}
                      author={pot.author}
                      isMain={index === 0}
                    />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}