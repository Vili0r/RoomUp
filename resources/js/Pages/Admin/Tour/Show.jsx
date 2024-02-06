import React from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, usePage, Link, useForm } from "@inertiajs/react";
import { MdOutlineReportProblem } from "react-icons/md";
import { AiOutlineMail } from "react-icons/ai";
import PrimaryButton from "@/Components/PrimaryButton";

export default function Show(props) {
    const { virtualTour } = usePage().props;
    const { data, setData, post, processing } = useForm({
        details: "",
        title: virtualTour.owner.title,
        owner_id: virtualTour.owner.id,
        model: virtualTour.model,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("admin.virtual-tours.email-listing-owner", virtualTour.id));
    };

    return (
        <AdminLayout
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Dashboard|Virtual Tour
                </h2>
            }
        >
            <Head title="Virtual Tour" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="max-w-screen-xl px-4 mx-auto md:px-8">
                                <div className="items-start justify-between md:flex">
                                    <div className="max-w-lg">
                                        <h3 className="text-xl font-bold text-gray-800 sm:text-2xl">
                                            Virtual Tour
                                        </h3>
                                    </div>
                                    {props.auth.user.roles[0] === "admin" && (
                                        <Link
                                            href={route(
                                                "admin.virtual-tours.cancel",
                                                virtualTour.id
                                            )}
                                            method="put"
                                            as="button"
                                            type="button"
                                            className="py-1.5 px-3 text-gray-600 hover:text-gray-100 duration-150 hover:bg-red-600 border rounded-lg"
                                        >
                                            Cancel Tour
                                        </Link>
                                    )}
                                </div>
                                <div className="">
                                    <div className="relative mt-6 text-gray-700 shadow-lg bg-gray-500/5 bg-clip-border rounded-xl w-96">
                                        <div className="p-6">
                                            <MdOutlineReportProblem className="w-12 h-12 mb-4 text-gray-900" />

                                            <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                                                {virtualTour.owner.title}
                                            </h5>
                                            <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                                                Phone:{" "}
                                                {virtualTour.contact_number}
                                            </h5>
                                            <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                                                Details: {virtualTour.details}
                                            </p>
                                        </div>
                                        <div className="gap-2 p-6">
                                            <Link
                                                href={route(
                                                    "admin.virtual-tours.completed",
                                                    virtualTour.id
                                                )}
                                                method="put"
                                                as="button"
                                                type="button"
                                                className="py-1.5 px-3 text-gray-600 hover:text-gray-100 duration-150 hover:bg-indigo-600 border rounded-lg"
                                            >
                                                Tour Completed
                                            </Link>

                                            <Link
                                                href={route("property.show", [
                                                    virtualTour.model,
                                                    virtualTour.owner.id,
                                                ])}
                                                className="inline-block"
                                            >
                                                <span className="flex items-center gap-2 px-4 py-3 ml-2 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none hover:bg-gray-900/10 active:bg-gray-900/20">
                                                    Listing
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth="2"
                                                        stroke="currentColor"
                                                        className="w-4 h-4"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                                                        ></path>
                                                    </svg>
                                                </span>
                                            </Link>
                                        </div>
                                    </div>
                                    <form
                                        onSubmit={submit}
                                        className="relative flex flex-col mt-6 text-gray-700 shadow-lg h-96 bg-gray-500/5 bg-clip-border rounded-xl w-96"
                                    >
                                        <div className="p-6">
                                            <AiOutlineMail className="w-12 h-12 mb-4 text-gray-900" />

                                            <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                                                {virtualTour.owner.title}
                                            </h5>
                                            <div className="relative mt-5">
                                                <textarea
                                                    type="text"
                                                    name="details"
                                                    value={data.details}
                                                    placeholder="Details"
                                                    className="block w-full h-32 px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 border border-gray-300 rounded-md shadow peer shadow-gray-100 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                                                    autoComplete="off"
                                                    onChange={(e) =>
                                                        setData(
                                                            "details",
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                                <label
                                                    htmlFor="details"
                                                    className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none font-popp peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                                                >
                                                    Details
                                                </label>
                                            </div>
                                        </div>
                                        <div className="gap-2 p-6">
                                            <PrimaryButton
                                                type="submit"
                                                disabled={processing}
                                                className="ml-2 py-1.5 px-3 text-white duration-150 bg-gray-800 hover:bg-gray-700 border rounded-lg"
                                            >
                                                Email Listing owner
                                            </PrimaryButton>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
