import React, { useState, useRef } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, usePage, useForm, Link } from "@inertiajs/react";
import {
    InputError,
    SecondaryButton,
    Modal,
    PrimaryButton,
    TableRow,
    TableDataCell,
    TableHeaderCell,
    TableBody,
    TableHead,
} from "@/Components";

const Index = ({ auth }) => {
    const { permissions } = usePage().props;
    const nameInput = useRef();
    const [addPermissionModal, setAddPermissionModal] = useState(false);
    const { data, setData, processing, reset, errors, post } = useForm({
        name: "",
    });

    const closeModal = () => {
        setAddPermissionModal(false);

        reset();
    };

    const submit = (e) => {
        e.preventDefault();

        post(route("admin.permissions.store"), {
            onSuccess: () => closeModal(),
            onError: () => nameInput.current.focus(),
            onFinish: () => reset(),
        });
    };
    return (
        <AdminLayout auth={auth}>
            <Head title="Admin - Permissions" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <section className="container px-4 mx-auto">
                                <div className="sm:flex sm:items-center sm:justify-between">
                                    <div className="flex items-center gap-x-3">
                                        <h2 className="text-lg font-medium text-gray-800 dark:text-white">
                                            Permissions
                                        </h2>
                                    </div>
                                </div>

                                <div className="mt-6 md:flex md:items-center md:justify-between">
                                    <div className="inline-flex overflow-hidden bg-white border divide-x rounded-lg dark:bg-gray-900 rtl:flex-row-reverse dark:border-gray-700 dark:divide-gray-700">
                                        <button
                                            onClick={() =>
                                                setAddPermissionModal(true)
                                            }
                                            className="px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 bg-gray-100 sm:text-sm dark:bg-gray-800 dark:text-gray-300"
                                        >
                                            Add Permission
                                        </button>
                                    </div>

                                    <div className="relative flex items-center mt-4 md:mt-0">
                                        <span className="absolute">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                stroke="currentColor"
                                                className="w-5 h-5 mx-3 text-gray-400 dark:text-gray-600"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                                                />
                                            </svg>
                                        </span>

                                        <input
                                            type="text"
                                            placeholder="Search"
                                            className="block w-full py-1.5 pr-5 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-80 placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                        />
                                    </div>
                                </div>

                                <Modal
                                    show={addPermissionModal}
                                    onClose={closeModal}
                                >
                                    <form onSubmit={submit} className="p-6">
                                        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                                            Add a new Permission
                                        </h2>

                                        <div className="relative mt-6">
                                            <input
                                                type="name"
                                                name="name"
                                                id="name"
                                                placeholder="Permission Name"
                                                ref={nameInput}
                                                value={data.name}
                                                className="w-full px-3 py-3 border border-gray-300 rounded-md shadow peer shadow-gray-100 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                                                autoComplete="off"
                                                onChange={(e) =>
                                                    setData(
                                                        "name",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            <label
                                                htmlFor="email"
                                                className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none font-popp peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                                            >
                                                Permission Name
                                            </label>

                                            <InputError
                                                message={errors.name}
                                                className="mt-2"
                                            />
                                        </div>

                                        <div className="flex justify-end mt-6">
                                            <SecondaryButton
                                                onClick={closeModal}
                                            >
                                                Cancel
                                            </SecondaryButton>

                                            <PrimaryButton
                                                className="px-4 py-2 ml-3 text-white bg-black rounded-lg"
                                                disabled={processing}
                                            >
                                                Add Permission
                                            </PrimaryButton>
                                        </div>
                                    </form>
                                </Modal>

                                <div className="flex flex-col mt-6">
                                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                            <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableHeaderCell>
                                                                Id
                                                            </TableHeaderCell>
                                                            <TableHeaderCell>
                                                                Name
                                                            </TableHeaderCell>

                                                            <TableHeaderCell>
                                                                Action
                                                            </TableHeaderCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {permissions.map(
                                                            (permission) => (
                                                                <TableRow
                                                                    key={
                                                                        permission.id
                                                                    }
                                                                >
                                                                    <TableDataCell>
                                                                        {
                                                                            permission.id
                                                                        }
                                                                    </TableDataCell>
                                                                    <TableDataCell>
                                                                        {
                                                                            permission.name
                                                                        }
                                                                    </TableDataCell>

                                                                    <TableDataCell>
                                                                        <Link
                                                                            href={route(
                                                                                "admin.permissions.edit",
                                                                                permission.id
                                                                            )}
                                                                            className="underline text-[#F1C40F] hover:text-orange-400"
                                                                        >
                                                                            Edit/Delete
                                                                        </Link>
                                                                    </TableDataCell>
                                                                </TableRow>
                                                            )
                                                        )}
                                                    </TableBody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default Index;
