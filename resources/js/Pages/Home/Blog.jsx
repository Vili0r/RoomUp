import React from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, usePage } from "@inertiajs/react";
import { BlogCard, BlogWidget, Categories } from "@/Components";

const Blog = (props) => {
    const { blogs, recentBlogs, categories } = usePage().props;

    return (
        <GuestLayout user={props.auth.user}>
            <Head title="Blog" />
            <div className="max-w-7xl px-10 mt-[6rem] mb-8">
                <Head>
                    <title>Blog | Home</title>
                </Head>

                {/* <FeaturedArticles /> */}
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
                    <div className="col-span-1 lg:col-span-8">
                        {blogs.data.map((blog) => (
                            <BlogCard blog={blog} key={blog.id} />
                        ))}
                    </div>
                    <div className="col-span-1 lg:col-span-4">
                        <div className="relative lg:sticky top-[4rem]">
                            <BlogWidget recentBlogs={recentBlogs} />
                            <Categories categories={categories} />
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
};

export default Blog;
