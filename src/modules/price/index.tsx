"use client";

import React, { useEffect, useState } from "react";
import Header from "@/layout/header";
import Footer from "@/layout/footer";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { ROUTES } from "@/utils/route";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ProductService } from "@/services/product";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { HELPER } from "@/utils/helper";
import { IMAGES } from "@/utils/image";
import "../../styles/helper.css";

interface SizeOption {
  id: string;
  label: string;
  dimensions: {
    width: number;
    height: number;
  };
}
interface MaterialOption {
  id: string;
  label: string;
}

export default function PriceTable() {
  const [products, setProducts] = useState([] as any);
  const [selectedProduct, setSelectedProduct] =
    React.useState<any>("Chon san pham");
  const [selectedSize, setSelectedSize] =
    React.useState<any>("Chon kich thuoc");
  const [selectedMaterial, setSelectedMaterial] =
    React.useState<any>("Gỗ composite");
  const renderProduct = async () => {
    const res = await ProductService.getAll();
    if (res && res.data.length > 0) {
      setProducts(res.data);
    }
  };

  // const materialOptions: MaterialOption[] = [
  //   { id: "Gỗ composite", label: "Gỗ composite" },
  //   { id: "Gỗ meka", label: "Gỗ meka" },
  //   { id: "Nhựa", label: "Nhựa" },
  // ];

  const sizeOptions: SizeOption[] = [
    { id: "15x21", label: "15x21", dimensions: { width: 150, height: 210 } },
    { id: "20x30", label: "20x30", dimensions: { width: 200, height: 300 } },
    { id: "40x20", label: "40x20", dimensions: { width: 400, height: 200 } },
  ];

  useEffect(() => {
    renderProduct();
  }, []);
  const priceData = [
    {
      size: "3x4",
      inAnh: 1200,
      "Phủ UV hoặc lụa mờ": 1000,
      "Ép Plastic": 500,
      "Ảnh gỗ Composite": "-",
      "Ảnh gỗ Meka": "-",
      "Bóc cạnh ghép nhựa": "-",
    },
    {
      size: "4x6",
      inAnh: 1300,
      "Phủ UV hoặc lụa mờ": 1000,
      "Ép Plastic": 500,
      "Ảnh gỗ Composite": "-",
      "Ảnh gỗ Meka": "-",
      "Bóc cạnh ghép nhựa": "-",
    },
    {
      size: "6x9",
      inAnh: 1500,
      "Phủ UV hoặc lụa mờ": 1000,
      "Ép Plastic": 800,
      "Ảnh gỗ Composite": "-",
      "Ảnh gỗ Meka": "-",
      "Bóc cạnh ghép nhựa": "-",
    },
    {
      size: "9x12",
      inAnh: 2000,
      "Phủ UV hoặc lụa mờ": 1200,
      "Ép Plastic": 1000,
      "Ảnh gỗ Composite": "-",
      "Ảnh gỗ Meka": 25000,
      "Bóc cạnh ghép nhựa": 45000,
    },
    {
      size: "10x15",
      inAnh: 2500,
      "Phủ UV hoặc lụa mờ": 1200,
      "Ép Plastic": 1000,
      "Ảnh gỗ Composite": "-",
      "Ảnh gỗ Meka": 25000,
      "Bóc cạnh ghép nhựa": 45000,
    },
    {
      size: "13x18",
      inAnh: 3300,
      "Phủ UV hoặc lụa mờ": 1800,
      "Ép Plastic": 1200,
      "Ảnh gỗ Composite": 35000,
      "Ảnh gỗ Meka": 55000,
      "Bóc cạnh ghép nhựa": 55000,
    },
    {
      size: "15x21",
      inAnh: 5300,
      "Phủ UV hoặc lụa mờ": 2600,
      "Ép Plastic": 2000,
      "Ảnh gỗ Composite": 40000,
      "Ảnh gỗ Meka": 75000,
      "Bóc cạnh ghép nhựa": 75000,
    },
    {
      size: "20x25",
      inAnh: 12500,
      "Phủ UV hoặc lụa mờ": 5000,
      "Ép Plastic": 4000,
      "Ảnh gỗ Composite": 55000,
      "Ảnh gỗ Meka": 155000,
      "Bóc cạnh ghép nhựa": 20000,
    },
    {
      size: "20x30",
      inAnh: 14000,
      "Phủ UV hoặc lụa mờ": 6500,
      "Ép Plastic": 5000,
      "Ảnh gỗ Composite": 80000,
      "Ảnh gỗ Meka": 180000,
      "Bóc cạnh ghép nhựa": 20000,
    },
    {
      size: "25x35",
      inAnh: 28000,
      "Phủ UV hoặc lụa mờ": 9500,
      "Ép Plastic": 5500,
      "Ảnh gỗ Composite": 95000,
      "Ảnh gỗ Meka": 195000,
      "Bóc cạnh ghép nhựa": 25000,
    },
    {
      size: "25x38",
      inAnh: 30000,
      "Phủ UV hoặc lụa mờ": 10000,
      "Ép Plastic": 5500,
      "Ảnh gỗ Composite": 105000,
      "Ảnh gỗ Meka": 205000,
      "Bóc cạnh ghép nhựa": 25000,
    },
    {
      size: "30x40",
      inAnh: 40000,
      "Phủ UV hoặc lụa mờ": 12000,
      "Ép Plastic": 10000,
      "Ảnh gỗ Composite": 130000,
      "Ảnh gỗ Meka": 230000,
      "Bóc cạnh ghép nhựa": 30000,
    },
    {
      size: "30x45",
      inAnh: 50000,
      "Phủ UV hoặc lụa mờ": 15000,
      "Ép Plastic": 10000,
      "Ảnh gỗ Composite": 140000,
      "Ảnh gỗ Meka": 240000,
      "Bóc cạnh ghép nhựa": 30000,
    },
    {
      size: "35x50",
      inAnh: 80000,
      "Phủ UV hoặc lụa mờ": 20000,
      "Ảnh gỗ Composite": 165000,
      "Ảnh gỗ Meka": 265000,
      "Bóc cạnh ghép nhựa": 35000,
    },
    {
      size: "40x60",
      inAnh: 95000,
      "Phủ UV hoặc lụa mờ": 30000,
      "Ảnh gỗ Composite": 195000,
      "Ảnh gỗ Meka": 295000,
      "Bóc cạnh ghép nhựa": 40000,
    },
    {
      size: "50x75",
      inAnh: 140000,
      "Phủ UV hoặc lụa mờ": 35000,
      "Ảnh gỗ Composite": 260000,
      "Ảnh gỗ Meka": 360000,
      "Bóc cạnh ghép nhựa": 50000,
    },
    {
      size: "60x90",
      inAnh: 200000,
      "Phủ UV hoặc lụa mờ": 50000,
      "Ảnh gỗ Composite": 370000,
      "Ảnh gỗ Meka": 470000,
      "Bóc cạnh ghép nhựa": 60000,
    },
    {
      size: "70x110",
      inAnh: 280000,
      "Phủ UV hoặc lụa mờ": 85000,
      "Ảnh gỗ Composite": 565000,
      "Ảnh gỗ Meka": 665000,
      "Bóc cạnh ghép nhựa": 75000,
    },
    {
      size: "80x120",
      inAnh: 330000,
      "Phủ UV hoặc lụa mờ": 120000,
      "Ảnh gỗ Composite": 670000,
      "Ảnh gỗ Meka": 770000,
      "Bóc cạnh ghép nhựa": 85000,
    },
    {
      size: "100x150",
      inAnh: 480000,
      "Phủ UV hoặc lụa mờ": 160000,
      "Ảnh gỗ Composite": 1050000,
      "Ảnh gỗ Meka": 1150000,
      "Bóc cạnh ghép nhựa": 100000,
    },
  ];

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
      <div className="container px-1 lg:px-8 pb-0 lg:pb-10 pt-2">
        <div className="px-4 pt-3 pb-0 lg:pb-0 lg:px-0">
          <nav className="flex items-center gap-2 text-sm text-gray-600 mb-2">
            <Link href={`${ROUTES.HOME}`} className="hover:text-black text-md">
              Trang chủ
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link href={`${ROUTES.PRICE}`} className="hover:text-black text-md">
              Bảng giá
            </Link>
          </nav>
          <div className="space-y-4">
            <div className="space-y-10 mb-5 lg:mb-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 w-full">
                <div className="grid grid-cols-1">
                  <div className="text-black font-bold text-xl lg:text-3xl pb-3 lg:pb-0">
                    TÌM NHANH SẢN PHẨM
                  </div>
                  <div className="w-full pb-3 lg:pb-0">
                    <div>
                      <Label htmlFor="name" className="text-black font-base">
                        Tên sản phẩm
                      </Label>
                      <div className="bg-gray-50 border border-gray-100 text-gray-900 rounded-lg block w-full my-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <div className="text-sm cursor-pointer flex flex-row justify-between items-center gap-4 p-2 bg-white rounded-md border border-gray-200">
                              {selectedProduct &&
                              selectedProduct !== "Chon san pham" ? (
                                products?.find(
                                  (item: any) =>
                                    String(item?._id) === selectedProduct
                                ) ? (
                                  <div className="cursor-pointer flex flex-row items-center gap-2">
                                    <Image
                                      src={
                                        products?.find(
                                          (item: any) =>
                                            String(item?._id) ===
                                            selectedProduct
                                        )?.thumbnail
                                      }
                                      alt=""
                                      width={1000}
                                      height={1000}
                                      className="object-cover w-8 h-8 shrink-0 border border-gray-200"
                                    />
                                    <p className="text-xs line-clamp-2">
                                      {
                                        products?.find(
                                          (item: any) =>
                                            String(item?._id) ===
                                            selectedProduct
                                        )?.name
                                      }
                                    </p>
                                  </div>
                                ) : (
                                  "Chọn sản phẩm"
                                )
                              ) : (
                                "Chọn sản phẩm"
                              )}
                            </div>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle className="mb-3">
                                Vui lòng chọn sản phẩm
                              </DialogTitle>
                              <DialogDescription className="max-h-96 overflow-y-auto scroll-bar-style">
                                <div className="">
                                  {products?.length > 0 ? (
                                    products.map((item: any) => (
                                      <DialogClose asChild key={item._id}>
                                        <div
                                          className="mb-0 cursor-pointer hover:bg-gray-100 py-2 rounded-md"
                                          onClick={() =>
                                            setSelectedProduct(item._id)
                                          }
                                        >
                                          <div className="flex flex-row items-center gap-4">
                                            <Image
                                              src={item.thumbnail}
                                              alt={item.name}
                                              width={1000}
                                              height={1000}
                                              className="object-cover border border-gray-200 w-8 h-8 shrink-0"
                                            />
                                            <p className="text-xs text-left w-full">
                                              {item.name}
                                            </p>
                                          </div>
                                        </div>
                                      </DialogClose>
                                    ))
                                  ) : (
                                    <p className="text-gray-500">
                                      Không có sản phẩm nào để chọn.
                                    </p>
                                  )}
                                </div>
                              </DialogDescription>
                            </DialogHeader>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                    <div className="pt-1">
                      <Label htmlFor="name" className="text-black font-base">
                        Kích thước sản phẩm
                      </Label>
                      <div className="bg-gray-50 border border-gray-100 text-gray-900 rounded-lg block w-full my-2">
                        <Select
                          value={selectedSize}
                          onValueChange={setSelectedSize}
                        >
                          <SelectTrigger>
                            {selectedSize === "Chon kich thuoc"
                              ? "Chọn kích thước"
                              : ""}
                            <SelectValue placeholder="Chọn kích thước" />
                          </SelectTrigger>
                          <SelectContent className="">
                            {sizeOptions?.map((item: any, index: any) => (
                              <SelectItem
                                className="text-xs"
                                key={index}
                                value={String(item?.id)}
                              >
                                {item?.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                  {/* <div>
                    <Label
                      htmlFor="material"
                      className="text-[#484848] font-bold"
                    >
                      Chất liệu
                    </Label>
                    <div className="flex gap-4 my-2">
                      {materialOptions.map((material) => (
                        <div key={material.id} className="flex gap-2">
                          <button
                            key={material.id}
                            type="button"
                            className={`
                              w-8 h-8 rounded-full transition-all border-2
                              ${
                                selectedMaterial === material.id
                                  ? "ring-2 ring-offset-2 ring-[rgb(var(--primary-rgb))] bg-[rgb(var(--primary-rgb))]"
                                  : "ring-2 ring-offset-2 ring-gray-300"
                              }`}
                            onClick={() => setSelectedMaterial(material.id)}
                          ></button>
                          <div>{material.label}</div>
                        </div>
                      ))}
                    </div>
                  </div> */}
                  <div className="flex justify-end items-center gap-2">
                    <span className="text-sm lg:text-base">Giá sản phẩm:</span>
                    <span className="font-semibold">
                      {selectedProduct === "Chon san pham"
                        ? HELPER.formatVND("0")
                        : HELPER.formatVND(
                            products.find(
                              (pro: any) =>
                                pro._id.toString() === selectedProduct
                            )?.price
                          )}
                    </span>
                  </div>
                </div>
                <Image
                  src="https://s3-alpha-sig.figma.com/img/7479/3b7c/552593d478f203548cca72b01b50b862?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=bQ5JxELqv2CgiAetbE-cxqZ6X3n3N~EWsuA4CWnttGkYIUWJl9H7iUg985vn4zCnMtdOfx0FUJVLPLIA3syaNI6WpSPnO0q8dV6DEAF8upH2qSPE2oLCOtqPeNQmZYkEUPGxd4ULGa0whwGNVC2IARSIM1Oow0yVl6GWkCaq7WjKMWw8z004M4hPManBarNEk98Y8cL7sVCafJKk5NXYte2-64qeKaan2xhJF16NFfNjzUd~RxKSuzAoHE5yj1AtlzohK-SrTRM6vcVGYcgD902vgpNgmYt99Z1Kmgm2-tARp3qPc66D1dxxG-WHOCXV~Zn25aY9j~vkfXxxQfe1PQ__"
                  alt="price-banner"
                  className="hidden lg:flex mx-auto w-4/5 h-full object-contain"
                  width={1000}
                  height={1000}
                />
              </div>
              <div className="space-y-4 !mt-8">
                <h1 className="text-xl font-bold text-black ">
                  BẢNG GIÁ CHI TIẾT
                </h1>
                <Card className="border-none shadow-none">
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader className="bg-[#FFEFCB]">
                        <TableRow>
                          <TableHead className="text-black px-1 lg:px-2 text-center">
                            Kích thước
                          </TableHead>
                          <TableHead className="text-black px-1 lg:px-2 text-center">
                            In Ảnh
                          </TableHead>
                          <TableHead className="text-black px-1 lg:px-2 text-center">
                            Phủ UV hoặc lụa mờ
                          </TableHead>
                          <TableHead className="text-black px-1 lg:px-2 text-center">
                            Ép Plastic
                          </TableHead>
                          <TableHead className="text-black px-1 lg:px-2 text-center">
                            Ảnh gỗ Composite
                          </TableHead>
                          <TableHead className="text-black px-1 lg:px-2 text-center">
                            Ảnh gỗ Meka
                          </TableHead>
                          <TableHead className="text-black px-1 lg:px-2 text-center">
                            Bóc cạnh ghép nhựa
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {priceData.map((item) => (
                          <TableRow key={item.size}>
                            <TableCell className="text-center">
                              {item.size}
                            </TableCell>
                            <TableCell className="text-center">
                              {item.inAnh.toLocaleString()}
                            </TableCell>
                            <TableCell className="text-center">
                              {item["Phủ UV hoặc lụa mờ"].toLocaleString()}
                            </TableCell>
                            <TableCell className="text-center">
                              {item.inAnh.toLocaleString()}
                            </TableCell>
                            <TableCell className="text-center">
                              {item["Ảnh gỗ Composite"].toLocaleString()}
                            </TableCell>
                            <TableCell className="text-center">
                              {item["Ảnh gỗ Meka"].toLocaleString()}
                            </TableCell>
                            <TableCell className="text-center">
                              {item["Bóc cạnh ghép nhựa"].toLocaleString()}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
