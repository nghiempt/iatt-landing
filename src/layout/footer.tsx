import Image from 'next/image'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="w-full bg-gray-50 pt-12 pb-6 flex justify-center items-center">
      <div className="container !mx-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="space-y-4">
            <h3 className="text-md font-semibold text-gray-900">THÔNG TIN</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-600 hover:text-gray-900">Hỏi đáp</Link></li>
              <li><Link href="/" className="text-gray-600 hover:text-gray-900">Thông tin vận chuyển</Link></li>
              <li><Link href="/" className="text-gray-600 hover:text-gray-900">Hướng dẫn trực tiếp mua hàng trực tuyến</Link></li>
              <li><Link href="/" className="text-gray-600 hover:text-gray-900">Phương thức giao hàng COD</Link></li>
              <li><Link href="/" className="text-gray-600 hover:text-gray-900">Chính sách kiểm tra hàng hóa</Link></li>
              <li><Link href="/" className="text-gray-600 hover:text-gray-900">Chính sách đổi trả</Link></li>
              <li><Link href="/" className="text-gray-600 hover:text-gray-900">Điều khoản sử dụng</Link></li>
              <li><Link href="/" className="text-gray-600 hover:text-gray-900">Chính sách bảo mật</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-md font-semibold text-gray-900">IN ẢNH TRỰC TUYẾN</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-600 hover:text-gray-900">Trang chủ</Link></li>
              <li><Link href="/" className="text-gray-600 hover:text-gray-900">Về chúng tôi</Link></li>
              <li><Link href="/" className="text-gray-600 hover:text-gray-900">In ấn</Link></li>
              <li><Link href="/" className="text-gray-600 hover:text-gray-900">Khung ảnh</Link></li>
              <li><Link href="/" className="text-gray-600 hover:text-gray-900">Photobook</Link></li>
              <li><Link href="/" className="text-gray-600 hover:text-gray-900">Bảng giá</Link></li>
              <li><Link href="/" className="text-gray-600 hover:text-gray-900">Tin tức</Link></li>
              <li><Link href="/" className="text-gray-600 hover:text-gray-900">Liên hệ với chúng tôi</Link></li>
              <li><Link href="/" className="text-gray-600 hover:text-gray-900">Vị trí cửa hàng</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-md font-semibold text-gray-900">CÁC TỈNH THÀNH</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-600 hover:text-gray-900">TP. Hồ Chí Minh</Link></li>
              <li><Link href="/" className="text-gray-600 hover:text-gray-900">Cần Thơ</Link></li>
              <li><Link href="/" className="text-gray-600 hover:text-gray-900">Hà Nội</Link></li>
              <li><Link href="/" className="text-gray-600 hover:text-gray-900">Đà Nẵng</Link></li>
              <li><Link href="/" className="text-gray-600 hover:text-gray-900">Hải Phòng</Link></li>
              <li><Link href="/" className="text-gray-600 hover:text-gray-900">Nha Trang</Link></li>
              <li><Link href="/" className="text-gray-600 hover:text-gray-900">Vĩnh Long</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-md font-semibold text-gray-900">PHƯƠNG THỨC THANH TOÁN</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <Image src="https://cdn-icons-png.flaticon.com/128/7630/7630510.png" alt="Tiền mặt" width={24} height={24} />
                <span className="text-gray-600">Tiền mặt</span>
              </li>
              <li className="flex items-center space-x-2">
                <Image src="https://cdn-icons-png.flaticon.com/128/15953/15953021.png" alt="Chuyển khoản" width={24} height={24} />
                <span className="text-gray-600">Chuyển khoản</span>
              </li>
              <li className="flex items-center space-x-2">
                <Image src="https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png" alt="Momo" width={24} height={24} />
                <span className="text-gray-600">Momo</span>
              </li>
              <li className="flex items-center space-x-2">
                <Image src="https://cdn.haitrieu.com/wp-content/uploads/2022/10/Icon-VNPAY-QR.png" alt="VNPay" width={24} height={24} />
                <span className="text-gray-600">VNPay</span>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-md font-semibold text-gray-900">THEO DÕI CHÚNG TÔI</h3>
            <div className="flex space-x-4">
              <Link href="/" className="text-blue-600 hover:text-blue-700">
                <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/768px-Facebook_Logo_%282019%29.png" alt="alt" width={24} height={24} />
              </Link>
              <Link href="/" className="text-gray-900 hover:text-gray-700">
                <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Icon_of_Zalo.svg/2048px-Icon_of_Zalo.svg.png" alt="alt" width={24} height={24} />
              </Link>
              <Link href="/">
                <Image src="https://banner2.cleanpng.com/20231123/xjc/transparent-tiktok-logo-black-and-white-logo-tiktok-app-minima-minimalist-black-and-white-tiktok-app-1711004158896.webp" alt="alt" width={24} height={24} />
              </Link>
              <Link href="/">
                <Image src="https://tiemquatiko.com/wp-content/uploads/2022/08/shopee-circle-logo-design-shopping-bag-13.png" alt="alt" width={24} height={24} />
              </Link>
            </div>
            <div className="space-y-4 pt-4">
              <Image
                src="https://thietkevietnhat.com/wp-content/uploads/dmca-logo.png"
                alt="DMCA Protected"
                width={100}
                height={56}
              />
              <Image
                src="https://webmedia.com.vn/images/2021/09/logo-da-thong-bao-bo-cong-thuong-mau-xanh.png"
                alt="Đã thông báo Bộ Công Thương"
                width={120}
                height={56}
              />
            </div>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-gray-200">
          <div className="text-gray-600 text-sm">
            <p>Copyright © 2025 IN ẢNH TRỰC TUYẾN.</p>
            <p>Địa chỉ: Trần Văn Hoài, Ninh Kiều, Cần Thơ</p>
            <p>Thời gian làm việc: Cả tuần: 9:00 - 17:00</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer