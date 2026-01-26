'use server';
/**
 * @fileOverview Dietary suggestion AI agent.
 *
 * - generateDietarySuggestions - A function that generates dietary suggestions.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateDietarySuggestionsInputSchema = z.object({
  profile: z
    .string()
    .describe('User profile data including age, sex, height, weight, and activity level.'),
  dietaryLogs: z
    .string()
    .describe('User dietary logs, including food intake and nutritional information.'),
  goals: z
    .string()
    .describe('User health and fitness goals, e.g., weight loss, muscle gain, or maintenance.'),
  documentText: z
    .string()
    .optional()
    .describe('Optional text from a user-provided document, like a health report.'),
});
type GenerateDietarySuggestionsInput = z.infer<
  typeof GenerateDietarySuggestionsInputSchema
>;

const GenerateDietarySuggestionsOutputSchema = z.object({
  suggestions: z
    .string()
    .describe('Personalized dietary suggestions based on user profile and dietary logs. Format the response in markdown.'),
});
type GenerateDietarySuggestionsOutput = z.infer<
  typeof GenerateDietarySuggestionsOutputSchema
>;

export async function generateDietarySuggestions(
  input: GenerateDietarySuggestionsInput
): Promise<GenerateDietarySuggestionsOutput> {
  return generateDietarySuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateDietarySuggestionsPrompt',
  input: {schema: GenerateDietarySuggestionsInputSchema},
  output: {schema: GenerateDietarySuggestionsOutputSchema},
  prompt: `You are a personal nutrition assistant. Based on the user's profile, dietary logs, and goals, you will generate personalized dietary suggestions. Format your response in markdown.

User Profile: {{{profile}}}
Dietary Logs: {{{dietaryLogs}}}
Goals: {{{goals}}}

{{#if documentText}}
Also, consider the following information provided by the user from a document:
---
{{{documentText}}}
---
{{/if}}

Suggestions:`,
});

const generateDietarySuggestionsFlow = ai.defineFlow(
  {
    name: 'generateDietarySuggestionsFlow',
    inputSchema: GenerateDietarySuggestionsInputSchema,
    outputSchema: GenerateDietarySuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
