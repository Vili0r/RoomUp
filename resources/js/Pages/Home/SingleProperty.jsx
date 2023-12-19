import React from "react";
import { Head, usePage } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";
import PropertyDetails from "@/Components/PropertyDetails";

const SingleProperty = (props) => {
    const { property } = usePage().props;

    return (
        <GuestLayout user={props.auth.user}>
            <Head title="Search Results" />
            <PropertyDetails property={property} />
        </GuestLayout>
    );
};

export default SingleProperty;
