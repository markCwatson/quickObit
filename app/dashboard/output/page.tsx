'use client';

import { useSession } from 'next-auth/react';
import Output from '@/components/Output';
import DialogModal from '@/components/DialogModal';
import DashboardPage from '@/components/DashboardPage';
import SignInButton from '@/components/SignInButton';

export default function ResultPage() {
  const session = useSession();

  if (session.status !== 'authenticated' && session.status !== 'loading') {
    return (
      <DialogModal
        title={'You are not signed in.'}
        body={'You cannot access this page.'}
        show={true}
        goToButton={<SignInButton text="Sign in" />}
      />
    );
  }

  return (
    <DashboardPage>
      <Output
        person={sessionStorage.getItem('person') || null} // \todo handle DNE
        obit={sessionStorage.getItem('obituary') || null}
      />
    </DashboardPage>
  );
}
