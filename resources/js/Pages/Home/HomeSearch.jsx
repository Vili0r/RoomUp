import React, { useState, useEffect } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, usePage, Link, router } from "@inertiajs/react";
import { Loading, MapCard } from "@/Components";
import moment from "moment";
import { HousePlaceholder } from "@/assets";
import { SlMap } from "react-icons/sl";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { MdOutlineBookmarkAdd } from "react-icons/md";

const HomeSearch = (props) => {
    const { properties, loading } = usePage().props;
    const [isLoading, setIsLoading] = useState(true);
    const [toggleMap, setToggleMap] = useState(false);
    useEffect(() => {
        setIsLoading(loading);
    }, [properties]);
    console.log(properties);

    const showImage = () => {
        return "/storage/";
    };

    const toggleFavourite = (id, model, favourite) => {
        router.put(`/property/${model}/${id}/favourite`, {
            is_favourite: !favourite,
        });
    };

    return (
        <GuestLayout user={props.auth.user}>
            <Head title="Search Results" />
            <div className="">
                {!isLoading ? (
                    <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4 mt-[5rem]">
                        <div className="grid grid-cols-1 gap-12 mt-10 lg:grid-cols-4">
                            <MapCard
                                toggleMap={toggleMap}
                                setToggleMap={setToggleMap}
                            />

                            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 lg:col-span-2 lg:gap-4 ">
                                {properties.data.map((property) => (
                                    <div
                                        className="col-span-1 cursor-pointer group"
                                        key={property.id}
                                    >
                                        <div className="flex flex-col w-full gap-2">
                                            <div className="relative w-full overflow-hidden aspect-square rounded-xl">
                                                <Link
                                                    href={route(
                                                        "property.show",
                                                        [
                                                            property.model,
                                                            property.owner.id,
                                                        ]
                                                    )}
                                                >
                                                    <img
                                                        className="object-cover w-full h-full transition group-hover:scale-110"
                                                        src={
                                                            property.owner
                                                                .images[0]
                                                                ? showImage() +
                                                                  property.owner
                                                                      .images[0]
                                                                : HousePlaceholder
                                                        }
                                                        alt=""
                                                    />
                                                </Link>

                                                <div className="absolute top-3 right-3">
                                                    <div
                                                        onClick={() =>
                                                            toggleFavourite(
                                                                property.owner
                                                                    .id,
                                                                property.model,
                                                                property.owner
                                                                    .is_favourite
                                                            )
                                                        }
                                                        className="relative transition cursor-pointer hover:opacity-80"
                                                    >
                                                        <AiOutlineHeart
                                                            size={28}
                                                            className="fill-white absolute -top-[2px] -right-[2px]"
                                                        />
                                                        <AiFillHeart
                                                            size={24}
                                                            className={
                                                                property.owner
                                                                    .is_favourite
                                                                    ? "fill-rose-500"
                                                                    : "fill-neutral-500/70"
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <Link
                                                href={route("property.show", [
                                                    property.model,
                                                    property.owner.id,
                                                ])}
                                            >
                                                <div className="flex flex-row items-start justify-between mt-4">
                                                    <div>
                                                        <p className="text-sm font-bold text-gray-800">
                                                            {property.address_1}
                                                            ,{property.area}
                                                        </p>
                                                        <p className="text-sm text-gray-800">
                                                            {
                                                                property.owner
                                                                    .title
                                                            }
                                                        </p>
                                                        <p className="text-sm text-gray-800">
                                                            Available from{" "}
                                                            <span className="font-semibold">
                                                                {/* {moment(
                                                    property.availability
                                                        ? property.availability
                                                              .available_from
                                                        : property.rooms
                                                              .available_from
                                                ).format("MMM DD, YYYY")} */}
                                                            </span>
                                                        </p>
                                                        <p className="mt-2 text-sm text-gray-800">
                                                            <strong>
                                                                $
                                                                {
                                                                    property
                                                                        .owner
                                                                        .cost
                                                                }
                                                            </strong>{" "}
                                                            /month
                                                        </p>
                                                    </div>
                                                    <div className="flex flex-row items-center">
                                                        <dt className="sr-only">
                                                            Saved
                                                        </dt>
                                                        <dd className="flex items-center text-indigo-600 dark:text-indigo-400">
                                                            <MdOutlineBookmarkAdd className="w-5 h-5 mr-1 stroke-current dark:stroke-indigo-500" />
                                                            <span>(128)</span>
                                                        </dd>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex justify-end mb-5 text-center">
                            <Link
                                href={properties.links.next}
                                className="px-2 py-3 bg-[#f3f3f3] mx-auto text-sm font-semibold rounded-xl font-popp mt-[5rem] text-black"
                            >
                                ... 15 more
                            </Link>
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
                ) : (
                    <Loading />
                )}
            </div>
        </GuestLayout>
    );
};

export default HomeSearch;
