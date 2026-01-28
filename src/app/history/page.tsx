'use client';

import { useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useUser, useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import Header from '@/components/header';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { FoodItem, MealType } from '@/lib/types';
import { format } from 'date-fns';
import { useTranslation } from '@/i18n/context';

type LoggedItem = FoodItem & { mealType: MealType };

interface GroupedLogs {
  [date: string]: {
    items: LoggedItem[];
    totals: {
      calories: number;
      protein: number;
      carbs: number;
      fat: number;
    };
  };
}

export default function HistoryPage() {
  const { t } = useTranslation();
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/login');
    }
  }, [user, isUserLoading, router]);

  const dietaryLogsQuery = useMemoFirebase(() => {
    if (!user) return null;
    const logsCollection = collection(firestore, `users/${user.uid}/profiles/${user.uid}/dietaryLogs`);
    return query(logsCollection, orderBy('createdAt', 'desc'));
  }, [firestore, user]);

  const { data: loggedItems, isLoading: isLogLoading } = useCollection<LoggedItem>(dietaryLogsQuery);

  const groupedLogs = useMemo(() => {
    if (!loggedItems) return {};
    
    return loggedItems.reduce((acc, item) => {
      if (!item.createdAt) return acc;
      
      const date = item.createdAt;
      const dateString = format(date, 'MMMM d, yyyy');
      
      if (!acc[dateString]) {
        acc[dateString] = {
          items: [],
          totals: { calories: 0, protein: 0, carbs: 0, fat: 0 },
        };
      }
      
      acc[dateString].items.push(item);
      acc[dateString].totals.calories += item.calories;
      acc[dateString].totals.protein += item.protein;
      acc[dateString].totals.carbs += item.carbs;
      acc[dateString].totals.fat += item.fat;
      
      return acc;
    }, {} as GroupedLogs);
  }, [loggedItems]);

  const isLoading = isUserLoading || isLogLoading;

  const mealTypeTranslations: Record<MealType, string> = {
    breakfast: t('history.meal.breakfast'),
    lunch: t('history.meal.lunch'),
    dinner: t('history.meal.dinner'),
    snacks: t('history.meal.snacks'),
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="mx-auto w-full max-w-4xl">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-2xl">{t('history.title')}</CardTitle>
              <CardDescription>
                {t('history.description')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex justify-center items-center h-40">
                    <p>{t('history.loading')}</p>
                </div>
              ) : Object.keys(groupedLogs).length === 0 ? (
                <div className="text-center text-muted-foreground py-8">
                    <p>{t('history.empty')}</p>
                </div>
              ) : (
                <Accordion type="single" collapsible className="w-full">
                  {Object.entries(groupedLogs).map(([date, data]) => (
                    <AccordionItem key={date} value={date}>
                      <AccordionTrigger>
                        <div className="flex justify-between w-full pr-4">
                          <span className="font-medium">{date}</span>
                          <span className="text-muted-foreground">{data.totals.calories.toFixed(0)} kcal</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-3 pt-2">
                          {data.items.map(item => (
                            <li key={item.id} className="flex justify-between border-l-2 pl-4 border-primary/50">
                              <div>
                                <p className="font-semibold capitalize">{mealTypeTranslations[item.mealType]}: <span className="font-normal">{item.name}</span></p>
                                <p className="text-sm text-muted-foreground">{item.servingSize}</p>
                              </div>
                              <div className="text-right">
                                <p className="font-medium">{item.calories.toFixed(0)} kcal</p>
                                <p className="text-sm text-muted-foreground">
                                  P:{item.protein.toFixed(0)}g, C:{item.carbs.toFixed(0)}g, F:{item.fat.toFixed(0)}g
                                </p>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
