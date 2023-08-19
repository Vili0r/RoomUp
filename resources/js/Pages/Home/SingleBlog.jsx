import React from "react";
import { Head, usePage } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";
import { Author, BlogDetails, BlogWidget, Categories } from "@/Components";

const SingleBlog = (props) => {
    const { blog, categories, relatedBlogs } = usePage().props;

    return (
        <GuestLayout user={props.auth.user}>
            <Head title={blog.title} />
            <div className="px-10 mx-auto mb-8 max-w-7xl mt-[6rem]">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
                    <div className="col-span-1 lg:col-span-8">
                        <BlogDetails blog={blog} />
                        <Author author={blog.author} />
                        {/*<CommentsForm id={article.id} />
                    <Comments id={article.id} /> */}
                    </div>
                    <div className="col-span-1 lg:col-span-4">
                        <div className="relative lg:sticky top-[4rem]">
                            <BlogWidget
                                slug={blog.slug}
                                recentBlogs={relatedBlogs}
                            />
                            <Categories categories={categories} />
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
};

export default SingleBlog;
