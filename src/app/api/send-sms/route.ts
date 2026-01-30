import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { templateType, phone, data, message } = body;

    if (!phone) {
      return NextResponse.json(
        { success: false, error: 'Phone number is required' },
        { status: 400 }
      );
    }

    const apiKey = process.env.ITERABLE_API_KEY;

    if (!apiKey) {
      // Demo mode - simulate success
      console.log('SMS Demo (no API key):', { templateType, phone, message });
      return NextResponse.json({
        success: true,
        message: 'SMS queued (demo mode - no Iterable API key configured)',
        demo: true,
      });
    }

    // Send via Iterable
    const phoneDigits = phone.replace(/\D/g, '');
    const response = await fetch('https://api.iterable.com/api/sms/target', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Api-Key': apiKey,
      },
      body: JSON.stringify({
        recipientEmail: data.email || `${phoneDigits}@sms.placeholder.com`,
        dataFields: {
          ...data,
          smsMessage: message,
        },
      }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      return NextResponse.json(
        { success: false, error: error.msg || `Iterable error: ${response.status}` },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'SMS sent successfully via Iterable',
    });
  } catch (error) {
    console.error('Error sending SMS:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to send SMS',
      },
      { status: 500 }
    );
  }
}
