'use client'
import React from 'react';
import Header from '@/layout/header';
import Footer from '@/layout/footer';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { ROUTES } from '@/utils/route';

export default function ShippingPaymentPolicy() {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <Header />
      <div className="w-full md:w-3/4 lg:w-3/4 lg:mt-4">
        <div className="px-4 py-4 lg:px-0">
          <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6">
            <Link href={`${ROUTES.HOME}`} className="hover:text-black text-md">Trang chủ</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href={`${ROUTES.ABOUT}`} className="hover:text-black text-md">Giới thiệu</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href={`${ROUTES.PAYMENT}`} className="hover:text-black text-md">Chính sách giao hàng</Link>
          </nav>
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold text-navy-900">Chính Sách Giao Hàng, Thanh Toán và Đổi Trả</h1>
              <div className="bg-[rgb(var(--quaternary-rgb))] p-6 rounded-lg space-y-6">
                {/* Shipping Policy */}
                <div>
                  <h2 className="text-xl font-semibold">I. Chính sách giao hàng</h2>
                  <p className="text-gray-700 leading-relaxed">
                    Sau khi khách hàng đặt hàng trên trang web INANHTRUCTUYEN.COM, hệ thống sẽ tự động gửi thông báo xác nhận đã đặt hàng.
                    Đội ngũ hỗ trợ của chúng tôi sẽ liên hệ với Quý khách qua số điện thoại mà Quý khách đã cung cấp để xác minh thông tin đơn hàng, thông báo chi phí vận chuyển, thời gian giao hàng dự kiến và các thông tin cần thiết khác.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Chúng tôi hỗ trợ giao hàng tận nơi trên toàn quốc.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    <strong>Thời gian giao hàng:</strong>
                  </p>
                  <ul className="list-disc list-inside text-gray-700 leading-relaxed">
                    <li>Nội thành TP.HCM: 1-2 ngày (không tính thứ 7, chủ nhật).</li>
                    <li>Các khu vực khác: 3-7 ngày (không tính thứ 7, chủ nhật và các ngày lễ).</li>
                  </ul>
                  <p className="text-gray-700 leading-relaxed">
                    <strong>Chi phí giao hàng:</strong>
                  </p>
                  <ul className="list-disc list-inside text-gray-700 leading-relaxed">
                    <li>Miễn phí vận chuyển cho đơn hàng từ ... VNĐ.</li>
                    <li>Phí ... VNĐ cho các đơn hàng dưới ... VNĐ.</li>
                  </ul>
                </div>

                {/* Payment Policy */}
                <div>
                  <h2 className="text-xl font-semibold">II. Chính sách thanh toán</h2>
                  <p className="text-gray-700 leading-relaxed">
                    Khách hàng có thể đặt hàng qua website hoặc liên hệ đường dây nóng: 0123456789.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    <strong>Phương thức thanh toán:</strong>
                  </p>
                  <ul className="list-disc list-inside text-gray-700 leading-relaxed">
                    <li>
                      Thanh toán khi nhận hàng: Quý khách thanh toán đầy đủ giá trị đơn hàng ngay sau khi kiểm tra hàng hóa.
                    </li>
                    <li>
                      Thanh toán chuyển khoản: <br />
                      - Tên tài khoản: [Tên tài khoản] <br />
                      - Số tài khoản: [Số tài khoản] <br />
                      - Ngân hàng: [Tên ngân hàng] <br />
                      - Chi nhánh: [Chi nhánh]
                    </li>
                  </ul>
                </div>

                {/* Return Policy */}
                <div>
                  <h2 className="text-xl font-semibold">III. Chính sách đổi trả</h2>
                  <p className="text-gray-700 leading-relaxed">
                    <strong>Lý do chấp nhận đổi trả:</strong>
                  </p>
                  <ul className="list-disc list-inside text-gray-700 leading-relaxed">
                    <li>Sản phẩm giao sai về số lượng, thông tin hoặc mẫu mã.</li>
                    <li>Sản phẩm bị hỏng do lỗi sản xuất hoặc trong quá trình vận chuyển.</li>
                  </ul>
                  <p className="text-gray-700 leading-relaxed">
                    <strong>Yêu cầu trả hàng:</strong>
                  </p>
                  <ul className="list-disc list-inside text-gray-700 leading-relaxed">
                    <li>Sản phẩm còn đóng gói nguyên vẹn.</li>
                    <li>Đầy đủ phụ kiện và quà tặng (nếu có).</li>
                    <li>Không có dấu hiệu đã qua sử dụng.</li>
                  </ul>
                  <p className="text-gray-700 leading-relaxed">
                    <strong>Thời gian đổi trả:</strong> Trong vòng 24h kể từ khi nhận hàng.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    <strong>Chi phí đổi trả:</strong>
                  </p>
                  <ul className="list-disc list-inside text-gray-700 leading-relaxed">
                    <li>Đối lỗi của chúng tôi: Miễn phí vận chuyển hai chiều.</li>
                    <li>Do nhu cầu của khách: Khách hàng thanh toán chi phí vận chuyển.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
