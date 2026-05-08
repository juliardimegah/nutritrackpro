export async function verifyToken(idToken: string): Promise<boolean> {
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  if (!apiKey) {
    console.error('Missing NEXT_PUBLIC_FIREBASE_API_KEY');
    return false;
  }

  try {
    const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idToken }),
    });
    return res.ok;
  } catch (error) {
    console.error('Error verifying token:', error);
    return false;
  }
}
