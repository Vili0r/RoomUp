import React from "react";
import {
    MdOutlineBedroomParent,
    MdOutlineBedroomChild,
    MdBalcony,
    MdPets,
    MdOutlineMicrowave,
} from "react-icons/md";
import { FaCouch } from "react-icons/fa";
import { AiFillCar } from "react-icons/ai";
import { TbBath, TbTemperaturePlus, TbToolsKitchen2 } from "react-icons/tb";
import { CgSmartHomeRefrigerator } from "react-icons/cg";
import { GiWashingMachine, GiFruitTree } from "react-icons/gi";
import { BsSnow, BsWifi } from "react-icons/bs";
import { BiDish } from "react-icons/bi";

const allAmenities = [
    { id: 1, name: "Double bedrooms", icon: <MdOutlineBedroomParent /> },
    { id: 2, name: "Single bedrooms", icon: <MdOutlineBedroomChild /> },
    { id: 3, name: "Furnished", icon: <FaCouch /> },
    { id: 4, name: "Parking", icon: <AiFillCar /> },
    { id: 6, name: "Central heating", icon: <TbTemperaturePlus /> },
    { id: 7, name: "Kithcen", icon: <TbToolsKitchen2 /> },
    { id: 8, name: "Garden", icon: <GiFruitTree /> },
    { id: 9, name: "Balcony", icon: <MdBalcony /> },
    { id: 10, name: "Pets allowed", icon: <MdPets /> },
    { id: 11, name: "Air conditioning", icon: <BsSnow /> },
    { id: 12, name: "Broadband", icon: <BsWifi /> },
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
