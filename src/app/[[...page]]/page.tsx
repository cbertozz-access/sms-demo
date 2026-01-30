import { builder } from '@builder.io/sdk';
import { RenderBuilderContent } from '@/components/builder-content';

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

  // If no Builder content, show default SMS demo page
  if (!content) {
    return <DefaultSMSDemo />;
  }

  return <RenderBuilderContent content={content} model="page" />;
}

// Default page when no Builder.io content exists
function DefaultSMSDemo() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900">
            SMS Demo - Offhire Notifications
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Builder.io + Vercel + Iterable
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8">
          <h2 className="font-medium text-amber-800">Setup Required</h2>
          <p className="text-sm text-amber-700 mt-1">
            To use this demo, configure the following environment variables:
          </p>
          <ul className="text-sm text-amber-700 mt-2 list-disc list-inside">
            <li>
              <code className="bg-amber-100 px-1 rounded">NEXT_PUBLIC_BUILDER_API_KEY</code> - Your Builder.io public API key
            </li>
            <li>
              <code className="bg-amber-100 px-1 rounded">ITERABLE_API_KEY</code> - Your Iterable API key
            </li>
            <li>
              <code className="bg-amber-100 px-1 rounded">AUTH_USER</code> / <code className="bg-amber-100 px-1 rounded">AUTH_PASSWORD</code> - Basic auth credentials
            </li>
          </ul>
        </div>

        <div className="text-center py-12">
          <p className="text-gray-600">
            Create a page in Builder.io or use the interactive demo below.
          </p>
          <a
            href="/demo"
            className="inline-block mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go to Interactive Demo
          </a>
        </div>
      </main>
    </div>
  );
}
