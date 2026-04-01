## 2025-05-18 - [Fix Hardcoded Firebase Credentials]
**Vulnerability:** Firebase credentials were hardcoded in `src/firebase/config.ts`.
**Learning:** In this Next.js app, relying on silent failures or implicit typing for configuration allows misconfigured deployments to succeed but fail confusingly at runtime. Explicit runtime checking for config ensures errors are caught immediately when credentials are missing.
**Prevention:** Use environment variables for all secrets, and add explicit validation checks (`throw new Error(...)`) in configuration files to verify that essential keys are present at startup/initialization.

## 2025-05-18 - [Fix Missing Authentication in Server Actions]
**Vulnerability:** Server Actions connecting to backend services or Genkit flows lacked proper authentication checks, allowing unauthenticated or malicious calls directly to the endpoints.
**Learning:** In Next.js Server Actions connecting with Firebase (especially when `firebase-admin` is not used), authentication must be manually verified. An `idToken` string must be retrieved by the frontend (via `await user.getIdToken()`), passed into the server action, and then verified server-side using the Google Identity Toolkit REST API (`accounts:lookup`).
**Prevention:** Add `idToken` to all Server Action input schemas that require authentication. Validate this token server-side immediately upon execution, throwing an unauthorized error if validation fails.
