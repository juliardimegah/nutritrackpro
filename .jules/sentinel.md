## 2025-05-18 - [Fix Hardcoded Firebase Credentials]
**Vulnerability:** Firebase credentials were hardcoded in `src/firebase/config.ts`.
**Learning:** In this Next.js app, relying on silent failures or implicit typing for configuration allows misconfigured deployments to succeed but fail confusingly at runtime. Explicit runtime checking for config ensures errors are caught immediately when credentials are missing.
**Prevention:** Use environment variables for all secrets, and add explicit validation checks (`throw new Error(...)`) in configuration files to verify that essential keys are present at startup/initialization.
## 2025-05-18 - [Add Missing Authentication to Public Server Actions]
**Vulnerability:** Next.js Server Actions (`analyzeFoodIntake` and `suggestCustomMealPlans`) were publicly accessible without any authentication checks, allowing potential abuse of AI endpoints and data leakage.
**Learning:** In Next.js, Server Actions are exposed as public endpoints by default. Even if an action is not currently called from the frontend (like `suggestCustomMealPlans`), it remains vulnerable. Without `firebase-admin`, authentication must be handled by passing the client-side ID token and verifying it via the Google Identity Toolkit REST API (`accounts:lookup`).
**Prevention:** Always enforce explicit authentication checks (e.g., verifying ID tokens) at the beginning of sensitive Server Actions, regardless of whether they are actively used in the UI, to adhere to a secure-by-default posture.
