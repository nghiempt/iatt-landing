import PriceClient from "@/modules/price";
import React, { Suspense } from 'react';

export default function Account() {
  return (
    <Suspense fallback={<div>...</div>}>
      <PriceClient />
    </Suspense>
  );
}
