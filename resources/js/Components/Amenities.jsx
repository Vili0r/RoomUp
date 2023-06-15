import React from "react";
import { BsCheck } from "react-icons/bs";

const Amenities = ({ amenities }) => {
    return (
        <div className="mt-[2rem] lg:px-2 xl:px-0">
            <p className="text-sm font-semibold font-popp">Amenities</p>
            <div className="mt-[1rem] place-items-center">
                {amenities?.map((facility, index) => (
                    <div
                        key={facility.id}
                        className="flex justify-between mb-2"
                    >
                        <span className="mt-1 text-sm font-popp">
                            {facility.title}
                        </span>
                        <label className="relative cursor-pointer">
                            <input
                                id="checkbox-1"
                                type="checkbox"
                                className="appearance-none h-6 w-6 border-2 rounded-[7px] border-[#f3f2f2]"
                            />
                            <BsCheck className="absolute w-8 h-8 text-white text-opacity-0 transition ease-out text-8xl -left-1 -top-1 check-1 after:bg-black" />
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Amenities;
