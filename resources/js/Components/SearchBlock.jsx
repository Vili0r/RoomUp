import React from "react";
import { AiOutlineSearch } from "react-icons/ai";

const SearchBlock = () => {
    return (
        <div className="col-span-12 p-6 border rounded-lg border-neutral-700 bg-neutral-800 md:col-span-9">
            <div className="flex items-center gap-2">
                <input
                    type="email"
                    placeholder="Enter location to search"
                    className="w-full rounded border border-neutral-700 bg-neutral-800 px-3 py-1.5 transition-colors focus:border-red-300 focus:outline-0"
                />
                <button
                    type="submit"
                    className="flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors rounded whitespace-nowrap bg-neutral-50 text-neutral-900 hover:bg-neutral-300"
                >
                    <AiOutlineSearch /> Search your ideal property
                </button>
            </div>
        </div>
    );
};

export default SearchBlock;
