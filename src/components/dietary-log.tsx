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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { PlusCircle, Trash2, Loader } from "lucide-react";
import type { DailyLog, FoodItem, MealType } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { analyzeFoodIntake } from "@/ai/flows/analyze-food-intake";
import type { AnalyzedFoodOutput } from "@/ai/flows/analyze-food-intake";
import { useTranslation } from "@/i18n/context";

interface DietaryLogProps {
  log: DailyLog;
  onLogUpdate: (mealType: MealType, food: any, action: 'add' | 'remove') => void;
  disabled?: boolean;
}

const mealTypes: MealType[] = ["breakfast", "lunch", "dinner", "snacks"];

export default function DietaryLog({
  log,
  onLogUpdate,
  disabled,
}: DietaryLogProps) {
  const { t } = useTranslation();

  const addFoodToLog = (mealType: MealType, food: FoodItem) => {
    onLogUpdate(mealType, food, 'add');
  };

  const removeFoodFromLog = (mealType: MealType, itemId: string) => {
    onLogUpdate(mealType, itemId, 'remove');
  };

  const mealTypeTranslations: Record<MealType, string> = {
    breakfast: t('log.tab.breakfast'),
    lunch: t('log.tab.lunch'),
    dinner: t('log.tab.dinner'),
    snacks: t('log.tab.snacks'),
  }

  return (
    <Card className={disabled ? "bg-muted/50" : ""}>
      <CardHeader>
        <CardTitle className="font-headline text-2xl">{t('log.title')}</CardTitle>
        <CardDescription>
          {disabled
            ? t('log.description.disabled')
            : t('log.description.enabled')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="breakfast">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
            {mealTypes.map((meal) => (
              <TabsTrigger key={meal} value={meal} disabled={disabled} className="capitalize">
                {mealTypeTranslations[meal]}
              </TabsTrigger>
            ))}
          </TabsList>
          {mealTypes.map((meal) => (
            <TabsContent key={meal} value={meal} className="mt-4">
              <div className="space-y-4">
                {log[meal].length === 0 ? (
                  <div className="text-center text-muted-foreground py-8">
                    <p>{t('log.empty_log', { mealType: mealTypeTranslations[meal] })}</p>
                  </div>
                ) : (
                  <ul className="space-y-2">
                    {log[meal].map((item) => (
                      <li
                        key={item.id}
                        className="flex items-center justify-between rounded-md border p-3"
                      >
                        <div>
                          <p className="font-semibold">{item.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {(item.calories).toFixed(0)} kcal
                            {item.servingSize && ` for ${item.servingSize}`}
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
          <p className="text-sm text-muted-foreground">{t('log.footer')}</p>
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
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);
  const [description, setDescription] = React.useState("");
  const [servingSize, setServingSize] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const { toast } = useToast();

  const mealTypeTranslations: Record<MealType, string> = {
    breakfast: t('log.tab.breakfast'),
    lunch: t('log.tab.lunch'),
    dinner: t('log.tab.dinner'),
    snacks: t('log.tab.snacks'),
  }

  const handleAdd = async () => {
    if (!description.trim()) {
      toast({
        variant: "destructive",
        title: t('log.toast.empty_description'),
        description: t('log.toast.empty_description_detail'),
      });
      return;
    }
    setLoading(true);
    try {
      const result: AnalyzedFoodOutput = await analyzeFoodIntake({ 
        description,
        servingSize: servingSize.trim() ? servingSize.trim() : undefined,
      });

      const newFoodItem: FoodItem = {
        id: Date.now().toString(), // this id will not be used, firestore generates one
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
      setServingSize("");
      toast({
        title: t('log.toast.success_title'),
        description: t('log.toast.success_description', { foodName: newFoodItem.name }),
      });
    } catch (error: any) {
      console.error("AI food analysis failed:", error);
      
      let errorDescription = t('log.toast.fail_description');
      if (error.message && (error.message.includes('429') || error.message.toLowerCase().includes('quota exceeded'))) {
        errorDescription = t('log.toast.quota_fail_description');
      }

      toast({
        variant: "destructive",
        title: t('log.toast.fail_title'),
        description: errorDescription,
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
          {t('log.add_food_button', { mealType: mealTypeTranslations[mealType] })}
        </Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[425px]"
        onInteractOutside={(e) => {
          if (loading) e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle>{t('log.dialog.title')}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="food-description" className="text-left">
              {t('log.dialog.description_label')}
            </Label>
            <Textarea
              id="food-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={t('log.dialog.description_placeholder')}
            />
             <p className="text-xs text-muted-foreground">{t('log.dialog.description_hint')}</p>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="serving-size" className="text-left">
              {t('log.dialog.servingsize_label')}
            </Label>
            <Input
              id="serving-size"
              value={servingSize}
              onChange={(e) => setServingSize(e.target.value)}
              placeholder={t('log.dialog.servingsize_placeholder')}
            />
            <p className="text-xs text-muted-foreground">{t('log.dialog.servingsize_hint')}</p>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">{t('log.dialog.cancel_button')}</Button>
          </DialogClose>
          <Button type="submit" onClick={handleAdd} disabled={loading}>
            {loading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
            {loading ? t('log.dialog.loading_button') : t('log.dialog.submit_button')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
