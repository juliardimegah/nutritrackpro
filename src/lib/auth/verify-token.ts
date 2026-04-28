/**
 * Utility to verify a Firebase ID token using the Google Identity Toolkit REST API.
 */
export async function verifyIdToken(idToken: string): Promise<any> {
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  if (!apiKey) {
    throw new Error('Missing NEXT_PUBLIC_FIREBASE_API_KEY environment variable.');
  }

  const response = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${apiKey}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ idToken }),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Failed to verify ID token: ${errorData.error?.message || response.statusText}`);
  }

  const data = await response.json();
  if (!data.users || data.users.length === 0) {
    throw new Error('Invalid ID token: No user found.');
  }

  return data.users[0];
}
