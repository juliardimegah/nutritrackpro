/**
 * @fileOverview Verifies a Firebase ID token using the Google Identity Toolkit REST API.
 * This is used server-side since `firebase-admin` is not installed.
 */

export async function verifyToken(idToken: string) {
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  if (!apiKey) {
    throw new Error('NEXT_PUBLIC_FIREBASE_API_KEY is not set');
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
    throw new Error('Invalid or expired ID token');
  }

  const data = await response.json();

  if (!data.users || data.users.length === 0) {
     throw new Error('Invalid or expired ID token');
  }

  return data.users[0];
}
