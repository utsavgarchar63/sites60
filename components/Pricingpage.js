import { useState } from 'react'
import { RadioGroup } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/20/solid'

const frequencies = [
  { value: 'monthly', label: 'Monthly', priceSuffix: '/month' },
  { value: 'annually', label: 'Annually', priceSuffix: '/year' },
]
const tiers = [
  {
    name: 'Free Plan',
    id: 'tier-freelancer',
    href: '#',
    price: 'Free Plan',
    description: '',
    features: [
    'Access to All Templates',
    'Drag & Drop Website Builder',
    'AI Website Builder (Limits Apply)',
    'AI Content Writer (Limited)',
    'Sites60 Branding'
    ],
    featured: false,
    cta: 'Current Plan',
  },
//   {
//     name: 'Startup',
//     id: 'tier-startup',
//     href: '#',
//     price: { monthly: '$30', annually: '$288' },
//     description: 'A plan that scales with your rapidly growing business.',
//     features: [
//       '25 products',
//       'Up to 10,000 subscribers',
//       'Advanced analytics',
//       '24-hour support response time',
//       'Marketing automations',
//     ],
//     featured: false,
//     cta: 'Buy plan',
//   },
  {
    name: 'Business Plan',
    id: 'tier-enterprise',
    href: '#',
    price: { monthly: '$6', annually: '$60' },
    description: '',
    features: [
        'Access to All Templates',
        'Drag & Drop Website Builder',
        'AI Website Builder (No Limits)',
        'AI Content Writer (ChatGPT Powered)',
        'Connect your own Domain'

    ],
    featured: true,
    cta: 'Buy Now',
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  const [frequency, setFrequency] = useState(frequencies[0])

  return (
    <div className="bg-white py-1">
      <div className="mx-auto max-w-3xl px-6 lg:px-4">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mt-1 text-4xl font-bold tracking-tight text-gray-700 sm:text-4xl">
            Pricing Plans
          </p>
        </div>
        <p className="mx-auto mt-2 w-full rounded-lg text-center text-xs text-gray-600+ p-1">
            Pick yearly and get 2 months free*
        </p>
        <div className="mt-3 flex justify-center">
          <RadioGroup
            value={frequency}
            onChange={setFrequency}
            className="grid grid-cols-2 gap-x-1 rounded-full p-1 text-center text-xs font-semibold leading-5 ring-1 ring-inset ring-gray-200"
          >
            <RadioGroup.Label className="sr-only">Payment frequency</RadioGroup.Label>
            {frequencies.map((option) => (
              <RadioGroup.Option
                key={option.value}
                value={option}
                className={({ checked }) =>
                  classNames(
                    checked ? 'bg-orange-600 text-white' : 'text-gray-500',
                    'cursor-pointer rounded-full px-2.5 py-1'
                  )
                }
              >
                <span>{option.label}</span>
              </RadioGroup.Option>
            ))}
          </RadioGroup>
        </div>
        <div className="isolate mx-auto mt-4 grid max-w-md grid-cols-1 gap-4 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={classNames(
                tier.featured ? 'bg-gray-900 ring-gray-900' : 'ring-gray-200',
                'rounded-3xl p-4 ring-1 xl:p-10'
              )}
            >
              <h3
                id={tier.id}
                className={classNames(
                  tier.featured ? 'text-white' : 'text-gray-900',
                  'text-lg font-semibold leading-8'
                )}
              >
                {tier.name}
              </h3>
              {/* <p className={classNames(tier.featured ? 'text-gray-300' : 'text-gray-600', 'mt-4 text-sm leading-6')}>
                {tier.description}
              </p> */}
              <p className="mt-3 flex items-baseline gap-x-1">
                <span
                  className={classNames(
                    tier.featured ? 'text-white' : 'text-gray-900',
                    'text-4xl font-bold tracking-tight'
                  )}
                >
                  {typeof tier.price === 'string' ? tier.price : tier.price[frequency.value]}
                </span>
                {typeof tier.price !== 'string' ? (
                  <span
                    className={classNames(
                      tier.featured ? 'text-gray-300' : 'text-gray-600',
                      'text-sm font-semibold leading-6'
                    )}
                  >
                    {frequency.priceSuffix}
                  </span>
                ) : null}
              </p>
              <a
                href={tier.href}
                aria-describedby={tier.id}
                className={classNames(
                  tier.featured
                    ? 'bg-orange-500 text-white hover:bg-orange-600 focus-visible:outline-orange-700'
                    : 'bg-white text-gray-700 border border-gray-700',
                  'mt-6 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2'
                )}
              >
                {tier.cta}
              </a>
              <ul
                role="list"
                className={classNames(
                  tier.featured ? 'text-gray-300' : 'text-gray-600',
                  'mt-3 space-y-3 text-sm xl:mt-4'
                )}
              >
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <CheckIcon
                      className={classNames(tier.featured ? 'text-white' : 'text-orange-600', 'h-6 w-5 flex-none')}
                      aria-hidden="true"
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
