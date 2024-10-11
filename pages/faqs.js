import { Disclosure } from "@headlessui/react";
import { MinusSmallIcon, PlusSmallIcon } from "@heroicons/react/24/outline";
import Layout from "../components/Layout";

const faqs = [
  {
    question: "What is Sites60?",
    answer: "Sites60 is a quick website builder for any business using AI. Answer a few questions about your business and sit tight. Our algorithm uses AI to generate content with images and build a stunning website for you. This website can be hosted on your domain or you can use ours if you don’t have one.",
  },
  {
    question: "How to create a website in 60 seconds?",
    answer: "To create a website in 60 seconds, follow these steps: Enter the brand name, category, what you believe in, and provide some details about your company along with a logo. Then, click the 'Create Website' button to generate your own website using AI.",
  },
  {
    question: "How to edit my website?",
    answer: "To edit your website, you have the option to modify or edit the template for your website.",
  },
  {
    question: "Can I create content for one section alone instead of the whole site?",
    answer: "Yes, you can. You can create content for each section using AI.",
  },
  {
    question: "What if I have my own content and pictures and don’t want AI?",
    answer: "You can use your own content and images while editing each section and build your site.",
  },
  {
    question: "Can I create more than 1 website for my business?",
    answer: "Yes, you can. You can create more websites for your business. Just go to the billing section and see your existing plan and other plans which will suit your needs.",
  },
  {
    question: "How long does the trial period last?",
    answer: "The trial period lasts for 10 days.",
  },
  {
    question: "Can we use our own domain?",
    answer: "Yes, you can use your own domain for your website.",
  },
  {
    question: "Do you have any paid plans for this?",
    answer: "Yes, we do. Just go to the billing section and see the various upgrade plans it offers and sign up for one.",
  },
  {
    question: "What are the payment modes where I can make the payment?",
    answer: "When you are ready to pay, just click on buy and provide your details. This will give you different payment modes.",
  },
];

export default function Example() {
  return (
    <>
    <Layout>
      <div className="bg-white">
      <div className="flex justify-between pl-8 pt-8">
                  <h2 className="text-3xl font-extrabold text-gray-500 pb-5">
                      FAQs
                    </h2>
                  {/* </div> */}
                  </div>

                  {/* <div className="bg-white"> */}
      <div className="mx-auto max-w-full px-6 py-6 sm:py-10 lg:px-8">
      <div className="mt-4 sm:mt-4">
                    <form action="#" className="sm:mx-auto sm:max-w-xl">
                    <h2 className="text-xl font-bold leading-10 tracking-tight text-gray-700">Have a Question?</h2>

                      <div className="sm:flex">
                        <div className="min-w-0 flex-1">
                          <label htmlFor="email" className="sr-only">
                            Email address
                          </label>
                          <input
                            id="email"
                            type="email"
                            placeholder="Ask your question"
                            className="block w-full rounded-md border border-gray-300 px-4 py-3 text-base text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-0 focus:ring-orange-500 focus:border-orange-500 "
                          />
                        </div>
                        <div className="mt-3 sm:ml-3 sm:mt-0">
                          <button
                            type="submit"
                            className="block w-full rounded-md bg-orange-500 px-4 py-3 font-medium text-white shadow hover:bg-orange-500 focus:outline-none focus:ring-0"
                          >
                            Submit
                          </button>
                        </div>
                      </div>

                    </form>
                  </div>

        <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-700">Here are some commnly asked questions</h2>
        <p className="mt-6 max-w-2xl text-base leading-7 text-gray-600">
          Have a different question and can’t find the answer you’re looking for? Reach out to our support team by{' '}
          <a href="#" className="font-semibold text-orange-500 hover:text-orange-500">
            sending us an email
          </a>{' '}
          and we’ll get back to you as soon as we can.
        </p>
        <div className="mt-20">
          <dl className="space-y-16 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-16 sm:space-y-0 lg:grid-cols-3 lg:gap-x-10">
            {faqs.map((faq) => (
              <div key={faq.id}>
                <dt className="text-base font-semibold leading-7 text-gray-900">{faq.question}</dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">{faq.answer}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    {/* </div> */}
      </div>
      </Layout>
    </>
  );
}
