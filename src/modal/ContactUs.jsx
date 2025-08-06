import React, { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import * as Yup from "yup";

const ContactSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email.")
    .max(140, "Too long!")
    .required("Required."),
  message: Yup.string().max(280, "Too long!").required("Required."),
});

const ContactUs = ({ supabase }) => {
  const [openContactUs, setOpenContactUs] = useState(false);
  const [error, setError] = useState([]);

  async function handleForm(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formObj = Object.fromEntries(formData.entries());

    try {
      let validForm = await ContactSchema.isValid(formObj);
      if (validForm) {
        const { error } = await supabase.from("ContactForm").insert({
          email: formObj.email,
          message: formObj.message,
        });

        if (error) throw error;

        e.target.reset();
        setError([]);
      } else {
        await ContactSchema.validate(formObj, { abortEarly: false });
      }
    } catch (err) {
      setError(err.errors);
    }
  }

  return (
    <div>
      <button
        onClick={() => setOpenContactUs(true)}
        className="rounded-md bg-gray-950/5 px-2.5 py-1.5 text-sm font-semibold text-gray-900 hover:bg-gray-950/10"
      >
        Contact Us
      </button>

      <Dialog
        open={openContactUs}
        onClose={setOpenContactUs}
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
                        <form onSubmit={handleForm}>
                          <div className="space-y-12">
                            <div className="border-b border-gray-900/10 pb-12">
                              <h2 className="text-base/7 font-semibold text-gray-900">
                                {" "}
                                Please send us your feedback or message!
                              </h2>

                              <div className="sm:col-span-4">
                                <label
                                  htmlFor="email"
                                  className="block text-sm/6 font-medium text-gray-900"
                                >
                                  Email address
                                </label>

                                <div className="mt-2">
                                  <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                  />
                                  {error?.[0] && (
                                    <div className="error">{error?.[0]}</div>
                                  )}
                                </div>
                              </div>

                              <div className="col-span-full">
                                <label
                                  htmlFor="message"
                                  className="block text-sm/6 font-medium text-gray-900"
                                >
                                  Tell us
                                </label>
                                <div className="mt-2">
                                  <textarea
                                    id="message"
                                    name="message"
                                    rows={3}
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    defaultValue={""}
                                  />
                                  {error?.[1] && (
                                    <div className="error">{error?.[1]}</div>
                                  )}
                                </div>
                                <p className="mt-3 text-sm/6 text-gray-600">
                                  Write your message.
                                </p>
                              </div>
                            </div>

                            <div className="mt-6 flex items-center justify-end gap-x-6">
                              <button
                                type="submit"
                                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                              >
                                Send
                              </button>
                            </div>
                            <p className="mt-1 text-sm/6 text-gray-600">
                              Also contact us at cineAi@gmail.com
                            </p>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  data-autofocus
                  onClick={() => setOpenContactUs(false)}
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

export default ContactUs;
