## 2025-05-18 - [Fix Hardcoded Firebase Credentials]
**Vulnerability:** Firebase credentials were hardcoded in `src/firebase/config.ts`.
**Learning:** In this Next.js app, relying on silent failures or implicit typing for configuration allows misconfigured deployments to succeed but fail confusingly at runtime. Explicit runtime checking for config ensures errors are caught immediately when credentials are missing.
**Prevention:** Use environment variables for all secrets, and add explicit validation checks (`throw new Error(...)`) in configuration files to verify that essential keys are present at startup/initialization.

## 2025-05-18 - [Add Auth to Next.js Server Actions]
**Vulnerability:** Next.js Server Actions are public API endpoints by default and can be invoked directly from the client without checking if the user is authenticated. This allowed unauthenticated users to trigger AI features like `analyzeFoodIntake` and `suggestCustomMealPlans`.
**Learning:** Genkit observability automatically logs action payloads and schema inputs. Therefore, Firebase ID tokens MUST NOT be placed inside the standard Zod input payload, or they will leak to logs. Tokens must be passed as an additional, separate argument to the Server Action.
**Prevention:** Always require an `idToken` parameter (outside of input payloads) for Server Actions. Validate the token server-side using the `verifyToken` function which uses Google Identity Toolkit API. Ensure frontend components fetch and pass `auth.currentUser?.getIdToken()` when invoking protected Server Actions.
