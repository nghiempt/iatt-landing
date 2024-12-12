'use client'
import React, { useState } from 'react';
import Header from '@/layout/header';
import Footer from '@/layout/footer';
import Link from 'next/link';
import { Card } from "@/components/ui/card";
import { ChevronRight, Calendar, User } from 'lucide-react';
import Image from 'next/image';
import { ROUTES } from '@/utils/route';
import { DATA } from '@/utils/data';

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

const posts = DATA.POSTS as BlogPost[]

const BlogPostCard = ({ post }: { post: BlogPost }) => (
  <Card className="overflow-hidden">
    <Link href={`${ROUTES.BLOG}/${post.id}`}>
      <Image
        src={post.image}
        alt={post.title}
        className="w-full h-48 object-cover"
        width={400}
        height={200}
      />
    </Link>
    <div className="p-4 space-y-3">
      <h2 className="text-xl font-bold text-navy-900 hover:text-blue-600">
        <Link href={`${ROUTES.BLOG}/${post.id}`}>
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
  const [selectedCate, setSelectedCate] = useState<number>(1);

  const categories = [
    { title: "Tin tức", cate: 1 },
    { title: "Tin khuyến mãi", cate: 2 },
    { title: "Tin mới", cate: 3 },
    { title: "Tuyển dụng", cate: 4 },
  ];

  return (
    <div className="w-full">
      <Header />
      <div id="body" className="max-w-4xl mx-auto px-4 py-6">
        <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <Link href={`${ROUTES.HOME}`} className="hover:text-black">Trang chủ</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href={`${ROUTES.BLOG}`} className="hover:text-black">Tin tức</Link>
        </nav>
        <h1 className="text-3xl font-bold text-navy-900 mb-6">TIN TỨC</h1>
        <div className="flex flex-wrap gap-3 mb-8">
          {categories.map((category) => (
            selectedCate === category.cate ? (
              <div key={category.cate}>
                <button
                  className={`px-4 py-2 rounded-lg border border-dashed bg-[rgb(var(--primary-rgb))] text-white border-transparent`}
                >
                  {category.title}
                </button>
              </div>
            ) : (
              <div key={category.cate}>
                <button
                  onClick={() => setSelectedCate(category.cate)}
                  className={`px-4 py-2 rounded-lg border border-dashed border-[rgb(var(--primary-rgb))] text-[rgb(var(--primary-rgb))] hover:bg-[rgb(var(--primary-rgb))] hover:text-white`}
                >
                  {category.title}
                </button>
              </div>
            )
          ))}
        </div>
        <div className="grid gap-6">
          {posts.map((post) => (
            <BlogPostCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}