'use client';

import { BuilderComponent, useIsPreviewing } from '@builder.io/react';
import { builder } from '@builder.io/sdk';
import { ThemeProvider } from './ThemeProvider';
import './builder-registry';

// Initialize Builder
builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY || '');

interface BuilderContentProps {
  content: any;
  model: string;
  brandId?: string;
  children?: React.ReactNode;
}

export function RenderBuilderContent({ content, model, brandId, children }: BuilderContentProps) {
  const isPreviewing = useIsPreviewing();

  // Extract brand from Builder content data if not explicitly provided
  const effectiveBrandId = brandId || content?.data?.brand || 'access-hire';

  // When in Builder's visual editor, always show BuilderComponent (even without content)
  // This allows drag-and-drop editing on new/empty pages
  if (isPreviewing) {
    return (
      <ThemeProvider brandId={effectiveBrandId}>
        <BuilderComponent
          content={content}
          model={model}
        />
      </ThemeProvider>
    );
  }

  // If there's Builder content, render it
  if (content) {
    return (
      <ThemeProvider brandId={effectiveBrandId}>
        <BuilderComponent
          content={content}
          model={model}
        />
      </ThemeProvider>
    );
  }

  // Otherwise show the fallback (React default page) with theme
  return (
    <ThemeProvider brandId={effectiveBrandId}>
      {children}
    </ThemeProvider>
  );
}
