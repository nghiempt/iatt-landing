import AppAlbumClient from "@/modules/app-album";
import React, { Suspense } from 'react';

export default function AppAlbum() {
  return (
    <Suspense fallback={<div>...</div>}>
      <AppAlbumClient />
    </Suspense>
  );
}
