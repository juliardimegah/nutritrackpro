## 2025-05-18 - [Fix Hardcoded Firebase Credentials]
**Vulnerability:** Firebase credentials were hardcoded in `src/firebase/config.ts`.
**Learning:** In this Next.js app, relying on silent failures or implicit typing for configuration allows misconfigured deployments to succeed but fail confusingly at runtime. Explicit runtime checking for config ensures errors are caught immediately when credentials are missing.
**Prevention:** Use environment variables for all secrets, and add explicit validation checks (`throw new Error(...)`) in configuration files to verify that essential keys are present at startup/initialization.

## 2025-05-18 - [Fix Missing Auth on Server Actions]
**Vulnerability:** Next.js Server Actions `analyzeFoodIntake` and `suggestCustomMealPlans` lacked authentication checks and were vulnerable to unauthorized access.
**Learning:** In a Next.js App, Server Actions are publicly accessible endpoints. We must explicitly check the authentication state when running logic that connects to APIs, services, and Genkit AI flows to prevent unauthorized execution.
**Prevention:** Pass an `idToken` from the frontend side and verify it via `verifyIdToken` in server actions before processing data. Ensure all call sites are updated when doing this signature update.
