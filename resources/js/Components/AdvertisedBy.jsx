import React from "react";
import {
    AiFillStar,
    AiFillSafetyCertificate,
    AiOutlineMail,
} from "react-icons/ai";

const AdvertisedBy = ({ openModal, advertiser, occupation }) => {
    return (
        <>
            <h1 className="text-xl font-bold text-gray-700 font-popp">
                Advertised by
            </h1>
            <div className="grid grid-cols-[2fr_1fr]">
                <div className="flex items-center mt-8 -mx-2">
                    <img
                        className="object-cover w-16 h-16 mx-2 rounded-full shrink-0 ring-4 ring-gray-300 dark:ring-gray-700"
                        src="https://www.gravatar.com/avatar/000000000000000000000000000000?d=mp"
                        alt=""
                    />
                    <div className="grid mx-2">
                        <h1 className="font-semibold text-gray-800 font-popp">
                            {advertiser.first_name}
                        </h1>
                        <span className="text-sm text-gray-500 font-popp">
                            {occupation}
                        </span>
                        <span className="text-sm text-gray-500 font-popp">
                            Tel:{" "}
                            {advertiser.display_telephone &&
                                advertiser.telephone}
                        </span>
                    </div>
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
            <div className="mt-8 mb-5">
                <button
                    onClick={openModal}
                    className="group relative inline-flex w-40 items-center justify-center overflow-hidden rounded-full bg-[#FFF337] px-8 py-3 font-medium text-white transition duration-300 ease-out md:w-auto"
                >
                    <span className="ease absolute inset-0 flex h-full w-full -translate-x-full items-center justify-center bg-[#FFF337] text-black duration-300 group-hover:translate-x-0">
                        <AiOutlineMail className="w-5 h-5" />
                    </span>
                    <span className="absolute flex items-center justify-center w-full h-full text-black transition-all duration-300 transform ease group-hover:translate-x-full">
                        Message {advertiser.first_name}
                    </span>
                    <span className="relative invisible">
                        Message {advertiser.first_name}
                    </span>
                </button>
            </div>
        </>
    );
};

export default AdvertisedBy;
