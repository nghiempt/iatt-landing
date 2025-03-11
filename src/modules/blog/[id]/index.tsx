/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import Footer from "@/layout/footer";
import Header from "@/layout/header";
import { BlogService } from "@/services/blog";
import { HELPER } from "@/utils/helper";
import { IMAGES } from "@/utils/image";
import { ROUTES } from "@/utils/route";
import { Calendar, ChevronRight, Loader, PencilLine } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import "../../../styles/helper.css";

export default function BlogDetailClient() {
  const { id } = useParams();
  const [blogs, setBlogs] = useState([] as any);
  const [currentData, setCurrentData] = useState<any | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
      setIsLoading(false);
    }
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <div className="w-full flex flex-col justify-center items-center">
      {/* HELPER */}
      <label className="main top-[92%] lg:top-[60%] z-50">
        <svg
          width="30"
          height="30"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className=""
        >
          <path
            d="M5 18.3335H10C10.8841 18.3335 11.7319 18.6847 12.357 19.3098C12.9821 19.9349 13.3333 20.7828 13.3333 21.6668V26.6668C13.3333 27.5509 12.9821 28.3987 12.357 29.0239C11.7319 29.649 10.8841 30.0002 10 30.0002H8.33333C7.44928 30.0002 6.60143 29.649 5.97631 29.0239C5.35119 28.3987 5 27.5509 5 26.6668V18.3335ZM5 18.3335C5 16.3637 5.38799 14.4131 6.14181 12.5932C6.89563 10.7734 8.00052 9.11977 9.3934 7.72689C10.7863 6.33402 12.4399 5.22912 14.2597 4.4753C16.0796 3.72148 18.0302 3.3335 20 3.3335C21.9698 3.3335 23.9204 3.72148 25.7403 4.4753C27.5601 5.22912 29.2137 6.33402 30.6066 7.72689C31.9995 9.11977 33.1044 10.7734 33.8582 12.5932C34.612 14.4131 35 16.3637 35 18.3335M35 18.3335V26.6668C35 27.5509 34.6488 28.3987 34.0237 29.0239C33.3986 29.649 32.5507 30.0002 31.6667 30.0002H30C29.1159 30.0002 28.2681 29.649 27.643 29.0239C27.0179 28.3987 26.6667 27.5509 26.6667 26.6668V21.6668C26.6667 20.7828 27.0179 19.9349 27.643 19.3098C28.2681 18.6847 29.1159 18.3335 30 18.3335H35Z"
            stroke="white"
            stroke-width="3.33333"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M35 26.667V30.0003C35 31.7684 34.2976 33.4641 33.0474 34.7144C31.7971 35.9646 30.1014 36.667 28.3333 36.667H20"
            stroke="white"
            stroke-width="3.33333"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <input className="inp" type="checkbox" />
        <section className="menu-container">
          <Link
            href="#"
            target="_blank"
            className="menu-list bg-[#FFB413] flex flex-row gap-3 items-center justify-end w-2/3 -right-[46px]"
          >
            <p>Zalo</p>
            <div>
              <Image src={IMAGES.ZALO} alt="alt" width={25} height={25} />
            </div>
          </Link>
          <Link
            href="#"
            target="_blank"
            className="menu-list bg-[#FFB413] flex flex-row gap-3 items-center justify-end rounded-full"
          >
            <p>Messenger</p>
            <div>
              <Image src={IMAGES.MESSENGER} alt="alt" width={30} height={30} />
            </div>
          </Link>
          <Link
            href="#"
            target="_blank"
            className="menu-list bg-[#FFB413] flex flex-row gap-3 items-center justify-end w-[95%] -right-[7px]"
          >
            <p>Facebook</p>
            <div>
              <Image src={IMAGES.FACEBOOK} alt="alt" width={25} height={25} />
            </div>
          </Link>
        </section>
      </label>
      <div className="flex flex-col justify-center items-center w-full bg-[#F0F0F0] py-1 text-center text-[#A98F57] text-sm font-semibold">
        <span className="text-md font-light">Các phong cách</span>
        <span className="text-lg font-semibold">
          THIẾT KẾ ALBUM CƯỚI HOT NHẤT
        </span>
      </div>
      <Header />
      {isLoading ? (
        <div className="w-full flex justify-center items-center py-40">
          <Loader className="animate-spin" size={32} />
        </div>
      ) : (
        <div className="container px-5 lg:px-8 pb-2 lg:pb-14 pt-2">
          <div className="w-full pt-3 pb-4 lg:px-0 lg:pb-0 flex flex-col justify-center items-start">
            <nav className="flex items-center gap-2 text-sm text-gray-600 mb-2 lg:mb-0">
              <Link
                href={`${ROUTES.HOME}`}
                className="hover:text-[rgb(var(--primary-rgb))] text-md"
              >
                Trang chủ
              </Link>
              <ChevronRight className="w-4 h-4" />
              <Link
                href={`${ROUTES.BLOG}`}
                className="hover:text-[rgb(var(--primary-rgb))] text-md"
              >
                Tin Tức
              </Link>
              <ChevronRight className="w-4 h-4" />
              <p className="hover:text-[rgb(var(--primary-rgb))] text-md truncate text-md">
                {currentData?.title?.slice(0, 15)}...
              </p>
            </nav>
            <div className="w-full grid grid-cols-1 lg:grid-cols-12 items-start gap-3 lg:gap-20">
              <div className="mt-0 lg:mt-3 pt-0 pb-4 z-10 lg:col-span-8">
                <div className="text-sm lg:text-base mb-1">
                  <p>
                    Đăng bởi: {currentData?.author} -{" "}
                    {HELPER.formatDate(currentData?.created_at)}
                  </p>
                </div>
                <div>
                  <h1 className="text-2xl lg:text-3xl font-bold text-navy-900 mb-3">
                    {currentData?.title}
                  </h1>
                </div>
                <div className="w-full h-full bg-pink-50 rounded-md mb-4">
                  <Image
                    src={currentData?.thumbnail || ""}
                    alt="Products Banner"
                    className="object-cover rounded-lg"
                    width={1000}
                    height={500}
                  />
                </div>
                <div className="w-full mt-4 pt-3 z-10 text-justify">
                  <div
                    dangerouslySetInnerHTML={{ __html: currentData?.content }}
                  />
                </div>
              </div>
              <div className="w-full bg-white rounded-lg lg:mt-10 lg:py-4 z-10 lg:col-span-4">
                <Image
                  src="https://s3-alpha-sig.figma.com/img/9f8e/17f8/0d6b3369d3a841ae41f699ffbe191bbf?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=dQhpBYG6d3d0hXipXWeyelqAIhU6jhxM0dDJ5jdNIpq1ehjUS2X2RS1iSHWcQZkUGtYPmLgyX~Ouav~wFju4mF7fm7X80w~JbuRLZkp6Nx8h0nLiSwOYpsu7yvG2X~FdagZ4NzPv5ZI3DtL9nslmlcHPKDsx~lKEJcGA8Gbnn61scEtEIH7yZUi~pqiF7Wmb1vRYhplIeXHYUWOEWQG9Tr~x4WoOY3TVerdjniHI9vqxgErEwc97mMasvUmvLDYOPBQoOeHhkrn5f5f4hQN8mROTBokByXtyPjslx571PlmXdmwis7X8cL7tKqDRcZY09RQ6X0YEVRENBE9f5nYr8A__"
                  alt="Products Banner"
                  className="hidden lg:flex w-[400px] h-[140px] object-cover rounded-md mb-10 lg:mb-0"
                  width={400}
                  height={140}
                />
                <div className="font-semibold text-xl mb-4 mt-1">
                  BÀI VIẾT LIÊN QUAN
                </div>
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
                                className="h-[100px] object-cover rounded-lg"
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
                              <div className="flex flex-col lg:flex-row items-start lg:items-center text-sm text-gray-500 gap-2 lg:gap-4">
                                <div className="flex items-center gap-1">
                                  <Calendar className="w-4 h-4" />
                                  <span className="text-md ml-0.5">
                                    {HELPER.formatDate(blogs?.created_at)}
                                  </span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <PencilLine className="w-4 h-4" />
                                  <span className="text-md ml-0.5">
                                    {blogs?.author}
                                  </span>
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
      )}
      <Footer />
    </div>
  );
}
