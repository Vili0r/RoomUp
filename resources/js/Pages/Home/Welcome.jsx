import React from "react";
import { Head } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";
import Articles from "@/sections/Articles";
import FeaturedFlats from "@/sections/FeaturedFlats";
import Hero from "@/sections/Hero";
import HowItWorks from "@/sections/HowItWorks";
import Services from "@/sections/Services";
import Subscribe from "@/sections/Subscribe";

export default function Welcome(props) {
    return (
        <GuestLayout user={props.auth.user}>
            <Head title="Welcome" />
            <div className="overflow-hidden">
                <Hero />
                <Services />
                <HowItWorks />
                <FeaturedFlats />
                <Articles />
                <Subscribe />
            </div>
        </GuestLayout>
    );
}
