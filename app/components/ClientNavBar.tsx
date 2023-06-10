'use client';

import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Session } from 'next-auth/core/types';

import { ThemeToggle } from '@/components/ThemeToggle';
import { buttonVariants } from '@/components/Button';
import SignOutButton from '@/components/SignOutButton';
import SignInButton from '@/components/SignInButton';
import { useState } from 'react';
import { Logo } from '@/components/Logo';
import { useRouter } from 'next/navigation';

const navigation = [
  { name: 'Home', href: '/', current: true },
  { name: 'About', href: '/about', current: false },
  { name: 'Pricing', href: '/pricing', current: false },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

interface ClientNavbarProps {
  session: Session | null;
}

const ClientNavbar: React.FC<ClientNavbarProps> = ({ session }) => {
  const [userSession, setUserSession] = useState(session); // Add a state for the user session
  const router = useRouter();

  const handleSignOut = () => {
    setUserSession(null); // Set the user session to null when the user signs out
    router.push('/');
  };

  return (
    <Disclosure as="nav" className="bg-my-color3 dark:bg-my-color10">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex">
                <div className="-ml-2 mr-2 flex items-center md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-my-color5 hover:bg-my-color8 hover:text-my-color1 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                {/** Logo */}
                <div className="flex flex-shrink-0 items-center">
                  <Logo />
                </div>
                {/** Desktop */}
                <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={buttonVariants({ variant: 'ghost' })}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="flex items-center">
                <div className="hidden md:ml-4 md:flex md:flex-shrink-0 md:items-center">
                  <div className="hidden md:flex gap-4">
                    <ThemeToggle />
                    {userSession ? (
                      <>
                        <div className="hidden md:flex md:items-center md:space-x-4">
                          <Link
                            href="/dashboard"
                            className={buttonVariants({ variant: 'outline' })}
                          >
                            Dashboard
                          </Link>
                        </div>
                        <SignOutButton onDone={handleSignOut} />
                      </>
                    ) : (
                      <SignInButton text="Sign In" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/** Disclosure panel on mobile */}
          <Disclosure.Panel className="md:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    'bg-my-color3 dark:bg-my-color10 text-my-color8 dark:text-my-color3 hover:bg-my-color9 hover:text-my-color1',
                    'block rounded-md px-3 py-2 text-base font-medium',
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
              <div className="flex justify-between">
                <div className="flex space-x-4 items-center">
                  {userSession ? (
                    <>
                      <SignOutButton onDone={handleSignOut} />
                      <div className="pl-1">
                        <Link
                          href="/dashboard"
                          className={buttonVariants({ variant: 'outline' })}
                        >
                          Dashboard
                        </Link>
                      </div>
                    </>
                  ) : (
                    <SignInButton text="Sign In" />
                  )}
                </div>
                <div className="flex items-center">
                  <ThemeToggle />
                </div>
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default ClientNavbar;
