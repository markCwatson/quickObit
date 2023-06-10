import { cn } from '@/lib/utils';
import { signIn } from 'next-auth/react';
import { ArrowPathIcon } from '@heroicons/react/20/solid';
import { buttonVariants } from '@/components/Button';
import { useState } from 'react';
import { toast } from '@/components/Toast';

type Props = {
  logo: React.ReactNode;
  text: string;
  partner: 'google' | 'facebook';
};

function AuthPartnerButton({ logo, text, partner }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function onClick() {
    try {
      setIsLoading(true);
      await signIn(partner);
    } catch (error) {
      toast({
        title: 'Error signing in',
        message: 'Please try again later.',
        type: 'error',
      });
    }
  }

  return (
    <button
      type="button"
      className={cn(buttonVariants({ variant: 'outline' }))}
      onClick={onClick}
      disabled={isLoading}
    >
      {isLoading ? (
        <ArrowPathIcon className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        logo
      )}
      <span className="ml-2">{text}</span>
    </button>
  );
}

export default AuthPartnerButton;
