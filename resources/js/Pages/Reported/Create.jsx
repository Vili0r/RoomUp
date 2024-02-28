import React from "react";
import { useForm, Head, usePage } from "@inertiajs/react";
import { SlFlag } from "react-icons/sl";
import InputError from "@/Components/InputError";
import GuestLayout from "@/Layouts/GuestLayout";
import { useTranslation } from "react-i18next";
import { reasonsForReporting } from "@/arrays/Array";

const Create = (props) => {
    const { property } = usePage().props;
    const { data, setData, processing, reset, post, errors } = useForm({
        contact_name: props.auth.user?.first_name || "",
        email: "",
        reason: "",
        details: "",
        owner_id: property.id,
        owner_type: property.model,
    });
    const { t, i18n } = useTranslation();
    const {
        title,
        contactName,
        emailAddress,
        detailsForm,
        natureForm,
        reportListingBtn,
    } = t("reportListing");

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

        post(route("reported-listings.store"), {
            preserveScroll: true,
        });
    };

    return (
        <GuestLayout user={props.auth.user}>
            <Head title="Report error with listing" />
            <section className="bg-white dark:bg-gray-900">
                <div className="px-6 py-12 mx-auto ">
                    <div className="w-full px-8 py-10 mx-auto overflow-hidden bg-white rounded-lg shadow-2xl dark:bg-gray-900 lg:max-w-xl shadow-gray-300/50 dark:shadow-black/50">
                        <h1 className="text-lg font-medium leading-6 text-gray-900 ">
                            {title} {property.title}
                        </h1>

                        <form onSubmit={submit}>
                            <div className="mt-2">
                                <p className="text-sm text-gray-500">
                                    <div className="relative mt-[3rem]">
                                        <input
                                            type="text"
                                            name="contact_name"
                                            value={data.contact_name}
                                            placeholder={contactName}
                                            className="w-full px-3 py-3 border border-gray-300 rounded-md shadow peer shadow-gray-100 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                                            autoComplete="off"
                                            disabled
                                            onChange={handleOnChange}
                                        />
                                        <label
                                            htmlFor="name"
                                            className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                                        >
                                            {contactName}
                                        </label>
                                        <InputError
                                            message={errors.contact_name}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div className="relative mt-5">
                                        <input
                                            type="email"
                                            name="email"
                                            value={data.email}
                                            placeholder={emailAddress}
                                            className="w-full px-3 py-3 border border-gray-300 rounded-md shadow peer shadow-gray-100 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                                            autoComplete="off"
                                            onChange={handleOnChange}
                                        />
                                        <label
                                            htmlFor="email"
                                            className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                                        >
                                            {emailAddress}
                                        </label>
                                        <InputError
                                            message={errors.email}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div className="relative mt-5">
                                        <select
                                            name="reason"
                                            value={data.reason}
                                            className="block w-full py-3 mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                            onChange={handleOnChange}
                                        >
                                            <option value="">Reason</option>
                                            {reasonsForReporting.map(
                                                ({ id, nameEn, nameGr }) => (
                                                    <option key={id} value={id}>
                                                        {i18n.language == "en"
                                                            ? nameEn
                                                            : nameGr}
                                                    </option>
                                                )
                                            )}
                                        </select>
                                        <label
                                            htmlFor="reason"
                                            className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                                        >
                                            {natureForm}
                                        </label>

                                        <InputError
                                            message={errors.reason}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div className="relative mt-5">
                                        <textarea
                                            type="text"
                                            name="details"
                                            value={data.details}
                                            placeholder={detailsForm}
                                            className="block w-full h-32 px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 border border-gray-300 rounded-md shadow peer shadow-gray-100 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                                            autoComplete="off"
                                            onChange={handleOnChange}
                                        />
                                        <label
                                            htmlFor="details"
                                            className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                                        >
                                            {detailsForm}
                                        </label>
                                        <InputError
                                            message={errors.details}
                                            className="mt-2"
                                        />
                                    </div>
                                </p>
                            </div>

                            <div className="mt-10 mb-4">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="relative inline-flex items-center justify-center w-40 px-8 py-3 overflow-hidden font-semibold text-white transition duration-300 ease-out border-0 rounded-full focus:ring-offset-0 focus:ring-0 group md:w-auto"
                                >
                                    <span className="ease absolute inset-0 flex h-full w-full -translate-x-full items-center justify-center rounded-full bg-[#FFF337] text-black duration-300 group-hover:translate-x-0">
                                        <SlFlag className="w-5 h-5" />
                                    </span>
                                    <span className="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform bg-black rounded-full ease group-hover:translate-x-full">
                                        {reportListingBtn}
                                    </span>
                                    <span className="relative invisible">
                                        {reportListingBtn}
                                    </span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </GuestLayout>
    );
};

export default Create;
