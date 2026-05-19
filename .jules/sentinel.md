## 2025-05-18 - [Fix Hardcoded Firebase Credentials]
**Vulnerability:** Firebase credentials were hardcoded in `src/firebase/config.ts`.
**Learning:** In this Next.js app, relying on silent failures or implicit typing for configuration allows misconfigured deployments to succeed but fail confusingly at runtime. Explicit runtime checking for config ensures errors are caught immediately when credentials are missing.
**Prevention:** Use environment variables for all secrets, and add explicit validation checks (`throw new Error(...)`) in configuration files to verify that essential keys are present at startup/initialization.

## 2025-05-18 - [Fix Missing Authentication on AI Server Actions]
**Vulnerability:** Next.js Server Actions `analyzeFoodIntake` and `suggestCustomMealPlans` in `src/ai/flows/` were exposed without any authentication, allowing unauthenticated public access to the AI features which could lead to abuse and quota exhaustion.
**Learning:** Next.js Server Actions are publicly accessible endpoints by default. Even if a feature like `suggestCustomMealPlans` is not yet actively called from the frontend UI, it is still exposed as an API endpoint and must be secured to prevent unauthorized execution.
**Prevention:** Always validate authentication (e.g., via ID tokens) within Server Actions. Since `firebase-admin` is excluded, verify tokens using the Google Identity Toolkit REST API (`accounts:lookup`), passing the `idToken` as a separate argument outside the core data payload schema.
