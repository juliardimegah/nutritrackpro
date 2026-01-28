'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, useFirestore, setDocumentNonBlocking } from '@/firebase';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { Logo, GoogleIcon } from '@/components/icons';
import { Separator } from '@/components/ui/separator';
import { useTranslation } from '@/i18n/context';

export default function LoginPage() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = useAuth();
  const firestore = useFirestore();
  const router = useRouter();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({
        title: t('login.toast.logging_in_title'),
        description: t('login.toast.logging_in_description'),
      });
      router.push('/');
    } catch (error: any) {
      console.error('Login failed:', error);
      toast({
        variant: 'destructive',
        title: t('login.toast.fail_title'),
        description: error.message || 'An unexpected error occurred.',
      });
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userProfileRef = doc(firestore, `users/${user.uid}/profiles/${user.uid}`);
      const docSnap = await getDoc(userProfileRef);

      if (!docSnap.exists()) {
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
          title: t('login.toast.welcome_title'),
          description: t('login.toast.welcome_description'),
        });
        router.push('/profile');
      } else {
        toast({
          title: t('login.toast.success_title'),
          description: t('login.toast.success_description'),
        });
        router.push('/');
      }
    } catch (error: any) {
      console.error('Google Sign-in failed:', error);
      toast({
        variant: 'destructive',
        title: t('login.toast.fail_title'),
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
          <CardTitle className="font-headline text-2xl">{t('login.title')}</CardTitle>
          <CardDescription>{t('login.description')}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">{t('login.email_label')}</Label>
              <Input
                id="email"
                type="email"
                placeholder={t('login.email_placeholder')}
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">{t('login.password_label')}</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full">
              {t('login.submit_button')}
            </Button>
          </form>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <Separator />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">OR</span>
            </div>
          </div>
          
          <Button variant="outline" className="w-full" onClick={handleGoogleSignIn}>
            <GoogleIcon className="mr-2 h-4 w-4" />
            {t('login.google_button')}
          </Button>

          <div className="mt-4 text-center text-sm">
            {t('login.no_account')}{' '}
            <Link href="/register" className="underline">
              {t('login.signup_link')}
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
