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
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { PlusCircle, Trash2, ChevronsUpDown, Check } from "lucide-react";
import type { DailyLog, FoodItem, LoggedItem, MealType } from "@/lib/types";
import { FOOD_DATABASE } from "@/lib/food-data";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

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
  const { toast } = useToast();

  const addFoodToLog = (mealType: MealType, food: FoodItem, quantity: number) => {
    if (quantity <= 0) {
      toast({
        variant: "destructive",
        title: "Invalid Quantity",
        description: "Please enter a quantity greater than zero.",
      });
      return;
    }
    const newLoggedItem: LoggedItem = {
      id: `${mealType}-${food.id}-${Date.now()}`,
      food,
      quantity,
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

  const totalCaloriesForMeal = (mealType: MealType) => {
    return log[mealType].reduce(
      (acc, item) => acc + item.food.calories * item.quantity,
      0
    ).toFixed(0);
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
                            {item.quantity} x {item.food.servingSize} &bull;{" "}
                            {(item.food.calories * item.quantity).toFixed(0)} kcal
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
  onAddFood: (mealType: MealType, food: FoodItem, quantity: number) => void;
  disabled?: boolean;
}) {
  const [open, setOpen] = React.useState(false);
  const [selectedFood, setSelectedFood] = React.useState<FoodItem | null>(null);
  const [quantity, setQuantity] = React.useState(1);
  const { toast } = useToast();

  const handleAdd = () => {
    if (!selectedFood) {
      toast({
        variant: "destructive",
        title: "No Food Selected",
        description: "Please select a food item to add.",
      });
      return;
    }
    onAddFood(mealType, selectedFood, quantity);
    setOpen(false);
    setSelectedFood(null);
    setQuantity(1);
    toast({
      title: "Food Added",
      description: `${selectedFood.name} has been added to ${mealType}.`,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full" disabled={disabled}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Food to {mealType.charAt(0).toUpperCase() + mealType.slice(1)}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Food</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="food" className="text-right">
              Food
            </Label>
            <FoodSearchCombobox
              selectedFood={selectedFood}
              setSelectedFood={setSelectedFood}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="quantity" className="text-right">
              Servings
            </Label>
            <Input
              id="quantity"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="col-span-3"
              min="0.1"
              step="0.1"
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">Cancel</Button>
          </DialogClose>
          <Button type="submit" onClick={handleAdd}>Add</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function FoodSearchCombobox({
  selectedFood,
  setSelectedFood,
}: {
  selectedFood: FoodItem | null;
  setSelectedFood: (food: FoodItem | null) => void;
}) {
  const [open, setOpen] = React.useState(false);
  
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="col-span-3 justify-between"
        >
          {selectedFood
            ? selectedFood.name
            : "Select food..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[300px] p-0"
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <Command>
          <CommandInput placeholder="Search food..." />
          <CommandList>
            <CommandEmpty>No food found.</CommandEmpty>
            <CommandGroup>
              {FOOD_DATABASE.map((food) => (
                <CommandItem
                  key={food.id}
                  value={food.name}
                  onSelect={() => {
                    setSelectedFood(food);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedFood?.id === food.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {food.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
