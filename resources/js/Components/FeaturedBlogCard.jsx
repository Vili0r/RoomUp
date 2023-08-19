import React from "react";
import moment from "moment";
import { Link } from "@inertiajs/react";

const FeaturedBlogCard = ({ blog }) => {
    const showImage = () => {
        return "/storage/";
    };
    return (
        <div className="relative h-72">
            <div
                className="absolute inline-block w-full bg-center bg-no-repeat bg-cover rounded-lg shadow-md h-72"
                style={{
                    backgroundImage: `url('${`${showImage() + blog.image}`}')`,
                }}
            />
            <div className="absolute w-full bg-center rounded-lg opacity-50 bg-gradient-to-b from-gray-400 via-gray-700 to-black h-72" />
            <div className="absolute flex flex-col items-center justify-center w-full h-full p-4 rounded-lg">
                <p className="mb-4 text-xs font-semibold text-white text-shadow">
                    {moment(blog.published_at).format("MMM DD, YYYY")}
                </p>
                <p className="mb-4 text-2xl font-semibold text-center text-white text-shadow">
                    {blog.title}
                </p>
                <div className="absolute flex items-center justify-center w-full bottom-5">
                    <p className="inline ml-2 font-medium text-white align-middle text-shadow">
                        {blog.author.first_name}
                    </p>
                </div>
            </div>
            <Link href={route("single.blog.show", blog.slug)}>
                <span className="absolute w-full h-full cursor-pointer" />
            </Link>
        </div>
    );
};

export default FeaturedBlogCard;
