'use client';

import ListUploader from '@/components/ListUploader';
import JourneyFlowchart from '@/components/JourneyFlowchart';

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                SMS Demo - Offhire Flow
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Upload offhire lists to Iterable for SMS notifications
              </p>
            </div>
            <a
              href="/"
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              ← Back to Home
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left column - List uploader */}
          <div>
            <ListUploader />
          </div>

          {/* Right column - Journey flow */}
          <div>
            <JourneyFlowchart currentStep="offhire-request" />

            {/* Info box */}
            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-medium text-blue-800 mb-2">How it works</h3>
              <ol className="text-sm text-blue-700 space-y-2 list-decimal list-inside">
                <li>Upload a CSV with offhire customer data</li>
                <li>A new list is created in Iterable</li>
                <li>Users are upserted (existing users updated)</li>
                <li>Trigger SMS campaigns from Iterable using the list</li>
              </ol>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
