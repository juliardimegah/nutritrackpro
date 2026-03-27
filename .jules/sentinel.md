## 2025-05-18 - [Fix Hardcoded Firebase Credentials]
**Vulnerability:** Firebase credentials were hardcoded in `src/firebase/config.ts`.
**Learning:** In this Next.js app, relying on silent failures or implicit typing for configuration allows misconfigured deployments to succeed but fail confusingly at runtime. Explicit runtime checking for config ensures errors are caught immediately when credentials are missing.
**Prevention:** Use environment variables for all secrets, and add explicit validation checks (`throw new Error(...)`) in configuration files to verify that essential keys are present at startup/initialization.

## 2025-05-18 - [Fix Unauthenticated Server Actions]
**Vulnerability:** Next.js Server Actions used for AI operations (`analyzeFoodIntake`, `suggestCustomMealPlans`) were missing authentication checks. Anyone could call these endpoints directly, consuming AI tokens and resources without being logged in.
**Learning:** In applications utilizing Firebase authentication without `firebase-admin`, Server Actions must explicitly demand a Firebase ID token from the client in their input payload.
**Prevention:** Always include an `idToken` field in the input schema of Server Actions, and strictly verify it against the Google Identity Toolkit REST API (`accounts:lookup`) before executing any business logic.
