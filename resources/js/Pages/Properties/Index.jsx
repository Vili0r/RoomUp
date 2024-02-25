import React, { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage, Link, router } from "@inertiajs/react";
import Pagination from "@/Components/Pagination";
import TableRow from "@/Components/TableRow";
import TableDataCell from "@/Components/TableDataCell";
import TableHeaderCell from "@/Components/TableHeaderCell";
import TableBody from "@/Components/TableBody";
import TableHead from "@/Components/TableHead";
import moment from "moment";
import { HousePlaceholder } from "@/assets";
import { DebounceInput } from "react-debounce-input";
import { useTranslation } from "react-i18next";

export default function Index(props) {
    const { properties, filters, notification } = usePage().props;
    const [searchInput, setSearchInput] = useState(filters.search);
    const [visible, setVisible] = useState(false);

    const { t } = useTranslation();
    const { allProperties, searchProperties, inputPlaceholder, addProperty } =
        t("myListings.misc");
    const {
        type,
        title,
        bedrooms,
        createdAt,
        status,
        action,
        halted,
        liveAt,
        manage,
    } = t("myListings.table");

    const showImage = () => {
        return "/storage/";
    };

    const handleSearch = (value) => {
        setSearchInput(value);
        router.get(
            "/my-properties",
            { search: value },
            { preserveState: true, replace: true, preserveScroll: true }
        );
    };

    const handleChange = (e) => {
        const value = e.target.value;
        handleSearch(value);
    };

    useEffect(() => {
        let timer;

        if (notification !== null) {
            setVisible(true);
            timer = setTimeout(() => {
                setVisible(false);
            }, 10000);
        }

        return () => clearTimeout(timer);
    }, [notification]);

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
                {/* Notification */}
                <div
                    className={`fixed top-[3.75rem] right-4 ${
                        visible ? "opacity-100" : "opacity-0"
                    } transition-opacity duration-300`}
                >
                    <div className="flex rounded-lg shadow-lg w-96">
                        <div className="flex items-center px-6 py-4 bg-green-500 rounded-l-lg">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="text-white fill-current"
                                viewBox="0 0 16 16"
                                width="20"
                                height="20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"
                                ></path>
                            </svg>
                        </div>
                        <div className="flex items-center justify-between w-full px-4 py-6 bg-white border border-gray-200 rounded-r-lg border-l-transparent">
                            <div>{notification}</div>
                            <button onClick={() => setVisible(false)}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="text-gray-700 fill-current"
                                    viewBox="0 0 16 16"
                                    width="20"
                                    height="20"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.75.75 0 111.06 1.06L9.06 8l3.22 3.22a.75.75 0 11-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 01-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 010-1.06z"
                                    ></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="max-w-screen-xl px-4 mx-auto md:px-8">
                                <div className="items-start justify-between md:flex">
                                    <div className="max-w-lg">
                                        <h3 className="text-xl font-bold text-gray-800 sm:text-2xl">
                                            {allProperties}
                                        </h3>
                                        <p className="mt-2 text-gray-600">
                                            {searchProperties}
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

                                        <DebounceInput
                                            type="text"
                                            name="search"
                                            minLength={1}
                                            debounceTimeout={500}
                                            value={searchInput}
                                            onChange={handleChange}
                                            placeholder={inputPlaceholder}
                                            className="block w-full mt-3 py-1.5 pr-5 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-80 placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                        />
                                    </div>
                                    <div className="mt-3 md:mt-0">
                                        <Link
                                            href={route("flat.create")}
                                            className="inline-block px-4 py-2 font-medium text-white duration-150 bg-[#270740] rounded-lg hover:bg-indigo-600 active:bg-[#270740] md:text-sm"
                                        >
                                            {addProperty}
                                        </Link>
                                    </div>
                                </div>
                                <div className="relative mt-12 overflow-auto h-max">
                                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                        <TableHead>
                                            <TableRow>
                                                <TableHeaderCell></TableHeaderCell>
                                                <TableHeaderCell>
                                                    {type}
                                                </TableHeaderCell>
                                                <TableHeaderCell>
                                                    {title}
                                                </TableHeaderCell>
                                                <TableHeaderCell>
                                                    {bedrooms}
                                                </TableHeaderCell>
                                                <TableHeaderCell>
                                                    {createdAt}
                                                </TableHeaderCell>
                                                <TableHeaderCell>
                                                    {status}
                                                </TableHeaderCell>
                                                <TableHeaderCell>
                                                    {action}
                                                </TableHeaderCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {properties.data.map((property) => (
                                                <TableRow key={property.id}>
                                                    <TableDataCell>
                                                        <img
                                                            className="object-cover w-8 h-8 rounded-full"
                                                            src={
                                                                property.images
                                                                    ? showImage() +
                                                                      property
                                                                          .images[0]
                                                                    : HousePlaceholder
                                                            }
                                                            alt=""
                                                        />
                                                    </TableDataCell>
                                                    <TableDataCell>
                                                        <span className="capitalize">
                                                            {property.model}
                                                        </span>
                                                    </TableDataCell>
                                                    <TableDataCell>
                                                        <Link
                                                            href={route(
                                                                `${property.model}.show`,
                                                                property.id
                                                            )}
                                                            className="hover:underline hover:font-semibold"
                                                        >
                                                            {property.title}
                                                        </Link>
                                                    </TableDataCell>
                                                    <TableDataCell>
                                                        {property.model ===
                                                        "flat"
                                                            ? property.size
                                                            : property.available_rooms}
                                                    </TableDataCell>
                                                    <TableDataCell>
                                                        {moment(
                                                            property.created_at
                                                        ).format(
                                                            "MMM DD, YYYY"
                                                        )}
                                                    </TableDataCell>
                                                    <TableDataCell>
                                                        {property.live_at ===
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
                                                                    {halted}
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
                                                                    {liveAt}{" "}
                                                                    {moment(
                                                                        property.live_at
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
                                                                `${property.model}.edit`,
                                                                property.id
                                                            )}
                                                            className="py-1.5 px-3 text-gray-600 hover:text-gray-100 duration-150 hover:bg-indigo-600 border rounded-lg"
                                                        >
                                                            {manage}
                                                        </Link>
                                                    </TableDataCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </table>
                                </div>
                                <Pagination
                                    currentPage={properties.current_page}
                                    lastPage={properties.last_page}
                                    links={properties.links}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
