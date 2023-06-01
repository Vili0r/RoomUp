import React from "react";
import { Hero1 } from "@/assets";
import AccordionItem from "../components/AccordionItem";
import { motion } from "framer-motion";
import { slideIn, staggerContainer } from "../utils/motion";

const HowItWorks = () => {
    return (
        <div className="section grid bg-white dark:bg-gray-900">
            <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: false, amount: 0.25 }}
                className="gap-y-[3rem] md:grid md:grid-cols-2"
            >
                <motion.div
                    variants={slideIn("left", "tween", 0.2, 1)}
                    className="relative flex text-center"
                >
                    <div
                        className="w-[266px] h-[316px] xs:w-[300px] xs:h-[400px] bg-[hsl(228, 24%, 97%)] md:w-[390px] md:h-[500px] lg:w-[500px] lg:h-[600px] max-[320px]:w-[236px] max-[320px]:h-[280px]"
                        style={{ borderRadius: "135px 135px 16px 16px" }}
                    ></div>
                    <div
                        className="absolute w-[250px] h-[300px] xs:w-[290px] xs:h-[390px] md:w-[305px] md:h-[446px] lg:w-[400px] lg:h-[500px] overflow-hidden inset-0 mx-auto max-[320px]:w-[220px] max-[320px]:h-[260px]"
                        style={{
                            borderRadius: "125px 125px 12px 12px",
                            boxShadow: "0 16px 32px hsla(228, 66%, 25%, .25",
                        }}
                    >
                        <img
                            className="h-full w-full object-cover"
                            src={Hero1}
                            alt="how it works"
                        />
                    </div>
                </motion.div>

                <motion.div
                    className="px-6"
                    variants={slideIn("right", "tween", 0.3, 2)}
                >
                    <div className="mt-[2rem]">
                        <h2 className="md:text-[2.45rem] dark:text-gray-400 text-center font-popp text-[#3E4147] mb-5 sm:text-[1.75rem] xxs:text-[1.5rem] font-[800] items-center uppercase">
                            How it works
                            <span className="text-[#F5B041]">?</span>
                        </h2>
                        <p className="text-center mb-[1rem] font-popp dark:text-gray-400">
                            We always ready to help to provide the best service
                            for you. We believe a good place to live can make
                            your life better.
                        </p>
                    </div>
                    <div className="grid gap-y-[1.5rem]">
                        <AccordionItem />
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default HowItWorks;
