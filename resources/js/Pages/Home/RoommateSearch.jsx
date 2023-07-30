import React, { useState, useEffect } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, usePage, router } from "@inertiajs/react";
import { RoommateCard } from "@/Components";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import { DebounceInput } from "react-debounce-input";

const RoommateSearch = (props) => {
    const { results, loading, selectedRoommateQueries } = usePage().props;
    const [isLoading, setIsLoading] = useState(false);
    const [query, setQuery] = useState(selectedRoommateQueries.search || "");
    const [items, setItems] = useState(results.data);
    const [initialUrl, setInitialUrl] = useState(usePage().url);

    const search = async (query) => {
        router.reload({
            data: { search: query },
            preserveScroll: true,
            onSuccess: (response) => {
                setItems(response.props.results.data);
            },
        });
    };

    const loadMoreItems = () => {
        setIsLoading(true);

        router.get(
            results.links.next,
            {},
            {
                preserveScroll: true,
                preserveState: true,
                onSuccess: (response) => {
                    window.history.replaceState({}, "", initialUrl);

                    setItems((prevItems) => [
                        ...prevItems,
                        ...response.props.results.data,
                    ]);
                },
                onFinish: () => {
                    setIsLoading(false);
                },
            }
        );
    };

    const handleScroll = () => {
        if (
            document.documentElement.offsetHeight -
                document.documentElement.scrollTop -
                window.innerHeight <
                200 ||
            isLoading
        ) {
            return;
        }

        loadMoreItems();
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [isLoading]);

    return (
        <GuestLayout user={props.auth.user}>
            <Head title="Search Results" />
            <div className="">
                <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4 mt-[5rem]">
                    <div className="flex relative items-center p-2 py-3 bg-white border border-[#f3f2f2] hover:border-[#bcbaba] rounded-full text-black font-bold font-popp text-lg">
                        <AiOutlineSearch className="w-7 h-7" />
                        <DebounceInput
                            value={query}
                            minLength={1}
                            debounceTimeout={500}
                            onChange={(e) => {
                                search(e.target.value);
                                setQuery(e.target.value);
                            }}
                            className="w-full px-3 text-lg bg-transparent border-none focus:outline-none focus:border-none focus:ring-0 font-popp"
                            placeholder="Enter area, city or title"
                        />
                        <button
                            onClick={() => {
                                setQuery("");
                                search("");
                            }}
                            className="absolute top-5 right-5"
                        >
                            <AiOutlineClose size={28} />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 mt-[6rem] sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xxl:grid-cols-6 gap-8">
                        {items.map((roommate, index) => (
                            <RoommateCard key={index} roommate={roommate} />
                        ))}
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
};

export default RoommateSearch;
