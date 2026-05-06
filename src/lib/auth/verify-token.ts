/**
 * @fileOverview Verifies Firebase ID tokens via Google Identity Toolkit REST API.
 */

export async function verifyToken(idToken: string): Promise<any> {
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  if (!apiKey) {
    throw new Error('Missing Firebase API Key');
  }

  const response = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${apiKey}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        idToken,
      }),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error?.message || 'Failed to verify token');
  }

  const data = await response.json();
  if (!data.users || data.users.length === 0) {
    throw new Error('User not found in token verification');
  }

  return data.users[0];
}
