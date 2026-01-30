'use client';

import React from 'react';
import { Builder } from '@builder.io/react';
import JourneyFlowchart from './JourneyFlowchart';
import ListUploader from './ListUploader';

// ============================================================================
// THEMED UI COMPONENTS (use CSS variables for multi-brand support)
// ============================================================================

// Hero Section Component
const ThemedHero = ({
  preTitle,
  title,
  highlightText,
  subtitle,
  primaryButtonText,
  primaryButtonLink,
  secondaryButtonText,
  secondaryButtonLink
}: {
  preTitle?: string;
  title: string;
  highlightText?: string;
  subtitle: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
}) => (
  <section className="py-16 md:py-24">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center">
        {preTitle && (
          <p
            className="text-sm font-medium uppercase tracking-wide mb-4"
            style={{ color: 'var(--color-primary, #2563eb)' }}
          >
            {preTitle}
          </p>
        )}
        <h1
          className="text-4xl md:text-5xl font-bold mb-6"
          style={{
            color: 'var(--color-foreground, #0f172a)',
            fontFamily: 'var(--font-heading, system-ui)'
          }}
        >
          {title}{' '}
          {highlightText && (
            <span style={{ color: 'var(--color-primary, #2563eb)' }}>
              {highlightText}
            </span>
          )}
        </h1>
        <p
          className="text-lg md:text-xl mb-8"
          style={{
            color: 'var(--color-muted-foreground, #64748b)',
            fontFamily: 'var(--font-body, system-ui)'
          }}
        >
          {subtitle}
        </p>
        {(primaryButtonText || secondaryButtonText) && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {primaryButtonText && (
              <a
                href={primaryButtonLink || '#'}
                className="px-8 py-4 rounded-lg font-semibold text-white transition-all hover:scale-105"
                style={{
                  backgroundColor: 'var(--color-primary, #2563eb)',
                  borderRadius: 'var(--radius, 8px)'
                }}
              >
                {primaryButtonText}
              </a>
            )}
            {secondaryButtonText && (
              <a
                href={secondaryButtonLink || '#'}
                className="px-8 py-4 rounded-lg font-semibold border-2 transition-all hover:scale-105"
                style={{
                  borderColor: 'var(--color-primary, #2563eb)',
                  color: 'var(--color-primary, #2563eb)',
                  borderRadius: 'var(--radius, 8px)'
                }}
              >
                {secondaryButtonText}
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  </section>
);

// Feature Card Component
const ThemedFeatureCard = ({
  title,
  description,
  iconType = 'upload'
}: {
  title: string;
  description: string;
  iconType?: 'upload' | 'clock' | 'check' | 'message' | 'building';
}) => {
  const icons: Record<string, React.ReactNode> = {
    upload: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />,
    clock: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />,
    check: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />,
    message: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />,
    building: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />,
  };

  return (
    <div
      className="p-6 rounded-xl transition-all hover:shadow-lg"
      style={{
        backgroundColor: 'var(--color-card, #ffffff)',
        border: '1px solid var(--color-border, #e2e8f0)',
        borderRadius: 'var(--radius-lg, 16px)'
      }}
    >
      <div
        className="w-14 h-14 rounded-lg flex items-center justify-center mb-4"
        style={{
          backgroundColor: 'var(--color-primary, #2563eb)',
          color: 'white'
        }}
      >
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          {icons[iconType] || icons.check}
        </svg>
      </div>
      <h4
        className="text-lg font-semibold mb-2"
        style={{
          color: 'var(--color-foreground, #0f172a)',
          fontFamily: 'var(--font-heading, system-ui)'
        }}
      >
        {title}
      </h4>
      <p style={{ color: 'var(--color-muted-foreground, #64748b)' }}>
        {description}
      </p>
    </div>
  );
};

// CTA Banner Component
const ThemedCTABanner = ({
  title,
  subtitle,
  buttonText,
  buttonLink
}: {
  title: string;
  subtitle?: string;
  buttonText: string;
  buttonLink?: string;
}) => (
  <section
    className="py-16"
    style={{ backgroundColor: 'var(--color-primary, #2563eb)' }}
  >
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h3
        className="text-2xl md:text-3xl font-bold text-white mb-4"
        style={{ fontFamily: 'var(--font-heading, system-ui)' }}
      >
        {title}
      </h3>
      {subtitle && (
        <p className="text-white/80 mb-8 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
      <a
        href={buttonLink || '#'}
        className="inline-block px-8 py-4 bg-white rounded-lg font-semibold transition-all hover:scale-105"
        style={{
          color: 'var(--color-primary, #2563eb)',
          borderRadius: 'var(--radius, 8px)'
        }}
      >
        {buttonText}
      </a>
    </div>
  </section>
);

// Info Box Component
const ThemedInfoBox = ({
  title,
  items = []
}: {
  title: string;
  items?: Array<{ item: string }> | string[];
}) => (
  <div
    className="p-6 rounded-lg"
    style={{
      backgroundColor: 'var(--color-brand-50, #eff6ff)',
      border: '1px solid var(--color-brand-200, #bfdbfe)',
      borderRadius: 'var(--radius, 8px)'
    }}
  >
    <h3
      className="font-semibold mb-3"
      style={{ color: 'var(--color-primary, #2563eb)' }}
    >
      {title}
    </h3>
    <ol
      className="list-decimal list-inside text-sm space-y-2"
      style={{ color: 'var(--color-foreground, #0f172a)' }}
    >
      {items.map((item, i) => (
        <li key={i}>{typeof item === 'string' ? item : item.item}</li>
      ))}
    </ol>
  </div>
);

// ============================================================================
// REGISTER ALL COMPONENTS WITH BUILDER
// ============================================================================

// Core functional components
Builder.registerComponent(JourneyFlowchart, {
  name: 'JourneyFlowchart',
  friendlyName: 'SMS Journey Flowchart',
  inputs: [
    {
      name: 'currentStep',
      type: 'string',
      enum: [
        'offhire-request',
        'scheduled-sms',
        'wait-confirmation',
        'wait-return',
        'reminder-sms',
        'vehicle-returned',
        'complete-sms',
        'complete',
      ],
      defaultValue: 'offhire-request',
    },
  ],
});

Builder.registerComponent(ListUploader, {
  name: 'ListUploader',
  friendlyName: 'CSV List Uploader',
  inputs: [],
});

// Themed UI components
Builder.registerComponent(ThemedHero, {
  name: 'ThemedHero',
  friendlyName: 'Hero Section',
  inputs: [
    { name: 'preTitle', type: 'string', helperText: 'Small text above the title' },
    { name: 'title', type: 'string', required: true, defaultValue: 'Welcome' },
    { name: 'highlightText', type: 'string', helperText: 'Highlighted part of title (in brand color)' },
    { name: 'subtitle', type: 'longText', required: true, defaultValue: 'Your subtitle here' },
    { name: 'primaryButtonText', type: 'string' },
    { name: 'primaryButtonLink', type: 'url' },
    { name: 'secondaryButtonText', type: 'string' },
    { name: 'secondaryButtonLink', type: 'url' },
  ],
});

Builder.registerComponent(ThemedFeatureCard, {
  name: 'ThemedFeatureCard',
  friendlyName: 'Feature Card',
  inputs: [
    { name: 'title', type: 'string', required: true, defaultValue: 'Feature Title' },
    { name: 'description', type: 'longText', required: true, defaultValue: 'Feature description here' },
    { name: 'iconType', type: 'string', enum: ['upload', 'clock', 'check', 'message', 'building'], defaultValue: 'check' },
  ],
});

Builder.registerComponent(ThemedCTABanner, {
  name: 'ThemedCTABanner',
  friendlyName: 'CTA Banner',
  inputs: [
    { name: 'title', type: 'string', required: true, defaultValue: 'Ready to get started?' },
    { name: 'subtitle', type: 'longText' },
    { name: 'buttonText', type: 'string', required: true, defaultValue: 'Get Started' },
    { name: 'buttonLink', type: 'url' },
  ],
});

Builder.registerComponent(ThemedInfoBox, {
  name: 'ThemedInfoBox',
  friendlyName: 'Info Box',
  inputs: [
    { name: 'title', type: 'string', required: true, defaultValue: 'How it works' },
    { name: 'items', type: 'list', subFields: [{ name: 'item', type: 'string' }], defaultValue: ['Step 1', 'Step 2', 'Step 3'] },
  ],
});
