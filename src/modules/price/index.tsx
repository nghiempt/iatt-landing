import React from 'react';
import Header from '@/layout/header';
import Footer from '@/layout/footer';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { ROUTES } from '@/utils/route';
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

export default function PriceTable() {
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
      <div className="w-full md:w-3/4 lg:w-3/4 lg:mb-4 lg:mt-6">
        <div className="px-4 py-4 lg:px-0 lg:py-0">
          <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6">
            <Link href={`${ROUTES.HOME}`} className="hover:text-black">Trang chủ</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href={`${ROUTES.PRICE}`} className="hover:text-black">Bảng giá</Link>
          </nav>
          <div className="space-y-4">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold text-navy-900">BẢNG GIÁ DỊCH VỤ 2025</h1>
              <Card>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Kích thước</TableHead>
                        <TableHead>In Ảnh</TableHead>
                        <TableHead>Phủ UV hoặc lụa mờ</TableHead>
                        <TableHead>Ép Plastic</TableHead>
                        <TableHead>Ảnh gỗ Composite</TableHead>
                        <TableHead>Ảnh gỗ Meka</TableHead>
                        <TableHead>Bóc cạnh ghép nhựa</TableHead>
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
      <Footer />
    </div>
  );
}