const config = {
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
};

// Validate that required keys are present
const requiredKeys = [
  'projectId',
  'appId',
  'apiKey',
  'authDomain',
  'messagingSenderId',
] as const;

for (const key of requiredKeys) {
  if (!config[key]) {
    throw new Error(`Missing required environment variable for Firebase configuration: ${key}`);
  }
}

export const firebaseConfig = config;
