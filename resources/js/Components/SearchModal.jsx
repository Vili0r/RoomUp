import React, { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { MdOutlineApartment, MdOutlineBedroomParent } from "react-icons/md";
import { BsHouseFill } from "react-icons/bs";
import { ImOffice, ImArrowRight2, ImArrowLeft2 } from "react-icons/im";
import { router } from "@inertiajs/react";
import { BsCheck } from "react-icons/bs";
import {
    MultiRangeSlider,
    PrimaryButton,
    SecondaryButton,
    InputLabel,
    TextInput,
    FlatmateSearchModal,
} from "@/Components";
import { DebounceInput } from "react-debounce-input";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";

const places = [
    { id: 1, title: "Apartment", image: MdOutlineApartment },
    { id: 2, title: "Full House", image: BsHouseFill },
    { id: 3, title: "Property", image: ImOffice },
    { id: 4, title: "Room", image: MdOutlineBedroomParent },
];

const bedrooms = [
    { id: 1, title: "Studio/1" },
    { id: 2, title: "2" },
    { id: 3, title: "3" },
    { id: 4, title: "4" },
    { id: 5, title: "5" },
    { id: 6, title: "6+" },
];

const modes = [
    { id: 1, name: "Walk" },
    { id: 2, name: "By car" },
    { id: 3, name: "By bus" },
    { id: 4, name: "By bike" },
];

const furnishings = [
    { id: 1, name: "Furnished" },
    { id: 2, name: "Unfurnished" },
];

const flatmateGender = [
    { id: 1, name: "Female" },
    { id: 2, name: "Male" },
];

const flatmateOccupation = [
    { id: 1, name: "Student" },
    { id: 2, name: "Professional" },
];

const flatmateSmoker = [
    { id: 1, name: "No" },
    { id: 2, name: "Yes" },
];

const flatmatePets = [
    { id: 1, name: "No" },
    { id: 2, name: "Yes" },
];

const currentOccupants = [
    { id: 0, name: "Zero" },
    { id: 1, name: "One" },
    { id: 2, name: "Two" },
    { id: 3, name: "Three" },
    { id: 4, name: "Four" },
    { id: 5, name: "Five" },
    { id: 6, name: "Six" },
    { id: 7, name: "Seven" },
    { id: 8, name: "Eight" },
    { id: 9, name: "Nine" },
    { id: 10, name: "Ten" },
];

const availableRooms = [
    { id: 1, name: "One room for rent" },
    { id: 2, name: "Two room for rent" },
    { id: 3, name: "Three room for rent" },
    { id: 4, name: "Four room for rent" },
    { id: 5, name: "Five room for rent" },
    { id: 6, name: "Six room for rent" },
    { id: 7, name: "Seven room for rent" },
    { id: 8, name: "Eight room for rent" },
    { id: 9, name: "Nine room for rent" },
    { id: 10, name: "Ten room for rent" },
];

const minutes = [
    { id: 1, name: "Less than 5" },
    { id: 2, name: "Between 5 and 10" },
    { id: 3, name: "Between 10 and 15" },
    { id: 4, name: "Between 15 and 20" },
    { id: 5, name: "More than 20" },
];

const stations = [
    { id: 1, name: "Sintagma" },
    { id: 2, name: "Monastiraki" },
    { id: 3, name: "Evangelismos" },
    { id: 4, name: "Attiki" },
    { id: 5, name: "Cholargos" },
    { id: 6, name: "Omonoia" },
    { id: 7, name: "Akropoli" },
    { id: 8, name: "Pireas" },
    { id: 9, name: "Mosxato" },
    { id: 10, name: "kalithea" },
];

const amenities = [
    { id: 1, name: "Parking" },
    { id: 2, name: "Garden" },
    { id: 3, name: "Garage" },
    { id: 4, name: "Balcony" },
    { id: 5, name: "Disable Access" },
    { id: 6, name: "Living Room" },
    { id: 7, name: "Broadband" },
    { id: 8, name: "Air Conditioning" },
    { id: 9, name: "Heating System" },
    { id: 10, name: "Dishwasher" },
    { id: 11, name: "Microwave" },
    { id: 12, name: "Oven" },
    { id: 13, name: "Washer" },
    { id: 14, name: "Refrigirator" },
    { id: 15, name: "Storage" },
];

const SearchModal = ({ isOpen, closeModal, selectedQueries }) => {
    const [selectedAmenities, setSelectedAmenities] = useState([]);
    const [toggleActiveButton, setToggleActiveButton] = useState(1);
    const [step, setStep] = useState(1);
    const [type, setType] = useState("");
    const [size, setSize] = useState("");
    const [toggleActiveBedrooms, setToggleActiveBedrooms] = useState(1);
    const [searchResults, setSearchResults] = useState(null);
    const [query, setQuery] = useState("");
    const [availability, setAvailability] = useState("");
    const [min, setMin] = useState(0);
    const [max, setMax] = useState(10000);
    const [minute, setMinute] = useState("");
    const [mode, setMode] = useState("");
    const [station, setStation] = useState("");
    const [furnished, setFurnished] = useState("");
    const [availableRoom, setAvailableRoom] = useState("");
    const [currentOccupant, setCurrentOccupant] = useState("");
    const [smoker, setSmoker] = useState("");
    const [gender, setGender] = useState("");
    const [occupation, setOccupation] = useState("");
    const [pets, setPets] = useState("");

    const handleMinChange = (value) => {
        setMin(value);
    };

    const handleMaxChange = (value) => {
        setMax(value);
    };

    const activeButton = (index) => {
        setToggleActiveButton(index);
        setStep(1);
        setType("");
        setSize("");
        setQuery("");
        setMinute("");
        setMode("");
        setStation("");
        setFurnished("");
        setMin(0);
        setMax(10000);
        setToggleActiveBedrooms(1);
        setSelectedAmenities([]);
    };

    //next step
    const handleNext = () => {
        setStep(step + 1);
    };
    const handleBack = () => {
        setStep(step - 1);
    };

    const handleAmenityChange = (id) => {
        setSelectedAmenities((prev) => {
            // Check if the ID already exists in the array
            const exists = prev.includes(id);

            // If the ID exists, remove it from the array, otherwise add it
            if (exists) {
                return prev.filter((amenityId) => amenityId !== id);
            } else {
                return [...prev, id];
            }
        });
    };

    const handlePropertyFilterSubmit = () => {
        let href = "/search?";

        if (type !== "" && type !== 4) {
            href += "filter[type]=" + type + "&";
        }
        if (size !== "") {
            href += "filter[size]=" + size + "&";
        }
        if (min !== 0 && min !== "") {
            href += "filter[min_price]=" + min + "&";
        }
        if (max !== 10000 && max !== "") {
            href += "filter[max_price]=" + max + "&";
        }
        if (selectedAmenities.length) {
            href += "&filter[amenity]=" + selectedAmenities + "&";
        }
        if (availability !== "" && type !== 4) {
            href +=
                "&filter[availability.available_from]=" + availability + "&";
        }
        if (furnished !== "") {
            href += "&filter[furnished]=" + furnished + "&";
        }
        if (mode !== "") {
            href += "&filter[mode]=" + mode + "&";
        }
        if (minute !== "") {
            href += "&filter[minutes]=" + minute + "&";
        }
        if (station !== "") {
            href += "&filter[station]=" + station + "&";
        }
        if (availableRoom !== "" && type === 4) {
            href += "&filter[available_rooms]=" + availableRoom + "&";
        }
        if (currentOccupant !== "" && type === 4) {
            href += "&filter[current_occupants]=" + currentOccupant + "&";
        }
        if (pets !== "" && type === 4) {
            href += "&filter[current_flatmate_pets]=" + pets + "&";
        }
        if (gender !== "" && type === 4) {
            href += "&filter[current_flatmate_gender]=" + gender + "&";
        }
        if (occupation !== "" && type === 4) {
            href += "&filter[current_flatmate_occupation]=" + occupation + "&";
        }
        if (smoker !== "" && type === 4) {
            href += "&filter[current_flatmate_smoker]=" + smoker + "&";
        }

        if (type === 4) {
            router.visit(
                href,
                {
                    data: {
                        search_type: "shareds",
                        search: query,
                    },
                },
                { preserveScroll: true }
            );
        } else {
            router.visit(
                href,
                {
                    data: { search: query },
                },
                { preserveScroll: true }
            );
        }
    };

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 p-10 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-full text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-xl overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                <div className="text-sm text-gray-500">
                                    <div className="relative flex flex-col items-center justify-center h-full py-6 overflow-hidden bg-gray-50 sm:py-12">
                                        <div className="absolute inset-auto scale-150 bg-orange-200 h-96 w-96 opacity-20 blur-3xl"></div>

                                        <div className="absolute inset-auto scale-150 translate-x-full bg-green-200 h-96 w-96 opacity-20 blur-3xl"></div>
                                        <div className="w-full">
                                            <div className="max-w-lg px-10 mb-6">
                                                <h1 className="text-[40px] font-bold tracking-tight text-[#2f2963]">
                                                    Find your property
                                                </h1>
                                                <p className="mt-5 opacity-50">
                                                    Select through the multiple
                                                    filter to find your ideal
                                                    room or property.
                                                </p>

                                                <div className="border border-[#f3f3f3] rounded-2xl flex justify-between gap-1 [@media(max-width:440px)]:flex-col"></div>

                                                <div className="flex justify-start mt-5">
                                                    <div>
                                                        <div className="w-full rounded-2xl relative flex justify-start gap-x-[5rem] [@media(max-width:440px)]:flex-col ml-5">
                                                            <button
                                                                onClick={() =>
                                                                    activeButton(
                                                                        1
                                                                    )
                                                                }
                                                            >
                                                                <span
                                                                    className={`${
                                                                        toggleActiveButton ==
                                                                        "1"
                                                                            ? "text-white font-popp font-semibold lg:font-medium text-sm lg:text-xs bg-black rounded-xl [@media(max-width:440px)]:py-3"
                                                                            : "text-black hover:text-white font-popp font-semibold lg:text-xs lg:font-medium text-sm h-8 bg-white hover:bg-black rounded-xl"
                                                                    } absolute font-semibold inline-flex items-center h-[2.5rem] w-[8rem] justify-center transition-all duration-150 transform items-center-full ease ease-in-out group-hover:translate-x-full`}
                                                                >
                                                                    Rent
                                                                </span>
                                                                <span className="relative invisible">
                                                                    Rent
                                                                </span>
                                                            </button>
                                                            <button
                                                                onClick={() =>
                                                                    activeButton(
                                                                        2
                                                                    )
                                                                }
                                                            >
                                                                <span
                                                                    className={`${
                                                                        toggleActiveButton ==
                                                                        "2"
                                                                            ? "text-white font-popp font-semibold lg:font-medium text-sm lg:text-xs bg-black h-8 rounded-xl [@media(max-width:440px)]:py-3"
                                                                            : "text-black hover:text-white font-popp font-semibold lg:text-xs lg:font-medium text-sm bg-white hover:bg-black rounded-xl after:bg-black after:w-1/6 after:rounded-r-xl after:h-full after:border-black after:border-none after:absolute after:top-0 after:left-0"
                                                                    } absolute font-semibold transition-all  duration-150 inline-flex h-[2.5rem] w-[8rem] items-center justify-center transform items-center-full ease ease-in-out group-hover:translate-x-full`}
                                                                >
                                                                    Flatmate
                                                                </span>
                                                                <span className="relative invisible">
                                                                    Flatmate
                                                                </span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex justify-center space-y-2">
                                                {toggleActiveButton === 1 ? (
                                                    <div className="">
                                                        <button
                                                            onClick={
                                                                handlePropertyFilterSubmit
                                                            }
                                                            className={`relative inline-flex px-4 py-2 mt-4 overflow-hidden text-base font-medium text-white transition duration-300 ease-out bg-black rounded-lg group hover:scale-105 hover:shadow-orange-600 active:translate-y-1 ${
                                                                step === 4 ||
                                                                step === 5
                                                                    ? "ml-8"
                                                                    : ""
                                                            }`}
                                                        >
                                                            <span className="absolute inset-0 transition duration-300 ease-out opacity-0 bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 group-hover:opacity-100 group-active:opacity-90"></span>
                                                            <span className="relative group-hover:text-white">
                                                                Search
                                                            </span>
                                                        </button>

                                                        {step == 1 && (
                                                            <>
                                                                <div className="mt-[2rem]">
                                                                    <p className="text-sm font-semibold font-popp">
                                                                        Type of
                                                                        places
                                                                    </p>
                                                                    <div className="grid grid-cols-2 gap-3 [@media(max-width:350px)]:gap-x-7 lg:space-y-2 xl:gap-3 mt-[1rem] place-items-center">
                                                                        {places.map(
                                                                            (
                                                                                places,
                                                                                index
                                                                            ) => (
                                                                                <div
                                                                                    onClick={() =>
                                                                                        setType(
                                                                                            places.id
                                                                                        )
                                                                                    }
                                                                                    key={
                                                                                        places.id
                                                                                    }
                                                                                    className={`${
                                                                                        type ==
                                                                                        places.id
                                                                                            ? "border-black"
                                                                                            : "border-gray-200 [@media(max-width:340px)]:border-0"
                                                                                    } relative font-semibold transition-all duration-150 justify-center transform items-center-full ease ease-in-out group-hover:translate-x-full h-[100px] w-[150px] [@media(max-width:340px)]:h-[80px] [@media(max-width:460px)]:w-[100px] lg:w-[130px] border rounded-xl flex flex-col items-center gap-3`}
                                                                                >
                                                                                    <places.image className="mt-6 font-popp w-7 h-7" />
                                                                                    <span className="font-popp text-[16px] mb-2 [@media(max-width:340px)]:hidden">
                                                                                        {
                                                                                            places.title
                                                                                        }
                                                                                    </span>
                                                                                </div>
                                                                            )
                                                                        )}
                                                                    </div>
                                                                </div>

                                                                <div className="flex justify-end mt-6">
                                                                    <PrimaryButton
                                                                        onClick={
                                                                            handleNext
                                                                        }
                                                                        className="group relative inline-flex w-40 items-center justify-center overflow-hidden rounded-full bg-[#FFF337] px-8 py-3 font-medium text-white transition duration-300 ease-out md:w-auto"
                                                                    >
                                                                        <span className="ease absolute inset-0 flex h-full w-full -translate-x-full items-center justify-center bg-[#FFF337] text-black duration-300 group-hover:translate-x-0">
                                                                            <ImArrowRight2 className="w-5 h-5" />
                                                                        </span>
                                                                        <span className="absolute flex items-center justify-center w-full h-full text-black transition-all duration-300 transform ease group-hover:translate-x-full">
                                                                            Next
                                                                        </span>
                                                                        <span className="relative invisible">
                                                                            Next
                                                                        </span>
                                                                    </PrimaryButton>
                                                                </div>
                                                            </>
                                                        )}

                                                        {step == 2 && (
                                                            <>
                                                                <div className="mt-[1rem]">
                                                                    <p className="flex items-center justify-center mb-8 text-sm font-semibold font-popp lg:pl-2 xl:pl-0">
                                                                        Price
                                                                        Range
                                                                    </p>
                                                                    <MultiRangeSlider
                                                                        rangeMin={
                                                                            0
                                                                        }
                                                                        rangeMax={
                                                                            10000
                                                                        }
                                                                        initialMin={
                                                                            min
                                                                        }
                                                                        initialMax={
                                                                            max
                                                                        }
                                                                        onMinChange={
                                                                            handleMinChange
                                                                        }
                                                                        onMaxChange={
                                                                            handleMaxChange
                                                                        }
                                                                    />
                                                                </div>

                                                                <div className="mt-[2rem]">
                                                                    <p className="text-sm font-semibold font-popp lg:pl-2 xl:pl-0">
                                                                        Bedroom
                                                                    </p>
                                                                    <div className="flex justify-center gap-2 place-items-center mt-3 [@media(max-width:400px)]:grid [@media(max-width:400px)]:grid-cols-3">
                                                                        {bedrooms.map(
                                                                            (
                                                                                bedroom,
                                                                                index
                                                                            ) => (
                                                                                <div
                                                                                    onClick={() =>
                                                                                        setSize(
                                                                                            bedroom.id
                                                                                        )
                                                                                    }
                                                                                    key={
                                                                                        bedroom.id
                                                                                    }
                                                                                    className={`${
                                                                                        size ==
                                                                                        bedroom.id
                                                                                            ? "bg-black text-white"
                                                                                            : "bg-white text-black"
                                                                                    } relative p-1 py-2 px-6 lg:px-[19px] border border-[#f3f3f3] rounded-lg hover:bg-black hover:text-white`}
                                                                                >
                                                                                    <span className="font-popp text-md">
                                                                                        {
                                                                                            bedroom.title
                                                                                        }
                                                                                    </span>
                                                                                </div>
                                                                            )
                                                                        )}
                                                                    </div>
                                                                </div>

                                                                <div className="flex justify-center mt-6 space-x-2">
                                                                    <PrimaryButton
                                                                        onClick={
                                                                            handleBack
                                                                        }
                                                                        className="group relative inline-flex w-40 items-center justify-center overflow-hidden rounded-full bg-[#FFF337] px-8 py-3 font-medium text-white transition duration-300 ease-out md:w-auto"
                                                                    >
                                                                        <span className="ease absolute inset-0 flex h-full w-full -translate-x-full items-center justify-center bg-[#FFF337] text-black duration-300 group-hover:translate-x-0">
                                                                            <ImArrowLeft2 className="w-5 h-5" />
                                                                        </span>
                                                                        <span className="absolute flex items-center justify-center w-full h-full text-black transition-all duration-300 transform ease group-hover:translate-x-full">
                                                                            Previous
                                                                        </span>
                                                                        <span className="relative invisible">
                                                                            Previous
                                                                        </span>
                                                                    </PrimaryButton>
                                                                    <PrimaryButton
                                                                        onClick={
                                                                            handleNext
                                                                        }
                                                                        className="group relative inline-flex w-40 items-center justify-center overflow-hidden rounded-full bg-[#FFF337] px-8 py-3 font-medium text-white transition duration-300 ease-out md:w-auto"
                                                                    >
                                                                        <span className="ease absolute inset-0 flex h-full w-full -translate-x-full items-center justify-center bg-[#FFF337] text-black duration-300 group-hover:translate-x-0">
                                                                            <ImArrowRight2 className="w-5 h-5" />
                                                                        </span>
                                                                        <span className="absolute flex items-center justify-center w-full h-full text-black transition-all duration-300 transform ease group-hover:translate-x-full">
                                                                            Next
                                                                        </span>
                                                                        <span className="relative invisible">
                                                                            Next
                                                                        </span>
                                                                    </PrimaryButton>
                                                                </div>
                                                            </>
                                                        )}

                                                        {step == 3 && (
                                                            <>
                                                                <div className="mt-[2rem]">
                                                                    <p className="text-sm font-semibold font-popp">
                                                                        Amenities
                                                                    </p>

                                                                    <div className="grid grid-cols-2 mt-3">
                                                                        {amenities?.map(
                                                                            (
                                                                                amenity
                                                                            ) => (
                                                                                <div
                                                                                    key={
                                                                                        amenity.id
                                                                                    }
                                                                                    className="flex justify-between mb-2 space-x-[4rem]"
                                                                                >
                                                                                    <span className="mt-1 ml-2 text-sm font-popp">
                                                                                        {
                                                                                            amenity.name
                                                                                        }
                                                                                    </span>
                                                                                    <label className="relative cursor-pointer">
                                                                                        <input
                                                                                            id="checkbox-1"
                                                                                            type="checkbox"
                                                                                            onChange={() =>
                                                                                                handleAmenityChange(
                                                                                                    amenity.id
                                                                                                )
                                                                                            }
                                                                                            checked={selectedAmenities.includes(
                                                                                                amenity.id
                                                                                            )}
                                                                                            className="appearance-none h-6 w-6 border-2 rounded-[7px] border-[#f3f2f2]"
                                                                                        />
                                                                                        <BsCheck className="absolute w-8 h-8 text-white text-opacity-0 transition ease-out text-8xl -left-1 -top-1 check-1 after:bg-black" />
                                                                                    </label>
                                                                                </div>
                                                                            )
                                                                        )}
                                                                    </div>
                                                                </div>

                                                                <div className="flex justify-center mt-6 space-x-2">
                                                                    <PrimaryButton
                                                                        onClick={
                                                                            handleBack
                                                                        }
                                                                        className="group relative inline-flex w-40 items-center justify-center overflow-hidden rounded-full bg-[#FFF337] px-8 py-3 font-medium text-white transition duration-300 ease-out md:w-auto"
                                                                    >
                                                                        <span className="ease absolute inset-0 flex h-full w-full -translate-x-full items-center justify-center bg-[#FFF337] text-black duration-300 group-hover:translate-x-0">
                                                                            <ImArrowLeft2 className="w-5 h-5" />
                                                                        </span>
                                                                        <span className="absolute flex items-center justify-center w-full h-full text-black transition-all duration-300 transform ease group-hover:translate-x-full">
                                                                            Previous
                                                                        </span>
                                                                        <span className="relative invisible">
                                                                            Previous
                                                                        </span>
                                                                    </PrimaryButton>
                                                                    <PrimaryButton
                                                                        onClick={
                                                                            handleNext
                                                                        }
                                                                        className="group relative inline-flex w-40 items-center justify-center overflow-hidden rounded-full bg-[#FFF337] px-8 py-3 font-medium text-white transition duration-300 ease-out md:w-auto"
                                                                    >
                                                                        <span className="ease absolute inset-0 flex h-full w-full -translate-x-full items-center justify-center bg-[#FFF337] text-black duration-300 group-hover:translate-x-0">
                                                                            <ImArrowRight2 className="w-5 h-5" />
                                                                        </span>
                                                                        <span className="absolute flex items-center justify-center w-full h-full text-black transition-all duration-300 transform ease group-hover:translate-x-full">
                                                                            Next
                                                                        </span>
                                                                        <span className="relative invisible">
                                                                            Next
                                                                        </span>
                                                                    </PrimaryButton>
                                                                </div>
                                                            </>
                                                        )}

                                                        {step == 4 && (
                                                            <>
                                                                <div className="grid grid-cols-1 gap-6 px-8 mt-7 sm:grid-cols-2">
                                                                    <div className="relative h-10 w-full min-w-[200px]">
                                                                        <InputLabel
                                                                            htmlFor="availabilty"
                                                                            value="Available to move from"
                                                                        />
                                                                        <TextInput
                                                                            type="date"
                                                                            autoComplete="off"
                                                                            name="availability"
                                                                            onChange={(
                                                                                e
                                                                            ) =>
                                                                                setAvailability(
                                                                                    e
                                                                                        .target
                                                                                        .value
                                                                                )
                                                                            }
                                                                            className="w-full px-3 py-3 bg-transparent border border-gray-300 rounded-md shadow peer shadow-gray-100 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                                                                            placeholder=" "
                                                                        />
                                                                    </div>
                                                                    <div className="relative h-10 w-full min-w-[200px]">
                                                                        <InputLabel
                                                                            htmlFor="query"
                                                                            value="Enter address"
                                                                        />
                                                                        <DebounceInput
                                                                            value={
                                                                                query
                                                                            }
                                                                            minLength={
                                                                                1
                                                                            }
                                                                            debounceTimeout={
                                                                                500
                                                                            }
                                                                            onChange={(
                                                                                e
                                                                            ) =>
                                                                                setQuery(
                                                                                    e
                                                                                        .target
                                                                                        .value
                                                                                )
                                                                            }
                                                                            className="bg-transparent border-gray-300 rounded-md shadow-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-yellow-500 dark:focus:border-yellow-600 focus:ring-yellow-500 dark:focus:ring-yellow-600"
                                                                            placeholder=""
                                                                        />
                                                                    </div>
                                                                </div>

                                                                <div className="grid grid-cols-1 gap-4 mt-[3rem] px-8 text-sm gap-y-2 md:grid-cols-6">
                                                                    <div className="relative md:col-span-2">
                                                                        <InputLabel
                                                                            htmlFor="minute"
                                                                            value="Minutes"
                                                                        />
                                                                        <select
                                                                            name="minute"
                                                                            value={
                                                                                minute
                                                                            }
                                                                            className="block w-full mt-1 bg-transparent border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                                                            onChange={(
                                                                                e
                                                                            ) =>
                                                                                setMinute(
                                                                                    e
                                                                                        .target
                                                                                        .value
                                                                                )
                                                                            }
                                                                        >
                                                                            <option value="">
                                                                                --
                                                                            </option>
                                                                            {minutes.map(
                                                                                ({
                                                                                    id,
                                                                                    name,
                                                                                }) => (
                                                                                    <option
                                                                                        key={
                                                                                            id
                                                                                        }
                                                                                        value={
                                                                                            id
                                                                                        }
                                                                                    >
                                                                                        {
                                                                                            name
                                                                                        }
                                                                                    </option>
                                                                                )
                                                                            )}
                                                                        </select>
                                                                    </div>

                                                                    <div className="relative md:col-span-2">
                                                                        <InputLabel
                                                                            htmlFor="mode"
                                                                            value="Mode"
                                                                        />
                                                                        <select
                                                                            name="mode"
                                                                            value={
                                                                                mode
                                                                            }
                                                                            className="block w-full mt-1 bg-transparent border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                                                            onChange={(
                                                                                e
                                                                            ) =>
                                                                                setMode(
                                                                                    e
                                                                                        .target
                                                                                        .value
                                                                                )
                                                                            }
                                                                        >
                                                                            <option value="">
                                                                                --
                                                                            </option>
                                                                            {modes.map(
                                                                                ({
                                                                                    id,
                                                                                    name,
                                                                                }) => (
                                                                                    <option
                                                                                        key={
                                                                                            id
                                                                                        }
                                                                                        value={
                                                                                            id
                                                                                        }
                                                                                    >
                                                                                        {
                                                                                            name
                                                                                        }
                                                                                    </option>
                                                                                )
                                                                            )}
                                                                        </select>
                                                                    </div>

                                                                    <div className="relative md:col-span-2">
                                                                        <InputLabel
                                                                            htmlFor="station"
                                                                            value="Station"
                                                                        />
                                                                        <select
                                                                            name="station"
                                                                            value={
                                                                                station
                                                                            }
                                                                            className="block w-full mt-1 bg-transparent border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                                                            onChange={(
                                                                                e
                                                                            ) =>
                                                                                setStation(
                                                                                    e
                                                                                        .target
                                                                                        .value
                                                                                )
                                                                            }
                                                                        >
                                                                            <option value="">
                                                                                --
                                                                            </option>
                                                                            {stations.map(
                                                                                ({
                                                                                    id,
                                                                                    name,
                                                                                }) => (
                                                                                    <option
                                                                                        key={
                                                                                            id
                                                                                        }
                                                                                        value={
                                                                                            id
                                                                                        }
                                                                                    >
                                                                                        {
                                                                                            name
                                                                                        }
                                                                                    </option>
                                                                                )
                                                                            )}
                                                                        </select>
                                                                    </div>
                                                                </div>

                                                                <div className="relative w-1/2 px-8 mt-5">
                                                                    <InputLabel
                                                                        htmlFor="furnished"
                                                                        value="Furnished"
                                                                    />
                                                                    <select
                                                                        name="furnished"
                                                                        value={
                                                                            furnished
                                                                        }
                                                                        className="block w-full mt-1 bg-transparent border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                                                        onChange={(
                                                                            e
                                                                        ) =>
                                                                            setFurnished(
                                                                                e
                                                                                    .target
                                                                                    .value
                                                                            )
                                                                        }
                                                                    >
                                                                        <option value="">
                                                                            --
                                                                        </option>
                                                                        {furnishings.map(
                                                                            ({
                                                                                id,
                                                                                name,
                                                                            }) => (
                                                                                <option
                                                                                    key={
                                                                                        id
                                                                                    }
                                                                                    value={
                                                                                        id
                                                                                    }
                                                                                >
                                                                                    {
                                                                                        name
                                                                                    }
                                                                                </option>
                                                                            )
                                                                        )}
                                                                    </select>
                                                                </div>

                                                                <div className="flex justify-center mt-6 space-x-2">
                                                                    <PrimaryButton
                                                                        onClick={
                                                                            handleBack
                                                                        }
                                                                        className="group relative inline-flex w-40 items-center justify-center overflow-hidden rounded-full bg-[#FFF337] px-8 py-3 font-medium text-white transition duration-300 ease-out md:w-auto"
                                                                    >
                                                                        <span className="ease absolute inset-0 flex h-full w-full -translate-x-full items-center justify-center bg-[#FFF337] text-black duration-300 group-hover:translate-x-0">
                                                                            <ImArrowLeft2 className="w-5 h-5" />
                                                                        </span>
                                                                        <span className="absolute flex items-center justify-center w-full h-full text-black transition-all duration-300 transform ease group-hover:translate-x-full">
                                                                            Previous
                                                                        </span>
                                                                        <span className="relative invisible">
                                                                            Previous
                                                                        </span>
                                                                    </PrimaryButton>
                                                                    {type ===
                                                                        4 && (
                                                                        <PrimaryButton
                                                                            onClick={
                                                                                handleNext
                                                                            }
                                                                            className="group relative inline-flex w-40 items-center justify-center overflow-hidden rounded-full bg-[#FFF337] px-8 py-3 font-medium text-white transition duration-300 ease-out md:w-auto"
                                                                        >
                                                                            <span className="ease absolute inset-0 flex h-full w-full -translate-x-full items-center justify-center bg-[#FFF337] text-black duration-300 group-hover:translate-x-0">
                                                                                <ImArrowRight2 className="w-5 h-5" />
                                                                            </span>
                                                                            <span className="absolute flex items-center justify-center w-full h-full text-black transition-all duration-300 transform ease group-hover:translate-x-full">
                                                                                Next
                                                                            </span>
                                                                            <span className="relative invisible">
                                                                                Next
                                                                            </span>
                                                                        </PrimaryButton>
                                                                    )}
                                                                </div>
                                                            </>
                                                        )}

                                                        {type === 4 &&
                                                            step === 5 && (
                                                                <>
                                                                    <div className="grid grid-cols-1 gap-4 mt-[3rem] px-8 text-sm gap-y-2 md:grid-cols-6">
                                                                        <div className="relative md:col-span-2">
                                                                            <InputLabel
                                                                                htmlFor="availableRoom"
                                                                                value="Available Rooms"
                                                                            />
                                                                            <select
                                                                                name="availableRoom"
                                                                                value={
                                                                                    availableRoom
                                                                                }
                                                                                className="block w-full mt-1 bg-transparent border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                                                                onChange={(
                                                                                    e
                                                                                ) =>
                                                                                    setAvailableRoom(
                                                                                        e
                                                                                            .target
                                                                                            .value
                                                                                    )
                                                                                }
                                                                            >
                                                                                <option value="">
                                                                                    --
                                                                                </option>
                                                                                {availableRooms.map(
                                                                                    ({
                                                                                        id,
                                                                                        name,
                                                                                    }) => (
                                                                                        <option
                                                                                            key={
                                                                                                id
                                                                                            }
                                                                                            value={
                                                                                                id
                                                                                            }
                                                                                        >
                                                                                            {
                                                                                                name
                                                                                            }
                                                                                        </option>
                                                                                    )
                                                                                )}
                                                                            </select>
                                                                        </div>

                                                                        <div className="relative md:col-span-2">
                                                                            <InputLabel
                                                                                htmlFor="currentOccupant"
                                                                                value="Current Occupant"
                                                                            />
                                                                            <select
                                                                                name="currentOccupant"
                                                                                value={
                                                                                    currentOccupant
                                                                                }
                                                                                className="block w-full mt-1 bg-transparent border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                                                                onChange={(
                                                                                    e
                                                                                ) =>
                                                                                    setCurrentOccupant(
                                                                                        e
                                                                                            .target
                                                                                            .value
                                                                                    )
                                                                                }
                                                                            >
                                                                                <option value="">
                                                                                    --
                                                                                </option>
                                                                                {currentOccupants.map(
                                                                                    ({
                                                                                        id,
                                                                                        name,
                                                                                    }) => (
                                                                                        <option
                                                                                            key={
                                                                                                id
                                                                                            }
                                                                                            value={
                                                                                                id
                                                                                            }
                                                                                        >
                                                                                            {
                                                                                                name
                                                                                            }
                                                                                        </option>
                                                                                    )
                                                                                )}
                                                                            </select>
                                                                        </div>

                                                                        <div className="relative md:col-span-2">
                                                                            <InputLabel
                                                                                htmlFor="smoker"
                                                                                value="Flatmate Smoker"
                                                                            />
                                                                            <select
                                                                                name="smoker"
                                                                                value={
                                                                                    smoker
                                                                                }
                                                                                className="block w-full mt-1 bg-transparent border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                                                                onChange={(
                                                                                    e
                                                                                ) =>
                                                                                    setSmoker(
                                                                                        e
                                                                                            .target
                                                                                            .value
                                                                                    )
                                                                                }
                                                                            >
                                                                                <option value="">
                                                                                    --
                                                                                </option>
                                                                                {flatmateSmoker.map(
                                                                                    ({
                                                                                        id,
                                                                                        name,
                                                                                    }) => (
                                                                                        <option
                                                                                            key={
                                                                                                id
                                                                                            }
                                                                                            value={
                                                                                                id
                                                                                            }
                                                                                        >
                                                                                            {
                                                                                                name
                                                                                            }
                                                                                        </option>
                                                                                    )
                                                                                )}
                                                                            </select>
                                                                        </div>
                                                                    </div>
                                                                    <div className="grid grid-cols-1 gap-4 mt-[3rem] px-8 text-sm gap-y-2 md:grid-cols-6">
                                                                        <div className="relative md:col-span-2">
                                                                            <InputLabel
                                                                                htmlFor="pets"
                                                                                value="Pets"
                                                                            />
                                                                            <select
                                                                                name="pets"
                                                                                value={
                                                                                    pets
                                                                                }
                                                                                className="block w-full mt-1 bg-transparent border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                                                                onChange={(
                                                                                    e
                                                                                ) =>
                                                                                    setPets(
                                                                                        e
                                                                                            .target
                                                                                            .value
                                                                                    )
                                                                                }
                                                                            >
                                                                                <option value="">
                                                                                    --
                                                                                </option>
                                                                                {flatmatePets.map(
                                                                                    ({
                                                                                        id,
                                                                                        name,
                                                                                    }) => (
                                                                                        <option
                                                                                            key={
                                                                                                id
                                                                                            }
                                                                                            value={
                                                                                                id
                                                                                            }
                                                                                        >
                                                                                            {
                                                                                                name
                                                                                            }
                                                                                        </option>
                                                                                    )
                                                                                )}
                                                                            </select>
                                                                        </div>

                                                                        <div className="relative md:col-span-2">
                                                                            <InputLabel
                                                                                htmlFor="occupation"
                                                                                value="Flatmate Occupation"
                                                                            />
                                                                            <select
                                                                                name="occupation"
                                                                                value={
                                                                                    occupation
                                                                                }
                                                                                className="block w-full mt-1 bg-transparent border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                                                                onChange={(
                                                                                    e
                                                                                ) =>
                                                                                    setOccupation(
                                                                                        e
                                                                                            .target
                                                                                            .value
                                                                                    )
                                                                                }
                                                                            >
                                                                                <option value="">
                                                                                    --
                                                                                </option>
                                                                                {flatmateOccupation.map(
                                                                                    ({
                                                                                        id,
                                                                                        name,
                                                                                    }) => (
                                                                                        <option
                                                                                            key={
                                                                                                id
                                                                                            }
                                                                                            value={
                                                                                                id
                                                                                            }
                                                                                        >
                                                                                            {
                                                                                                name
                                                                                            }
                                                                                        </option>
                                                                                    )
                                                                                )}
                                                                            </select>
                                                                        </div>

                                                                        <div className="relative md:col-span-2">
                                                                            <InputLabel
                                                                                htmlFor="gender"
                                                                                value="Flatmate Gender"
                                                                            />
                                                                            <select
                                                                                name="gender"
                                                                                value={
                                                                                    gender
                                                                                }
                                                                                className="block w-full mt-1 bg-transparent border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                                                                onChange={(
                                                                                    e
                                                                                ) =>
                                                                                    setGender(
                                                                                        e
                                                                                            .target
                                                                                            .value
                                                                                    )
                                                                                }
                                                                            >
                                                                                <option value="">
                                                                                    --
                                                                                </option>
                                                                                {flatmateGender.map(
                                                                                    ({
                                                                                        id,
                                                                                        name,
                                                                                    }) => (
                                                                                        <option
                                                                                            key={
                                                                                                id
                                                                                            }
                                                                                            value={
                                                                                                id
                                                                                            }
                                                                                        >
                                                                                            {
                                                                                                name
                                                                                            }
                                                                                        </option>
                                                                                    )
                                                                                )}
                                                                            </select>
                                                                        </div>
                                                                    </div>

                                                                    <div className="flex justify-start px-8 mt-8 space-x-2">
                                                                        <PrimaryButton
                                                                            onClick={
                                                                                handleBack
                                                                            }
                                                                            className="group relative inline-flex w-40 items-center justify-center overflow-hidden rounded-full bg-[#FFF337] px-8 py-3 font-medium text-white transition duration-300 ease-out md:w-auto"
                                                                        >
                                                                            <span className="ease absolute inset-0 flex h-full w-full -translate-x-full items-center justify-center bg-[#FFF337] text-black duration-300 group-hover:translate-x-0">
                                                                                <ImArrowLeft2 className="w-5 h-5" />
                                                                            </span>
                                                                            <span className="absolute flex items-center justify-center w-full h-full text-black transition-all duration-300 transform ease group-hover:translate-x-full">
                                                                                Previous
                                                                            </span>
                                                                            <span className="relative invisible">
                                                                                Previous
                                                                            </span>
                                                                        </PrimaryButton>
                                                                    </div>
                                                                </>
                                                            )}
                                                    </div>
                                                ) : (
                                                    <FlatmateSearchModal
                                                        step={step}
                                                        handleBack={handleBack}
                                                        handleNext={handleNext}
                                                        flatmateGender={
                                                            flatmateGender
                                                        }
                                                        flatmateOccupation={
                                                            flatmateOccupation
                                                        }
                                                        flatmatePets={
                                                            flatmatePets
                                                        }
                                                        flatmateSmoker={
                                                            flatmateSmoker
                                                        }
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default SearchModal;
