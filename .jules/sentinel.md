## 2024-05-23 - Hardcoded Firebase Credentials

**Vulnerability:** Hardcoded Firebase API key and project configuration in `src/firebase/config.ts`.
**Learning:** The project relied on client-side hardcoding for Firebase config, likely for ease of setup, but this exposes keys in source control.
**Prevention:** Use environment variables (NEXT_PUBLIC_*) for all configuration, even if technically "public" in client-side code, to facilitate rotation and environment separation.
