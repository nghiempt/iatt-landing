/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import Footer from "@/layout/footer";
import Header from "@/layout/header";
import { BlogService } from "@/services/blog";
import { HELPER } from "@/utils/helper";
import { ROUTES } from "@/utils/route";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function BlogDetailClient() {
  const { id } = useParams();
  const [blogs, setBlogs] = useState([] as any);
  const [currentData, setCurrentData] = useState<any | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleContent = () => {
    setIsExpanded((prev) => !prev);
  };

  const init = async () => {
    const res = await BlogService.getAll();
    if (res && res.data.length > 0) {
      setBlogs(res.data);
      const blog = res.data.find(
        (bg: any) => HELPER.getLastFourChars(bg._id) === id
      );
      setCurrentData(blog || null);
    }
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <Header />
      <div className="w-full md:w-3/4 lg:w-3/4 lg:mt-4 mb-10">
        <div className="w-full px-4 py-4 lg:px-0 flex flex-col justify-center items-start">
          <nav className="flex items-center gap-2 text-sm text-gray-600 mb-4">
            <Link href={`${ROUTES.HOME}`} className="hover:text-black text-md">
              Trang chủ
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link href={`${ROUTES.BLOG}`} className="hover:text-black text-md">
              Tin Tức
            </Link>
            <ChevronRight className="w-4 h-4" />
            <p className="hover:text-black truncate text-md">
              {currentData?.title?.slice(0, 20)}...
            </p>
          </nav>
          <h1 className="text-3xl font-bold text-navy-900 mb-3">
            {currentData?.title}
          </h1>
          <div className="mb-3">
            <p>
              Đăng bởi: {currentData?.author} -{" "}
              {HELPER.formatDate(currentData?.created_at)}
            </p>
          </div>
          <div className="w-full lg:w-1/2 h-full bg-pink-50 rounded-md mb-4">
            <Image
              src={currentData?.thumbnail || ""}
              alt="Products Banner"
              className="w-full h-full object-cover rounded-md"
              width={1000}
              height={0}
            />
          </div>
          <div className="w-full border-dashed border border-gray-500 bg-[rgb(var(--tertiary-rgb))] rounded-lg py-2 px-4 z-10">
            <div className="flex flex-row gap-2">
              <p className="font-semibold">Tóm tắt bài viết </p>
              <div className="text-sm" onClick={toggleContent}>
                {isExpanded ? "[Ẩn]" : "[Hiện]"}
              </div>
            </div>
            <div
              className={`mt-3 overflow-hidden transition-all duration-500 ease-in-out`}
              style={{
                maxHeight: isExpanded ? "1000px" : "0px",
                paddingBottom: isExpanded ? "10px" : "0px",
                paddingTop: isExpanded ? "10px" : "0px",
              }}
            >
              {isExpanded && (
                <div
                  dangerouslySetInnerHTML={{ __html: currentData?.content }}
                />
              )}
            </div>
          </div>
          <div className="w-full mt-4 pt-3 z-10">
            <div dangerouslySetInnerHTML={{ __html: currentData?.content }} />
          </div>
          <div className="w-full bg-white rounded-lg mt-10 py-4 z-10">
            <div className="font-semibold text-xl mb-4">BÀI VIẾT LIÊN QUAN</div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {blogs
                ?.filter(
                  (blog: any) => HELPER.getLastFourChars(blog?._id) !== id
                )
                ?.slice(0, 4)
                ?.map((blogs: any, index: any) => (
                  <div key={index}>
                    <Link
                      href={`${ROUTES.BLOG}/${HELPER.getLastFourChars(
                        blogs?._id
                      )}?b=${HELPER.convertSpacesToDash(blogs?.title)}`}
                    >
                      <div>
                        <Image
                          className="h-28 lg:h-48 object-cover rounded-lg"
                          src={blogs?.thumbnail || ""}
                          alt="image"
                          width={1000}
                          height={1000}
                        />
                      </div>
                      <div className="my-2">
                        <p className="font-bold text-[15px] leading-5 line-clamp-2">
                          {blogs?.title}
                        </p>
                      </div>
                      <div className="line-clamp-3 text-xs">
                        <div
                          dangerouslySetInnerHTML={{ __html: blogs?.content }}
                        />
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
  );
}
