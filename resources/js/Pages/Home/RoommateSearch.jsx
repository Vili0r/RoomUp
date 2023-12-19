import React, { useState, useEffect, useRef } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, usePage, router, Link, useForm } from "@inertiajs/react";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import { DebounceInput } from "react-debounce-input";
import PrimaryButton from "@/Components/PrimaryButton";
import moment from "moment";
import { HousePlaceholder } from "@/assets";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BsEyeFill } from "react-icons/bs";

const RoommateSearch = (props) => {
    const { post } = useForm({});
    const { results, selectedRoommateQueries } = usePage().props;
    const [query, setQuery] = useState(selectedRoommateQueries.search || "");
    const [items, setItems] = useState(results.data);
    const [nextPage, setNextPage] = useState(results.links.next);
    const target = useRef(null);

    const showImage = () => {
        return "/storage/";
    };

    const submit = (e, id) => {
        e.preventDefault();

        post(`/roommate/${id}/favourite`, {
            preserveScroll: true,
            onSuccess: (response) => {
                setItems((prevData) => {
                    const updatedData = prevData.map((item) => {
                        if (item.id === id) {
                            // Assuming the backend returns the updated item with the 'liked' status.
                            return {
                                ...item,
                                favouritedBy: !item.favouritedBy,
                            };
                        }
                        return item;
                    });
                    return updatedData;
                });
            },
        });
    };

    const search = async (query) => {
        router.reload({
            data: { search: query },
            preserveScroll: true,
            onSuccess: (response) => {
                setItems(response.props.results.data);
            },
        });
    };

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                if (nextPage) {
                    axios.get(nextPage).then((response) => {
                        setItems((prevData) => [
                            ...prevData,
                            ...response.data.data,
                        ]);
                        setNextPage(response.data.links.next);
                    });
                }
            });
        });

        if (target.current) {
            observer.observe(target.current);
        }

        // Cleanup function
        return () => {
            if (target.current) {
                observer.unobserve(target.current); // Stop observing the element when the component is unmounted
            }
        };
    }, [nextPage]);

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
                            <div
                                className="col-span-1 cursor-pointer group"
                                key={index}
                            >
                                <div className="flex flex-col w-full gap-2">
                                    <div className="relative w-full overflow-hidden aspect-square rounded-xl">
                                        <Link
                                            href={route(
                                                "single.roommate.show",
                                                roommate.id
                                            )}
                                        >
                                            <img
                                                className="object-cover w-full h-full transition group-hover:scale-110"
                                                src={
                                                    roommate.images
                                                        ? showImage() +
                                                          roommate.images[0]
                                                        : HousePlaceholder
                                                }
                                                alt=""
                                            />
                                        </Link>

                                        <form
                                            onSubmit={(e) =>
                                                submit(e, roommate.id)
                                            }
                                        >
                                            <div className="absolute top-3 right-3">
                                                <PrimaryButton className="relative transition cursor-pointer hover:opacity-80">
                                                    <AiOutlineHeart
                                                        size={28}
                                                        className="fill-white absolute -top-[2px] -right-[2px]"
                                                    />
                                                    <AiFillHeart
                                                        size={24}
                                                        className={
                                                            roommate.favouritedBy
                                                                ? "fill-rose-500"
                                                                : "fill-neutral-500/70"
                                                        }
                                                    />
                                                </PrimaryButton>
                                            </div>
                                        </form>
                                    </div>
                                    <Link
                                        href={route(
                                            "single.roommate.show",
                                            roommate.id
                                        )}
                                    >
                                        <div className="flex flex-row items-start justify-between mt-4">
                                            <div>
                                                <p className="text-sm font-bold text-gray-800">
                                                    {roommate.city},{" "}
                                                    {roommate.area}
                                                </p>
                                                <p className="text-sm text-gray-800">
                                                    {roommate.title}
                                                </p>
                                                <p className="text-sm text-gray-800">
                                                    Available from{" "}
                                                    <span className="font-semibold">
                                                        {moment(
                                                            roommate
                                                                .availability
                                                                .available_from
                                                        ).format(
                                                            "MMM DD, YYYY"
                                                        )}
                                                    </span>
                                                </p>
                                                <p className="text-sm text-gray-800">
                                                    Searching for{" "}
                                                    <span className="font-semibold">
                                                        {roommate.searching_for}
                                                    </span>
                                                </p>
                                                <p className="mt-2 text-sm text-gray-800">
                                                    <strong>
                                                        ${roommate.budget}
                                                    </strong>{" "}
                                                    /month
                                                </p>
                                            </div>
                                            <div className="flex flex-row items-center">
                                                <dt className="sr-only">
                                                    Saved
                                                </dt>
                                                <dd className="flex items-center text-indigo-600 dark:text-indigo-400">
                                                    <BsEyeFill className="w-5 h-5 mr-1 stroke-current dark:stroke-indigo-500" />
                                                    <span>
                                                        ({roommate.views})
                                                    </span>
                                                </dd>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        ))}
                        <div ref={target} className="-translate-y-32"></div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
};

export default RoommateSearch;
