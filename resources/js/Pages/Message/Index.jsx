import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import { HousePlaceholder } from "@/assets";
import moment from "moment";
import Pagination from "@/Components/Pagination";

const Index = (props) => {
    const { messages } = usePage().props;
    const showImage = () => {
        return "/storage/";
    };

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Dashboard
                </h2>
            }
        >
            <Head title="My Messages" />
            <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-4 px-10 mb-10">
                <div className="flex flex-col mt-[3rem] mb-[8rem] sm:grid-cols-2 lg:grid-cols-3 xxl:grid-cols-4 gap-8">
                    {messages.data.length > 0 ? (
                        messages.data.map((message) => (
                            <div
                                key={message.id}
                                className="relative flex flex-row w-full text-gray-700 bg-white shadow-md max-w-[48rem] rounded-xl bg-clip-border"
                            >
                                <div className="grid grid-cols-1 mx-auto">
                                    <div className="relative flex flex-col-reverse col-start-1 row-start-1 p-3 rounded-lg bg-gradient-to-t from-black/75 via-black/0">
                                        <h1 className="mt-1 text-lg font-semibold text-white dark:sm:text-white">
                                            {message.owner.title}
                                        </h1>
                                        <p className="flex items-center mt-2 text-base font-medium leading-4 text-white dark:sm:text-slate-400">
                                            <svg
                                                width="24"
                                                height="24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="mr-1 text-white dark:text-slate-500"
                                                ariaHidden="true"
                                            >
                                                <path d="M18 11.034C18 14.897 12 19 12 19s-6-4.103-6-7.966C6 7.655 8.819 5 12 5s6 2.655 6 6.034Z" />
                                                <path d="M14 11a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z" />
                                            </svg>
                                            {message.owner.address_1},
                                            {message.owner.area}
                                        </p>
                                        <p className="text-base font-medium leading-4 text-white dark:sm:text-slate-400">
                                            Created at:{" "}
                                            {moment(
                                                message.owner.created_at
                                            ).format("MMM DD, YYYY")}
                                        </p>
                                        <p className="mb-1 text-sm font-medium leading-4 text-white dark:sm:text-slate-400">
                                            {message.owner.size}
                                            {"room "}
                                            {message.owner.type}
                                        </p>
                                    </div>
                                    <div className="grid col-start-1 col-end-3 row-start-1 gap-4">
                                        <img
                                            src={
                                                message.owner.images
                                                    ? showImage() +
                                                      message.owner.images[0]
                                                    : HousePlaceholder
                                            }
                                            className="object-cover w-full h-full rounded-l-lg"
                                            loading="lazy"
                                        />
                                    </div>
                                </div>

                                <div className="p-6">
                                    <h6 className="block mb-4 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-pink-500 uppercase">
                                        <span className="text-sm text-black normal-case">
                                            Name of the requester:{" "}
                                        </span>
                                        {message.full_name}
                                    </h6>
                                    <h4 className="block mb-2 font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                                        {message.message_text}
                                    </h4>
                                    <p className="block mb-8 font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
                                        {message.owner.description}
                                    </p>
                                    <Link
                                        href={route("conversation.index")}
                                        className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-[#F5B041] uppercase align-middle transition-all rounded-lg select-none hover:text-black hover:bg-[#f6b449] active:bg-[#F5B041] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                    >
                                        Respond
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="2"
                                            stroke="currentColor"
                                            ariaHidden="true"
                                            className="w-4 h-4"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                                            ></path>
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div>No message has been received</div>
                    )}
                </div>
                <Pagination
                    currentPage={messages.meta.current_page}
                    lastPage={messages.meta.last_page}
                    links={messages.meta.links}
                />
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
