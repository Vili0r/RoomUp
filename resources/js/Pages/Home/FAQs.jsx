import React, { useState } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head } from "@inertiajs/react";
import { MdAdd } from "react-icons/md";
import { FiMinus } from "react-icons/fi";
import { useTranslation } from "react-i18next";

const FAQs = (props) => {
    const [openQuestion, setOpenQuestion] = useState(0);

    const { t } = useTranslation();
    const {
        firstFAQTitle,
        firstFAQDescription,
        secondFAQTitle,
        secondFAQDescription,
        thirdFAQTitle,
        thirdFAQDescription,
        fourthFAQTitle,
        fourthFAQDescription,
        fifthFAQTitle,
        fifthFAQDescription,
        sixthFAQTitle,
        sixthFAQDescription,
    } = t("welcome.faq");

    const hanldeOpenQuestion = (index) => {
        setOpenQuestion(index);
    };
    return (
        <GuestLayout user={props.auth.user}>
            <Head title="FAQs" />
            <section className="mt-12 bg-white dark:bg-gray-900">
                <div className="container px-6 py-10 mx-auto">
                    <h1 className="text-2xl font-semibold text-gray-800 lg:text-3xl dark:text-white">
                        FAQ's
                    </h1>

                    <hr className="my-6 border-gray-200 dark:border-gray-700" />

                    <div>
                        <div
                            onClick={() => hanldeOpenQuestion(1)}
                            className="cursor-pointer"
                        >
                            <div className="flex items-center focus:outline-none">
                                {openQuestion === 1 ? (
                                    <FiMinus className="flex-shrink-0 text- w-7 h-7 text-[#F1C40F]" />
                                ) : (
                                    <MdAdd className="flex-shrink-0 text- w-7 h-7 text-[#F1C40F]" />
                                )}

                                <h1 className="mx-4 text-xl text-gray-700 dark:text-white">
                                    {firstFAQTitle}
                                </h1>
                            </div>

                            {openQuestion === 1 && (
                                <div className="flex mt-8 md:mx-10">
                                    <span className="border border-[#F1C40F]"></span>

                                    <p className="max-w-3xl px-4 text-gray-500 dark:text-gray-300">
                                        {firstFAQDescription}
                                    </p>
                                </div>
                            )}
                        </div>

                        <hr className="my-8 border-gray-200 dark:border-gray-700" />

                        <div
                            onClick={() => hanldeOpenQuestion(2)}
                            className="cursor-pointer"
                        >
                            <div className="flex items-center focus:outline-none">
                                {openQuestion === 2 ? (
                                    <FiMinus className="flex-shrink-0 text- w-7 h-7 text-[#F1C40F]" />
                                ) : (
                                    <MdAdd className="flex-shrink-0 text- w-7 h-7 text-[#F1C40F]" />
                                )}

                                <h1 className="mx-4 text-xl text-gray-700 dark:text-white">
                                    {secondFAQTitle}
                                </h1>
                            </div>

                            {openQuestion === 2 && (
                                <div className="flex mt-8 md:mx-10">
                                    <span className="border border-[#F1C40F]"></span>

                                    <p className="max-w-3xl px-4 text-gray-500 dark:text-gray-300">
                                        {secondFAQDescription}
                                    </p>
                                </div>
                            )}
                        </div>

                        <hr className="my-8 border-gray-200 dark:border-gray-700" />

                        <div
                            onClick={() => hanldeOpenQuestion(3)}
                            className="cursor-pointer"
                        >
                            <div className="flex items-center focus:outline-none">
                                {openQuestion === 3 ? (
                                    <FiMinus className="flex-shrink-0 text- w-7 h-7 text-[#F1C40F]" />
                                ) : (
                                    <MdAdd className="flex-shrink-0 text- w-7 h-7 text-[#F1C40F]" />
                                )}

                                <h1 className="mx-4 text-xl text-gray-700 dark:text-white">
                                    {thirdFAQTitle}
                                </h1>
                            </div>

                            {openQuestion === 3 && (
                                <div className="flex mt-8 md:mx-10">
                                    <span className="border border-[#F1C40F]"></span>

                                    <p className="max-w-3xl px-4 text-gray-500 dark:text-gray-300">
                                        {thirdFAQDescription}
                                    </p>
                                </div>
                            )}
                        </div>

                        <hr className="my-8 border-gray-200 dark:border-gray-700" />

                        <div
                            onClick={() => hanldeOpenQuestion(4)}
                            className="cursor-pointer"
                        >
                            <div className="flex items-center focus:outline-none">
                                {openQuestion === 4 ? (
                                    <FiMinus className="flex-shrink-0 text- w-7 h-7 text-[#F1C40F]" />
                                ) : (
                                    <MdAdd className="flex-shrink-0 text- w-7 h-7 text-[#F1C40F]" />
                                )}

                                <h1 className="mx-4 text-xl text-gray-700 dark:text-white">
                                    {fourthFAQTitle}
                                </h1>
                            </div>

                            {openQuestion === 4 && (
                                <div className="flex mt-8 md:mx-10">
                                    <span className="border border-[#F1C40F]"></span>

                                    <p className="max-w-3xl px-4 text-gray-500 dark:text-gray-300">
                                        {fourthFAQDescription}
                                    </p>
                                </div>
                            )}
                        </div>

                        <hr className="my-8 border-gray-200 dark:border-gray-700" />

                        <div
                            onClick={() => hanldeOpenQuestion(5)}
                            className="cursor-pointer"
                        >
                            <div className="flex items-center focus:outline-none">
                                {openQuestion === 5 ? (
                                    <FiMinus className="flex-shrink-0 text- w-7 h-7 text-[#F1C40F]" />
                                ) : (
                                    <MdAdd className="flex-shrink-0 text- w-7 h-7 text-[#F1C40F]" />
                                )}

                                <h1 className="mx-4 text-xl text-gray-700 dark:text-white">
                                    {fifthFAQTitle}
                                </h1>
                            </div>

                            {openQuestion === 5 && (
                                <div className="flex mt-8 md:mx-10">
                                    <span className="border border-[#F1C40F]"></span>

                                    <p className="max-w-3xl px-4 text-gray-500 dark:text-gray-300">
                                        {fifthFAQDescription}
                                    </p>
                                </div>
                            )}
                        </div>

                        <hr className="my-8 border-gray-200 dark:border-gray-700" />

                        <div
                            onClick={() => hanldeOpenQuestion(6)}
                            className="cursor-pointer"
                        >
                            <div className="flex items-center focus:outline-none">
                                {openQuestion === 6 ? (
                                    <FiMinus className="flex-shrink-0 text- w-7 h-7 text-[#F1C40F]" />
                                ) : (
                                    <MdAdd className="flex-shrink-0 text- w-7 h-7 text-[#F1C40F]" />
                                )}

                                <h1 className="mx-4 text-xl text-gray-700 dark:text-white">
                                    {sixthFAQTitle}
                                </h1>
                            </div>

                            {openQuestion === 6 && (
                                <div className="flex mt-8 md:mx-10">
                                    <span className="border border-[#F1C40F]"></span>

                                    <p className="max-w-3xl px-4 text-gray-500 dark:text-gray-300">
                                        {sixthFAQDescription}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </GuestLayout>
    );
};

export default FAQs;
