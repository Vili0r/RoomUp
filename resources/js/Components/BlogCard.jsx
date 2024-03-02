import React from "react";
import { Link } from "@inertiajs/react";
import moment from "moment";
import { useTranslation } from "react-i18next";

const BlogCard = ({ blog }) => {
    const showImage = () => {
        return "/storage/";
    };

    const { t } = useTranslation();
    const { readMore } = t("blog");
    return (
        <div className="p-0 pb-12 mb-8 bg-white rounded-lg shadow-lg lg:p-8">
            <div className="relative mb-6 overflow-hidden shadow-md pb-80">
                <img
                    src={showImage() + blog.image}
                    alt={blog.title}
                    className="absolute object-cover object-top w-full rounded-t-lg h-80 lg:rounded-lg"
                />
            </div>
            <h1 className="mb-4 text-3xl font-semibold text-center transition duration-700 cursor-pointer hover:text-[#F1C40F]">
                <Link href={route("single.blog.show", blog.slug)}>
                    {blog.title}
                </Link>
            </h1>
            <div className="items-center justify-center block w-full mb-4 text-center lg:flex">
                <div className="flex items-center justify-center w-full mb-4 mr-8 lg:mb-0 lg:w-auto">
                    <img
                        src={blog.author.avatar}
                        alt=""
                        className="align-middle rounded-full"
                    />
                    <p className="inline ml-2 text-lg font-medium text-gray-700 align-middle">
                        {blog.author.first_name}
                    </p>
                </div>
                <div className="font-medium text-gray-700">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="inline w-6 h-6 mr-2 text-[#F1C40F]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                    </svg>
                    <span className="align-middle">
                        {moment(blog.published_at).format("MMM DD, YYYY")}
                    </span>
                </div>
            </div>
            <p className="px-4 mb-6 text-lg font-normal text-center text-gray-700 lg:px-20">
                {blog.excerpt}
            </p>
            <div className="text-center">
                <Link href={route("single.blog.show", blog.slug)}>
                    <span className="inline-block px-8 py-3 text-lg font-semibold text-white transition duration-500 transform bg-[#F1C40F] rounded-full cursor-pointer hover:-translate-y-1">
                        {readMore}
                    </span>
                </Link>
            </div>
        </div>
    );
};

export default BlogCard;
