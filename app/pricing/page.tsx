import SignInButton from '@/components/SignInButton';
import { CheckIcon } from '@heroicons/react/20/solid';
import { Metadata } from 'next';

const tiers = [
  {
    name: 'Individuals',
    id: 'tier-individual',
    href: '#',
    price: '$19',
    monthly: false,
    yearly: false,
    description: 'For a one-time use of quickObit.',
    features: [
      'Generate a custom obituary for your loved one',
      'Up to 3 attempts to make it perfect',
      'Save your obituary for future use',
      'Valid for 7 days',
    ],
    mostPopular: true,
  },
  {
    name: 'Funeral Homes - Monthly',
    id: 'tier-monthly',
    href: '#',
    price: '$149',
    monthly: true,
    yearly: false,
    description: "A place to manage your client's obituaries.",
    features: [
      'Generate custom obituaries for your clients',
      'Unlimited attempts',
      'Create client profiles for your records',
      'Advanced analytics',
      '24-hour support response time',
    ],
    mostPopular: false,
  },
];

export const metadata: Metadata = {
  title: 'quickObit | Pricing',
  description: 'Pricing information for quickObit',
};

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

export default function Example() {
  return (
    <div className="relative isolate overflow-hidden bg-my-color2 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl py-12 md:py-64">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-4xl font-bold tracking-tight text-my-color10 dark:text-my-color1 sm:text-5xl">
            Select a pricing plan that works for you
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-my-color10 dark:text-my-color1">
          All of our plans come with a money-back guarantee. No questions asked.
        </p>
        <div className="isolate mx-auto grid max-w-md grid-cols-1 gap-y-8 mt-10 lg:mx-0 lg:max-w-none lg:grid-cols-2 md:px-44">
          {tiers.map((tier, tierIdx) => (
            <div
              key={tier.id}
              className={classNames(
                tier.mostPopular
                  ? 'lg:z-10 lg:rounded-3xl ring-my-color6 dark:ring-my-color9 ring-2'
                  : 'lg:mt-4 lg:mb-4',
                tierIdx === 0 ? 'lg:rounded-3xl' : '',
                tierIdx === tiers.length - 1 ? 'lg:rounded-l-none' : '',
                'flex flex-col justify-between rounded-3xl bg-white p-8 ring-1 ring-gray-200 xl:p-10',
              )}
            >
              <div>
                <div className="flex items-center justify-between gap-x-4">
                  <h3
                    id={tier.id}
                    className={classNames(
                      tier.mostPopular ? 'text-indigo-600' : 'text-gray-900',
                      'text-lg font-semibold leading-8',
                    )}
                  >
                    {tier.name}
                  </h3>
                  {tier.mostPopular ? (
                    <p className="rounded-full bg-indigo-600/10 py-1 px-2.5 text-xs font-semibold leading-5 text-indigo-600">
                      Popular
                    </p>
                  ) : null}
                </div>
                <p className="mt-4 text-sm leading-6 text-gray-600">
                  {tier.description}
                </p>
                <p className="mt-6 flex items-baseline gap-x-1">
                  <span className="text-4xl font-bold tracking-tight text-gray-900">
                    {tier.price}
                  </span>
                  {tier.monthly && (
                    <span className="text-sm font-semibold leading-6 text-gray-600">
                      /month
                    </span>
                  )}
                  {tier.yearly && (
                    <span className="text-sm font-semibold leading-6 text-gray-600">
                      /year
                    </span>
                  )}
                </p>
                <ul
                  role="list"
                  className="mt-8 space-y-3 text-sm leading-6 text-gray-600"
                >
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <CheckIcon
                        className="h-6 w-5 flex-none text-indigo-600"
                        aria-hidden="true"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex items-center justify-center mt-6">
                {tier.mostPopular ? (
                  <SignInButton text="Sign in to purchase" />
                ) : (
                  <a
                    href={tier.href}
                    aria-describedby={tier.id}
                    className={classNames(
                      'text-indigo-600 ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300',
                      'block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
                    )}
                  >
                    Coming soon
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
