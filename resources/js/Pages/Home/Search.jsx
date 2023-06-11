import React, { useState, useMemo, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { BsSliders } from "react-icons/bs";
import { SlMap } from "react-icons/sl";
import {
    FilterModal,
    Filters,
    MapCard,
    PropertyCard,
    LoadingSkeleton,
    SearchModal,
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
    const { results, amenities, selectedQueries } = usePage().props;
    const [isOpen, setIsOpen] = useState(false);

    const closeModal = () => {
        setIsOpen(false);
    };

    const openModal = () => {
        setIsOpen(true);
    };

    return (
        <GuestLayout user={props.auth.user}>
            <Head title="Search" />
            <div className="">
                <SearchModal isOpen={isOpen} closeModal={closeModal} />
            </div>
        </GuestLayout>
    );
};

export default Search;
