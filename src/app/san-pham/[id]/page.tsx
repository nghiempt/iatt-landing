import ProductDetailClient from "@/modules/product/[id]";
import React, { Suspense } from 'react';

export default function ProductDetail() {
  return (
    <Suspense fallback={<div>...</div>}>
      <ProductDetailClient />
    </Suspense>
  );
}
