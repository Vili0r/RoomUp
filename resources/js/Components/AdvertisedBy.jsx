import React from "react";
import { AiFillStar, AiFillSafetyCertificate } from "react-icons/ai";

const AdvertisedBy = ({ openModal }) => {
    return (
        <>
            <h1 className="text-xl font-popp font-bold text-gray-700">
                Advertised by
            </h1>
            <div className="grid grid-cols-[2fr_1fr]">
                <div className="flex items-center mt-8 -mx-2">
                    <img
                        className="object-cover mx-2 rounded-full shrink-0 w-16 h-16 ring-4 ring-gray-300 dark:ring-gray-700"
                        src="https://www.gravatar.com/avatar/000000000000000000000000000000?d=mp"
                        alt=""
                    />
                    <div className="mx-2">
                        <h1 className="font-semibold text-gray-800 font-popp">
                            Alex
                        </h1>
                        <span className="text-sm text-gray-500 font-popp">
                            Marketing Manager at Stech
                        </span>
                    </div>
                </div>
                <div className="mt-8 [@media(max-width:640px)]:hidden">
                    <button
                        onClick={openModal}
                        className="inline-flex font-popp items-center justify-center px-4 py-2 font-medium text-white transition-colors bg-[#F1C40F] rounded-full hover:bg-[#AED6F1] focus:outline-none"
                    >
                        Message Alex
                    </button>
                </div>
            </div>
            <div className="flex justify-start gap-4 mt-7">
                <div className="flex items-center gap-2">
                    <AiFillStar className="w-6 h-6" />
                    <span className="font-popp text-sm [@media(max-width:350px)]:text-xs">
                        744 reviews
                    </span>
                </div>
                <span>|</span>
                <div className="flex items-center gap-2">
                    <AiFillSafetyCertificate className="w-6 h-6" />
                    <span className="font-popp text-sm [@media(max-width:350px)]:text-xs">
                        Identity certified
                    </span>
                </div>
            </div>
            <div className="mt-8 [@media(min-width:639px)]:hidden">
                <button
                    onClick={openModal}
                    className="inline-flex font-popp items-center justify-center px-4 py-2 font-medium text-white transition-colors bg-[#F1C40F] rounded-full hover:bg-[#AED6F1] focus:outline-none"
                >
                    Message Alex
                </button>
            </div>
        </>
    );
};

export default AdvertisedBy;
