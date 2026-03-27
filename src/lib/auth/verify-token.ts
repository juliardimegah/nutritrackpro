export async function verifyIdToken(idToken: string): Promise<any> {
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  if (!apiKey) {
    throw new Error('NEXT_PUBLIC_FIREBASE_API_KEY is not configured');
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
    throw new Error(`Invalid ID token: ${errorData.error?.message || 'Unknown error'}`);
  }

  const data = await response.json();

  if (!data.users || data.users.length === 0) {
    throw new Error('Invalid ID token: User not found');
  }

  return data.users[0];
}
