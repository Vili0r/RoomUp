import React, { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { MdOutlineApartment, MdOutlineBedroomParent } from "react-icons/md";
import { BsHouseFill } from "react-icons/bs";
import { ImOffice } from "react-icons/im";
import { router } from "@inertiajs/react";
import { BsCheck } from "react-icons/bs";
import { PrimaryButton } from ".";

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
    const currentUrl = window.location.href;
    console.log(selectedQueries);

    const activeButton = (index) => {
        setToggleActiveButton(index);
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
                    <div className="flex items-center justify-center min-h-full p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                <div className="text-sm text-gray-500">
                                    <div className="relative flex flex-col items-center justify-center h-full py-6 overflow-hidden bg-gray-50 sm:py-12">
                                        <div className="absolute inset-auto scale-150 bg-orange-200 h-96 w-96 opacity-20 blur-3xl"></div>

                                        <div className="absolute inset-auto scale-150 translate-x-full bg-green-200 h-96 w-96 opacity-20 blur-3xl"></div>
                                        <div className="w-full">
                                            <div className="max-w-lg px-10 mb-6">
                                                <h1 className="text-[40px] font-bold tracking-tight text-[#2f2963]">
                                                    Find your property
                                                </h1>
                                            </div>

                                            <div className="lg:flex flex-col items-center lg:pl-[40px] lg:pr-[15px] space-y-2 hidden">
                                                <div className="pl-[20px] [@media(max-width:480px)]:pl-0">
                                                    <div className="border border-[#f3f3f3] rounded-2xl flex justify-between gap-1 [@media(max-width:440px)]:flex-col">
                                                        <button
                                                            onClick={() =>
                                                                activeButton(1)
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
                                                        <button
                                                            onClick={() =>
                                                                activeButton(2)
                                                            }
                                                            className={
                                                                toggleActiveButton ==
                                                                "2"
                                                                    ? "text-white font-popp font-semibold lg:font-medium text-sm lg:text-xs bg-black px-[3rem] rounded-xl [@media(max-width:440px)]:py-3"
                                                                    : "text-black hover:text-white font-popp font-semibold lg:text-xs lg:font-medium text-sm px-[3rem] bg-white hover:bg-black rounded-xl py-2"
                                                            }
                                                        >
                                                            Flatmate
                                                        </button>
                                                    </div>
                                                    <div className="mt-[2rem]">
                                                        <p className="text-sm font-semibold font-popp lg:pl-2 xl:pl-0">
                                                            Type of places
                                                        </p>
                                                        <div className="grid grid-cols-2 gap-3 [@media(max-width:350px)]:gap-x-7 lg:space-y-2 xl:gap-3 mt-[1rem] place-items-center">
                                                            {places.map(
                                                                (
                                                                    places,
                                                                    index
                                                                ) => (
                                                                    <div
                                                                        onClick={() =>
                                                                            handleTypeChange(
                                                                                places.id
                                                                            )
                                                                        }
                                                                        key={
                                                                            places.id
                                                                        }
                                                                        className={`${
                                                                            selectedQueries
                                                                                ?.filter
                                                                                ?.type ==
                                                                            places.id
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
                                                                            handleSizeChange(
                                                                                bedroom.id
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
                                                    <div className="mt-[2rem] lg:px-2 xl:px-0">
                                                        <p className="text-sm font-semibold font-popp">
                                                            Amenities
                                                        </p>
                                                        <div className="mt-[1rem] place-items-center">
                                                            {amenities?.map(
                                                                (amenity) => (
                                                                    <div
                                                                        key={
                                                                            amenity.id
                                                                        }
                                                                        className="flex justify-between mb-2"
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
                                                </div>
                                            </div>
                                        </div>

                                        <PrimaryButton
                                            type="button"
                                            className="flex px-4 py-2 text-sm font-medium text-white bg-gray-900 border border-transparent rounded-md hover:bg-black font-popp focus:outline-none"
                                            onClick={handleFilterSubmit}
                                        >
                                            Search!
                                        </PrimaryButton>
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
