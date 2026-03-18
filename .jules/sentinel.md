## 2024-05-18 - [Prevent Information Exposure (CWE-200) in Registration]
**Vulnerability:** The application was directly displaying raw error messages (`error.message`) to users via toast notifications on registration failure.
**Learning:** This pattern can expose sensitive internal information, such as stack traces, database structures, or internal API details, violating the CWE-200 principle (Exposure of Sensitive Information to an Unauthorized Actor).
**Prevention:** Always use generic, localized error messages for user-facing UI elements (e.g., toasts) to prevent information leakage, while retaining the raw error object in server logs or console errors for observability and debugging.
