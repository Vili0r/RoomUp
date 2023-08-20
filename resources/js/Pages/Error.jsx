import React from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, usePage, Link } from "@inertiajs/react";
import { ErrorImage } from "@/assets";

const statusMessages = {
    404: "Sorry we couldn't find this page!",
    403: "Sorry this page is fobidden!",
    500: "Something went wrong!",
};

const Error = () => {
    const { status } = usePage().props;
    const title = statusMessages[status] || "";
    return (
        <GuestLayout>
            <Head title={title} />
            <div className="flex items-center w-screen h-screen bg-gray-100">
                <div className="container flex flex-col items-center justify-center px-5 text-gray-700 md:flex-row">
                    <div className="max-w-md">
                        <div className="text-5xl font-bold font-dark">
                            {status}
                        </div>
                        <p className="text-2xl font-light leading-normal md:text-3xl">
                            {title}
                        </p>
                        <p className="mb-8">
                            But dont worry, you can find plenty of other things
                            on our homepage.
                        </p>

                        <Link
                            href={route("welcome")}
                            className="inline px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-[#F1C40F] border border-transparent rounded-lg shadow focus:outline-none focus:shadow-outline-blue active:bg-[#F1C40F] hover:bg-indigo-900"
                        >
                            back to homepage
                        </Link>
                    </div>
                    <div className="max-w-lg">
                        <img src={ErrorImage} />
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
};

export default Error;
