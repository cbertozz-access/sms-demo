'use client';

import { useState } from 'react';
import ContractDataForm from '@/components/ContractDataForm';
import SMSTemplateEditor from '@/components/SMSTemplateEditor';
import SMSPreview from '@/components/SMSPreview';
import JourneyFlowchart from '@/components/JourneyFlowchart';
import { ContractData } from '@/types/contract';

const MERGE_FIELDS = [
  'customerName',
  'customerPhone',
  'contractId',
  'vehicleMake',
  'vehicleModel',
  'pickupDate',
  'returnDate',
  'pickupLocation',
];

export default function DemoPage() {
  const [contractData, setContractData] = useState<ContractData>({
    customerName: '',
    customerPhone: '',
    contractId: '',
    vehicleMake: '',
    vehicleModel: '',
    pickupDate: '',
    returnDate: '',
    pickupLocation: '',
  });

  const [template, setTemplate] = useState(
    'Hi {{customerName}}, your offhire for {{vehicleMake}} {{vehicleModel}} (Contract: {{contractId}}) is scheduled for {{returnDate}} at {{pickupLocation}}. Reply CONFIRM to proceed.'
  );

  const [isSending, setIsSending] = useState(false);
  const [sendResult, setSendResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const handleSend = async () => {
    setIsSending(true);
    setSendResult(null);

    // Replace merge fields in template
    const message = template.replace(/\{\{(\w+)\}\}/g, (match, field) => {
      return contractData[field as keyof ContractData] || match;
    });

    try {
      const response = await fetch('/api/send-sms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone: contractData.customerPhone,
          message,
          dataFields: contractData,
        }),
      });

      const result = await response.json();

      setSendResult({
        success: result.success,
        message: result.success
          ? 'SMS sent successfully!'
          : result.error || 'Failed to send SMS',
      });
    } catch (error) {
      setSendResult({
        success: false,
        message: error instanceof Error ? error.message : 'Network error',
      });
    } finally {
      setIsSending(false);
    }
  };

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
                Test the SMS notification flow for vehicle offhire
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column - Contract form */}
          <div className="lg:col-span-2 space-y-6">
            <ContractDataForm
              onDataChange={setContractData}
              initialData={contractData}
            />

            <SMSTemplateEditor
              value={template}
              onChange={setTemplate}
              availableMergeFields={MERGE_FIELDS}
            />
          </div>

          {/* Right column - Preview and Journey */}
          <div className="space-y-6">
            <SMSPreview
              template={template}
              data={contractData}
              onSend={handleSend}
              isSending={isSending}
              sendResult={sendResult}
            />

            <JourneyFlowchart currentStep="scheduled-sms" />
          </div>
        </div>
      </main>
    </div>
  );
}
