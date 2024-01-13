import React from "react";
import PhotoGallery from "./PhotoGallery";
import AdvertisedBy from "./AdvertisedBy";
import PropertyDetailsAmenities from "./PropertyDetailsAmenities";
import { CiLocationOn } from "react-icons/ci";
import { FiMinimize, FiMaximize } from "react-icons/fi";
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

const PropertyDetails = ({ property }) => {
    const { get } = useForm({
        id: property.id,
        type: property.model,
    });

    const handleClick = () => {
        get(route("reported-listings.create"));
    };

    return (
        <div className="max-w-[2520px] xl:px-20 md:px-10 sm:px-2 px-4">
            <div className="max-w-screen-xl mx-auto">
                <div className="flex flex-col gap-6">
                    <div className="mt-[4rem] py-10 sm:px-16">
                        <h1 className="sm:text-2xl text-xl mb-3 [@media(max-width:350px)]:text-lg font-popp font-bold text-gray-700">
                            {property.model === "room"
                                ? property.sub_title === null
                                    ? property.owner.title
                                    : `${property.sub_title} in a ${property.owner.title}`
                                : property.title}
                        </h1>
                        <div className="flex justify-between gap-0 pt-0 mb-10 items-center [@media(max-width:800px)]:flex-col [@media(max-width:800px)]:items-start [@media(max-width:800px)]:gap-2 [@media(max-width:800px)]:pt-2">
                            <div className="flex justify-between gap-4 [@media(max-width:400px)]:flex-col">
                                <div className="flex">
                                    <p className="text-base font-semibold xs:text-xl font-popp">
                                        £
                                        {property.owner
                                            ? property.room_cost
                                            : property.cost}
                                    </p>
                                    <span className="text-base font-semibold xs:text-xl font-popp">
                                        /month
                                    </span>
                                </div>
                                <div className="flex [@media(max-width:400px)]:ml-[-6px]">
                                    <span className="flex gap-1 font-semibold underline">
                                        <CiLocationOn className="w-6 h-6" />

                                        <h2 className="text-base font-semibold text-gray-700 xs:text-lg font-popp">
                                            {property.owner
                                                ? property.owner.address
                                                      ?.address_1
                                                : property.address?.address_1}
                                            ,
                                        </h2>

                                        <h2 className="text-base font-semibold text-gray-700 xs:text-lg font-popp">
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
                                    <h1 className="text-xl font-bold text-gray-700 font-popp">
                                        Overview
                                    </h1>
                                    <p className="mt-5 text-base font-medium text-gray-700 sm:text-lg font-popp">
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
                                            rooms
                                        </div>
                                        <span className="hidden sm:block">
                                            |
                                        </span>
                                        <div>
                                            Type:{" "}
                                            {property.owner
                                                ? property.owner.type
                                                : property.type}
                                        </div>
                                        <span className="hidden sm:block">
                                            |
                                        </span>
                                        <div>
                                            Available from:{" "}
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
                                            {property.owner
                                                ? property.room_furnished
                                                : property.furnished}
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
                                    <h1 className="text-xl font-bold text-gray-700 font-popp">
                                        Where will you live
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
                                    <h1 className="text-xl font-bold text-gray-700 font-popp">
                                        Availability
                                    </h1>
                                    <div className="sm:flex sm:flex-row items-center gap-3 font-[450px] mt-9 text-neutral-500 grid grid-cols-2 text-base">
                                        <div className="flex items-start gap-2 capitalize ">
                                            <FiMinimize className="w-6 h-6" />
                                            {property.owner
                                                ? property.minimum_stay
                                                : property.availability
                                                      ?.minimum_stay}
                                        </div>
                                        <span className="hidden sm:block">
                                            |
                                        </span>
                                        <div className="flex items-start gap-2 capitalize">
                                            <FiMaximize className="w-6 h-6" />

                                            {property.owner
                                                ? property.maximum_stay
                                                : property.availability
                                                      ?.maximum_stay}
                                        </div>
                                        <span className="hidden sm:block">
                                            |
                                        </span>
                                        <div className="flex items-start gap-2 capitalize">
                                            <BsCalendar4Week className="w-6 h-6" />
                                            {property.owner
                                                ? property.days_available
                                                : property.availability
                                                      ?.days_available}
                                        </div>
                                        <span className="hidden sm:block">
                                            |
                                        </span>
                                        <div className="flex items-start gap-2 capitalize">
                                            <MdShortText className="w-6 h-6" />
                                            {property.owner
                                                ? property.short_term
                                                : property.availability
                                                      ?.short_term}
                                        </div>
                                    </div>
                                </div>
                                <hr className="w-[95%] mx-auto border-gray-300" />
                                <div className="">
                                    <h1 className="text-xl font-bold text-gray-700 font-popp">
                                        Transport
                                    </h1>
                                    <div className="sm:flex sm:flex-row grid grid-cols-2 items-center gap-4 font-[450px] mt-9 text-neutral-500">
                                        <div className="flex items-start gap-2 capitalize">
                                            <MdOutlineHourglassEmpty className="w-6 h-6" />{" "}
                                            {property.owner
                                                ? property.owner.transport
                                                      .minutes
                                                : property.transport?.minutes}
                                        </div>
                                        <span className="hidden sm:block">
                                            |
                                        </span>
                                        <div className="flex items-start gap-2 capitalize">
                                            <MdOutlineAirplanemodeActive className="w-6 h-6" />

                                            {property.owner
                                                ? property.owner.transport.mode
                                                : property.transport?.mode}
                                        </div>
                                        <span className="hidden sm:block">
                                            |
                                        </span>
                                        <div className="flex items-start gap-2 capitalize">
                                            <SiTransportforlondon className="w-6 h-6" />

                                            {property.owner
                                                ? property.owner.transport
                                                      .station
                                                : property.transport?.station}
                                        </div>
                                    </div>
                                </div>
                                <hr className="w-[95%] mx-auto border-gray-300" />
                                <div className="">
                                    <h1 className="text-xl font-bold text-gray-700 font-popp">
                                        More Information
                                    </h1>
                                    <div className="sm:flex sm:flex-row grid grid-cols-2 items-center gap-4 font-[450px] mt-9 text-neutral-500">
                                        <button
                                            onClick={handleClick}
                                            className="flex items-start gap-2 px-5 py-3 capitalize border-2 border-gray-100 rounded-md"
                                        >
                                            <MdOutlineReportProblem className="w-6 h-6" />{" "}
                                            Report Listing
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
        </div>
    );
};

export default PropertyDetails;
