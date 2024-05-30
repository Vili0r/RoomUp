import { Link } from "@inertiajs/react";
import React from "react";
import { FiArrowRight } from "react-icons/fi";

const HeaderBlock = () => {
    return (
        <div className="col-span-12 row-span-2 p-6 border rounded-lg border-neutral-700 bg-neutral-800 md:col-span-6">
            <h1 className="mb-12 text-4xl font-medium leading-tight">
                RoomUp.{" "}
                <span className="text-neutral-400">
                    Find Your Space, Securely and Effortlessly.
                </span>
            </h1>
            <Link
                href={route("flat.create")}
                className="flex items-center gap-1 text-red-300 hover:underline"
            >
                Add a listing <FiArrowRight />
            </Link>
        </div>
    );
};

export default HeaderBlock;
