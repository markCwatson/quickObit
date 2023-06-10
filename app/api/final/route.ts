import { prisma } from '@/db/prismaClient';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function PUT(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({});
  }

  const req = await request.json();
  const { obitId } = req;
  const pers = await prisma.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      finalObitId: obitId,
    },
  });

  return NextResponse.json({ pers });
}
