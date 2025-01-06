import BlogDetailClient from "@/modules/blog/[id]";
import React, { Suspense } from 'react';

export default function BlogDetail() {
  return (
    <Suspense fallback={<div>...</div>}>
      <BlogDetailClient />
    </Suspense>
  );
}
