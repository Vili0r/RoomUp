import React from "react";
import { Link, usePage } from "@inertiajs/react";
import { logo } from "@/assets";
import { BsFacebook, BsTwitter, BsInstagram, BsLinkedin } from "react-icons/bs";

const Footer = () => {
    return (
        <footer className="bg-white dark:bg-gray-900">
            <div className="grid gap-y-[2.5rem] ml-[1.5rem] mr-[1.5rem] md:grid-cols-2">
                <div className="mt-4">
                    <Link className="flex items-center">
                        <img
                            src={logo}
                            alt="logo"
                            className="object-contain w-10"
                        />
                        <span className="self-center ml-2 text-xl font-semibold text-gray-500 font-popp whitespace-nowrap dark:text-white">
                            RoomUp
                        </span>
                    </Link>
                    <p className="text-[.813rem] font-popp font-[500]">
                        Our mission is to make all people <br /> to find the
                        best place to live.
                    </p>
                </div>
                <div
                    className="grid grid-cols-2 mt-4 md:grid-cols-3 lg:grid-cols-4"
                    style={{ gap: "2.5rem 4rem" }}
                >
                    <div>
                        <h3 className="font-[1.25rem] mb-[1rem] font-popp dark:text-gray-400">
                            About
                        </h3>
                        <ul className="gap-[0.5rem]">
                            <li>
                                <Link
                                    className="text-[hsl(228, 15%, 50%)] font-popp hover:text-[hsl(228, 57%, 28%)] dark:text-gray-400"
                                    style={{ transition: ".3s" }}
                                >
                                    About Us
                                </Link>
                            </li>
                            <li
                                className="text-[hsl(228, 15%, 50%)] font-popp hover:text-[hsl(228, 57%, 28%)] dark:text-gray-400"
                                style={{ transition: ".3s" }}
                            >
                                <Link
                                    className="text-[hsl(228, 15%, 50%)] font-popp hover:text-[hsl(228, 57%, 28%)] dark:text-gray-400"
                                    style={{ transition: ".3s" }}
                                >
                                    Feaures
                                </Link>
                            </li>
                            <li className="">
                                <Link
                                    className="text-[hsl(228, 15%, 50%)] font-popp hover:text-[hsl(228, 57%, 28%)] dark:text-gray-400"
                                    style={{ transition: ".3s" }}
                                >
                                    News & Blog
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-[1.25rem] mb-[1rem] font-popp dark:text-gray-400">
                            Company
                        </h3>
                        <ul className="gap-y-[0.5rem]">
                            <li className="">
                                <Link
                                    className="text-[hsl(228, 15%, 50%)] font-popp hover:text-[hsl(228, 57%, 28%)] dark:text-gray-400"
                                    style={{ transition: ".3s" }}
                                >
                                    How We Work?
                                </Link>
                            </li>
                            <li className="">
                                <Link
                                    className="text-[hsl(228, 15%, 50%)] font-popp hover:text-[hsl(228, 57%, 28%)] dark:text-gray-400"
                                    style={{ transition: ".3s" }}
                                >
                                    Capital
                                </Link>
                            </li>
                            <li className="">
                                <Link
                                    className="text-[hsl(228, 15%, 50%)] font-popp hover:text-[hsl(228, 57%, 28%)] dark:text-gray-400"
                                    style={{ transition: ".3s" }}
                                >
                                    Security
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-[1.25rem] mb-[1rem] font-popp dark:text-gray-400">
                            Support
                        </h3>
                        <ul className="gap-y-[0.5rem]">
                            <li className="">
                                <Link
                                    className="text-[hsl(228, 15%, 50%)] font-popp hover:text-[hsl(228, 57%, 28%)] dark:text-gray-400"
                                    style={{ transition: ".3s" }}
                                >
                                    FAQs
                                </Link>
                            </li>
                            <li className="">
                                <Link
                                    className="text-[hsl(228, 15%, 50%)] font-popp hover:text-[hsl(228, 57%, 28%)] dark:text-gray-400"
                                    style={{ transition: ".3s" }}
                                >
                                    Support center
                                </Link>
                            </li>
                            <li className="">
                                <Link
                                    className="text-[hsl(228, 15%, 50%)] font-popp hover:text-[hsl(228, 57%, 28%)] dark:text-gray-400"
                                    style={{ transition: ".3s" }}
                                >
                                    Contact Us
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="">
                        <h3 className="font-[1.25rem] mb-[1rem] font-popp dark:text-gray-400">
                            Follow us
                        </h3>
                        <ul className="flex gap-[1rem]">
                            <a
                                href="https://www.facebook.com/"
                                target="_blank"
                                className="text-[1.25rem] text-[hsl(228, 15%, 50%)] font-popp hover:text-[hsl(228, 57%, 28%)]"
                            >
                                <BsFacebook />
                            </a>
                            <a
                                href="https://www.instagram.com/"
                                target="_blank"
                                className="text-[1.25rem] text-[hsl(228, 15%, 50%)] font-popp hover:text-[hsl(228, 57%, 28%)]"
                            >
                                <BsInstagram />
                            </a>
                            <a
                                href="https://www.twitter.com/"
                                target="_blank"
                                className="text-[1.25rem] text-[hsl(228, 15%, 50%)] font-popp hover:text-[hsl(228, 57%, 28%)]"
                            >
                                <BsTwitter />
                            </a>
                            <a
                                href="https://www.linkedin.com/"
                                target="_blank"
                                className="text-[1.25rem] text-[hsl(228, 15%, 50%)] font-popp hover:text-[hsl(228, 57%, 28%)]"
                            >
                                <BsLinkedin />
                            </a>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="ml-[1.5rem] mr-[1.5rem] flex pb-[1rem] font-popp flex-col mt-[5.5rem] text-center gap-[1.5rem] dark:text-gray-400 md:flex-row md:justify-between md:pb-[2rem]">
                <span className="text-[.813rem] font-[500] text-[hsl(228, 15%, 50%)]">
                    &#169; RoomUp. All right reserved
                </span>
                <div className="flex text-[.813rem] font-[500] text-[hsl(228, 15%, 50%)] font-popp justify-center gap-[1.25rem] dark:text-gray-400">
                    <Link>Terms & Agreements</Link>
                    <Link>Privacy Policy</Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
