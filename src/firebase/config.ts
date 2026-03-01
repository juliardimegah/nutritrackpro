export const firebaseConfig = {
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
};

// Validate that the required config values are present.
// It's critical for security and functionality to fail fast if they are missing.
if (typeof window !== 'undefined' && process.env.NODE_ENV !== 'test') {
  const missingKeys: string[] = [];
  if (!firebaseConfig.projectId) missingKeys.push('NEXT_PUBLIC_FIREBASE_PROJECT_ID');
  if (!firebaseConfig.appId) missingKeys.push('NEXT_PUBLIC_FIREBASE_APP_ID');
  if (!firebaseConfig.apiKey) missingKeys.push('NEXT_PUBLIC_FIREBASE_API_KEY');
  if (!firebaseConfig.authDomain) missingKeys.push('NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN');

  if (missingKeys.length > 0) {
    throw new Error(
      `Firebase configuration is missing required environment variables: ${missingKeys.join(
        ', '
      )}. Check your .env.local file.`
    );
  }
}
