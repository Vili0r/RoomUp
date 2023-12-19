import React from "react";
import { motion } from "framer-motion";
import { staggerContainer } from "../utils/motion";
import { TitleText } from "@/Components/TitleText";
import { TypingText } from "@/Components/TypingText";

const Subscribe = () => {
    return (
        <section className="section" style={{ padding: "2.5rem 0" }}>
            <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: false, amout: 0.25 }}
                className="bg-[#3E4147] rounded-[.5rem] text-center"
                style={{
                    padding: "3rem 2rem",
                    border: "2px solid #393e50",
                    background:
                        "linear-gradient(91.7deg, rgb(39, 26, 53) -4.3%, rgb(29, 31, 81) 101.8%)",
                }}
            >
                <TypingText
                    title="Get Started with RoomUp"
                    textStyles="text-center mt-[4rem] text-[1.25rem] text-white mb-[1rem]"
                />
                <TitleText
                    title={
                        <>
                            Find your new residence soon, Find your new flatmate
                            with us
                        </>
                    }
                    textStyles="text-center lg:text-[2.75rem] text-center text-white mb-5 md:text-[1.75rem] xs:text-[1rem] font-[800] items-center uppercase"
                />
                <a
                    className="inline-block text-[.938rem] font-medium text-white cursor-pointer rounded-[.5rem] mb-1 bg-[#F5B041] hover:bg-orange-400"
                    style={{
                        boxShadow: "0 4px 8px #f0a122",
                        padding: "14px 28px",
                        transition: ".3s",
                        border: "2px solid #fff",
                    }}
                >
                    Get Started
                </a>
            </motion.div>
        </section>
    );
};

export default Subscribe;
