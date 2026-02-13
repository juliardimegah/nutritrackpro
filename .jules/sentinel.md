## 2024-05-22 - [AI Input Validation]
**Vulnerability:** Unbounded input fields in AI flows (`description`, `dietaryPreferences`) allowed for potential DoS or excessive cost via large payloads.
**Learning:** Genkit flows directly use the Zod schema for validation. Adding constraints here effectively sanitizes input before it reaches the LLM.
**Prevention:** Always add `.max()` and `.min()` constraints to string inputs and reasonable bounds to numeric inputs in Zod schemas for AI flows.
