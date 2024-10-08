import React from "react";
import { Link } from "@inertiajs/react";
import moment from "moment";
import { useTranslation } from "react-i18next";

const BlogWidget = ({ recentBlogs, slug }) => {
    const showImage = () => {
        return "/storage/";
    };

    const { t } = useTranslation();
    const { relatedPosts, recentPosts } = t("blog");

    return (
        <div className="p-8 mb-8 bg-white rounded-lg shadow-lg">
            <h3 className="pb-4 mb-8 text-xl font-semibold border-b">
                {slug ? relatedPosts : recentPosts}
            </h3>
            {recentBlogs.map((blog) => (
                <div key={blog.id} className="flex items-center w-full mb-4">
                    <div className="flex-none w-16">
                        <img
                            height="60px"
                            width="60px"
                            className="align-middle rounded-full"
                            src={showImage() + blog.image}
                        />
                    </div>
                    <div className="flex-grow ml-4">
                        <p className="text-gray-500 font-xs">
                            {moment(blog.published_at).format("MMM DD, YYYY")}
                        </p>
                        <Link
                            href={route("single.blog.show", blog.slug)}
                            key={blog.id}
                            className="text-md"
                        >
                            {blog.title}
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default BlogWidget;
