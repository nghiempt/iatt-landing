"use client";
import Header from "@/layout/header";
import Footer from "@/layout/footer";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronRight, ChevronDown, Filter, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { DATA } from "@/utils/data";
import { ROUTES } from "@/utils/route";
import { useOnClickOutside } from "usehooks-ts";
import { ProductService } from "@/services/product";
import { GlobalComponent } from "@/components/global";
import { HELPER } from "@/utils/helper";

export default function ProductClient() {
  const categories = DATA.CATEGORIES as any;
  const [products, setProducts] = useState([] as any);
  const [openFilter, setOpenFilter] = useState(false);
  const [openSort, setOpenSort] = useState(false);
  const [selectedCate, setSelectedCate] = useState<string>("all");
  const [selectedSort, setSelectedSort] = useState<number>(0);
  const filterRef = useRef(null);
  const sortRef = useRef(null);

  useOnClickOutside(filterRef, () => setOpenFilter(false));
  useOnClickOutside(sortRef, () => setOpenSort(false));

  const filteredData =
    selectedCate === "all"
      ? products
      : products.filter((item: any) => item.category === selectedCate);

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

  const handleSelectCategory = (cate: string) => {
    setSelectedCate(cate);
    setOpenFilter(false);
  };

  const handleSelectSort = (sort: number) => {
    setSelectedSort(sort);
    setOpenSort(false);
  };

  const init = async () => {
    const res = await ProductService.getAll();
    if (res && res.data.length > 0) {
      setProducts(res.data);
    }
  };

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [filteredDataSort]);

  useEffect(() => {
    init();
    console.log("check selected cate: ", selectedCate);
  }, [selectedCate]);

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <Header />
      <div className="w-full md:w-3/4 lg:w-3/4 lg:mt-4 mb-10">
        <div className="px-4 py-4 lg:px-0">
          <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6">
            <Link href={`${ROUTES.HOME}`} className="hover:text-black text-md">
              Trang chủ
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link
              href={`${ROUTES.PRODUCT}`}
              className="hover:text-black text-md"
            >
              Tất cả sản phẩm
            </Link>
          </nav>
          <div className="h-32 lg:h-64 bg-pink-50 rounded-lg mb-8">
            <Image
              src="https://res.cloudinary.com/farmcode/image/upload/v1737356240/iatt/don9ysfefs3j3frnos2i.png"
              alt="Products Banner"
              className="w-full h-full object-cover rounded-lg"
              width={400}
              height={0}
            />
          </div>
          <h1 className="text-3xl font-bold text-navy-900 mb-6">
            TẤT CẢ SẢN PHẨM
          </h1>
          <div className="flex justify-between gap-4 mb-6">
            <div className="relative" ref={filterRef}>
              <Button
                onClick={() => setOpenFilter(!openFilter)}
                variant="outline"
                className="border-dashed border-gray-300 flex items-center gap-2"
              >
                <Filter className="w-4 h-4" />
                Bộ lọc
              </Button>
              {openFilter && (
                <div
                  className={`absolute top-12 rounded-md left-0 right-0 w-44 bg-white shadow-[rgba(17,_17,_26,_0.2)_0px_0px_20px] z-10 transition-all duration-700 ease-in-out transform `}
                >
                  <div className="flex flex-col space-y-2 py-5 px-5">
                    {categories.map((cate: any, index: any) =>
                      selectedCate === cate.tag ? (
                        <div
                          key={index}
                          className="text-[rgb(var(--primary-rgb))] font-bold py-1 rounded-lg flex items-center"
                        >
                          <span>{cate.name}</span>
                        </div>
                      ) : (
                        <button
                          key={index}
                          onClick={() => handleSelectCategory(cate.tag)}
                          className="text-black font-medium w-full text-left py-1"
                        >
                          {cate.name}
                        </button>
                      )
                    )}
                  </div>
                </div>
              )}
            </div>
            <div className="relative flex justify-end" ref={sortRef}>
              <Button
                onClick={() => setOpenSort(!openSort)}
                variant="outline"
                className="border-dashed border-gray-300 flex items-center gap-2"
              >
                Sắp xếp
                <ChevronDown className="w-4 h-4" />
              </Button>
              {openSort && (
                <div className="absolute top-12 rounded-md -left-24 w-52 bg-white shadow-[rgba(17,_17,_26,_0.2)_0px_0px_20px] z-10 transition-all duration-700 ease-in-out transform">
                  <div className="flex flex-col space-y-2 py-5 px-5">
                    {[
                      { labels: "MẶC ĐỊNH", sort: 0 },
                      { labels: "GIÁ THẤP ĐẾN CAO", sort: 1 },
                      { labels: "GIÁ CAO ĐẾN THẤP", sort: 2 },
                    ].map(({ labels, sort }) =>
                      selectedSort === sort ? (
                        <div
                          key={sort}
                          className="text-[rgb(var(--primary-rgb))] font-bold py-1 rounded-lg flex items-center"
                        >
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
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
          {filteredDataSort && filteredDataSort.length > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredDataSort?.map((data: any, index: any) => (
                <div key={index}>
                  <Link
                    href={`${ROUTES.PRODUCT}/${HELPER.getLastFourChars(
                      data?._id
                    )}?sp=${HELPER.convertSpacesToDash(data?.name)}`}
                  >
                    <GlobalComponent.ProductCardSmall
                      image={data?.thumbnail}
                      title={data?.name}
                      price={data?.price}
                      hot={true}
                      sold={data?.sold}
                    />
                  </Link>
                </div>
              ))}
            </div>
          ) : loading ? (
            <div className="col-span-2 text-center w-full flex justify-center items-center py-40">
              <Loader className="animate-spin" size={32} />
            </div>
          ) : (
            <div className="col-span-2 text-center w-full flex justify-center items-center py-40">
              <p className="text-gray-500 text-lg">Product not found.</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
