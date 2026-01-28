import type { ActivityLevel, HealthIssue } from './types';

export const ACTIVITY_LEVELS: { value: ActivityLevel; labelKey: string }[] = [
  { value: 'sedentary', labelKey: 'activity.sedentary' },
  { value: 'lightlyActive', labelKey: 'activity.lightlyActive' },
  { value: 'moderatelyActive', labelKey: 'activity.moderatelyActive' },
  { value: 'veryActive', labelKey: 'activity.veryActive' },
  { value: 'extraActive', labelKey: 'activity.extraActive' },
];

export const GOALS: { value: 'weightLoss' | 'maintainWeight' | 'weightGain'; labelKey: string }[] = [
  { value: 'weightLoss', labelKey: 'goal.weightLoss' },
  { value: 'maintainWeight', labelKey: 'goal.maintainWeight' },
  { value: 'weightGain', labelKey: 'goal.weightGain' },
];

export const HEALTH_ISSUES: { value: HealthIssue; labelKey: string }[] = [
  { value: 'none', labelKey: 'health.none' },
  { value: 'diabetes', labelKey: 'health.diabetes' },
  { value: 'heartDisease', labelKey: 'health.heartDisease' },
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
