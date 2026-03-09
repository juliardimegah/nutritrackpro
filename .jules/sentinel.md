## 2025-05-18 - [Fix Hardcoded Firebase Credentials]
**Vulnerability:** Firebase credentials were hardcoded in `src/firebase/config.ts`.
**Learning:** In this Next.js app, relying on silent failures or implicit typing for configuration allows misconfigured deployments to succeed but fail confusingly at runtime. Explicit runtime checking for config ensures errors are caught immediately when credentials are missing.
**Prevention:** Use environment variables for all secrets, and add explicit validation checks (`throw new Error(...)`) in configuration files to verify that essential keys are present at startup/initialization.

## 2026-03-09 - [Fix Information Exposure in Registration]
**Vulnerability:** Raw error messages from Firebase authentication were exposed to the user in the registration form via a toast notification.
**Learning:** Returning `error.message` directly in user-facing UI can leak sensitive internal state or system details, leading to an Information Exposure (CWE-200) vulnerability.
**Prevention:** Always use generic, localized fallback error messages for user-facing UI elements like toasts or modals, and limit detailed raw error reporting to internal logs (e.g., `console.error`) for debugging purposes.
