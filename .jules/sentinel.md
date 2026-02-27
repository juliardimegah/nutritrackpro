## 2024-05-24 - Hardcoded Firebase Configuration

**Vulnerability:** Hardcoded Firebase API keys and configuration details were found in `src/firebase/config.ts`.
**Learning:** Hardcoding secrets or configuration in the source code exposes them to anyone with access to the repository. Even if the repository is private, it's a security risk if the code is ever leaked or if access controls are not strictly managed. It also makes it difficult to manage different environments (dev, staging, prod).
**Prevention:** Use environment variables to store sensitive configuration. I've moved the configuration to `.env.local` and updated `src/firebase/config.ts` to read from `process.env`. I also added runtime validation to ensure required keys are present.
