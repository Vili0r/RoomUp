import React, { useState } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { BiCommentDetail, BiCommentX, BiCommentCheck } from "react-icons/bi";
import { Head, usePage, Link, router } from "@inertiajs/react";
import Pagination from "@/Components/Pagination";
import TableRow from "@/Components/TableRow";
import TableDataCell from "@/Components/TableDataCell";
import TableHeaderCell from "@/Components/TableHeaderCell";
import TableBody from "@/Components/TableBody";
import TableHead from "@/Components/TableHead";
import moment from "moment";

export default function Index(props) {
    const { comments, filters, auth } = usePage().props;
    const { data, meta } = comments;
    const [searchInput, setSearchInput] = useState(filters.search);
    const [approvedFilter, setApprovedFilter] = useState(filters.approved);

    const handleSearch = (value) => {
        setSearchInput(value);
        setApprovedFilter(approvedValue);
        router.get(
            "/admin/comments",
            { search: value },
            { preserveState: true, replace: true }
        );
    };

    const handleApproved = (value) => {
        setApprovedFilter(value);
        router.get(
            "/admin/comments",
            { approved: value },
            { preserveState: true, replace: true }
        );
    };

    const handleChange = (e) => {
        const value = e.target.value;
        handleSearch(value);
    };

    const handleApprovedFilterChange = (approved) => {
        handleApproved(approved);
    };

    return (
        <AdminLayout
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Dashboard|Comments
                </h2>
            }
        >
            <Head title="Comments" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="max-w-screen-xl px-4 mx-auto md:px-8">
                                <div className="items-start justify-between md:flex">
                                    <div className="max-w-lg">
                                        <h3 className="text-xl font-bold text-gray-800 sm:text-2xl">
                                            All Comments
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
                                                    handleApprovedFilterChange(
                                                        ""
                                                    )
                                                }
                                                type="button"
                                                className={`${
                                                    filters.approved == null
                                                        ? "z-10 ring-2 ring-blue-700 text-blue-700"
                                                        : ""
                                                } inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 hover:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white`}
                                            >
                                                <BiCommentDetail className="w-5 h-5 mr-2" />
                                                All
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleApprovedFilterChange(
                                                        false
                                                    )
                                                }
                                                type="button"
                                                className={`${
                                                    filters.approved === "false"
                                                        ? "z-10 ring-2 ring-blue-700 text-blue-700"
                                                        : ""
                                                } inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white`}
                                            >
                                                <BiCommentX className="w-5 h-5 mr-2" />
                                                Halted
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleApprovedFilterChange(
                                                        1
                                                    )
                                                }
                                                type="button"
                                                className={`${
                                                    filters.approved == 1
                                                        ? "z-10 ring-2 ring-blue-700 text-blue-700"
                                                        : ""
                                                } inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-r-md hover:bg-gray-100 hover:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white`}
                                            >
                                                <BiCommentCheck className="w-5 h-5 mr-2" />
                                                Approved
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
                                                    Blog Title
                                                </TableHeaderCell>
                                                <TableHeaderCell>
                                                    Status
                                                </TableHeaderCell>
                                                <TableHeaderCell>
                                                    Created at
                                                </TableHeaderCell>

                                                <TableHeaderCell>
                                                    Action
                                                </TableHeaderCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {data.map((comment) => (
                                                <TableRow key={comment.id}>
                                                    <TableDataCell>
                                                        {comment.name}
                                                    </TableDataCell>
                                                    <TableDataCell>
                                                        {comment.email}
                                                    </TableDataCell>
                                                    <TableDataCell>
                                                        {comment.blog.title}
                                                    </TableDataCell>
                                                    <TableDataCell>
                                                        {!comment.approved ? (
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
                                                                    Approved
                                                                </h2>
                                                            </div>
                                                        )}
                                                    </TableDataCell>
                                                    <TableDataCell>
                                                        {moment(
                                                            comment.created_at
                                                        ).format(
                                                            "MMM DD, YYYY"
                                                        )}
                                                    </TableDataCell>
                                                    <TableDataCell>
                                                        {
                                                            <Link
                                                                href={route(
                                                                    "admin.blogs.comments.update",
                                                                    [
                                                                        comment
                                                                            .blog
                                                                            .id,
                                                                        comment.id,
                                                                    ]
                                                                )}
                                                                method="put"
                                                                as="button"
                                                                type="button"
                                                                className="py-1.5 px-3 text-gray-600 hover:text-gray-100 duration-150 hover:bg-indigo-600 border rounded-lg"
                                                            >
                                                                Approve
                                                            </Link>
                                                        }

                                                        <Link
                                                            href={route(
                                                                "admin.blogs.comments.destroy",
                                                                [
                                                                    comment.blog
                                                                        .id,
                                                                    comment.id,
                                                                ]
                                                            )}
                                                            method="delete"
                                                            as="button"
                                                            type="button"
                                                            className="ml-2 py-1.5 px-3 text-gray-600 hover:text-gray-100 duration-150 hover:bg-rose-600 border rounded-lg"
                                                        >
                                                            Delete
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
        </AdminLayout>
    );
}
