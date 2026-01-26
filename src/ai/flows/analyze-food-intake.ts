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
  prompt: `You are an expert nutritionist. Your task is to analyze a user's food description and calculate its nutritional content based *exclusively* on the reference data provided below.

**Reference Nutritional Data (per 100g edible portion):**
KODE  NAMA BAHAN SUMBER KOMPOSISI ZAT GIZI MAKANAN PER 100 GRAM BDD BDD (%)  AIR (g)  ENERGI (Kal)  PROTEIN (g)  LEMAK (g)  KH (g)  SERAT (g)  ABU (g)  KALSIUM (mg)  FOSFOR (mg)  BESI (mg)  NATRIUM (mg)  KALIUM (mg)  TEMBAGA (mg)  SENG (mg)  RETINOL (mcg)  B-KAR (mcg)  KAR-TOTAL (mcg)  THIAMIN (mg)  RIBOFLAVIN (mg)  NIASIN (mg)  VIT_C (mg)
AR001 Beras giling, mentah KZGMI-2001 12.0 357 8.4 1.7 77.1 0.2 0.8 147 81 1.8 27 71.0 0.10 0.5 0 0 0 0.20 0.08 2.6 0 100
AR002 Beras giling var pelita, mentah KZGPI- 1990 11.4 369 9.5 1.4 77.1 0.4 0.6 68 171 1.4 34 0.0 0.00 0.0 0 0 0 0.26 0.00 0.0 0 100
AR003 Beras giling var rojolele, mentah KZGPI- 1990 12.0 357 8.4 1.7 77.1 0.2 0.8 147 81 1.8 34 112.9 0.14 0.1  0 80 0.20 0.02 1.5 0 100
AR004 Beras hitam, mentah KZGMI-2001 12.9 351 8.0 1.3 76.9 20.1 0.9 6 198 0.1 15 105.0 0.10 1.6 0 0 0 0.21 0.06 0.0 0 100
AR005 Beras jagung kuning, kering, mentah KZGMI-2001 10.8 358 5.5 0.1 82.7 10.0 0.9 20 90 1.4 1 80.0 0.10 4.1  641  0.12 0.08 1.0 3 100
AR006 Beras jagung putih, kering, mentah KZGMI-2001 22.5 307 4.8 0.1 71.8 10.0 0.8 17 78 1.2 1 70.0 0.10 3.5  301  0.15 0.07 0.9 0 100
AR007 Beras ketan hitam tumbuk, mentah KZGPI- 1990 13.7 360 8.0 2.3 74.5 1.0 1.5 10 347 6.2 11 288.0 0.28 2.2 0 0 0 0.24 0.10 2.0 0 100
AR008 Beras ketan putih tumbuk, mentah KZGPI- 1990 12.9 361 7.4 0.8 78.4 0.4 0.5 13 157 3.4 3 282.0 0.28 2.2 0 0 0 0.28 0.00 1.4 0 100
AR009 Beras ladang, mentah KZGMI-2001 9.8 376 7.5 3.8 78.0 5.9 0.9 20 110 0.8 10 70.0 0.10 1.4 0 0  0.20 0.20 5.1 0 100
AR010 Beras menir, mentah DABM-1964 12.0 362 7.7 4.4 73.0 0.2 0.2 22 272 3.7 90 201.0 0.10 0.5 0 0  0.55 0.00 1.9 0 100
AR011 Beras parboiled DABM-1964 10.0 353 6.8 0.6 80.0 0.5 2.5 5 142 0.8 2 46.0 0.28 1.0 0 0  0.22 0.11 3.4 0 100
AR012 Beras tumbuk, mentah KZGMI-2001 11.5 354 7.8 0.4 79.9 3.8 0.4 3 112 0.6 5 85.0 0.50 1.5 0 0  0.25 0.22 5.1 0 100
AR013 Beras tumbuk merah, mentah KZGPI- 1990 14.6 352 7.3 0.9 76.2 0.8 1.0 15 257 4.2 10 202.0 0.36 1.9 0 0 0 0.34 0.00 3.3 0 100
AR014 Cantel, mentah DABM-1964 11.0 366 11.0 3.3 73.0 1.2 1.7 28 287 4.4 7 249.0   0 0  0.09 0.14 2.8 0 100
AR015 Jagung muda, kuning, mentah KZGPI- 1990 61.8 147 5.1 0.7 31.5 1.3 0.9 6 122 1.1 5 33.6 0.13 0.9 0 113 261 0.24 0.10 0.8 9 100
AR016 Jagung kuning pipil, kering, mentah KZGPI- 1990 11.5 366 9.8 7.3 69.1 2.2 2.4 30 538 2.3 5 79.4 0.10 4.1  636 641 0.12 0.12 1.8 3 100
AR017 Jagung pipil var, harapan, kering KZGPI- 1990 11.3 367 6.2 5.1 76.2 2.6 1.2 7 354 2.8 1 79.6 0.10 4.1  637 385 0.19 0.08 1.0 0 100

**Your instructions:**
1.  Read the user's food description: \`{{{description}}}\`.
2.  Deconstruct the description into individual ingredients and their estimated quantities in grams. For example, "semangkuk nasi" (a bowl of rice) might be 150g of "beras giling".
3.  For each ingredient, find the closest match in the \`NAMA BAHAN\` column of the reference data.
4.  If a user provides a specific serving size in \`{{{servingSize}}}\`, prioritize that for the main ingredient. If not, you must estimate the serving size in grams (g) for solids or milliliters (ml) for liquids.
5.  Calculate the nutritional values (Calories, Protein, Carbs, Fat) for each ingredient based on its estimated weight and the reference data (which is per 100g).
6.  Sum the nutritional values of all identified ingredients to get the total for the meal.
7.  Return a single JSON object containing the total estimated nutritional content. The \`servingSize\` in the output should reflect the total weight of the meal (e.g., "350g").
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
