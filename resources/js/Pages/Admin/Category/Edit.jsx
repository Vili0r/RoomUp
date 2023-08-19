import React from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, usePage, useForm } from "@inertiajs/react";
import { InputError, PrimaryButton } from "@/Components";

export default function Edit(props) {
    const { category } = usePage().props;
    const { data, setData, put, processing, errors } = useForm({
        name: category.name,
    });

    const handleOnChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        put(route("admin.categories.update", category.id));
    };

    return (
        <AdminLayout
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Categories|Create
                </h2>
            }
        >
            <Head title="Creta blog" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="max-w-screen-xl px-4 mx-auto md:px-8">
                                <form onSubmit={submit}>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            placeholder="Category Name"
                                            value={data.name}
                                            className="w-full px-3 py-3 border border-gray-300 rounded-md shadow peer shadow-gray-100 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                                            autoComplete="off"
                                            onChange={handleOnChange}
                                        />
                                        <label
                                            htmlFor="name"
                                            className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none font-popp peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                                        >
                                            Category Name
                                        </label>
                                    </div>

                                    <InputError
                                        message={errors.name}
                                        className="mt-2"
                                    />

                                    <div className="my-6">
                                        <PrimaryButton
                                            disabled={processing}
                                            className="w-full px-3 py-4 text-white bg-black rounded-md hover:bg-gray-900/90 focus:bg-neutral-800 focus:outline-none font-popp"
                                        >
                                            {processing
                                                ? "Processing..."
                                                : "Update"}
                                        </PrimaryButton>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
