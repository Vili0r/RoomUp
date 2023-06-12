import React, { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { MdOutlineApartment, MdOutlineBedroomParent } from "react-icons/md";
import { BsHouseFill } from "react-icons/bs";
import { ImOffice, ImArrowRight2, ImArrowLeft2 } from "react-icons/im";
import { router } from "@inertiajs/react";
import { BsCheck } from "react-icons/bs";
import { PrimaryButton, SecondaryButton } from ".";

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

const SearchModal = ({
    isOpen,
    closeModal,
    amenities,
    searchResults,
    selectedQueries,
}) => {
    const [selectedAmenities, setSelectedAmenities] = useState([]);
    const [toggleActiveButton, setToggleActiveButton] = useState(1);
    const [step, setStep] = useState(1);
    const [toggleActivePlace, setToggleActivePlace] = useState(1);
    const [toggleActiveBedrooms, setToggleActiveBedrooms] = useState(1);
    const currentUrl = window.location.href;
    console.log(selectedQueries);

    const activeButton = (index) => {
        setToggleActiveButton(index);
        console.log("place");
    };

    const activePlace = (index) => {
        setToggleActivePlace(index);
    };

    const activeBedroom = (index) => {
        setToggleActiveBedrooms(index);
    };

    //next step
    const handleNext = () => {
        setStep(step + 1);
    };
    const handleBack = () => {
        setStep(step - 1);
    };
    const handleFilterSubmit = (filterName, filterValue) => {
        let url = new URL(currentUrl);
        let searchParams = new URLSearchParams(url.search);
        let filters = JSON.parse(searchParams.get("filter") || "{}");

        if (filterName && filterValue) {
            filters[filterName] = filterValue;
        }

        if (filterName === "type" && filterValue === 4) {
            // Reset the URL and filters when selecting type 4
            url = new URL("/search", window.location.origin);
            searchParams = new URLSearchParams();
            filters = {};
        } else if (filterName === "type" && filterValue !== 4) {
            // Reset the URL and filters when switching from type 4 to other types
            url = new URL("/search", window.location.origin);
            searchParams = new URLSearchParams();
            filters = {};
            filters[filterName] = filterValue;
        }

        searchParams.delete("filter");

        Object.entries(filters).forEach(([key, value]) => {
            searchParams.set(`filter[${key}]`, value);
        });

        url.search = searchParams.toString();

        if (filterName === "type" && filterValue === 4) {
            router.visit(
                url.pathname + url.search,
                {
                    data: {
                        search_type: "shareds",
                    },
                },
                { preserveScroll: true }
            );
        } else {
            router.visit(url.pathname + url.search, { preserveScroll: true });
        }
    };

    const handleSizeChange = (id) => {
        handleFilterChange("size", id);
    };

    const handleTypeChange = (id) => {
        handleFilterChange("type", id);
    };

    const handlePriceChange = (event) => {
        const priceValue = event.target.value;
        handleFilterChange("max_price", priceValue);
    };

    const handleAmenityChange = (id) => {
        // Check if the ID already exists in selectedAmenities
        // const isSelected = selectedAmenities.includes(id);

        // if (isSelected) {
        //     // Remove the ID from the selectedAmenities array
        //     setSelectedAmenities(
        //         selectedAmenities.filter((amenityId) => amenityId !== id)
        //     );
        // } else {
        //     // Add the ID to the selectedAmenities array
        //     setSelectedAmenities([...selectedAmenities, id]);
        // }
        handleFilterChange("amenity", id);
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
                                                <button
                                                    onClick={handleFilterSubmit}
                                                    className="relative inline-flex items-center justify-center px-4 py-2 mt-4 overflow-hidden text-base font-medium text-white transition duration-300 ease-out bg-black rounded-lg group hover:scale-105 hover:shadow-orange-600 active:translate-y-1"
                                                >
                                                    <span className="absolute inset-0 transition duration-300 ease-out opacity-0 bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 group-hover:opacity-100 group-active:opacity-90"></span>
                                                    <span className="relative group-hover:text-white">
                                                        Search
                                                    </span>
                                                </button>
                                            </div>

                                            <div className="flex flex-col items-center space-y-2">
                                                <div className="">
                                                    {step == "1" && (
                                                        <>
                                                            <div className="border border-[#f3f3f3] rounded-2xl flex justify-between gap-1 [@media(max-width:440px)]:flex-col">
                                                                <button
                                                                    onClick={() =>
                                                                        setToggleActiveButton(
                                                                            1
                                                                        )
                                                                    }
                                                                    className={
                                                                        toggleActiveButton ==
                                                                        "1"
                                                                            ? "text-white font-popp font-semibold lg:font-medium text-sm lg:text-xs bg-black px-[3rem] rounded-xl [@media(max-width:440px)]:py-3"
                                                                            : "text-black hover:text-white font-popp font-semibold lg:font-medium text-sm lg:text-xs px-[3rem] bg-white hover:bg-black rounded-xl py-2"
                                                                    }
                                                                >
                                                                    Rent
                                                                </button>
                                                                <PrimaryButton
                                                                    onClick={() =>
                                                                        setToggleActiveButton(
                                                                            2
                                                                        )
                                                                    }
                                                                    className={
                                                                        toggleActiveButton ==
                                                                        "2"
                                                                            ? "text-white font-popp font-semibold lg:font-medium text-sm lg:text-xs bg-black px-[3rem] rounded-xl [@media(max-width:440px)]:py-3"
                                                                            : "text-black hover:text-white font-popp font-semibold lg:text-xs lg:font-medium text-sm px-[3rem] bg-white hover:bg-black rounded-xl py-2"
                                                                    }
                                                                >
                                                                    Flatmate
                                                                </PrimaryButton>
                                                            </div>
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
                                                                                    activePlace(
                                                                                        index
                                                                                    )
                                                                                }
                                                                                key={
                                                                                    places.id
                                                                                }
                                                                                className={`${
                                                                                    toggleActivePlace ==
                                                                                    index
                                                                                        ? "border-black"
                                                                                        : "border-[#f3f3f3] [@media(max-width:340px)]:border-0"
                                                                                } h-[100px] w-[150px] [@media(max-width:340px)]:h-[80px] [@media(max-width:460px)]:w-[100px] lg:w-[130px] border rounded-xl flex flex-col items-center gap-3`}
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
                                                    {step == "2" && (
                                                        <>
                                                            <div className="mt-[2rem]">
                                                                <p className="text-sm font-semibold font-popp lg:pl-2 xl:pl-0">
                                                                    Price Range
                                                                </p>

                                                                <input
                                                                    type="range"
                                                                    min="0"
                                                                    max="15000"
                                                                    className="mt-2"
                                                                    value={
                                                                        selectedQueries
                                                                            .filter
                                                                            ?.max_price ||
                                                                        0
                                                                    }
                                                                    onChange={
                                                                        handlePriceChange
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
                                                                                    activeBedroom(
                                                                                        index
                                                                                    )
                                                                                }
                                                                                key={
                                                                                    bedroom.id
                                                                                }
                                                                                className={`${
                                                                                    selectedQueries
                                                                                        .filter
                                                                                        ?.size ==
                                                                                    bedroom.id
                                                                                        ? "bg-black text-white"
                                                                                        : "bg-white text-black"
                                                                                } p-1 py-2 px-3 lg:px-[9px] border border-[#f3f3f3] rounded-lg hover:bg-black hover:text-white`}
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

                                                            <div className="flex justify-end mt-6 space-x-2">
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

                                                    {step == "3" && (
                                                        <>
                                                            <div className="mt-[2rem] lg:px-2 xl:px-0">
                                                                <p className="text-sm font-semibold font-popp">
                                                                    Amenities
                                                                </p>
                                                                <div className="mt-[1rem] place-items-center">
                                                                    {amenities?.map(
                                                                        (
                                                                            amenity
                                                                        ) => (
                                                                            <div
                                                                                key={
                                                                                    amenity.id
                                                                                }
                                                                                className="flex justify-between mb-2 space-x-[5rem]"
                                                                            >
                                                                                <span className="mt-1 text-sm font-popp">
                                                                                    {
                                                                                        amenity.name
                                                                                    }
                                                                                </span>
                                                                                <label className="relative cursor-pointer">
                                                                                    <input
                                                                                        id="checkbox-1"
                                                                                        type="checkbox"
                                                                                        // onChange={() =>
                                                                                        //     handleAmenityChange(
                                                                                        //         amenity.id
                                                                                        //     )
                                                                                        // }
                                                                                        // checked={selectedAmenities.includes(
                                                                                        //     amenity.id
                                                                                        // )}
                                                                                        className="appearance-none h-6 w-6 border-2 rounded-[7px] border-[#f3f2f2]"
                                                                                    />
                                                                                    <BsCheck className="absolute w-8 h-8 text-white text-opacity-0 transition ease-out text-8xl -left-1 -top-1 check-1 after:bg-black" />
                                                                                </label>
                                                                            </div>
                                                                        )
                                                                    )}
                                                                </div>
                                                            </div>

                                                            <div className="flex justify-start mt-6 space-x-2">
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
