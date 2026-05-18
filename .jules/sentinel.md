## 2025-05-18 - [Fix Hardcoded Firebase Credentials]
**Vulnerability:** Firebase credentials were hardcoded in `src/firebase/config.ts`.
**Learning:** In this Next.js app, relying on silent failures or implicit typing for configuration allows misconfigured deployments to succeed but fail confusingly at runtime. Explicit runtime checking for config ensures errors are caught immediately when credentials are missing.
**Prevention:** Use environment variables for all secrets, and add explicit validation checks (`throw new Error(...)`) in configuration files to verify that essential keys are present at startup/initialization.

## 2025-05-18 - [Fix Unauthenticated Server Actions]
**Vulnerability:** Next.js Server Actions `analyzeFoodIntake` and `suggestCustomMealPlans` were publicly accessible endpoints and lacked caller authentication, posing a risk of unauthorized AI usage and abuse.
**Learning:** In Next.js, Server Actions are publicly exposed by default. Even if an action is intended for internal frontend use, it must explicitly validate authentication (e.g., via ID tokens) to prevent unauthorized execution.
**Prevention:** Always verify Firebase ID tokens (e.g., using Google Identity Toolkit REST API `accounts:lookup`) inside Server Actions before processing sensitive or resource-intensive logic. Ensure the token is passed as a separate argument outside the payload schema to avoid leakage.
