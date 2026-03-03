## 2024-05-14 - Fix Hardcoded Firebase API Key
**Vulnerability:** Firebase `apiKey` and other configuration variables were hardcoded directly into `src/firebase/config.ts`.
**Learning:** These configuration values are sensitive and must be injected via environment variables (`process.env.NEXT_PUBLIC_FIREBASE_*`) to prevent exposure in the source code.
**Prevention:** Avoid committing API keys, and instead configure environment variables via `.env.local` or environment secrets. Explicit checks were added to ensure these required environment variables exist during initialization.
