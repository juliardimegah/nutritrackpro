## 2026-02-14 - Hardcoded Firebase Configuration
**Vulnerability:** Found hardcoded Firebase project credentials (including API key) in `src/firebase/config.ts`. While Firebase API keys are technically public, committing them to source control is bad practice as it exposes the project to usage abuse and potential misconfiguration.
**Learning:** Initial setup or quick prototyping likely led to hardcoding these values.
**Prevention:** Use environment variables (e.g., `NEXT_PUBLIC_FIREBASE_API_KEY`) for all configuration values that vary between environments or are sensitive. Added `.env.example` to guide future developers.
