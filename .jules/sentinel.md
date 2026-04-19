## 2025-05-18 - [Fix Hardcoded Firebase Credentials]
**Vulnerability:** Firebase credentials were hardcoded in `src/firebase/config.ts`.
**Learning:** In this Next.js app, relying on silent failures or implicit typing for configuration allows misconfigured deployments to succeed but fail confusingly at runtime. Explicit runtime checking for config ensures errors are caught immediately when credentials are missing.
**Prevention:** Use environment variables for all secrets, and add explicit validation checks (`throw new Error(...)`) in configuration files to verify that essential keys are present at startup/initialization.

## 2025-05-18 - [Fix Information Exposure (CWE-200) in Registration Page]
**Vulnerability:** The raw Firebase error message string (`error.message`) was exposed directly to the user interface via a toast notification during a failed registration attempt in `src/app/register/page.tsx`.
**Learning:** Returning raw error objects, specifically error messages from third-party libraries (like Firebase Auth), exposes potentially sensitive system and implementation details to the end-user. Relying on an internal system's error message isn't safe for user display.
**Prevention:** Always map expected error codes (e.g., `auth/email-already-in-use`, `auth/weak-password`) to safe, user-friendly, and localized messages in the UI. Keep raw error logs in `console.error` exclusively for observability and debugging, and use a generic fallback message for unmapped errors.
