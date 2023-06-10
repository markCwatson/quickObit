'use client';

import DialogModal from '@/components/DialogModal';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { ArrowPathIcon } from '@heroicons/react/20/solid';
import { toast } from '@/components/Toast';
import { Card } from '@/components/Card';
import { UserSubscriptionPlan } from '@/types';
import { formatDate } from '@/lib/utils';
import { Button } from './Button';
import SignInButton from './SignInButton';

interface BillingFormProps extends React.HTMLAttributes<HTMLFormElement> {
  plan: UserSubscriptionPlan;
}

export default function BillingForm({
  plan,
  className,
  ...props
}: BillingFormProps) {
  const session = useSession();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(!isLoading);

    // Get a Stripe session URL.
    const response = await fetch('/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response?.ok) {
      return toast({
        title: 'Something went wrong during checkout.',
        message: 'Please refresh the page and try again.',
        type: 'error',
      });
    }

    // Redirect to the Stripe session.
    const session = await response.json();
    if (session) {
      window.location.href = session.url;
    }
  }

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

  // console.log(plan);

  return (
    <form onSubmit={onSubmit}>
      <Card>
        <Card.Header>
          <Card.Title>Plan</Card.Title>
          <Card.Description>
            Your plan is currently <strong>{plan.name}</strong>.
          </Card.Description>
        </Card.Header>
        <Card.Content>{plan.description}</Card.Content>
        <Card.Footer className="flex flex-col items-start md:flex-row md:justify-between py-6">
          {isLoading && (
            <ArrowPathIcon
              className="h-6 w-6 text-green-600 animate-spin"
              aria-hidden="true"
            />
          )}
          {plan.isActive ? (
            <p className="rounded-full text-xs font-medium">
              {'Your plan is active until '}
              <strong>{formatDate(plan.stripePayPeriodEnd)}</strong>.
            </p>
          ) : (
            'You need to purchase a new plan.'
          )}
          {plan.isActive ? null : (
            <Button type="submit" disabled={isLoading}>
              {'Purchase Now'}
            </Button>
          )}
        </Card.Footer>
        {plan.isActive ? (
          <Card.Footer className="flex flex-col items-start md:flex-row md:justify-between py-6">
            {isLoading && (
              <ArrowPathIcon
                className="h-6 w-6 text-green-600 animate-spin"
                aria-hidden="true"
              />
            )}

            <p className="rounded-full text-xs font-medium">
              {'Remaining submissions: '}
              <strong>{plan.numOfSubmitsLeft}</strong>
              {' out of 10.'}
            </p>
          </Card.Footer>
        ) : null}
      </Card>
    </form>
  );
}
