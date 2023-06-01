import React from "react";
import { motion } from "framer-motion";

const Articles = () => {
    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="px-6 py-10 mx-auto">
                <div className="text-center">
                    <h2 className="lg:text-[2.75rem] font-popp dark:text-gray-400 text-center text-[#3E4147] mb-5 md:text-[1.75rem] xs:text-[1rem] font-[800] items-center uppercase">
                        Real Articles
                        <span className="text-[#F5B041]">.</span>
                    </h2>
                </div>

                <motion.div className="grid grid-cols-1 gap-8 mt-8 lg:grid-cols-2">
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: false }}
                    >
                        <img
                            class="relative z-10 object-cover w-full rounded-md h-96"
                            src="https://images.unsplash.com/photo-1644018335954-ab54c83e007f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                            alt=""
                        />

                        <div class="relative z-20 max-w-lg p-6 mx-auto -mt-20 bg-white rounded-md shadow dark:bg-gray-900">
                            <a
                                href="#"
                                class="font-semibold text-gray-800 hover:underline dark:text-white md:text-xl"
                            >
                                All the features you want to know
                            </a>

                            <p class="mt-3 text-sm text-gray-500 dark:text-gray-300 md:text-sm">
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Iure veritatis sint autem
                                nesciunt, laudantium quia tempore delect
                            </p>

                            <p class="mt-3 text-sm text-blue-500">
                                21 October 2019
                            </p>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        viewport={{ once: false }}
                    >
                        <img
                            class="relative z-10 object-cover w-full rounded-md h-96"
                            src="https://images.unsplash.com/photo-1644018335954-ab54c83e007f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                            alt=""
                        />

                        <div class="relative z-20 max-w-lg p-6 mx-auto -mt-20 bg-white rounded-md shadow dark:bg-gray-900">
                            <a
                                href="#"
                                class="font-semibold text-gray-800 hover:underline dark:text-white md:text-xl"
                            >
                                All the features you want to know
                            </a>

                            <p class="mt-3 text-sm text-gray-500 dark:text-gray-300 md:text-sm">
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Iure veritatis sint autem
                                nesciunt, laudantium quia tempore delect
                            </p>

                            <p class="mt-3 text-sm text-blue-500">
                                21 October 2019
                            </p>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: false }}
                    >
                        <img
                            class="relative z-10 object-cover w-full rounded-md h-96"
                            src="https://images.unsplash.com/photo-1644018335954-ab54c83e007f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                            alt=""
                        />

                        <div class="relative z-20 max-w-lg p-6 mx-auto -mt-20 bg-white rounded-md shadow dark:bg-gray-900">
                            <a
                                href="#"
                                class="font-semibold text-gray-800 hover:underline dark:text-white md:text-xl"
                            >
                                All the features you want to know
                            </a>

                            <p class="mt-3 text-sm text-gray-500 dark:text-gray-300 md:text-sm">
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Iure veritatis sint autem
                                nesciunt, laudantium quia tempore delect
                            </p>

                            <p class="mt-3 text-sm text-blue-500">
                                21 October 2019
                            </p>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        viewport={{ once: false }}
                    >
                        <img
                            class="relative z-10 object-cover w-full rounded-md h-96"
                            src="https://images.unsplash.com/photo-1644018335954-ab54c83e007f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                            alt=""
                        />

                        <div class="relative z-20 max-w-lg p-6 mx-auto -mt-20 bg-white rounded-md shadow dark:bg-gray-900">
                            <a
                                href="#"
                                class="font-semibold text-gray-800 hover:underline dark:text-white md:text-xl"
                            >
                                All the features you want to know
                            </a>

                            <p class="mt-3 text-sm text-gray-500 dark:text-gray-300 md:text-sm">
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Iure veritatis sint autem
                                nesciunt, laudantium quia tempore delect
                            </p>

                            <p class="mt-3 text-sm text-blue-500">
                                21 October 2019
                            </p>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: false }}
                    >
                        <img
                            class="relative z-10 object-cover w-full rounded-md h-96"
                            src="https://images.unsplash.com/photo-1644018335954-ab54c83e007f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                            alt=""
                        />

                        <div class="relative z-20 max-w-lg p-6 mx-auto -mt-20 bg-white rounded-md shadow dark:bg-gray-900">
                            <a
                                href="#"
                                class="font-semibold text-gray-800 hover:underline dark:text-white md:text-xl"
                            >
                                All the features you want to know
                            </a>

                            <p class="mt-3 text-sm text-gray-500 dark:text-gray-300 md:text-sm">
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Iure veritatis sint autem
                                nesciunt, laudantium quia tempore delect
                            </p>

                            <p class="mt-3 text-sm text-blue-500">
                                21 October 2019
                            </p>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default Articles;
