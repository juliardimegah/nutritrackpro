import type { UserProfile, CalorieNeeds, BmiResult } from "./types";
import { ACTIVITY_MULTIPLIERS, MACRO_RATIOS, CALORIE_ADJUSTMENT, HEALTH_ISSUE_MACRO_ADJUSTMENTS } from "./constants";

/**
 * Calculates Body Mass Index (BMI) and provides a category.
 * @param profile - The user's profile data.
 * @param t - The translation function.
 * @returns An object with the BMI value and its corresponding category.
 */
export function calculateBmi(profile: UserProfile, t: (key: string) => string): BmiResult {
  const heightInMeters = profile.height / 100;
  const bmi = profile.weight / (heightInMeters * heightInMeters);

  let category: string;
  if (bmi < 18.5) {
    category = t("results.bmi.underweight");
  } else if (bmi >= 18.5 && bmi < 25) {
    category = t("results.bmi.normal");
  } else if (bmi >= 25 && bmi < 30) {
    category = t("results.bmi.overweight");
  } else {
    category = t("results.bmi.obese");
  }

  return { bmi, category };
}

/**
 * Calculates Basal Metabolic Rate (BMR) using the Harris-Benedict equation.
 * @param profile - The user's profile data.
 * @returns The BMR value.
 */
export function calculateBmr(profile: UserProfile): number {
  if (profile.sex === "male") {
    return 88.362 + (13.397 * profile.weight) + (4.799 * profile.height) - (5.677 * profile.age);
  } else {
    // female
    return 447.593 + (9.247 * profile.weight) + (3.098 * profile.height) - (4.330 * profile.age);
  }
}

/**
 * Calculates daily calorie and macronutrient needs.
 * @param profile - The user's profile data.
 * @returns An object with maintenance calories, goal calories, and macronutrient grams.
 */
export function calculateCalorieNeeds(profile: UserProfile): CalorieNeeds {
  const bmr = calculateBmr(profile);
  const maintenance = bmr * ACTIVITY_MULTIPLIERS[profile.activityLevel];
  
  const goalCalories = maintenance + CALORIE_ADJUSTMENT[profile.goal];

  let ratios;
  if (profile.healthIssue && profile.healthIssue !== 'none') {
    ratios = HEALTH_ISSUE_MACRO_ADJUSTMENTS[profile.healthIssue];
  } else {
    ratios = MACRO_RATIOS[profile.goal];
  }
  
  const protein = (goalCalories * ratios.protein) / 4; // 4 kcal per gram
  const carbs = (goalCalories * ratios.carbs) / 4; // 4 kcal per gram
  const fat = (goalCalories * ratios.fat) / 9; // 9 kcal per gram

  return {
    maintenance,
    goalCalories,
    protein,
    carbs,
    fat,
  };
}
