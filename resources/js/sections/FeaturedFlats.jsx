import React, { useState } from "react";
import { Popular1, Popular2, Popular3, Popular4, Popular5 } from "@/assets";
import { motion } from "framer-motion";
import { staggerContainer } from "../utils/motion";
import { TypingText } from "@/Components/TypingText";
import { TitleText } from "@/Components/TitleText";
import FeaturedCard from "@/Components/FeaturedCard";
import { useTranslation } from "react-i18next";

const featured = [
    {
        id: "featured-1",
        title: "Spacious villa",
        location: "London",
        imageUrl: Popular1,
    },
    {
        id: "featured-2",
        title: "Sea view 2-bedroom flat",
        location: "London",
        imageUrl: Popular2,
    },
    {
        id: "featured-3",
        title: "Beatuful apartment",
        location: "London",
        imageUrl: Popular3,
    },
    {
        id: "featured-4",
        title: "Amazing in-suite room",
        location: "London",
        imageUrl: Popular4,
    },
    {
        id: "featured-5",
        title: "Mountain view 3-bedroom flat",
        location: "London",
        imageUrl: Popular5,
    },
];

const FeaturedFlats = () => {
    const [active, setActive] = useState("featured-2");

    const { t } = useTranslation();
    const { titleOne, titleTwo, titleThree } = t("welcome.featuredFlats");
    return (
        <section
            className="w-full dark:bg-gray-900"
            style={{ padding: "1rem 0 5rem" }}
        >
            <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: false, amout: 0.25 }}
                className="2xl:max-w-[1280px] w-full mx-auto flex flex-col px-[4rem]"
            >
                <TypingText
                    title={titleOne}
                    textStyles="text-center mt-[4rem] dark:text-gray-400"
                />
                <TitleText
                    title={
                        <span className="dark:text-gray-400">
                            {titleTwo} <br className="hidden md:block" />{" "}
                            {titleThree}
                            <span className="text-[#F5B041]">.</span>
                        </span>
                    }
                    textStyles="mt-[8px] text-center lg:text-[2.75rem] text-center text-[#3E4147] mb-5 md:text-[1.75rem] xs:text-[1rem] font-[800] items-center uppercase"
                />
                <div className="mt-[50px] flex lg:flex-row flex-col min-h-[70vh] gap-5">
                    {featured.map((item, index) => (
                        <FeaturedCard
                            key={item.id}
                            {...item}
                            index={index}
                            active={active}
                            handleClick={setActive}
                        />
                    ))}
                </div>
            </motion.div>
        </section>
    );
};

export default FeaturedFlats;
