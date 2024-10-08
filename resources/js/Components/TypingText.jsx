import { motion } from "framer-motion";
import { textContainer, textVariant2 } from "../utils/motion";

export const TypingText = ({ title, textStyles }) => (
    <motion.p
        variants={textContainer}
        className={`font-normal text-[14px] text-[#3E4147] ${textStyles}`}
    >
        {Array.from(title).map((letter, index) => (
            <motion.span variants={textVariant2} key={index}>
                {letter === " " ? "\u00A0" : letter}
            </motion.span>
        ))}
    </motion.p>
);
