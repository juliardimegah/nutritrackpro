## 2025-05-18 - [Fix Hardcoded Firebase Credentials]
**Vulnerability:** Firebase credentials were hardcoded in `src/firebase/config.ts`.
**Learning:** In this Next.js app, relying on silent failures or implicit typing for configuration allows misconfigured deployments to succeed but fail confusingly at runtime. Explicit runtime checking for config ensures errors are caught immediately when credentials are missing.
**Prevention:** Use environment variables for all secrets, and add explicit validation checks (`throw new Error(...)`) in configuration files to verify that essential keys are present at startup/initialization.

## 2025-05-18 - [Add Authentication Checks to AI Server Actions]
**Vulnerability:** AI Server Actions (`analyzeFoodIntake` and `suggestCustomMealPlans`) lacked any authentication validation, exposing them to unauthorized execution and potential abuse or data leakage.
**Learning:** Even when standard authentication libraries (like `firebase-admin`) are unavailable, Server Actions and Genkit flows must explicitly require and validate client authentication tokens. Relying solely on frontend UI state for security leaves the backend vulnerable to direct invocation.
**Prevention:** Explicitly pass the user's ID token as an argument to the Server Action payload. Create a custom utility (`verifyIdToken`) using the Google Identity Toolkit REST API (or similar robust method) to verify the token server-side before executing any sensitive logic.
