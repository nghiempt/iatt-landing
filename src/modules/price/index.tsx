"use client";

import React, { useEffect, useState } from 'react';
import Header from '@/layout/header';
import Footer from '@/layout/footer';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { ROUTES } from '@/utils/route';
import Image from "next/image";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ProductService } from '@/services/product';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { HELPER } from '@/utils/helper';

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
  const [selectedProduct, setSelectedProduct] = React.useState<any>(
    "Chon san pham"
  );
  const [selectedSize, setSelectedSize] = React.useState<any>(
    "Chon kich thuoc"
  );
  const [selectedMaterial, setSelectedMaterial] = React.useState<any>(
    "Gỗ composite"
  );
  const renderProduct = async () => {
    const res = await ProductService.getAll();
    if (res && res.data.length > 0) {
      setProducts(res.data);
    }
  };

  const materialOptions: MaterialOption[] = [
    { id: "Gỗ composite", label: "Gỗ composite" },
    { id: "Gỗ meka", label: "Gỗ meka" },
    { id: "Nhựa", label: "Nhựa" },
  ];

  const sizeOptions: SizeOption[] = [
    { id: "15x21", label: "15x21", dimensions: { width: 150, height: 210 } },
    { id: "20x30", label: "20x30", dimensions: { width: 200, height: 300 } },
    { id: "40x20", label: "40x20", dimensions: { width: 400, height: 200 } },
  ];

  useEffect(() => {
    renderProduct();
  }, []);
  const priceData = [
    { size: '3x4', inAnh: 1200, 'Phủ UV hoặc lụa mờ': 1000, 'Ép Plastic': 500, 'Ảnh gỗ Composite': '-', 'Ảnh gỗ Meka': '-', 'Bóc cạnh ghép nhựa': '-' },
    { size: '4x6', inAnh: 1300, 'Phủ UV hoặc lụa mờ': 1000, 'Ép Plastic': 500, 'Ảnh gỗ Composite': '-', 'Ảnh gỗ Meka': '-', 'Bóc cạnh ghép nhựa': '-' },
    { size: '6x9', inAnh: 1500, 'Phủ UV hoặc lụa mờ': 1000, 'Ép Plastic': 800, 'Ảnh gỗ Composite': '-', 'Ảnh gỗ Meka': '-', 'Bóc cạnh ghép nhựa': '-' },
    { size: '9x12', inAnh: 2000, 'Phủ UV hoặc lụa mờ': 1200, 'Ép Plastic': 1000, 'Ảnh gỗ Composite': '-', 'Ảnh gỗ Meka': 25000, 'Bóc cạnh ghép nhựa': 45000 },
    { size: '10x15', inAnh: 2500, 'Phủ UV hoặc lụa mờ': 1200, 'Ép Plastic': 1000, 'Ảnh gỗ Composite': '-', 'Ảnh gỗ Meka': 25000, 'Bóc cạnh ghép nhựa': 45000 },
    { size: '13x18', inAnh: 3300, 'Phủ UV hoặc lụa mờ': 1800, 'Ép Plastic': 1200, 'Ảnh gỗ Composite': 35000, 'Ảnh gỗ Meka': 55000, 'Bóc cạnh ghép nhựa': 55000 },
    { size: '15x21', inAnh: 5300, 'Phủ UV hoặc lụa mờ': 2600, 'Ép Plastic': 2000, 'Ảnh gỗ Composite': 40000, 'Ảnh gỗ Meka': 75000, 'Bóc cạnh ghép nhựa': 75000 },
    { size: '20x25', inAnh: 12500, 'Phủ UV hoặc lụa mờ': 5000, 'Ép Plastic': 4000, 'Ảnh gỗ Composite': 55000, 'Ảnh gỗ Meka': 155000, 'Bóc cạnh ghép nhựa': 20000 },
    { size: '20x30', inAnh: 14000, 'Phủ UV hoặc lụa mờ': 6500, 'Ép Plastic': 5000, 'Ảnh gỗ Composite': 80000, 'Ảnh gỗ Meka': 180000, 'Bóc cạnh ghép nhựa': 20000 },
    { size: '25x35', inAnh: 28000, 'Phủ UV hoặc lụa mờ': 9500, 'Ép Plastic': 5500, 'Ảnh gỗ Composite': 95000, 'Ảnh gỗ Meka': 195000, 'Bóc cạnh ghép nhựa': 25000 },
    { size: '25x38', inAnh: 30000, 'Phủ UV hoặc lụa mờ': 10000, 'Ép Plastic': 5500, 'Ảnh gỗ Composite': 105000, 'Ảnh gỗ Meka': 205000, 'Bóc cạnh ghép nhựa': 25000 },
    { size: '30x40', inAnh: 40000, 'Phủ UV hoặc lụa mờ': 12000, 'Ép Plastic': 10000, 'Ảnh gỗ Composite': 130000, 'Ảnh gỗ Meka': 230000, 'Bóc cạnh ghép nhựa': 30000 },
    { size: '30x45', inAnh: 50000, 'Phủ UV hoặc lụa mờ': 15000, 'Ép Plastic': 10000, 'Ảnh gỗ Composite': 140000, 'Ảnh gỗ Meka': 240000, 'Bóc cạnh ghép nhựa': 30000 },
    { size: '35x50', inAnh: 80000, 'Phủ UV hoặc lụa mờ': 20000, 'Ảnh gỗ Composite': 165000, 'Ảnh gỗ Meka': 265000, 'Bóc cạnh ghép nhựa': 35000 },
    { size: '40x60', inAnh: 95000, 'Phủ UV hoặc lụa mờ': 30000, 'Ảnh gỗ Composite': 195000, 'Ảnh gỗ Meka': 295000, 'Bóc cạnh ghép nhựa': 40000 },
    { size: '50x75', inAnh: 140000, 'Phủ UV hoặc lụa mờ': 35000, 'Ảnh gỗ Composite': 260000, 'Ảnh gỗ Meka': 360000, 'Bóc cạnh ghép nhựa': 50000 },
    { size: '60x90', inAnh: 200000, 'Phủ UV hoặc lụa mờ': 50000, 'Ảnh gỗ Composite': 370000, 'Ảnh gỗ Meka': 470000, 'Bóc cạnh ghép nhựa': 60000 },
    { size: '70x110', inAnh: 280000, 'Phủ UV hoặc lụa mờ': 85000, 'Ảnh gỗ Composite': 565000, 'Ảnh gỗ Meka': 665000, 'Bóc cạnh ghép nhựa': 75000 },
    { size: '80x120', inAnh: 330000, 'Phủ UV hoặc lụa mờ': 120000, 'Ảnh gỗ Composite': 670000, 'Ảnh gỗ Meka': 770000, 'Bóc cạnh ghép nhựa': 85000 },
    { size: '100x150', inAnh: 480000, 'Phủ UV hoặc lụa mờ': 160000, 'Ảnh gỗ Composite': 1050000, 'Ảnh gỗ Meka': 1150000, 'Bóc cạnh ghép nhựa': 100000 },
  ];

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <Header />
      <div className="w-full md:w-3/4 lg:w-3/4 lg:mt-4 mb-10">
        <div className="px-4 pt-4 pb-4 lg:pb-0 lg:px-0">
          <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6">
            <Link href={`${ROUTES.HOME}`} className="hover:text-black text-md">Trang chủ</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href={`${ROUTES.PRICE}`} className="hover:text-black text-md">Bảng giá</Link>
          </nav>
          <div className="space-y-4">
            <div className="space-y-20 mb-8">
              <div className='grid grid-cols-2 gap-4 w-full'>
                <div className='grid grid-cols-1'>
                  <div className='text-black font-bold text-2xl'>Tìm nhanh sản phẩm</div>
                  <div className='w-full'>
                    <div>
                      <Label htmlFor="name" className="text-[#484848] font-bold">
                        Tên sản phẩm
                      </Label>
                      <div className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full my-2">
                        <Select
                          value={selectedProduct}
                          onValueChange={setSelectedProduct}
                        >
                          <SelectTrigger>
                            {selectedProduct === "Chon san pham" ? "Chọn sản phẩm" : ""}
                            <SelectValue placeholder="Chọn sản phẩm" />
                          </SelectTrigger>
                          <SelectContent className="">
                            {products?.map((item: any, index: any) => (
                              <SelectItem
                                className="text-xs"
                                key={index}
                                value={String(item?._id)}
                              >
                                {item?.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="name" className="text-[#484848] font-bold">
                        Kích thước sản phẩm
                      </Label>
                      <div className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full my-2">
                        <Select
                          value={selectedSize}
                          onValueChange={setSelectedSize}
                        >
                          <SelectTrigger>
                            {selectedSize === "Chon kich thuoc" ? "Chọn Kích Thước" : ""}
                            <SelectValue placeholder="Chọn Kích Thước" />
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
                  <div>
                    <Label htmlFor="material" className="text-[#484848] font-bold">
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
                              ${selectedMaterial === material.id
                                ? "ring-2 ring-offset-2 ring-[rgb(var(--primary-rgb))] bg-[rgb(var(--primary-rgb))]"
                                : "ring-2 ring-offset-2 ring-gray-300"
                              }`}
                            onClick={() => setSelectedMaterial(material.id)}
                          ></button>
                          <div>{material.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className='grid grid-cols-2 gap-4 place-items-end'>
                    <Button

                      className="w-full py-2 lg:py-4 bg-[rgb(var(--primary-rgb))] hover:bg-[rgb(var(--secondary-rgb))] text-center rounded-md font-medium transition"
                    >
                      Tra cứu
                    </Button>
                    <div className='flex items-center gap-2'>
                      <span>Giá sản phẩm:</span>
                      <span>
                        {selectedProduct === "Chon san pham"
                          ? HELPER.formatVND('0')
                          :
                          HELPER.formatVND(
                            products.find(
                              (pro: any) => pro._id.toString() === selectedProduct
                            )?.price
                          )}
                      </span>
                    </div>
                  </div>
                </div>
                <Image
                  src="https://s3-alpha-sig.figma.com/img/7479/3b7c/552593d478f203548cca72b01b50b862?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=bQ5JxELqv2CgiAetbE-cxqZ6X3n3N~EWsuA4CWnttGkYIUWJl9H7iUg985vn4zCnMtdOfx0FUJVLPLIA3syaNI6WpSPnO0q8dV6DEAF8upH2qSPE2oLCOtqPeNQmZYkEUPGxd4ULGa0whwGNVC2IARSIM1Oow0yVl6GWkCaq7WjKMWw8z004M4hPManBarNEk98Y8cL7sVCafJKk5NXYte2-64qeKaan2xhJF16NFfNjzUd~RxKSuzAoHE5yj1AtlzohK-SrTRM6vcVGYcgD902vgpNgmYt99Z1Kmgm2-tARp3qPc66D1dxxG-WHOCXV~Zn25aY9j~vkfXxxQfe1PQ__"
                  alt="price-banner"
                  className='w-full'
                  width={1200} height={400}
                />
              </div>
              <div className='space-y-4 mt-8'>
                <h1 className="text-2xl font-bold text-navy-900">Bảng giá chi tiết</h1>
                <Card className='border-none shadow-none'>
                  <CardContent className='p-0'>
                    <Table>
                      <TableHeader className='bg-[#FFEFCB]'>
                        <TableRow>
                          <TableHead className='text-black'>Kích thước</TableHead>
                          <TableHead className='text-black'>In Ảnh</TableHead>
                          <TableHead className='text-black'>Phủ UV hoặc lụa mờ</TableHead>
                          <TableHead className='text-black'>Ép Plastic</TableHead>
                          <TableHead className='text-black'>Ảnh gỗ Composite</TableHead>
                          <TableHead className='text-black'>Ảnh gỗ Meka</TableHead>
                          <TableHead className='text-black'>Bóc cạnh ghép nhựa</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {priceData.map((item) => (
                          <TableRow key={item.size}>
                            <TableCell>{item.size}</TableCell>
                            <TableCell>{item.inAnh.toLocaleString()}</TableCell>
                            <TableCell>{item['Phủ UV hoặc lụa mờ'].toLocaleString()}</TableCell>
                            <TableCell>{item.inAnh.toLocaleString()}</TableCell>
                            <TableCell>{item['Ảnh gỗ Composite'].toLocaleString()}</TableCell>
                            <TableCell>{item['Ảnh gỗ Meka'].toLocaleString()}</TableCell>
                            <TableCell>{item['Bóc cạnh ghép nhựa'].toLocaleString()}</TableCell>
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