import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "@inertiajs/react";
import { motion } from "framer-motion";
import HeaderBlock from "@/Components/HeaderBlock";
import FeaturesBlock from "@/Components/FeaturesBlock";
import AboutBlock from "@/Components/AboutBlock";
import SearchBlock from "@/Components/SearchBlock";
import SecurityBlock from "@/Components/SecurityBlock";

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
                <FeaturesBlock />
                <AboutBlock />
                <SecurityBlock />
                <SearchBlock />
            </motion.div>
        </section>
    );
};

export default Services;
