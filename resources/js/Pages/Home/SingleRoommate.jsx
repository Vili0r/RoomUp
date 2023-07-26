import React from "react";
import { Head, usePage } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";
import { RoommateDetails } from "@/Components";

const SingleRoommate = (props) => {
    const { roommate } = usePage().props;

    return (
        <GuestLayout user={props.auth.user}>
            <Head title="Search Results" />
            <RoommateDetails roommate={roommate} />
        </GuestLayout>
    );
};

export default SingleRoommate;
