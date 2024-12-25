'use client'
import Header from '@/layout/header';
import Footer from '@/layout/footer';
import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { Card } from "@/components/ui/card";
import { ChevronRight, ChevronDown, Star, Filter } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Image from 'next/image';
import { IMAGES } from '@/utils/image';
import { DATA } from '@/utils/data';
import { ROUTES } from '@/utils/route';
import { useOnClickOutside } from 'usehooks-ts';

interface ProductCardProps {
  image: string;
  title: string;
  price: string;
  originalPrice?: string;
  rating: number;
  reviews: number;
  discount?: string;
  soldOut?: boolean;
  hasGift?: boolean;
  soldAmount: string;
}

const ProductCard = ({
  image,
  title,
  price,
  originalPrice,
  rating,
  reviews,
  discount,
  soldOut,
  hasGift,
  soldAmount
}: ProductCardProps) => (
  <Card className="bg-white h-full overflow-hidden">
    <div className="relative">
      <Image src={image} alt={title} className="w-full h-48 object-cover" width={200} height={200} />
      <div className="absolute top-2 left-2 flex flex-col gap-2">
        {discount && (
          <span className="bg-[rgb(var(--primary-rgb))] text-white px-2 py-1 text-sm rounded">
            {discount}
          </span>
        )}
        {soldOut && (
          <span className="bg-red-700 text-white px-2 py-1 text-sm rounded">
            Hết Hàng
          </span>
        )}
      </div>
      {hasGift && (
        <div className="absolute top-2 right-2">
          <span className="text-2xl">🎁</span>
        </div>
      )}
    </div>
    <div className="p-4">
      <div className="flex items-center space-x-2 mb-2">
        <span className="text-xs font-bold text-black">{price}đ</span>
        {discount && (
          <span className="text-xs text-black line-through">{originalPrice}đ</span>
        )}
      </div>
      <h3 className="text-xs font-medium text-gray-900 mb-2 line-clamp-2">
        {title}
      </h3>
      <div className="flex items-center">
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

interface Category {
  id: number,
  name: string,
}

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
  hasGift: boolean;
  soldAmount: string;
}

const products = DATA.PRODUCTS as Products[]
const categories = DATA.CATEGORIES as Category[]

export default function ProductClient() {
  const [openFilter, setOpenFilter] = useState(false);
  const [openSort, setOpenSort] = useState(false);
  const [selectedCate, setSelectedCate] = useState<number>(0);
  const [selectedSort, setSelectedSort] = useState<number>(0);
  const filterRef = useRef(null);
  const sortRef = useRef(null);

  useOnClickOutside(filterRef, () => setOpenFilter(false));
  useOnClickOutside(sortRef, () => setOpenSort(false));

  const filteredData = selectedCate === 0
    ? products
    : products.filter(item => item.cate === selectedCate);

  const filteredDataSort = filteredData.sort((a: any, b: any) => {
    const priceA = parseInt(a.price.replace(/[^0-9]+/g, ""));
    const priceB = parseInt(b.price.replace(/[^0-9]+/g, ""));

    if (selectedSort === 0) {
      return 0;
    } else if (selectedSort === 1) {
      return priceA - priceB;
    } else if (selectedSort === 2) {
      return priceB - priceA;
    }
    return 0;
  });

  const handleSelectCategory = (cate: number) => {
    setSelectedCate(cate);
    setOpenFilter(false);
  };

  const handleSelectSort = (sort: number) => {
    setSelectedSort(sort);
    setOpenSort(false);
  };

  return (
    <div className="w-full">
      <Header />
      <div id="body" className="max-w-4xl mx-auto px-4 py-4">
        <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <Link href={`${ROUTES.HOME}`} className="hover:text-black">Trang chủ</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href={`${ROUTES.PRODUCT}`} className="hover:text-black">Tất cả sản phẩm</Link>
        </nav>
        <div className="h-32 bg-pink-50 rounded-lg mb-6">
          <Image
            src="/product.png"
            alt="Products Banner"
            className="w-full h-full object-cover rounded-lg"
            width={400}
            height={0}
          />
        </div>
        <h1 className="text-3xl font-bold text-navy-900 mb-6">TẤT CẢ SẢN PHẨM</h1>
        <div className="flex justify-between gap-4 mb-6">
          <div className='relative' ref={filterRef}>
            <Button
              onClick={() => setOpenFilter(!openFilter)}
              variant="outline" className="border-dashed border-gray-300 flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Bộ lọc
            </Button>
            {openFilter && (
              <div className={`absolute top-12 rounded-md left-0 right-0 w-44 bg-white shadow-[rgba(17,_17,_26,_0.2)_0px_0px_20px] z-10 transition-all duration-700 ease-in-out transform `}>
                <div className="flex flex-col space-y-2 py-5 px-5">
                  {categories.map((cate, index) => (
                    selectedCate === cate.id ? (
                      <div key={index} className="text-[rgb(var(--primary-rgb))] font-bold py-1 rounded-lg flex items-center">
                        <span>{cate.name}</span>
                      </div>
                    ) : (
                      <button
                        key={index}
                        onClick={() => handleSelectCategory(cate.id)}
                        className="text-black font-medium w-full text-left py-1"
                      >
                        {cate.name}
                      </button>
                    )
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className='relative flex justify-end' ref={sortRef}>
            <Button
              onClick={() => setOpenSort(!openSort)}
              variant="outline" className="border-dashed border-gray-300 flex items-center gap-2">
              Sắp xếp
              <ChevronDown className="w-4 h-4" />
            </Button>
            {openSort && (
              <div className="absolute top-12 rounded-md -left-24 w-52 bg-white shadow-[rgba(17,_17,_26,_0.2)_0px_0px_20px] z-10 transition-all duration-700 ease-in-out transform">
                <div className="flex flex-col space-y-2 py-5 px-5">
                  {[
                    { labels: "MẶC ĐỊNH", sort: 0 },
                    { labels: "GIÁ THẤP ĐẾN CAO", sort: 1 },
                    { labels: "GIÁ CAO ĐẾN THẤP", sort: 2 }
                  ]
                    .map(({ labels, sort }) => (
                      selectedSort === sort ? (
                        <div key={sort} className="text-[rgb(var(--primary-rgb))] font-bold py-1 rounded-lg flex items-center">
                          <span>{labels}</span>
                        </div>
                      ) : (
                        <button
                          key={sort}
                          onClick={() => handleSelectSort(sort)}
                          className="text-black font-medium w-full text-left py-1"
                        >
                          {labels}
                        </button>
                      )
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {filteredDataSort && filteredDataSort.length > 0 ? (
            filteredDataSort?.map((data, index) => (
              <div key={index}>
                <Link href={`${ROUTES.PRODUCT}/${data?.id}`}>
                  <ProductCard
                    image={data?.image[0]?.img}
                    title={data?.title}
                    price={data?.price}
                    originalPrice={data?.price}
                    rating={data?.rating}
                    reviews={data?.review}
                    discount={data?.discount}
                    hasGift={data?.hasGift}
                    soldAmount={data?.soldAmount}
                  />
                </Link>
              </div>
            ))
          ) : (
            <div className="col-span-2 text-center text-gray-500">
              Không có sản phẩm.
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}