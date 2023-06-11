import React, { useState } from "react";
import { MdOutlineApartment, MdOutlineBedroomParent } from "react-icons/md";
import { BsHouseFill } from "react-icons/bs";
import { ImOffice } from "react-icons/im";
import MultiRangeSlider from "./MultiRangeSlider";
import Amenities from "./Amenities";
import { router } from "@inertiajs/react";

const places = [
    { id: 1, title: "Apartment", image: MdOutlineApartment },
    { id: 2, title: "Full House", image: BsHouseFill },
    { id: 3, title: "Office", image: ImOffice },
    { id: 4, title: "Room", image: MdOutlineBedroomParent },
];

const bedrooms = [
    { id: 1, title: "Studio" },
    { id: 2, title: "1" },
    { id: 3, title: "2" },
    { id: 4, title: "3" },
    { id: 5, title: "4" },
    { id: 6, title: "5+" },
];

const Filters = () => {
    const [toggleActiveButton, setToggleActiveButton] = useState(1);
    const [toggleActivePlace, setToggleActivePlace] = useState(1);
    const [toggleActiveBedrooms, setToggleActiveBedrooms] = useState(1);

    const activeButton = (index) => {
        setToggleActiveButton(index);
    };

    const activePlace = (index) => {
        setToggleActivePlace(index);
    };

    const activeBedroom = (index) => {
        setToggleActiveBedrooms(index);
    };

    return (
        <div className="pl-[20px] [@media(max-width:480px)]:pl-0">
            <div className="border border-[#f3f3f3] rounded-2xl flex justify-between gap-1 [@media(max-width:440px)]:flex-col">
                <button
                    onClick={() => activeButton(1)}
                    className={
                        toggleActiveButton == "1"
                            ? "text-white font-popp font-semibold lg:font-medium text-sm lg:text-xs bg-black px-[3rem] rounded-xl [@media(max-width:440px)]:py-3"
                            : "text-black hover:text-white font-popp font-semibold lg:font-medium text-sm lg:text-xs px-[3rem] bg-white hover:bg-black rounded-xl py-2"
                    }
                >
                    Rent
                </button>
                <button
                    onClick={() => activeButton(2)}
                    className={
                        toggleActiveButton == "2"
                            ? "text-white font-popp font-semibold lg:font-medium text-sm lg:text-xs bg-black px-[3rem] rounded-xl [@media(max-width:440px)]:py-3"
                            : "text-black hover:text-white font-popp font-semibold lg:text-xs lg:font-medium text-sm px-[3rem] bg-white hover:bg-black rounded-xl py-2"
                    }
                >
                    Flatmate
                </button>
            </div>
            <div className="mt-[2rem]">
                <p className="text-sm font-semibold font-popp lg:pl-2 xl:pl-0">
                    Type of places
                </p>
                <div className="grid grid-cols-2 gap-3 [@media(max-width:350px)]:gap-x-7 lg:space-y-2 xl:gap-3 mt-[1rem] place-items-center">
                    {places.map((places, index) => (
                        <div
                            onClick={() => activePlace(index)}
                            key={places.id}
                            className={`${
                                toggleActivePlace == index
                                    ? "border-black"
                                    : "border-[#f3f3f3] [@media(max-width:340px)]:border-0"
                            } h-[100px] w-[150px] [@media(max-width:340px)]:h-[80px] [@media(max-width:460px)]:w-[100px] lg:w-[130px] border rounded-xl flex flex-col items-center gap-3`}
                        >
                            <places.image className="mt-6 font-popp w-7 h-7" />
                            <span className="font-popp text-[16px] mb-2 [@media(max-width:340px)]:hidden">
                                {places.title}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
            <div className="mt-[2rem]">
                <p className="text-sm font-semibold font-popp lg:pl-2 xl:pl-0">
                    Price Range
                </p>

                <MultiRangeSlider
                    min={0}
                    max={10}
                    onChange={({ min, max }) =>
                        console.log(`min = ${min}, max = ${max}`)
                    }
                />
            </div>
            <div className="mt-[2rem]">
                <p className="text-sm font-semibold font-popp lg:pl-2 xl:pl-0">
                    Bedroom
                </p>
                <div className="flex justify-center gap-2 place-items-center mt-3 [@media(max-width:400px)]:grid [@media(max-width:400px)]:grid-cols-3">
                    {bedrooms.map((bedroom, index) => (
                        <div
                            onClick={() => {
                                activeBedroom(index);
                                sizeFilter();
                            }}
                            key={bedroom.id}
                            className={`${
                                toggleActiveBedrooms == index
                                    ? "bg-black text-white"
                                    : "bg-white text-black"
                            } p-1 py-2 px-3 lg:px-[9px] border border-[#f3f3f3] rounded-lg hover:bg-black hover:text-white`}
                        >
                            <span className="font-popp text-md">
                                {bedroom.title}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
            <Amenities />
        </div>
    );
};

export default Filters;
