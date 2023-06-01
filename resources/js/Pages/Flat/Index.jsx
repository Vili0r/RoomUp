import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage, Link, router } from "@inertiajs/react";
import {
    Pagination,
    TableRow,
    TableDataCell,
    TableHeaderCell,
    TableBody,
    TableHead,
} from "@/Components";
import { AiOutlineSortAscending } from "react-icons/ai";
import moment from "moment";
import { HousePlaceholder } from "@/assets";

export default function Index(props) {
    const { flats, filters } = usePage().props;
    const { data, meta } = flats;
    const [searchInput, setSearchInput] = useState(filters.search);

    const showImage = () => {
        return "/storage/";
    };

    const handleSearch = (value) => {
        setSearchInput(value);
        router.get(
            "/flat",
            { search: value },
            { preserveState: true, replace: true }
        );
    };

    const handleChange = (e) => {
        const value = e.target.value;
        handleSearch(value);
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
            <Head title="My Properties" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="max-w-screen-xl px-4 mx-auto md:px-8">
                                <div className="items-start justify-between md:flex">
                                    <div className="max-w-lg">
                                        <h3 className="text-xl font-bold text-gray-800 sm:text-2xl">
                                            All Properties
                                        </h3>
                                        <p className="mt-2 text-gray-600">
                                            Lorem Ipsum is simply dummy text of
                                            the printing and typesetting
                                            industry.
                                        </p>
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
                                    <div className="mt-3 md:mt-0">
                                        <Link
                                            href="/place-ad"
                                            className="inline-block px-4 py-2 font-medium text-white duration-150 bg-[#270740] rounded-lg hover:bg-indigo-600 active:bg-[#270740] md:text-sm"
                                        >
                                            Add property
                                        </Link>
                                    </div>
                                </div>
                                <div className="relative mt-12 overflow-auto h-max">
                                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                        <TableHead>
                                            <TableRow>
                                                <TableHeaderCell></TableHeaderCell>
                                                <TableHeaderCell>
                                                    Id
                                                </TableHeaderCell>
                                                <TableHeaderCell>
                                                    Title
                                                </TableHeaderCell>
                                                <TableHeaderCell>
                                                    Bedrooms
                                                </TableHeaderCell>
                                                <TableHeaderCell>
                                                    Created At
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
                                            {data.map((flat) => (
                                                <TableRow key={flat.id}>
                                                    <TableDataCell>
                                                        <img
                                                            className="object-cover w-8 h-8 rounded-full"
                                                            src={
                                                                flat.images
                                                                    ? showImage() +
                                                                      flat
                                                                          .images[0]
                                                                    : HousePlaceholder
                                                            }
                                                            alt=""
                                                        />
                                                    </TableDataCell>
                                                    <TableDataCell>
                                                        {flat.id}
                                                    </TableDataCell>
                                                    <TableDataCell>
                                                        <Link
                                                            href={route(
                                                                "flat.show",
                                                                flat.id
                                                            )}
                                                            className="hover:underline hover:font-semibold"
                                                        >
                                                            {flat.title}
                                                        </Link>
                                                    </TableDataCell>
                                                    <TableDataCell>
                                                        {flat.size}
                                                    </TableDataCell>
                                                    <TableDataCell>
                                                        {moment(
                                                            flat.created_at
                                                        ).format(
                                                            "MMM DD, YYYY"
                                                        )}
                                                    </TableDataCell>
                                                    <TableDataCell>
                                                        {flat.live_at ===
                                                        null ? (
                                                            <div className="inline-flex items-center px-3 py-1 text-gray-500 rounded-full gap-x-2 bg-gray-100/60 dark:bg-gray-800">
                                                                <svg
                                                                    width="12"
                                                                    height="12"
                                                                    viewBox="0 0 12 12"
                                                                    fill="none"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                >
                                                                    <path
                                                                        d="M4.5 7L2 4.5M2 4.5L4.5 2M2 4.5H8C8.53043 4.5 9.03914 4.71071 9.41421 5.08579C9.78929 5.46086 10 5.96957 10 6.5V10"
                                                                        stroke="#667085"
                                                                        strokeWidth="1.5"
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                    />
                                                                </svg>

                                                                <h2 className="text-sm font-normal">
                                                                    Halted
                                                                </h2>
                                                            </div>
                                                        ) : (
                                                            <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-emerald-500 bg-emerald-100/60 dark:bg-gray-800">
                                                                <svg
                                                                    width="12"
                                                                    height="12"
                                                                    viewBox="0 0 12 12"
                                                                    fill="none"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                >
                                                                    <path
                                                                        d="M10 3L4.5 8.5L2 6"
                                                                        stroke="currentColor"
                                                                        strokeWidth="1.5"
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                    />
                                                                </svg>

                                                                <h2 className="text-sm font-normal">
                                                                    Live at{" "}
                                                                    {moment(
                                                                        flat.live_at
                                                                    ).format(
                                                                        "MMM DD, YYYY"
                                                                    )}
                                                                </h2>
                                                            </div>
                                                        )}
                                                    </TableDataCell>
                                                    <TableDataCell>
                                                        <Link
                                                            href={route(
                                                                "flat.edit",
                                                                flat.id
                                                            )}
                                                            className="py-1.5 px-3 text-gray-600 hover:text-gray-100 duration-150 hover:bg-indigo-600 border rounded-lg"
                                                        >
                                                            Manage
                                                        </Link>
                                                    </TableDataCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </table>
                                </div>
                                <Pagination
                                    currentPage={meta.current_page}
                                    lastPage={meta.last_page}
                                    links={meta.links}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
