import { NextRequest, NextResponse } from 'next/server';
import { uploadUsersToList } from '@/lib/iterable';

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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { listName, users } = body as { listName: string; users: UserRow[] };

    if (!listName) {
      return NextResponse.json(
        { success: false, error: 'List name is required' },
        { status: 400 }
      );
    }

    if (!users || !Array.isArray(users) || users.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Users array is required' },
        { status: 400 }
      );
    }

    // Validate each user has email and phone
    for (let i = 0; i < users.length; i++) {
      if (!users[i].email) {
        return NextResponse.json(
          { success: false, error: `Row ${i + 1}: email is required` },
          { status: 400 }
        );
      }
      if (!users[i].phone) {
        return NextResponse.json(
          { success: false, error: `Row ${i + 1}: phone is required` },
          { status: 400 }
        );
      }
    }

    // Format users for Iterable
    const formattedUsers = users.map((user) => ({
      email: user.email,
      phone: user.phone,
      dataFields: {
        customerName: user.customerName || '',
        contractId: user.contractId || '',
        vehicleMake: user.vehicleMake || '',
        vehicleModel: user.vehicleModel || '',
        pickupLocation: user.pickupLocation || '',
        returnDate: user.returnDate || '',
      },
    }));

    const result = await uploadUsersToList(listName, formattedUsers);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: result.message,
      listId: result.listId,
    });
  } catch (error) {
    console.error('Error uploading list:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to upload list',
      },
      { status: 500 }
    );
  }
}
