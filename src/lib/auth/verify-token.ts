export async function verifyToken(idToken: string): Promise<any> {
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  if (!apiKey) {
    throw new Error('Missing Firebase API key for token verification.');
  }

  const response = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${apiKey}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        idToken: idToken,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok || !data.users || data.users.length === 0) {
    console.error('Token verification failed:', data);
    throw new Error('Unauthorized');
  }

  return data.users[0];
}
