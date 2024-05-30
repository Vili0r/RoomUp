import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "@inertiajs/react";
import { motion } from "framer-motion";
import HeaderBlock from "@/Components/HeaderBlock";
import SocialsBlock from "@/Components/SocialsBlock";
import AboutBlock from "@/Components/AboutBlock";
import EmailListBlock from "@/Components/EmailListBlock";
import LocationBlock from "@/Components/LocationBlock";

const Services = () => {
    const { t } = useTranslation();
    const {
        title,
        bentoGridOneTitle,
        bentoGridTwoTitle,
        bentoGridThreeTitle,
        bentoGridFourTitle,
        bentoGridFiveTitle,
    } = t("welcome.services");

    return (
        <section className="bg-zinc">
            <h1 className=" dark:text-gray-400 lg:text-[2.75rem] text-center text-neutral-300 mb-5 md:text-[1.75rem] xs:text-[1rem] font-[800] items-center uppercase pt-[5rem]">
                {title}
                <span className="text-[#F5B041]">?</span>
            </h1>

            <motion.div
                initial="initial"
                animate="animate"
                transition={{
                    staggerChildren: 0.05,
                }}
                className="grid max-w-4xl grid-cols-12 gap-4 mx-auto grid-flow-dense pb-[5rem] mt-[5rem]"
            >
                <HeaderBlock />
                <SocialsBlock />
                <AboutBlock />
                <LocationBlock />
                <EmailListBlock />
            </motion.div>
        </section>
    );
};

export default Services;
