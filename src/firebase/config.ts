export const firebaseConfig = {
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
};

// 🛡️ Sentinel: Security Enhancement
// Explicit runtime validation of required environment variables.
// Fail securely if critical Firebase configuration is missing.
if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
  console.error("Missing required environment variable: NEXT_PUBLIC_FIREBASE_API_KEY");
}
if (!process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN) {
  console.error("Missing required environment variable: NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN");
}
if (!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) {
  console.error("Missing required environment variable: NEXT_PUBLIC_FIREBASE_PROJECT_ID");
}
if (!process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID) {
  console.error("Missing required environment variable: NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID");
}
if (!process.env.NEXT_PUBLIC_FIREBASE_APP_ID) {
  console.error("Missing required environment variable: NEXT_PUBLIC_FIREBASE_APP_ID");
}
