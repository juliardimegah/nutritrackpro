'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { generateDietarySuggestions } from '@/ai/flows/generate-dietary-suggestions';
import type { DailyLog, UserProfile } from '@/lib/types';
import { Loader, Wand } from 'lucide-react';

interface DietarySuggestionsProps {
  profile: UserProfile | null;
  log: DailyLog;
  disabled?: boolean;
}

export default function DietarySuggestions({ profile, log, disabled }: DietarySuggestionsProps) {
  const [documentText, setDocumentText] = useState('');
  const [suggestions, setSuggestions] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerateSuggestions = async () => {
    if (!profile) {
      toast({
        variant: 'destructive',
        title: 'Profile not set',
        description: 'Please fill out your profile before getting suggestions.',
      });
      return;
    }
    setLoading(true);
    setSuggestions('');
    try {
      // Prepare data for the AI flow
      const profileString = `Age: ${profile.age}, Sex: ${profile.sex}, Height: ${profile.height}cm, Weight: ${profile.weight}kg, Activity: ${profile.activityLevel}, Goal: ${profile.goal}, Health Issues: ${profile.healthIssue || 'none'}`;
      
      const logString = Object.entries(log)
        .map(([meal, items]) => {
            if (items.length === 0) return null;
            const itemsString = items.map(item => `${item.food.name} (${(item.food.calories * item.quantity).toFixed(0)} kcal)`).join(', ');
            return `${meal}: ${itemsString}`;
        })
        .filter(Boolean)
        .join('\n');

      const result = await generateDietarySuggestions({
        profile: profileString,
        dietaryLogs: logString || 'No meals logged yet.',
        goals: profile.goal,
        documentText: documentText.trim() || undefined,
      });

      setSuggestions(result.suggestions);
    } catch (error) {
      console.error('Failed to generate dietary suggestions:', error);
      toast({
        variant: 'destructive',
        title: 'Suggestion Generation Failed',
        description: 'Could not generate suggestions. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className={disabled ? 'bg-muted/50' : ''}>
      <CardHeader>
        <CardTitle className="font-headline text-2xl">AI Dietary Suggestions</CardTitle>
        <CardDescription>
          {disabled
            ? 'Complete your profile to get personalized dietary suggestions.'
            : 'Paste text from a health document (optional) and get AI-powered suggestions.'}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          value={documentText}
          onChange={(e) => setDocumentText(e.target.value)}
          placeholder="Paste relevant text from a health report or nutritional guide here... (Optional)"
          rows={6}
          disabled={disabled || loading}
        />
        <Button onClick={handleGenerateSuggestions} disabled={disabled || loading} className="w-full">
          {loading ? (
            <Loader className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Wand className="mr-2 h-4 w-4" />
          )}
          {loading ? 'Generating...' : 'Get Suggestions'}
        </Button>
        
        {suggestions && (
          <div className="mt-6 rounded-md border bg-muted/20 p-4">
            <h4 className="font-semibold mb-2">Here are your suggestions:</h4>
            <div className="prose prose-sm max-w-none whitespace-pre-wrap">
              {suggestions}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
