import React, { useState } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, usePage, Link, router } from "@inertiajs/react";
import { AiOutlineSortAscending } from "react-icons/ai";
import Pagination from "@/Components/Pagination";
import TableRow from "@/Components/TableRow";
import TableDataCell from "@/Components/TableDataCell";
import TableHeaderCell from "@/Components/TableHeaderCell";
import TableBody from "@/Components/TableBody";
import TableHead from "@/Components/TableHead";

const Index = ({ auth }) => {
    const { users, filters } = usePage().props;
    const { data, meta } = users;
    const [searchInput, setSearchInput] = useState(filters.search);

    const handleSearch = (value) => {
        setSearchInput(value);
        router.get(
            "/admin/user/verification",
            { search: value },
            { preserveState: true, replace: true }
        );
    };

    const handleChange = (e) => {
        const value = e.target.value;
        handleSearch(value);
    };

    return (
        <AdminLayout auth={auth}>
            <Head title="Admin | User | Verification" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <section className="container px-4 mx-auto">
                                <div className="items-start justify-between md:flex">
                                    <div className="max-w-lg">
                                        <h3 className="text-xl font-bold text-gray-800 sm:text-2xl">
                                            Account verification application
                                        </h3>

                                        <span className="absolute mt-5">
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
                                            name="search"
                                            value={searchInput}
                                            onChange={handleChange}
                                            placeholder="Search..."
                                            className="block w-full mt-3 py-1.5 pr-5 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-80 placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
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
                                                        {data.map((user) => (
                                                            <TableRow
                                                                key={user.id}
                                                            >
                                                                <TableDataCell>
                                                                    {user.id}
                                                                </TableDataCell>
                                                                <TableDataCell>
                                                                    {
                                                                        user.first_name
                                                                    }
                                                                </TableDataCell>
                                                                <TableDataCell>
                                                                    {user.email}
                                                                </TableDataCell>
                                                                <TableDataCell>
                                                                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100/60 gap-x-2 dark:bg-gray-800">
                                                                        <h2 className="text-sm font-normal ">
                                                                            {
                                                                                user
                                                                                    ?.verification
                                                                                    ?.status
                                                                            }
                                                                        </h2>
                                                                    </div>
                                                                </TableDataCell>

                                                                <TableDataCell>
                                                                    <Link
                                                                        href={route(
                                                                            "admin.user.verification.edit",
                                                                            user.id
                                                                        )}
                                                                        className="underline text-[#F1C40F] hover:text-orange-400"
                                                                    >
                                                                        Edit
                                                                    </Link>
                                                                </TableDataCell>
                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <Pagination
                                    currentPage={meta.current_page}
                                    lastPage={meta.last_page}
                                    links={meta.links}
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
