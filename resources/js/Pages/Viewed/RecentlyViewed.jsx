import React, { useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import { FavouritePropertyCard } from "@/Components";

const RecentlyViewed = (props) => {
    const { properties, indexLimit } = usePage().props;

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
            <Head title="My Favourites" />
            <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-4 px-10">
                <p className="mt-10">
                    Showing your last {indexLimit} viewed properties
                </p>
                <div className="grid grid-cols-1 mt-[3rem] mb-[3rem] sm:grid-cols-2 lg:grid-cols-3 xxl:grid-cols-4 gap-8">
                    {properties.length > 0 ? (
                        properties.map((property, index) => (
                            <FavouritePropertyCard
                                property={property}
                                index={index}
                            />
                        ))
                    ) : (
                        <div>No property has been added to favourites</div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default RecentlyViewed;
