import React from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../utils/motion";
import { Headset } from "../assets";

const FeaturedCard = ({ id, imageUrl, title, index, active, handleClick }) => {
    return (
        <motion.div
            variants={fadeIn("right", "spring", index * 0.5, 0.75)}
            className={`relative ${
                active === id
                    ? "lg:flex-[3.5] flex-[10]"
                    : "lg:flex-[0.5] flex-[2]"
            } flex items-center justify-center min-w-[170px] h-[700px] transition-[flex] duration-[0.7s] ease-out-flex cursor-pointer`}
            onClick={() => handleClick(id)}
        >
            <img
                src={imageUrl}
                alt={title}
                className="absolute w-full h-full object-cover rounded-[24px]"
            />
            {active !== id ? (
                <h3 className="font-semibold sm:text-[26px] xxs:text-[15px] text-[18px] text-white absolute z-0 lg:bottom-20 lg:rotate-[-90deg] lg:origin-[0,0] font-popp max-[320px]:text-[14px]">
                    {title}
                </h3>
            ) : (
                <div className="absolute bottom-0 p-6 xxs:p-6 h-[40%] flex xxs:h-[50%] lg:h-1/3 justify-start w-full flex-col bg-[rgba(0,0,0,0.5)] rounded-b-[24px]">
                    <div className="flex justify-center items-center w-[60px] h-[60px] rounded-[24px] glassmorphism mb-[16px] xxs:mt-[-1.5rem] sm:mt-[-1.5rem] mt-[-2.5rem]">
                        <img
                            src={Headset}
                            alt="headset"
                            className="w-1/2 h-1/2 object-contain"
                        />
                    </div>
                    <p className="font-normal lg:text-[16px] text-[10px] sm:text-[12px] font-popp xxs:text-[10px] mt-[-17.5px] xxs:mt-[-15px] leading-[20.16px] text-white uppercase">
                        Bedroom flat
                    </p>
                    <h2 className="lg:mt-[24px] xxs:mt-[-5px] xxs:mb-[-1.5rem] text-[14px] font-popp font-semibold xxs:text-[16px] sm:text-[32px] lg:text-[35px] text-white">
                        {title}
                    </h2>
                </div>
            )}
        </motion.div>
    );
};

export default FeaturedCard;
