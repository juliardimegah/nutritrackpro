'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, useFirestore } from '@/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc } from 'firebase/firestore';
import { setDocumentNonBlocking } from '@/firebase/non-blocking-updates';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { Logo } from '@/components/icons';
import { useTranslation } from '@/i18n/context';

export default function RegisterPage() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = useAuth();
  const firestore = useFirestore();
  const router = useRouter();
  const { toast } = useToast();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (user) {
        const userProfileRef = doc(firestore, `users/${user.uid}/profiles/${user.uid}`);
        const defaultProfile = {
          id: user.uid,
          email: user.email,
          age: 0,
          sex: 'male',
          height: 0,
          weight: 0,
          activityLevel: 'sedentary',
          goal: 'maintainWeight',
          healthIssue: 'none',
        };
        setDocumentNonBlocking(userProfileRef, defaultProfile, { merge: true });
        
        toast({
          title: t('register.toast.success_title'),
          description: t('register.toast.success_description'),
        });
        router.push('/profile');
      }
    } catch (error: any) {
      console.error('Registration failed:', error);
      toast({
        variant: 'destructive',
        title: t('register.toast.fail_title'),
        description: error.message || 'An unexpected error occurred.',
      });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
            <div className="flex justify-center items-center mb-4">
                <Logo className="h-8 w-8" />
            </div>
          <CardTitle className="font-headline text-2xl">{t('register.title')}</CardTitle>
          <CardDescription>
            {t('register.description')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">{t('register.email_label')}</Label>
              <Input
                id="email"
                type="email"
                placeholder={t('register.email_placeholder')}
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">{t('register.password_label')}</Label>
              <Input
                id="password"
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full">
              {t('register.submit_button')}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            {t('register.has_account')}{' '}
            <Link href="/login" className="underline">
              {t('register.login_link')}
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
