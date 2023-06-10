import Link from 'next/link';
import { buttonVariants } from '@/components/Button';
import SignInButton from './SignInButton';

export default function FuneralHomeHero() {
  return (
    <>
      <div className="hidden sm:mb-8 sm:flex sm:justify-center">
        <div className="relative rounded-full px-3 text-sm leading-6 text-my-color10 dark:text-my-color1 ring-4 ring-my-color10/10 dark:ring-my-color1/10 hover:my-color8/20">
          Coming soon.
        </div>
      </div>
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-my-color10 dark:text-my-color2 sm:text-6xl">
          Funeral Homes
        </h1>
        <p className="mt-6 text-lg leading-8 text-my-color10 dark:text-my-color1">
          Are you a funeral home in need of a CRM for managing your day-to-day
          operations? We&apos;d love to hear from you. Try quickObit and let us
          know if can help. We can do more than just obituary writing.
        </p>
        <div className="mt-10 flex flex-col gap-y-10 items-center justify-center md:flex-row md:gap-x-6 md:gap-y-0">
          <SignInButton text="Sign in to purchase" />
          <Link
            href={'/pricing'}
            className={buttonVariants({ variant: 'outline' })}
          >
            See pricing →
          </Link>
        </div>
      </div>
    </>
  );
}
