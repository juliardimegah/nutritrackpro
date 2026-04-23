## 2025-05-18 - [Fix Hardcoded Firebase Credentials]
**Vulnerability:** Firebase credentials were hardcoded in `src/firebase/config.ts`.
**Learning:** In this Next.js app, relying on silent failures or implicit typing for configuration allows misconfigured deployments to succeed but fail confusingly at runtime. Explicit runtime checking for config ensures errors are caught immediately when credentials are missing.
**Prevention:** Use environment variables for all secrets, and add explicit validation checks (`throw new Error(...)`) in configuration files to verify that essential keys are present at startup/initialization.

## 2025-05-18 - [Fix Unauthenticated Server Actions]
**Vulnerability:** Server Actions in `src/ai/flows` (like `analyzeFoodIntake` and `suggestCustomMealPlans`) were exposed to the public internet without any authentication checks, allowing anyone to bypass the intended security and rack up API costs or abuse features.
**Learning:** In Next.js applications, Server Actions (`'use server'`) function as implicit public API endpoints. Since `firebase-admin` is not used in this architecture, they must be explicitly protected by requiring a frontend Firebase `idToken` to be passed in the payload, which is then verified server-side.
**Prevention:** Always require an `idToken` in the Zod schema for Server Actions, verify it server-side using the Google Identity Toolkit REST API (`accounts:lookup`), and fetch the token on the frontend using `await auth.currentUser?.getIdToken(true)`.
