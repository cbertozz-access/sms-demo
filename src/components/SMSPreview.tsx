'use client';

import { ContractData } from '@/types/contract';

interface SMSPreviewProps {
  template: string;
  data: ContractData;
  onSend: () => void;
  isSending: boolean;
  sendResult?: { success: boolean; message: string } | null;
}

export default function SMSPreview({
  template,
  data,
  onSend,
  isSending,
  sendResult,
}: SMSPreviewProps) {
  // Replace merge fields with actual data
  const resolvedMessage = template.replace(/\{\{(\w+)\}\}/g, (match, field) => {
    return data[field] || match;
  });

  // Count characters (SMS segments are 160 chars for GSM-7, 70 for Unicode)
  const charCount = resolvedMessage.length;
  const hasUnicode = /[^\x00-\x7F]/.test(resolvedMessage);
  const segmentSize = hasUnicode ? 70 : 160;
  const segments = Math.ceil(charCount / segmentSize) || 1;

  // Check for unresolved merge fields
  const unresolvedFields = template.match(/\{\{(\w+)\}\}/g) || [];
  const stillUnresolved = unresolvedFields.filter((field) => {
    const fieldName = field.replace(/[{}]/g, '');
    return !data[fieldName];
  });

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">SMS Preview</h2>

      {/* Phone mockup */}
      <div className="max-w-xs mx-auto">
        <div className="bg-gray-900 rounded-3xl p-3 shadow-xl">
          <div className="bg-gray-100 rounded-2xl overflow-hidden">
            {/* Phone header */}
            <div className="bg-gray-200 px-4 py-2 flex items-center justify-between">
              <span className="text-xs text-gray-600">SMS Preview</span>
              <span className="text-xs text-gray-600">
                {data.customerPhone || 'No phone'}
              </span>
            </div>

            {/* Message area */}
            <div className="p-4 min-h-48 bg-white">
              {resolvedMessage ? (
                <div className="bg-blue-500 text-white p-3 rounded-2xl rounded-tr-sm max-w-[85%] ml-auto">
                  <p className="text-sm whitespace-pre-wrap">{resolvedMessage}</p>
                </div>
              ) : (
                <p className="text-gray-400 text-center text-sm">
                  Enter a message template to see preview
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-4 flex justify-center gap-6 text-sm">
        <div className="text-center">
          <span className="font-medium text-gray-700">{charCount}</span>
          <span className="text-gray-500 ml-1">characters</span>
        </div>
        <div className="text-center">
          <span className="font-medium text-gray-700">{segments}</span>
          <span className="text-gray-500 ml-1">
            segment{segments !== 1 ? 's' : ''}
          </span>
        </div>
        {hasUnicode && (
          <div className="text-center">
            <span className="text-amber-600 text-xs">Unicode detected</span>
          </div>
        )}
      </div>

      {/* Warnings */}
      {stillUnresolved.length > 0 && (
        <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-md">
          <p className="text-sm text-amber-800">
            <strong>Warning:</strong> Unresolved merge fields:{' '}
            {stillUnresolved.join(', ')}
          </p>
        </div>
      )}

      {/* Send result */}
      {sendResult && (
        <div
          className={`mt-4 p-3 rounded-md ${
            sendResult.success
              ? 'bg-green-50 border border-green-200'
              : 'bg-red-50 border border-red-200'
          }`}
        >
          <p
            className={`text-sm ${
              sendResult.success ? 'text-green-800' : 'text-red-800'
            }`}
          >
            {sendResult.success ? '✓ ' : '✗ '}
            {sendResult.message}
          </p>
        </div>
      )}

      {/* Send button */}
      <div className="mt-6">
        <button
          onClick={onSend}
          disabled={isSending || !data.customerPhone || !resolvedMessage}
          className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
            isSending || !data.customerPhone || !resolvedMessage
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {isSending ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Sending...
            </span>
          ) : (
            'Send SMS'
          )}
        </button>
      </div>
    </div>
  );
}
