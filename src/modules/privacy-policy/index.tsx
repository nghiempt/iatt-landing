'use client'

import React from 'react';
import Header from '@/layout/header';
import Footer from '@/layout/footer';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { ROUTES } from '@/utils/route';

export default function PrivacyPolicyClient() {
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
            <Link href={`${ROUTES.PRIVACY_POLICY}`} className="hover:text-black text-md">Chính sách bảo mật</Link>
          </nav>
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold text-navy-900">CHÍNH SÁCH BẢO MẬT</h1>
              <div className="bg-[rgb(var(--quaternary-rgb))] p-6 rounded-lg space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  Khi truy cập website INANHTRUCTUYEN.COM, quý khách đồng ý chấp nhận thực hiện những mô tả trong Chính sách bảo mật thông tin.
                  Nếu quý khách không đồng ý với các điều khoản của Chính sách này, vui lòng không sử dụng website của chúng tôi.
                  Chính sách này được đưa ra nhằm bảo vệ quyền lợi của quý khách khi sử dụng dịch vụ và mua hàng.
                </p>
                <div>
                  <h2 className="text-xl font-semibold">1. Mục đích và phạm vi thu thập thông tin</h2>
                  <p className="text-gray-700 leading-relaxed">
                    Việc thu thập dữ liệu trên website INANHTRUCTUYEN.COM bao gồm:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 leading-relaxed">
                    <li>Email</li>
                    <li>Số điện thoại</li>
                    <li>Địa chỉ khách hàng</li>
                    <li>Hình ảnh khách hàng</li>
                    <li>Thông tin thanh toán</li>
                  </ul>
                  <p className="text-gray-700 leading-relaxed">
                    Đây là các thông tin bắt buộc quý khách cần cung cấp khi sử dụng dịch vụ để chúng tôi thiết kế,
                    in ấn và liên hệ xác nhận, đảm bảo quyền lợi và hoàn thiện đơn hàng.
                  </p>
                </div>
                <div>
                  <h2 className="text-xl font-semibold">2. Phạm vi sử dụng thông tin</h2>
                  <p className="text-gray-700 leading-relaxed">
                    Chúng tôi sử dụng thông tin quý khách cung cấp để:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 leading-relaxed">
                    <li>Cung cấp hình ảnh cho công cụ AI để thực hiện chỉnh sửa.</li>
                    <li>Giao hàng tới địa chỉ do quý khách cung cấp.</li>
                    <li>Liên lạc và giải quyết trong những trường hợp đặc biệt.</li>
                    <li>Cung cấp thông tin cho các đơn vị vận chuyển nhằm giao nhận hàng hóa.</li>
                    <li>Khi cơ quan tư pháp có yêu cầu hợp pháp bao gồm: Viện kiểm sát, tòa án, công an điều tra.</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-semibold">3. Cam kết bảo mật thông tin cá nhân khách hàng</h2>
                  <ul className="list-disc list-inside text-gray-700 leading-relaxed">
                    <li>
                      Thông tin cá nhân của quý khách được chúng tôi cam kết bảo mật tuyệt đối,
                      không sử dụng hoặc cung cấp cho bên thứ 3 nếu không có sự đồng ý từ quý khách.
                    </li>
                    <li>
                      Thông tin có thể được cung cấp cho bên vận chuyển nhằm giao nhận hàng hóa
                      gồm: tên, địa chỉ, số điện thoại.
                    </li>
                  </ul>
                </div>
                <div>
                  <h2 className="text-xl font-semibold">4. Thời gian lưu trữ thông tin</h2>
                  <p className="text-gray-700 leading-relaxed">
                    Chúng tôi sẽ lưu trữ thông tin cá nhân của quý khách trong suốt quá trình cung cấp dịch vụ
                    hoặc cho đến khi quý khách yêu cầu hủy bỏ.
                  </p>
                </div>
                <div>
                  <h2 className="text-xl font-semibold">5. Địa chỉ đơn vị thu thập và quản lý thông tin cá nhân</h2>
                  <p className="text-gray-700 leading-relaxed">
                    Cơ sở kinh doanh IN ẢNH TRỰC TUYẾN
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    <strong>Địa chỉ:</strong> QLPH Tân Thành, Cà Mau <br />
                    <strong>Điện thoại:</strong> 0939.468.252
                  </p>
                </div>
                <div>
                  <h2 className="text-xl font-semibold">6. Phương tiện và công cụ để người dùng tiếp cận và chỉnh sửa dữ liệu cá nhân</h2>
                  <p className="text-gray-700 leading-relaxed">
                    Quý khách có thể thực hiện quyền kiểm tra, cập nhật, chỉnh sửa hoặc hủy bỏ thông tin cá nhân bằng cách:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 leading-relaxed">
                    <li>Truy cập website INANHTRUCTUYEN.COM.</li>
                    <li>
                      Liên hệ qua email hoặc địa chỉ liên lạc công bố trên website.
                    </li>
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
