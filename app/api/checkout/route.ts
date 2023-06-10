import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { stripe } from '@/lib/stripe';
import { NextResponse } from 'next/server';

export const POST = async (request: Request) => {
  try {
    const session = await getServerSession(authOptions);
    const user = session?.user;

    if (!user || !user.email) {
      throw new Error('User not found.');
    }

    // Create a checkout session.
    const stripeSession = await stripe.checkout.sessions.create({
      success_url: `${process.env.HOST_URL}/dashboard/input/?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.HOST_URL}/dashboard/?canceled=true`,
      mode: 'payment',
      customer_email: user.email,
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID,
          quantity: 1,
        },
      ],
      metadata: {
        userId: user.id,
      },
    });

    return NextResponse.json({ url: stripeSession.url });
  } catch (err) {
    return NextResponse.json(
      {
        error: (err as Error).message,
      },
      { status: 500 },
    );
  }
};
