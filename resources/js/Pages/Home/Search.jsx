import React, { useState, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { BsSliders } from "react-icons/bs";
import { SlMap } from "react-icons/sl";
import {
    FilterModal,
    Filters,
    MapCard,
    PropertyCard,
    LoadingSkeleton,
} from "@/Components";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, usePage } from "@inertiajs/react";
import { MeiliSearch } from "meilisearch";
import { MdOutlineApartment, MdOutlineBedroomParent } from "react-icons/md";
import { BsHouseFill } from "react-icons/bs";
import { ImOffice } from "react-icons/im";
import { MultiRangeSlider, Amenities } from "@/Components";
import { router } from "@inertiajs/react";
import { BsCheck } from "react-icons/bs";

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

const Search = (props) => {
    const { results, amenities } = usePage().props;
    const [isOpen, setIsOpen] = useState(false);
    const [toggleMap, setToggleMap] = useState(false);
    const [query, setQuery] = useState("");
    const [searchResults, setSearchResults] = useState(null);
    const [selectedHitIndex, setSelectedHitIndex] = useState(0);
    const [client, setClient] = useState(null);
    const indexUids = ["flats", "shareds", "rooms"];
    const [toggleActiveButton, setToggleActiveButton] = useState(1);
    const [toggleActivePlace, setToggleActivePlace] = useState(1);
    const [toggleActiveBedrooms, setToggleActiveBedrooms] = useState(1);
    const currentUrl = window.location.href;
    console.log(results);

    const activeButton = (index) => {
        setToggleActiveButton(index);
    };

    const activePlace = (index) => {
        setToggleActivePlace(index);
    };

    const activeBedroom = (index) => {
        setToggleActiveBedrooms(index);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const openModal = () => {
        setIsOpen(true);
    };

    const handleFilterChange = (filterName, filterValue) => {
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

    useEffect(() => {
        setClient(new MeiliSearch({ host: "http://localhost:7700" }));
    }, []);

    const search = async (query) => {
        if (query) {
            const searchResults = {};
            for (const indexUid of indexUids) {
                const response = await client.index(indexUid).search(query);
                searchResults[indexUid] = response;
            }
            setSearchResults(searchResults);
            console.log(searchResults);
        }
    };
    useEffect(() => {
        search(query);
    }, [query]);

    return (
        <GuestLayout user={props.auth.user}>
            <Head title="Search" />
            <div className="bg-white">
                <div className="mt-[5rem] mx-auto p-3">
                    <div className="flex md:relative items-center p-2 py-3 bg-white border border-[#f3f2f2] hover:border-[#bcbaba] rounded-full text-black font-bold font-popp text-lg">
                        <button onClick={openModal} className="lg:hidden">
                            <BsSliders className="absolute w-6 h-6 mr-5 -mt-3 right-2" />
                        </button>
                        <AiOutlineSearch className="w-7 h-7" />
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="w-full px-3 text-lg bg-transparent border-none focus:outline-none focus:border-none focus:ring-0 font-popp"
                            placeholder="Enter address, city or zipcode"
                        />
                    </div>
                    <FilterModal isOpen={isOpen} closeModal={closeModal} />
                    <div className="grid grid-cols-4 gap-12 mt-10">
                        <div className="lg:flex flex-col items-center lg:pl-[40px] lg:pr-[15px] space-y-2 hidden">
                            <div className="pl-[20px] [@media(max-width:480px)]:pl-0">
                                <div className="border border-[#f3f3f3] rounded-2xl flex justify-between gap-1 [@media(max-width:440px)]:flex-col">
                                    <button
                                        onClick={() => activeButton(1)}
                                        className={
                                            toggleActiveButton == "1"
                                                ? "text-white font-popp font-semibold lg:font-medium text-sm lg:text-xs bg-black px-[3rem] rounded-xl [@media(max-width:440px)]:py-3"
                                                : "text-black hover:text-white font-popp font-semibold lg:font-medium text-sm lg:text-xs px-[3rem] bg-white hover:bg-black rounded-xl py-2"
                                        }
                                    >
                                        Rent
                                    </button>
                                    <button
                                        onClick={() => activeButton(2)}
                                        className={
                                            toggleActiveButton == "2"
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
                                        {places.map((places, index) => (
                                            <div
                                                onClick={() => {
                                                    activePlace(index);
                                                    handleTypeChange(places.id);
                                                }}
                                                key={places.id}
                                                className={`${
                                                    toggleActivePlace == index
                                                        ? "border-black"
                                                        : "border-[#f3f3f3] [@media(max-width:340px)]:border-0"
                                                } h-[100px] w-[150px] [@media(max-width:340px)]:h-[80px] [@media(max-width:460px)]:w-[100px] lg:w-[130px] border rounded-xl flex flex-col items-center gap-3`}
                                            >
                                                <places.image className="mt-6 font-popp w-7 h-7" />
                                                <span className="font-popp text-[16px] mb-2 [@media(max-width:340px)]:hidden">
                                                    {places.title}
                                                </span>
                                            </div>
                                        ))}
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
                                        onChange={handlePriceChange}
                                    />
                                </div>
                                <div className="mt-[2rem]">
                                    <p className="text-sm font-semibold font-popp lg:pl-2 xl:pl-0">
                                        Bedroom
                                    </p>
                                    <div className="flex justify-center gap-2 place-items-center mt-3 [@media(max-width:400px)]:grid [@media(max-width:400px)]:grid-cols-3">
                                        {bedrooms.map((bedroom, index) => (
                                            <div
                                                onClick={() => {
                                                    activeBedroom(index);
                                                    handleSizeChange(
                                                        bedroom.id
                                                    );
                                                }}
                                                key={bedroom.id}
                                                className={`${
                                                    toggleActiveBedrooms ==
                                                    index
                                                        ? "bg-black text-white"
                                                        : "bg-white text-black"
                                                } p-1 py-2 px-3 lg:px-[9px] border border-[#f3f3f3] rounded-lg hover:bg-black hover:text-white`}
                                            >
                                                <span className="font-popp text-md">
                                                    {bedroom.title}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="mt-[2rem] lg:px-2 xl:px-0">
                                    <p className="text-sm font-semibold font-popp">
                                        Amenities
                                    </p>
                                    <div className="mt-[1rem] place-items-center">
                                        {amenities.map((amenity) => (
                                            <div
                                                key={amenity.id}
                                                className="flex justify-between mb-2"
                                            >
                                                <span className="mt-1 text-sm font-popp">
                                                    {amenity.name}
                                                </span>
                                                <label className="relative cursor-pointer">
                                                    <input
                                                        id="checkbox-1"
                                                        type="checkbox"
                                                        className="appearance-none h-6 w-6 border-2 rounded-[7px] border-[#f3f2f2]"
                                                    />
                                                    <BsCheck className="absolute w-8 h-8 text-white text-opacity-0 transition ease-out text-8xl -left-1 -top-1 check-1 after:bg-black" />
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <MapCard
                            toggleMap={toggleMap}
                            setToggleMap={setToggleMap}
                        />

                        <PropertyCard results={results} />
                    </div>
                    <div
                        className="fixed bottom-[6rem] left-[5rem] md:hidden"
                        style={{ transition: ".4s" }}
                    >
                        <button
                            onClick={() => setToggleMap(true)}
                            className="flex justify-center gap-2 p-3 py-3 text-sm font-semibold text-white bg-gray-800 rounded-full font-popp "
                        >
                            Show map
                            <SlMap className="mt-1" />
                        </button>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
};

export default Search;
