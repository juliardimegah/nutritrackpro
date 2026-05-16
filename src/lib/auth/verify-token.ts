/**
 * @fileOverview Verifies a Firebase ID token using the Google Identity Toolkit REST API.
 * This is used for server-side verification without requiring `firebase-admin`.
 */

export async function verifyToken(idToken: string): Promise<any> {
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  if (!apiKey) {
    throw new Error('Missing NEXT_PUBLIC_FIREBASE_API_KEY for token verification');
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
    const data = await response.json().catch(() => ({}));
    console.error('Token verification failed:', data);
    throw new Error('Unauthorized');
  }

  const data = await response.json();
  if (!data.users || data.users.length === 0) {
    throw new Error('Unauthorized');
  }

  return data.users[0];
}
