import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { Link } from "@inertiajs/react";
import { Hero1, Hero8, Hero2 } from "@/assets";
import { AiOutlineClose } from "react-icons/ai";
import { useTranslation } from "react-i18next";

const PlaceAdModal = ({ isOpen, closeModal }) => {
    const { t } = useTranslation();
    const {
        title,
        room,
        roomDescription,
        whole,
        wholeDescription,
        roomWanted,
        roomWantedDescription,
    } = t("header.adModal");

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

                <div className="fixed inset-0 pt-12 overflow-y-auto md:p-10">
                    <div className="flex items-center justify-center min-h-full text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-5xl overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                <div className="text-sm text-gray-500">
                                    <div className="relative flex flex-col items-center justify-center h-full py-6 overflow-hidden bg-gray-50 sm:py-12">
                                        <div className="absolute inset-auto scale-150 bg-orange-200 h-96 w-96 opacity-20 blur-3xl"></div>

                                        <div className="absolute inset-auto scale-150 translate-x-full bg-green-200 h-96 w-96 opacity-20 blur-3xl"></div>
                                        <div className="w-full">
                                            <div className="flex justify-between max-w-lg px-10 mb-6">
                                                <h1 className="text-5xl font-bold tracking-tight text-[#2f2963]">
                                                    {title}
                                                </h1>
                                                <button
                                                    onClick={closeModal}
                                                    className="absolute mt-5 top-5 right-5 md:hidden"
                                                >
                                                    <AiOutlineClose size={28} />
                                                </button>
                                            </div>
                                            <div className="flex w-full gap-10 px-10 overflow-x-scroll scrollbar-hide snap-x snap-mandatory scroll-px-10 scroll-smooth">
                                                <div className="relative aspect-[2/3] w-[80%] xxs:w-[60%] xs:w-[50%] shrink-0 snap-start snap-always rounded-xl bg-orange-100 sm:w-[44%] md:w-[30%]">
                                                    <div className="absolute bottom-0 z-10 w-full px-5 py-3 rounded-xl bg-gradient-to-t from-black">
                                                        <h2 className="mt-4 text-xl font-bold text-white">
                                                            {room}
                                                        </h2>
                                                        <p className="text-sm text-white/50">
                                                            {roomDescription}
                                                        </p>
                                                    </div>
                                                    <Link
                                                        href={route(
                                                            "shared.create"
                                                        )}
                                                    >
                                                        <img
                                                            src={Hero1}
                                                            alt="image"
                                                            className="object-cover w-full h-full rounded-xl"
                                                        />
                                                    </Link>
                                                </div>

                                                <div className="relative aspect-[2/3] w-[80%] xxs:w-[60%] xs:w-[50%] shrink-0 snap-start snap-always rounded-xl bg-orange-100 sm:w-[44%] md:w-[30%]">
                                                    <div className="absolute bottom-0 z-10 w-full px-5 py-3 rounded-xl bg-gradient-to-t from-black">
                                                        <h2 className="mt-4 text-xl font-bold text-white">
                                                            {whole}
                                                        </h2>
                                                        <p className="text-sm text-white/50">
                                                            {wholeDescription}
                                                        </p>
                                                    </div>
                                                    <Link
                                                        href={route(
                                                            "flat.create"
                                                        )}
                                                    >
                                                        <img
                                                            src={Hero8}
                                                            className="object-cover w-full h-full rounded-xl"
                                                        />
                                                    </Link>
                                                </div>

                                                <div className="relative aspect-[2/3] w-[80%] xxs:w-[60%] xs:w-[50%] shrink-0 snap-start snap-always rounded-xl bg-blue-100 sm:w-[44%] md:w-[30%]">
                                                    <div className="absolute bottom-0 z-10 w-full px-5 py-3 rounded-xl bg-gradient-to-t from-black">
                                                        <h2 className="mt-4 text-xl font-bold text-white">
                                                            {roomWanted}
                                                        </h2>
                                                        <p className="text-sm text-white/50">
                                                            {
                                                                roomWantedDescription
                                                            }
                                                        </p>
                                                    </div>
                                                    <Link
                                                        href={route(
                                                            "roommate.create"
                                                        )}
                                                    >
                                                        <img
                                                            src={Hero2}
                                                            className="object-cover w-full h-full rounded-xl"
                                                        />
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default PlaceAdModal;
