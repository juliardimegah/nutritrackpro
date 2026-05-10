## 2025-05-18 - [Fix Hardcoded Firebase Credentials]
**Vulnerability:** Firebase credentials were hardcoded in `src/firebase/config.ts`.
**Learning:** In this Next.js app, relying on silent failures or implicit typing for configuration allows misconfigured deployments to succeed but fail confusingly at runtime. Explicit runtime checking for config ensures errors are caught immediately when credentials are missing.
**Prevention:** Use environment variables for all secrets, and add explicit validation checks (`throw new Error(...)`) in configuration files to verify that essential keys are present at startup/initialization.

## 2025-05-18 - [Missing Authentication on Server Actions]
**Vulnerability:** Next.js Server Actions `suggestCustomMealPlans` and `analyzeFoodIntake` in `src/ai/flows/` are publicly accessible without authentication.
**Learning:** Next.js Server Actions (`'use server'`) create public HTTP endpoints by default. Even if not directly exposed in the UI, an attacker can directly call the endpoint. This allows unauthenticated users to consume AI resources (Gemini API) at the application owner's expense, leading to a Denial of Wallet/Service (DoS) and potential data exposure. Since `firebase-admin` is not used, we must verify authentication by requiring an `idToken` to be passed as a separate argument and verifying it using the Google Identity Toolkit REST API.
**Prevention:** Always require and verify an `idToken` in Server Actions using the server-side verification utility (`verifyIdToken`) before processing requests, especially when they consume external resources or handle sensitive data. The `idToken` should be passed as a separate parameter outside of the main data schema to prevent it from being logged in Genkit observability systems.
