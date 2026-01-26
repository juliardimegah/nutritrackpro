import type { ActivityLevel, HealthIssue } from './types';

export const ACTIVITY_LEVELS: { value: ActivityLevel; label: string }[] = [
  { value: 'sedentary', label: 'Sedentary (little to no exercise)' },
  { value: 'lightlyActive', label: 'Lightly Active (exercise 1-3 days/week)' },
  { value: 'moderatelyActive', label: 'Moderately Active (exercise 3-5 days/week)' },
  { value: 'veryActive', label: 'Very Active (hard exercise 6-7 days/week)' },
  { value: 'extraActive', label: 'Extra Active (very hard exercise & physical job)' },
];

export const GOALS: { value: 'weightLoss' | 'maintainWeight' | 'weightGain'; label: string }[] = [
  { value: 'weightLoss', label: 'Weight Loss' },
  { value: 'maintainWeight', label: 'Maintain Weight' },
  { value: 'weightGain', label: 'Weight Gain' },
];

export const HEALTH_ISSUES: { value: HealthIssue; label: string }[] = [
  { value: 'none', label: 'None' },
  { value: 'diabetes', label: 'Diabetes' },
  { value: 'heartDisease', label: 'Heart Disease' },
];

export const ACTIVITY_MULTIPLIERS: Record<ActivityLevel, number> = {
  sedentary: 1.2,
  lightlyActive: 1.375,
  moderatelyActive: 1.55,
  veryActive: 1.725,
  extraActive: 1.9,
};

// Macronutrient ratios (as a percentage of total calories)
// Protein: 4 kcal/g, Carbs: 4 kcal/g, Fat: 9 kcal/g
export const MACRO_RATIOS = {
    weightLoss: { protein: 0.35, carbs: 0.40, fat: 0.25 },
    maintainWeight: { protein: 0.25, carbs: 0.50, fat: 0.25 },
    weightGain: { protein: 0.30, carbs: 0.50, fat: 0.20 },
};

export const HEALTH_ISSUE_MACRO_ADJUSTMENTS: Record<Exclude<HealthIssue, 'none'>, {protein: number, carbs: number, fat: number}> = {
  diabetes: { protein: 0.30, carbs: 0.40, fat: 0.30 }, // Lower carb
  heartDisease: { protein: 0.30, carbs: 0.55, fat: 0.15 }, // Lower fat
};

export const CALORIE_ADJUSTMENT = {
    weightLoss: -500,
    maintainWeight: 0,
    weightGain: 500,
}
