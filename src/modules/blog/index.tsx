/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useState } from "react";
import Header from "@/layout/header";
import Footer from "@/layout/footer";
import Link from "next/link";
import { Calendar, ChevronRight, Loader, PencilLine } from "lucide-react";
import { ROUTES } from "@/utils/route";
import { BlogService } from "@/services/blog";
import { GlobalComponent } from "@/components/global";
import { HELPER } from "@/utils/helper";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { IMAGES } from "@/utils/image";
import "../../styles/helper.css";

export default function BlogClient() {
  const [blogs, setBlogs] = useState([] as Blog[]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const renderBlog = async () => {
    const res = await BlogService.getAll();
    if (res && res.data.length > 0) {
      setBlogs(res.data);
      setIsLoading(false);
    }
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

  const sortedPosts = [...blogs].sort((a, b) => {
    const dateA = new Date(a.created_at.split("/").reverse().join("-"));
    const dateB = new Date(b.created_at.split("/").reverse().join("-"));
    return dateB.getTime() - dateA.getTime();
  });

  const recentPosts = sortedPosts.slice(0, 4);

  const featuredPost = recentPosts[0];

  const regularPosts = recentPosts.slice(1, 4);

  const init = async () => {
    renderBlog();
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
      <div className="container px-5 lg:px-8 pb-0 lg:pb-14 pt-2">
        <div className="pt-3 pb-0 lg:pb-0 lg:px-0">
          <nav className="flex items-center gap-2 text-sm text-gray-600 mb-2">
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
              Tin tức
            </Link>
          </nav>
          <h1 className="text-xl lg:text-3xl font-bold text-navy-900 pb-3">
            BÀI VIẾT MỚI NHẤT
          </h1>
          {isLoading ? (
            <div className="w-full flex justify-center items-center py-40">
              <Loader className="animate-spin" size={32} />
            </div>
          ) : (
            <>
              <Link
                href={`${ROUTES.BLOG}/${HELPER.getLastFourChars(
                  featuredPost?._id
                )}?b=${HELPER.convertSpacesToDash(featuredPost?.title)}`}
              >
                <Card className="cursor-pointer overflow-hidden mb-8">
                  {" "}
                  <div className="grid lg:hidden">
                    <GlobalComponent.BlogCard
                      key={1}
                      id={featuredPost?._id}
                      image={featuredPost?.thumbnail}
                      title={featuredPost?.title}
                      excerpt={featuredPost?.excerpt}
                      date={HELPER.formatDate(featuredPost?.created_at)}
                      author={featuredPost?.author}
                      isMain={true}
                    />
                  </div>
                  <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 gap-6 bg-white rounded-lg overflow-hidden shadow-sm">
                    <div className="relative h-auto">
                      <Image
                        src={featuredPost?.thumbnail}
                        alt={featuredPost?.title}
                        width={1000}
                        height={200}
                        objectFit="cover"
                        priority
                        className="rounded-lg"
                      />
                    </div>
                    <div className="p-4 md:px-6 lg:p-0 flex flex-col">
                      <div>
                        <h2 className="text-xl font-semibold mb-2">
                          <a className="text-gray-800 hover:text-gray-600">
                            {featuredPost?.title}
                          </a>
                        </h2>
                        <p className="text-gray-600 mb-4 line-clamp-2 lg:line-clamp-none">
                          {featuredPost?.excerpt}
                        </p>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="w-4 h-4" />
                        <span className="mr-3 ml-1">
                          {HELPER.formatDate(featuredPost?.created_at)}
                        </span>
                        <PencilLine className="w-4 h-4" />
                        <span className="ml-1">{featuredPost?.author}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {regularPosts.map((blog: any, index: any) => (
                  <Link
                    key={index}
                    href={`${ROUTES.BLOG}/${HELPER.getLastFourChars(
                      blog?._id
                    )}?b=${HELPER.convertSpacesToDash(blog?.title)}`}
                  >
                    <GlobalComponent.BlogCard
                      id={blog?._id}
                      image={blog?.thumbnail}
                      title={blog?.title}
                      excerpt={blog?.excerpt}
                      date={HELPER.formatDate(blog?.created_at)}
                      author={blog?.author}
                      isMain={true}
                    />
                  </Link>
                ))}
              </div>
              <h1 className="text-xl lg:text-3xl font-bold text-navy-900 pt-8 pb-4">
                TẤT CẢ BÀI VIẾT
              </h1>

              <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-x-6 lg:gap-y-2">
                {blogs?.map((blog: any, index: any) => (
                  <Link
                    key={index}
                    href={`${ROUTES.BLOG}/${HELPER.getLastFourChars(
                      blog?._id
                    )}?b=${HELPER.convertSpacesToDash(blog?.title)}`}
                  >
                    <div className="mb-6">
                      <GlobalComponent.BlogCard
                        key={index}
                        id={blog?._id}
                        image={blog?.thumbnail}
                        title={blog?.title}
                        excerpt={blog?.excerpt}
                        date={HELPER.formatDate(blog?.created_at)}
                        author={blog?.author}
                        isMain={true}
                      />
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
