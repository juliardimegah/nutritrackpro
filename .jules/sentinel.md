## 2025-05-18 - [Prevent Information Exposure (CWE-200) in Authentication Flows]
**Vulnerability:** The registration flow exposed raw `error.message` strings directly to the user via a UI toast (`src/app/register/page.tsx`).
**Learning:** Returning raw backend or third-party error messages (like Firebase Auth errors) directly in the UI can leak sensitive context or implementation details to users/attackers. The UI should always map known error codes to safe, localized messages.
**Prevention:** Always catch authentication or backend errors and map their error codes (e.g., `error.code === 'auth/email-already-in-use'`) to generic, safe UI messages. Never use `error.message` for user-facing output.

## 2025-05-18 - [Fix Hardcoded Firebase Credentials]
**Vulnerability:** Firebase credentials were hardcoded in `src/firebase/config.ts`.
**Learning:** In this Next.js app, relying on silent failures or implicit typing for configuration allows misconfigured deployments to succeed but fail confusingly at runtime. Explicit runtime checking for config ensures errors are caught immediately when credentials are missing.
**Prevention:** Use environment variables for all secrets, and add explicit validation checks (`throw new Error(...)`) in configuration files to verify that essential keys are present at startup/initialization.
