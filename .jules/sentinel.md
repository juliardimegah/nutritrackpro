## 2026-02-17 - Hardcoded Firebase Config
**Vulnerability:** Firebase configuration values, including API key, were hardcoded in `src/firebase/config.ts`.
**Learning:** Hardcoding sensitive configuration makes it easy to leak credentials if the repository is made public or accessed by unauthorized users. Even though Firebase keys are often public, using environment variables is best practice for environment segregation and credential management.
**Prevention:** always use `process.env.*` for configuration values.
