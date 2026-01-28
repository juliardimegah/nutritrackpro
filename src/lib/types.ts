export type ActivityLevel = 'sedentary' | 'lightlyActive' | 'moderatelyActive' | 'veryActive' | 'extraActive';
export type HealthIssue = 'none' | 'diabetes' | 'heartDisease';

export type UserProfile = {
  id: string;
  email?: string;
  age: number;
  sex: 'male' | 'female';
  height: number; // in cm
  weight: number; // in kg
  activityLevel: ActivityLevel;
  goal: 'weightLoss' | 'maintainWeight' | 'weightGain';
  healthIssue?: HealthIssue;
};

export type BmiResult = {
  bmi: number;
  category: string;
};

export type CalorieNeeds = {
  maintenance: number;
  goalCalories: number;
  protein: number; // in grams
  carbs: number; // in grams
  fat: number; // in grams
};

export type FoodItem = {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  servingSize: string; // e.g., '100g', '1 cup'
  createdAt?: Date;
};

export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snacks';

export type DailyLog = {
  [key in MealType]: (FoodItem & { id: string })[];
};
