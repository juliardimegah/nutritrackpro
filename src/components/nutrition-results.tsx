"use client";

import type { UserProfile, CalorieNeeds, BmiResult, DailyLog } from "@/lib/types";
import { calculateBmi } from "@/lib/nutrition";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface NutritionResultsProps {
  profile: UserProfile | null;
  needs: CalorieNeeds | null;
  log: DailyLog;
}

const BmiIllustration = ({ category }: { category: string }) => {
  const baseBodyWidth = 20;
  let bodyWidth;
  
  const getBodyColorClass = (category: string) => {
    if (category === "Underweight" || category === "Obese") return "text-destructive";
    if (category === "Overweight") return "text-orange-500";
    return "text-primary";
  };

  switch (category) {
    case "Underweight":
      bodyWidth = baseBodyWidth * 0.7;
      break;
    case "Normal weight":
      bodyWidth = baseBodyWidth;
      break;
    case "Overweight":
      bodyWidth = baseBodyWidth * 1.4;
      break;
    case "Obese":
      bodyWidth = baseBodyWidth * 1.8;
      break;
    default:
      bodyWidth = baseBodyWidth;
  }
  
  const bodyX = (50 - bodyWidth) / 2;

  return (
    <svg
      viewBox="0 0 50 80"
      className="mx-auto h-24 w-auto"
      fill="currentColor"
    >
      <g className="text-muted-foreground/50">
        <circle cx="25" cy="10" r="8" />
        <rect x="15" y="55" width="6" height="20" rx="3" />
        <rect x="29" y="55" width="6" height="20" rx="3" />
      </g>
      <rect
        x={bodyX}
        y="20"
        width={bodyWidth}
        height="35"
        rx="10"
        className={cn(getBodyColorClass(category), "transition-[width] duration-300 ease-in-out")}
      />
    </svg>
  );
};


export default function NutritionResults({ profile, needs, log }: NutritionResultsProps) {
  if (!profile || !needs) {
    return (
      <Card className="flex items-center justify-center h-full min-h-[300px]">
        <div className="text-center">
          <p className="text-lg font-semibold">Your results will appear here.</p>
          <p className="text-muted-foreground">
            Complete your profile to get started.
          </p>
        </div>
      </Card>
    );
  }

  const bmiResult = calculateBmi(profile);
  
  const totalLogged = Object.values(log).flat().reduce((acc, item) => {
    acc.calories += item.calories;
    acc.protein += item.protein;
    acc.carbs += item.carbs;
    acc.fat += item.fat;
    return acc;
  }, { calories: 0, protein: 0, carbs: 0, fat: 0 });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Your Daily Snapshot</CardTitle>
        <CardDescription>
          Based on your profile, here are your estimated needs and today's progress.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BmiCard bmiResult={bmiResult} />
          <CalorieNeedsCard needs={needs} />
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Today's Intake</h3>
          <div className="space-y-4">
            <NutrientProgress 
              label="Calories"
              consumed={totalLogged.calories}
              goal={needs.goalCalories}
              unit="kcal"
            />
            <NutrientProgress 
              label="Protein"
              consumed={totalLogged.protein}
              goal={needs.protein}
              unit="g"
            />
            <NutrientProgress 
              label="Carbohydrates"
              consumed={totalLogged.carbs}
              goal={needs.carbs}
              unit="g"
            />
            <NutrientProgress 
              label="Fat"
              consumed={totalLogged.fat}
              goal={needs.fat}
              unit="g"
            />
          </div>
        </div>
      </CardContent>
       <CardFooter>
          <p className="text-xs text-muted-foreground">These calculations are estimates. Consult a healthcare professional for personalized advice.</p>
      </CardFooter>
    </Card>
  );
}

const BmiCard = ({ bmiResult }: { bmiResult: BmiResult }) => {
  const getBmiColor = (category: string) => {
    if (category === "Underweight" || category === "Obese") return "text-destructive";
    if (category === "Overweight") return "text-orange-500";
    return "text-primary";
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Body Mass Index (BMI)</CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <BmiIllustration category={bmiResult.category} />
        <p className="text-4xl font-bold mt-4">{bmiResult.bmi.toFixed(1)}</p>
        <p className={`font-semibold ${getBmiColor(bmiResult.category)}`}>{bmiResult.category}</p>
      </CardContent>
    </Card>
  );
};

const CalorieNeedsCard = ({ needs }: { needs: CalorieNeeds }) => (
  <Card>
    <CardHeader>
      <CardTitle className="text-base">Daily Goal</CardTitle>
    </CardHeader>
    <CardContent className="text-center">
      <p className="text-4xl font-bold">{needs.goalCalories.toFixed(0)}</p>
      <p className="text-muted-foreground">Calories/day</p>
    </CardContent>
  </Card>
);

const NutrientProgress = ({ label, consumed, goal, unit }: { label: string, consumed: number, goal: number, unit: string }) => {
    const progress = goal > 0 ? (consumed / goal) * 100 : 0;
    const isExceeded = consumed > goal && goal > 0;

    return (
        <div>
            <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">{label}</span>
                <span className="text-sm text-muted-foreground">
                    {consumed.toFixed(0)} / {goal.toFixed(0)} {unit}
                </span>
            </div>
            <Progress 
                value={isExceeded ? 100 : progress}
                indicatorClassName={isExceeded ? "bg-destructive" : ""}
            />
        </div>
    )
};