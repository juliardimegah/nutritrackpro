'use server';
/**
 * @fileOverview An AI agent to analyze food descriptions and return nutritional information.
 *
 * - analyzeFoodIntake - A function that analyzes a food description.
 * - AnalyzeFoodInput - The input type for the analyzeFoodIntake function.
 * - AnalyzedFoodOutput - The return type for the analyzeFoodIntake function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeFoodInputSchema = z.object({
  description: z
    .string()
    .describe(
      'A natural language description of a meal or food item, including quantities.'
    ),
  servingSize: z
    .string()
    .optional()
    .describe('An optional user-provided serving size (e.g., "150g", "250ml").'),
});
export type AnalyzeFoodInput = z.infer<typeof AnalyzeFoodInputSchema>;

const AnalyzedFoodOutputSchema = z.object({
  name: z
    .string()
    .describe('A short, descriptive name for the food item. e.g. "Oatmeal with blueberries"'),
  calories: z
    .number()
    .describe('Estimated total calories for the entire meal described.'),
  protein: z.number().describe('Estimated total protein in grams.'),
  carbs: z.number().describe('Estimated total carbohydrates in grams.'),
  fat: z.number().describe('Estimated total fat in grams.'),
  servingSize: z
    .string()
    .describe(
      'The serving size that these nutritional values correspond to. Use grams (g) for solid foods and milliliters (ml) for liquids. e.g., "250g", "500ml".'
    ),
});
export type AnalyzedFoodOutput = z.infer<typeof AnalyzedFoodOutputSchema>;

export async function analyzeFoodIntake(
  input: AnalyzeFoodInput
): Promise<AnalyzedFoodOutput> {
  return analyzeFoodIntakeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeFoodIntakePrompt',
  input: {schema: AnalyzeFoodInputSchema},
  output: {schema: AnalyzedFoodOutputSchema},
  prompt: `You are an expert nutritionist. Analyze the user's food description and provide an estimate of its nutritional content.

      Food Description: {{{description}}}

      {{#if servingSize}}
      The user has specified a serving size. Calculate the nutritional information for the following serving size: {{{servingSize}}}.
      The 'servingSize' field in your output JSON should match this user-provided value.
      {{else}}
      The user has not specified a serving size. Estimate the serving size based on the description.
      When estimating serving size, use grams (g) for solid foods and milliliters (ml) for liquids.
      The 'servingSize' field in your output JSON should be your estimate.
      {{/if}}

      Return a single JSON object with your analysis.
      `,
});

const analyzeFoodIntakeFlow = ai.defineFlow(
  {
    name: 'analyzeFoodIntakeFlow',
    inputSchema: AnalyzeFoodInputSchema,
    outputSchema: AnalyzedFoodOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
