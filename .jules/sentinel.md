## 2025-05-18 - [Fix Hardcoded Firebase Credentials]
**Vulnerability:** Firebase credentials were hardcoded in `src/firebase/config.ts`.
**Learning:** In this Next.js app, relying on silent failures or implicit typing for configuration allows misconfigured deployments to succeed but fail confusingly at runtime. Explicit runtime checking for config ensures errors are caught immediately when credentials are missing.
**Prevention:** Use environment variables for all secrets, and add explicit validation checks (`throw new Error(...)`) in configuration files to verify that essential keys are present at startup/initialization.
## 2025-05-18 - [Fix Cross-Site Scripting (XSS) vulnerability in ChartStyle component]
**Vulnerability:** The `ChartStyle` component in `src/components/ui/chart.tsx` used `dangerouslySetInnerHTML` to inject CSS styles. While the inputs were tightly controlled, relying on `dangerouslySetInnerHTML` is a security code smell and can lead to XSS if an attacker controls `id` or `config` keys.
**Learning:** Removing `dangerouslySetInnerHTML` and replacing it with standard React children (`<style>{...}</style>`) is a widely recommended best practice as it prevents bypassing React's built-in protections unnecessarily and silences valid security linter warnings.
**Prevention:** Avoid using `dangerouslySetInnerHTML` whenever possible, especially when injecting dynamic content. Instead, rely on React's built-in escaping mechanisms by passing content as children.
