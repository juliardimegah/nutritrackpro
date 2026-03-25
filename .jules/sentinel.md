## 2025-05-18 - [Fix Hardcoded Firebase Credentials]
**Vulnerability:** Firebase credentials were hardcoded in `src/firebase/config.ts`.
**Learning:** In this Next.js app, relying on silent failures or implicit typing for configuration allows misconfigured deployments to succeed but fail confusingly at runtime. Explicit runtime checking for config ensures errors are caught immediately when credentials are missing.
**Prevention:** Use environment variables for all secrets, and add explicit validation checks (`throw new Error(...)`) in configuration files to verify that essential keys are present at startup/initialization.
## 2025-05-18 - [Fix Information Exposure in Registration]
**Vulnerability:** The registration page (`src/app/register/page.tsx`) exposed raw `error.message` strings directly to the user interface via toast notifications on authentication failure.
**Learning:** Directly surfacing backend/SDK error messages to end users is an Information Exposure risk (CWE-200), as these messages can leak internal system details, IDs, or overly descriptive context that shouldn't be public.
**Prevention:** Always map expected error codes (e.g., `auth/email-already-in-use`) to safe, generic, localized user-facing messages. Provide a generic fallback for unexpected errors, and keep the raw error in server/client logs (`console.error`) for debugging purposes.
