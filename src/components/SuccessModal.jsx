import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import sent from "../assets/sent.svg";

export default function SuccessModal({ isOpen, setIsOpen }) {
  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden bg-white px-12 py-8 text-left align-middle shadow-xl transition-all flex gap-6 items-center flex-col border rounded-xl">
                  <div className="flex flex-col gap-2">
                    <img
                      src={sent}
                      alt="sent to lender illustration"
                      className="max-h-56"
                    />
                    <Dialog.Title
                      as="h2"
                      className="text-3xl font-semibold text-center"
                    >
                      Success!
                    </Dialog.Title>
                    <h3 className="text-base font-semibold text-center">
                      Your application is currently being reviewed. You will
                      receive a response within 48 hours.
                    </h3>
                    <div className="w-full flex items-center">
                      <button
                        className="w-72 mx-auto bg-gray-700 text-white rounded-xl px-5 py-2 font-semibold text-sm hover:opacity-80"
                        onClick={() => {
                          closeModal();
                        }}
                      >
                        Got it!
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
