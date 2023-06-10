import { FC } from 'react';
import type { Metadata } from 'next';
import FuneralHomeHero from '@/components/FuneralHomeHero';

export const metadata: Metadata = {
  title: 'quickObit | About',
  description: 'About quickObit',
};

const page: FC = () => {
  return (
    <main className="isolate">
      {/* Hero section */}
      <div className="relative isolate -z-10 overflow-hidden bg-gradient-to-b from-indigo-100/20">
        <div
          className="absolute inset-y-0 right-1/2 -z-10 -mr-96 w-[200%] origin-top-right skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:-mr-80 lg:-mr-96"
          aria-hidden="true"
        />
        <div className="mx-auto max-w-7xl px-6 py-12 md:py-64 md:px-16">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-6 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-8">
            <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:col-span-2 xl:col-auto">
              About quick
              <span className="text-[#c331ff]">Obit</span>
            </h1>
            <div className="mt-6 max-w-xl lg:mt-0 xl:col-end-1 xl:row-start-1">
              <p className="text-lg leading-8 text-gray-600">
                quickObit is a service for individuals to create custom
                obituaries quick and easily. Writing an obituary for your loved
                one should be affordable, and you should have complete control
                over the tribute that will persist forever online. <br />
                <br />
                quickObit utilizes advanced artificial intelligence algorithms to
                create personalized obituaries. This service saves time and
                effort for those who need to write an obituary for a loved one
                by automating the process. With quickObit, people can have a
                fitting tribute for their loved ones without having to go
                through the emotionally challenging task of writing an obituary
                from scratch.
              </p>
            </div>
            <img
              src="/logo.png"
              alt="quickObit logo"
              className="mt-10 aspect-[10/5] w-full max-w-lg rounded-2xl object-cover lg:mt-24 lg:max-w-none xl:row-span-2 xl:row-end-2"
            />
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-white sm:h-32" />
      </div>

      {/* FUneral Home Hero */}
      <div className="mx-auto my-32 max-w-7xl sm:mt-40 sm:px-6 lg:px-8">
        <div className="relative isolate overflow-hidden bg-gray-200 dark:bg-gray-900 px-6 py-24 text-center shadow-2xl sm:rounded-3xl sm:px-16">
          <FuneralHomeHero />
          <div
            className="absolute -top-24 right-0 -z-10 transform-gpu blur-3xl"
            aria-hidden="true"
          >
            <div
              className="aspect-[1404/767] w-[87.75rem] bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-25"
              style={{
                clipPath:
                  'polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)',
              }}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default page;
