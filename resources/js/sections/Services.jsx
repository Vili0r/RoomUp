import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {
    BentoIllustration1,
    BentoShield,
    BentoChat,
    BentoVirtualTour,
    BentoNeighborhood,
} from "@/assets";
import { MdArrowForwardIos } from "react-icons/md";

const Services = () => {
    const bentoGrid1Ref = useRef(null);
    const bentoGrid2Ref = useRef(null);
    const bentoGrid3Ref = useRef(null);
    const bentoGrid4Ref = useRef(null);
    const bentoGrid5Ref = useRef(null);

    useGSAP(() => {
        gsap.set(bentoGrid1Ref.current, { scale: 1 });
        gsap.set(bentoGrid2Ref.current, { scale: 1 });
        gsap.set(bentoGrid3Ref.current, { scale: 1 });
        gsap.set(bentoGrid4Ref.current, { scale: 1 });
        gsap.set(bentoGrid5Ref.current, { scale: 1 });
    });

    const handleMouseEnterbentoGrid1 = () => {
        gsap.to(bentoGrid1Ref.current, { scale: 1.01, duration: 0.5 });
    };
    const handleMouseLeavebentoGrid1 = () => {
        gsap.to(bentoGrid1Ref.current, { scale: 1, duration: 0.5 });
    };

    const handleMouseEnterbentoGrid2 = () => {
        gsap.to(bentoGrid2Ref.current, { scale: 1.01, duration: 0.5 });
    };
    const handleMouseLeavebentoGrid2 = () => {
        gsap.to(bentoGrid2Ref.current, { scale: 1, duration: 0.5 });
    };

    const handleMouseEnterbentoGrid3 = () => {
        gsap.to(bentoGrid3Ref.current, { scale: 1.01, duration: 0.5 });
    };
    const handleMouseLeavebentoGrid3 = () => {
        gsap.to(bentoGrid3Ref.current, { scale: 1, duration: 0.5 });
    };

    const handleMouseEnterbentoGrid4 = () => {
        gsap.to(bentoGrid4Ref.current, { scale: 1.01, duration: 0.5 });
    };
    const handleMouseLeavebentoGrid4 = () => {
        gsap.to(bentoGrid4Ref.current, { scale: 1, duration: 0.5 });
    };

    const handleMouseEnterbentoGrid5 = () => {
        gsap.to(bentoGrid5Ref.current, { scale: 1.075, duration: 0.5 });
    };
    const handleMouseLeavebentoGrid5 = () => {
        gsap.to(bentoGrid5Ref.current, { scale: 1, duration: 0.5 });
    };

    return (
        <section className="bg-[#F9F9FA]">
            <h1 className=" dark:text-gray-400 lg:text-[2.75rem] text-center text-[#3E4147] mb-5 md:text-[1.75rem] xs:text-[1rem] font-[800] items-center uppercase">
                What are our differentiators
                <span className="text-[#F5B041]">?</span>
            </h1>

            <div className="max-w-4xl mx-auto mt-[50px]">
                <div className="flex flex-col gap-4 sm:grid sm:grid-cols-3 sm:grid-rows-3">
                    <div
                        ref={bentoGrid1Ref}
                        onMouseEnter={handleMouseEnterbentoGrid1}
                        onMouseLeave={handleMouseLeavebentoGrid1}
                        className="flex relative cursor-pointer col-span-2 row-span-2 p-4 rounded-[5px] w-full h-[500px] bg-center bg-cover"
                        style={{
                            backgroundImage: `url(${BentoIllustration1})`,
                        }}
                    >
                        <p className="items-start text-3xl font-bold text-left mt-7 text-zinc">
                            Add your listing for free.
                        </p>

                        <div className="absolute items-end mt-4 bottom-5 right-5">
                            <div className="flex justify-center items-center h-10 w-10 bg-[#F1C40F] rounded-full">
                                <MdArrowForwardIos className="w-6 h-6 text-white " />
                            </div>
                        </div>
                    </div>

                    <div
                        ref={bentoGrid2Ref}
                        onMouseEnter={handleMouseEnterbentoGrid2}
                        onMouseLeave={handleMouseLeavebentoGrid2}
                        className="flex items-start justify-start p-4 rounded-[5px] bg-center bg-cover"
                        style={{
                            backgroundImage: `url(${BentoVirtualTour})`,
                        }}
                    >
                        <p className="text-lg font-semibold text-zinc">
                            Virtual Tours available.
                        </p>
                    </div>

                    <div
                        ref={bentoGrid3Ref}
                        onMouseEnter={handleMouseEnterbentoGrid3}
                        onMouseLeave={handleMouseLeavebentoGrid3}
                        className="flex items-start justify-start p-4 rounded-[5px] bg-center bg-cover text-white"
                        style={{
                            backgroundImage: `url(${BentoChat})`,
                        }}
                    >
                        <p className="text-lg font-semibold text-white">
                            Chat in real-time.
                        </p>
                    </div>

                    <div
                        ref={bentoGrid4Ref}
                        onMouseEnter={handleMouseEnterbentoGrid4}
                        onMouseLeave={handleMouseLeavebentoGrid4}
                        className="flex items-end justify-start p-4 bg-[#8DE4AF] rounded-[5px] bg-center bg-cover"
                        style={{
                            backgroundImage: `url(${BentoNeighborhood})`,
                        }}
                    >
                        <p className="text-lg font-semibold text-zinc">
                            Find your perfect neighborhood.
                        </p>
                    </div>

                    <div
                        ref={bentoGrid5Ref}
                        onMouseEnter={handleMouseEnterbentoGrid5}
                        onMouseLeave={handleMouseLeavebentoGrid5}
                        className="flex items-center cursor-pointer justify-center col-span-2 text-white bg-sky-500 rounded-[5px]"
                    >
                        <div className="max-w-md mx-auto ">
                            <img
                                src={BentoShield}
                                className="w-20 h-20 rounded-full place-items-center"
                            />

                            <div className="pt-5 space-y-6 text-base leading-7 text-white ">
                                <p>
                                    Enhance your safety. Check if the user is
                                    verified to ensure secure interactions and
                                    peace of mind.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Services;
