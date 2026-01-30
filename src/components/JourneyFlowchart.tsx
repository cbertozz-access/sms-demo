'use client';

interface JourneyStep {
  id: string;
  label: string;
  type: 'trigger' | 'action' | 'condition' | 'end';
  active?: boolean;
}

interface JourneyFlowchartProps {
  currentStep?: string;
}

const JOURNEY_STEPS: JourneyStep[] = [
  { id: 'offhire-request', label: 'Offhire Requested', type: 'trigger' },
  { id: 'scheduled-sms', label: 'Send Scheduled SMS', type: 'action' },
  { id: 'wait-confirmation', label: 'Wait for customer reply', type: 'condition' },
  { id: 'wait-return', label: 'Wait until day before return', type: 'condition' },
  { id: 'reminder-sms', label: 'Send Reminder SMS', type: 'action' },
  { id: 'vehicle-returned', label: 'Vehicle Returned', type: 'trigger' },
  { id: 'complete-sms', label: 'Send Completion SMS', type: 'action' },
  { id: 'complete', label: 'Offhire Complete', type: 'end' },
];

export default function JourneyFlowchart({ currentStep }: JourneyFlowchartProps) {
  const getStepStyles = (step: JourneyStep) => {
    const isActive = step.id === currentStep;
    const baseStyles = 'px-4 py-3 rounded-[var(--radius)] text-center transition-all';

    switch (step.type) {
      case 'trigger':
        return `${baseStyles} ${
          isActive
            ? 'bg-[var(--color-success)] text-white ring-2 ring-[var(--color-success)]'
            : 'bg-[color-mix(in_srgb,var(--color-success)_15%,white)] text-[var(--color-success)]'
        }`;
      case 'action':
        return `${baseStyles} ${
          isActive
            ? 'bg-[var(--color-primary)] text-[var(--color-primary-foreground)] ring-2 ring-[var(--color-ring)]'
            : 'bg-[var(--color-brand-50)] text-[var(--color-primary)]'
        }`;
      case 'condition':
        return `${baseStyles} ${
          isActive
            ? 'bg-[var(--color-warning)] text-white ring-2 ring-[var(--color-warning)]'
            : 'bg-[color-mix(in_srgb,var(--color-warning)_15%,white)] text-[var(--color-warning)]'
        }`;
      case 'end':
        return `${baseStyles} ${
          isActive
            ? 'bg-[var(--color-secondary)] text-[var(--color-secondary-foreground)] ring-2 ring-[var(--color-secondary)]'
            : 'bg-[var(--color-background-alt)] text-[var(--color-muted-foreground)]'
        }`;
      default:
        return baseStyles;
    }
  };

  const getIcon = (type: JourneyStep['type']) => {
    switch (type) {
      case 'trigger':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        );
      case 'action':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        );
      case 'condition':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'end':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  return (
    <div className="bg-[var(--color-card)] rounded-[var(--radius-lg)] shadow-md p-6">
      <h2 className="text-xl font-semibold text-[var(--color-foreground)] mb-4">
        Offhire SMS Journey
      </h2>

      <div className="flex flex-col items-center gap-2">
        {JOURNEY_STEPS.map((step, index) => (
          <div key={step.id} className="flex flex-col items-center w-full max-w-xs">
            <div className={`${getStepStyles(step)} w-full flex items-center justify-center gap-2`}>
              {getIcon(step.type)}
              <span className="text-sm font-medium">{step.label}</span>
            </div>

            {index < JOURNEY_STEPS.length - 1 && (
              <div className="h-6 w-0.5 bg-[var(--color-border)]" />
            )}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-6 pt-4 border-t border-[var(--color-border)]">
        <p className="text-xs text-[var(--color-muted-foreground)] mb-2">Legend:</p>
        <div className="flex flex-wrap gap-4 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-[var(--radius-sm)] bg-[color-mix(in_srgb,var(--color-success)_15%,white)]" />
            <span className="text-[var(--color-muted-foreground)]">Trigger</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-[var(--radius-sm)] bg-[var(--color-brand-50)]" />
            <span className="text-[var(--color-muted-foreground)]">Action</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-[var(--radius-sm)] bg-[color-mix(in_srgb,var(--color-warning)_15%,white)]" />
            <span className="text-[var(--color-muted-foreground)]">Wait</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-[var(--radius-sm)] bg-[var(--color-background-alt)]" />
            <span className="text-[var(--color-muted-foreground)]">End</span>
          </div>
        </div>
      </div>
    </div>
  );
}
