import { Button } from '@/components/Button';
import DialogModal from '@/components/DialogModal';
import { PlusIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import DashboardPage from '@/components/DashboardPage';
import { Card } from '@/components/Card';
import SignInButton from '@/components/SignInButton';
import { checkActive } from '@/lib/subscription';
import { getCurrentUser } from '@/lib/session';

export default async function MainDashboard() {
  const user = await getCurrentUser();

  if (!user) {
    return (
      <DialogModal
        title={'You are not signed in.'}
        body={'You cannot access this page.'}
        show={true}
        goToButton={<SignInButton text="Sign in" />}
      />
    );
  }

  const plan = await checkActive(user?.id || '');

  return (
    <DashboardPage>
      {/** Summary */}
      <Card className="mb-4">
        <div className="flex flex-col p-4 md:items-start md:flex-row md:justify-evenly">
          {/** Active or not */}
          <Card>
            <Card.Header>
              <Card.Title>Plan Status</Card.Title>
              <Card.Description>
                Your plan is currently <strong>{plan.name}</strong>.
              </Card.Description>
            </Card.Header>
          </Card>
          {/** Obituary count */}
          <Card>
            <Card.Header>
              <Card.Title>Archive</Card.Title>
              <Card.Description>
                {plan.obituaryCount > 1 ? (
                  <>
                    You have <strong>{plan.obituaryCount}</strong> obituaries
                    archived.
                  </>
                ) : (
                  <>
                    You have <strong>{plan.obituaryCount}</strong> obituary
                    archived.
                  </>
                )}
              </Card.Description>
            </Card.Header>
          </Card>
        </div>
      </Card>

      {/** Add new obit */}
      <Card>
        <div className="px-4">
          <div className="text-center mt-6">
            <svg
              className="mx-auto h-12 w-12 text-my-color10 dark:text-my-color1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                vectorEffect="non-scaling-stroke"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-semibold text-my-color10 dark:text-my-color1">
              Get started
            </h3>
            <p className="mt-1 text-sm text-my-color9 dark:text-my-color2">
              Get started by creating a new project.
            </p>
            <div className="mt-6 mb-6">
              <Link href="/dashboard/input">
                <Button
                  variant="ghost"
                  className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  <PlusIcon
                    className="-ml-0.5 mr-1.5 h-5 w-5"
                    aria-hidden="true"
                  />
                  Start writing an obituary
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Card>
    </DashboardPage>
  );
}
