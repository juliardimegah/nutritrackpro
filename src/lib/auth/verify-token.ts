export async function verifyToken(idToken: string): Promise<any> {
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  if (!apiKey) {
    throw new Error('Missing NEXT_PUBLIC_FIREBASE_API_KEY');
  }

  const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${apiKey}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ idToken }),
  });

  const data = await res.json();

  if (!res.ok || data.error) {
    throw new Error(`Authentication failed: ${data.error?.message || 'Invalid token'}`);
  }

  return data;
}
