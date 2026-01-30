const ITERABLE_API_URL = 'https://api.iterable.com/api';

interface IterableResponse {
  success: boolean;
  message?: string;
  errorCode?: string;
  listId?: number;
}

interface UserData {
  email: string;
  phone: string;
  dataFields?: Record<string, string | number>;
}

// Create a new list in Iterable
export async function createList(listName: string): Promise<{ success: boolean; listId?: number; message?: string }> {
  const apiKey = process.env.ITERABLE_API_KEY;

  if (!apiKey) {
    throw new Error('ITERABLE_API_KEY is not configured');
  }

  const response = await fetch(`${ITERABLE_API_URL}/lists`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Api-Key': apiKey,
    },
    body: JSON.stringify({ name: listName }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    return {
      success: false,
      message: error.msg || `HTTP error: ${response.status}`,
    };
  }

  const result = await response.json();
  return {
    success: true,
    listId: result.listId,
  };
}

// Upsert users and subscribe them to a list
export async function uploadUsersToList(
  listName: string,
  users: UserData[]
): Promise<IterableResponse> {
  const apiKey = process.env.ITERABLE_API_KEY;

  if (!apiKey) {
    throw new Error('ITERABLE_API_KEY is not configured');
  }

  // 1. Create the list
  const listResult = await createList(listName);
  if (!listResult.success || !listResult.listId) {
    return {
      success: false,
      message: listResult.message || 'Failed to create list',
    };
  }

  // 2. Bulk upsert users
  const formattedUsers = users.map((user) => ({
    email: user.email,
    dataFields: {
      ...user.dataFields,
      phoneNumber: formatPhoneE164(user.phone),
    },
    preferUserId: false,
  }));

  const bulkResponse = await fetch(`${ITERABLE_API_URL}/users/bulkUpdate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Api-Key': apiKey,
    },
    body: JSON.stringify({ users: formattedUsers }),
  });

  if (!bulkResponse.ok) {
    const error = await bulkResponse.json().catch(() => ({}));
    return {
      success: false,
      message: error.msg || `Failed to upsert users: ${bulkResponse.status}`,
      listId: listResult.listId,
    };
  }

  // 3. Subscribe users to the list
  const emails = users.map((u) => u.email);
  const subscribeResponse = await fetch(`${ITERABLE_API_URL}/lists/subscribe`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Api-Key': apiKey,
    },
    body: JSON.stringify({
      listId: listResult.listId,
      subscribers: emails.map((email) => ({ email })),
    }),
  });

  if (!subscribeResponse.ok) {
    const error = await subscribeResponse.json().catch(() => ({}));
    return {
      success: false,
      message: error.msg || `Failed to subscribe users: ${subscribeResponse.status}`,
      listId: listResult.listId,
    };
  }

  const subscribeResult = await subscribeResponse.json();
  return {
    success: true,
    message: `Created list "${listName}" with ${subscribeResult.successCount || users.length} users`,
    listId: listResult.listId,
  };
}

// Get all lists from Iterable
export async function getLists(): Promise<{ success: boolean; lists?: Array<{ id: number; name: string }>; message?: string }> {
  const apiKey = process.env.ITERABLE_API_KEY;

  if (!apiKey) {
    throw new Error('ITERABLE_API_KEY is not configured');
  }

  const response = await fetch(`${ITERABLE_API_URL}/lists`, {
    method: 'GET',
    headers: {
      'Api-Key': apiKey,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    return {
      success: false,
      message: error.msg || `HTTP error: ${response.status}`,
    };
  }

  const result = await response.json();
  return {
    success: true,
    lists: result.lists || [],
  };
}

function formatPhoneE164(phone: string): string {
  const digits = phone.replace(/\D/g, '');

  if (digits.length === 11 && digits.startsWith('1')) {
    return `+${digits}`;
  }

  if (digits.length === 10) {
    return `+1${digits}`;
  }

  if (phone.startsWith('+')) {
    return phone;
  }

  return `+${digits}`;
}
