import React from "react";
import AdvertisedBy from "./AdvertisedBy";
import PhotoGallery from "./PhotoGallery";
import PropertyDetailsAmenities from "./PropertyDetailsAmenities";
import { CiLocationOn } from "react-icons/ci";
import { FiMinimize, FiMaximize } from "react-icons/fi";
import { BsCalendar4Week } from "react-icons/bs";
import { MdShortText, MdOutlineReportProblem } from "react-icons/md";
import moment from "moment";
import { useForm } from "@inertiajs/react";
import { useTranslation } from "react-i18next";
import {
    flatmateGender,
    flatmateSmoker,
    roomSize,
    searchingFor,
    minimumStay,
    maximumStay,
    daysAvailable,
    hobbies,
} from "@/arrays/Array";

const RoommateDetails = ({ roommate }) => {
    const { get } = useForm({
        id: roommate.id,
        type: "roommate",
    });

    const handleClick = () => {
        get(route("reported-listings.create"));
    };

    const { t, i18n } = useTranslation();
    const {
        month,
        overview,
        lookingFor,
        bedroom,
        searchingForRoommate,
        availableFromRoommate,
        moreInformation,
        reportListing,
        knowMeBetter,
        ageRoommate,
        smokerRoommate,
        genderRoommate,
        hobbiesRoommate,
        availability,
    } = t("propertyDetails.roommate");

    const getRoomSizeName = (id) => {
        const roomSizeName = roomSize.find((item) => item.id === id);
        return roomSizeName
            ? i18n.language === "en"
                ? roomSizeName.nameEn
                : roomSizeName.nameGr
            : "";
    };
    const getSearchingForName = (id) => {
        const searchingForName = searchingFor.find((item) => item.id === id);
        return searchingForName
            ? i18n.language === "en"
                ? searchingForName.nameEn
                : searchingForName.nameGr
            : "";
    };
    const getFlatmateSmokerName = (id) => {
        const flatmateSmokerName = flatmateSmoker.find(
            (item) => item.id === id
        );
        return flatmateSmokerName
            ? i18n.language === "en"
                ? flatmateSmokerName.nameEn
                : flatmateSmokerName.nameGr
            : "";
    };
    const getFlatmateGenderName = (id) => {
        const flatmateGenderName = flatmateGender.find(
            (item) => item.id === id
        );
        return flatmateGenderName
            ? i18n.language === "en"
                ? flatmateGenderName.nameEn
                : flatmateGenderName.nameGr
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
    const getTermName = (name) => {
        if (i18n.language === "gr") {
            return name === "short term" ? "Βραχυπρόθεσμος" : "Μακροπρόθεσμος";
        } else {
            return name;
        }
    };

    const selectedHobbiesTranslated = roommate.hobbies.map((item) => {
        const hobby = hobbies.find((hobby) => hobby.id === item.id);
        return {
            id: hobby.id,
            name: i18n.language === "en" ? hobby.nameEn : hobby.nameGr,
        };
    });

    return (
        <div className="max-w-[2520px] xl:px-20 md:px-10 sm:px-2 px-4">
            <div className="max-w-screen-xl mx-auto">
                <div className="flex flex-col gap-6">
                    <div className="mt-[4rem] py-10 sm:px-16">
                        <h1 className="sm:text-2xl text-xl mb-3 [@media(max-width:350px)]:text-lg font-bold text-gray-700">
                            {roommate.title}
                        </h1>
                        <div className="flex justify-between gap-0 pt-0 mb-10 items-center [@media(max-width:800px)]:flex-col [@media(max-width:800px)]:items-start [@media(max-width:800px)]:gap-2 [@media(max-width:800px)]:pt-2">
                            <div className="flex justify-between gap-4 [@media(max-width:400px)]:flex-col">
                                <div className="flex">
                                    <p className="text-base font-semibold xs:text-xl">
                                        €{roommate.budget}
                                    </p>
                                    <span className="text-base font-semibold xs:text-xl">
                                        /{month}
                                    </span>
                                </div>
                                <div className="flex [@media(max-width:400px)]:ml-[-6px]">
                                    <span className="flex gap-1 font-semibold underline">
                                        <CiLocationOn className="w-6 h-6" />

                                        <h2 className="text-base font-semibold text-gray-700 xs:text-lg">
                                            {roommate.city},
                                        </h2>

                                        <h2 className="text-base font-semibold text-gray-700 xs:text-lg">
                                            {roommate.area}
                                        </h2>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <PhotoGallery
                            images={roommate.images}
                            title={roommate.title}
                            id={roommate.id}
                            model={roommate.model}
                            favourite={roommate.favouritedBy}
                        />
                    </div>

                    <div className="flex flex-col items-start max-w-6xl gap-10 px-6 mx-auto md:flex-row lg:px-8">
                        <div className="flex w-full min-w-0 mt-5 md:mt-0">
                            <dl className="grid grid-cols-1 gap-y-10 gap-x-8 md:max-w-xl lg:max-w-none lg:gap-y-16">
                                <div className="">
                                    <h1 className="text-xl font-bold text-gray-700">
                                        {overview}
                                    </h1>
                                    <p className="mt-5 text-base font-medium text-gray-700 sm:text-lg">
                                        {roommate.description}
                                    </p>
                                    <div className="sm:flex sm:flex-row grid grid-cols-2 items-center gap-4 font-[450px] mt-9 text-neutral-500">
                                        <div>
                                            {lookingFor}:{" "}
                                            {getRoomSizeName(
                                                roommate.room_size
                                            )}{" "}
                                            {bedroom}
                                        </div>
                                        <span className="hidden sm:block">
                                            |
                                        </span>
                                        <div>
                                            {searchingForRoommate}:{" "}
                                            {getSearchingForName(
                                                roommate.searching_for
                                            )}
                                        </div>
                                        <span className="hidden sm:block">
                                            |
                                        </span>
                                        <div>
                                            {availableFromRoommate}:{" "}
                                            {moment(
                                                roommate.availability
                                                    .available_from
                                            ).format("MMM DD, YYYY")}
                                        </div>
                                    </div>
                                </div>
                                <hr className="w-[95%] mx-auto border-gray-300" />

                                <div className="mt-[1rem]">
                                    <PropertyDetailsAmenities
                                        amenities={roommate.amenities}
                                    />
                                </div>

                                <hr className="w-[95%] mx-auto border-gray-300" />
                                <div className="">
                                    <h1 className="text-xl font-bold text-gray-700">
                                        {knowMeBetter}
                                    </h1>
                                    <div className="mt-5 text-base font-medium text-gray-700 sm:text-lg">
                                        <div>
                                            {ageRoommate}: {roommate.age}
                                        </div>
                                        <div>
                                            {smokerRoommate}:{" "}
                                            {getFlatmateSmokerName(
                                                roommate.smoker
                                            )}
                                        </div>
                                        <div>
                                            {genderRoommate}:{" "}
                                            {getFlatmateGenderName(
                                                roommate.gender
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <hr className="w-[95%] mx-auto border-gray-300" />
                                <div className="">
                                    <h1 className="text-xl font-bold text-gray-700">
                                        {hobbiesRoommate}
                                    </h1>
                                    <div className="grid grid-cols-2 mt-5 text-base font-medium text-gray-700 xs:grid-cols-3 sm:text-lg">
                                        {selectedHobbiesTranslated.map(
                                            (hobby) => (
                                                <div
                                                    className=""
                                                    key={hobby.id}
                                                >
                                                    {hobby.name}
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>
                                <hr className="w-[95%] mx-auto border-gray-300" />
                                <div className="">
                                    <h1 className="text-xl font-bold text-gray-700">
                                        {availability}
                                    </h1>
                                    <div className="sm:flex sm:flex-row grid grid-cols-2 items-center gap-3 font-[450px] mt-9 text-neutral-500 text-base">
                                        <div className="flex items-start gap-2 capitalize ">
                                            <FiMinimize className="w-6 h-6" />
                                            {getMinimumStayName(
                                                roommate.availability
                                                    ?.minimum_stay
                                            )}
                                        </div>
                                        <span className="hidden sm:block">
                                            |
                                        </span>
                                        <div className="flex items-start gap-2 capitalize">
                                            <FiMaximize className="w-6 h-6" />

                                            {getMaximumStayName(
                                                roommate.availability
                                                    ?.maximum_stay
                                            )}
                                        </div>
                                        <span className="hidden sm:block">
                                            |
                                        </span>
                                        <div className="flex items-start gap-2 capitalize">
                                            <BsCalendar4Week className="w-6 h-6" />
                                            {getDaysAvailableName(
                                                roommate.availability
                                                    ?.days_available
                                            )}
                                        </div>
                                        <span className="hidden sm:block">
                                            |
                                        </span>
                                        <div className="flex items-start gap-2 capitalize">
                                            <MdShortText className="w-6 h-6" />
                                            {getTermName(
                                                roommate.availability
                                                    ?.short_term
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <hr className="w-[95%] mx-auto border-gray-300" />
                                <div className="mb-5">
                                    <h1 className="text-xl font-bold text-gray-700 ">
                                        {moreInformation}
                                    </h1>
                                    <div className="sm:flex sm:flex-row grid grid-cols-2 items-center gap-4 font-[450px] mt-9 text-neutral-500">
                                        <button
                                            onClick={handleClick}
                                            className="flex items-start gap-2 px-5 py-3 capitalize border-2 border-gray-100 rounded-md"
                                        >
                                            <MdOutlineReportProblem className="w-6 h-6" />{" "}
                                            {reportListing}
                                        </button>
                                    </div>
                                </div>
                            </dl>
                        </div>
                        <div className="w-full md:sticky md:top-[5.5rem] md:w-[28rem]">
                            <AdvertisedBy
                                advertiser={roommate.advertiser}
                                occupation={roommate.occupation}
                                id={roommate.id}
                                model="roommate"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoommateDetails;
