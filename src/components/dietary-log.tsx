"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "./ui/label";
import { PlusCircle, Trash2, Loader } from "lucide-react";
import type { DailyLog, FoodItem, LoggedItem, MealType } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { analyzeFoodIntake } from "@/ai/flows/analyze-food-intake";
import type { AnalyzedFoodOutput } from "@/ai/flows/analyze-food-intake";

interface DietaryLogProps {
  log: DailyLog;
  onLogUpdate: (log: DailyLog) => void;
  disabled?: boolean;
}

const mealTypes: MealType[] = ["breakfast", "lunch", "dinner", "snacks"];

export default function DietaryLog({
  log,
  onLogUpdate,
  disabled,
}: DietaryLogProps) {

  const addFoodToLog = (mealType: MealType, food: FoodItem) => {
    const newLoggedItem: LoggedItem = {
      id: `${mealType}-${food.id}-${Date.now()}`,
      food,
      quantity: 1, // Quantity is always 1 for AI-analyzed items
    };
    const newLog = {
      ...log,
      [mealType]: [...log[mealType], newLoggedItem],
    };
    onLogUpdate(newLog);
  };

  const removeFoodFromLog = (mealType: MealType, itemId: string) => {
    const newLog = {
      ...log,
      [mealType]: log[mealType].filter((item) => item.id !== itemId),
    };
    onLogUpdate(newLog);
  };

  return (
    <Card className={disabled ? "bg-muted/50" : ""}>
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Dietary Log</CardTitle>
        <CardDescription>
          {disabled
            ? "Complete your profile to start logging your meals."
            : "Add your meals for today to track your nutrient intake."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="breakfast">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
            {mealTypes.map((meal) => (
              <TabsTrigger key={meal} value={meal} disabled={disabled} className="capitalize">
                {meal}
              </TabsTrigger>
            ))}
          </TabsList>
          {mealTypes.map((meal) => (
            <TabsContent key={meal} value={meal} className="mt-4">
              <div className="space-y-4">
                {log[meal].length === 0 ? (
                  <div className="text-center text-muted-foreground py-8">
                    <p>No items logged for {meal} yet.</p>
                  </div>
                ) : (
                  <ul className="space-y-2">
                    {log[meal].map((item) => (
                      <li
                        key={item.id}
                        className="flex items-center justify-between rounded-md border p-3"
                      >
                        <div>
                          <p className="font-semibold">{item.food.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {(item.food.calories * item.quantity).toFixed(0)} kcal
                            {item.food.servingSize && ` for ${item.food.servingSize}`}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFoodFromLog(meal, item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </li>
                    ))}
                  </ul>
                )}
                <AddFoodDialog
                  mealType={meal}
                  onAddFood={addFoodToLog}
                  disabled={disabled}
                />
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
      <CardFooter>
          <p className="text-sm text-muted-foreground">Log your meals to see a full daily summary in the results section.</p>
      </CardFooter>
    </Card>
  );
}

function AddFoodDialog({
  mealType,
  onAddFood,
  disabled,
}: {
  mealType: MealType;
  onAddFood: (mealType: MealType, food: FoodItem) => void;
  disabled?: boolean;
}) {
  const [open, setOpen] = React.useState(false);
  const [description, setDescription] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const { toast } = useToast();

  const handleAdd = async () => {
    if (!description.trim()) {
      toast({
        variant: "destructive",
        title: "Food description cannot be empty.",
        description: "Please describe the meal you ate.",
      });
      return;
    }
    setLoading(true);
    try {
      const result: AnalyzedFoodOutput = await analyzeFoodIntake({ description });

      const newFoodItem: FoodItem = {
        id: Date.now().toString(),
        name: result.name,
        calories: result.calories,
        protein: result.protein,
        carbs: result.carbs,
        fat: result.fat,
        servingSize: result.servingSize,
      };
      
      onAddFood(mealType, newFoodItem);
      
      setOpen(false);
      setDescription("");
      toast({
        title: "Food Added",
        description: `${newFoodItem.name} has been logged.`,
      });
    } catch (error) {
      console.error("AI food analysis failed:", error);
      toast({
        variant: "destructive",
        title: "Analysis Failed",
        description: "Could not analyze the food item. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full" disabled={disabled}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Food to {mealType.charAt(0).toUpperCase() + mealType.slice(1)}
        </Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[425px]"
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle>Add Food with AI</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Label htmlFor="food-description" className="text-left">
            Describe your meal
          </Label>
          <Textarea
            id="food-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g., A bowl of oatmeal with a handful of blueberries and a splash of milk."
            className="col-span-4"
          />
           <p className="text-xs text-muted-foreground">Our AI will analyze your description and estimate the nutritional content.</p>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">Cancel</Button>
          </DialogClose>
          <Button type="submit" onClick={handleAdd} disabled={loading}>
            {loading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
            {loading ? "Analyzing..." : "Add to Log"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
