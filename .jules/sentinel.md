## 2026-02-18 - Hardcoded Firebase Configuration
**Vulnerability:** Hardcoded Firebase API keys and configuration in `src/firebase/config.ts`.
**Learning:** Developers sometimes hardcode configuration for convenience, not realizing that client-side code exposes these keys and ties the codebase to a specific project.
**Prevention:** Always use `process.env` for configuration values and ensure `.env` files are gitignored. Use `.env.example` to document required variables.
