## 2024-05-22 - Hardcoded Firebase Config
**Vulnerability:** Firebase configuration, including API keys and project IDs, was hardcoded directly in `src/firebase/config.ts`.
**Learning:** Hardcoding configuration makes it difficult to manage different environments (dev/prod) and risks exposing sensitive data if the repository is made public or shared inappropriately. Even though Firebase API keys are technically public, treating them as environment variables is a best practice for clean architecture and security hygiene.
**Prevention:** Always use environment variables for configuration. In Next.js, use `NEXT_PUBLIC_` prefix for variables exposed to the client.
