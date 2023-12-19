import React from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, usePage } from "@inertiajs/react";
import BlogCard from "@/Components/BlogCard";
import BlogWidget from "@/Components/BlogWidget";
import Categories from "@/Components/Categories";
import FeaturedBlogs from "@/Components/FeaturedBlogs";

const Blog = (props) => {
    const { blogs, recentBlogs, featuredBlogs, categories } = usePage().props;

    return (
        <GuestLayout user={props.auth.user}>
            <Head title="Blog" />
            <div className="px-10 mx-auto mb-8 max-w-7xl mt-[6rem]">
                <Head>
                    <title>Blog | Home</title>
                </Head>

                <FeaturedBlogs featuredBlogs={featuredBlogs} />
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
