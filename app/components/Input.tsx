'use client';

import { FormEvent, useState, Fragment, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Dialog, Transition } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/24/outline';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { Person, FormPrompt } from '@/types';
import { toast } from './Toast';
import { useSession } from 'next-auth/react';
import DialogModal from './DialogModal';
import SignInButton from './SignInButton';

type Props = {};

const example: Person = {
  name: 'Jane Doe',
  age: '78 years',
  bp: 'Saint John, NB',
  pod: 'VG Hospital in Halifax, NS',
  dob: 'January 1, 1945',
  dod: 'April 2, 2023',
  parents: 'Father John, mother Julie (Leroy) Smith',
  survived: 'Son Jimmy, daughter Joanne, grandson Joseph',
  predeceased: 'Father John, brother Johnny, aunt JJ',
  grandParents: 'None',
  grandKids: 'Grandson Joseph',
  funeral: 'Friday, April 7, at ADC Funeral Home',
  about:
    'Jane loved to go hunting and fishing. She also loved to help out at her church.',
};

// \todo: the length of these strings must be limited (191 chars in prisma)

export default function Input({}: Props) {
  const session = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const [person, setPerson] = useState<Person>(example);

  const [formPrompts, setFormPrompts] = useState<FormPrompt[]>(
    getDefaultFormPrompts(),
  );

  // \todo: can do something in const time here instead?
  function callback(heading: string, value: string) {
    for (let i = 0; i < formPrompts.length; i++) {
      if (formPrompts[i].heading === heading) {
        // update change on formPrompts
        formPrompts[i].value = value;

        // update change on person
        const key: keyof Person = formPrompts[i].id as keyof Person;
        const newPerson: Person = { ...person };
        newPerson[key] = value;
        setPerson(newPerson);
        return;
      }
    }
  }

  function getDefaultFormPrompts() {
    return [
      {
        id: 'name',
        heading: 'Full Name',
        placeholder: example.name,
        value: '',
      },
      {
        id: 'age',
        heading: 'Age',
        placeholder: example.age,
        value: '',
      },
      {
        id: 'bp',
        heading: 'Birth Place',
        placeholder: example.bp,
        value: '',
      },
      {
        id: 'pod',
        heading: 'Place of Death',
        placeholder: example.pod,
        value: '',
      },
      {
        id: 'dob',
        heading: 'Date of Birth',
        placeholder: example.dob,
        value: '',
      },
      {
        id: 'dod',
        heading: 'Date of Death',
        placeholder: example.dod,
        value: '',
      },
      {
        id: 'parents',
        heading: 'Parents',
        placeholder: example.parents,
        value: '',
      },
      {
        id: 'survived',
        heading: 'Survived by',
        placeholder: example.survived,
        value: '',
      },
      {
        id: 'predeceased',
        heading: 'Predeceased by',
        placeholder: example.predeceased,
        value: '',
      },
      {
        id: 'grandParents',
        heading: 'Grand parents (indicate none if applicable)',
        placeholder: example.grandParents,
        value: '',
      },
      {
        id: 'grandKids',
        heading: 'Grandkids (indicate none if applicable)',
        placeholder: example.grandKids,
        value: '',
      },
      {
        id: 'funeral',
        heading: 'Funeral details',
        placeholder: example.funeral,
        value: '',
      },
      {
        id: 'about',
        heading: 'Other information you want mentioned. The more the better.',
        placeholder: example.about,
        value: '',
      },
    ];
  }

  function getPromptValues() {
    // get person from session storage
    const personJson = sessionStorage.getItem('person');
    if (!personJson) {
      return;
    }

    // parse person from json
    const person = JSON.parse(personJson);
    const formPrompts = getDefaultFormPrompts();

    // set formPrompts to person values
    formPrompts.forEach((prompt) => {
      prompt.value = person[prompt.id];
    });

    setFormPrompts(formPrompts);
    setPerson(person);
  }

  function clearForm() {
    formPrompts.forEach((prompt) => {
      prompt.value = '';
    });
  }

  async function handleResponseAndRedirect(person: Person, obit: String) {
    // Save the response data to the session storage or any other storage mechanism
    sessionStorage.setItem('person', JSON.stringify(person));
    sessionStorage.setItem('obituary', JSON.stringify(obit));

    // Redirect the user to the new page
    router.push('/dashboard/output');
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setOpen(true);
    setIsLoading(true);

    const response = await fetch('/api/openai/prompt', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ person }),
    });

    if (!response?.ok) {
      setIsLoading(false);
      setOpen(false);
      return toast({
        title: 'Error generating obituary',
        message: `Server status code: ${response.status}`,
        type: 'error',
      });
    }

    const res = await fetch('/api/submissions', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const { person: personResponse, obit } = await response.json();
    handleResponseAndRedirect(personResponse, obit);

    setIsLoading(false);
  }

  useEffect(() => {
    getPromptValues();
  }, []);

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

  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                  <div>
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                      <CheckIcon
                        className="h-6 w-6 text-green-600 animate-bounce"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-3 text-center sm:mt-5">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                      >
                        Please be patient...
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Please wait while we process this request. This can
                          take several seconds. Thank you for using quickObit.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      onClick={() => setOpen(false)}
                    >
                      Go back to dashboard
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      <Card>
        <Card.Header>
          <Card.Title>Input</Card.Title>
          <Card.Description>
            This form is used to generate the custom obituary.
          </Card.Description>
        </Card.Header>
        <Card.Content>
          To create a personalized obituary for your loved one or client, fill
          out the form provided here. The form typically includes fields for
          basic biographical information, personal details, and accomplishments.
          Users can begin by entering the full name of the deceased and then
          proceed to provide additional information about their life.
          <br /> <br />
          It is essential to double-check all of the information entered to
          ensure accuracy. Once the form is completed, quickObit will use the
          information provided to generate a fitting tribute to the deceased.
          Users will receive a draft of the obituary for review and approval
          before it is published. By filling out the form and providing accurate
          information, users can ensure that their loved one&apos;s legacy is
          honored with a personalized and thoughtful obituary.
        </Card.Content>
        <Card.Footer className="flex flex-row justify-between items-center py-4">
          Reset form to default values &rarr;
          <Button onClick={() => clearForm()}>Reset form</Button>
        </Card.Footer>
      </Card>

      {/** Form */}
      <div className="mx-auto max-w-7xl px-0 py-8 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5">
          <div className="hidden md:block md:col-span-1" />
          <form
            className="bg-white shadow-lg ring-1 ring-gray-900/5 sm:rounded-lg md:col-span-3"
            onSubmit={onSubmit}
          >
            <div className="grid px-6 py-6 max-w-full grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              {formPrompts.map((prompt, index) => (
                <div className="sm:col-span-full" key={index}>
                  <label
                    htmlFor={prompt.heading}
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    {prompt.heading}
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                      <input
                        type="text"
                        name={prompt.heading}
                        id={prompt.heading}
                        onChange={(e) => callback(prompt.heading, e.target.value)}
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        defaultValue={
                          prompt.value !== '' ? prompt.value : ''
                        }
                        placeholder={
                          prompt.value !== ''
                            ? prompt.value
                            : prompt.placeholder
                        }
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/** Button */}
            <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 py-4 px-4 sm:px-8">
              <button
                type="submit"
                className="rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
