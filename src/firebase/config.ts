if (!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) {
  throw new Error('NEXT_PUBLIC_FIREBASE_PROJECT_ID is required');
}
if (!process.env.NEXT_PUBLIC_FIREBASE_APP_ID) {
  throw new Error('NEXT_PUBLIC_FIREBASE_APP_ID is required');
}
if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
  throw new Error('NEXT_PUBLIC_FIREBASE_API_KEY is required');
}
if (!process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN) {
  throw new Error('NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN is required');
}
if (!process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID) {
  throw new Error('NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID is required');
}

export const firebaseConfig = {
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
};
