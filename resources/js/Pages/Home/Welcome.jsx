import React from "react";
import { Head } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";
import FeaturedFlats from "@/sections/FeaturedFlats";
import Hero from "@/sections/Hero";
import HowItWorks from "@/sections/HowItWorks";
import Services from "@/sections/Services";

export default function Welcome(props) {
    return (
        <GuestLayout user={props.auth.user}>
            <Head title="Welcome" />
            <div className="overflow-hidden">
                <Hero />
                <Services />
                <HowItWorks />
                <FeaturedFlats />
            </div>
        </GuestLayout>
    );
}
