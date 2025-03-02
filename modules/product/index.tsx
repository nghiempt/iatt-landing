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
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import BannerSlider from "./components/slider";

export default function ProductClient() {
  const router = useRouter();
  const pathname = usePathname();
  const searchPath = useSearchParams();
  const tag = searchPath.get("tag");

  const categories = DATA.CATEGORIES as any;
  const [products, setProducts] = useState([] as any);
  const [openFilter, setOpenFilter] = useState(false);
  const [openSort, setOpenSort] = useState(false);
  const [selectedCate, setSelectedCate] = useState<string>("all");
  const [selectedSort, setSelectedSort] = useState<number>(0);
  const filterRef = useRef(null);
  const sortRef = useRef(null);

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

  useOnClickOutside(filterRef, () => setOpenFilter(false));
  useOnClickOutside(sortRef, () => setOpenSort(false));

  const filteredData =
    selectedCate === "all"
      ? products
      : products.filter((item: Product) => item.category === selectedCate);

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
  const sortOptions = [
    { label: "Mặc Định", sort: 0 },
    { label: "Giá Thấp Đến Cao", sort: 1 },
    { label: "Giá Cao Đến Thấp", sort: 2 },
  ];

  const selectedSortLabel =
    sortOptions.find((option) => option.sort === selectedSort)?.label ||
    "Mặc Định";

  const handleSelectCategory = (cate: string) => {
    if (!tag) {
      setSelectedCate("all");
    } else {
      setSelectedCate(cate);
    }
    setOpenFilter(false);

    const newParams = new URLSearchParams(searchPath.toString());

    if (cate === "all") {
      newParams.delete("tag");
      router.push(`${pathname}`);
      router.refresh();
    } else {
      newParams.set("tag", cate);
      router.push(`${pathname}?${newParams.toString()}`);
    }
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

    if (!tag) {
      setSelectedCate("all");
    } else {
      setSelectedCate(tag);
    }

    console.log("check tag: ", tag);

    return () => clearTimeout(timer);
  }, [filteredDataSort, tag]);

  useEffect(() => {
    init();
  }, [selectedCate]);

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="w-full bg-black p-2.5 text-center text-white text-sm font-semibold">
        <span>IN ẢNH TRỰC TUYẾN - In ảnh nhanh chóng, tiện lợi</span>
      </div>
      <Header />
      <div className="container pb-20 pt-2">
        <div className="px-4 py-4 lg:px-0">
          <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6">
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
              Tất cả sản phẩm
            </Link>
          </nav>
          <BannerSlider />
          <h1 className="text-3xl font-bold text-navy-900 mt-6 ">
            TẤT CẢ SẢN PHẨM
          </h1>
          <div className="flex flex-col lg:flex-row justify-between gap-4 py-8">
            <div className="flex gap-4">
              <div className="font-medium items-center text-black py-2">
                Chọn theo:{" "}
              </div>
              {categories.map((cate: any, index: any) =>
                selectedCate === cate.tag ? (
                  <div
                    key={index}
                    className="text-[rgb(var(--primary-rgb))] font-bold px-4 py-2 rounded-sm bg-gray-100 border border-gray-300 justify-between flex items-center"
                  >
                    <span>{cate.name}</span>
                  </div>
                ) : (
                  <button
                    key={index}
                    onClick={() => {
                      handleSelectCategory(cate.tag);
                    }}
                    className="text-black font-medium px-4 py-2 rounded-sm bg-gray-100 border border-gray-300"
                  >
                    {cate.name}
                  </button>
                )
              )}
            </div>

            <div
              className="relative flex justify-between items-center gap-4"
              ref={sortRef}
            >
              Sắp xếp theo
              <Button
                onClick={() => setOpenSort(!openSort)}
                variant="outline"
                className="border border-gray-300 flex justify-between items-center w-56 gap-4"
              >
                <span>{selectedSortLabel}</span>
                <ChevronDown className="w-4 h-4" />
              </Button>
              {openSort && (
                <div className="absolute top-12 left-auto right-0 w-56 bg-white shadow-md border border-gray-100 z-10 transition-opacity duration-300 ease-in-out">
                  <div className="flex flex-col space-y-2 ">
                    {sortOptions.map(({ label, sort }) =>
                      selectedSort === sort ? (
                        <div
                          key={sort}
                          className="bg-gray-200 text-[rgb(var(--primary-rgb))] font-medium flex items-center px-4 py-1"
                        >
                          <span>{label}</span>
                        </div>
                      ) : (
                        <button
                          key={sort}
                          onClick={() => handleSelectSort(sort)}
                          className="text-black font-medium w-full text-left px-4 py-1"
                        >
                          {label}
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
