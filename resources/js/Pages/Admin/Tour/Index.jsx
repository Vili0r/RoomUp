import React, { useState } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { AiOutlineFlag } from "react-icons/ai";
import { HiOutlineCheckCircle } from "react-icons/hi2";
import { MdOutlinePending } from "react-icons/md";
import { BsHourglassSplit } from "react-icons/bs";
import { FiDelete } from "react-icons/fi";
import { Head, usePage, Link, router } from "@inertiajs/react";
import Pagination from "@/Components/Pagination";
import TableRow from "@/Components/TableRow";
import TableDataCell from "@/Components/TableDataCell";
import TableHeaderCell from "@/Components/TableHeaderCell";
import TableBody from "@/Components/TableBody";
import TableHead from "@/Components/TableHead";
import moment from "moment";
import { CgArrowsExchangeAltV } from "react-icons/cg";

export default function Index(props) {
    const { virtualTours, filters } = usePage().props;
    const { data, meta } = virtualTours;
    const [searchInput, setSearchInput] = useState(filters.search);
    const [statusFilter, setStatusFilter] = useState(filters.status);
    const [paymentStatusFilter, setPaymentStatusFilter] = useState(
        filters.paymentStatus
    );
    const [index, setIndex] = useState(0);

    const handleSearch = (value) => {
        setSearchInput(value);
        router.get(
            "/admin/virtual-tours",
            { search: value },
            { preserveState: true, replace: true }
        );
    };

    const handleStatus = (value) => {
        setStatusFilter(value);
        router.get(
            "/admin/virtual-tours",
            { status: value },
            { preserveState: true, replace: true }
        );
    };

    const handlePaymentStatus = (value) => {
        setPaymentStatusFilter(value);
        router.get(
            "/admin/virtual-tours",
            { paymentStatus: value },
            { preserveState: true, replace: true }
        );
    };

    const handleChange = (e) => {
        const value = e.target.value;
        handleSearch(value);
    };

    const handleStatusFilterChange = (approved) => {
        handleStatus(approved);
    };

    const handlePaymentStatusFilterChange = (index) => {
        if (index < 3) {
            setIndex((prevCount) => prevCount + 1);
        } else if (index == 3) {
            setIndex(0);
        }
        handlePaymentStatus(index);
    };

    return (
        <AdminLayout
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Dashboard|Virtual Tours
                </h2>
            }
        >
            <Head title="Virtual Tours" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="max-w-screen-xl px-4 mx-auto md:px-8">
                                <div className="items-start justify-between md:flex">
                                    <div className="max-w-lg">
                                        <h3 className="text-xl font-bold text-gray-800 sm:text-2xl">
                                            All Virtual Tours bookings
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
                                    <div className="mt-3 md:mt-0">
                                        <div
                                            className="inline-flex rounded-md shadow-sm"
                                            role="group"
                                        >
                                            <button
                                                onClick={() =>
                                                    handleStatusFilterChange("")
                                                }
                                                type="button"
                                                className={`${
                                                    filters.status == null
                                                        ? "z-10 ring-2 ring-blue-700 text-blue-700"
                                                        : ""
                                                } inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 hover:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white`}
                                            >
                                                <AiOutlineFlag className="w-5 h-5 mr-2" />
                                                All
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleStatusFilterChange(1)
                                                }
                                                type="button"
                                                className={`${
                                                    filters.status == 1
                                                        ? "z-10 ring-2 ring-blue-700 text-blue-700"
                                                        : ""
                                                } inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white`}
                                            >
                                                <MdOutlinePending className="w-5 h-5 mr-2" />
                                                Pending
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleStatusFilterChange(2)
                                                }
                                                type="button"
                                                className={`${
                                                    filters.status == 2
                                                        ? "z-10 ring-2 ring-blue-700 text-blue-700"
                                                        : ""
                                                } inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white`}
                                            >
                                                <BsHourglassSplit className="w-5 h-5 mr-2" />
                                                Booked
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleStatusFilterChange(3)
                                                }
                                                type="button"
                                                className={`${
                                                    filters.status == 3
                                                        ? "z-10 ring-2 ring-blue-700 text-blue-700"
                                                        : ""
                                                } inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white`}
                                            >
                                                <HiOutlineCheckCircle className="w-5 h-5 mr-2" />
                                                Completed
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleStatusFilterChange(4)
                                                }
                                                type="button"
                                                className={`${
                                                    filters.status == 4
                                                        ? "z-10 ring-2 ring-blue-700 text-blue-700"
                                                        : ""
                                                } inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-r-md hover:bg-gray-100 hover:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white`}
                                            >
                                                <FiDelete className="w-5 h-5 mr-2" />
                                                Cancelled
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="relative mt-4 overflow-auto h-max">
                                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                        <TableHead>
                                            <TableRow>
                                                <TableHeaderCell>
                                                    Name
                                                </TableHeaderCell>
                                                <TableHeaderCell>
                                                    Email
                                                </TableHeaderCell>
                                                <TableHeaderCell>
                                                    Title
                                                </TableHeaderCell>

                                                <TableHeaderCell>
                                                    <button
                                                        onClick={() =>
                                                            handlePaymentStatusFilterChange(
                                                                index
                                                            )
                                                        }
                                                        className="inline-flex"
                                                    >
                                                        <CgArrowsExchangeAltV className="w-5 h-5 mt-2" />
                                                        Payment Status
                                                    </button>
                                                </TableHeaderCell>
                                                <TableHeaderCell>
                                                    Status
                                                </TableHeaderCell>
                                                <TableHeaderCell>
                                                    Completed at
                                                </TableHeaderCell>
                                                <TableHeaderCell>
                                                    Created at
                                                </TableHeaderCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {data.map((item) => (
                                                <TableRow key={item.id}>
                                                    <TableDataCell>
                                                        <Link
                                                            href={route(
                                                                "admin.virtual-tours.show",
                                                                item.id
                                                            )}
                                                            method="get"
                                                            as="button"
                                                            type="button"
                                                            className="py-1.5 px-3 text-gray-600 underline hover:font-bold duration-150"
                                                        >
                                                            {item.contact_name}
                                                        </Link>
                                                    </TableDataCell>
                                                    <TableDataCell>
                                                        {item.email}
                                                    </TableDataCell>
                                                    <TableDataCell>
                                                        {item.owner.title}
                                                    </TableDataCell>
                                                    <TableDataCell>
                                                        {item.payment_status ===
                                                            "Pending" && (
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
                                                                    Pending
                                                                </h2>
                                                            </div>
                                                        )}
                                                        {item.payment_status ===
                                                            "Successful" && (
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
                                                                    Successful
                                                                </h2>
                                                            </div>
                                                        )}
                                                        {item.payment_status ===
                                                            "Failed" && (
                                                            <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-emerald-500 bg-red-100/60 dark:bg-gray-800">
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
                                                                    Failed
                                                                </h2>
                                                            </div>
                                                        )}
                                                    </TableDataCell>
                                                    <TableDataCell>
                                                        {item.status ===
                                                            "Pending" && (
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
                                                                    Pending
                                                                </h2>
                                                            </div>
                                                        )}
                                                        {item.status ===
                                                            "Booked" && (
                                                            <div className="inline-flex items-center px-3 py-1 text-orange-500 rounded-full gap-x-2 bg-orange-100/60 dark:bg-gray-800">
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
                                                                    Booked
                                                                </h2>
                                                            </div>
                                                        )}
                                                        {item.status ===
                                                            "Completed" && (
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
                                                                    Completed
                                                                </h2>
                                                            </div>
                                                        )}
                                                        {item.status ===
                                                            "Cancelled" && (
                                                            <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-emerald-500 bg-red-100/60 dark:bg-gray-800">
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
                                                                    Cancelled
                                                                </h2>
                                                            </div>
                                                        )}
                                                    </TableDataCell>
                                                    <TableDataCell>
                                                        {item.completed_at
                                                            ? moment(
                                                                  item.completed_at
                                                              ).format(
                                                                  "MMM DD, YYYY"
                                                              )
                                                            : "Pending"}
                                                    </TableDataCell>
                                                    <TableDataCell>
                                                        {moment(
                                                            item.created_at
                                                        ).format(
                                                            "MMM DD, YYYY"
                                                        )}
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
        </AdminLayout>
    );
}
