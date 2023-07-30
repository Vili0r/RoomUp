import React, { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { MdOutlineApartment, MdOutlineBedroomParent } from "react-icons/md";
import { BsHouseFill } from "react-icons/bs";
import { ImOffice, ImArrowRight2, ImArrowLeft2 } from "react-icons/im";
import { router, usePage } from "@inertiajs/react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import {
    MultiRangeSlider,
    PrimaryButton,
    TextInput,
    RoommateSearchModal,
} from "@/Components";
import { AiOutlineClose } from "react-icons/ai";
import {
    bedrooms,
    modes,
    furnishings,
    flatmateGender,
    flatmateOccupation,
    flatmateSmoker,
    flatmatePets,
    currentOccupants,
    availableRooms,
    minutes,
    stations,
    amenities,
} from "@/arrays/Array";

const places = [
    { id: 1, title: "Apartment", image: MdOutlineApartment },
    { id: 2, title: "Full House", image: BsHouseFill },
    { id: 3, title: "Property", image: ImOffice },
    { id: 4, title: "Room", image: MdOutlineBedroomParent },
];

const SearchModal = ({ isOpen, closeModal }) => {
    const { selectedPropertyQueries, selectedRoommateQueries } =
        usePage().props;
    const amenitiesArray = selectedPropertyQueries?.filter?.amenity
        .split(",")
        .map(Number);
    const selectedAmenitiesOptions = amenities
        .filter((amenity) => amenitiesArray?.includes(amenity.id))
        .map((item) => ({
            label: item.name,
            value: item.id,
        }));
    const animatedComponents = makeAnimated();
    const [selectedAmenities, setSelectedAmenities] = useState(
        selectedAmenitiesOptions ?? []
    );
    const [toggleActiveButton, setToggleActiveButton] = useState(
        selectedPropertyQueries?.search ||
            selectedPropertyQueries?.search === null
            ? 1
            : 2
    );
    const [step, setStep] = useState(1);
    const [type, setType] = useState(
        selectedPropertyQueries?.search_type === "shareds" ? 4 : ""
    );
    const [size, setSize] = useState(
        selectedPropertyQueries?.filter?.size ?? ""
    );
    const [query, setQuery] = useState(selectedPropertyQueries?.search ?? "");
    const [availability, setAvailability] = useState(
        selectedPropertyQueries?.filter?.availability?.available_from ?? ""
    );
    const [min, setMin] = useState(
        selectedPropertyQueries?.filter?.min_price ?? 0
    );
    const [max, setMax] = useState(
        selectedPropertyQueries?.filter?.max_price ?? 10000
    );
    const [minute, setMinute] = useState(
        selectedPropertyQueries?.filter?.minute ?? ""
    );
    const [mode, setMode] = useState(
        selectedPropertyQueries?.filter?.mode ?? ""
    );
    const [station, setStation] = useState(
        selectedPropertyQueries?.filter?.station ?? ""
    );
    const [furnished, setFurnished] = useState(
        selectedPropertyQueries?.filter?.furnished ?? ""
    );
    const [availableRoom, setAvailableRoom] = useState(
        selectedPropertyQueries?.filter?.available_rooms ?? ""
    );
    const [currentOccupant, setCurrentOccupant] = useState(
        selectedPropertyQueries?.filter?.current_occupants ?? ""
    );
    const [smoker, setSmoker] = useState(
        selectedPropertyQueries?.filter?.current_flatmate_smoker ?? ""
    );
    const [gender, setGender] = useState(
        selectedPropertyQueries?.filter?.current_flatmate_gender ?? ""
    );
    const [occupation, setOccupation] = useState(
        selectedPropertyQueries?.filter?.current_flatmate_occupation ?? ""
    );
    const [pets, setPets] = useState(
        selectedPropertyQueries?.filter?.current_flatmate_pets ?? ""
    );

    const handleMinChange = (value) => {
        setMin(value);
    };

    const handleMaxChange = (value) => {
        setMax(value);
    };

    const activeButton = (index) => {
        setToggleActiveButton(index);
        setStep(1);
    };

    //next step
    const handleNext = () => {
        setStep(step + 1);
    };
    const handleBack = () => {
        setStep(step - 1);
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
            let amenities = selectedAmenities.map((item) => item.value);
            href += "&filter[amenity]=" + amenities + "&";
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

    const amenitiesOptions = amenities.map((item) => {
        return {
            label: item.name,
            value: item.id,
        };
    });

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

                <div className="fixed inset-0 pt-12 overflow-y-auto md:p-10">
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
                                                <div className="flex justify-between">
                                                    <h1 className="xs:text-[40px] text-[30px] font-bold tracking-tight text-[#2f2963]">
                                                        Find your property
                                                    </h1>
                                                    <button
                                                        onClick={closeModal}
                                                        className="absolute top-5 right-5 md:hidden"
                                                    >
                                                        <AiOutlineClose
                                                            size={28}
                                                        />
                                                    </button>
                                                </div>
                                                <p className="mt-5 opacity-50">
                                                    Select through the multiple
                                                    filter to find your ideal
                                                    room or property.
                                                </p>

                                                <div className="border border-[#f3f3f3] rounded-2xl flex justify-between gap-1"></div>

                                                <div className="flex justify-start mt-5">
                                                    <div>
                                                        <div className="w-full rounded-2xl relative flex justify-start gap-x-[5rem]">
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
                                                                step === 3 ||
                                                                step === 2 ||
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
                                                                                            : "border-gray-200"
                                                                                    } relative font-semibold transition-all duration-150 justify-center transform items-center-full ease ease-in-out group-hover:translate-x-full h-[100px] w-[150px] [@media(max-width:340px)]:h-[80px] [@media(max-width:460px)]:w-[100px] lg:w-[130px] border rounded-xl flex flex-col items-center gap-3`}
                                                                                >
                                                                                    <places.image className="mt-6 font-popp w-7 h-7 [@media(max-width:340px)]:mt-0" />
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
                                                                <div className="mt-[1rem] ml-8">
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

                                                                <div className="mt-[2rem] [@media(max-width:340px)]:m-4">
                                                                    <p className="text-sm font-semibold font-popp lg:pl-2 xl:pl-0">
                                                                        Amenities
                                                                    </p>
                                                                    <Select
                                                                        closeMenuOnSelect={
                                                                            false
                                                                        }
                                                                        components={
                                                                            animatedComponents
                                                                        }
                                                                        onChange={(
                                                                            opt
                                                                        ) =>
                                                                            setSelectedAmenities(
                                                                                opt
                                                                            )
                                                                        }
                                                                        isMulti
                                                                        maxValues={
                                                                            15
                                                                        }
                                                                        options={
                                                                            amenitiesOptions
                                                                        }
                                                                        value={
                                                                            selectedAmenities
                                                                        }
                                                                    />
                                                                </div>

                                                                <div className="mt-[2rem]">
                                                                    <p className="text-sm font-semibold font-popp lg:pl-2 xl:pl-0">
                                                                        Bedroom
                                                                    </p>
                                                                    <div className="flex justify-center gap-2 place-items-center [@media(max-width:450px)]:grid [@media(max-width:450px)]:grid-cols-3">
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
                                                                <div className="grid grid-cols-1 gap-6 px-4 mt-7 xs:grid-cols-2">
                                                                    <div className="relative h-10 w-full min-w-[200px]">
                                                                        <p className="text-sm font-semibold font-popp lg:pl-2 xl:pl-0">
                                                                            Availability
                                                                        </p>
                                                                        <TextInput
                                                                            type="date"
                                                                            autoComplete="off"
                                                                            name="availability"
                                                                            value={
                                                                                availability
                                                                            }
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

                                                                    <div className="relative [@media(max-width:479px)]:mt-4">
                                                                        <p className="text-sm font-semibold font-popp lg:pl-2 xl:pl-0">
                                                                            Enter
                                                                            Address
                                                                        </p>
                                                                        <TextInput
                                                                            type="text"
                                                                            name="query"
                                                                            id="query"
                                                                            placeholder="Enter address"
                                                                            value={
                                                                                query
                                                                            }
                                                                            className="w-full px-3 py-3 bg-transparent border border-gray-300 rounded-md shadow peer shadow-gray-100 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                                                                            autoComplete="off"
                                                                            onChange={(
                                                                                e
                                                                            ) =>
                                                                                setQuery(
                                                                                    e
                                                                                        .target
                                                                                        .value
                                                                                )
                                                                            }
                                                                        />
                                                                    </div>
                                                                </div>

                                                                <div className="grid grid-cols-1 gap-4 m-4 text-sm xxs:grid-cols-2 gap-y-2 sm:grid-cols-6 mt-7">
                                                                    <div className="relative sm:col-span-2">
                                                                        <p className="text-sm font-semibold font-popp lg:pl-2 xl:pl-0">
                                                                            Minutes
                                                                        </p>
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

                                                                    <div className="relative sm:col-span-2">
                                                                        <p className="text-sm font-semibold font-popp lg:pl-2 xl:pl-0">
                                                                            Mode
                                                                        </p>
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

                                                                    <div className="relative sm:col-span-2">
                                                                        <p className="text-sm font-semibold font-popp lg:pl-2 xl:pl-0">
                                                                            Station
                                                                        </p>
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

                                                                <div className="relative w-full px-4 mt-5 sm:w-1/2">
                                                                    <p className="text-sm font-semibold font-popp lg:pl-2 xl:pl-0">
                                                                        Furnished
                                                                    </p>
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
                                                            step === 4 && (
                                                                <>
                                                                    <div className="grid grid-cols-1 gap-4 text-sm xxs:m-4 gap-y-2 sm:grid-cols-6 mt-7">
                                                                        <div className="relative sm:col-span-2">
                                                                            <p className="text-sm font-semibold font-popp lg:pl-2 xl:pl-0">
                                                                                Pets
                                                                            </p>
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

                                                                        <div className="relative sm:col-span-2">
                                                                            <p className="text-sm font-semibold font-popp lg:pl-2 xl:pl-0">
                                                                                Flatmate
                                                                                Occupation
                                                                            </p>
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

                                                                        <div className="relative sm:col-span-2">
                                                                            <p className="text-sm font-semibold font-popp lg:pl-2 xl:pl-0">
                                                                                Flatmate
                                                                                Gender
                                                                            </p>
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

                                                                    <div className="grid grid-cols-1 gap-4 text-sm xxs:m-4 xxs:grid-cols-2 gap-y-2 sm:grid-cols-6 mt-7">
                                                                        <div className="relative sm:col-span-2">
                                                                            <p className="text-sm font-semibold font-popp lg:pl-2 xl:pl-0">
                                                                                Available
                                                                                Rooms
                                                                            </p>
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

                                                                        <div className="relative sm:col-span-2">
                                                                            <p className="text-sm font-semibold font-popp lg:pl-2 xl:pl-0">
                                                                                Current
                                                                                Occupant
                                                                            </p>

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

                                                                        <div className="relative sm:col-span-2">
                                                                            <p className="text-sm font-semibold font-popp lg:pl-2 xl:pl-0">
                                                                                Flatmate
                                                                                smoker
                                                                            </p>
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
                                                    <RoommateSearchModal
                                                        step={step}
                                                        handleBack={handleBack}
                                                        handleNext={handleNext}
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
