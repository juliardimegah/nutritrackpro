## 2025-05-18 - [Fix Hardcoded Firebase Credentials]
**Vulnerability:** Firebase credentials were hardcoded in `src/firebase/config.ts`.
**Learning:** In this Next.js app, relying on silent failures or implicit typing for configuration allows misconfigured deployments to succeed but fail confusingly at runtime. Explicit runtime checking for config ensures errors are caught immediately when credentials are missing.
**Prevention:** Use environment variables for all secrets, and add explicit validation checks (`throw new Error(...)`) in configuration files to verify that essential keys are present at startup/initialization.
## 2026-05-03 - [Fix Information Exposure in Registration]
**Vulnerability:** Information Exposure (CWE-200). The registration page directly displayed raw `error.message` strings from Firebase Auth to the user.
**Learning:** Returning raw backend error messages directly to the UI can expose internal implementation details or provide excessive information to an attacker.
**Prevention:** Always map expected backend error codes to safe, generic, and localized user-facing messages. Retain the raw error object in `console.error` for internal observability/debugging.
