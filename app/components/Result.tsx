'use client';

import React, { useEffect, useState } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { useSession } from 'next-auth/react';
import { Card } from '@/components/Card';
import { toast } from '@/components/Toast';
import DialogModal from '@/components/DialogModal';
import SignInButton from '@/components/SignInButton';
import { ArrowDownCircleIcon, PhotoIcon } from '@heroicons/react/20/solid';
import MyDocument from '@/components/MyDocument';
import { Person } from '@/types';

type Props = {
  finalObitId: string | null;
};

export default function Result({ finalObitId }: Props) {
  const session = useSession();
  const [render, setRender] = useState<boolean>(true);
  const [image, setImage] = useState<boolean>(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [person, setPerson] = useState<Person>();
  const [content, setContent] = useState<string>('Nothing to show yet.');

  const getFinalObit = async () => {
    if (session.status === 'authenticated' || session.status === 'loading') {
      const res = await fetch(`/api/final/${finalObitId}`, {
        method: 'GET',
      });

      if (!res.ok) {
        toast({
          title: 'Error',
          message: 'Error fetching obituary.',
          type: 'error',
        });
        return;
      }
      return res.json();
    }
  };

  const getObitImage = async () => {
    if (session.status === 'authenticated' || session.status === 'loading') {
      const res = await fetch(`/api/user/final`, {
        method: 'GET',
      });

      if (!res.ok) {
        toast({
          title: 'Error',
          message: 'Error fetching image.',
          type: 'error',
        });
        return;
      }
      return res.json();
    }
  };

  useEffect(() => {
    setImage(!image);
  }, [render]);

  useEffect(() => {
    setImage(!image);
  }, [imageSrc, content]);

  useEffect(() => {
    (async () => {
      const resObit = await getFinalObit();
      const resImage = await getObitImage();
      setPerson(resObit?.person || null);
      setContent(resObit?.obit || 'Nothing to show yet.');
      setImageSrc(resImage?.finalObitImg || null);
      setRender(!render);
    })();
  }, []);

  const onFileChange = async (event: any) => {
    if (session.status === 'authenticated') {
      setImageSrc(URL.createObjectURL(event.target.files[0]));
      const res = await fetch('/api/user/final', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: event.target.files[0],
        }),
      });

      if (res?.ok) {
        toast({
          title: 'Success',
          message: 'Image uploaded successfully!',
          type: 'success',
        });
        return;
      }

      toast({
        title: 'Error',
        message: 'Error uploading image.',
        type: 'error',
      });
    }
  };

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
      {/** Text */}
      <Card>
        <Card.Header>
          <Card.Title>Final Result</Card.Title>
          <Card.Description>
            This is the final obituary you can use to share with friends and
            family.
          </Card.Description>
        </Card.Header>
        <Card.Content>
          Please carefully review the contents of this obituary. Inspect it for
          inaccuracies and return to your archive to edit, if required. You can
          edit from the archive and save the changes to here.
        </Card.Content>
        <Card.Footer className="flex flex-row justify-between items-center py-3">
          Add a photo of your loved one.
          <div className="ml-4 mr-2">
            <PhotoIcon className="h-6 w-6" aria-hidden="true" />
          </div>
        </Card.Footer>
        <Card.Footer className="flex flex-row justify-between items-center py-3">
          Click the Download icon to generate a PDF of the final result.
          <div className="ml-4 mr-2">
            <ArrowDownCircleIcon className="h-6 w-6" aria-hidden="true" />
          </div>
        </Card.Footer>
      </Card>

      {/** Text area */}
      <div className="mt-10">
        <Card>
          <div className="flex flex-col md:flex-row md:justify-evenly md:items-center md:my-4">
            {/** Image */}
            <div className="md:w-1/3 m-2 md:m-4">
              {imageSrc ? (
                <img
                  src={imageSrc}
                  alt="Image of the deceased"
                  // style={{ height: '300px' }}
                />
              ) : (
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-my-color10/50 dark:border-my-color1/50 px-6 py-10">
                  <div className="text-center">
                    <PhotoIcon
                      className="mx-auto h-12 w-12 text-my-color10 dark:text-my-color1"
                      aria-hidden="true"
                    />
                    <div className="mt-4 flex justify-center text-sm leading-6 text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer p-2 rounded-md bg-indigo-600 font-semibold text-white focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <span>Upload photo</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          onChange={onFileChange}
                        />
                      </label>
                    </div>
                    <p className="text-xs mt-4 leading-5 text-my-color10 dark:text-my-color1">
                      PNG, JPG, up to 10MB
                    </p>
                  </div>
                </div>
              )}
            </div>
            {/** Obituary */}
            <div className="md:w-2/3 mb-4 md:m-4 bg-my-color1 rounded-md shadow-sm ring-1 ring-inset ring-my-color10 dark:ring-my-color2">
              <p className="m-6 text-my-color10 text-justify text-sm">
                {content}
              </p>
            </div>
          </div>

          {/** Export button */}
          <div className="pb-4 pr-4 flex flex-row w-full justify-end">
            <div>
              <PDFDownloadLink
                document={<MyDocument person={person || null} obit={content} />}
                fileName="quickObit-final.pdf"
              >
                <button className="flex rounded-md bg-indigo-600 py-2.5 px-3.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  <ArrowDownCircleIcon
                    className="h-6 w-6 shrink-0"
                    aria-hidden="true"
                  />
                  <p className="pl-4">Download as PDF</p>
                </button>
              </PDFDownloadLink>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}
