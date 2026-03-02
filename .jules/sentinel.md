## 2024-05-24 - [CRITICAL] Hardcoded API Key in Firebase Config
**Vulnerability:** Found hardcoded `apiKey`, `appId`, `projectId`, `authDomain`, and `messagingSenderId` in `src/firebase/config.ts`.
**Learning:** Hardcoded credentials can be leaked easily through source control or client-side bundles if not properly guarded.
**Prevention:** Always use `process.env.*` variables for secrets and add runtime validation to ensure configuration is present without iteration, per coding standards.
