## 2025-05-18 - Hardcoded Firebase Config in Fallback

**Vulnerability:** Hardcoded API keys and project IDs in `src/firebase/config.ts`.
**Learning:** The project uses `src/firebase/index.ts` to initialize Firebase. It attempts to use App Hosting environment variables first (no-arg `initializeApp()`), and falls back to `firebaseConfig` object if that fails. This fallback object contained hardcoded secrets, exposing them in the source code.
**Prevention:** All configuration in `src/firebase/config.ts` must be sourced from `process.env.NEXT_PUBLIC_*` variables. A runtime validation check was added to ensure these variables are present, preventing the app from running with an invalid configuration in local development or other environments where App Hosting auto-init doesn't apply.
