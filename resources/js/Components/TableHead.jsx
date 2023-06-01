import React from "react";

const Table = ({ children }) => {
    return <thead className="bg-gray-50 dark:bg-gray-800">{children}</thead>;
};

export default Table;
