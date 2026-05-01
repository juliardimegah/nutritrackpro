## 2025-05-18 - [Fix Hardcoded Firebase Credentials]
**Vulnerability:** Firebase credentials were hardcoded in `src/firebase/config.ts`.
**Learning:** In this Next.js app, relying on silent failures or implicit typing for configuration allows misconfigured deployments to succeed but fail confusingly at runtime. Explicit runtime checking for config ensures errors are caught immediately when credentials are missing.
**Prevention:** Use environment variables for all secrets, and add explicit validation checks (`throw new Error(...)`) in configuration files to verify that essential keys are present at startup/initialization.

## 2025-05-18 - [Fix Unauthenticated Server Actions]
**Vulnerability:** Server Actions (`analyzeFoodIntake` and `suggestCustomMealPlans`) were publicly accessible endpoints with no authentication checks, exposing internal logic and AI resources.
**Learning:** Next.js Server Actions are public API endpoints by default. Even if not directly called from the frontend, their signatures must require secure validation.
**Prevention:** Always explicitly pass an authentication token (e.g., Firebase `idToken`) as a separate argument to Server Actions and verify it server-side before executing any logic.
