import React from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link } from "@inertiajs/react";
import { Hero1, Hero8, Hero2 } from "@/assets";

const PlaceAd = (props) => {
    return (
        <GuestLayout user={props.auth.user}>
            <Head title="Place Ad" />
            <div className="mb-[5.5rem]">
                <div className="lg:grid lg:grid-cols-4 flex-row mt-[7rem] mx-10 md:gap-3">
                    <div className="col-span-2 w-full md:h-[500px] h-[350px] bg-orange-300 rounded-2xl grid xs:grid-cols-2 grid-rows-[1fr_2fr]">
                        <div className="col-span-2">
                            <h1 className="mt-10 [@media(max-width:500px)]:mt-3 ml-10 [@media(max-width:411px)]:ml-8 text-2xl text-white sm:text-3xl font-popp">
                                Rooms to Rent ad.
                            </h1>
                            <span className="[@media(max-width:350px)]:hidden mt-10 ml-10 [@media(max-width:411px)]:ml-8 [@media(max-width:411px)]:text-base text-xl text-white sm:text-3xl font-popp">
                                Advertise one or more rooms
                            </span>
                            <br />
                            <span className="[@media(max-width:350px)]:hidden mt-10 ml-10 [@media(max-width:411px)]:ml-8 [@media(max-width:411px)]:text-base text-xl text-white sm:text-3xl font-popp">
                                in a property
                            </span>
                        </div>
                        <div className="items-center hidden [@media(min-width:501px)]:flex ml-14">
                            <Link
                                href={route("shared.create")}
                                className="px-4 py-3 text-black bg-white rounded-3xl font-popp"
                            >
                                Post a free Ad
                            </Link>
                        </div>
                        <div className=" [@media(max-width:500px)]:col-span-2 items-end mr-5 [@media(max-width:500px)]:mr-0 overflow-hidden [@media(min-width:501px)]:rounded-t-2xl [@media(max-width:500px)]:rounded-b-2xl">
                            <img
                                src={Hero1}
                                className="object-cover w-full h-full"
                            />
                        </div>
                    </div>
                    <div className="bg-[#f3f2f2] w-full md:h-[500px] h-[350px] [@media(max-width:1024px)]:mt-4 rounded-2xl grid grid-rows-[2fr_1fr] [@media(max-width:480px)]:grid-cols-2">
                        <div className="flex [@media(max-width:800px)]:row-span-2 items-end mb-6 [@media(max-width:800px)]:mb-0 [@media(max-width:800px)]:ml-0 ml-14 overflow-hidden md:rounded-tr-2xl md:rounded-bl-2xl rounded-l-2xl">
                            <img
                                src={Hero8}
                                className="object-cover w-full h-full"
                            />
                        </div>
                        <div className="m-5 [@media(max-width:800px)]:row-span-2">
                            <Link
                                href={route("flat.create")}
                                className="cursor-pointer"
                            >
                                <h1 className="font-popp text-[1.35rem] text-black">
                                    Whole property to Let ad.
                                </h1>
                                <span className="[@media(max-width:350px)]:hidden [@media(min-width:1155px)]:text-lg lg:text-sm md:text-lg text-sm text-gray-500 font-popp">
                                    Advertise a self contained property, with no
                                    existing flatmates <br /> studio or 1
                                    bed-flat
                                </span>
                            </Link>
                        </div>
                    </div>
                    <div className="bg-[#e4e1e1] w-full md:h-[500px] h-[350px] [@media(max-width:1024px)]:mt-4 rounded-2xl grid grid-rows-[1fr_2fr] [@media(max-width:480px)]:grid-cols-2">
                        <div className="[@media(max-width:800px)]:row-span-2 m-5 [@media(max-width:800px)]:mb-[6rem]">
                            <h1 className="text-2xl text-black font-popp">
                                Room wanted ad.
                            </h1>
                            <span className="[@media(max-width:350px)]:hidden [@media(min-width:1155px)]:text-lg lg:text-sm md:text-lg text-sm text-gray-500 font-popp">
                                Create a room wanted ad so people offering rooms
                                <br /> can find out more about you and get in
                                touch
                            </span>
                        </div>
                        <div className=" flex items-end [@media(max-width:800px)]:row-span-2 overflow-hidden md:rounded-tl-2xl md:rounded-br-2xl rounded-b-2xl ml-14 [@media(max-width:800px)]:ml-0">
                            <img
                                src={Hero2}
                                className="object-cover w-full h-full"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
};

export default PlaceAd;
