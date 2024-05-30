import React from "react";
import { motion } from "framer-motion";

const AboutBlock = () => {
    return (
        <div className="col-span-12 p-6 text-2xl leading-snug border rounded-lg border-neutral-700 bg-neutral-800">
            <p>
                RoomUp is the ultimate property listing and flatsharing
                platform.{" "}
                <span className="text-neutral-400">
                    Designed to simplify the process of finding or renting out a
                    home. To enhance user experience, a seamless integrated chat
                    feature for instant communication between users. The
                    advanced search filters enable precise searches by location,
                    price, property type, and more, ensuring users find exactly
                    what they are looking for.
                </span>
            </p>
        </div>
    );
};

export default AboutBlock;
