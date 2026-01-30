'use client';

import { BuilderComponent, useIsPreviewing } from '@builder.io/react';
import { builder } from '@builder.io/sdk';
import './builder-registry';

// Initialize Builder
builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY || '');

interface BuilderContentProps {
  content: any;
  model: string;
  children?: React.ReactNode;
}

export function RenderBuilderContent({ content, model, children }: BuilderContentProps) {
  const isPreviewing = useIsPreviewing();

  // When in Builder's visual editor, always show BuilderComponent (even without content)
  // This allows drag-and-drop editing on new/empty pages
  if (isPreviewing) {
    return (
      <BuilderComponent
        content={content}
        model={model}
      />
    );
  }

  // If there's Builder content, render it
  if (content) {
    return (
      <BuilderComponent
        content={content}
        model={model}
      />
    );
  }

  // Otherwise show the fallback (React default page)
  return <>{children}</>;
}
