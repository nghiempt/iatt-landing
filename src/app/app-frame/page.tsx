import AppFrameClient from "@/modules/app-frame";
import React, { Suspense } from 'react';

export default function AppFrame() {
  return (
    <Suspense fallback={<div>...</div>}>
      <AppFrameClient />
    </Suspense>
  );
}
