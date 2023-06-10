import { prisma } from '@/db/prismaClient';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({});
  }
  const data = await prisma.obit.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      person: true,
    },
  });
  return NextResponse.json({ data });
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({});
  }

  const res = await request.json();
  const { obit, person } = res;
  const pers = await prisma.person.create({
    data: {
      name: person.name,
      age: person.age,
      bp: person.bp,
      pod: person.pod,
      dob: person.dob,
      dod: person.dod,
      parents: person.parents,
      survived: person.survived,
      predeceased: person.predeceased,
      grandParents: person.grandParents,
      grandKids: person.grandKids,
      funeral: person.funeral,
      about: person.about,
    },
  });

  const now = new Date(Date.now());

  await prisma.obit.create({
    data: {
      created: now.toDateString(),
      body: obit,
      userId: session.user.id,
      personId: pers.id,
    },
  });
  return NextResponse.json({ message: 'saved!' });
}

export async function DELETE(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({});
  }
  const { id } = await request.json();
  const data = await prisma.obit.delete({
    where: {
      id,
    },
  });
  return NextResponse.json({ data });
}
