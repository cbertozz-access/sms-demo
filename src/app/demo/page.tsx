'use client';

import { ThemeProvider } from '@/components/ThemeProvider';
import ListUploader from '@/components/ListUploader';
import JourneyFlowchart from '@/components/JourneyFlowchart';

export default function DemoPage() {
  return (
    <ThemeProvider brandId="access-hire">
      <div className="min-h-screen bg-[var(--color-background)]">
        <header className="bg-[var(--color-header)] shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-[var(--color-header-foreground)]">
                  SMS Demo - Offhire Flow
                </h1>
                <p className="text-sm text-[var(--color-muted-foreground)] mt-1">
                  Upload offhire lists to Iterable for SMS notifications
                </p>
              </div>
              <a
                href="/"
                className="text-sm text-[var(--color-primary)] hover:text-[var(--color-primary-hover)]"
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
              <div className="mt-6 bg-[var(--color-brand-50)] border border-[var(--color-primary)] rounded-[var(--radius-lg)] p-4">
                <h3 className="font-medium text-[var(--color-primary)] mb-2">How it works</h3>
                <ol className="text-sm text-[var(--color-foreground)] space-y-2 list-decimal list-inside">
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
    </ThemeProvider>
  );
}
