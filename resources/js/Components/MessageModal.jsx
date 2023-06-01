import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

const MessageModal = ({ isOpen, closeModal }) => {
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
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

                <div className="fixed inset-0 overflow-y-auto xs:p-10 xxs:p-6 p-4">
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
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900 font-popp"
                                >
                                    Sent a Message to Alex
                                </Dialog.Title>
                                <div className="mt-2">
                                    <p className="text-sm text-gray-500">
                                        <div className="relative mt-[3rem]">
                                            <input
                                                type="text"
                                                name="name"
                                                id="ame"
                                                placeholder="Full Name"
                                                className="peer w-full rounded-md border border-gray-300 px-3 py-3 shadow shadow-gray-100 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                                                autoComplete="off"
                                            />
                                            <label
                                                htmlFor="name"
                                                className="pointer-events-none font-popp absolute top-0 left-0 ml-3 origin-left -translate-y-1/2 transform bg-white px-1 text-sm text-gray-500 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                                            >
                                                Full Name
                                            </label>
                                        </div>
                                        <div className="relative mt-5">
                                            <input
                                                type="email"
                                                name="email"
                                                id="email"
                                                placeholder="Email Address"
                                                className="peer w-full rounded-md border border-gray-300 px-3 py-3 shadow shadow-gray-100 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                                                autoComplete="off"
                                            />
                                            <label
                                                htmlFor="email"
                                                className="pointer-events-none font-popp absolute top-0 left-0 ml-3 origin-left -translate-y-1/2 transform bg-white px-1 text-sm text-gray-500 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                                            >
                                                Email Address
                                            </label>
                                        </div>
                                        <div className="relative mt-5">
                                            <textarea
                                                type="text"
                                                name="message"
                                                id="message"
                                                placeholder="Mes"
                                                className="peer w-full block h-32 px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 rounded-md border border-gray-300 shadow shadow-gray-100 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                                                autoComplete="off"
                                            />
                                            <label
                                                htmlFor="message"
                                                className="pointer-events-none font-popp absolute top-0 left-0 ml-3 origin-left -translate-y-1/2 transform bg-white px-1 text-sm text-gray-500 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                                            >
                                                Message
                                            </label>
                                        </div>
                                    </p>
                                </div>

                                <div className="mb-4 mt-10">
                                    <button
                                        type="button"
                                        className="inline-flex font-popp items-center justify-center px-4 py-2 font-medium text-white transition-colors bg-[#F1C40F] rounded-full hover:bg-[#AED6F1] focus:outline-none"
                                        onClick={closeModal}
                                    >
                                        Message Alex
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default MessageModal;
