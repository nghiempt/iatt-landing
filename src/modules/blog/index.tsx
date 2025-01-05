/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import React, { useEffect, useState } from 'react';
import Header from '@/layout/header';
import Footer from '@/layout/footer';
import Link from 'next/link';
import { Card } from "@/components/ui/card";
import { ChevronRight, Calendar, User, Loader } from 'lucide-react';
import Image from 'next/image';
import { ROUTES } from '@/utils/route';
import { BlogService } from '@/services/blog';

const BlogPostCard = ({ post }: { post: any }) => (
  <Card className="overflow-hidden">
    <Link href={`${ROUTES.BLOG}/${post._id}`}>
      <Image
        src={post.thumbnail}
        alt={post.title}
        className="w-full h-48 object-cover"
        width={400}
        height={200}
        priority
      />
    </Link>
    <div className="p-4 space-y-3">
      <h2 className="text-xl font-bold text-navy-900 hover:text-blue-600">
        <Link href={`${ROUTES.BLOG}/${post._id}`}>
          {post.title}
        </Link>
      </h2>
      <div className="flex items-center gap-4 text-sm text-gray-600">
        <div className="flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          <span>{post.date}</span>
        </div>
        <div className="flex items-center gap-1">
          <User className="w-4 h-4" />
          <span>{post.author}</span>
        </div>
      </div>
      <p className="text-gray-700 line-clamp-3">{post.excerpt}</p>
    </div>
  </Card>
);

export default function BlogClient() {

  const [posts, setPosts] = useState([] as any)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const renderBlog = async () => {
    const res = await BlogService.getAll()
    if (res && res.data.length > 0) {
      setPosts(res.data)
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
    <div className="w-full">
      <Header />
      <div id="body" className="max-w-4xl mx-auto px-4 py-4">
        <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <Link href={`${ROUTES.HOME}`} className="hover:text-black">Trang chủ</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href={`${ROUTES.BLOG}`} className="hover:text-black">Tin tức</Link>
        </nav>
        <h1 className="text-3xl font-bold text-navy-900 mb-4">TIN TỨC</h1>
        <div className="grid gap-6">
          {
            isLoading
              ?
              <div className="w-full flex justify-center items-center py-20">
                <Loader className="animate-spin" size={32} />
              </div>
              :
              posts?.map((post: any, index: any) => (
                <BlogPostCard key={index} post={post} />
              ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}