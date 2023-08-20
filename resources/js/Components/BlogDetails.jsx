import React from "react";
import moment from "moment";
import { BlogViewer } from ".";

const BlogDetails = ({ blog }) => {
    const showImage = () => {
        return "/storage/";
    };
    return (
        <div className="pb-12 mb-8 bg-white rounded-lg shadow-lg lg:p-8">
            <div className="relative mb-6 overflow-hidden shadow-md">
                <img
                    src={showImage() + blog.image}
                    alt={blog.title}
                    className="object-top w-full h-full rounded-t-lg"
                />
            </div>
            <div className="px-4 lg:px-0">
                <div className="flex items-center w-full mb-8">
                    <div className="flex items-center justify-center w-full mb-4 mr-8 lg:mb-0 lg:w-auto">
                        <img
                            src={
                                blog.author.avatar ===
                                "https://www.gravatar.com/avatar/000000000000000000000000000000?d=mp"
                                    ? "https://www.gravatar.com/avatar/000000000000000000000000000000?d=mp"
                                    : blog.author.avatar
                            }
                            alt=""
                            className="align-middle rounded-full"
                        />
                        <p className="inline ml-2 text-lg font-medium text-gray-700 capitalize align-middle">
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
                <h1 className="mb-8 text-3xl font-semibold">{blog.title}</h1>
                <BlogViewer blogHtml={blog.body} />
            </div>
        </div>
    );
};

export default BlogDetails;
