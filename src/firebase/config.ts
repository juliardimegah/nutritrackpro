export const firebaseConfig = {
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
};

// Validate that the required configuration values are present.
// We avoid iteration/regex to improve code searchability, per project standard.
if (!firebaseConfig.projectId) {
  console.error("Missing NEXT_PUBLIC_FIREBASE_PROJECT_ID");
}
if (!firebaseConfig.appId) {
  console.error("Missing NEXT_PUBLIC_FIREBASE_APP_ID");
}
if (!firebaseConfig.apiKey) {
  console.error("Missing NEXT_PUBLIC_FIREBASE_API_KEY");
}
if (!firebaseConfig.authDomain) {
  console.error("Missing NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN");
}
if (!firebaseConfig.messagingSenderId) {
  console.error("Missing NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID");
}
