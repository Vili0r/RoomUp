import React, { useState, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { BsSliders } from "react-icons/bs";
import { SlMap } from "react-icons/sl";
import { FilterModal, Filters, MapCard, PropertyCard } from "@/Components";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head } from "@inertiajs/react";
import { MeiliSearch } from "meilisearch";

const Search = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [toggleMap, setToggleMap] = useState(false);
    const [query, setQuery] = useState("");
    const [searchResults, setSearchResults] = useState(null);
    const [selectedHitIndex, setSelectedHitIndex] = useState(0);
    const [client, setClient] = useState(null);
    const indexUids = ["flats", "shareds", "rooms"];

    const closeModal = () => {
        setIsOpen(false);
    };

    const openModal = () => {
        setIsOpen(true);
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
                            <Filters />
                        </div>
                        <MapCard
                            toggleMap={toggleMap}
                            setToggleMap={setToggleMap}
                        />
                        <PropertyCard />
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
