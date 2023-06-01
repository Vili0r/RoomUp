import React from "react";
import { CiLocationOn } from "react-icons/ci";

const Address = () => {
    return (
        <a
            className="flex gap-1 font-semibold underline"
            target="_blank"
            href={"https://maps.google.com/"}
        >
            <CiLocationOn className="w-6 h-6" />

            <h2 className="xs:text-lg text-base font-popp font-semibold text-gray-700">
                Cholargos,
            </h2>

            <h2 className="xs:text-lg text-base font-popp font-semibold text-gray-700">
                Athens,
            </h2>

            <h2 className="xs:text-lg text-base font-popp font-semibold text-gray-700">
                Greece
            </h2>
        </a>
    );
};

export default Address;
