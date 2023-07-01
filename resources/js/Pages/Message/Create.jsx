import React from "react";
import { useForm, Head, usePage } from "@inertiajs/react";
import { AiOutlineMail } from "react-icons/ai";
import { InputError } from "@/Components";
import GuestLayout from "@/Layouts/GuestLayout";
import { HousePlaceholder } from "@/assets";
import { BsEyeFill } from "react-icons/bs";
import moment from "moment";

const Create = (props) => {
    const { property } = usePage().props;
    const { data, setData, processing, reset, post, errors } = useForm({
        full_name: "",
        email: "",
        phone_number: "",
        message_text: "",
        owner_id: property.id,
        owner_type: property.model,
        receiver_id: property.user_id,
    });

    const showImage = () => {
        return "/storage/";
    };

    const handleOnChange = (event) => {
        setData(
            event.target.name,
            event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value
        );
    };

    const submit = (e) => {
        e.preventDefault();

        post(route("message.store"), {
            preserveScroll: true,
        });
    };
    return (
        <GuestLayout user={props.auth.user}>
            <Head title="Sent message to listing advertiser" />
            <section className="bg-white dark:bg-gray-900">
                <div className="px-6 py-12 mx-auto ">
                    <div className="lg:flex lg:items-center lg:-mx-6">
                        <div className="lg:w-2/5 lg:mx-6">
                            <div class="py-6 px-4">
                                <div class="max-w-4xl mx-auto grid grid-cols-1">
                                    <div class="relative p-3 col-start-1 row-start-1 flex flex-col-reverse rounded-lg bg-gradient-to-t from-black/75 via-black/0">
                                        <h1 class="mt-1 text-lg font-semibold text-white dark:sm:text-white">
                                            {property.title}
                                        </h1>
                                        <p class="text-sm leading-4 font-medium text-white dark:sm:text-slate-400">
                                            {property.type}
                                        </p>
                                    </div>
                                    <div class="grid gap-4 col-start-1 col-end-3 row-start-1">
                                        <img
                                            src={
                                                property.images[0]
                                                    ? showImage() +
                                                      property.images[0]
                                                    : HousePlaceholder
                                            }
                                            class="w-full h-60 object-cover rounded-lg"
                                            loading="lazy"
                                        />
                                    </div>
                                    <dl class="mt-4 text-xs font-medium flex items-center row-start-2">
                                        <dt class="sr-only">Views</dt>
                                        <dd class="text-indigo-600 flex items-center dark:text-indigo-400">
                                            <BsEyeFill
                                                size={16}
                                                class="mr-1 stroke-current dark:stroke-indigo-500"
                                            />

                                            <span class="text-slate-400 font-normal">
                                                ({property.views})
                                            </span>
                                        </dd>
                                        <dt class="sr-only">Location</dt>
                                        <dd class="flex items-center">
                                            <svg
                                                width="2"
                                                height="2"
                                                aria-hidden="true"
                                                fill="currentColor"
                                                class="mx-3 text-slate-300"
                                            >
                                                <circle cx="1" cy="1" r="1" />
                                            </svg>
                                            <svg
                                                width="24"
                                                height="24"
                                                fill="none"
                                                stroke="currentColor"
                                                stroke-width="2"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                class="mr-1 text-slate-400 dark:text-slate-500"
                                                aria-hidden="true"
                                            >
                                                <path d="M18 11.034C18 14.897 12 19 12 19s-6-4.103-6-7.966C6 7.655 8.819 5 12 5s6 2.655 6 6.034Z" />
                                                <path d="M14 11a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z" />
                                            </svg>
                                            {property.address?.address_1},
                                            {property.address?.area}
                                        </dd>
                                    </dl>
                                    <div class="mt-4 col-start-1 row-start-3 self-center">
                                        <div>
                                            Created at:{" "}
                                            {moment(property.created_at).format(
                                                "MMM DD, YYYY"
                                            )}
                                        </div>
                                    </div>
                                    <p class="mt-4 text-sm leading-6 col-start-1 dark:text-slate-400">
                                        {property.description}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 lg:w-3/5">
                            <div className="w-full px-8 py-10 mx-auto overflow-hidden bg-white rounded-lg shadow-2xl dark:bg-gray-900 lg:max-w-xl shadow-gray-300/50 dark:shadow-black/50">
                                <h1 className="text-lg font-medium leading-6 text-gray-900 font-popp">
                                    Sent a Message to{" "}
                                    {property.advertiser.first_name}
                                </h1>

                                <form onSubmit={submit}>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                            <div className="relative mt-[3rem]">
                                                <input
                                                    type="text"
                                                    name="full_name"
                                                    value={data.full_name}
                                                    placeholder="Full Name"
                                                    className="w-full px-3 py-3 border border-gray-300 rounded-md shadow peer shadow-gray-100 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                                                    autoComplete="off"
                                                    onChange={handleOnChange}
                                                />
                                                <label
                                                    htmlFor="name"
                                                    className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none font-popp peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                                                >
                                                    Full Name
                                                </label>
                                                <InputError
                                                    message={errors.full_name}
                                                    className="mt-2"
                                                />
                                            </div>
                                            <div className="relative mt-5">
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={data.email}
                                                    placeholder="Email Address"
                                                    className="w-full px-3 py-3 border border-gray-300 rounded-md shadow peer shadow-gray-100 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                                                    autoComplete="off"
                                                    onChange={handleOnChange}
                                                />
                                                <label
                                                    htmlFor="email"
                                                    className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none font-popp peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                                                >
                                                    Email Address
                                                </label>
                                                <InputError
                                                    message={errors.email}
                                                    className="mt-2"
                                                />
                                            </div>
                                            <div className="relative mt-5">
                                                <input
                                                    name="phone_number"
                                                    value={data.phone_number}
                                                    placeholder="Phone Number"
                                                    className="w-full px-3 py-3 border border-gray-300 rounded-md shadow peer shadow-gray-100 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                                                    autoComplete="off"
                                                    onChange={handleOnChange}
                                                />
                                                <label
                                                    htmlFor="phone_number"
                                                    className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none font-popp peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                                                >
                                                    Phone Number
                                                </label>
                                                <InputError
                                                    message={
                                                        errors.phone_number
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                            <div className="relative mt-5">
                                                <textarea
                                                    type="text"
                                                    name="message_text"
                                                    value={data.message_text}
                                                    placeholder="Message"
                                                    className="block w-full h-32 px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 border border-gray-300 rounded-md shadow peer shadow-gray-100 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                                                    autoComplete="off"
                                                    onChange={handleOnChange}
                                                />
                                                <label
                                                    htmlFor="message"
                                                    className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none font-popp peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                                                >
                                                    Message
                                                </label>
                                                <InputError
                                                    message={
                                                        errors.message_text
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </p>
                                    </div>

                                    <div className="mt-10 mb-4">
                                        <button
                                            type="submit"
                                            className="group relative inline-flex w-40 items-center justify-center overflow-hidden rounded-full bg-[#FFF337] px-8 py-3 font-medium text-white transition duration-300 ease-out md:w-auto"
                                        >
                                            <span className="ease absolute inset-0 flex h-full w-full -translate-x-full items-center justify-center bg-[#FFF337] text-black duration-300 group-hover:translate-x-0">
                                                <AiOutlineMail className="w-5 h-5" />
                                            </span>
                                            <span className="absolute flex items-center justify-center w-full h-full text-black transition-all duration-300 transform ease group-hover:translate-x-full">
                                                Sent Message
                                            </span>
                                            <span className="relative invisible">
                                                Sent Message
                                            </span>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </GuestLayout>
    );
};

export default Create;
