import { prisma } from '@/db/prismaClient';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { NextResponse } from 'next/server';
import { Obit } from '@prisma/client';

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({});
  }

  // \todo note: on vercel, I am seeing https://obitsai.vercel.app/api/final/<id>?finalObitId=<id>
  // but on the dev server, I am seeing https://obitsai.vercel.app/api/final/<id>
  let index = request.url.lastIndexOf('=');
  if (index < 0) {
    index = request.url.lastIndexOf('/');
  }

  const finalObitId = request.url.slice(index + 1);
  if (!finalObitId) {
    return NextResponse.json({});
  }

  const finalObit: Obit | null = await prisma.obit.findUnique({
    where: {
      id: finalObitId,
    },
  });

  if (!finalObit) {
    return NextResponse.json({});
  }
  const obit: string = finalObit?.body;

  const personId: string = finalObit?.personId;
  const person = await prisma.person.findUnique({
    where: {
      id: personId,
    },
  });

  if (!person) {
    return NextResponse.json({});
  }

  return NextResponse.json({ obit, person });
}
