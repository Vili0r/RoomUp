import React from "react";
import { AiTwotoneHeart } from "react-icons/ai";
import { MdOutlineBedroomParent } from "react-icons/md";
import { FaBath } from "react-icons/fa";
import { RiRulerFill } from "react-icons/ri";
import { Link } from "@inertiajs/react";

const PropertyCard = () => {
    return (
        <div className="col-span-4 p-4 md:p-2 lg:p-0 md:col-span-2 lg:col-span-1">
            <div className="grid [@media(min-width:520px)]:grid-cols-2 [@media(min-width:800px)]:grid-cols-1 gap-y-10 gap-x-4 md:gap-6">
                <div className="h-full xs:mb-[-8.85rem] md:mb-[-5rem] -mb-11 lg:mb-[4.25rem] lg:ml-[-20px] xl:mr-2 bg-white shadow-md rounded-3xl overflow-hidden relative">
                    <Link>
                        <img
                            src="https://tse2.mm.bing.net/th?id=OIP.ZveDuZq9YL_RGwK3deyWbAHaG_&pid=Api&P=0"
                            className="xs:h-[70%] [@media(min-width:400px)]:h-[64%] xxs:h-[60%] w-full sm:h-[200px] [@media(max-width:350px)]:h-[55%] md:object-middle md:object-cover lg:object-fit rounded-3xl"
                        />
                    </Link>
                    <div className="absolute flex items-center justify-between w-full p-1 top-2">
                        <div className="space-x-1 text-white text-[11px]">
                            <button className="px-2 py-2 bg-green-600 rounded-lg">
                                New
                            </button>
                            <button className="px-2 py-2 bg-blue-600 rounded">
                                For sale
                            </button>
                        </div>
                        <button className="bg-[#f3f3f3] px-2 py-2 rounded-lg">
                            <AiTwotoneHeart className="w-5 h-5 text-red-600" />
                        </button>
                    </div>
                    <div className="flex flex-col gap-2 px-4 pt-2">
                        <p className="text-xl font-semibold font-popp">£1000</p>
                        <Link>
                            <p className="font-medium [@media(max-width:350px)]:text-[13px] text-[15px] [@media(min-width:520px)]:text-[13px] sm:text-[15px] [@media(min-width:890px)]:text-[16px] lg:text-sm xl:text-lg font-popp">
                                Lorem ipsum, dolor sit amet consectetur
                                adipisicing elit.
                            </p>
                        </Link>

                        <div className="flex items-center justify-between mt-1 md:mt-0 lg:mt-2">
                            <span className="bg-[#f3f3f3] flex items-center font-popp text-sm gap-2 px-2 py-2 rounded-lg">
                                <MdOutlineBedroomParent className="w-6 h-6 text-yellow-700" />
                                2
                            </span>
                            <span className="bg-[#f3f3f3] flex items-center text-sm font-popp gap-2 px-2 py-2 rounded-lg">
                                <FaBath className="w-6 h-6 text-blue-700" />1
                            </span>
                            <span className="bg-[#f3f3f3] text-sm font-popp flex items-center gap-1 px-2 py-2 rounded-lg">
                                <RiRulerFill className="w-6 h-6 text-green-700" />
                                60 m
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-center">
                <button className="px-2 py-3 bg-[#f3f3f3] mx-auto text-sm font-semibold rounded-xl font-popp mt-10 text-black">
                    ... 15 more
                </button>
            </div>
        </div>
    );
};

export default PropertyCard;
