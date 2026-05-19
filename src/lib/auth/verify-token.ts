export async function verifyToken(idToken: string) {
  if (!idToken) {
    throw new Error('No token provided');
  }

  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  if (!apiKey) {
    throw new Error('Firebase API key is required for token verification');
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
          idToken,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Token verification failed:', errorData);
      throw new Error('Invalid token');
    }

    const data = await response.json();
    if (!data.users || data.users.length === 0) {
      throw new Error('User not found');
    }

    return data.users[0]; // Return the verified user object
  } catch (error) {
    console.error('Error verifying token:', error);
    throw new Error('Authentication failed');
  }
}
