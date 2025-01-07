/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import Footer from "@/layout/footer"
import Header from "@/layout/header"
import { BlogService } from "@/services/blog"
import { ROUTES } from "@/utils/route"
import { ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function BlogDetailClient() {

  const { id } = useParams();
  const [posts, setPosts] = useState([] as any)
  // const [isLoading, setIsLoading] = useState<boolean>(true)
  const [currentData, setCurrentData] = useState<any | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleContent = () => {
    setIsExpanded((prev) => !prev);
  };

  const init = async () => {
    const res = await BlogService.getAll()
    if (res && res.data.length > 0) {
      setPosts(res.data)
      const post = res.data.find((pot: any) => pot._id === id);
      setCurrentData(post || null);
      // setIsLoading(false)
    }
  }

  useEffect(() => {
    init()
  }, [])

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <Header />
      <div className="w-full md:w-3/4 lg:w-3/4 lg:mt-4">
        <div className='w-full px-4 py-4 lg:px-0 flex flex-col justify-center items-start'>
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
          <div className="h-full bg-pink-50 rounded-md mb-4">
            <Image
              src={currentData?.thumbnail || ""}
              alt="Products Banner"
              className="w-full h-full object-cover rounded-md"
              width={400}
              height={0}
            />
          </div>
          <div className="w-full border-dashed border border-gray-500 bg-[rgb(var(--tertiary-rgb))] rounded-lg py-2 px-4 z-10">
            <div className="flex flex-row gap-2">
              <p className="font-semibold">Tóm tắt bài viết </p>
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
          <div className="w-full bg-[rgb(var(--tertiary-rgb))] rounded-lg mt-4 pt-3 pb-3 px-4 z-10">
            <p>{currentData?.content}</p>
          </div>
          <div className="w-full bg-white rounded-lg mt-4 py-4 z-10">
            <div className="font-semibold text-md mb-4">BÀI VIẾT LIÊN QUAN</div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {posts?.slice(0, 2)?.map((pot: any, index: any) => (
                <div key={index}>
                  <Link href={`${ROUTES.BLOG}/${pot?._id}`}>
                    <div>
                      <Image className="h-28 object-cover rounded-lg" src={pot?.thumbnail || ""} alt="image" width={1000} height={1000} />
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
        </div>
      </div>
      <Footer />
    </div>
  )
}