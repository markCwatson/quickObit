import { prisma } from '@/db/prismaClient';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({});
  }

  const res = await request.json();
  const { id } = res;

  const data = await prisma.person.findMany({
    where: {
      id,
    },
  });
  return NextResponse.json({ data });
}
