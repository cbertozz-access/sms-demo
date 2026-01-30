'use client';

import { useState } from 'react';

interface SMSTemplateEditorProps {
  value: string;
  onChange: (template: string) => void;
  availableMergeFields: string[];
}

const DEFAULT_TEMPLATES = [
  {
    name: 'Offhire Scheduled',
    template:
      'Hi {{customerName}}, your offhire for {{vehicleMake}} {{vehicleModel}} (Contract: {{contractId}}) is scheduled for {{returnDate}} at {{pickupLocation}}. Reply CONFIRM to proceed.',
  },
  {
    name: 'Offhire Reminder',
    template:
      'Reminder: {{customerName}}, your vehicle return is tomorrow. Please bring your {{vehicleMake}} {{vehicleModel}} to {{pickupLocation}} by end of day. Contract: {{contractId}}',
  },
  {
    name: 'Offhire Complete',
    template:
      'Thank you {{customerName}}! Your offhire is complete. Contract {{contractId}} has been closed. We hope to see you again soon.',
  },
];

export default function SMSTemplateEditor({
  value,
  onChange,
  availableMergeFields,
}: SMSTemplateEditorProps) {
  const [showMergeFields, setShowMergeFields] = useState(false);

  const insertMergeField = (field: string) => {
    const mergeTag = `{{${field}}}`;
    onChange(value + mergeTag);
    setShowMergeFields(false);
  };

  const loadTemplate = (template: string) => {
    onChange(template);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        SMS Template Editor
      </h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Quick Templates
        </label>
        <div className="flex flex-wrap gap-2">
          {DEFAULT_TEMPLATES.map((t) => (
            <button
              key={t.name}
              onClick={() => loadTemplate(t.template)}
              className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors"
            >
              {t.name}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Message Template
        </label>
        <div className="relative">
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            placeholder="Type your SMS message here. Use {{fieldName}} for merge fields."
          />
        </div>
      </div>

      <div className="relative">
        <button
          onClick={() => setShowMergeFields(!showMergeFields)}
          className="px-4 py-2 text-sm bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-md transition-colors"
        >
          + Insert Merge Field
        </button>

        {showMergeFields && (
          <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-200 rounded-md shadow-lg z-10">
            <div className="p-2">
              <p className="text-xs text-gray-500 mb-2">
                Click to insert a merge field:
              </p>
              {availableMergeFields.map((field) => (
                <button
                  key={field}
                  onClick={() => insertMergeField(field)}
                  className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded"
                >
                  <code className="text-blue-600">{`{{${field}}}`}</code>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
