'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import DialogModal from './DialogModal';
import { useRouter } from 'next/navigation';
import { ArchiveBoxArrowDownIcon } from '@heroicons/react/24/outline';
import ForwardedAutoResizingTextarea from './AutoSizingTextbox';
import { ClipboardDocumentCheckIcon } from '@heroicons/react/20/solid';
import { Card } from './Card';
import { toast } from './Toast';

type Props = {
  person: string | null;
  obit: string | null;
};

export default function Result({ person, obit }: Props) {
  const session = useSession();
  const router = useRouter();
  const textAreaRef = React.useRef<HTMLTextAreaElement>(null);

  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [saving, setSaving] = useState<boolean>(false);
  const [render, setRender] = useState<boolean>(true);
  const [content, setContent] = useState<string>('Nothing to show yet.');

  const saveObit = async () => {
    if (session.status === 'authenticated') {
      setSaving(true);
      await fetch('/api/obits', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          obit: content,
          person: person ? JSON.parse(person) : null,
        }),
      });
      setRender(!render);
    }
  };

  useEffect(() => {
    setRender(!render);
  }, [obit]);

  useEffect(() => {
    setContent(obit ? JSON.parse(obit) : 'Nothing to show yet.');
  }, []);

  useEffect(() => {
    if (saving) {
      router.push('/dashboard/archive');
    }
  }, [render]);

  const copyToClipboard = () => {
    if (textAreaRef.current) {
      navigator.clipboard.writeText(textAreaRef.current.value).then(
        () => {
          setIsCopied(true);
        },
        (err) => {
          setIsCopied(false);
          return toast({
            title: 'Failed to copy text.',
            message: 'Please try again.',
            type: 'error',
          });
        },
      );
    }
  };

  if (saving) {
    return (
      <DialogModal
        title={'Saving...'}
        body={'You will be redirected to the dashboard.'}
        show={saving}
        goTo={'/dashboard/archive'}
        goToText={'Go to archive'}
      />
    );
  }

  return (
    <>
      {/** Text */}
      <Card>
        <Card.Header>
          <Card.Title>Output</Card.Title>
          <Card.Description>
            This is the output of the quickObit artificial intelligence model.
          </Card.Description>
        </Card.Header>
        <Card.Content>
          Please carefully review this output. Inspect it for inaccuracies and
          modify your input as needed. You can edit the result and archive it as
          desired.
        </Card.Content>
        <Card.Footer className="flex flex-row justify-between items-center">
          Use the copy icon to copy the text to your clipboard &rarr;
          {/** Copy button */}
          {isCopied ? (
            <button
              type="button"
              className="p-3 animate-grow-shrink"
              onClick={copyToClipboard}
            >
              <span className="sr-only">Copy to clipboard</span>
              <ClipboardDocumentCheckIcon
                className="h-6 w-6 text-green-500"
                aria-hidden="true"
              />
            </button>
          ) : (
            <button type="button" className="p-3" onClick={copyToClipboard}>
              <span className="sr-only">Copy to clipboard</span>
              <ClipboardDocumentCheckIcon
                className="h-6 w-6 text-my-color10 dark:text-my-color2"
                aria-hidden="true"
              />
            </button>
          )}
        </Card.Footer>
      </Card>
      {/** Text area */}
      <div className="flex mt-10 rounded-md shadow-sm ring-1 ring-inset ring-my-color10 dark:ring-my-color2 focus-within:ring-2 focus-within:ring-inset focus-within:ring-my-color9">
        <ForwardedAutoResizingTextarea
          name="output"
          id="output"
          ref={textAreaRef}
          onChange={(e) => setContent(e.target.value)}
          className="block flex-1 p-6 text-justify border-0 bg-my-color2 text-my-color10 focus:ring-0 sm:text-sm"
          value={content}
          wrap="soft"
        />
      </div>
      {/** Archive button */}
      <div className="mt-10 flex">
        <button
          onClick={saveObit}
          className="flex rounded-md bg-indigo-600 py-2.5 px-3.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          <ArchiveBoxArrowDownIcon
            className="h-6 w-6 shrink-0"
            aria-hidden="true"
          />
          <p className="pl-4">Archive</p>
        </button>
      </div>
    </>
  );
}
