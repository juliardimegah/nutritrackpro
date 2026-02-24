const config = {
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
};

// Validate required config
if (!config.projectId) throw new Error('Missing required Firebase configuration key: NEXT_PUBLIC_FIREBASE_PROJECT_ID');
if (!config.appId) throw new Error('Missing required Firebase configuration key: NEXT_PUBLIC_FIREBASE_APP_ID');
if (!config.apiKey) throw new Error('Missing required Firebase configuration key: NEXT_PUBLIC_FIREBASE_API_KEY');
if (!config.authDomain) throw new Error('Missing required Firebase configuration key: NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN');
if (!config.messagingSenderId) throw new Error('Missing required Firebase configuration key: NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID');

export const firebaseConfig = config;
