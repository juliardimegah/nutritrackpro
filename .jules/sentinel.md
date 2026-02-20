## 2024-05-23 - Hardcoded Firebase Secrets
**Vulnerability:** Hardcoded Firebase API keys and project IDs in `src/firebase/config.ts`.
**Learning:** Developers often hardcode configuration for convenience, but this exposes sensitive data if the repo is public or shared.
**Prevention:** Use environment variables (e.g., `NEXT_PUBLIC_FIREBASE_...`) and `.env.local` for local development. Commit `.env.example` to document required variables.
