import AboutClient from "@/modules/about";
import React, { Suspense } from 'react';

export default function About() {
  return (
    <Suspense fallback={<div>...</div>}>
      <AboutClient />
    </Suspense>
  );
}
