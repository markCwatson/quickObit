import type { Metadata } from 'next';
import HowHero from './components/HowHero';
import SignInButton from './components/SignInButton';

export const metadata: Metadata = {
  title: 'quickObit',
  description: 'Generate custom obituaries using ObitsAI',
};

export default function Home() {
  return (
    <div className="relative overflow-x-hidden">
      <div className="relative bg-my-color2 dark:bg-gray-900">
        {/** Image */}
        <div className="relative h-80 overflow-hidden bg-indigo-600 md:absolute md:left-0 md:h-full md:w-1/3 lg:w-1/2">
          <img className="h-full w-full object-cover" src="home.jpg" alt="" />
          <svg
            viewBox="0 0 926 676"
            aria-hidden="true"
            className="absolute left-24 -bottom-24 w-[57.875rem] transform-gpu blur-[118px]"
          >
            <path
              fill="url(#60c3c621-93e0-4a09-a0e6-4c228a0116d8)"
              fillOpacity=".4"
              d="m254.325 516.708-90.89 158.331L0 436.427l254.325 80.281 163.691-285.15c1.048 131.759 36.144 345.144 168.149 144.613C751.171 125.508 707.17-93.823 826.603 41.15c95.546 107.978 104.766 294.048 97.432 373.585L685.481 297.694l16.974 360.474-448.13-141.46Z"
            />
            <defs>
              <linearGradient
                id="60c3c621-93e0-4a09-a0e6-4c228a0116d8"
                x1="926.392"
                x2="-109.635"
                y1=".176"
                y2="321.024"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#776FFF" />
                <stop offset={1} stopColor="#FF4694" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        {/** Text */}
        <div className="relative mx-auto max-w-7xl py-24 sm:py-32 lg:py-40 lg:px-8">
          <div className="pr-6 pl-6 md:ml-auto md:w-2/3 md:pl-16 lg:w-1/2 lg:pl-24 lg:pr-0 xl:pl-32">
            <h2 className="text-base font-semibold leading-7 text-my-color8 dark:text-my-color7">
              We’re here to help
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              <span className="text-my-color10 dark:text-my-color1">
                Welcome to quick
              </span>
              <span className="text-[#c331ff]">Obit</span>
            </p>

            <p className="mt-6 text-base leading-7 text-my-color10 dark:text-my-color1">
              Create a fitting tribute for your loved ones without having to go
              through the emotionally challenging task of writing an obituary
              from scratch.
            </p>
            {/** Button */}
            <div className="mt-8">
              <SignInButton text="Sign in to purchase" />
            </div>
          </div>
        </div>
      </div>
      <HowHero />
    </div>
  );
}
