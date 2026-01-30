'use client';

import { ThemeProvider } from '@/components/ThemeProvider';
import SmsApp from '@/components/SmsApp';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function DemoContent() {
  const searchParams = useSearchParams();
  const brand = searchParams.get('brand') || 'access-hire';

  return (
    <ThemeProvider brandId={brand}>
      <SmsApp />
    </ThemeProvider>
  );
}

export default function DemoPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <DemoContent />
    </Suspense>
  );
}
