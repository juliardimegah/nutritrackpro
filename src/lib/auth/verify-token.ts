/**
 * Verifies a Firebase ID token using the Google Identity Toolkit REST API.
 * This approach avoids needing `firebase-admin` and works well in Next.js Server Actions.
 */
export async function verifyIdToken(idToken: string): Promise<string> {
  if (!idToken) {
    throw new Error('No ID token provided');
  }

  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  if (!apiKey) {
    throw new Error('Firebase API key is missing');
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
    throw new Error('User not found');
  }

  return data.users[0].localId;
}
