import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage, Link } from "@inertiajs/react";
import Pagination from "@/Components/Pagination";
import TableRow from "@/Components/TableRow";
import TableDataCell from "@/Components/TableDataCell";
import TableHeaderCell from "@/Components/TableHeaderCell";
import TableBody from "@/Components/TableBody";
import TableHead from "@/Components/TableHead";
import moment from "moment";
import { HousePlaceholder } from "@/assets";
import { useTranslation } from "react-i18next";

export default function Index(props) {
    const { roommates } = usePage().props;
    const { data, meta } = roommates;

    const { t } = useTranslation();
    const { allProperties, addProperty } = t("myListings.misc");
    const { id, title, createdAt, status, action, halted, liveAt, manage } =
        t("myListings.table");

    const showImage = () => {
        return "/storage/";
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
            <Head title="My Roommate Quest" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="max-w-screen-xl px-4 mx-auto md:px-8">
                                <div className="items-start justify-between md:flex">
                                    <div className="max-w-lg">
                                        <h3 className="text-xl font-bold text-gray-800 sm:text-2xl">
                                            {allProperties}
                                        </h3>
                                    </div>
                                    <div className="mt-3 md:mt-0">
                                        <Link
                                            href={route("roommate.create")}
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
                                                    {id}
                                                </TableHeaderCell>
                                                <TableHeaderCell>
                                                    {title}
                                                </TableHeaderCell>
                                                <TableHeaderCell>
                                                    Budget
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
                                            {data.map((roommate) => (
                                                <TableRow key={roommate.id}>
                                                    <TableDataCell>
                                                        <img
                                                            className="object-cover w-8 h-8 rounded-full"
                                                            src={
                                                                roommate.images
                                                                    ? showImage() +
                                                                      roommate
                                                                          .images[0]
                                                                    : HousePlaceholder
                                                            }
                                                            alt=""
                                                        />
                                                    </TableDataCell>
                                                    <TableDataCell>
                                                        {roommate.id}
                                                    </TableDataCell>
                                                    <TableDataCell>
                                                        <Link
                                                            href={route(
                                                                "roommate.show",
                                                                roommate.id
                                                            )}
                                                            className="hover:underline hover:font-semibold"
                                                        >
                                                            {roommate.title}
                                                        </Link>
                                                    </TableDataCell>
                                                    <TableDataCell>
                                                        €{roommate.budget}
                                                    </TableDataCell>
                                                    <TableDataCell>
                                                        {moment(
                                                            roommate.created_at
                                                        ).format(
                                                            "MMM DD, YYYY"
                                                        )}
                                                    </TableDataCell>
                                                    <TableDataCell>
                                                        {roommate.live_at ===
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
                                                                        roommate.live_at
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
                                                                "roommate.edit",
                                                                roommate.id
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
