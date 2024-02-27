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
import { useTranslation } from "react-i18next";

const allAmenities = [
    { id: 1, nameEn: "Parking", nameGr: "Στάθμευση", icon: <AiFillCar /> },
    { id: 2, nameEn: "Garden", nameGr: "Κήπος", icon: <GiFruitTree /> },
    { id: 3, nameEn: "Garage", nameGr: "Γκαράζ", icon: <GiHomeGarage /> },
    { id: 4, nameEn: "Balcony", nameGr: "Μπαλκόνι", icon: <MdBalcony /> },
    {
        id: 5,
        nameEn: "Disable access",
        nameGr: "Απρόσβατος",
        icon: <TbDisabled />,
    },
    { id: 6, nameEn: "Living room", nameGr: "Καθιστικό", icon: <FaCouch /> },
    {
        id: 7,
        nameEn: "Broadband",
        nameGr: "Διαδίκτυο",
        icon: <BsWifi />,
    },
    {
        id: 8,
        nameEn: "Air conditioning",
        nameGr: "Κλιματισμός",
        icon: <BsSnow />,
    },
    {
        id: 9,
        nameEn: "Central heating",
        nameGr: "Κεντρική Θέρμανση",
        icon: <HiOutlineSun />,
    },
    {
        id: 10,
        nameEn: "Dishwasher",
        nameGr: "Πλυντήριο Πιάτων",
        icon: <BiDish />,
    },
    {
        id: 11,
        nameEn: "Microwave",
        nameGr: "Φούρνος μικροκυμάτων",
        icon: <MdOutlineMicrowave />,
    },
    { id: 12, nameEn: "Oven", nameGr: "Φούρνος", icon: <TbToolsKitchen2 /> },
    {
        id: 13,
        nameEn: "Washing machine",
        nameGr: "Πλυντήριο Ρούχων",
        icon: <GiWashingMachine />,
    },
    {
        id: 14,
        nameEn: "Refrigirator",
        nameGr: "Ψυγείο",
        icon: <CgSmartHomeRefrigerator />,
    },
    {
        id: 15,
        nameEn: "Storage",
        nameGr: "Αποθήκευση",
        icon: <MdMeetingRoom />,
    },
];

const PropertyDetailsAmenities = ({ amenities }) => {
    const { t, i18n } = useTranslation();
    const { amenitiesDetails } = t("propertyDetails.details");
    const matchedAmenities = allAmenities.map((element1) => {
        return amenities.some((element2) => element2.name === element1.nameEn);
    });

    return (
        <>
            <h1 className="text-xl font-bold text-gray-700">
                {amenitiesDetails}
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
                            <span className="font-medium text-md">
                                {i18n.language == "en"
                                    ? amenity.nameEn
                                    : amenity.nameGr}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default PropertyDetailsAmenities;
