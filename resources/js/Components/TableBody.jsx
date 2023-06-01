import React from "react";

const TableBody = ({ children }) => {
    return (
        <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
            {children}
        </tbody>
    );
};

export default TableBody;
