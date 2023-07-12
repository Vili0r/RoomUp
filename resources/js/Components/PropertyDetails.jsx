import React, { useState } from "react";
import { AiTwotoneHeart } from "react-icons/ai";
import { Link, useForm } from "@inertiajs/react";
import {
    AdvertisedBy,
    PhotoGallery,
    PropertyDetailsAmenities,
} from "@/Components";
import { CiLocationOn } from "react-icons/ci";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { MdOutlineBedroomParent } from "react-icons/md";
import { FaBath } from "react-icons/fa";
import { RiRulerFill } from "react-icons/ri";
import { MdOutlineBookmarkAdd } from "react-icons/md";
import { HousePlaceholder } from "@/assets";
import moment from "moment";

const PropertyDetails = ({ property }) => {
    console.log(property);
    return (
        <div className="max-w-[2520px] xl:px-20 md:px-10 sm:px-2 px-4">
            <div className="max-w-screen-xl mx-auto">
                <div className="flex flex-col gap-6">
                    <div className="mt-[4rem] py-10 sm:px-16">
                        <h1 className="sm:text-2xl text-xl mb-3 [@media(max-width:350px)]:text-lg font-popp font-bold text-gray-700">
                            {property.owner
                                ? `${property.sub_title} in a ${property.owner.title}`
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
                            images={property.owner.images}
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
                                    <div className="flex flex-row items-center gap-4 font-light mt-9 text-neutral-500">
                                        <div>
                                            {property.owner
                                                ? property.owner.size
                                                : property.size}{" "}
                                            rooms
                                        </div>
                                        <div>
                                            Type:{" "}
                                            {property.owner
                                                ? property.owner.type
                                                : property.type}
                                        </div>
                                        <div>
                                            Available from:{" "}
                                            {moment(
                                                property.owner
                                                    ? property.available_from
                                                    : property.availability
                                                          ?.available_from
                                            ).format("MMM DD, YYYY")}
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
                                    <iframe
                                        className="w-full xs:h-[500px] h-[350px] rounded-xl mt-7"
                                        src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d19888.886967391547!2d-0.9595379997695183!3d51.456120793431964!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2suk!4v1675966769682!5m2!1sen!2suk"
                                        width="600"
                                        height="450"
                                        style={{ border: "0" }}
                                        allowFullScreen=""
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                    ></iframe>
                                </div>
                                <hr className="w-[95%] mx-auto border-gray-300" />
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
