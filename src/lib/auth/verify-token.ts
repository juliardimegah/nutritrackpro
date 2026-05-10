export async function verifyIdToken(idToken: string): Promise<any> {
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  if (!projectId) {
    throw new Error('NEXT_PUBLIC_FIREBASE_PROJECT_ID is not configured');
  }

  const response = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}`,
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
    throw new Error(`Token verification failed: ${errorData.error?.message || 'Unknown error'}`);
  }

  const data = await response.json();
  if (!data.users || data.users.length === 0) {
    throw new Error('No user found for the provided token');
  }

  return data.users[0];
}
