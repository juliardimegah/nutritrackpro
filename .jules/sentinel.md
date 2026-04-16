## 2025-05-18 - [Fix Hardcoded Firebase Credentials]
**Vulnerability:** Firebase credentials were hardcoded in `src/firebase/config.ts`.
**Learning:** In this Next.js app, relying on silent failures or implicit typing for configuration allows misconfigured deployments to succeed but fail confusingly at runtime. Explicit runtime checking for config ensures errors are caught immediately when credentials are missing.
**Prevention:** Use environment variables for all secrets, and add explicit validation checks (`throw new Error(...)`) in configuration files to verify that essential keys are present at startup/initialization.

## 2025-05-18 - [Prevent Information Exposure in Registration Error Handling]
**Vulnerability:** The registration page was displaying raw error messages (`error.message`) directly to the user via toast notifications on failure (CWE-200 Information Exposure).
**Learning:** Displaying raw error messages can leak internal system details, authentication logic, or unlocalized strings to the end user. It violates the "Fail securely" and "Secure error messages" principles.
**Prevention:** Catch authentication errors and map specific error codes (like `auth/email-already-in-use`, `auth/weak-password`) to predefined, localized, user-safe error messages. Provide a generic fallback message for unhandled error codes while keeping the raw error in `console.error` for debugging.
