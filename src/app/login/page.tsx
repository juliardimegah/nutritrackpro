'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { Logo } from '@/components/icons';
import { useTranslation } from '@/i18n/context';

export default function LoginPage() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = useAuth();
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
      let description = t('login.toast.unexpected_error_description');
      if (error.code === 'auth/invalid-credential') {
        description = t('login.toast.invalid_credential_description');
      } else if (error.message && error.message.includes('identity-toolkit-api-has-not-been-used')) {
        description = t('login.toast.identity_toolkit_disabled_description');
      }
      toast({
        variant: 'destructive',
        title: t('login.toast.fail_title'),
        description,
      });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <div className="mb-4 flex items-center justify-center">
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
