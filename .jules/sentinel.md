## 2026-02-22 - Hardcoded Firebase Configuration
**Vulnerability:** Hardcoded Firebase configuration values, including API key and project ID, in `src/firebase/config.ts`.
**Learning:** Secrets and configuration values should never be hardcoded in the source code. While Firebase config values are generally considered public, hardcoding them prevents environment separation and risks exposure if the repository becomes public.
**Prevention:** Use environment variables (e.g., `process.env.NEXT_PUBLIC_*`) for all configuration values. Store local development values in `.env.local` (which is git-ignored) and document required variables in `.env.example`.
