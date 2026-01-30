'use client';

import { useState, useRef } from 'react';

interface UserRow {
  email: string;
  phone: string;
  customerName?: string;
  contractId?: string;
  vehicleMake?: string;
  vehicleModel?: string;
  pickupLocation?: string;
  returnDate?: string;
}

interface UploadResult {
  success: boolean;
  message: string;
  listId?: number;
}

export default function ListUploader() {
  const [listName, setListName] = useState('');
  const [users, setUsers] = useState<UserRow[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [result, setResult] = useState<UploadResult | null>(null);
  const [parseError, setParseError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const generateListName = () => {
    const date = new Date().toISOString().split('T')[0];
    const time = new Date().toTimeString().split(' ')[0].replace(/:/g, '');
    return `Offhire_${date}_${time}`;
  };

  const parseCSV = (text: string): UserRow[] => {
    const lines = text.trim().split('\n');
    if (lines.length < 2) {
      throw new Error('CSV must have a header row and at least one data row');
    }

    const headers = lines[0].split(',').map((h) => h.trim().toLowerCase());

    const emailIndex = headers.findIndex((h) => h === 'email');
    const phoneIndex = headers.findIndex((h) => h === 'phone');

    if (emailIndex === -1) {
      throw new Error('CSV must have an "email" column');
    }
    if (phoneIndex === -1) {
      throw new Error('CSV must have a "phone" column');
    }

    const nameIndex = headers.findIndex((h) => h === 'customername' || h === 'name');
    const contractIndex = headers.findIndex((h) => h === 'contractid' || h === 'contract');
    const makeIndex = headers.findIndex((h) => h === 'vehiclemake' || h === 'make');
    const modelIndex = headers.findIndex((h) => h === 'vehiclemodel' || h === 'model');
    const locationIndex = headers.findIndex((h) => h === 'pickuplocation' || h === 'location');
    const returnIndex = headers.findIndex((h) => h === 'returndate' || h === 'return');

    const parsedUsers: UserRow[] = [];

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map((v) => v.trim());

      if (values.length < 2 || !values[emailIndex] || !values[phoneIndex]) {
        continue;
      }

      parsedUsers.push({
        email: values[emailIndex],
        phone: values[phoneIndex],
        customerName: nameIndex !== -1 ? values[nameIndex] : undefined,
        contractId: contractIndex !== -1 ? values[contractIndex] : undefined,
        vehicleMake: makeIndex !== -1 ? values[makeIndex] : undefined,
        vehicleModel: modelIndex !== -1 ? values[modelIndex] : undefined,
        pickupLocation: locationIndex !== -1 ? values[locationIndex] : undefined,
        returnDate: returnIndex !== -1 ? values[returnIndex] : undefined,
      });
    }

    return parsedUsers;
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setParseError(null);
    setResult(null);

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const parsed = parseCSV(text);
        setUsers(parsed);
        if (!listName) {
          setListName(generateListName());
        }
      } catch (err) {
        setParseError(err instanceof Error ? err.message : 'Failed to parse CSV');
        setUsers([]);
      }
    };
    reader.readAsText(file);
  };

  const handleUpload = async () => {
    if (!listName || users.length === 0) return;

    setIsUploading(true);
    setResult(null);

    try {
      const response = await fetch('/api/upload-list', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ listName, users }),
      });

      const data = await response.json();
      setResult({
        success: data.success,
        message: data.success ? data.message : data.error,
        listId: data.listId,
      });

      if (data.success) {
        setUsers([]);
        setListName('');
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    } catch (err) {
      setResult({
        success: false,
        message: err instanceof Error ? err.message : 'Upload failed',
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-[var(--color-card)] rounded-[var(--radius-lg)] shadow-md p-6">
      <h2 className="text-xl font-semibold text-[var(--color-foreground)] mb-4">
        Upload Offhire List
      </h2>

      <div className="space-y-4">
        {/* List name input */}
        <div>
          <label className="block text-sm font-medium text-[var(--color-foreground)] mb-1">
            List Name
          </label>
          <input
            type="text"
            value={listName}
            onChange={(e) => setListName(e.target.value)}
            className="w-full px-3 py-2 border border-[var(--color-input)] rounded-[var(--radius-sm)] bg-[var(--color-background)] text-[var(--color-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--color-ring)]"
            placeholder="e.g., Offhire_2024-01-30"
          />
        </div>

        {/* File upload */}
        <div>
          <label className="block text-sm font-medium text-[var(--color-foreground)] mb-1">
            CSV File
          </label>
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv"
            onChange={handleFileSelect}
            className="w-full px-3 py-2 border border-[var(--color-input)] rounded-[var(--radius-sm)] bg-[var(--color-background)] focus:outline-none focus:ring-2 focus:ring-[var(--color-ring)] file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:bg-[var(--color-brand-50)] file:text-[var(--color-primary)] file:cursor-pointer"
          />
          <p className="text-xs text-[var(--color-muted-foreground)] mt-1">
            Required columns: email, phone. Optional: customerName, contractId, vehicleMake, vehicleModel, pickupLocation, returnDate
          </p>
        </div>

        {/* Parse error */}
        {parseError && (
          <div className="p-3 bg-[color-mix(in_srgb,var(--color-error)_10%,white)] border border-[var(--color-error)] rounded-[var(--radius-sm)]">
            <p className="text-sm text-[var(--color-error)]">{parseError}</p>
          </div>
        )}

        {/* Preview */}
        {users.length > 0 && (
          <div>
            <p className="text-sm font-medium text-[var(--color-foreground)] mb-2">
              Preview ({users.length} users)
            </p>
            <div className="max-h-48 overflow-y-auto border border-[var(--color-border)] rounded-[var(--radius-sm)]">
              <table className="min-w-full text-xs">
                <thead className="bg-[var(--color-background-alt)] sticky top-0">
                  <tr>
                    <th className="px-2 py-1 text-left text-[var(--color-foreground)]">Email</th>
                    <th className="px-2 py-1 text-left text-[var(--color-foreground)]">Phone</th>
                    <th className="px-2 py-1 text-left text-[var(--color-foreground)]">Name</th>
                    <th className="px-2 py-1 text-left text-[var(--color-foreground)]">Contract</th>
                  </tr>
                </thead>
                <tbody>
                  {users.slice(0, 10).map((user, i) => (
                    <tr key={i} className="border-t border-[var(--color-border)]">
                      <td className="px-2 py-1 text-[var(--color-foreground)]">{user.email}</td>
                      <td className="px-2 py-1 text-[var(--color-foreground)]">{user.phone}</td>
                      <td className="px-2 py-1 text-[var(--color-foreground)]">{user.customerName || '-'}</td>
                      <td className="px-2 py-1 text-[var(--color-foreground)]">{user.contractId || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {users.length > 10 && (
                <p className="text-xs text-[var(--color-muted-foreground)] p-2 text-center">
                  ...and {users.length - 10} more
                </p>
              )}
            </div>
          </div>
        )}

        {/* Result */}
        {result && (
          <div
            className={`p-3 rounded-[var(--radius-sm)] ${
              result.success
                ? 'bg-[color-mix(in_srgb,var(--color-success)_10%,white)] border border-[var(--color-success)]'
                : 'bg-[color-mix(in_srgb,var(--color-error)_10%,white)] border border-[var(--color-error)]'
            }`}
          >
            <p
              className={`text-sm ${
                result.success ? 'text-[var(--color-success)]' : 'text-[var(--color-error)]'
              }`}
            >
              {result.success ? '✓ ' : '✗ '}
              {result.message}
            </p>
          </div>
        )}

        {/* Upload button */}
        <button
          onClick={handleUpload}
          disabled={isUploading || !listName || users.length === 0}
          className={`w-full py-3 px-4 rounded-[var(--radius)] font-medium transition-colors ${
            isUploading || !listName || users.length === 0
              ? 'bg-[var(--color-border)] text-[var(--color-muted-foreground)] cursor-not-allowed'
              : 'bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-[var(--color-primary-foreground)]'
          }`}
        >
          {isUploading ? 'Uploading...' : `Upload ${users.length} Users to Iterable`}
        </button>
      </div>

      {/* Template download */}
      <div className="mt-6 pt-4 border-t border-[var(--color-border)]">
        <p className="text-sm text-[var(--color-muted-foreground)] mb-2">Need a template?</p>
        <button
          onClick={() => {
            const template = 'email,phone,customerName,contractId,vehicleMake,vehicleModel,pickupLocation,returnDate\njohn@example.com,+15551234567,John Doe,C-12345,Toyota,Camry,LAX Airport,2024-02-01';
            const blob = new Blob([template], { type: 'text/csv' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'offhire_template.csv';
            a.click();
            URL.revokeObjectURL(url);
          }}
          className="text-sm text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] underline"
        >
          Download CSV Template
        </button>
      </div>
    </div>
  );
}
