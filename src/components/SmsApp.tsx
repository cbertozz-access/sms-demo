'use client';

import { useState } from 'react';
import {
  SMS_TEMPLATES,
  SmsTemplateType,
  SmsTemplateData,
  mergeTemplate,
  countSmsSegments,
} from '@/lib/sms-templates';

type TabType = 'data' | 'templates' | 'send';

interface EquipmentItem {
  id: string;
  description: string;
  quantity: number;
}

export default function SmsApp() {
  const [activeTab, setActiveTab] = useState<TabType>('data');
  const [selectedTemplate, setSelectedTemplate] = useState<SmsTemplateType>('contract-ending');
  const [isSending, setIsSending] = useState(false);
  const [sendResult, setSendResult] = useState<{ success: boolean; message: string } | null>(null);

  // Customer data
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [contractId, setContractId] = useState('');
  const [contractEndDate, setContractEndDate] = useState('');

  // Equipment
  const [equipment, setEquipment] = useState<EquipmentItem[]>([
    { id: '', description: '', quantity: 1 },
  ]);

  // Extension data
  const [extensionEndDate, setExtensionEndDate] = useState('');
  const [extensionWeeks, setExtensionWeeks] = useState('');

  // Off-hire/Site data
  const [offHireDate, setOffHireDate] = useState('');
  const [offHireTime, setOffHireTime] = useState('');
  const [siteLocation, setSiteLocation] = useState('');
  const [siteContactName, setSiteContactName] = useState('');
  const [siteContactPhone, setSiteContactPhone] = useState('');
  const [siteOpenTime, setSiteOpenTime] = useState('');
  const [siteClosedTime, setSiteClosedTime] = useState('');
  const [siteNotes, setSiteNotes] = useState('');

  // Build item list string
  const itemList = equipment
    .filter((e) => e.description)
    .map((e) => `${e.quantity}x ${e.description}`)
    .join(', ');

  // Build template data
  const templateData: Partial<SmsTemplateData> = {
    customerName: customerName || '[Customer Name]',
    customerPhone,
    contractId: contractId || '[Contract ID]',
    itemCount: equipment.filter((e) => e.description).length || 1,
    itemList: itemList || '[Equipment List]',
    contractEndDate: contractEndDate || '[End Date]',
    offHireDate: offHireDate || '[Off-Hire Date]',
    offHireTime: offHireTime || '[Time]',
    extensionEndDate: extensionEndDate || '[New End Date]',
    extensionWeeks: extensionWeeks ? parseInt(extensionWeeks) : undefined,
    siteLocation: siteLocation || '[Site Location]',
    siteContactName: siteContactName || '[Contact Name]',
    siteContactPhone: siteContactPhone || '[Contact Phone]',
    siteOpenTime: siteOpenTime || '[Open Time]',
    siteClosedTime: siteClosedTime || '[Close Time]',
    siteNotes: siteNotes || '',
  };

  const previewMessage = mergeTemplate(selectedTemplate, templateData);
  const smsStats = countSmsSegments(previewMessage);

  const addEquipment = () => {
    setEquipment([...equipment, { id: '', description: '', quantity: 1 }]);
  };

  const removeEquipment = (index: number) => {
    if (equipment.length > 1) {
      setEquipment(equipment.filter((_, i) => i !== index));
    }
  };

  const updateEquipment = (index: number, field: keyof EquipmentItem, value: string | number) => {
    const updated = [...equipment];
    updated[index] = { ...updated[index], [field]: value };
    setEquipment(updated);
  };

  const handleSend = async () => {
    if (!customerPhone) {
      setSendResult({ success: false, message: 'Customer phone number is required' });
      return;
    }

    setIsSending(true);
    setSendResult(null);

    try {
      const response = await fetch('/api/send-sms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          templateType: selectedTemplate,
          phone: customerPhone,
          data: templateData,
          message: previewMessage,
        }),
      });

      const result = await response.json();
      setSendResult({
        success: result.success,
        message: result.success ? 'SMS sent successfully!' : result.error,
      });
    } catch (error) {
      setSendResult({
        success: false,
        message: error instanceof Error ? error.message : 'Failed to send',
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      {/* Header */}
      <header className="bg-[var(--color-header)] shadow-sm border-b border-[var(--color-border)]">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-[var(--color-header-foreground)]">
            Offhire SMS Notification
          </h1>
          <p className="text-sm text-[var(--color-muted-foreground)]">
            Access Group Internal Tool
          </p>
        </div>
      </header>

      {/* Tabs */}
      <div className="max-w-6xl mx-auto px-4 mt-6">
        <div className="flex border-b border-[var(--color-border)]">
          {[
            { id: 'data', label: 'Contract Data' },
            { id: 'templates', label: 'SMS Templates' },
            { id: 'send', label: 'Preview & Send' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-[var(--color-primary)] text-[var(--color-primary)]'
                  : 'border-transparent text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <main className="max-w-6xl mx-auto px-4 py-6">
        {/* DATA TAB */}
        {activeTab === 'data' && (
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Customer & Contract */}
            <div className="bg-[var(--color-card)] rounded-[var(--radius-lg)] p-6 border border-[var(--color-border)]">
              <h2 className="text-lg font-semibold text-[var(--color-foreground)] mb-4">
                Customer & Contract
              </h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-foreground)] mb-1">
                      Customer Name
                    </label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-3 py-2 border border-[var(--color-input)] rounded-[var(--radius-sm)] bg-[var(--color-background)] text-[var(--color-foreground)]"
                      placeholder="John Smith"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-foreground)] mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full px-3 py-2 border border-[var(--color-input)] rounded-[var(--radius-sm)] bg-[var(--color-background)] text-[var(--color-foreground)]"
                      placeholder="+61 400 000 000"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-foreground)] mb-1">
                      Contract ID
                    </label>
                    <input
                      type="text"
                      value={contractId}
                      onChange={(e) => setContractId(e.target.value)}
                      className="w-full px-3 py-2 border border-[var(--color-input)] rounded-[var(--radius-sm)] bg-[var(--color-background)] text-[var(--color-foreground)]"
                      placeholder="CON-12345"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-foreground)] mb-1">
                      Contract End Date
                    </label>
                    <input
                      type="date"
                      value={contractEndDate}
                      onChange={(e) => setContractEndDate(e.target.value)}
                      className="w-full px-3 py-2 border border-[var(--color-input)] rounded-[var(--radius-sm)] bg-[var(--color-background)] text-[var(--color-foreground)]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Equipment */}
            <div className="bg-[var(--color-card)] rounded-[var(--radius-lg)] p-6 border border-[var(--color-border)]">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-[var(--color-foreground)]">
                  Equipment ({equipment.filter((e) => e.description).length} items)
                </h2>
                <button
                  onClick={addEquipment}
                  className="text-sm text-[var(--color-primary)] hover:underline"
                >
                  + Add Item
                </button>
              </div>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {equipment.map((item, index) => (
                  <div key={index} className="flex gap-2 items-start">
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => updateEquipment(index, 'quantity', parseInt(e.target.value) || 1)}
                      className="w-16 px-2 py-2 border border-[var(--color-input)] rounded-[var(--radius-sm)] bg-[var(--color-background)] text-[var(--color-foreground)]"
                    />
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) => updateEquipment(index, 'description', e.target.value)}
                      className="flex-1 px-3 py-2 border border-[var(--color-input)] rounded-[var(--radius-sm)] bg-[var(--color-background)] text-[var(--color-foreground)]"
                      placeholder="Scissor Lift SL-200"
                    />
                    {equipment.length > 1 && (
                      <button
                        onClick={() => removeEquipment(index)}
                        className="text-[var(--color-error)] hover:text-[var(--color-error-hover)] p-2"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Extension Details */}
            <div className="bg-[var(--color-card)] rounded-[var(--radius-lg)] p-6 border border-[var(--color-border)]">
              <h2 className="text-lg font-semibold text-[var(--color-foreground)] mb-4">
                Extension Details
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--color-foreground)] mb-1">
                    New End Date
                  </label>
                  <input
                    type="date"
                    value={extensionEndDate}
                    onChange={(e) => setExtensionEndDate(e.target.value)}
                    className="w-full px-3 py-2 border border-[var(--color-input)] rounded-[var(--radius-sm)] bg-[var(--color-background)] text-[var(--color-foreground)]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--color-foreground)] mb-1">
                    Extension (weeks)
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={extensionWeeks}
                    onChange={(e) => setExtensionWeeks(e.target.value)}
                    className="w-full px-3 py-2 border border-[var(--color-input)] rounded-[var(--radius-sm)] bg-[var(--color-background)] text-[var(--color-foreground)]"
                    placeholder="2"
                  />
                </div>
              </div>
            </div>

            {/* Site/Off-Hire Details */}
            <div className="bg-[var(--color-card)] rounded-[var(--radius-lg)] p-6 border border-[var(--color-border)]">
              <h2 className="text-lg font-semibold text-[var(--color-foreground)] mb-4">
                Off-Hire / Site Details
              </h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-foreground)] mb-1">
                      Off-Hire Date
                    </label>
                    <input
                      type="date"
                      value={offHireDate}
                      onChange={(e) => setOffHireDate(e.target.value)}
                      className="w-full px-3 py-2 border border-[var(--color-input)] rounded-[var(--radius-sm)] bg-[var(--color-background)] text-[var(--color-foreground)]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-foreground)] mb-1">
                      Off-Hire Time
                    </label>
                    <input
                      type="time"
                      value={offHireTime}
                      onChange={(e) => setOffHireTime(e.target.value)}
                      className="w-full px-3 py-2 border border-[var(--color-input)] rounded-[var(--radius-sm)] bg-[var(--color-background)] text-[var(--color-foreground)]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--color-foreground)] mb-1">
                    Site Location
                  </label>
                  <input
                    type="text"
                    value={siteLocation}
                    onChange={(e) => setSiteLocation(e.target.value)}
                    className="w-full px-3 py-2 border border-[var(--color-input)] rounded-[var(--radius-sm)] bg-[var(--color-background)] text-[var(--color-foreground)]"
                    placeholder="123 Construction Site, Sydney NSW"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-foreground)] mb-1">
                      Site Contact Name
                    </label>
                    <input
                      type="text"
                      value={siteContactName}
                      onChange={(e) => setSiteContactName(e.target.value)}
                      className="w-full px-3 py-2 border border-[var(--color-input)] rounded-[var(--radius-sm)] bg-[var(--color-background)] text-[var(--color-foreground)]"
                      placeholder="Site Manager"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-foreground)] mb-1">
                      Site Contact Phone
                    </label>
                    <input
                      type="tel"
                      value={siteContactPhone}
                      onChange={(e) => setSiteContactPhone(e.target.value)}
                      className="w-full px-3 py-2 border border-[var(--color-input)] rounded-[var(--radius-sm)] bg-[var(--color-background)] text-[var(--color-foreground)]"
                      placeholder="+61 400 000 000"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-foreground)] mb-1">
                      Site Open Time
                    </label>
                    <input
                      type="time"
                      value={siteOpenTime}
                      onChange={(e) => setSiteOpenTime(e.target.value)}
                      className="w-full px-3 py-2 border border-[var(--color-input)] rounded-[var(--radius-sm)] bg-[var(--color-background)] text-[var(--color-foreground)]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-foreground)] mb-1">
                      Site Close Time
                    </label>
                    <input
                      type="time"
                      value={siteClosedTime}
                      onChange={(e) => setSiteClosedTime(e.target.value)}
                      className="w-full px-3 py-2 border border-[var(--color-input)] rounded-[var(--radius-sm)] bg-[var(--color-background)] text-[var(--color-foreground)]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--color-foreground)] mb-1">
                    Site Notes
                  </label>
                  <textarea
                    value={siteNotes}
                    onChange={(e) => setSiteNotes(e.target.value)}
                    rows={2}
                    className="w-full px-3 py-2 border border-[var(--color-input)] rounded-[var(--radius-sm)] bg-[var(--color-background)] text-[var(--color-foreground)]"
                    placeholder="Access via rear gate..."
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TEMPLATES TAB */}
        {activeTab === 'templates' && (
          <div className="space-y-6">
            {(Object.entries(SMS_TEMPLATES) as [SmsTemplateType, typeof SMS_TEMPLATES[SmsTemplateType]][]).map(
              ([type, template]) => {
                const preview = mergeTemplate(type, templateData);
                const stats = countSmsSegments(preview);

                return (
                  <div
                    key={type}
                    className={`bg-[var(--color-card)] rounded-[var(--radius-lg)] p-6 border-2 transition-colors ${
                      selectedTemplate === type
                        ? 'border-[var(--color-primary)]'
                        : 'border-[var(--color-border)]'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-[var(--color-foreground)]">
                          {template.name}
                        </h3>
                        <p className="text-sm text-[var(--color-muted-foreground)]">
                          {template.description}
                        </p>
                      </div>
                      <button
                        onClick={() => setSelectedTemplate(type)}
                        className={`px-4 py-2 rounded-[var(--radius)] text-sm font-medium transition-colors ${
                          selectedTemplate === type
                            ? 'bg-[var(--color-primary)] text-[var(--color-primary-foreground)]'
                            : 'bg-[var(--color-background-alt)] text-[var(--color-foreground)] hover:bg-[var(--color-border)]'
                        }`}
                      >
                        {selectedTemplate === type ? 'Selected' : 'Select'}
                      </button>
                    </div>

                    <div className="bg-[var(--color-background-alt)] rounded-[var(--radius)] p-4 mb-3">
                      <p className="text-sm text-[var(--color-foreground)] whitespace-pre-wrap">
                        {preview}
                      </p>
                    </div>

                    <div className="flex gap-4 text-xs text-[var(--color-muted-foreground)]">
                      <span>{stats.chars} characters</span>
                      <span>{stats.segments} SMS segment{stats.segments > 1 ? 's' : ''}</span>
                      <span>{stats.encoding}</span>
                    </div>
                  </div>
                );
              }
            )}

            {/* Merge Fields Reference */}
            <div className="bg-[var(--color-brand-50)] rounded-[var(--radius-lg)] p-6 border border-[var(--color-primary)]">
              <h3 className="font-semibold text-[var(--color-primary)] mb-3">
                Merge Fields Reference
              </h3>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="font-medium text-[var(--color-foreground)] mb-1">Customer</p>
                  <code className="text-xs text-[var(--color-muted-foreground)]">
                    {'{{customerName}}, {{contractId}}'}
                  </code>
                </div>
                <div>
                  <p className="font-medium text-[var(--color-foreground)] mb-1">Equipment</p>
                  <code className="text-xs text-[var(--color-muted-foreground)]">
                    {'{{itemCount}}, {{itemList}}'}
                  </code>
                </div>
                <div>
                  <p className="font-medium text-[var(--color-foreground)] mb-1">Dates</p>
                  <code className="text-xs text-[var(--color-muted-foreground)]">
                    {'{{contractEndDate}}, {{offHireDate}}, {{extensionEndDate}}'}
                  </code>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SEND TAB */}
        {activeTab === 'send' && (
          <div className="max-w-2xl mx-auto space-y-6">
            {/* Preview */}
            <div className="bg-[var(--color-card)] rounded-[var(--radius-lg)] p-6 border border-[var(--color-border)]">
              <h2 className="text-lg font-semibold text-[var(--color-foreground)] mb-2">
                Message Preview
              </h2>
              <p className="text-sm text-[var(--color-muted-foreground)] mb-4">
                Template: {SMS_TEMPLATES[selectedTemplate].name}
              </p>

              <div className="bg-[var(--color-background-alt)] rounded-[var(--radius)] p-4 mb-4">
                <p className="text-[var(--color-foreground)] whitespace-pre-wrap">{previewMessage}</p>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-[var(--color-muted-foreground)]">
                  {smsStats.chars} chars / {smsStats.segments} segment{smsStats.segments > 1 ? 's' : ''}
                </span>
                <span className="text-[var(--color-muted-foreground)]">
                  Encoding: {smsStats.encoding}
                </span>
              </div>
            </div>

            {/* Recipient */}
            <div className="bg-[var(--color-card)] rounded-[var(--radius-lg)] p-6 border border-[var(--color-border)]">
              <h2 className="text-lg font-semibold text-[var(--color-foreground)] mb-4">
                Recipient
              </h2>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-[var(--color-foreground)] mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full px-3 py-2 border border-[var(--color-input)] rounded-[var(--radius-sm)] bg-[var(--color-background)] text-[var(--color-foreground)]"
                    placeholder="+61 400 000 000"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-[var(--color-foreground)] mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    value={customerName}
                    readOnly
                    className="w-full px-3 py-2 border border-[var(--color-input)] rounded-[var(--radius-sm)] bg-[var(--color-background-alt)] text-[var(--color-muted-foreground)]"
                  />
                </div>
              </div>
            </div>

            {/* Result */}
            {sendResult && (
              <div
                className={`p-4 rounded-[var(--radius)] ${
                  sendResult.success
                    ? 'bg-[color-mix(in_srgb,var(--color-success)_15%,white)] border border-[var(--color-success)]'
                    : 'bg-[color-mix(in_srgb,var(--color-error)_15%,white)] border border-[var(--color-error)]'
                }`}
              >
                <p className={sendResult.success ? 'text-[var(--color-success)]' : 'text-[var(--color-error)]'}>
                  {sendResult.success ? '✓ ' : '✕ '}
                  {sendResult.message}
                </p>
              </div>
            )}

            {/* Send Button */}
            <button
              onClick={handleSend}
              disabled={isSending || !customerPhone}
              className={`w-full py-4 rounded-[var(--radius)] font-semibold text-lg transition-colors ${
                isSending || !customerPhone
                  ? 'bg-[var(--color-border)] text-[var(--color-muted-foreground)] cursor-not-allowed'
                  : 'bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-[var(--color-primary-foreground)]'
              }`}
            >
              {isSending ? 'Sending...' : 'Send SMS'}
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
