import React from "react";
import {
    MdOutlineBedroomParent,
    MdOutlineBedroomChild,
    MdBalcony,
    MdPets,
    MdOutlineMicrowave,
} from "react-icons/md";
import { FaSwimmingPool } from "react-icons/fa";
import { AiFillCar } from "react-icons/ai";
import { TbBath, TbTemperaturePlus, TbToolsKitchen2 } from "react-icons/tb";
import { CgSmartHomeRefrigerator } from "react-icons/cg";
import { GiWashingMachine, GiFruitTree } from "react-icons/gi";
import { BsSnow } from "react-icons/bs";
import { BiDish } from "react-icons/bi";

const amenities = [
    { id: 1, title: "Double bedrooms", icon: <MdOutlineBedroomParent /> },
    { id: 2, title: "Single bedrooms", icon: <MdOutlineBedroomChild /> },
    { id: 3, title: "Swimming pool", icon: <FaSwimmingPool /> },
    { id: 4, title: "Car park", icon: <AiFillCar /> },
    { id: 5, title: "Bathrooms", icon: <TbBath /> },
    { id: 6, title: "Central heating", icon: <TbTemperaturePlus /> },
    { id: 7, title: "Kithcen", icon: <TbToolsKitchen2 /> },
    { id: 8, title: "Garden", icon: <GiFruitTree /> },
    { id: 9, title: "Balcony", icon: <MdBalcony /> },
    { id: 10, title: "Pets allowed", icon: <MdPets /> },
    { id: 11, title: "Refrigirator", icon: <CgSmartHomeRefrigerator /> },
    { id: 12, title: "Oven", icon: <MdOutlineMicrowave /> },
    { id: 14, title: "Washing machine", icon: <GiWashingMachine /> },
    { id: 14, title: "Dish washer", icon: <BiDish /> },
    { id: 15, title: "Air conditioning", icon: <BsSnow /> },
];

const PropertyDetailsAmenities = () => {
    return (
        <>
            <h1 className="text-xl font-popp font-bold text-gray-700">
                Amenities
            </h1>
            <div className="mt-7">
                <div className="grid md:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2">
                    {amenities.map((amenity, index) => (
                        <div key={amenity.id} className="flex justify-start">
                            <span className="w-6 h-6 mt-1">{amenity.icon}</span>
                            <span className="text-md font-popp font-medium">
                                {amenity.title}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default PropertyDetailsAmenities;
