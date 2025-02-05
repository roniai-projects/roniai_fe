import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../redux/userReducer";
import { logoutCompany } from "../redux/companyReducer ";
import { logoutProduct } from "../redux/productReducer";
import { useDispatch } from "react-redux";

export default function LogOutModal({ isOpen, setIsOpen }) {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const goToPage = (path) => {
    navigate(path);
    dispatch(logoutUser());
    dispatch(logoutCompany());
    dispatch(logoutProduct());
    localStorage.removeItem("jwtToken");
  };

  function closeModal() {
    setIsOpen(false);
  }

  // function openModal() {
  //   setIsOpen(true);
  // }

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
                <Dialog.Panel className="w-full max-w-sm transform overflow-hidden bg-white px-12 py-8 text-left align-middle shadow-xl transition-all flex gap-6 items-center flex-col border rounded-xl">
                  <Dialog.Title
                    as="h2"
                    className="text-3xl font-semibold text-center"
                  >
                    End Session?
                  </Dialog.Title>
                  <div className="flex flex-col gap-2">
                    <div className="w-full flex items-center">
                      <button
                        className="w-72 bg-gradient-to-r text-gray-800 from-[#EDC6D7] via-[#CDB6D6] to-[#B0A7D4] rounded-md px-5 py-2 font-semibold text-sm hover:opacity-80"
                        onClick={() => {
                          goToPage("/");
                        }}
                      >
                        Yes
                      </button>
                    </div>
                    <div
                      className="w-full flex items-center"
                      onClick={() => {
                        closeModal();
                      }}
                    >
                      <button className="w-72 text-[#EDC6D7] bg-white border border-[#EDC6D7] rounded-md px-5 py-2 font-semibold text-sm hover:opacity-80">
                        No
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
