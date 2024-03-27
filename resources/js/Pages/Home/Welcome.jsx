import React, { useRef } from "react";
import { Head } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";
import FeaturedFlats from "@/sections/FeaturedFlats";
import Hero from "@/sections/Hero";
import HowItWorks from "@/sections/HowItWorks";
import Services from "@/sections/Services";

export default function Welcome(props) {
    const servicesRef = useRef(null); // Create a ref for the Services component

    const scrollToServices = () =>
        servicesRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    return (
        <GuestLayout user={props.auth.user} scrollToServices={scrollToServices}>
            <Head title="Welcome" />
            <div className="overflow-hidden">
                <Hero />
                <HowItWorks />
                <div ref={servicesRef}>
                    <Services />
                </div>
                <FeaturedFlats />
            </div>
        </GuestLayout>
    );
}
