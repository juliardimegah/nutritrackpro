## 2025-02-18 - Hardcoded Firebase Credentials
**Vulnerability:** Hardcoded Firebase API keys and configuration in `src/firebase/config.ts`.
**Learning:** The project was set up to potentially support Firebase App Hosting (which auto-injects config) but had a hardcoded fallback for development/other environments that was committed to the repo.
**Prevention:** Always use environment variables for sensitive configuration. Even for "public" keys like Firebase API keys, it's best practice to keep them out of source control to allow different environments (dev/prod) and to prevent easy scraping.
