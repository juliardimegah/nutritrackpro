/**
 * Utility to verify a Firebase ID token using the Google Identity Toolkit REST API.
 * Because `firebase-admin` is not installed, we use the REST API for server-side verification.
 */

export async function verifyToken(idToken: string): Promise<any> {
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  if (!apiKey) {
    throw new Error('NEXT_PUBLIC_FIREBASE_API_KEY is not set');
  }

  const url = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${apiKey}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      idToken,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    console.error('Firebase ID token verification failed:', errorData);
    throw new Error('Invalid or expired ID token');
  }

  const data = await response.json();

  if (!data.users || data.users.length === 0) {
    throw new Error('Invalid ID token: User not found');
  }

  return data.users[0];
}
