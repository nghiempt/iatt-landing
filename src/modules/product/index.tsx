"use client";
import Header from "@/layout/header";
import Footer from "@/layout/footer";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronRight, ChevronDown, Filter, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DATA } from "@/utils/data";
import { ROUTES } from "@/utils/route";
import { useOnClickOutside } from "usehooks-ts";
import { ProductService } from "@/services/product";
import { GlobalComponent } from "@/components/global";
import { HELPER } from "@/utils/helper";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { IMAGES } from "@/utils/image";
import "../../styles/helper.css";

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

    return () => clearTimeout(timer);
  }, [filteredDataSort, tag]);

  useEffect(() => {
    init();
  }, [selectedCate]);

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
      <div className="container px-5 lg:px-8 lg:pb-8 pt-3">
        <div className="pt-2 pb-5 px-0">
          <nav className="flex items-center gap-2 text-sm text-gray-600 mb-0">
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
          <h1 className="text-xl lg:text-3xl font-bold text-navy-900 mt-3">
            SẢN PHẨM CỦA CHÚNG TÔI
          </h1>
          <div className="w-full grid grid-cols-1 space-y-2 lg:flex lg:flex-col justify-between items-center lg:items-start gap-4 pb-8 pt-3">
            <div className="w-full lg:flex flex-col justify-start items-center lg:items-start gap-2 lg:gap-2">
              <div className="w-full lg:w-20 items-center text-black mb-2 lg:mb-0">
                Lọc theo:{" "}
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 w-full">
                {categories.map((cate: any, index: any) =>
                  selectedCate === cate.tag ? (
                    <button
                      key={index}
                      className="text-orange-600 font-bold px-4 py-2 rounded-sm bg-white border border-orange-600"
                    >
                      {cate.name}
                    </button>
                  ) : (
                    <button
                      key={index}
                      onClick={() => {
                        handleSelectCategory(cate.tag);
                      }}
                      className="text-black font-medium px-4 py-2 rounded-sm bg-gray-50 border border-gray-200"
                    >
                      {cate.name}
                    </button>
                  )
                )}
              </div>
            </div>
            <div
              className="relative flex flex-col lg:flex-col justify-between items-start lg:items-start gap-2"
              ref={sortRef}
            >
              Sắp xếp theo giá:
              <Button
                onClick={() => setOpenSort(!openSort)}
                variant="outline"
                className="w-full lg:w-[325px] border border-gray-300 flex justify-between items-center gap-4"
              >
                <span>{selectedSortLabel}</span>
                <ChevronDown className="w-4 h-4" />
              </Button>
              {openSort && (
                <div className="absolute top-20 left-0 lg:top-12 lg:left-auto lg:right-0 w-56 bg-white shadow-md border border-gray-100 z-10 transition-opacity duration-300 ease-in-out">
                  <div className="flex flex-col space-y-2 py-2">
                    {sortOptions.map(({ label, sort }) =>
                      selectedSort === sort ? (
                        <div
                          key={sort}
                          className="bg-gray-50 text-orange-600 font-medium flex items-center px-4 py-2"
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
                    <GlobalComponent.ProductCardMobile
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
