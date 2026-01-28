"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import type { UserProfile } from "@/lib/types";
import { ACTIVITY_LEVELS, GOALS, HEALTH_ISSUES } from "@/lib/constants";
import { useEffect } from "react";
import { useTranslation } from "@/i18n/context";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


const profileFormSchema = z.object({
  age: z.coerce.number().min(1, "Age is required").max(120),
  sex: z.enum(["male", "female"], { required_error: "Sex is required" }),
  height: z.coerce.number().min(1, "Height is required"),
  weight: z.coerce.number().min(1, "Weight is required"),
  activityLevel: z.enum([
    "sedentary",
    "lightlyActive",
    "moderatelyActive",
    "veryActive",
    "extraActive",
  ]),
  goal: z.enum(["weightLoss", "maintainWeight", "weightGain"]),
  healthIssue: z.enum(["none", "diabetes", "heartDisease"]).optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

interface ProfileFormProps {
  onProfileUpdate: (profile: Omit<UserProfile, 'id' | 'email'>) => void;
  initialProfileData?: UserProfile;
}

export default function ProfileForm({ onProfileUpdate, initialProfileData }: ProfileFormProps) {
  const { t } = useTranslation();
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      age: 0,
      sex: "male",
      height: 0,
      weight: 0,
      activityLevel: "sedentary",
      goal: "maintainWeight",
      healthIssue: "none",
    },
  });

  useEffect(() => {
    if (initialProfileData) {
      form.reset({
        ...initialProfileData,
        age: initialProfileData.age || 0,
        height: initialProfileData.height || 0,
        weight: initialProfileData.weight || 0,
      });
    }
  }, [initialProfileData, form]);

  function onSubmit(data: ProfileFormValues) {
    onProfileUpdate(data);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-2xl">{t('profile.title')}</CardTitle>
        <CardDescription>
          {t('profile.description')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('form.age_label')}</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder={t('form.age_placeholder')} {...field} value={field.value || ''} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sex"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>{t('form.sex_label')}</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value}
                        className="flex space-x-4 pt-2"
                      >
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="male" />
                          </FormControl>
                          <FormLabel className="font-normal">{t('form.sex_male')}</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="female" />
                          </FormControl>
                          <FormLabel className="font-normal">{t('form.sex_female')}</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="height"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('form.height_label')}</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder={t('form.height_placeholder')} {...field} value={field.value || ''} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('form.weight_label')}</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder={t('form.weight_placeholder')} {...field} value={field.value || ''} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="activityLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('form.activity_label')}</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t('form.activity_placeholder')} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {ACTIVITY_LEVELS.map((level) => (
                        <SelectItem key={level.value} value={level.value}>
                          {t(level.labelKey)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="goal"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('form.goal_label')}</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t('form.goal_placeholder')} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {GOALS.map((goal) => (
                        <SelectItem key={goal.value} value={goal.value}>
                          {t(goal.labelKey)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="healthIssue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('form.health_label')}</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value ?? 'none'}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t('form.health_placeholder')} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {HEALTH_ISSUES.map((issue) => (
                        <SelectItem key={issue.value} value={issue.value}>
                          {t(issue.labelKey)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              {t('form.submit_button')}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
