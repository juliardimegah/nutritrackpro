## 2025-05-18 - [Fix Hardcoded Firebase Credentials]
**Vulnerability:** Firebase credentials were hardcoded in `src/firebase/config.ts`.
**Learning:** In this Next.js app, relying on silent failures or implicit typing for configuration allows misconfigured deployments to succeed but fail confusingly at runtime. Explicit runtime checking for config ensures errors are caught immediately when credentials are missing.
**Prevention:** Use environment variables for all secrets, and add explicit validation checks (`throw new Error(...)`) in configuration files to verify that essential keys are present at startup/initialization.
## 2025-05-07 - [Secure Genkit AI Server Actions]
**Vulnerability:** The `analyzeFoodIntake` and `suggestCustomMealPlans` Next.js server actions were publicly accessible without any authentication checks, allowing unauthenticated users to execute backend AI flows.
**Learning:** Next.js Server Actions (`'use server'`) function as public endpoints. They must be explicitly secured. Furthermore, because Genkit logs input parameters for observability, passing raw `idTokens` inside the Zod schema payload can lead to token leakage in logs.
**Prevention:** Always accept the `idToken` as a separate, non-schema parameter to server actions that wrap AI flows. Verify the token securely (e.g., via the Google Identity Toolkit REST API when Firebase Admin is excluded) and throw an error if missing or invalid *before* invoking the AI flow.
