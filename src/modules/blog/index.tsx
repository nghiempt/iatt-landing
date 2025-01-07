/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import React, { useEffect, useState } from 'react';
import Header from '@/layout/header';
import Footer from '@/layout/footer';
import Link from 'next/link';
import { ChevronRight, Loader } from 'lucide-react';
import { ROUTES } from '@/utils/route';
import { BlogService } from '@/services/blog';
import { GlobalComponent } from '@/components/global';

export default function BlogClient() {

  const [blogs, setBlogs] = useState([] as any)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const renderBlog = async () => {
    const res = await BlogService.getAll()
    if (res && res.data.length > 0) {
      setBlogs(res.data)
      setIsLoading(false)
    }
  }

  const init = async () => {
    renderBlog()
  }

  useEffect(() => {
    init()
  }, [])

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <Header />
      <div className="w-full md:w-3/4 lg:w-3/4 lg:mt-4">
        <div className="px-4 py-4 lg:px-0">
          <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6">
            <Link href={`${ROUTES.HOME}`} className="hover:text-black">Trang chủ</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href={`${ROUTES.BLOG}`} className="hover:text-black">Tin tức</Link>
          </nav>
          <h1 className="text-3xl font-bold text-navy-900 mb-4">TIN TỨC</h1>
          {
            isLoading
              ?
              <div className="w-full flex justify-center items-center py-40">
                <Loader className="animate-spin" size={32} />
              </div>
              :
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 lg:gap-6">
                {
                  blogs?.map((blog: any, index: any) => (
                    <GlobalComponent.BlogCard
                      key={index}
                      id={blog?._id}
                      image={blog?.thumbnail}
                      title={blog?.title}
                      excerpt={blog?.excerpt}
                      date={blog?.date}
                      author={blog?.author}
                      isMain={true}
                    />
                  ))}
              </div>
          }
        </div>
      </div>
      <Footer />
    </div>
  );
}