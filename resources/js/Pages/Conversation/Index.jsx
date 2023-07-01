import React from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import { useForm, Head, usePage } from "@inertiajs/react";

const Index = (props) => {
    const showAvatar = () => {
        return "/storage/";
    };

    return (
        <GuestLayout user={props.auth.user}>
            <Head title="Start conversation" />
            <div className="max-w-9xl mx-auto mt-[6rem] mb-[5rem]">
                <div className="flex flex-row justify-between bg-white">
                    <div className="sticky flex-col hidden w-2/5 border-r-2 [@media(min-width:700px)]:flex">
                        <article className="flex items-start p-6 space-x-6">
                            <img
                                src={
                                    props.auth.user.avatar !==
                                    "https://www.gravatar.com/avatar/000000000000000000000000000000?d=mp"
                                        ? showAvatar() + auth.user.avatar
                                        : "https://www.gravatar.com/avatar/000000000000000000000000000000?d=mp"
                                }
                                alt=""
                                width="60"
                                height="88"
                                className="flex-none rounded-md bg-slate-100"
                            />
                            <div className="relative flex-auto min-w-0">
                                <h2 className="pr-20 font-semibold truncate text-slate-900">
                                    titel
                                </h2>
                                <dl className="flex flex-wrap mt-2 text-sm font-medium leading-6">
                                    <div className="absolute top-0 right-0 flex items-center space-x-1">
                                        <dt className="text-sky-500">
                                            <span className="sr-only">
                                                Star rating
                                            </span>
                                            <svg
                                                width="16"
                                                height="20"
                                                fill="currentColor"
                                            >
                                                <path d="M7.05 3.691c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.372 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.539 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.363-1.118L.98 9.483c-.784-.57-.381-1.81.587-1.81H5.03a1 1 0 00.95-.69L7.05 3.69z" />
                                            </svg>
                                        </dt>
                                        <dd></dd>
                                    </div>
                                    <div>
                                        <dt className="sr-only">Rating</dt>
                                        <dd className="px-1.5 ring-1 ring-slate-200 rounded"></dd>
                                    </div>
                                    <div className="ml-2">
                                        <dt className="sr-only">Year</dt>
                                        <dd>2019</dd>
                                    </div>
                                    <div>
                                        <dt className="sr-only">Genre</dt>
                                        <dd className="flex items-center">
                                            <svg
                                                width="2"
                                                height="2"
                                                fill="currentColor"
                                                className="mx-2 text-slate-300"
                                                aria-hidden="true"
                                            >
                                                <circle cx="1" cy="1" r="1" />
                                            </svg>
                                            flat
                                        </dd>
                                    </div>
                                    <div>
                                        <dt className="sr-only">Runtime</dt>
                                        <dd className="flex items-center">
                                            <svg
                                                width="2"
                                                height="2"
                                                fill="currentColor"
                                                className="mx-2 text-slate-300"
                                                aria-hidden="true"
                                            >
                                                <circle cx="1" cy="1" r="1" />
                                            </svg>
                                        </dd>
                                    </div>
                                    <div className="flex-none w-full mt-2 font-normal">
                                        <dt className="sr-only">Cast</dt>
                                        <dd className="text-slate-400"></dd>
                                    </div>
                                </dl>
                            </div>
                        </article>
                    </div>

                    <div class="flex flex-col flex-auto h-screen overflow-y-hidden w-full p-6">
                        <div class="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
                            <div class="flex flex-col h-full overflow-x-auto mb-4">
                                <div class="flex flex-col h-full">
                                    <div class="grid grid-cols-12 gap-y-2">
                                        <div class="col-start-1 col-end-8 p-3 rounded-lg">
                                            <div class="flex flex-row items-center">
                                                <div class="flex items-center justify-center h-10 w-10 rounded-full text-black bg-indigo-500 flex-shrink-0">
                                                    A
                                                </div>
                                                <div class="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                                                    <div>
                                                        Hey How are you today?
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-start-1 col-end-8 p-3 rounded-lg">
                                            <div class="flex flex-row items-center">
                                                <div class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                                                    A
                                                </div>
                                                <div class="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                                                    <div>
                                                        Lorem ipsum dolor sit
                                                        amet, consectetur
                                                        adipisicing elit. Vel
                                                        ipsa commodi illum saepe
                                                        numquam maxime
                                                        asperiores voluptate
                                                        sit, minima
                                                        perspiciatis.
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-start-6 col-end-13 p-3 rounded-lg">
                                            <div class="flex items-center justify-start flex-row-reverse">
                                                <div class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                                                    A
                                                </div>
                                                <div class="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                                                    <div>
                                                        I'm ok what about you?
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-start-6 col-end-13 p-3 rounded-lg">
                                            <div class="flex items-center justify-start flex-row-reverse">
                                                <div class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                                                    A
                                                </div>
                                                <div class="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                                                    <div>
                                                        Lorem ipsum dolor sit,
                                                        amet consectetur
                                                        adipisicing. ?
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-start-1 col-end-8 p-3 rounded-lg">
                                            <div class="flex flex-row items-center">
                                                <div class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                                                    A
                                                </div>
                                                <div class="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                                                    <div>
                                                        Lorem ipsum dolor sit
                                                        amet !
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-start-6 col-end-13 p-3 rounded-lg">
                                            <div class="flex items-center justify-start flex-row-reverse">
                                                <div class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                                                    A
                                                </div>
                                                <div class="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                                                    <div>
                                                        Lorem ipsum dolor sit,
                                                        amet consectetur
                                                        adipisicing. ?
                                                    </div>
                                                    <div class="absolute text-xs bottom-0 right-0 -mb-5 mr-2 text-gray-500">
                                                        Seen
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-start-1 col-end-8 p-3 rounded-lg">
                                            <div class="flex flex-row items-center">
                                                <div class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                                                    A
                                                </div>
                                                <div class="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                                                    <div>
                                                        Lorem ipsum dolor sit
                                                        amet consectetur
                                                        adipisicing elit.
                                                        Perspiciatis, in.
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-start-1 col-end-8 p-3 rounded-lg">
                                            <div class="flex flex-row items-center">
                                                <div class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                                                    A
                                                </div>
                                                <div class="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                                                    <div class="flex flex-row items-center">
                                                        <button class="flex items-center justify-center bg-indigo-600 hover:bg-indigo-800 rounded-full h-8 w-10">
                                                            <svg
                                                                class="w-6 h-6 text-white"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                viewBox="0 0 24 24"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <path
                                                                    stroke-linecap="round"
                                                                    stroke-linejoin="round"
                                                                    stroke-width="1.5"
                                                                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                                                                ></path>
                                                                <path
                                                                    stroke-linecap="round"
                                                                    stroke-linejoin="round"
                                                                    stroke-width="1.5"
                                                                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                                ></path>
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
                                <div>
                                    <button class="flex items-center justify-center text-gray-400 hover:text-gray-600">
                                        <svg
                                            class="w-5 h-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                                            ></path>
                                        </svg>
                                    </button>
                                </div>
                                <div class="flex-grow ml-4">
                                    <div class="relative w-full">
                                        <input
                                            type="text"
                                            class="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                                        />
                                        <button class="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600">
                                            <svg
                                                class="w-6 h-6"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                ></path>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                <div class="ml-4">
                                    <button class="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0">
                                        <span>Send</span>
                                        <span class="ml-2">
                                            <svg
                                                class="w-4 h-4 transform rotate-45 -mt-px"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                                                ></path>
                                            </svg>
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-2/5 px-5 [@media(max-width:1024px)]:hidden border-l-2 sticky">
                        <div className="flex flex-col">
                            <div className="py-4 text-xl font-semibold">
                                Mern Stack Group
                            </div>
                            <img
                                src="https://source.unsplash.com/L2cxSuKWbpo/600x600"
                                className="object-cover h-64 rounded-xl"
                                alt=""
                            />
                            <div className="py-4 font-semibold">
                                Created 22 Sep 2021
                            </div>
                            <div className="font-light">
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Deserunt, perspiciatis!
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
};

export default Index;
