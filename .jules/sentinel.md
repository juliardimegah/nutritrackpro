## 2025-05-18 - [Fix Hardcoded Firebase Credentials]
**Vulnerability:** Firebase credentials were hardcoded in `src/firebase/config.ts`.
**Learning:** In this Next.js app, relying on silent failures or implicit typing for configuration allows misconfigured deployments to succeed but fail confusingly at runtime. Explicit runtime checking for config ensures errors are caught immediately when credentials are missing.
**Prevention:** Use environment variables for all secrets, and add explicit validation checks (`throw new Error(...)`) in configuration files to verify that essential keys are present at startup/initialization.

## 2026-04-07 - [Prevent Information Exposure in Authentication Error Responses]
**Vulnerability:** Raw Firebase `error.message` strings were directly exposed to users in UI toast notifications on the registration page (CWE-200).
**Learning:** Passing generic error strings to users risks leaking internal implementation details (e.g., identity toolkit states, email existence). The correct approach maps explicit error codes to safe, localized messages, while strictly logging the raw error object to console for debugging.
**Prevention:** Map specific error codes (e.g., `auth/email-already-in-use`) to localized, user-facing error messages instead of passing generic `error.message` to UI elements.
