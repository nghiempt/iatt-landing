import ProductClient from "@/modules/product";
import React, { Suspense } from 'react';

export default function Product() {
  return (
    <Suspense fallback={<div>...</div>}>
      <ProductClient />
    </Suspense>
  );
}
