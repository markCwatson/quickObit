import { prisma } from '@/db/prismaClient';
import { NextResponse } from 'next/server';

export async function GET() {
  console.log('cron job is running');

  try {
    await prisma.user.findUnique({
      where: {
        id: 'does-not-exist',
      },
    });
  } catch (error) { }

  return NextResponse.json({});
}

