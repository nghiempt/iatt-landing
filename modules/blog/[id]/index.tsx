/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import Footer from "@/layout/footer";
import Header from "@/layout/header";
import { BlogService } from "@/services/blog";
import { HELPER } from "@/utils/helper";
import { ROUTES } from "@/utils/route";
import { Calendar, ChevronRight, PencilLine } from "lucide-react";
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

  interface Blog {
    _id: string;
    title: string;
    thumbnail: string;
    content: string;
    tag: string;
    author: string;
    excerpt: string;
    created_at: string;
  }

  const init = async () => {
    const res = await BlogService.getAll();
    if (res && res.data.length > 0) {
      setBlogs(res.data);
      const blog = res.data.find(
        (bg: Blog) => HELPER.getLastFourChars(bg._id) === id
      );
      setCurrentData(blog || null);
    }
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="w-full bg-black p-2.5 text-center text-white text-sm font-semibold">
        <span>IN ẢNH TRỰC TUYẾN - In ảnh nhanh chóng, tiện lợi</span>
      </div>
      <Header />
      <div className="container pb-20 pt-2">
        <div className="w-full px-4 py-4 lg:px-0 flex flex-col justify-center items-start">
          <nav className="flex items-center gap-2 text-sm text-gray-600 mb-4">
            <Link href={`${ROUTES.HOME}`} className="hover:text-[rgb(var(--primary-rgb))] text-md">
              Trang chủ
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link href={`${ROUTES.BLOG}`} className="hover:text-[rgb(var(--primary-rgb))] text-md">
              Tin Tức
            </Link>
            <ChevronRight className="w-4 h-4" />
            <p className="hover:text-[rgb(var(--primary-rgb))] text-md truncate text-md">
              {currentData?.title?.slice(0, 20)}...
            </p>
          </nav>
          <div className="w-full grid grid-cols-12 items-start gap-20">
            <div className="mt-10 py-4 z-10 col-span-8 border-b border-gray-300">
              <div className="mb-3">
                <p>
                  Đăng bởi: {currentData?.author} -{" "}
                  {HELPER.formatDate(currentData?.created_at)}
                </p>
              </div>
              <h1 className="text-3xl font-bold text-navy-900 mb-3">
                {currentData?.title}
              </h1>

              <div className="w-full  h-full bg-pink-50 rounded-md mb-4">
                <Image
                  src={currentData?.thumbnail || ""}
                  alt="Products Banner"
                  className=" object-cover rounded-md"
                  width={1000}
                  height={500}
                />
              </div>
              <div className="w-full mt-4 pt-3 z-10">
                <div dangerouslySetInnerHTML={{ __html: currentData?.content }} />
              </div>
            </div>

            <div className="w-full bg-white rounded-lg mt-10 py-4 z-10 col-span-4">
              <Image
                src="https://s3-alpha-sig.figma.com/img/9f8e/17f8/0d6b3369d3a841ae41f699ffbe191bbf?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=dQhpBYG6d3d0hXipXWeyelqAIhU6jhxM0dDJ5jdNIpq1ehjUS2X2RS1iSHWcQZkUGtYPmLgyX~Ouav~wFju4mF7fm7X80w~JbuRLZkp6Nx8h0nLiSwOYpsu7yvG2X~FdagZ4NzPv5ZI3DtL9nslmlcHPKDsx~lKEJcGA8Gbnn61scEtEIH7yZUi~pqiF7Wmb1vRYhplIeXHYUWOEWQG9Tr~x4WoOY3TVerdjniHI9vqxgErEwc97mMasvUmvLDYOPBQoOeHhkrn5f5f4hQN8mROTBokByXtyPjslx571PlmXdmwis7X8cL7tKqDRcZY09RQ6X0YEVRENBE9f5nYr8A__"
                alt="Products Banner"
                className="w-[400px] h-[140px] object-cover rounded-md"
                width={400}
                height={140}
              />
              <div className="font-semibold text-xl my-4">BÀI VIẾT LIÊN QUAN</div>
              <div className="grid grid-flow-col grid-rows-4 gap-4">
                {blogs
                  ?.filter(
                    (blog: any) => HELPER.getLastFourChars(blog?._id) !== id
                  )
                  ?.slice(0, 4)
                  ?.map((blogs: Blog, index: any) => (
                    <div key={index}>
                      <Link
                        href={`${ROUTES.BLOG}/${HELPER.getLastFourChars(
                          blogs?._id
                        )}?b=${HELPER.convertSpacesToDash(blogs?.title)}`}
                      >
                        <div className="grid grid-cols-12 gap-6">
                          <div className="col-span-4">
                            <Image
                              className="h-28 object-cover rounded-lg"
                              src={blogs?.thumbnail || ""}
                              alt="image"
                              width={400}
                              height={200}
                            />
                          </div>
                          <div className="flex flex-col justify-between col-span-8">
                            <div className="">
                              <p className="font-bold text-[15px] leading-5 line-clamp-2">
                                {blogs?.title}
                              </p>
                            </div>
                            <div className="flex items-center text-sm text-gray-500 gap-4">
                              <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                <span className='text-md'>{HELPER.formatDate(blogs?.created_at)}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <PencilLine className="w-4 h-4" />
                                <span className='text-md'>{blogs?.author}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
              </div>
            </div>
          </div>


        </div>
      </div>
      <Footer />
    </div>
  );
}
