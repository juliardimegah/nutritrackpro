## 2025-05-18 - [Fix Hardcoded Firebase Credentials]
**Vulnerability:** Firebase credentials were hardcoded in `src/firebase/config.ts`.
**Learning:** In this Next.js app, relying on silent failures or implicit typing for configuration allows misconfigured deployments to succeed but fail confusingly at runtime. Explicit runtime checking for config ensures errors are caught immediately when credentials are missing.
**Prevention:** Use environment variables for all secrets, and add explicit validation checks (`throw new Error(...)`) in configuration files to verify that essential keys are present at startup/initialization.

## 2025-05-19 - [Fix Missing Authentication on Server Actions]
**Vulnerability:** Server Actions in Next.js are publicly accessible endpoints by default. The `analyzeFoodIntake` and `suggestCustomMealPlans` actions lacked authentication checks, potentially allowing unauthenticated public access and abuse of the Genkit AI models.
**Learning:** In Next.js, 'use server' functions must explicitly validate authentication to prevent unauthorized execution. Because this project lacks `firebase-admin`, we must retrieve the `idToken` on the client via `await auth.currentUser?.getIdToken(true)` and pass it as a separate parameter to the server action to verify it using the Google Identity Toolkit REST API. The token should NOT be placed in the Zod payload to avoid token leakage via Genkit observability logging.
**Prevention:** Always require an `idToken` parameter on any sensitive Server Actions and use the `verifyIdToken` utility before executing business logic. Update client call sites to pass the `idToken`.
