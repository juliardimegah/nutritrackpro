## 2025-05-18 - [Fix Hardcoded Firebase Credentials]
**Vulnerability:** Firebase credentials were hardcoded in `src/firebase/config.ts`.
**Learning:** In this Next.js app, relying on silent failures or implicit typing for configuration allows misconfigured deployments to succeed but fail confusingly at runtime. Explicit runtime checking for config ensures errors are caught immediately when credentials are missing.
**Prevention:** Use environment variables for all secrets, and add explicit validation checks (`throw new Error(...)`) in configuration files to verify that essential keys are present at startup/initialization.

## 2024-05-18 - Missing Authentication Checks on Next.js Server Actions
**Vulnerability:** Next.js Server Actions (e.g., `analyzeFoodIntake`, `suggestCustomMealPlans`) are publicly accessible endpoints. They take input directly without any authentication check. This allows anyone to call these functions and abuse the underlying Genkit/AI resources, leading to potential DoS or billing issues, and unauthorized access.
**Learning:** Even though Server Actions might not have direct UI call sites, their signature acts as a public API endpoint. They must explicitly validate the `idToken` to prevent unauthenticated access. The `idToken` should be passed as a separate function argument outside the Zod schema payload to prevent token leakage in Genkit logging.
**Prevention:** Always require an `idToken` parameter and verify it server-side using the Google Identity Toolkit REST API (`accounts:lookup`) before executing the core logic of a Next.js Server Action, especially those interacting with third-party or costly services like AI.
