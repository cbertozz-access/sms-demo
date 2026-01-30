import { NextRequest, NextResponse } from 'next/server';
import { sendSMS } from '@/lib/iterable';

interface SendSMSRequestBody {
  phone: string;
  message: string;
  dataFields?: Record<string, string | number>;
}

export async function POST(request: NextRequest) {
  try {
    const body: SendSMSRequestBody = await request.json();

    if (!body.phone) {
      return NextResponse.json(
        { success: false, error: 'Phone number is required' },
        { status: 400 }
      );
    }

    if (!body.message) {
      return NextResponse.json(
        { success: false, error: 'Message is required' },
        { status: 400 }
      );
    }

    const result = await sendSMS({
      recipientPhone: body.phone,
      message: body.message,
      dataFields: body.dataFields,
    });

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: result.message,
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
