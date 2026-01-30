'use client';

import { BuilderComponent, useIsPreviewing } from '@builder.io/react';
import { builder } from '@builder.io/sdk';
import './builder-registry';

// Initialize Builder
builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY || '');

interface BuilderContentProps {
  content: any;
  model: string;
}

export function RenderBuilderContent({ content, model }: BuilderContentProps) {
  const isPreviewing = useIsPreviewing();

  if (!content && !isPreviewing) {
    return null;
  }

  return (
    <BuilderComponent
      content={content}
      model={model}
    />
  );
}
