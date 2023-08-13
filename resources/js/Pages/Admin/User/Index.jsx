import React from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, usePage, Link } from "@inertiajs/react";
import { AiOutlineSortAscending } from "react-icons/ai";
import {
    Pagination,
    TableRow,
    TableDataCell,
    TableHeaderCell,
    TableBody,
    TableHead,
} from "@/Components";

const Index = ({ auth }) => {
    const { users } = usePage().props;

    return (
        <AdminLayout auth={auth}>
            <Head title="Admin | User" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <section className="container px-4 mx-auto">
                                <div className="sm:flex sm:items-center sm:justify-between">
                                    <div className="flex items-center gap-x-3">
                                        <h2 className="text-lg font-medium text-gray-800 dark:text-white">
                                            Users
                                        </h2>
                                    </div>
                                </div>

                                <div className="mt-6 md:flex md:items-center md:justify-between">
                                    <div className="inline-flex overflow-hidden bg-white border divide-x rounded-lg dark:bg-gray-900 rtl:flex-row-reverse dark:border-gray-700 dark:divide-gray-700">
                                        <Link
                                            href={route("admin.users.create")}
                                            className="px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 bg-gray-100 sm:text-sm dark:bg-gray-800 dark:text-gray-300"
                                        >
                                            Add User
                                        </Link>
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
                                                                <button className="flex items-center gap-x-3 focus:outline-none">
                                                                    <span>
                                                                        First
                                                                        Name
                                                                    </span>

                                                                    <AiOutlineSortAscending className="h-4" />
                                                                </button>
                                                            </TableHeaderCell>
                                                            <TableHeaderCell>
                                                                Email
                                                            </TableHeaderCell>
                                                            <TableHeaderCell>
                                                                Status
                                                            </TableHeaderCell>
                                                            <TableHeaderCell>
                                                                Action
                                                            </TableHeaderCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {users.data.map(
                                                            (user) => (
                                                                <TableRow
                                                                    key={
                                                                        user.id
                                                                    }
                                                                >
                                                                    <TableDataCell>
                                                                        {
                                                                            user.id
                                                                        }
                                                                    </TableDataCell>
                                                                    <TableDataCell>
                                                                        {
                                                                            user.first_name
                                                                        }
                                                                    </TableDataCell>
                                                                    <TableDataCell>
                                                                        {
                                                                            user.email
                                                                        }
                                                                    </TableDataCell>
                                                                    <TableDataCell>
                                                                        <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-emerald-100/60 dark:bg-gray-800">
                                                                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>

                                                                            <h2 className="text-sm font-normal text-emerald-500">
                                                                                Active
                                                                            </h2>
                                                                        </div>
                                                                    </TableDataCell>
                                                                    <TableDataCell>
                                                                        <Link
                                                                            href={route(
                                                                                "admin.users.edit",
                                                                                user.id
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
                                <Pagination
                                    currentPage={users.meta.current_page}
                                    lastPage={users.meta.last_page}
                                    links={users.meta.links}
                                />
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default Index;
