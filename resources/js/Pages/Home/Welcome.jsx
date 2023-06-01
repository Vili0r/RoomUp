import React from "react";
import { Head } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";
import {
    Articles,
    FeaturedFlats,
    Hero,
    HowItWorks,
    Services,
    Subscribe,
} from "@/sections";

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
