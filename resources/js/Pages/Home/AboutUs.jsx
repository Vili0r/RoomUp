import React from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head } from "@inertiajs/react";

const AboutUs = (props) => {
    return (
        <GuestLayout user={props.auth.user}>
            <Head title="About Us" />
            <div>About Us</div>
        </GuestLayout>
    );
};

export default AboutUs;
