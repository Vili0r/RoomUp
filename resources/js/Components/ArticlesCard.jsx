import React from "react";
import { motion } from "framer-motion";

const ArticlesCard = ({ published_at, title, description, imageUrl }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: false }}
        >
            <img
                className="relative z-10 object-cover w-full rounded-md h-96"
                src={imageUrl}
                alt={title}
            />

            <div className="relative z-20 max-w-lg p-6 mx-auto -mt-20 bg-white rounded-md shadow dark:bg-gray-900">
                <a
                    href="#"
                    className="font-semibold text-gray-800 hover:underline dark:text-white md:text-xl"
                >
                    {title}
                </a>

                <p className="mt-3 text-sm text-gray-500 dark:text-gray-300 md:text-sm">
                    {description}
                </p>

                <p className="mt-3 text-sm text-blue-500">{published_at}</p>
            </div>
        </motion.div>
    );
};

export default ArticlesCard;
