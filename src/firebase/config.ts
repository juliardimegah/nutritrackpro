// Use explicit environment variable checks to validate configuration
const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
const appId = process.env.NEXT_PUBLIC_FIREBASE_APP_ID;
const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
const authDomain = process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN;
const messagingSenderId = process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID;
const measurementId = process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "";

if (!projectId) {
  throw new Error("Missing NEXT_PUBLIC_FIREBASE_PROJECT_ID environment variable");
}
if (!appId) {
  throw new Error("Missing NEXT_PUBLIC_FIREBASE_APP_ID environment variable");
}
if (!apiKey) {
  throw new Error("Missing NEXT_PUBLIC_FIREBASE_API_KEY environment variable");
}
if (!authDomain) {
  throw new Error("Missing NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN environment variable");
}
if (!messagingSenderId) {
  throw new Error("Missing NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID environment variable");
}

export const firebaseConfig = {
  projectId,
  appId,
  apiKey,
  authDomain,
  messagingSenderId,
  measurementId,
};
