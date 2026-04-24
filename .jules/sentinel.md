## 2025-05-18 - [Fix Hardcoded Firebase Credentials]
**Vulnerability:** Firebase credentials were hardcoded in `src/firebase/config.ts`.
**Learning:** In this Next.js app, relying on silent failures or implicit typing for configuration allows misconfigured deployments to succeed but fail confusingly at runtime. Explicit runtime checking for config ensures errors are caught immediately when credentials are missing.
**Prevention:** Use environment variables for all secrets, and add explicit validation checks (`throw new Error(...)`) in configuration files to verify that essential keys are present at startup/initialization.

## 2025-05-18 - [Fix Missing Authentication on Server Actions]
**Vulnerability:** Server Actions in `src/ai/flows` (e.g., `analyzeFoodIntake`, `suggestCustomMealPlans`) were exposed without authentication, allowing unauthorized access to backend AI capabilities and potentially consuming AI quotas and billing.
**Learning:** In a Next.js App Router application using Firebase Authentication on the client, standard server-side context doesn't automatically contain authentication claims unless session cookies are specifically implemented. Simply adding `'use server'` creates public endpoints if no inline verification occurs. Because `firebase-admin` is not used, tokens must be explicitly retrieved on the frontend and validated using the Identity Toolkit API on the backend.
**Prevention:** For any Server Action performing sensitive or authenticated operations, explicitly require an `idToken` parameter and manually verify it (e.g., using `verifyIdToken`) before processing the request.
