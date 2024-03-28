import React from "react";
import { Link, router } from "@inertiajs/react";
import { logo } from "@/assets";
import { BsFacebook, BsTwitter, BsInstagram, BsLinkedin } from "react-icons/bs";
import { useTranslation } from "react-i18next";

const Footer = ({ scrollToServices }) => {
    const { t } = useTranslation();
    const {
        missionOne,
        missionTwo,
        about,
        features,
        blog,
        faq,
        support,
        supportCenter,
        contact,
        follow,
        rights,
        terms,
    } = t("welcome.footer");

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
                        <span className="self-center ml-2 text-xl font-semibold text-gray-500 whitespace-nowrap dark:text-white">
                            RoomUp
                        </span>
                    </Link>
                    <p className="text-[.813rem] font-[500]">
                        {missionOne} <br /> {missionTwo}
                    </p>
                </div>
                <div
                    className="grid grid-cols-2 mt-4 md:grid-cols-3"
                    style={{ gap: "2.5rem 4rem" }}
                >
                    <div>
                        <h3 className="font-[1.25rem] mb-[1rem] dark:text-gray-400">
                            {about}
                        </h3>
                        <ul className="gap-[0.5rem]">
                            <li
                                className="text-[hsl(228, 15%, 50%)] hover:text-[hsl(228, 57%, 28%)] dark:text-gray-400"
                                style={{ transition: ".3s" }}
                            >
                                <button
                                    onClick={(e) => {
                                        e.preventDefault(); // Prevent default anchor behavior
                                        scrollToServices(); // Trigger the scroll
                                    }}
                                    className="text-[hsl(228, 15%, 50%)] hover:text-[hsl(228, 57%, 28%)] dark:text-gray-400"
                                    style={{ transition: ".3s" }}
                                >
                                    {features}
                                </button>
                            </li>
                            <li className="">
                                <Link
                                    href={route("blog")}
                                    className="text-[hsl(228, 15%, 50%)] hover:text-[hsl(228, 57%, 28%)] dark:text-gray-400"
                                    style={{ transition: ".3s" }}
                                >
                                    {blog}
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-[1.25rem] mb-[1rem] dark:text-gray-400">
                            {support}
                        </h3>
                        <ul className="gap-y-[0.5rem]">
                            <li className="">
                                <Link
                                    href={route("faqs")}
                                    className="text-[hsl(228, 15%, 50%)] hover:text-[hsl(228, 57%, 28%)] dark:text-gray-400"
                                    style={{ transition: ".3s" }}
                                >
                                    {faq}
                                </Link>
                            </li>
                            <li className="">
                                <Link
                                    href={route("dashboard")}
                                    className="text-[hsl(228, 15%, 50%)] hover:text-[hsl(228, 57%, 28%)] dark:text-gray-400"
                                    style={{ transition: ".3s" }}
                                >
                                    {supportCenter}
                                </Link>
                            </li>
                            <li className="">
                                <Link
                                    href={route("customer-contact.create")}
                                    className="text-[hsl(228, 15%, 50%)] hover:text-[hsl(228, 57%, 28%)] dark:text-gray-400"
                                    style={{ transition: ".3s" }}
                                >
                                    {contact}
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="">
                        <h3 className="font-[1.25rem] mb-[1rem] dark:text-gray-400">
                            {follow}
                        </h3>
                        <ul className="flex gap-[1rem]">
                            <a
                                href="https://www.facebook.com/"
                                target="_blank"
                                className="text-[1.25rem] text-[hsl(228, 15%, 50%)] hover:text-[hsl(228, 57%, 28%)]"
                            >
                                <BsFacebook />
                            </a>
                            <a
                                href="https://www.instagram.com/"
                                target="_blank"
                                className="text-[1.25rem] text-[hsl(228, 15%, 50%)] hover:text-[hsl(228, 57%, 28%)]"
                            >
                                <BsInstagram />
                            </a>
                            <a
                                href="https://www.twitter.com/"
                                target="_blank"
                                className="text-[1.25rem] text-[hsl(228, 15%, 50%)] hover:text-[hsl(228, 57%, 28%)]"
                            >
                                <BsTwitter />
                            </a>
                            <a
                                href="https://www.linkedin.com/"
                                target="_blank"
                                className="text-[1.25rem] text-[hsl(228, 15%, 50%)] hover:text-[hsl(228, 57%, 28%)]"
                            >
                                <BsLinkedin />
                            </a>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="ml-[1.5rem] mr-[1.5rem] flex pb-[1rem] flex-col mt-[5.5rem] text-center gap-[1.5rem] dark:text-gray-400 md:flex-row md:justify-between md:pb-[2rem]">
                <span className="text-[.813rem] font-[500] text-[hsl(228, 15%, 50%)]">
                    &#169; RoomUp. {rights}
                </span>
                <div className="flex text-[.813rem] font-[500] text-[hsl(228, 15%, 50%)] justify-center gap-[1.25rem] dark:text-gray-400">
                    <Link href={route("terms")}>{terms}</Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
