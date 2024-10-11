import Head from 'next/head';
import React from 'react';


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {


  return (
    <div className='relative mx-auto max-w-3xl pt-20 text-left pb-24 '>
    <Head>
      <title>Sites60 - Privacy Policy</title>
    </Head>
    <div className="relative mx-auto pt-20 text-center pb-24">
      <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">Privacy policy</h1>
      <p class="mt-4 text-base leading-7 text-slate-600">Last updated on June 14, 2023</p>
    </div>
    <div className='mx-auto  w-full'>
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">1. Introduction</h2>
        <p className="text-gray-600 text-lg">
          Thank you for using Sites60. This Privacy Policy explains how we collect, use, and protect your personal information.
        </p>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">2. Information We Collect</h2>
        <p className="text-gray-600 text-lg">
          2.1 We may collect personal information such as your name, email address, and billing information when you sign up for an account.
        </p>
        <p className="text-gray-600 text-lg">
          2.2 We also collect non-personal information, such as your IP address, browser type, and usage data, to improve our service and website.
        </p>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">3. Use of Information</h2>
        <p className="text-gray-600 text-lg">
          3.1 We use your personal information to provide and improve our services, customize your experience, and communicate with you.
        </p>
        <p className="text-gray-600 text-lg">
          3.2 We may use non-personal information for analytics, research, and marketing purposes.
        </p>
      </div>

      {/* ... other sections of the privacy policy ... */}

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">6. Your Rights</h2>
        <p className="text-gray-600 text-lg">
          6.1 You have the right to access, update, and delete your personal information. You can do so by logging into your account or contacting us directly.
        </p>
        <p className="text-gray-600 text-lg">
          6.2 We will retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.
        </p>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">7. Security</h2>
        <p className="text-gray-600 text-lg">
          We implement security measures to protect your personal information from unauthorized access and use. However, no security measure is perfect, and we cannot guarantee absolute security.
        </p>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">8. Contact Us</h2>
        <p className="text-gray-600 text-lg">
          If you have any questions or concerns about this Privacy Policy, please contact us at [rajeev@techub.in].
        </p>
      </div>
    </div>
  </div>
  )
}
