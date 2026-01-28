'use client';

import { useUser, useFirestore, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { useDoc } from '@/firebase/firestore/use-doc';
import ProfileForm from '@/components/profile-form';
import Header from '@/components/header';
import { useRouter } from 'next/navigation';
import type { UserProfile } from '@/lib/types';
import { setDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { useToast } from '@/hooks/use-toast';
import { useEffect } from 'react';
import { useTranslation } from '@/i18n/context';

export default function ProfilePage() {
  const { t } = useTranslation();
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const router = useRouter();
  const { toast } = useToast();

  const userProfileRef = useMemoFirebase(() => {
    if (!user) return null;
    return doc(firestore, `users/${user.uid}/profiles/${user.uid}`);
  }, [firestore, user]);

  const { data: userProfile, isLoading: isProfileLoading } = useDoc<UserProfile>(userProfileRef);

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/login');
    }
  }, [user, isUserLoading, router]);

  const handleProfileUpdate = (newProfileData: Omit<UserProfile, 'id' | 'email'>) => {
    if (userProfileRef) {
      setDocumentNonBlocking(userProfileRef, newProfileData, { merge: true });
      toast({
        title: t('profile.toast.success_title'),
        description: t('profile.toast.success_description'),
      });
      router.push('/');
    }
  };

  const isLoading = isUserLoading || isProfileLoading;

  if (isLoading) {
    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-center bg-background">
        <p>{t('profile.loading')}</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="mx-auto w-full max-w-2xl">
          <ProfileForm
            onProfileUpdate={handleProfileUpdate}
            initialProfileData={userProfile ?? undefined}
          />
        </div>
      </main>
    </div>
  );
}
