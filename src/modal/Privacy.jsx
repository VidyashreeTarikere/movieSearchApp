import React, { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

const Privacy = () => {
  const [openPrivacy, setOpenPrivacy] = useState(false);

  return (
    <div>
      <button
        onClick={() => setOpenPrivacy(true)}
        className="rounded-md bg-gray-950/5 px-2.5 py-1.5 text-sm font-semibold text-gray-900 hover:bg-gray-950/10"
      >
        Privacy Policy
      </button>

      <Dialog
        open={openPrivacy}
        onClose={setOpenPrivacy}
        className="relative z-10"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <DialogTitle
                      as="h3"
                      className="text-base font-semibold text-gray-900"
                    ></DialogTitle>
                    <div className="mt-2">
                      <div className="text-sm text-gray-500">
                        <section className="max-w-3xl mx-auto px-4 py-10 text-gray-800">
                          <h1 className="text-4xl font-bold mb-6 text-center">
                            Privacy Policy
                          </h1>

                          <p className="mb-4">
                            At <strong>CineAI</strong>, we value your privacy
                            almost as much as we value good movie
                            recommendations. This policy explains what we
                            collect, why we collect it, and how we handle your
                            info like responsible adults (but with a fun twist).
                          </p>

                          <h2 className="text-2xl font-semibold mt-8 mb-3">
                            📦 What We Collect
                          </h2>
                          <ul className="list-disc list-inside mb-6 space-y-1">
                            <li>Your email and name (when you sign up)</li>
                            <li>
                              Your profile picture (if you log in with a service
                              like Google)
                            </li>
                            <li>
                              Your favorite movies and preferences (for smarter
                              recommendations)
                            </li>
                            <li>
                              Anonymous app usage data (like what pages you
                              visit)
                            </li>
                          </ul>

                          <h2 className="text-2xl font-semibold mt-8 mb-3">
                            🎯 Why We Collect It
                          </h2>
                          <ul className="list-disc list-inside mb-6 space-y-1">
                            <li>To personalize your CineAI experience</li>
                            <li>To recommend content you'll actually enjoy</li>
                            <li>To improve the app with usage insights</li>
                            <li>
                              To occasionally email you cool stuff (if you opt
                              in)
                            </li>
                          </ul>

                          <h2 className="text-2xl font-semibold mt-8 mb-3">
                            🙅 What We Don’t Do
                          </h2>
                          <ul className="list-disc list-inside mb-6 space-y-1">
                            <li>We don’t sell your data. Ever.</li>
                            <li>We don’t track you across the internet.</li>
                            <li>We don’t store anything we don’t need.</li>
                          </ul>

                          <h2 className="text-2xl font-semibold mt-8 mb-3">
                            🔌 Third-Party Services
                          </h2>
                          <p className="mb-4">
                            CineAI uses trusted services like Supabase for
                            authentication and storage. We may also use
                            analytics tools to see what’s popular (but not who
                            you are).
                          </p>

                          <h2 className="text-2xl font-semibold mt-8 mb-3">
                            🛡️ Data Security
                          </h2>
                          <p className="mb-4">
                            We use industry-standard measures like encryption,
                            access control, and secure databases to protect your
                            info. No system is 100% perfect, but we do our best
                            to keep your data safe and sound.
                          </p>

                          <h2 className="text-2xl font-semibold mt-8 mb-3">
                            🗂️ Your Choices
                          </h2>
                          <ul className="list-disc list-inside mb-6 space-y-1">
                            <li>You can request a copy of your data</li>
                            <li>
                              You can ask us to delete your account anytime
                            </li>
                            <li>You can opt out of emails with one click</li>
                          </ul>

                          <h2 className="text-2xl font-semibold mt-8 mb-3">
                            📅 Changes to This Policy
                          </h2>
                          <p className="mb-4">
                            We might update this policy occasionally (when we
                            add cool features or fix typos). We’ll let you know
                            if anything major changes.
                          </p>

                          <h2 className="text-2xl font-semibold mt-8 mb-3">
                            📫 Contact Us
                          </h2>
                          <p>
                            Have a question about your privacy? Email us anytime
                            at
                            <a
                              href="mailto:privacy@cineai.fun"
                              className="text-blue-500 underline"
                            >
                              privacy@cineai.fun
                            </a>
                            .
                          </p>

                          <p className="mt-10 text-center italic">
                            Thanks for trusting us with your movie tastes. We
                            won’t let you down 🍿
                          </p>
                        </section>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  data-autofocus
                  onClick={() => setOpenPrivacy(false)}
                  className="mt-3 inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                  Cancel
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default Privacy;
