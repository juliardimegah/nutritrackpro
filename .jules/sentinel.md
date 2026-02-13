# Sentinel Journal

## 2026-02-13 - Hardcoded Firebase Configuration
**Vulnerability:** Hardcoded Firebase configuration values, including the API key, were found directly in `src/firebase/config.ts`.
**Learning:** While Firebase client-side keys are technically public, hardcoding them prevents environment-specific configurations and makes key rotation difficult. It also sets a bad precedent for handling secrets.
**Prevention:** Always use environment variables (e.g., `NEXT_PUBLIC_...` in Next.js) for configuration values. Provide a `.env.example` file to document required variables without committing the actual values.

## 2026-02-13 - Information Leakage via Error Messages
**Vulnerability:** The login and registration pages were logging full error objects to the console (`console.error('Login failed:', error)`). The registration page was also displaying raw error messages to the user (`error.message`).
**Learning:** Raw error messages can expose implementation details or specific reasons for authentication failure (e.g., distinguishing between "user not found" and "wrong password" if not handled carefully, or leaking backend stack traces in other contexts). Displaying raw messages to users is also poor UX.
**Prevention:** Always sanitize error logs in client-side code. Use generic error messages for the user interface, or map specific error codes to localized, safe messages.
