## 2025-05-18 - [Fix Hardcoded Firebase Credentials]
**Vulnerability:** Firebase credentials were hardcoded in `src/firebase/config.ts`.
**Learning:** In this Next.js app, relying on silent failures or implicit typing for configuration allows misconfigured deployments to succeed but fail confusingly at runtime. Explicit runtime checking for config ensures errors are caught immediately when credentials are missing.
**Prevention:** Use environment variables for all secrets, and add explicit validation checks (`throw new Error(...)`) in configuration files to verify that essential keys are present at startup/initialization.

## 2025-05-24 - [Require Auth Verification in Server Actions]
**Vulnerability:** Next.js Server Actions in `src/ai/flows` were not verifying the authentication of the caller, which allowed unauthenticated public access to sensitive endpoints.
**Learning:** In this project architecture, server actions must verify identity explicitly since there are no middleware auth checks by default for server functions. The verification must use the Google Identity Toolkit REST API (`verifyIdToken`), and the ID token needs to be passed explicitly as a function argument from the client.
**Prevention:** Always require and verify an `idToken` parameter in any server action that accesses user-specific data or authenticated AI flows, and do so using the `src/lib/auth/verify-token.ts` utility.
