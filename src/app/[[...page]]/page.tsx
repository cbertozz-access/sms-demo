import { builder } from '@builder.io/sdk';
import { RenderBuilderContent } from '@/components/builder-content';
import Link from 'next/link';

// Initialize Builder with API key
builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY || '');

interface PageProps {
  params: Promise<{
    page?: string[];
  }>;
}

export default async function Page({ params }: PageProps) {
  const { page } = await params;
  const urlPath = '/' + (page?.join('/') || '');

  const content = await builder
    .get('page', {
      userAttributes: {
        urlPath,
      },
    })
    .toPromise();

  // Determine the fallback component based on URL
  let fallback = <NotFoundPage />;
  if (urlPath === '/') {
    fallback = <HomePage />;
  } else if (urlPath === '/offhire') {
    fallback = <OffhirePage />;
  }

  // Always render RenderBuilderContent - it handles preview mode and fallbacks
  return (
    <RenderBuilderContent content={content} model="page">
      {fallback}
    </RenderBuilderContent>
  );
}

// ============================================================================
// HOME PAGE - Hero, Features, CTA (Access Group Internal)
// ============================================================================
function HomePage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-background, #f8fafc)' }}>
      {/* Header */}
      <header style={{ backgroundColor: 'var(--color-header, #ffffff)' }} className="shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: 'var(--color-primary, #2563eb)' }}
            >
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <div>
              <h1
                className="text-xl font-bold"
                style={{
                  color: 'var(--color-header-foreground, #0f172a)',
                  fontFamily: 'var(--font-heading, system-ui)'
                }}
              >
                Offhire SMS
              </h1>
              <p
                className="text-sm"
                style={{ color: 'var(--color-muted-foreground, #64748b)' }}
              >
                Access Group Internal Tool
              </p>
            </div>
          </div>
          <nav className="flex items-center gap-4">
            <Link
              href="/demo"
              className="text-sm font-medium hover:underline"
              style={{ color: 'var(--color-primary, #2563eb)' }}
            >
              Demo
            </Link>
            <Link
              href="/offhire"
              className="text-sm font-medium hover:underline"
              style={{ color: 'var(--color-primary, #2563eb)' }}
            >
              Upload Tool
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <p
              className="text-sm font-medium uppercase tracking-wide mb-4"
              style={{ color: 'var(--color-primary, #2563eb)' }}
            >
              Access Group Internal
            </p>
            <h2
              className="text-4xl md:text-5xl font-bold mb-6"
              style={{
                color: 'var(--color-foreground, #0f172a)',
                fontFamily: 'var(--font-heading, system-ui)'
              }}
            >
              Offhire SMS{' '}
              <span style={{ color: 'var(--color-primary, #2563eb)' }}>
                Notification System
              </span>
            </h2>
            <p
              className="text-lg md:text-xl mb-8"
              style={{
                color: 'var(--color-muted-foreground, #64748b)',
                fontFamily: 'var(--font-body, system-ui)'
              }}
            >
              Automate customer communications for equipment returns across Access Hire,
              Access Express, and all Access Group brands. Upload customer lists and
              trigger SMS journeys through Iterable.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/offhire"
                className="px-8 py-4 rounded-lg font-semibold text-white transition-all hover:scale-105"
                style={{
                  backgroundColor: 'var(--color-primary, #2563eb)',
                  borderRadius: 'var(--radius, 8px)'
                }}
              >
                Upload Customer List
              </Link>
              <Link
                href="/demo"
                className="px-8 py-4 rounded-lg font-semibold border-2 transition-all hover:scale-105"
                style={{
                  borderColor: 'var(--color-primary, #2563eb)',
                  color: 'var(--color-primary, #2563eb)',
                  borderRadius: 'var(--radius, 8px)'
                }}
              >
                View Demo Journey
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section
        className="py-16"
        style={{ backgroundColor: 'var(--color-background-alt, #ffffff)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3
            className="text-2xl md:text-3xl font-bold text-center mb-12"
            style={{
              color: 'var(--color-foreground, #0f172a)',
              fontFamily: 'var(--font-heading, system-ui)'
            }}
          >
            How It Works
          </h3>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <FeatureCard
              icon={
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              }
              title="1. Upload CSV"
              description="Export offhire customer data from your system. Upload the CSV with customer name, mobile number, and equipment details."
            />

            {/* Feature 2 */}
            <FeatureCard
              icon={
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
              title="2. Trigger Journey"
              description="Customers are added to Iterable and enrolled in the SMS journey. Messages sent at scheduling, reminder, and completion stages."
            />

            {/* Feature 3 */}
            <FeatureCard
              icon={
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
              title="3. Track Returns"
              description="Monitor delivery status and customer responses in Iterable. Track equipment return confirmations in real-time."
            />
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="rounded-2xl p-8 md:p-12"
            style={{
              backgroundColor: 'var(--color-card, #ffffff)',
              border: '1px solid var(--color-border, #e2e8f0)',
              borderRadius: 'var(--radius-lg, 16px)'
            }}
          >
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <h3
                  className="text-2xl font-bold mb-4"
                  style={{
                    color: 'var(--color-foreground, #0f172a)',
                    fontFamily: 'var(--font-heading, system-ui)'
                  }}
                >
                  Multi-Brand Support
                </h3>
                <p
                  className="mb-6"
                  style={{ color: 'var(--color-muted-foreground, #64748b)' }}
                >
                  This tool supports all Access Group brands with automatic theming.
                  SMS content and branding adapts based on the selected brand, ensuring
                  consistent customer experience across the group.
                </p>
                <div className="flex flex-wrap gap-4">
                  <IntegrationBadge name="Access Hire" />
                  <IntegrationBadge name="Access Express" />
                  <IntegrationBadge name="BigChange" />
                  <IntegrationBadge name="Iterable" />
                </div>
              </div>
              <div
                className="w-full md:w-64 h-48 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: 'var(--color-background-alt, #f8fafc)' }}
              >
                <svg
                  className="w-24 h-24"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  style={{ color: 'var(--color-primary, #2563eb)' }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="py-16"
        style={{ backgroundColor: 'var(--color-primary, #2563eb)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3
            className="text-2xl md:text-3xl font-bold text-white mb-4"
            style={{ fontFamily: 'var(--font-heading, system-ui)' }}
          >
            Ready to Send Offhire Notifications?
          </h3>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Upload your customer list to start the SMS journey.
            Customers will receive automated notifications at each stage of the return process.
          </p>
          <Link
            href="/offhire"
            className="inline-block px-8 py-4 bg-white rounded-lg font-semibold transition-all hover:scale-105"
            style={{
              color: 'var(--color-primary, #2563eb)',
              borderRadius: 'var(--radius, 8px)'
            }}
          >
            Upload Customer List
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="py-8"
        style={{
          backgroundColor: 'var(--color-footer, #1e293b)',
          color: 'var(--color-footer-foreground, #f8fafc)'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm opacity-80">
              Access Group - Offhire SMS Notification System
            </p>
            <p className="text-sm opacity-60">
              Internal Tool - Powered by Iterable
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Feature Card Component
function FeatureCard({
  icon,
  title,
  description
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
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
        {icon}
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
}

// Integration Badge Component
function IntegrationBadge({ name }: { name: string }) {
  return (
    <span
      className="px-4 py-2 rounded-full text-sm font-medium"
      style={{
        backgroundColor: 'var(--color-background, #f8fafc)',
        color: 'var(--color-foreground, #0f172a)',
        border: '1px solid var(--color-border, #e2e8f0)'
      }}
    >
      {name}
    </span>
  );
}

// ============================================================================
// OFFHIRE PAGE - ListUploader + JourneyFlowchart
// ============================================================================
function OffhirePage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-background, #f8fafc)' }}>
      {/* Header */}
      <header style={{ backgroundColor: 'var(--color-header, #ffffff)' }} className="shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: 'var(--color-primary, #2563eb)' }}
              >
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <span
                className="text-xl font-bold"
                style={{
                  color: 'var(--color-header-foreground, #0f172a)',
                  fontFamily: 'var(--font-heading, system-ui)'
                }}
              >
                SMS Notifications
              </span>
            </Link>
          </div>
          <nav className="flex items-center gap-4">
            <Link
              href="/"
              className="text-sm font-medium hover:underline"
              style={{ color: 'var(--color-muted-foreground, #64748b)' }}
            >
              Home
            </Link>
            <Link
              href="/demo"
              className="text-sm font-medium hover:underline"
              style={{ color: 'var(--color-primary, #2563eb)' }}
            >
              Demo
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1
            className="text-3xl font-bold mb-2"
            style={{
              color: 'var(--color-foreground, #0f172a)',
              fontFamily: 'var(--font-heading, system-ui)'
            }}
          >
            Offhire Notification Tool
          </h1>
          <p style={{ color: 'var(--color-muted-foreground, #64748b)' }}>
            Upload customer lists and visualize the SMS notification journey.
          </p>
        </div>

        {/* Info Box */}
        <div
          className="p-4 rounded-lg mb-8"
          style={{
            backgroundColor: 'var(--color-brand-50, #eff6ff)',
            border: '1px solid var(--color-brand-200, #bfdbfe)',
            borderRadius: 'var(--radius, 8px)'
          }}
        >
          <h3
            className="font-semibold mb-2"
            style={{ color: 'var(--color-primary, #2563eb)' }}
          >
            How it works
          </h3>
          <ol
            className="list-decimal list-inside text-sm space-y-1"
            style={{ color: 'var(--color-foreground, #0f172a)' }}
          >
            <li>Upload a CSV file with customer contact details</li>
            <li>System validates and formats phone numbers</li>
            <li>Customers are added to Iterable with personalized data</li>
            <li>SMS notifications are triggered at each journey stage</li>
          </ol>
        </div>

        {/* Two Column Layout - Components loaded client-side */}
        <div className="grid lg:grid-cols-2 gap-8">
          <div
            className="p-6 rounded-xl"
            style={{
              backgroundColor: 'var(--color-card, #ffffff)',
              border: '1px solid var(--color-border, #e2e8f0)',
              borderRadius: 'var(--radius-lg, 16px)'
            }}
          >
            <h2
              className="text-xl font-semibold mb-4"
              style={{ color: 'var(--color-foreground, #0f172a)' }}
            >
              Upload Customer List
            </h2>
            <p
              className="text-sm mb-4"
              style={{ color: 'var(--color-muted-foreground, #64748b)' }}
            >
              Use the interactive demo to upload and process customer lists.
            </p>
            <Link
              href="/demo"
              className="inline-block px-6 py-3 rounded-lg font-medium text-white"
              style={{
                backgroundColor: 'var(--color-primary, #2563eb)',
                borderRadius: 'var(--radius, 8px)'
              }}
            >
              Open List Uploader
            </Link>
          </div>

          <div
            className="p-6 rounded-xl"
            style={{
              backgroundColor: 'var(--color-card, #ffffff)',
              border: '1px solid var(--color-border, #e2e8f0)',
              borderRadius: 'var(--radius-lg, 16px)'
            }}
          >
            <h2
              className="text-xl font-semibold mb-4"
              style={{ color: 'var(--color-foreground, #0f172a)' }}
            >
              SMS Journey Flow
            </h2>
            <p
              className="text-sm mb-4"
              style={{ color: 'var(--color-muted-foreground, #64748b)' }}
            >
              View the complete notification workflow in the demo.
            </p>
            <Link
              href="/demo"
              className="inline-block px-6 py-3 rounded-lg font-medium border-2"
              style={{
                borderColor: 'var(--color-primary, #2563eb)',
                color: 'var(--color-primary, #2563eb)',
                borderRadius: 'var(--radius, 8px)'
              }}
            >
              View Journey Flow
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer
        className="py-8 mt-auto"
        style={{
          backgroundColor: 'var(--color-footer, #1e293b)',
          color: 'var(--color-footer-foreground, #f8fafc)'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm opacity-60">
            SMS Demo - Offhire Notifications
          </p>
        </div>
      </footer>
    </div>
  );
}

// ============================================================================
// 404 NOT FOUND PAGE
// ============================================================================
function NotFoundPage() {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: 'var(--color-background, #f8fafc)' }}
    >
      <div className="text-center">
        <h1
          className="text-6xl font-bold mb-4"
          style={{ color: 'var(--color-primary, #2563eb)' }}
        >
          404
        </h1>
        <p
          className="text-xl mb-8"
          style={{ color: 'var(--color-muted-foreground, #64748b)' }}
        >
          Page not found
        </p>
        <Link
          href="/"
          className="px-6 py-3 rounded-lg font-medium text-white"
          style={{
            backgroundColor: 'var(--color-primary, #2563eb)',
            borderRadius: 'var(--radius, 8px)'
          }}
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
