import { prisma } from '@/db/prismaClient';
import { SubscriptionPlan, UserSubscriptionPlan } from '@/types';

const inactivePlan: SubscriptionPlan = {
  name: 'Inactive',
  description: 'You do not have an active plan. Purchase one below.',
  stripePriceId: '',
};

const activePlan: SubscriptionPlan = {
  name: 'Active',
  description:
    'You have an active plan. You can begin using quickObit to generate obituaries.',
  stripePriceId: process.env.STRIPE_PRICE_ID || '',
};

export async function checkActive(
  userId: string,
): Promise<UserSubscriptionPlan> {
  const [user, obituaryCount] = await prisma.$transaction([
    prisma.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        numOfSubmitsLeft: true,
        stripePaymentId: true,
        stripePayPeriodEnd: true,
      },
    }),
    prisma.obit.count({
      where: {
        userId: userId,
      },
    }),
  ]);

  if (!user) {
    throw new Error('User not found');
  }

  let isActive = false;
  if (user.stripePaymentId !== null) {
    const time = user.stripePayPeriodEnd?.getTime() || 0;
    // adds 86,400,000 milliseconds to the stripePayPeriodEnd time to check if the user's subscription is still active within the current day
    isActive =
      time + 86_400_000 > Date.now() &&
      user.numOfSubmitsLeft !== null &&
      user.numOfSubmitsLeft > 0;
  }

  const planIsActive = isActive ? activePlan : inactivePlan;

  return {
    ...planIsActive,
    ...user,
    stripePayPeriodEnd: user.stripePayPeriodEnd?.getTime() || 0,
    isActive,
    numOfSubmitsLeft: user.numOfSubmitsLeft || 0,
    obituaryCount,
  };
}
