## 2026-02-26 - [Hardcoded Firebase Config]
**Vulnerability:** Firebase configuration (apiKey, authDomain, etc.) was hardcoded in `src/firebase/config.ts`.
**Learning:** This likely happened during initial setup where keys were pasted directly for convenience.
**Prevention:** Always use environment variables for configuration. Added `.env.example` and runtime validation to prevent regression.
