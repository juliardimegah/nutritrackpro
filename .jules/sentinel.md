## 2025-05-18 - [Fix Hardcoded Firebase Credentials]
**Vulnerability:** Firebase credentials were hardcoded in `src/firebase/config.ts`.
**Learning:** In this Next.js app, relying on silent failures or implicit typing for configuration allows misconfigured deployments to succeed but fail confusingly at runtime. Explicit runtime checking for config ensures errors are caught immediately when credentials are missing.
**Prevention:** Use environment variables for all secrets, and add explicit validation checks (`throw new Error(...)`) in configuration files to verify that essential keys are present at startup/initialization.

## 2025-05-19 - [Fix Missing Server Action Authentication]
**Vulnerability:** AI Server Actions (`analyzeFoodIntake` and `suggestCustomMealPlans`) lacked authentication, allowing unauthenticated users to trigger AI features, potentially causing resource abuse.
**Learning:** Since `firebase-admin` is not used in this project, Server Actions must validate the user by requiring a Firebase ID token from the frontend and verifying it explicitly server-side using the Google Identity Toolkit REST API (`accounts:lookup`).
**Prevention:** Always verify `idToken`s server-side for any Next.js Server Action or API endpoint using `verifyToken` before performing the core logic.
