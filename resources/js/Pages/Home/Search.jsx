import React, { useState, useEffect } from "react";
import { Head, usePage } from "@inertiajs/react";
import { Loading, PropertyCard } from "@/Components";
import GuestLayout from "@/Layouts/GuestLayout";

const Search = (props) => {
    const { results, selectedQueries, loading } = usePage().props;
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        setIsLoading(loading);
    }, [results]);
    console.log(results);

    return (
        <GuestLayout user={props.auth.user} selectedQueries={selectedQueries}>
            <Head title="Search Results" />
            <div className="">
                {!isLoading ? <PropertyCard results={results} /> : <Loading />}
            </div>
        </GuestLayout>
    );
};

export default Search;
