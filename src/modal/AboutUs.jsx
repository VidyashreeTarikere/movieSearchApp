import React, { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

const AboutUs = () => {
  const [openAbout, setOpenAbout] = useState(false);
  return (
    <div>
      <button
        onClick={() => setOpenAbout(true)}
        className="rounded-md bg-gray-950/5 px-2.5 py-1.5 text-sm font-semibold text-gray-900 hover:bg-gray-950/10"
      >
        About Us
      </button>

      <Dialog open={openAbout} onClose={setOpenAbout} className="relative z-10">
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
                        <section class="max-w-3xl mx-auto px-4 py-10 text-gray-800">
                          <h1 className="text-4xl font-bold mb-6 text-center">
                            About Us
                          </h1>

                          <p className="mb-6">
                            Welcome to <strong>CineAI</strong> — your AI-powered
                            movie buddy, here to take the hassle out of picking
                            something great to watch. Started by a group of film
                            lovers and code nerds, CineAI was born to solve one
                            simple problem:{" "}
                            <em>stop wasting time scrolling, start watching</em>
                            .
                          </p>

                          <h2 className="text-2xl font-semibold mt-8 mb-3">
                            🎯 Our Mission
                          </h2>
                          <p className="mb-6">
                            To bring you hand‑picked film and show suggestions
                            tailored to your taste—whether you're into cult
                            classNameics, binge-worthy TV, or hidden gems that
                            flew under the radar.
                          </p>

                          <h2 className="text-2xl font-semibold mt-8 mb-3">
                            🚀 How It Works
                          </h2>
                          <ol className="list-decimal list-inside mb-6 space-y-1">
                            <li>
                              <strong>Sign in</strong> using your favorite
                              account (email, social, or magic link).
                            </li>
                            <li>
                              <strong>Tell us your favorites</strong>—your go-to
                              films and any genres you love (or hate).
                            </li>
                            <li>
                              <strong>We work our magic</strong> behind the
                              scenes—CineAI learns your style and starts serving
                              up recommendations.
                            </li>
                            <li>
                              <strong>Watch, rate, and revisit</strong>—the more
                              you use it, the better it gets.
                            </li>
                          </ol>

                          <h2 className="text-2xl font-semibold mt-8 mb-3">
                            ❤️ Built With Love
                          </h2>
                          <ul className="list-disc list-inside mb-6 space-y-1">
                            <li>
                              <strong>React</strong> — for smooth, responsive UI
                            </li>
                            <li>
                              <strong>Supabase</strong> — secure sign-in,
                              database, and storage
                            </li>
                            <li>
                              <strong>Tailwind CSS</strong> — sleek,
                              mobile-first design
                            </li>
                            <li>
                              <strong>Node.js</strong> — fast and scalable
                              backend
                            </li>
                            <li>
                              A sprinkle of humor and late-night movie marathons
                            </li>
                          </ul>

                          <h2 className="text-2xl font-semibold mt-8 mb-3">
                            🌟 Why It Matters
                          </h2>
                          <p className="mb-6">
                            You get lazy Sunday recs without the hassle. We get
                            the satisfaction of delivering a win—not just
                            another algorithm. No spoilers. No hidden fees. Just
                            movies, tech, and excitement.
                          </p>

                          <h2 className="text-2xl font-semibold mt-8 mb-3">
                            📫 Want to chat?
                          </h2>
                          <p>
                            Have an idea, suggestion, or favorite film to share?
                            Drop us a line at{" "}
                            <a
                              href="mailto:hello@cineai.fun"
                              className="text-blue-500 underline"
                            >
                              hello@cineai.fun
                            </a>{" "}
                            — we’d love to hear from you!
                          </p>

                          <p className="mt-10 text-center italic">
                            — The CineAI Team 🎬
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
                  onClick={() => setOpenAbout(false)}
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

export default AboutUs;
