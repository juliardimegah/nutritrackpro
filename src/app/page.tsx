"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { UserProfile, CalorieNeeds, DailyLog, FoodItem, MealType } from "@/lib/types";
import { calculateCalorieNeeds } from "@/lib/nutrition";
import Header from "@/components/header";
import NutritionResults from "@/components/nutrition-results";
import DietaryLog from "@/components/dietary-log";
import { useFirestore, useUser, useMemoFirebase } from "@/firebase";
import { doc, collection, serverTimestamp } from "firebase/firestore";
import { useDoc } from '@/firebase/firestore/use-doc';
import { useCollection } from '@/firebase/firestore/use-collection';
import { addDocumentNonBlocking, deleteDocumentNonBlocking } from "@/firebase/non-blocking-updates";
import { useTranslation } from "@/i18n/context";

export default function Home() {
  const { t } = useTranslation();
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const router = useRouter();

  const userProfileRef = useMemoFirebase(() => {
    if (!user) return null;
    return doc(firestore, `users/${user.uid}/profiles/${user.uid}`);
  }, [firestore, user]);

  const { data: profile, isLoading: isProfileLoading } = useDoc<UserProfile>(userProfileRef);

  const dietaryLogsRef = useMemoFirebase(() => {
    if (!user || !profile) return null;
    return collection(firestore, `users/${user.uid}/profiles/${profile.id}/dietaryLogs`);
  }, [firestore, user, profile]);

  const { data: loggedItems, isLoading: isLogLoading } = useCollection<FoodItem & { mealType: MealType }>(dietaryLogsRef);

  const [needs, setNeeds] = useState<CalorieNeeds | null>(null);

  const log: DailyLog = useMemo(() => {
    const dailyLog: DailyLog = { breakfast: [], lunch: [], dinner: [], snacks: [] };
    if (loggedItems) {
      loggedItems.forEach(item => {
        if (item.mealType && dailyLog[item.mealType]) {
            dailyLog[item.mealType].push(item);
        }
      });
    }
    return dailyLog;
  }, [loggedItems]);


  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/login');
    }
  }, [user, isUserLoading, router]);

  useEffect(() => {
    if (profile) {
      if (!profile.age || !profile.height || !profile.weight) {
        router.push('/profile');
      } else {
        const calorieNeeds = calculateCalorieNeeds(profile);
        setNeeds(calorieNeeds);
      }
    }
  }, [profile, router]);

  const handleLogUpdate = (mealType: MealType, food: any, action: 'add' | 'remove') => {
      if (!dietaryLogsRef) return;
      if (action === 'add') {
          const newDoc = { ...food };
          delete newDoc.id; // Firestore generates ID
          addDocumentNonBlocking(dietaryLogsRef, { ...newDoc, mealType, createdAt: serverTimestamp() });
      } else if (action === 'remove') {
          const logDocRef = doc(dietaryLogsRef, food); // food is the itemId
          deleteDocumentNonBlocking(logDocRef);
      }
  };

  const isLoading = isUserLoading || isProfileLoading || isLogLoading;

  if (isLoading) {
    return (
        <div className="flex min-h-screen w-full flex-col items-center justify-center bg-background">
            <p>{t('loading')}</p>
        </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="mx-auto grid w-full max-w-7xl gap-8">
          <div className="text-center">
            <h1 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              {t('home.title')}
            </h1>
            <p className="mt-3 text-base text-muted-foreground sm:text-lg">
              {t('home.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8">
              <NutritionResults profile={profile} needs={needs} log={log} />
              <DietaryLog
                log={log}
                onLogUpdate={handleLogUpdate}
                disabled={!profile}
              />
          </div>
        </div>
      </main>
      <footer className="py-6 text-center text-sm text-muted-foreground">
        <p>{t('home.footer')}</p>
      </footer>
    </div>
  );
}
