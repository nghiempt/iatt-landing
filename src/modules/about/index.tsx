import React from 'react';
import Header from '@/layout/header';
import Footer from '@/layout/footer';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { ROUTES } from '@/utils/route';

export default function AboutClient() {
  return (
    <div className="w-full">
      <Header />
      <div id="body" className="max-w-4xl mx-auto px-4 py-4">
        <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <Link href={`${ROUTES.HOME}`} className="hover:text-black">Trang chủ</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href={`${ROUTES.ABOUT}`} className="hover:text-black">Giới thiệu</Link>
        </nav>
        <div className="space-y-4">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-navy-900">GIỚI THIỆU</h1>
            <div className="bg-[rgb(var(--quaternary-rgb))] p-6 rounded-lg space-y-4">
              <p className="text-gray-700 leading-relaxed">
                Trang giới thiệu giúp khách hàng hiểu rõ hơn về cửa hàng của bạn. Hãy cung cấp thông tin cụ thể về việc kinh doanh, về cửa hàng, thông tin liên hệ. Điều này sẽ giúp khách hàng cảm thấy tin tưởng khi mua hàng trên website của bạn.
              </p>
              <div className="space-y-2">
                <p className="font-medium">Một vài gợi ý cho nội dung trang Giới thiệu:</p>
                <ul className="space-y-2 ml-5">
                  <li className="list-disc">Bạn là ai</li>
                  <li className="list-disc">Giá trị kinh doanh của bạn là gì</li>
                  <li className="list-disc">Địa chỉ cửa hàng</li>
                  <li className="list-disc">Bạn đã kinh doanh trong ngành hàng này bao lâu rồi</li>
                  <li className="list-disc">Bạn kinh doanh ngành hàng online được bao lâu</li>
                  <li className="list-disc">Đội ngũ của bạn gồm những ai</li>
                  <li className="list-disc">Thông tin liên hệ</li>
                  <li className="list-disc">Liên kết đến các trang mạng xã hội (Twitter, Facebook)</li>
                </ul>
              </div>
              <p className="text-gray-700">
                Bạn có thể chỉnh sửa hoặc xoá bài viết này tại{' '}
                <Link href="#" className="text-blue-600 hover:underline">đây</Link>
                {' '}hoặc thêm những bài viết mới trong phần quản lý{' '}
                <span className="font-medium">Trang nội dung</span>.
              </p>
            </div>
          </div>
          <div className="space-y-4">
            {/* <h2 className="text-xl font-bold text-navy-900">Chính sách</h2> */}
            <ul className="space-y-2 bg-[rgb(var(--quaternary-rgb))] p-6 rounded-lg">
              <li>
                <Link href={`${ROUTES.PRIVACY_POLICY}`} className="font-semibold text-gray-700 hover:text-black">
                  CHÍNH SÁCH BẢO MẬT
                </Link>
              </li>
              {/* <li>
                <Link href={`${ROUTES.RETURN_POLICY}`} className="text-gray-700 hover:text-black">
                  Chính sách đổi trả
                </Link>
              </li>
              <li>
                <Link href={`${ROUTES.TERMS_OF_SERVICE}`} className="text-gray-700 hover:text-black">
                  Điều khoản dịch vụ
                </Link>
              </li> */}
              <li>
                <Link href={`${ROUTES.BUYING_GUIDE}`} className="font-semibold text-gray-700 hover:text-black">
                  HƯỚNG DẪN MUA HÀNG
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}