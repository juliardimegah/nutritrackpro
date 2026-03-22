## 2025-05-18 - [Fix Hardcoded Firebase Credentials]
**Vulnerability:** Firebase credentials were hardcoded in `src/firebase/config.ts`.
**Learning:** In this Next.js app, relying on silent failures or implicit typing for configuration allows misconfigured deployments to succeed but fail confusingly at runtime. Explicit runtime checking for config ensures errors are caught immediately when credentials are missing.
**Prevention:** Use environment variables for all secrets, and add explicit validation checks (`throw new Error(...)`) in configuration files to verify that essential keys are present at startup/initialization.

## 2024-03-21 - [MEDIUM] Error Information Exposure in Registration Flow
**Vulnerability:** The raw error message from the Firebase `createUserWithEmailAndPassword` catch block was directly exposed to the user in the UI toast description (`error.message`). This can potentially leak internal state or infrastructure details (CWE-200).
**Learning:** During error handling on the frontend, catching all errors generically and returning the raw string from third-party services is risky and violates defense-in-depth principles. This application's architecture must strictly separate developer logs (`console.error`) from user-facing error messages to prevent Information Exposure.
**Prevention:** Catch blocks that interact with UI components (like toasts or alerts) must map raw error objects to predefined, generic, localized strings (e.g., `t('register.toast.unexpected_error_description')`). Raw error objects should only be retained in secure contexts like `console.error` for observability and debugging.
