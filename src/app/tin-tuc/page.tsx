import BlogClient from "@/modules/blog";
import React, { Suspense } from 'react';

export default function Blog() {
  return (
    <Suspense fallback={<div>...</div>}>
      <BlogClient />
    </Suspense>
  );
}
