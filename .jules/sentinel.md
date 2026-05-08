## 2025-05-18 - [Fix Hardcoded Firebase Credentials]
**Vulnerability:** Firebase credentials were hardcoded in `src/firebase/config.ts`.
**Learning:** In this Next.js app, relying on silent failures or implicit typing for configuration allows misconfigured deployments to succeed but fail confusingly at runtime. Explicit runtime checking for config ensures errors are caught immediately when credentials are missing.
**Prevention:** Use environment variables for all secrets, and add explicit validation checks (`throw new Error(...)`) in configuration files to verify that essential keys are present at startup/initialization.

## 2024-05-08 - [Missing Authentication on Server Actions]
**Vulnerability:** Server actions for AI flows (`analyzeFoodIntake`, `suggestCustomMealPlans`) were publicly accessible without any authentication checks, risking abuse of AI APIs.
**Learning:** Next.js Server Actions are exposed as public HTTP endpoints by default. Even if not actively linked from the frontend UI (like `suggestCustomMealPlans`), they must explicitly validate authentication to prevent unauthorized execution.
**Prevention:** Always require and verify an authentication token (e.g., Firebase ID token) inside Server Actions before processing sensitive data or calling external APIs. Since `firebase-admin` is excluded, use the Google Identity Toolkit REST API (`accounts:lookup`) for token verification.
