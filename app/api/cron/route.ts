import { prisma } from '@/db/prismaClient';
import { NextResponse } from 'next/server';

// This route is for a cron job that is used to attempt ...
// ... to keep the planetscale database awake. It goes to ...
// ... sleep after 7 days of inactivity.
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

