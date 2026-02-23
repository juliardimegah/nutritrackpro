const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Validate required configuration
const requiredKeys = ['apiKey', 'authDomain', 'projectId', 'appId', 'messagingSenderId'] as const;
const missingKeys = requiredKeys.filter(key => !config[key]);

if (missingKeys.length > 0) {
  throw new Error(`Missing required Firebase configuration keys: ${missingKeys.join(', ')}`);
}

export const firebaseConfig = config;
