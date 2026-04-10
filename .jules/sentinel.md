## 2025-05-18 - [Fix Hardcoded Firebase Credentials]
**Vulnerability:** Firebase credentials were hardcoded in `src/firebase/config.ts`.
**Learning:** In this Next.js app, relying on silent failures or implicit typing for configuration allows misconfigured deployments to succeed but fail confusingly at runtime. Explicit runtime checking for config ensures errors are caught immediately when credentials are missing.
**Prevention:** Use environment variables for all secrets, and add explicit validation checks (`throw new Error(...)`) in configuration files to verify that essential keys are present at startup/initialization.
## 2025-05-20 - [Fix Information Exposure in Error Toasts]
**Vulnerability:** Registration error messages were directly exposing `error.message` to the user via toast notifications in `src/app/register/page.tsx` (CWE-200 Information Exposure).
**Learning:** Directly rendering error messages from backend or external services (like Firebase Auth) can leak internal system details, path information, or unlocalized strings to the end user.
**Prevention:** Map specific expected error codes (e.g., `auth/email-already-in-use`) to safe, localized user-facing messages. Always use a generic fallback for unknown errors, and ensure raw errors are only logged to `console.error` for debugging observability.
