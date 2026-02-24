## 2026-02-24 - Hardcoded Firebase Configuration
**Vulnerability:** Hardcoded Firebase client configuration keys (`apiKey`, `appId`, etc.) were found directly in `src/firebase/config.ts`.
**Learning:** Hardcoding client-side keys, while not always a critical credential leak (if restrictions are set in Firebase console), prevents environment separation (dev vs. prod) and makes rotation difficult. It also exposes the project ID directly in the codebase.
**Prevention:** Use environment variables (e.g., `NEXT_PUBLIC_*` in Next.js) for all configuration values. Added runtime validation in `src/firebase/config.ts` to ensure required variables are present, failing securely if they are missing.
