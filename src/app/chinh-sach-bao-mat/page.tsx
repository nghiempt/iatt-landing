import PrivacyPoicyClient from "@/modules/privacy-policy";
import React, { Suspense } from 'react';

export default function PrivacyPoicy() {
  return (
    <Suspense fallback={<div>...</div>}>
      <PrivacyPoicyClient />
    </Suspense>
  );
}
