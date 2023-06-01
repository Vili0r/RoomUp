import React from "react";
import { BsCheck } from "react-icons/bs";

const facilities = [
    { id: 1, title: "Furnished" },
    { id: 2, title: "Pet Allowed" },
    { id: 3, title: "Parking slot" },
    { id: 4, title: "Smoking friendly" },
    { id: 5, title: "Student friendly" },
];

const Amenities = () => {
    return (
        <div className="mt-[2rem] lg:px-2 xl:px-0">
            <p className="text-sm font-popp font-semibold">Amenities</p>
            <div className="mt-[1rem] place-items-center">
                {facilities.map((facility, index) => (
                    <div
                        key={facility.id}
                        className="flex justify-between mb-2"
                    >
                        <span className="text-sm font-popp mt-1">
                            {facility.title}
                        </span>
                        <label className="cursor-pointer relative">
                            <input
                                id="checkbox-1"
                                type="checkbox"
                                className="appearance-none h-6 w-6 border-2 rounded-[7px] border-[#f3f2f2]"
                            />
                            <BsCheck className="text-8xl h-8 w-8 text-white absolute -left-1 -top-1 text-opacity-0 ease-out transition check-1 after:bg-black" />
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Amenities;
