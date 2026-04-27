## 2025-05-18 - [Fix Hardcoded Firebase Credentials]
**Vulnerability:** Firebase credentials were hardcoded in `src/firebase/config.ts`.
**Learning:** In this Next.js app, relying on silent failures or implicit typing for configuration allows misconfigured deployments to succeed but fail confusingly at runtime. Explicit runtime checking for config ensures errors are caught immediately when credentials are missing.
**Prevention:** Use environment variables for all secrets, and add explicit validation checks (`throw new Error(...)`) in configuration files to verify that essential keys are present at startup/initialization.

## 2025-05-18 - [Missing Authentication on Server Actions]
**Vulnerability:** Server Actions in Next.js (e.g., `src/ai/flows/analyze-food-intake.ts` and `suggest-custom-meal-plans.ts`) were accessible publicly without any authentication. This allowed unauthenticated users to trigger AI flows.
**Learning:** Next.js Server Actions are essentially public API endpoints. If they perform sensitive actions or use expensive resources like AI generation, they must be explicitly protected. Because this project avoids `firebase-admin`, tokens must be passed from the client (`auth.currentUser?.getIdToken(true)`) and verified server-side using the Identity Toolkit REST API.
**Prevention:** Always require and verify an `idToken` in Server Actions before proceeding with the core logic. Ensure frontend call sites pass the token securely.
