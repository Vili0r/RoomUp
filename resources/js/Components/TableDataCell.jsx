import React from "react";

const TableDataCell = ({ children }) => {
    return (
        <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
            {children}
        </td>
    );
};

export default TableDataCell;
