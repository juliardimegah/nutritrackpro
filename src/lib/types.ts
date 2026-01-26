export type ActivityLevel = 'sedentary' | 'lightlyActive' | 'moderatelyActive' | 'veryActive' | 'extraActive';

export type UserProfile = {
  age: number;
  sex: 'male' | 'female';
  height: number; // in cm
  weight: number; // in kg
  activityLevel: ActivityLevel;
  goal: 'weightLoss' | 'maintainWeight' | 'weightGain';
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
};

export type LoggedItem = {
  id: string;
  food: FoodItem;
  quantity: number; // in servings
};

export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snacks';

export type DailyLog = {
  [key in MealType]: LoggedItem[];
};
