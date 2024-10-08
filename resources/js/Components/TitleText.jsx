import { motion } from "framer-motion";
import { textVariant2 } from "../utils/motion";

export const TitleText = ({ title, textStyles }) => (
    <motion.h2
        variants={textVariant2}
        initial="hidden"
        whileInView="show"
        className={` font-bold md:text-[64px] sm:text-[35px] xs:text-[30px] text-[#3E4147] ${textStyles}`}
    >
        {title}
    </motion.h2>
);
