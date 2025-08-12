import React, { useState, useEffect } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

const Avatar = ({ supabase }) => {
  const [pic, setPic] = useState(null);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [id, setID] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (error) {
        console.log(error.message);
      } else {
        // console.log(user);
        setEmail(user.user_metadata.email);
        setID(user.id);
        setPic(user.user_metadata.avatar_url);
        setName(user.user_metadata.name);
      }
    };
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Menu as="div" className="relative text-left">
        <div>
          <MenuButton className="inline-flex justify-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs">
            <img
              src={`${pic}`}
              style={{
                borderRadius: "50%",
                width: "2.5em",
                height: "2.5em",
              }}
            ></img>
          </MenuButton>
        </div>

        <MenuItems
          transition
          className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
        >
          <div className="py-1">
            <MenuItem>
              {({ active }) => (
                <button
                  onClick={() => setOpen(true)}
                  className={`${
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                  }  px-4 py-2 text-left text-sm`}
                >
                  Account Info
                </button>
              )}
            </MenuItem>

            {/* <form action="#" method="POST"> */}
            <MenuItem>
              <button
                type="submit"
                className=" px-4 py-2 text-left text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                onClick={() => supabase.auth.signOut()}
              >
                Sign out
              </button>
            </MenuItem>
            {/* </form> */}
          </div>
        </MenuItems>
      </Menu>

      <Dialog open={open} onClose={setOpen} className="relative z-10">
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
                    >
                      Account Info
                    </DialogTitle>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500"> Name: {name}</p>
                      <p className="text-sm text-gray-500"> Email: {email}</p>
                      <p className="text-sm text-gray-500"> User ID: {id}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  data-autofocus
                  onClick={() => setOpen(false)}
                  className="mt-3 inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                  Cancel
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default Avatar;
