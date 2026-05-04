## 2025-05-18 - [Fix Hardcoded Firebase Credentials]
**Vulnerability:** Firebase credentials were hardcoded in `src/firebase/config.ts`.
**Learning:** In this Next.js app, relying on silent failures or implicit typing for configuration allows misconfigured deployments to succeed but fail confusingly at runtime. Explicit runtime checking for config ensures errors are caught immediately when credentials are missing.
**Prevention:** Use environment variables for all secrets, and add explicit validation checks (`throw new Error(...)`) in configuration files to verify that essential keys are present at startup/initialization.

## 2025-05-18 - [Fix Missing Authentication on Server Actions]
**Vulnerability:** Next.js Server Actions `analyzeFoodIntake` and `suggestCustomMealPlans` were accessible without authentication.
**Learning:** Next.js Server Actions are essentially public API endpoints. By default, they do not enforce authentication, so attackers can invoke them directly, leading to data exposure, unauthorized logic execution, and potential cost exploitation (e.g., executing expensive AI models).
**Prevention:** Always validate a secure token (like a Firebase ID token) on the server side within the Server Action before executing the core logic. Ensure the token is passed as a separate parameter outside of Genkit/Zod payload schemas to prevent token leakage in observability logs. Use a secure backend API (e.g., Google Identity Toolkit) for token verification when the Firebase Admin SDK is not available.
