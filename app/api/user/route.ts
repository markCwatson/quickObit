import { prisma } from '@/db/prismaClient';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({});
  }

  const pers = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
  });

  if (!pers) {
    return NextResponse.json({});
  }

  const img = pers.image;
  return NextResponse.json({ img });
}
