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

  const finalObitImg = pers.finalObitImg;

  // \todo use url to get image from cloudinary (or something similar)

  return NextResponse.json({});
}

export async function PUT(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({});
  }

  const res = await request.json();
  const { image } = res;

  // store image in cloud and return url

  // store url in db
  const pers = await prisma.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      finalObitImg: `${image}`,
    },
  });
  const finalObitImg = pers.finalObitImg;
  return NextResponse.json({ finalObitImg });
}
