'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import DialogModal from '@/components/DialogModal';
import { useRouter } from 'next/navigation';
import { Obit as PrismaObit, Person as PrismaPerson } from '@prisma/client';
import {
  AdjustmentsHorizontalIcon,
  ArrowUpOnSquareIcon,
  CheckBadgeIcon,
} from '@heroicons/react/20/solid';
import { TrashIcon } from '@heroicons/react/24/outline';
import DashboardPage from '@/components/DashboardPage';
import SignInButton from '@/components/SignInButton';
import { Card } from '@/components/Card';
import { Person } from '@/types';
import { toast } from '@/components/Toast';

interface Obit extends PrismaObit {
  person: PrismaPerson;
}

async function getObits() {
  try {
    const res: Response = await fetch('/api/obits', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      // \todo change all to toast
      console.error('Error fetching data:', res.statusText);
      return [];
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

async function deleteEntry(id: String) {
  try {
    const res: Response = await fetch(`/api/obits`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });

    if (!res.ok) {
      console.error('Error deleting data:', res.statusText);
    }
  } catch (error) {
    console.error('Error deleting data:', error);
  }
  return;
}

export default function TablePage() {
  const session = useSession();
  const router = useRouter();
  const [obits, setObits] = useState<Obit[]>([]);
  const [deleting, setDeleting] = useState<boolean>(false);
  const [render, setRender] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getObits();
      setObits(data.data);
    };

    if (session.status === 'authenticated') {
      fetchData();
    }
  }, [session, render]);

  async function handleEditAndRedirect(person: Person) {
    sessionStorage.setItem('person', JSON.stringify(person));
    router.push('/dashboard/input');
  }

  async function handleSetFinalAndRedirect(obitId: string) {
    const res = await fetch('/api/final', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        obitId,
      }),

      // \todo use cookies to store obits to make faster loading
    });

    if (!res.ok) {
      toast({
        title: 'Error',
        message: 'Error setting final obituary.',
        type: 'error',
      });
      return;
    }

    toast({
      title: 'Success!',
      message: 'Final obituary saved!',
      type: 'success',
    });

    router.push('/dashboard/final-result');
  }

  async function isDeleting(id: String) {
    setDeleting(true);
    await deleteEntry(id);
    setDeleting(false);
    setRender(!render);
  }

  function openObit(obit: string, person: Person) {
    sessionStorage.setItem('obituary', JSON.stringify(obit));
    sessionStorage.setItem('person', JSON.stringify(person));
    router.push('/dashboard/output');
  }

  if (session.status !== 'authenticated' && session.status !== 'loading') {
    return (
      <DialogModal
        title={'You are not signed in.'}
        body={'You cannot access this page.'}
        show={true}
        goToButton={<SignInButton text="Sign in" />}
      />
    );
  }

  if (deleting) {
    return (
      <DialogModal
        title={'Deleting.'}
        body={'Deleting one record. Please wait.'}
        show={true}
        goTo={'dashboard/output'}
        goToText={'Go to Output'}
      />
    );
  }

  return (
    <DashboardPage>
      {/** Text */}
      <Card>
        <Card.Header>
          <Card.Title>Archive</Card.Title>
          <Card.Description>Your archived obituaries.</Card.Description>
        </Card.Header>
        <Card.Content>
          This is where your obituaries are stored. You can edit and/or delete
          entries in this table. Here are some tips to help you:
        </Card.Content>
        <Card.Footer className="flex flex-row justify-between items-center py-3">
          If you are viewing this on a large screen, click on the obituary text
          to open it so you can edit it.
        </Card.Footer>
        <Card.Footer className="flex flex-row justify-between items-center py-3">
          If you are viewing this on a small/mobile screen, click on Open icon
          to open so you can edit it.
          <div className="ml-4 mr-2">
            <ArrowUpOnSquareIcon className="h-6 w-6" aria-hidden="true" />
          </div>
        </Card.Footer>
        <Card.Footer className="flex flex-row justify-between items-center py-3">
          Click the Edit icon to return to the input form so you can edit the
          form contents and resubmit.
          <div className="ml-4 mr-2">
            <AdjustmentsHorizontalIcon className="h-6 w-6" aria-hidden="true" />
          </div>
        </Card.Footer>
        <Card.Footer className="flex flex-row justify-between items-center py-3">
          Click the Trash icon to remove an obituary from the archive.
          <div className="ml-4 mr-2">
            <TrashIcon className="h-6 w-6" aria-hidden="true" />
          </div>
        </Card.Footer>
        <Card.Footer className="flex flex-row justify-between items-center py-3">
          Click the Final icon to assign this obituary as final.
          <div className="ml-4 mr-2">
            <CheckBadgeIcon className="h-6 w-6" aria-hidden="true" />
          </div>
        </Card.Footer>
      </Card>
      {/** Table */}
      <div className="mt-8 mx-1">
        <table className="min-w-full divide-y divide-my-color10">
          {/** Head */}
          <thead className="bg-my-color1">
            <tr>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-my-color10"
              />
              <th
                scope="col"
                className="py-3.5 px-4 md:px-8 text-left text-sm font-semibold text-my-color10"
              >
                Date
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-my-color10 table-cell"
              >
                Name
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-my-color10 lg:table-cell"
              >
                Obituary
              </th>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-my-color10"
              />
            </tr>
          </thead>
          <tbody className="divide-y divide-my-color10 bg-my-color1">
            {Array.isArray(obits) &&
              obits.map((obit) => {
                return (
                  <tr key={obit.id}>
                    <td className="py-4 pl-2 sm:pl-4 pr-4 text-left text-sm font-medium">
                      <div className="flex flex-col justify-evenly items-center space-y-6">
                        <button
                          onClick={() => handleSetFinalAndRedirect(obit.id)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          <CheckBadgeIcon
                            className="h-6 w-6"
                            aria-hidden="true"
                          />
                          <span className="sr-only">, make final</span>
                          Final
                        </button>
                        <button
                          onClick={() => handleEditAndRedirect(obit.person)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          <AdjustmentsHorizontalIcon
                            className="h-6 w-6"
                            aria-hidden="true"
                          />
                          <span className="sr-only">, open form</span>
                          Edit
                        </button>
                      </div>
                    </td>
                    <td className="w-full max-w-0 py-4 px-4 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none">
                      {obit.created}
                    </td>
                    <td className="px-3 py-4 text-sm text-gray-500 table-cell">
                      {obit.person.name}
                    </td>
                    <td className="hidden px-3 py-4 text-sm lg:table-cell">
                      <button
                        onClick={() => openObit(obit.body, obit.person)}
                        className="text-my-color10 hover:text-my-color7 text-justify"
                      >
                        {obit.body}
                      </button>
                    </td>
                    <td className="px-3 py-4 lg:hidden">
                      <button onClick={() => openObit(obit.body, obit.person)}>
                        <ArrowUpOnSquareIcon
                          className="h-6 w-6"
                          aria-hidden="true"
                        />
                        <span className="sr-only">, open obituary</span>
                        Open
                      </button>
                    </td>
                    <td className="py-4 pl-4 pr-2 sm:pr-4 text-center text-sm font-medium">
                      <button
                        onClick={() => isDeleting(obit.id)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        <TrashIcon className="h-6 w-6" aria-hidden="true" />
                        <span className="sr-only">, {obit.id}</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </DashboardPage>
  );
}
