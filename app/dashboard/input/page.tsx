import DialogModal from '@/components/DialogModal';
import DashboardPage from '@/components/DashboardPage';
import { stripe } from '@/lib/stripe';
import { prisma } from '@/db/prismaClient';
import Input from '@/components/Input';
import { getCurrentUser } from '@/lib/session';
import { checkActive } from '@/lib/subscription';
import SignInButton from '@/components/SignInButton';

export const metadata = {
  title: 'Input',
  description: 'Input for quickObit AI model.',
};

const processCheckout = async (sessionId: string, userId: string) => {
  try {
    const chekoutSession = await stripe.checkout.sessions.retrieve(sessionId);

    // Update the user with stripe info in database.
    // \todo: move this to a route
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        numOfSubmitsLeft: 10,
        stripePaymentId: chekoutSession.id,
        stripePayPeriodEnd: new Date(Date.now() + 7 * 86_400_000), // 7 days.
      },
    });
    return true;
  } catch (error) {
    return false;
  }
};

export default async function InputForm({
  searchParams,
}: {
  searchParams: { session_id: string; success?: string; cancelled?: boolean };
}) {
  // check server session for user
  const user = await getCurrentUser();
  if (!user) {
    return (
      <DialogModal
        title={'You are not signed in.'}
        body={'You cannot access this page.'}
        show={true}
        goToButton={<SignInButton text="Sign in" />}
      />
    );
  }

  // check params for stripe session id
  let plan;
  let isSuccess = false;
  const { session_id: sessionId, success } = searchParams;
  if (sessionId && success === 'true') {
    isSuccess = await processCheckout(sessionId, user?.id);
  } else {
    // check if user has active subscription
    plan = await checkActive(user?.id);
    if (!plan.isActive) {
      return (
        <DialogModal
          title={'You do not have an active subscription.'}
          body={'You cannot access this page without a subscription.'}
          show={true}
          goTo={'/dashboard/purchase'}
          goToText={'Go to purchase'}
        />
      );
    }
  }

  if (isSuccess || plan?.isActive) {
    return (
      <DashboardPage>
        <Input />
      </DashboardPage>
    );
  }

  return (
    <DialogModal
      title={'Something went wrong.'}
      body={'You are not signed in, or do not have an active subscription.'}
      show={true}
      goTo={'/dashboard'}
      goToText={'Dashboard'}
    />
  );
}
