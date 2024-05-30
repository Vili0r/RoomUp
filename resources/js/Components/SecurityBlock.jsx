import React from "react";
import { IoShieldCheckmarkOutline } from "react-icons/io5";

const SecurityBlock = () => {
    return (
        <div className="flex flex-col items-center col-span-12 gap-4 p-4 border rounded-lg md:col-span-3 border-neutral-700 bg-neutral-800">
            <IoShieldCheckmarkOutline className="text-3xl" />
            <p className="text-lg text-center text-neutral-400">
                Security is our priority
            </p>
        </div>
    );
};

export default SecurityBlock;
