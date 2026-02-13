# Sentinel Journal

## 2026-02-13 - Hardcoded Firebase Configuration
**Vulnerability:** Hardcoded Firebase configuration values, including the API key, were found directly in `src/firebase/config.ts`.
**Learning:** While Firebase client-side keys are technically public, hardcoding them prevents environment-specific configurations and makes key rotation difficult. It also sets a bad precedent for handling secrets.
**Prevention:** Always use environment variables (e.g., `NEXT_PUBLIC_...` in Next.js) for configuration values. Provide a `.env.example` file to document required variables without committing the actual values.
