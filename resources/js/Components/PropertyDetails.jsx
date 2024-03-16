import React, { useState } from "react";
import PhotoGallery from "./PhotoGallery";
import PropertyDetailsAmenities from "./PropertyDetailsAmenities";
import AdvertisedBy from "./AdvertisedBy";
import Drawer from "./Drawer";
import { CiLocationOn } from "react-icons/ci";
import { FiMinimize, FiMaximize, FiActivity } from "react-icons/fi";
import { BsCalendar4Week } from "react-icons/bs";
import { SiTransportforlondon } from "react-icons/si";
import { useForm } from "@inertiajs/react";
import {
    MdShortText,
    MdOutlineHourglassEmpty,
    MdOutlineAirplanemodeActive,
    MdOutlineReportProblem,
} from "react-icons/md";
import { FiMapPin } from "react-icons/fi";
import moment from "moment";
import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useTranslation } from "react-i18next";
import {
    furnishings,
    type,
    minimumStay,
    maximumStay,
    daysAvailable,
    minutes,
    stations,
    modes,
} from "@/arrays/Array";
import { IoIosArrowForward } from "react-icons/io";

const PropertyDetails = ({ property }) => {
    const { get } = useForm({
        id: property.id,
        type: property.model,
    });

    const [isOpen, setIsOpen] = useState(false);
    const { t, i18n } = useTranslation();
    const { inA, month } = t("propertyDetails.misc");
    const {
        overview,
        rooms,
        typeDetails,
        availableFrom,
        where,
        availability,
        transport,
        moreInformation,
        reportListing,
        neighborhood,
    } = t("propertyDetails.details");

    const handleClick = () => {
        get(route("reported-listings.create"));
    };

    const getFurnishingName = (id) => {
        const furnishing = furnishings.find((item) => item.id === id);
        return furnishing
            ? i18n.language === "en"
                ? furnishing.nameEn
                : furnishing.nameGr
            : "";
    };
    const getTypeName = (id) => {
        const typeName = type.find((item) => item.id === id);
        return typeName
            ? i18n.language === "en"
                ? typeName.nameEn
                : typeName.nameGr
            : "";
    };
    const getMinimumStayName = (id) => {
        const minimumName = minimumStay.find((item) => item.id === id);
        return minimumName
            ? i18n.language === "en"
                ? minimumName.nameEn
                : minimumName.nameGr
            : "";
    };
    const getMaximumStayName = (id) => {
        const maximumName = maximumStay.find((item) => item.id === id);
        return maximumName
            ? i18n.language === "en"
                ? maximumName.nameEn
                : maximumName.nameGr
            : "";
    };
    const getDaysAvailableName = (id) => {
        const daysAvailableName = daysAvailable.find((item) => item.id === id);
        return daysAvailableName
            ? i18n.language === "en"
                ? daysAvailableName.nameEn
                : daysAvailableName.nameGr
            : "";
    };
    const getMinutesName = (id) => {
        const minutesName = minutes.find((item) => item.id === id);
        return minutesName
            ? i18n.language === "en"
                ? minutesName.nameEn
                : minutesName.nameGr
            : "";
    };
    const getStattionsName = (id) => {
        const stationName = stations.find((item) => item.id === id);
        return stationName
            ? i18n.language === "en"
                ? stationName.nameEn
                : stationName.nameGr
            : "";
    };
    const getModeName = (id) => {
        const modeName = modes.find((item) => item.id === id);
        return modeName
            ? i18n.language === "en"
                ? modeName.nameEn
                : modeName.nameGr
            : "";
    };
    const getTermName = (name) => {
        if (i18n.language === "gr") {
            return name === "short term" ? "Βραχυπρόθεσμος" : "Μακροπρόθεσμος";
        } else {
            return name;
        }
    };

    const handleDrawer = () => {
        setIsOpen(true);
    };

    return (
        <div className="max-w-[2520px] xl:px-20 md:px-10 sm:px-2 px-4">
            <div className="max-w-screen-xl mx-auto">
                <div className="flex flex-col gap-6">
                    <div className="mt-[4rem] py-10 sm:px-16">
                        <h1 className="sm:text-2xl text-xl mb-3 [@media(max-width:350px)]:text-lg   font-bold text-gray-700">
                            {property.model === "room"
                                ? property.sub_title === null
                                    ? property.owner.title
                                    : `${property.sub_title} ${inA} ${property.owner.title}`
                                : property.title}
                        </h1>
                        <div className="flex justify-between gap-0 pt-0 mb-10 items-center [@media(max-width:800px)]:flex-col [@media(max-width:800px)]:items-start [@media(max-width:800px)]:gap-2 [@media(max-width:800px)]:pt-2">
                            <div className="flex justify-between gap-4 [@media(max-width:400px)]:flex-col">
                                <div className="flex">
                                    <p className="text-base font-semibold xs:text-xl ">
                                        €
                                        {property.owner
                                            ? property.room_cost
                                            : property.cost}
                                    </p>
                                    <span className="text-base font-semibold xs:text-xl ">
                                        /{month}
                                    </span>
                                </div>
                                <div className="flex [@media(max-width:400px)]:ml-[-6px]">
                                    <span className="flex gap-1 font-semibold underline">
                                        <CiLocationOn className="w-6 h-6" />

                                        <h2 className="text-base font-semibold text-gray-700 xs:text-lg ">
                                            {property.owner
                                                ? property.owner.address
                                                      ?.address_1
                                                : property.address?.address_1}
                                            ,
                                        </h2>

                                        <h2 className="text-base font-semibold text-gray-700 xs:text-lg ">
                                            {property.owner
                                                ? property.owner.address?.city
                                                : property.address?.city}
                                        </h2>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <PhotoGallery
                            images={
                                property.owner
                                    ? property.owner.images
                                    : property.images
                            }
                            title={property.title}
                            id={property.id}
                            model={property.model}
                            favourite={property.favouritedBy}
                        />
                    </div>
                    <div className="flex flex-col items-start max-w-6xl gap-10 px-6 mx-auto md:flex-row lg:px-8">
                        <div className="flex w-full min-w-0 mt-5 md:mt-0">
                            <dl className="grid grid-cols-1 gap-y-10 gap-x-8 md:max-w-xl lg:max-w-none lg:gap-y-16">
                                <div className="">
                                    <h1 className="text-xl font-bold text-gray-700 ">
                                        {overview}
                                    </h1>
                                    <p className="mt-5 text-base font-medium text-gray-700 sm:text-lg ">
                                        {property.description}
                                        <br />
                                        {property.owner &&
                                            property.owner.description}
                                    </p>
                                    <div className="sm:flex sm:flex-row grid grid-cols-2 items-center gap-4 font-[450px] mt-9 text-neutral-500">
                                        <div>
                                            {property.owner
                                                ? property.owner.size
                                                : property.size}{" "}
                                            {rooms}
                                        </div>
                                        <span className="hidden sm:block">
                                            |
                                        </span>
                                        <div>
                                            {typeDetails}:{" "}
                                            {getTypeName(
                                                property.owner
                                                    ? property.owner.type
                                                    : property.type
                                            )}
                                        </div>
                                        <span className="hidden sm:block">
                                            |
                                        </span>
                                        <div>
                                            {availableFrom}:{" "}
                                            {moment(
                                                property.owner
                                                    ? property.available_from
                                                    : property.availability
                                                          ?.available_from
                                            ).format("MMM DD, YYYY")}
                                        </div>
                                        <span className="hidden sm:block">
                                            |
                                        </span>
                                        <div>
                                            {getFurnishingName(
                                                property.owner
                                                    ? property.room_furnished
                                                    : property.furnished
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <hr className="w-[95%] mx-auto border-gray-300" />

                                <div className="mt-[1rem]">
                                    {property.owner ? (
                                        <PropertyDetailsAmenities
                                            amenities={property.owner.amenities}
                                        />
                                    ) : (
                                        <PropertyDetailsAmenities
                                            amenities={property.amenities}
                                        />
                                    )}
                                </div>

                                <hr className="w-[95%] mx-auto border-gray-300" />
                                <div className="mt-[1rem] mb-10">
                                    <h1 className="text-xl font-bold text-gray-700 ">
                                        {where}
                                    </h1>
                                    <div className="w-full xs:h-[500px] h-[350px] rounded-xl mt-7">
                                        <Map
                                            mapboxAccessToken={
                                                import.meta.env
                                                    .VITE_MAPBOX_ACCESS_TOKEN
                                            }
                                            mapStyle="mapbox://styles/tsouvili/clqgg9eeb00ii01o974j8ge9v"
                                            initialViewState={{
                                                longitude: property.owner
                                                    ? property.owner.address
                                                          .long
                                                    : property.address.long,
                                                latitude: property.owner
                                                    ? property.owner.address.lat
                                                    : property.address.lat,
                                                zoom: 11,
                                            }}
                                        >
                                            <Marker
                                                longitude={
                                                    property.owner
                                                        ? property.owner.address
                                                              .long
                                                        : property.address.long
                                                }
                                                latitude={
                                                    property.owner
                                                        ? property.owner.address
                                                              .lat
                                                        : property.address.lat
                                                }
                                                offsetLeft={-20}
                                                offsetTop={-10}
                                            >
                                                <p className="text-2xl text-white cursor-pointer animate-bounce">
                                                    <FiMapPin size={24} />
                                                </p>
                                            </Marker>
                                        </Map>
                                    </div>
                                </div>
                                <hr className="w-[95%] mx-auto border-gray-300" />
                                <div className="">
                                    <h1 className="text-xl font-bold text-gray-700 ">
                                        {availability}
                                    </h1>
                                    <div className="sm:flex sm:flex-row items-center gap-3 font-[450px] mt-9 text-neutral-500 grid grid-cols-2 text-base">
                                        <div className="flex items-start gap-2 capitalize ">
                                            <FiMinimize className="w-6 h-6" />
                                            {getMinimumStayName(
                                                property.owner
                                                    ? property.minimum_stay
                                                    : property.availability
                                                          ?.minimum_stay
                                            )}
                                        </div>
                                        <span className="hidden sm:block">
                                            |
                                        </span>
                                        <div className="flex items-start gap-2 capitalize">
                                            <FiMaximize className="w-6 h-6" />

                                            {getMaximumStayName(
                                                property.owner
                                                    ? property.maximum_stay
                                                    : property.availability
                                                          ?.maximum_stay
                                            )}
                                        </div>
                                        <span className="hidden sm:block">
                                            |
                                        </span>
                                        <div className="flex items-start gap-2 capitalize">
                                            <BsCalendar4Week className="w-6 h-6" />
                                            {getDaysAvailableName(
                                                property.owner
                                                    ? property.days_available
                                                    : property.availability
                                                          ?.days_available
                                            )}
                                        </div>
                                        <span className="hidden sm:block">
                                            |
                                        </span>
                                        <div className="flex items-start gap-2 capitalize">
                                            <MdShortText className="w-6 h-6" />
                                            {getTermName(
                                                property.owner
                                                    ? property.short_term
                                                    : property.availability
                                                          ?.short_term
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <hr className="w-[95%] mx-auto border-gray-300" />
                                <div className="">
                                    <h1 className="text-xl font-bold text-gray-700 ">
                                        {transport}
                                    </h1>
                                    <div className="sm:flex sm:flex-row grid grid-cols-2 items-center gap-4 font-[450px] mt-9 text-neutral-500">
                                        <div className="flex items-start gap-2 capitalize">
                                            <MdOutlineHourglassEmpty className="w-6 h-6" />{" "}
                                            {getMinutesName(
                                                property.owner
                                                    ? property.owner.transport
                                                          .minutes
                                                    : property.transport
                                                          ?.minutes
                                            )}
                                        </div>
                                        <span className="hidden sm:block">
                                            |
                                        </span>
                                        <div className="flex items-start gap-2 capitalize">
                                            <MdOutlineAirplanemodeActive className="w-6 h-6" />

                                            {getModeName(
                                                property.owner
                                                    ? property.owner.transport
                                                          .mode
                                                    : property.transport?.mode
                                            )}
                                        </div>
                                        <span className="hidden sm:block">
                                            |
                                        </span>
                                        <div className="flex items-start gap-2 capitalize">
                                            <SiTransportforlondon className="w-6 h-6" />

                                            {getStattionsName(
                                                property.owner
                                                    ? property.owner.transport
                                                          .station
                                                    : property.transport
                                                          ?.station
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <hr className="w-[95%] mx-auto border-gray-300" />
                                <div className="mb-5">
                                    <h1 className="text-xl font-bold text-gray-700 ">
                                        {moreInformation}
                                    </h1>
                                    <div className="grid xs:grid-cols-2 items-center justify-between gap-4 font-[450px] mt-9 text-neutral-500">
                                        <button
                                            onClick={handleClick}
                                            className="flex justify-between gap-6 px-5 py-3 capitalize border-2 border-gray-100 rounded-md"
                                        >
                                            <span className="flex items-center gap-3">
                                                <MdOutlineReportProblem className="w-6 h-6" />{" "}
                                                {reportListing}
                                            </span>
                                            <IoIosArrowForward className="w-6 h-6" />
                                        </button>
                                        <button
                                            onClick={handleDrawer}
                                            className="flex justify-between gap-6 px-5 py-3 capitalize border-2 border-gray-100 rounded-md"
                                        >
                                            <span className="flex items-center gap-3">
                                                <FiActivity className="w-6 h-6" />{" "}
                                                {neighborhood}
                                            </span>
                                            <IoIosArrowForward className="w-6 h-6" />
                                        </button>
                                    </div>
                                </div>
                            </dl>
                        </div>
                        <div className="w-full md:sticky md:top-[5.5rem] md:w-[28rem]">
                            {property.owner ? (
                                <AdvertisedBy
                                    advertiser={property.owner.advertiser}
                                    occupation={property.owner.what_i_am}
                                    id={property.id}
                                    model={property.model}
                                />
                            ) : (
                                <AdvertisedBy
                                    advertiser={property.advertiser}
                                    occupation={property.what_i_am}
                                    id={property.id}
                                    model={property.model}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Drawer
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                longitude={
                    property.owner
                        ? property.owner.address.long
                        : property.address.long
                }
                latitude={
                    property.owner
                        ? property.owner.address.lat
                        : property.address.lat
                }
            />
        </div>
    );
};

export default PropertyDetails;
