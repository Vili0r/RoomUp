import React from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head } from "@inertiajs/react";

const Blog = (props) => {
    return (
        <GuestLayout user={props.auth.user}>
            <Head title="Blog" />
            <div>Blog</div>
        </GuestLayout>
    );
};

export default Blog;
