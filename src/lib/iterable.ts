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

// Trigger a workflow/journey for users (this sends the SMS)
export async function triggerWorkflow(
  workflowId: string,
  users: Array<{ email: string; dataFields?: Record<string, string | number> }>
): Promise<{ success: boolean; message: string; successCount?: number; failCount?: number }> {
  const apiKey = process.env.ITERABLE_API_KEY;

  if (!apiKey) {
    throw new Error('ITERABLE_API_KEY is not configured');
  }

  let successCount = 0;
  let failCount = 0;

  // Trigger workflow for each user
  for (const user of users) {
    const response = await fetch(`${ITERABLE_API_URL}/workflows/triggerWorkflow`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Api-Key': apiKey,
      },
      body: JSON.stringify({
        workflowId: parseInt(workflowId),
        email: user.email,
        dataFields: user.dataFields || {},
      }),
    });

    if (response.ok) {
      successCount++;
    } else {
      failCount++;
    }
  }

  return {
    success: failCount === 0,
    message: `Triggered workflow for ${successCount} users${failCount > 0 ? `, ${failCount} failed` : ''}`,
    successCount,
    failCount,
  };
}

// Send SMS directly via campaign trigger (requires campaignId set up in Iterable)
export async function triggerSmsCampaign(
  campaignId: string,
  users: Array<{ email: string; dataFields?: Record<string, string | number> }>
): Promise<{ success: boolean; message: string; successCount?: number; failCount?: number }> {
  const apiKey = process.env.ITERABLE_API_KEY;

  if (!apiKey) {
    throw new Error('ITERABLE_API_KEY is not configured');
  }

  let successCount = 0;
  let failCount = 0;

  // Trigger campaign for each user
  for (const user of users) {
    const response = await fetch(`${ITERABLE_API_URL}/campaigns/trigger`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Api-Key': apiKey,
      },
      body: JSON.stringify({
        campaignId: parseInt(campaignId),
        recipientEmail: user.email,
        dataFields: user.dataFields || {},
      }),
    });

    if (response.ok) {
      successCount++;
    } else {
      failCount++;
    }
  }

  return {
    success: failCount === 0,
    message: `Sent SMS to ${successCount} users${failCount > 0 ? `, ${failCount} failed` : ''}`,
    successCount,
    failCount,
  };
}

// Upload users AND trigger SMS campaign in one step
export async function uploadAndSendSms(
  listName: string,
  campaignId: string,
  users: UserData[]
): Promise<{ success: boolean; message: string; listId?: number; sentCount?: number }> {
  // First upload users to Iterable
  const uploadResult = await uploadUsersToList(listName, users);

  if (!uploadResult.success) {
    return {
      success: false,
      message: `Upload failed: ${uploadResult.message}`,
    };
  }

  // Then trigger SMS campaign for all users
  const usersForCampaign = users.map((u) => ({
    email: u.email,
    dataFields: u.dataFields,
  }));

  const sendResult = await triggerSmsCampaign(campaignId, usersForCampaign);

  return {
    success: sendResult.success,
    message: `${uploadResult.message}. ${sendResult.message}`,
    listId: uploadResult.listId,
    sentCount: sendResult.successCount,
  };
}
