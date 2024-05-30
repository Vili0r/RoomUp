import React from "react";
import { motion } from "framer-motion";
import { GiSteampunkGoggles } from "react-icons/gi";
import { BsChatDots } from "react-icons/bs";
import { BiSupport } from "react-icons/bi";
import { MdAttractions } from "react-icons/md";

const SocialsBlock = () => {
    return (
        <>
            <motion.div
                variants={{
                    initial: {
                        scale: 0.5,
                        y: 50,
                        opacity: 0,
                    },
                    animate: {
                        scale: 1,
                        y: 0,
                        opacity: 1,
                    },
                }}
                transition={{
                    type: "spring",
                    mass: 3,
                    stiffness: 400,
                    damping: 50,
                }}
                whileHover={{
                    rotate: "2.5deg",
                    scale: 1.1,
                }}
                className="p-6 bg-red-500 border rounded-lg md:col-span-3 border-zinc-700 bg-zinc-800"
            >
                <span className="grid h-full text-3xl text-white place-content-center">
                    <GiSteampunkGoggles />
                </span>
            </motion.div>
            <motion.div
                variants={{
                    initial: {
                        scale: 0.5,
                        y: 50,
                        opacity: 0,
                    },
                    animate: {
                        scale: 1,
                        y: 0,
                        opacity: 1,
                    },
                }}
                transition={{
                    type: "spring",
                    mass: 3,
                    stiffness: 400,
                    damping: 50,
                }}
                whileHover={{
                    rotate: "-2.5deg",
                    scale: 1.1,
                }}
                className="col-span-6 p-6 bg-green-600 border rounded-lg md:col-span-3 border-zinc-700 bg-zinc-800"
            >
                <span className="grid h-full text-3xl text-white place-content-center">
                    <BsChatDots />
                </span>
            </motion.div>
            <motion.div
                variants={{
                    initial: {
                        scale: 0.5,
                        y: 50,
                        opacity: 0,
                    },
                    animate: {
                        scale: 1,
                        y: 0,
                        opacity: 1,
                    },
                }}
                transition={{
                    type: "spring",
                    mass: 3,
                    stiffness: 400,
                    damping: 50,
                }}
                whileHover={{
                    rotate: "-2.5deg",
                    scale: 1.1,
                }}
                className="col-span-6 p-6 bg-gray-600 border rounded-lg md:col-span-3 border-zinc-700 bg-zinc-800"
            >
                <span className="grid h-full text-3xl text-black place-content-center">
                    <BiSupport />
                </span>
            </motion.div>
            <motion.div
                variants={{
                    initial: {
                        scale: 0.5,
                        y: 50,
                        opacity: 0,
                    },
                    animate: {
                        scale: 1,
                        y: 0,
                        opacity: 1,
                    },
                }}
                transition={{
                    type: "spring",
                    mass: 3,
                    stiffness: 400,
                    damping: 50,
                }}
                whileHover={{
                    rotate: "2.5deg",
                    scale: 1.1,
                }}
                className="col-span-6 p-6 bg-blue-500 border rounded-lg md:col-span-3 border-zinc-700 bg-zinc-800"
            >
                <span className="grid h-full text-3xl text-white place-content-center">
                    <MdAttractions />
                </span>
            </motion.div>
        </>
    );
};

export default SocialsBlock;
