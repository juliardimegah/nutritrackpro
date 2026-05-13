export async function verifyToken(idToken: string) {
  if (!idToken) {
    throw new Error('No token provided');
  }

  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  if (!apiKey) {
    throw new Error('NEXT_PUBLIC_FIREBASE_API_KEY is not set');
  }

  try {
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

    if (!response.ok) {
      console.error('Token verification failed:', data.error?.message || 'Unknown error');
      throw new Error('Invalid token');
    }

    if (!data.users || data.users.length === 0) {
      throw new Error('Invalid token: User not found');
    }

    return data.users[0];
  } catch (error) {
    console.error('Error verifying token:', error);
    throw new Error('Invalid token');
  }
}
