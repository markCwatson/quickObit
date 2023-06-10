import Link from 'next/link';
import { buttonVariants } from '@/components/Button';
import SignInButton from './SignInButton';
import { Card } from './Card';

export default function HowHero() {
  return (
    <div className="bg-my-color2 dark:bg-gray-900">
      <div className="relative isolate px-6 pt-0 lg:px-8">
        <div className="mx-auto max-w-3xl py-32 sm:py-48 lg:py-56">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 text-sm leading-6 text-my-color10 dark:text-my-color1 ring-4 ring-my-color10/10 dark:ring-my-color1/10 hover:my-color8/20">
              quickObit is easy to use.{' '}
              <a
                href="/about"
                className="font-semibold text-my-color10 dark:text-my-color1"
              >
                <span className="absolute inset-0" aria-hidden="true" />
                Find out more <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-my-color10 dark:text-my-color2 sm:text-6xl">
              How does it work?
            </h1>
            <p className="mt-6 text-lg leading-8 text-my-color10 dark:text-my-color1">
              Simply enter your loved one&apos;s information and let artificial
              intelligence do the rest.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <SignInButton text="Sign in to purchase" />
              <Link
                href={'/pricing'}
                className={buttonVariants({ variant: 'outline' })}
              >
                See pricing →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
