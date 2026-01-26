'use server';

/**
 * @fileOverview Generates custom meal plans based on user dietary needs and preferences.
 *
 * - suggestCustomMealPlans - A function that generates custom meal plans.
 * - SuggestCustomMealPlansInput - The input type for the suggestCustomMealPlans function.
 * - SuggestCustomMealPlansOutput - The return type for the suggestCustomMealPlans function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestCustomMealPlansInputSchema = z.object({
  age: z.number().describe('The age of the user in years.'),
  sex: z.enum(['male', 'female']).describe('The sex of the user.'),
  heightCm: z.number().describe('The height of the user in centimeters.'),
  weightKg: z.number().describe('The weight of the user in kilograms.'),
  activityLevel: z
    .enum(['sedentary', 'lightlyActive', 'moderatelyActive', 'veryActive', 'extraActive'])
    .describe('The activity level of the user.'),
  goal: z
    .enum(['weightLoss', 'weightGain', 'maintainWeight'])
    .describe('The user\u2019s goal.'),
  dietaryPreferences: z
    .string()
    .describe('Any dietary preferences or restrictions of the user.'),
  numberOfMeals: z.number().describe('The number of meals the user wants in the plan.'),
});
export type SuggestCustomMealPlansInput = z.infer<typeof SuggestCustomMealPlansInputSchema>;

const SuggestCustomMealPlansOutputSchema = z.object({
  mealPlan: z.string().describe('A detailed custom meal plan for the user.'),
});
export type SuggestCustomMealPlansOutput = z.infer<typeof SuggestCustomMealPlansOutputSchema>;

export async function suggestCustomMealPlans(
  input: SuggestCustomMealPlansInput
): Promise<SuggestCustomMealPlansOutput> {
  return suggestCustomMealPlansFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestCustomMealPlansPrompt',
  input: {schema: SuggestCustomMealPlansInputSchema},
  output: {schema: SuggestCustomMealPlansOutputSchema},
  prompt: `You are a nutrition expert who specializes in creating personalized meal plans.

  Based on the user's profile and goals, create a custom meal plan tailored to their needs and preferences. The meal plan should include specific meal suggestions, portion sizes, and nutritional information.

  User Profile:
  - Age: {{{age}}}
  - Sex: {{{sex}}}
  - Height: {{{heightCm}}} cm
  - Weight: {{{weightKg}}} kg
  - Activity Level: {{{activityLevel}}}
  - Goal: {{{goal}}}
  - Dietary Preferences: {{{dietaryPreferences}}}
  - Number of Meals: {{{numberOfMeals}}}

  Generate a detailed meal plan that includes:
  - Specific meal suggestions for each meal
  - Portion sizes for each food item
  - Total calories, macros (protein, carbs, fat), and micros for each meal.
`,
});

const suggestCustomMealPlansFlow = ai.defineFlow(
  {
    name: 'suggestCustomMealPlansFlow',
    inputSchema: SuggestCustomMealPlansInputSchema,
    outputSchema: SuggestCustomMealPlansOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
