/**
 * SMS Message Templates
 * Based on the Hire Contract SMS Demo handoff document
 */

export interface SmsTemplateData {
  // Customer info
  customerName: string;
  customerPhone: string;
  contractId: string;

  // Equipment/items
  itemCount: number;
  itemList: string; // e.g., "1x Scissor Lift, 2x Boom Lifts"

  // Dates
  contractEndDate: string;
  offHireDate?: string;
  offHireTime?: string;
  extensionEndDate?: string;
  extensionWeeks?: number;

  // Site details
  siteLocation?: string;
  siteContactName?: string;
  siteContactPhone?: string;
  siteOpenTime?: string;
  siteClosedTime?: string;
  siteNotes?: string;
}

export type SmsTemplateType = 'contract-ending' | 'offhire-confirmation' | 'extension-notification';

export const SMS_TEMPLATES: Record<SmsTemplateType, { name: string; template: string; description: string }> = {
  'contract-ending': {
    name: 'Contract Ending',
    description: 'Initial proactive notification sent before contract end date',
    template: `Hi {{customerName}}, your hire contract {{contractId}} for {{itemCount}} item(s) is ending on {{contractEndDate}}. {{itemList}} Reply EXTEND to continue your hire, or COMPLETE to arrange collection. Questions? Call us on 1300 XXX XXX`,
  },
  'offhire-confirmation': {
    name: 'Off-Hire Confirmation',
    description: 'Sent when customer replies COMPLETE',
    template: `Off-hire confirmed for {{itemCount}} item(s): {{itemList}} Collection: {{offHireDate}} at {{offHireTime}} Location: {{siteLocation}} Site hours: {{siteOpenTime}} - {{siteClosedTime}} Site contact: {{siteContactName}} ({{siteContactPhone}}) Notes: {{siteNotes}}`,
  },
  'extension-notification': {
    name: 'Extension Notification',
    description: 'Sent when customer replies EXTEND',
    template: `Hi {{customerName}}, your hire has been extended! Contract: {{contractId}} New end date: {{extensionEndDate}} Extension period: {{extensionWeeks}} weeks Items on hire: {{itemList}} Your updated invoice will be sent shortly. Questions? Call 1300 XXX XXX`,
  },
};

/**
 * Merge template with data
 */
export function mergeTemplate(templateType: SmsTemplateType, data: Partial<SmsTemplateData>): string {
  let message = SMS_TEMPLATES[templateType].template;

  // Replace all placeholders
  Object.entries(data).forEach(([key, value]) => {
    const placeholder = `{{${key}}}`;
    message = message.replace(new RegExp(placeholder, 'g'), String(value ?? ''));
  });

  return message;
}

/**
 * Count SMS segments (160 chars for GSM-7, 70 for Unicode)
 */
export function countSmsSegments(message: string): { chars: number; segments: number; encoding: 'GSM-7' | 'Unicode' } {
  // Check if message contains non-GSM characters
  const gsm7Regex = /^[\x00-\x7F£¥èéùìòÇØøÅåΔΦΓΛΩΠΨΣΘΞÆæßÉ!"#¤%&'()*+,\-./:;<=>?¡ÄÖÑÜ§¿äöñüà\s]*$/;
  const isGsm7 = gsm7Regex.test(message);

  const chars = message.length;
  const charsPerSegment = isGsm7 ? 160 : 70;
  const multiPartCharsPerSegment = isGsm7 ? 153 : 67; // UDH header takes space

  let segments: number;
  if (chars <= charsPerSegment) {
    segments = 1;
  } else {
    segments = Math.ceil(chars / multiPartCharsPerSegment);
  }

  return {
    chars,
    segments,
    encoding: isGsm7 ? 'GSM-7' : 'Unicode',
  };
}

/**
 * Preview a template with sample data
 */
export function previewTemplate(templateType: SmsTemplateType): string {
  const sampleData: SmsTemplateData = {
    customerName: 'John Smith',
    customerPhone: '+61400000000',
    contractId: 'CON-12345',
    itemCount: 2,
    itemList: '1x Scissor Lift SL-200, 1x Boom Lift BL-400',
    contractEndDate: '15 Feb 2026',
    offHireDate: '16 Feb 2026',
    offHireTime: '9:00 AM',
    extensionEndDate: '28 Feb 2026',
    extensionWeeks: 2,
    siteLocation: '123 Construction Site, Sydney NSW',
    siteContactName: 'Site Manager',
    siteContactPhone: '+61400111222',
    siteOpenTime: '7:00 AM',
    siteClosedTime: '5:00 PM',
    siteNotes: 'Access via rear gate',
  };

  return mergeTemplate(templateType, sampleData);
}
