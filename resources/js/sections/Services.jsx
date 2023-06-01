import React from "react";
import { motion } from "framer-motion";
import { Hero5, PlaceAd, Flatmate } from "@/assets";

const services = [
    { title: "Find a Flatmate", imageUrl: Flatmate },
    { title: "Find your ideal room", imageUrl: Hero5 },
    { title: "Place an Ad", imageUrl: PlaceAd },
];

const Services = () => {
    return (
        <div className="bg-white section dark:bg-gray-900">
            <div className="px-6 py-8 mx-auto text-center mt-[3rem]">
                <h2 className="xs:text-[2.75rem] xxs:text-[2.25rem] font-popp text-[#6D4C41] dark:text-gray-300 font-[800] mb-[2rem] uppercase">
                    Our Services
                    <span className="text-[#F5B041]">.</span>
                </h2>
                <div className="flex flex-col items-center justify-center space-y-8 lg:-mx-4 lg:flex-row lg:items-stretch lg:space-y-0">
                    {services.map((service, index) => {
                        return (
                            <motion.div
                                whileInView={{ opacity: 1 }}
                                whileHover={{ scale: 1.1 }}
                                transition={{ duration: 0.5, type: "tween" }}
                                className="flex flex-col w-full max-w-sm px-[3rem] py-[2rem] space-y-8 text-center bg-white border-2 border-gray-200 rounded-lg lg:mx-4 dark:bg-gray-900 dark:border-gray-700 hover:shadow-md hover:shadow-[hsla(228, 66%, 45%, .15)]"
                                key={service.title + index}
                            >
                                <img
                                    src={service.imageUrl}
                                    alt={service.title}
                                    className="rounded-full h-[300px] w-[280px] mb-[1rem] object-cover"
                                />
                                <button className="inline-flex font-popp items-center justify-center px-4 py-2 font-medium text-white transition-colors bg-[#F1C40F] rounded-lg hover:bg-[#AED6F1] focus:outline-none">
                                    {service.title}
                                </button>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Services;
