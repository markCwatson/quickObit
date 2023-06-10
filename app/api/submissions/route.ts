import { prisma } from '@/db/prismaClient';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function PUT(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({});
  }

  const user = await prisma.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      numOfSubmitsLeft: { decrement: 1 },
    },
  });

  if (user?.numOfSubmitsLeft === 0) {
    await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        stripePaymentId: null,
        stripePayPeriodEnd: null,
      },
    });
  }

  return NextResponse.json({ user });
}
