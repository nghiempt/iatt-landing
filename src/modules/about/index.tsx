import React from 'react';
import Header from '@/layout/header';
import Footer from '@/layout/footer';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { ROUTES } from '@/utils/route';
import Image from 'next/image';

export default function AboutClient() {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <Header />
      <div className="w-full md:w-3/4 lg:w-3/4 lg:mb-4 lg:mt-6">
        <div className="px-4 py-4 lg:px-0 lg:py-0">
          <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6">
            <Link href={`${ROUTES.HOME}`} className="hover:text-black">Trang chủ</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href={`${ROUTES.ABOUT}`} className="hover:text-black">Giới thiệu</Link>
          </nav>
          <div className="space-y-4">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold text-navy-900">GIỚI THIỆU</h1>
              <div className="bg-[rgb(var(--quaternary-rgb))] p-6 rounded-lg space-y-4">
                <p className="text-gray-700 leading-relaxed font-bold">
                  Chào mừng bạn đến với INANHTRUCTUYEN.COM!
                </p>
                <div className="space-y-2">
                  <p className="leading-relaxed">
                    Tại INANHTRUCTUYEN.COM, chúng tôi thấu hiểu rằng những khoảnh khắc quan trọng trong cuộc đời không chỉ là dấu ấn của thời gian, mà còn là những cột mốc ý nghĩa trong hành trình sống của mỗi người. Cuộc đời được điểm tô bởi những dịp trọng đại, từ niềm hạnh phúc trọn vẹn trong ngày cưới, niềm tự hào của ngày ra trường, sự ấm áp của bữa tiệc thôi nôi bên gia đình, vẻ đẹp rực rỡ của thanh xuân thời thiếu nữ, đến những bức ảnh gia đình tràn đầy yêu thương, gắn kết qua từng thế hệ.
                  </p>
                  <p className="leading-relaxed">
                    Với niềm đam mê và chuyên môn trong thiết kế và gia công, chúng tôi tự hào mang đến những sản phẩm độc đáo, tinh tế, giúp bạn lưu giữ trọn vẹn những kỷ niệm quý giá. Dù là niềm vui, nỗi nhớ, hay tình cảm gia đình sâu sắc, chúng tôi tin rằng mỗi khoảnh khắc đều xứng đáng được trân trọng và được hiện diện theo cách đặc biệt nhất.
                  </p>
                </div>
                <p className="text-gray-700 leading-relaxed font-bold">
                  Dịch Vụ Nổi Bật Của Chúng Tôi
                </p>
                <Image
                  src="https://res.cloudinary.com/farmcode/image/upload/v1737354971/iatt/r7vb1upmjfvku6vcozs5.png"
                  alt="alt"
                  className={`w-full h-48 object-cover rounded-md`}
                  width={200}
                  height={200}
                  priority
                />
                <p className="text-gray-700 leading-relaxed font-bold">
                  Album Cưới, Tiệc
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Biến từng tấm ảnh cưới thành một câu chuyện đầy cảm xúc và ý nghĩa. Với đa dạng mẫu mã được tối ưu theo phong cách riêng của bạn – từ hiện đại, vintage, phong cách Hàn Quốc đến sự hòa quyện với thiên nhiên, chúng tôi mang đến những thiết kế album độc đáo, tinh tế. Đặc biệt, chất lượng hình ảnh luôn sắc nét, chống trầy xước, giúp bạn lưu giữ kỷ niệm một cách hoàn hảo.
                </p>
                <Image
                  src="https://res.cloudinary.com/farmcode/image/upload/v1737355066/iatt/fkgpmp7plmfvzizsaqpt.png"
                  alt="alt"
                  className={`w-full h-48 object-cover rounded-md`}
                  width={200}
                  height={200}
                  priority
                />
                <p className="text-gray-700 leading-relaxed font-bold">
                  Ảnh Ép Gỗ Khung Viền
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Mang đến sự lựa chọn hoàn hảo cho ảnh cổng cưới và tiệc với thiết kế hiện đại, phù hợp mọi không gian trang trí. Bộ sưu tập đa dạng, mẫu mã nỗi bật khung viền Titan sang trọng, Khung gõ cỗ điển, khung viền Hàn Quốc… hiện đại tinh tế. Từng sản phẩm đều được thiết kế để tôn lên vẻ đẹp của khoảnh khắc và hòa quyện với mọi bối cảnh trang trí.
                </p>
                <Image
                  src="https://res.cloudinary.com/farmcode/image/upload/v1737355071/iatt/wsedzbfnxoctzasn6a5c.png"
                  alt="alt"
                  className={`w-full h-48 object-cover rounded-md`}
                  width={200}
                  height={200}
                  priority
                />
                <p className="text-gray-700 leading-relaxed font-bold">
                  Ảnh Ép Plastic, Lụa
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Lưu giữ trọn vẹn vẻ đẹp thời gian với dịch vụ in ảnh ép Plastic và Lụa. Ảnh được in bằng máy in đời mới, đảm bảo độ sắc nét tuyệt đối và màu sắc bền đẹp trên 10 năm. Từng sản phẩm đều được in ấn tỉ mỉ, mang đến sự hài lòng tối đa và trở thành món quà ý nghĩa để lưu giữ những kỷ niệm của bạn.
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <ul className="space-y-2 bg-[rgb(var(--quaternary-rgb))] p-6 rounded-lg">
                <li>
                  <Link href={`${ROUTES.PRIVACY_POLICY}`} className="font-semibold text-gray-700 hover:text-black">
                    CHÍNH SÁCH BẢO MẬT
                  </Link>
                </li>
              </ul>
              <ul className="space-y-2 bg-[rgb(var(--quaternary-rgb))] p-6 rounded-lg">
                <li>
                  <Link href={`${ROUTES.PAYMENT}`} className="font-semibold text-gray-700 hover:text-black">
                    CHÍNH SÁCH GIAO HÀNG
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}