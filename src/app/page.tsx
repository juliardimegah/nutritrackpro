"use client";

import { useState } from "react";
import type { UserProfile, CalorieNeeds, DailyLog } from "@/lib/types";
import { calculateCalorieNeeds } from "@/lib/nutrition";
import Header from "@/components/header";
import ProfileForm from "@/components/profile-form";
import NutritionResults from "@/components/nutrition-results";
import DietaryLog from "@/components/dietary-log";
import { Toaster } from "@/components/ui/toaster";
import DietarySuggestions from "@/components/dietary-suggestions";

const initialLog: DailyLog = {
  breakfast: [],
  lunch: [],
  dinner: [],
  snacks: [],
};

export default function Home() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [needs, setNeeds] = useState<CalorieNeeds | null>(null);
  const [log, setLog] = useState<DailyLog>(initialLog);

  const handleProfileUpdate = (newProfile: UserProfile) => {
    setProfile(newProfile);
    const calorieNeeds = calculateCalorieNeeds(newProfile);
    setNeeds(calorieNeeds);
    // Reset log when profile changes
    setLog(initialLog);
  };

  const handleLogUpdate = (newLog: DailyLog) => {
    setLog(newLog);
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="mx-auto grid w-full max-w-7xl gap-8">
          <div className="text-center">
            <h1 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Your Personal Nutrition Guide
            </h1>
            <p className="mt-3 text-base text-muted-foreground sm:text-lg">
              Enter your details, log your meals, and track your progress towards a healthier you.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <ProfileForm onProfileUpdate={handleProfileUpdate} />
            </div>
            <div className="lg:col-span-8 space-y-8">
              <NutritionResults profile={profile} needs={needs} log={log} />
              <DietaryLog
                log={log}
                onLogUpdate={handleLogUpdate}
                disabled={!profile}
              />
              <DietarySuggestions profile={profile} log={log} disabled={!profile} />
            </div>
          </div>
        </div>
      </main>
      <footer className="py-6 text-center text-sm text-muted-foreground">
        <p>Built with ❤️ by NutriTrack Pro</p>
      </footer>
      <Toaster />
    </div>
  );
}
