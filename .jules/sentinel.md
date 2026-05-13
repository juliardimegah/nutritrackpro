## 2025-05-18 - [Fix Hardcoded Firebase Credentials]
**Vulnerability:** Firebase credentials were hardcoded in `src/firebase/config.ts`.
**Learning:** In this Next.js app, relying on silent failures or implicit typing for configuration allows misconfigured deployments to succeed but fail confusingly at runtime. Explicit runtime checking for config ensures errors are caught immediately when credentials are missing.
**Prevention:** Use environment variables for all secrets, and add explicit validation checks (`throw new Error(...)`) in configuration files to verify that essential keys are present at startup/initialization.

## 2025-05-18 - [Secure Server Actions from Unauthenticated Public Access]
**Vulnerability:** Next.js Server Actions (`analyzeFoodIntake` and `suggestCustomMealPlans`) lacked authentication checks, allowing unauthenticated public access.
**Learning:** Next.js Server Actions are publicly accessible endpoints by default. Even without `firebase-admin`, we can secure them by requiring the client to pass the `idToken` and verifying it server-side using the Google Identity Toolkit REST API (`accounts:lookup`). The token must be passed as a separate argument outside Genkit schemas to prevent token leakage in observability logs.
**Prevention:** Always implement explicit authentication validation (e.g., via `verifyToken`) in Server Actions before executing sensitive or resource-intensive logic.
