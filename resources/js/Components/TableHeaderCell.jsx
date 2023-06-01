import React from "react";

const TableHeaderCell = ({ children }) => {
    return (
        <th
            scope="col"
            className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
        >
            {children}
        </th>
    );
};

export default TableHeaderCell;
