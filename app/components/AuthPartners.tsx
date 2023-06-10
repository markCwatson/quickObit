'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import AuthPartnerButton from '@/components/AuthPartnerButton';
import { GoogleLogo, FacebookLogo } from '@/components/AuthPartnerLogos';

interface AuthPartnersProps extends React.HTMLAttributes<HTMLDivElement> {}

export function AuthPartners({ className, ...props }: AuthPartnersProps) {
  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <AuthPartnerButton
        logo={<GoogleLogo />}
        text={'Continue with Google'}
        partner={'google'}
      />
      <AuthPartnerButton
        logo={<FacebookLogo />}
        text={'Continue with Facebook'}
        partner={'facebook'}
      />
    </div>
  );
}
