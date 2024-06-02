import React from "react";
import { useTranslation } from "react-i18next";
import { BsSearch } from "react-icons/bs";
import { HiOutlineHome } from "react-icons/hi2";

const HowItWorks = () => {
    const { t } = useTranslation();
    const {
        section1Title1,
        section1Description1,
        section1SubTitle1,
        section1SubDescription1,
        section1SubTitle2,
        section1SubDescription2,
        section1SubTitle3,
        section1SubDescription3,
        section1SubTitle4,
        section1SubDescription4,
    } = t("welcome.howItWorks.section1");
    const {
        section2Title1,
        section2Description1,
        section2SubTitle1,
        section2SubDescription1,
        section2SubTitle2,
        section2SubDescription2,
        section2SubTitle3,
        section2SubDescription3,
        section2SubTitle4,
        section2SubDescription4,
    } = t("welcome.howItWorks.section2");
    const {
        section3Title3,
        section3Description3,
        section3SubTitle1,
        section3SubDescription1,
        section3SubTitle2,
        section3SubDescription2,
        section3SubTitle3,
        section3SubDescription3,
        section3SubTitle4,
        section3SubDescription4,
    } = t("welcome.howItWorks.section3");

    return (
        <div className="relative overflow-x-hidden wrapper bg-[#F9F9FA]">
            <h1 className=" lg:text-[2.75rem] text-center text-[#3E4147] md:text-[1.75rem] xs:text-[1rem] font-[800] items-center uppercase mt-[10rem]">
                How It Works
                <span className="text-[#F5B041]">.</span>
            </h1>
            <div className="items-center max-w-screen-xl px-4 py-8 mx-auto mb-10 lg:grid lg:grid-cols-4 lg:gap-8 xl:gap-12">
                <div className="col-span-2 mb-8">
                    <h2 className="mt-3 mb-4 text-3xl font-extrabold tracking-tight text-gray-900 md:text-3xl">
                        Property/Flatmate Search
                    </h2>
                    <p className="font-light text-[#3E4147] sm:text-xl">
                        Whether looking for your perfect space or want to team
                        up and find a place together? It’s simple and Here’s
                        how.
                    </p>
                </div>
                <div className="col-span-2 space-y-8 md:grid md:grid-cols-2 md:gap-6 md:space-y-0">
                    <div>
                        <BsSearch className="w-10 h-10 mb-2 text-[#F5B041] md:w-12 md:h-12" />

                        <h3 className="mb-2 text-2xl font-bold">
                            {section1SubTitle1}
                        </h3>
                        <p className="font-light text-[#3E4147]">
                            Dive into a variety of listings that fit your
                            lifestyle, budget or flatmate compatibility. Our
                            intuitive search lets you filter by location, price,
                            amenities and flatmate interests.
                        </p>
                    </div>
                    <div>
                        <svg
                            className="w-10 h-10 mb-2 text-[#F5B041] md:w-12 md:h-12"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M2 5a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm14 1a1 1 0 11-2 0 1 1 0 012 0zM2 13a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H4a2 2 0 01-2-2v-2zm14 1a1 1 0 11-2 0 1 1 0 012 0z"
                                clip-rule="evenodd"
                            ></path>
                        </svg>
                        <h3 className="mb-2 text-2xl font-bold">
                            {section1SubTitle2}
                        </h3>
                        <p className="font-light text-[#3E4147]">
                            View photos, check potential flatmate social media
                            profiles and read about the property specifics to
                            make sure it's the right fit for you.
                        </p>
                    </div>
                    <div>
                        <svg
                            className="w-10 h-10 mb-2 text-[#F5B041] md:w-12 md:h-12"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"></path>
                        </svg>
                        <h3 className="mb-2 text-2xl font-bold">
                            Chat & Meet:
                        </h3>
                        <p className="font-light text-[#3E4147]">
                            Chat directly to homeowners or potential flatmates
                            to inquire more or schedule a visit/meet up.
                        </p>
                    </div>
                    <div>
                        <HiOutlineHome className="w-10 h-10 mb-2 text-[#F5B041] md:w-12 md:h-12" />

                        <h3 className="mb-2 text-2xl font-bold">
                            {section1SubTitle4}
                        </h3>
                        <p className="font-light text-[#3E4147]">
                            {section1SubDescription4}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HowItWorks;
