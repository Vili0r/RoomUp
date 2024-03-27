import React from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head } from "@inertiajs/react";
import { MdAdd } from "react-icons/md";
import { FiMinus } from "react-icons/fi";

const FAQs = (props) => {
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
                        <div>
                            <button className="flex items-center focus:outline-none">
                                <FiMinus className="flex-shrink-0 text- w-7 h-7 text-[#F1C40F]" />

                                <h1 className="mx-4 text-xl text-gray-700 dark:text-white">
                                    How can I pay for my appointment ?
                                </h1>
                            </button>

                            <div className="flex mt-8 md:mx-10">
                                <span className="border border-[#F1C40F]"></span>

                                <p className="max-w-3xl px-4 text-gray-500 dark:text-gray-300">
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Magni, eum quae. Harum
                                    officiis reprehenderit ex quia ducimus
                                    minima id provident molestias optio nam vel,
                                    quidem iure voluptatem, repellat et ipsa.
                                </p>
                            </div>
                        </div>

                        <hr className="my-8 border-gray-200 dark:border-gray-700" />

                        <div>
                            <button className="flex items-center focus:outline-none">
                                <MdAdd className="flex-shrink-0 text- w-7 h-7 text-[#F1C40F]" />

                                <h1 className="mx-4 text-xl text-gray-700 dark:text-white">
                                    What can I expect at my first consultation ?
                                </h1>
                            </button>
                        </div>

                        <hr className="my-8 border-gray-200 dark:border-gray-700" />

                        <div>
                            <button className="flex items-center focus:outline-none">
                                <MdAdd className="flex-shrink-0 text- w-7 h-7 text-[#F1C40F]" />

                                <h1 className="mx-4 text-xl text-gray-700 dark:text-white">
                                    What are your opening hours ?
                                </h1>
                            </button>
                        </div>

                        <hr className="my-8 border-gray-200 dark:border-gray-700" />

                        <div>
                            <button className="flex items-center focus:outline-none">
                                <MdAdd className="flex-shrink-0 text- w-7 h-7 text-[#F1C40F]" />

                                <h1 className="mx-4 text-xl text-gray-700 dark:text-white">
                                    Do I need a referral ?
                                </h1>
                            </button>
                        </div>

                        <hr className="my-8 border-gray-200 dark:border-gray-700" />

                        <div>
                            <button className="flex items-center focus:outline-none">
                                <MdAdd className="flex-shrink-0 text- w-7 h-7 text-[#F1C40F]" />

                                <h1 className="mx-4 text-xl text-gray-700 dark:text-white">
                                    Is the cost of the appointment covered by
                                    private health insurance ?
                                </h1>
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </GuestLayout>
    );
};

export default FAQs;
