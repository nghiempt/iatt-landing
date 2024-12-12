import AccountClient from "@/modules/account";
import React, { Suspense } from 'react';

export default function Account() {
  return (
    <Suspense fallback={<div>...</div>}>
      <AccountClient />
    </Suspense>
  );
}
