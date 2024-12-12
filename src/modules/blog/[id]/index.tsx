'use client'

import Footer from "@/layout/footer"
import Header from "@/layout/header"
import { DATA } from "@/utils/data"
import { ROUTES } from "@/utils/route"
import { ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

interface BlogPost {
  id: number;
  image: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  slug: string;
  content: string;
}

interface Products {
  id: number;
  cate: number;
  title: string;
  image: {
    id: number;
    img: string;
    color: string;
    colorLabel: string;
  }[];
  price: string;
  rating: number;
  review: number;
  description: string;
  discount: string;
}

const products = DATA.PRODUCTS as Products[]
const posts = DATA.POSTS as BlogPost[]

export default function BlogDetailClient() {
  const [currentData, setCurrentData] = useState<BlogPost | null>(null);
  const { id } = useParams();
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (id) {
      const product = posts.find((pot) => pot.id.toString() === id);
      setCurrentData(product || null);
    }
  }, [id])

  const toggleContent = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className="w-full">
      <Header />
      <div id="body" className='w-full p-4 flex flex-col justify-center items-start'>
        <nav className="flex items-center gap-2 text-sm text-gray-600 mb-4">
          <Link href={`${ROUTES.HOME}`} className="hover:text-black">Trang chủ</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href={`${ROUTES.BLOG}`} className="hover:text-black">Tin Tức</Link>
          <ChevronRight className="w-4 h-4" />
          <p className="hover:text-black truncate">{currentData?.title?.slice(0, 20)}...</p>
        </nav>
        <h1 className="text-3xl font-bold text-navy-900 mb-3">{currentData?.title}</h1>
        <div className="mb-3">
          <p>Đăng bởi: {currentData?.author} - {currentData?.date}</p>
        </div>
        <div className="h-full bg-pink-50 rounded-md mb-6">
          <Image
            src={currentData?.image || ""}
            alt="Products Banner"
            className="w-full h-full object-cover rounded-md"
            width={400}
            height={0}
          />
        </div>
        <div className="w-full border-dashed border border-gray-500 bg-[rgb(var(--tertiary-rgb))] rounded-lg pt-1 pb-3 px-4 z-10">
          <div className="flex flex-row gap-2">
            <p className="font-semibold">Nội dung bài viết </p>
            <div className="text-sm" onClick={toggleContent}>
              {isExpanded ? '[Ẩn]' : '[Hiện]'}
            </div>
          </div>
          <div
            className={`mt-3 overflow-hidden transition-all duration-500 ease-in-out`}
            style={{
              maxHeight: isExpanded ? '1000px' : '0px',
              paddingBottom: isExpanded ? '10px' : '0px',
              paddingTop: isExpanded ? '10px' : '0px',
            }}
          >
            {isExpanded && currentData?.content}
          </div>
        </div>
        <div className="w-full bg-[rgb(var(--tertiary-rgb))] rounded-lg mt-5 pt-3 pb-3 px-4 z-10">
          <p>{currentData?.content}</p>
        </div>
        <div className="w-full bg-[rgb(var(--tertiary-rgb))] rounded-lg mt-5 pt-3 pb-3 px-4 z-10">
          <div className="font-semibold text-sm mb-5">Cùng chủ đề</div>
          <div className="grid grid-cols-2 gap-3">
            {posts?.slice(0, 2)?.map((pot, index) => (
              <div key={index}>
                <Link href={`${ROUTES.BLOG}/${pot?.id}`}>
                  <div>
                    <Image className="h-20 object-cover rounded-lg" src={pot?.image || ""} alt="image" width={1000} height={1000} />
                  </div>
                  <div className="my-2">
                    <p className="font-bold text-[15px] leading-5 line-clamp-2">{pot?.title}</p>
                  </div>

                  <div className="line-clamp-3 text-xs">
                    {pot?.content}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full bg-[rgb(var(--tertiary-rgb))] rounded-lg mt-5 pt-3 pb-3 px-4 z-10">
          <div className="font-semibold text-sm mb-5">Dành riêng cho bạn</div>
          {products?.slice(0, 2)?.map((pro, index) => (
            <div key={index}>
              <Link href={`${ROUTES.PRODUCT}/${pro.id}`}>
                <div className="grid grid-cols-12 gap-3 mb-5">
                  <div className="col-span-4 flex justify-center">
                    <Image className="w-20 h-20 object-cover" src={pro?.image[0]?.img} alt="relevant img" width={1000} height={1000} />
                  </div>
                  <div className="col-span-8">
                    <div className="flex items-center mb-1">
                      {[1, 2, 3, 4, 5]?.map((star) => (
                        <svg key={star} className="w-4 h-4 text-orange-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                      ))}
                      <span className="text-sm text-gray-500">(0 đánh giá)</span>
                    </div>
                    <div className="text-sm mb-1">{pro?.title}</div>
                    <div className="font-semibold text-sm mb-1">{pro?.price} đ</div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div >
  )
}