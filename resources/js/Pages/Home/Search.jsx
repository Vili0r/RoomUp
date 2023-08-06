import React, { useState, useEffect, useRef } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, usePage, Link, useForm } from "@inertiajs/react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BsEyeFill } from "react-icons/bs";
import { HousePlaceholder } from "@/assets";
import { PrimaryButton } from "@/Components";
import moment from "moment";
import axios from "axios";

const Search = (props) => {
    const { post } = useForm({});
    const { results, selectedQueries } = usePage().props;
    const [items, setItems] = useState(results.data);
    const [nextPage, setNextPage] = useState(results.links.next);
    const target = useRef(null);

    const showImage = () => {
        return "/storage/";
    };

    const submit = (e, id, model) => {
        e.preventDefault();

        post(`/${model}/${id}/favourite`, {
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
        <GuestLayout user={props.auth.user} selectedQueries={selectedQueries}>
            <Head title="Search Results" />
            <div className="">
                <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4">
                    <div className="grid grid-cols-1 mt-[6rem] sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xxl:grid-cols-6 gap-8">
                        {items.map((property, index) => (
                            <div
                                className="col-span-1 cursor-pointer group"
                                key={index}
                            >
                                <div className="flex flex-col w-full gap-2">
                                    <div className="relative w-full overflow-hidden aspect-square rounded-xl">
                                        <Link
                                            href={route("property.show", [
                                                property.model,
                                                property.id,
                                            ])}
                                        >
                                            <img
                                                className="object-cover w-full h-full transition group-hover:scale-110"
                                                src={
                                                    property.images[0]
                                                        ? showImage() +
                                                          property.images[0]
                                                        : HousePlaceholder
                                                }
                                                alt=""
                                            />
                                        </Link>

                                        <form
                                            onSubmit={(e) =>
                                                submit(
                                                    e,
                                                    property.id,
                                                    property.model
                                                )
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
                                                            property.favouritedBy
                                                                ? "fill-rose-500"
                                                                : "fill-neutral-500/70"
                                                        }
                                                    />
                                                </PrimaryButton>
                                            </div>
                                        </form>
                                    </div>
                                    <Link
                                        href={route("property.show", [
                                            property.model,
                                            property.id,
                                        ])}
                                    >
                                        <div className="flex flex-row items-start justify-between mt-4">
                                            <div>
                                                <p className="text-sm font-bold text-gray-800">
                                                    {property.owner
                                                        ? property.owner.address
                                                              ?.address_1
                                                        : property.address
                                                              ?.address_1}
                                                    ,
                                                    {property.owner
                                                        ? property.owner.address
                                                              ?.area
                                                        : property.address
                                                              ?.area}
                                                </p>
                                                <p className="text-sm text-gray-800 capitalize">
                                                    {property.model === "room"
                                                        ? property.sub_title ===
                                                          null
                                                            ? property.owner
                                                                  .title
                                                            : `${property.sub_title} in a ${property.owner.title}`
                                                        : property.title}
                                                </p>
                                                <p className="text-sm text-gray-800">
                                                    Available from{" "}
                                                    <span className="font-semibold">
                                                        {moment(
                                                            property.availability
                                                                ? property
                                                                      .availability
                                                                      .available_from
                                                                : property.available_from
                                                        ).format(
                                                            "MMM DD, YYYY"
                                                        )}
                                                    </span>
                                                </p>
                                                <p className="mt-2 text-sm text-gray-800">
                                                    <strong>
                                                        £
                                                        {property.owner
                                                            ? property.room_cost
                                                            : property.cost}
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
                                                        ({property.views})
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

export default Search;
