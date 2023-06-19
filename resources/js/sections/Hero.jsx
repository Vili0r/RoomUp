import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { slideIn, staggerContainer, textVariant } from "../utils/motion";
import { Link } from "@inertiajs/react";
import { home } from "@/assets";
import { FiMapPin } from "react-icons/fi";
import { SecondaryButton, PrimaryButton, Modal } from "@/Components";
import { MeiliSearch } from "meilisearch";
import debounce from "lodash.debounce";

const Hero = () => {
    const [openQueryModal, setOpenQueryModal] = useState(false);
    const [query, setQuery] = useState("");
    const [searchResults, setSearchResults] = useState(null);
    const [selectedHitIndex, setSelectedHitIndex] = useState(0);
    const [client, setClient] = useState(null);

    const closeModal = () => {
        setOpenQueryModal(false);
    };

    const openModal = () => {
        setOpenQueryModal(true);
    };

    // Front End Meilisearch implementation
    useEffect(() => {
        setClient(new MeiliSearch({ host: "http://localhost:7700" }));
    }, []);

    const search = async (query) => {
        if (query) {
            const response = await client.index("addresses").search(query);
            setSearchResults(response);
            console.log(searchResults);
        }
    };
    const debouncedSearch = debounce(search, 300); // Debounce the search function with a delay of 300 milliseconds

    useEffect(() => {
        debouncedSearch(query);
        console.log(query);
    }, [query]);

    const submit = () => {};
    return (
        <section
            className="section pb-[0] max-xs:pt-[2rem] max-[320px]:mb-[-3rem]"
            style={{
                background:
                    "linear-gradient(91.7deg, rgb(39, 26, 53) -4.3%, rgb(29, 31, 81) 101.8%)",
            }}
        >
            <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: false, amount: 0.25 }}
                className="pt-[4rem] pl-[2rem] grid gap-y-[3.5rem] md:grid-cols-2 md:pt-[3rem] lg:pt-[5rem] lg:gap-[2rem] lg:pr-[2rem]"
            >
                <motion.div variants={textVariant(1.2)} className="">
                    <h1 className="xxs:text-[2.55rem] xs:text-[2.75rem] text-[2.25rem] leading-[120%] mb-[1.25rem] mr-[1.25rem] text-gray-300 font-popp">
                        Find <br /> Your Perfect <br /> Property / Flatmate
                    </h1>
                    <p className="font-popp mb-[2rem] mr-[2rem] md:w-[75%] text-gray-300 font-bold">
                        Effortlessly search for compatible roommates and secure
                        your next living arrangement
                    </p>
                    <div
                        onClick={openModal}
                        className="bg-gray-300 flex justify-between rounded-[.75rem] mb-[2rem] mr-[2.5rem]"
                        style={{
                            padding: ".35rem .35rem .35rem .75rem",
                            border: "3px solid hsl(228, 12%, 75%)",
                        }}
                    >
                        <div className="flex items-center justify-between">
                            <FiMapPin className="text-[rgb(29, 31, 81)] text-[1.25rem]" />
                            <input
                                value={query}
                                className="w-[90%] bg-transparent border-none focus:outline-none focus:border-none focus:ring-0 bg-gray-300 text-black block mt-2 placeholder-gray-400/70  dark:placeholder-gray-500 rounded-lg px-5 py-2.5 focus:border-[#f0a122] focus:ring-[#f0a122] text-xl focus:ring-opacity-40"
                                style={{ margin: "0 .5rem" }}
                                placeholder="Search by location..."
                                disabled
                            />
                        </div>
                        <span
                            className="inline-block text-[.938rem] font-popp font-medium text-white cursor-pointer rounded-[.5rem] mb-1 bg-[#F1C40F] hover:bg-orange-400"
                            style={{
                                boxShadow: "0 4px 8px #f0a122",
                                padding: "14px 28px",
                                transition: ".3s",
                            }}
                        >
                            Search
                        </span>
                    </div>
                    <Modal show={openQueryModal} onClose={closeModal}>
                        <form onSubmit={submit} className="p-6">
                            <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                                Enter the address or a post code
                            </h2>

                            <div className="relative mt-5">
                                <input
                                    type="text"
                                    name="search"
                                    id="search"
                                    placeholder="Address..."
                                    value={query}
                                    className="w-full px-3 py-3 border border-gray-300 rounded-md shadow peer shadow-gray-100 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                                    autoComplete="off"
                                    onChange={(e) => setQuery(e.target.value)}
                                />
                                <label
                                    htmlFor="email"
                                    className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none font-popp peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                                >
                                    Address or Post Code
                                </label>
                            </div>

                            <div className="flex justify-end mt-6">
                                <SecondaryButton onClick={closeModal}>
                                    Cancel
                                </SecondaryButton>

                                <PrimaryButton className="px-4 py-2 ml-3 text-white bg-black rounded-lg">
                                    Search
                                </PrimaryButton>
                            </div>
                        </form>
                    </Modal>

                    <div className="flex gap-3 justify-between w-[75%]">
                        <div className="">
                            <h1 className="text-[1.5rem] font-medium text-gray-300 font-popp">
                                9k <span className="text-orange-400">+</span>
                            </h1>
                            <span className="flex font-light text-gray-300 font-popp">
                                Premium <br />
                                Product
                            </span>
                        </div>
                        <div className="">
                            <h1 className="text-[1.5rem] font-medium text-gray-300 font-popp">
                                2K <span className="text-orange-400">+</span>
                            </h1>
                            <span className="flex font-light text-gray-300 font-popp">
                                Happy <br />
                                Customer
                            </span>
                        </div>
                        <div className="">
                            <h1 className="text-[1.5rem] font-medium text-gray-300 font-popp">
                                28K <span className="text-orange-400">+</span>
                            </h1>
                            <span className="flex font-light text-gray-300 font-popp">
                                Award <br />
                                Winning
                            </span>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    variants={slideIn("right", "tween", 0.2, 1)}
                    className="relative flex items-center"
                >
                    <div
                        className="w-[265px] h-[284px] md:w-[340px] md:h-[265px] lg:w-[505px] lg:h-[611px] lg:rounded-[256px 256px 0 0] max-[320px]:w-[240px] max-[320px]:h-[264px] md:self-end"
                        style={{
                            background:
                                "linear-gradient(180deg, hsl(0, 0%, 16%) 93%, hsl(0, 0%, 67%) 100%)",
                            borderRadius: "135px 135px 0 0",
                            boxShadow: "0 16px 32px hsla(228, 66%, 25%, .24)",
                        }}
                    ></div>
                    <div
                        className="absolute w-[250px] h-[335px] md:w-[320px] md:h-[320px] lg:w-[487px] lg:h-[660px] overflow-hidden inline-flex items-end bottom-[-3rem] md:bottom-[-4rem] left-2 max-[320px]:w-[220px] max-[320px]:h-[280px] max-[320px]:bottom-[-1rem]"
                        style={{
                            borderRadius: "125px 125px 12px 12px",
                            boxShadow: "0 16px 32px hsla(228, 66%, 25%, .25)",
                        }}
                    >
                        <img
                            src={home}
                            className="w-full h-full"
                            alt="hero_image"
                        />
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Hero;
