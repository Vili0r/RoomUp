import React from "react";

const LoadingSkeleton = () => {
    return (
        <div className="w-full max-w-md p-4 mx-auto rounded animate-pulse md:p-6 dark:border-gray-700">
            <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded dark:bg-gray-700"></div>
            <h1 className="w-40 h-2 bg-gray-200 rounded-lg dark:bg-gray-700"></h1>

            <p className="w-48 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>

            <div className="flex mt-4 item-center gap-x-2">
                <p className="w-5 h-2 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
                <p className="w-5 h-2 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
                <p className="w-5 h-2 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
                <p className="w-5 h-2 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
                <p className="w-5 h-2 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
            </div>

            <div className="flex justify-between mt-6 item-center">
                <h1 className="w-10 h-2 bg-gray-200 rounded-lg dark:bg-gray-700"></h1>

                <div className="h-4 bg-gray-200 rounded-lg w-28 dark:bg-gray-700"></div>
            </div>
        </div>
    );
};

export default LoadingSkeleton;
