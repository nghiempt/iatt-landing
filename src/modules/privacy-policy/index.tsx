'use client'
import React from 'react';
import Header from '@/layout/header';
import Footer from '@/layout/footer';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { ROUTES } from '@/utils/route';

export default function PrivacyPoicyClient() {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <Header />
      <div className="w-full md:w-3/4 lg:w-3/4 lg:mt-4">
        <div className="px-4 py-4 lg:px-0">
          <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6">
            <Link href={`${ROUTES.HOME}`} className="hover:text-black">Trang chủ</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href={`${ROUTES.ABOUT}`} className="hover:text-black">Giới thiệu</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href={`${ROUTES.PRIVACY_POLICY}`} className="hover:text-black">Chính sách bảo mật</Link>
          </nav>
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold text-navy-900">CHÍNH SÁCH BẢO MẬT</h1>
              <div className="bg-[rgb(var(--quaternary-rgb))] p-6 rounded-lg space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  Chúng tôi cung cấp dịch vụ hỗ trợ khách hàng tận tâm, luôn sẵn sàng giải đáp mọi thắc mắc của Quý khách. Qua việc sử dụng dịch vụ hỗ trợ của chúng tôi, Quý khách có thể dễ dàng liên lạc với đội ngũ chăm sóc khách hàng để nhận sự trợ giúp nhanh chóng và hiệu quả.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Mục tiêu của chúng tôi là cung cấp những giải pháp hỗ trợ tối ưu, giúp Quý khách giải quyết các vấn đề liên quan đến sản phẩm và dịch vụ của chúng tôi, đồng thời mang lại trải nghiệm người dùng tuyệt vời nhất.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Tất cả các yêu cầu và thông tin từ Quý khách sẽ được xử lý nhanh chóng và bảo mật tuyệt đối. Chúng tôi cam kết cung cấp dịch vụ hỗ trợ hiệu quả trong mọi tình huống.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Để yêu cầu hỗ trợ, Quý khách có thể liên hệ trực tiếp với chúng tôi qua các kênh liên lạc hoặc gửi yêu cầu hỗ trợ thông qua hệ thống trên website.
                </p>
                <div className="space-y-2">
                  <p className="font-medium">Một vài gợi ý cho nội dung chính sách bảo mật:</p>
                  <ul className="space-y-2 ml-5">
                    <li className="list-disc">Cách thức thu thập thông tin cá nhân</li>
                    <li className="list-disc">Mục đích sử dụng thông tin cá nhân</li>
                    <li className="list-disc">Phương thức bảo mật thông tin</li>
                    <li className="list-disc">Chính sách bảo mật giao dịch</li>
                    <li className="list-disc">Cơ sở pháp lý bảo mật thông tin</li>
                  </ul>
                </div>
                <p className="text-gray-700">
                  Quý khách có thể thay đổi hoặc cập nhật thông tin yêu cầu hỗ trợ của mình tại{' '}
                  <Link href="#" className="text-blue-600 hover:underline">đây</Link>
                  {' '}hoặc thêm các yêu cầu mới trong phần quản lý{' '}
                  <span className="font-medium">Dịch vụ hỗ trợ</span>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}