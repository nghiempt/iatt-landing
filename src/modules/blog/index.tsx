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
import Image from 'next/image';
import BannerSlider from "./components/slider";
import { Card } from "@/components/ui/card";

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
    const dateA = new Date(a.created_at.split('/').reverse().join('-'));
    const dateB = new Date(b.created_at.split('/').reverse().join('-'));
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
      <div className="w-full bg-black p-2.5 text-center text-white text-sm font-semibold">
        <span>IN ẢNH TRỰC TUYẾN - In ảnh nhanh chóng, tiện lợi</span>
      </div>
      <Header />
      <div className="container pb-20 pt-2">
        <div className="px-4 py-4 pb-10 lg:px-0">
          <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6">
            <Link href={`${ROUTES.HOME}`} className="hover:text-[rgb(var(--primary-rgb))] text-md">
              Trang chủ
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link href={`${ROUTES.BLOG}`} className="hover:text-[rgb(var(--primary-rgb))] text-md">
              Tin tức
            </Link>
          </nav>

          <BannerSlider />

          <h1 className="text-3xl font-bold text-navy-900 py-8">
            BÀI VIẾT MỚI NHẤT
          </h1>

          <Card onClick={() => window.location.href = `${ROUTES.BLOG}/${HELPER.getLastFourChars(featuredPost?._id)}?b=${HELPER.convertSpacesToDash(featuredPost?.title)}`} className="cursor-pointer overflow-hidden mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white rounded-lg overflow-hidden shadow-sm">
              <div className="relative h-64 md:h-auto">
                <Image
                  src={featuredPost?.thumbnail}
                  alt={featuredPost?.title}
                  width={1000}
                  height={200}
                  objectFit="cover"
                  priority
                />
              </div>
              <div className="p-4 md:p-6 flex flex-col ">
                <div>
                  <h2 className="text-xl font-semibold mb-2" >
                    <a className="text-gray-800 hover:text-gray-600">{featuredPost?.title}</a>
                  </h2>
                  <p className="text-gray-600 mb-4">{featuredPost?.excerpt}</p>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="w-4 h-4" />
                  <span className="mr-3">{HELPER.formatDate(featuredPost?.created_at)}</span>
                  <PencilLine className="w-4 h-4" />
                  <span>{featuredPost?.author}</span>
                </div>
              </div>
            </div>
          </Card>


          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {regularPosts.map((blog: any, index: any) => (
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
            ))}
          </div>
          <h1 className="text-3xl font-bold text-navy-900 py-8">
            TẤT CẢ BÀI VIẾT
          </h1>

          {isLoading ? (
            <div className="w-full flex justify-center items-center py-40">
              <Loader className="animate-spin" size={32} />
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-x-6 lg:gap-y-2">
              {blogs?.map((blog: any, index: any) => (
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
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
