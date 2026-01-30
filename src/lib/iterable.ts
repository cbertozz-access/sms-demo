const ITERABLE_API_URL = 'https://api.iterable.com/api';

interface SendSMSParams {
  recipientPhone: string;
  message: string;
  dataFields?: Record<string, string | number>;
}

interface IterableResponse {
  success: boolean;
  message?: string;
  errorCode?: string;
}

export async function sendSMS({
  recipientPhone,
  message,
  dataFields = {},
}: SendSMSParams): Promise<IterableResponse> {
  const apiKey = process.env.ITERABLE_API_KEY;

  if (!apiKey) {
    throw new Error('ITERABLE_API_KEY is not configured');
  }

  // Format phone number to E.164 if not already
  const formattedPhone = formatPhoneE164(recipientPhone);

  const response = await fetch(`${ITERABLE_API_URL}/sms/target`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Api-Key': apiKey,
    },
    body: JSON.stringify({
      recipientPhone: formattedPhone,
      messageBody: message,
      dataFields,
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    return {
      success: false,
      message: error.msg || `HTTP error: ${response.status}`,
      errorCode: error.code,
    };
  }

  const result = await response.json();
  return {
    success: true,
    message: result.msg || 'SMS sent successfully',
  };
}

function formatPhoneE164(phone: string): string {
  // Remove all non-digit characters
  const digits = phone.replace(/\D/g, '');

  // If already has country code (11 digits for US)
  if (digits.length === 11 && digits.startsWith('1')) {
    return `+${digits}`;
  }

  // If 10 digits, assume US and add +1
  if (digits.length === 10) {
    return `+1${digits}`;
  }

  // If already starts with +, return as is
  if (phone.startsWith('+')) {
    return phone;
  }

  // Otherwise return with + prefix
  return `+${digits}`;
}
