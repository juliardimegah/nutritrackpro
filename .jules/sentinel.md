## 2026-02-23 - Hardcoded Firebase Credentials
**Vulnerability:** Hardcoded Firebase API keys and configuration in `src/firebase/config.ts`.
**Learning:** While Firebase client-side config is not strictly a "secret", hardcoding it makes it difficult to manage across environments (dev/prod) and can lead to accidental exposure of other sensitive keys. It also violates the principle of configuration separation.
**Prevention:** Use environment variables (e.g., `NEXT_PUBLIC_FIREBASE_*`) for all configuration values. Added runtime validation to ensure required keys are present.
