import React from "react";
import { Head, usePage } from "@inertiajs/react";
import { PropertyCard } from "@/Components";
import GuestLayout from "@/Layouts/GuestLayout";

const Search = (props) => {
    const { results, selectedQueries } = usePage().props;

    return (
        <GuestLayout user={props.auth.user} selectedQueries={selectedQueries}>
            <Head title="Search Results" />
            <div className="">
                <PropertyCard results={results} />
            </div>
        </GuestLayout>
    );
};

export default Search;
