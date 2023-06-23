import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage, Link, router } from "@inertiajs/react";

const Index = (props) => {
    const { shareds, flats } = usePage().props;
    console.log(shareds, flats);
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
            <div>index</div>
        </AuthenticatedLayout>
    );
};

export default Index;
