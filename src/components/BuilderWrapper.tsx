'use client';

import { useEffect } from 'react';
import { builder } from '@builder.io/sdk';
import './builder-registry';

// Initialize Builder on client side
builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY || '');

export function BuilderWrapper({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // This ensures Builder SDK is initialized and components are registered
    // when the visual editor loads the preview
    if (typeof window !== 'undefined') {
      (window as any).builderReady = true;
    }
  }, []);

  return <>{children}</>;
}
