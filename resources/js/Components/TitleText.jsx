import { motion } from "framer-motion";
import { textContainer, textVariant2 } from "../utils/motion";

export const TitleText = ({ title, textStyles }) => (
    <motion.h2
        variants={textVariant2}
        initial="hidden"
        whileInView="show"
        className={`mt-[8px] font-bold md:text-[64px] sm:text-[35px] xs:text-[30px] text-[#3E4147] ${textStyles}`}
    >
        {title}
    </motion.h2>
);
