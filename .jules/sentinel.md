## 2026-02-16 - Hardcoded Firebase Configuration
**Vulnerability:** Firebase configuration values (including API keys) were hardcoded in `src/firebase/config.ts`.
**Learning:** Hardcoded secrets in source control can be easily extracted and used maliciously, compromising the application's security.
**Prevention:** Use environment variables (e.g., `NEXT_PUBLIC_FIREBASE_API_KEY`) for all sensitive configuration. Create `.env.example` for required keys and `.env.local` for local development.
