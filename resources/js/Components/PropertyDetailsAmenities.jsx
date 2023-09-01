import React from "react";
import { MdBalcony, MdOutlineMicrowave, MdMeetingRoom } from "react-icons/md";
import { FaCouch } from "react-icons/fa";
import { AiFillCar } from "react-icons/ai";
import { TbToolsKitchen2, TbDisabled } from "react-icons/tb";
import { CgSmartHomeRefrigerator } from "react-icons/cg";
import { GiWashingMachine, GiFruitTree, GiHomeGarage } from "react-icons/gi";
import { BsSnow, BsWifi } from "react-icons/bs";
import { BiDish } from "react-icons/bi";
import { HiOutlineSun } from "react-icons/hi";

const allAmenities = [
    { id: 1, name: "Parking", icon: <AiFillCar /> },
    { id: 2, name: "Garden", icon: <GiFruitTree /> },
    { id: 3, name: "Garage", icon: <GiHomeGarage /> },
    { id: 4, name: "Balcony", icon: <MdBalcony /> },
    { id: 5, name: "Disable access", icon: <TbDisabled /> },
    { id: 6, name: "Living room", icon: <FaCouch /> },
    { id: 7, name: "Broadband", icon: <BsWifi /> },
    { id: 8, name: "Air conditioning", icon: <BsSnow /> },
    { id: 9, name: "Central heating", icon: <HiOutlineSun /> },
    { id: 10, name: "Dishwasher", icon: <BiDish /> },
    { id: 11, name: "Microwave", icon: <MdOutlineMicrowave /> },
    { id: 12, name: "Oven", icon: <TbToolsKitchen2 /> },
    { id: 13, name: "Washing machine", icon: <GiWashingMachine /> },
    { id: 14, name: "Refrigirator", icon: <CgSmartHomeRefrigerator /> },
    { id: 15, name: "Storage", icon: <MdMeetingRoom /> },
];

const PropertyDetailsAmenities = ({ amenities }) => {
    const matchedAmenities = allAmenities.map((element1) => {
        return amenities.some((element2) => element2.name === element1.name);
    });

    return (
        <>
            <h1 className="text-xl font-bold text-gray-700 font-popp">
                Amenities
            </h1>
            <div className="mt-7">
                <div className="grid md:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2">
                    {allAmenities.map((amenity, index) => (
                        <div
                            key={amenity.id}
                            className={`${
                                matchedAmenities[index]
                                    ? "font-bold"
                                    : "line-through"
                            } flex justify-start`}
                        >
                            <span className="w-6 h-6 mt-1">{amenity.icon}</span>
                            <span className="font-medium text-md font-popp">
                                {amenity.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default PropertyDetailsAmenities;
