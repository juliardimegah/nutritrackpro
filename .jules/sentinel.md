## 2025-05-18 - [Fix Hardcoded Firebase Credentials]
**Vulnerability:** Firebase credentials were hardcoded in `src/firebase/config.ts`.
**Learning:** In this Next.js app, relying on silent failures or implicit typing for configuration allows misconfigured deployments to succeed but fail confusingly at runtime. Explicit runtime checking for config ensures errors are caught immediately when credentials are missing.
**Prevention:** Use environment variables for all secrets, and add explicit validation checks (`throw new Error(...)`) in configuration files to verify that essential keys are present at startup/initialization.

## 2025-05-18 - [Fix Missing Authentication on Server Actions]
**Vulnerability:** AI Server Actions in `src/ai/flows/` were fully unauthenticated and publicly accessible, posing a risk of unauthorized API usage and billing abuse.
**Learning:** Because Server Actions act as backend endpoints, they bypass traditional page-level authentication wrappers. Relying on payload schema validation is insufficient, and directly including tokens in Genkit payloads risks leaking them in observability logs. The architecture requires passing tokens outside the schema payload.
**Prevention:** Always require `idToken` as a separate argument to sensitive Server Actions and use a server-side verification utility (e.g., Google Identity Toolkit REST API when `firebase-admin` is unavailable) to validate the caller before processing the request.
