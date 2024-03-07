import React, { useState, useContext } from "react";
import { Link, usePage, router } from "@inertiajs/react";
import ThemeContext from "../context/ThemeContext";
import { logo } from "@/assets";
import { FaBloggerB } from "react-icons/fa";
import { AiOutlineTeam } from "react-icons/ai";
import { RiAdvertisementLine } from "react-icons/ri";
import { BiSearch } from "react-icons/bi";
import PlaceAdModal from "@/Components/PlaceAdModal";
import SearchModal from "@/Components/SearchModal";
import { IoIosGlobe } from "react-icons/io";
import { useTranslation } from "react-i18next";
import axios from "axios";

const Header = ({ user }) => {
    const { theme, handleTheme } = useContext(ThemeContext);
    const [navColor, setNavColor] = useState(false);
    const { url } = usePage();
    const [isOpen, setIsOpen] = useState(false);
    const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
    const { i18n } = useTranslation();
    const [lng, setLng] = useState(i18n.language);
    const { t } = useTranslation();
    const { placeAd, blog, searchHeader, login } = t("header");
    const closeModal = () => {
        setIsOpen(false);
    };

    const openModal = () => {
        setIsOpen(true);
    };

    const closeSearchModal = () => {
        setIsSearchModalOpen(false);
    };

    const openSearchModal = () => {
        setIsSearchModalOpen(true);
    };

    const changeColor = () => {
        if (window.scrollY >= 50) {
            setNavColor(true);
        } else {
            setNavColor(false);
        }
    };

    const changeLanguage = () => {
        if (lng == "en") {
            i18n.changeLanguage("gr");
            setLng("ελ");
            axios.get("/language/gr");
        } else {
            i18n.changeLanguage("en");
            setLng("en");
            axios.get("/language/en");
        }
    };

    window.addEventListener("scroll", changeColor);
    return (
        <header
            className={`${
                navColor
                    ? "shadow shadow-[#2E86C1] bg-white dark:bg-[#15292B]"
                    : "bg-transparent"
            } fixed top-0 left-0 w-[100%] z-[100]`}
            style={{ transition: ".4s" }}
        >
            <nav className="h-[3.5rem] flex justify-between items-center md:h-[5rem] p-3">
                <Link
                    href={route("welcome")}
                    className="flex items-center"
                    style={{ transition: ".3s" }}
                >
                    <img
                        src={logo}
                        alt="logo"
                        className="object-contain w-10"
                    />
                    <span
                        className={`
                            ${navColor ? "text-gray-500 " : "text-gray-400"}
                                self-center ml-2  text-xl font-[500] whitespace-nowrap `}
                    >
                        RoomUp
                    </span>
                </Link>

                {/* {url.includes("/home-search") && (
                    <div className="flex md:relative items-center p-2 py-3 bg-white border border-[#f3f2f2] hover:border-[#bcbaba] rounded-full text-black font-bold  text-lg">
                        <AiOutlineSearch className="w-7 h-7" />
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="w-full px-3 text-lg bg-transparent border-none focus:outline-none focus:border-none focus:ring-0 "
                            placeholder="Enter address, city or zipcode"
                        />
                    </div>
                )} */}
                <div className="ml-[auto] md:mr-[3rem] [@media(max-width:320px)]:mr-[-0.5rem]">
                    <ul className="flex justify-between items-center gap-0 sm:gap-1 md:gap-[4rem]">
                        {/* <li>
                            <Link
                                href={route("welcome")}
                                className="flex justify-between text-[hsl(228, 12%, 75%)] items-center gap-2 py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#F1C40F] md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                            >
                                <AiOutlineHome
                                    className="sm:hidden"
                                    style={{ fontSize: "1.25rem" }}
                                />
                                <span className="[@media(max-width:640px)]:hidden ">
                                    Home
                                </span>
                            </Link>
                        </li> */}
                        <li>
                            <button
                                onClick={openModal}
                                className="flex justify-between items-center gap-2 pl-3 pr-4 md:hover:bg-transparent hover:text-[#F1C40F] md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                            >
                                <RiAdvertisementLine
                                    className="sm:hidden"
                                    style={{ fontSize: "1.25rem" }}
                                />
                                <span className="[@media(max-width:639px)]:hidden  md:m-[-2rem]">
                                    {placeAd}
                                </span>
                            </button>
                        </li>
                        <PlaceAdModal isOpen={isOpen} closeModal={closeModal} />
                        <SearchModal
                            isOpen={isSearchModalOpen}
                            closeModal={closeSearchModal}
                        />

                        <li>
                            <Link
                                href={route("blog")}
                                className="flex justify-between items-center gap-2 pl-3 pr-4 md:hover:bg-transparent hover:text-[#F1C40F] md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                            >
                                <FaBloggerB
                                    className="sm:hidden"
                                    style={{ fontSize: "1.25rem" }}
                                />
                                <span className="[@media(max-width:639px)]:hidden ">
                                    {blog}
                                </span>
                            </Link>
                        </li>
                        <li>
                            <button
                                onClick={openSearchModal}
                                className="flex justify-between items-center gap-2 pl-3 pr-4 md:hover:bg-transparent hover:text-[#F1C40F] md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                            >
                                <BiSearch
                                    className="sm:hidden"
                                    style={{ fontSize: "1.25rem" }}
                                />
                                <span className="[@media(max-width:639px)]:hidden  md:m-[-2rem]">
                                    {searchHeader}
                                </span>
                            </button>
                        </li>
                        <li>
                            {user ? (
                                url !== "/dashboard" ? (
                                    <Link
                                        href={route("dashboard")}
                                        className="font-semibold md:hover:bg-transparent hover:text-[#F1C40F] md:p-0 md:dark:hover:text-white"
                                    >
                                        <AiOutlineTeam
                                            className="mr-2 sm:hidden"
                                            style={{ fontSize: "1.25rem" }}
                                        />
                                        <span className="[@media(max-width:639px)]:hidden ">
                                            Dashboard
                                        </span>
                                    </Link>
                                ) : (
                                    ""
                                )
                            ) : (
                                <>
                                    <Link
                                        href={route("login")}
                                        className="sm:text-white sm:bg-[#F1C40F] [@media(max-width:639px)]:hover:text-[#F1C40F] sm:hover:bg-orange-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:hover:bg-[#6D4C41] dark:bg-[#3E4147]"
                                    >
                                        <AiOutlineTeam
                                            className="sm:hidden"
                                            style={{ fontSize: "1.25rem" }}
                                        />
                                        <span className="[@media(max-width:639px)]:hidden ">
                                            {login}
                                        </span>
                                    </Link>
                                </>
                            )}
                        </li>
                        <li>
                            <button
                                className="flex items-center gap-1 hover:text-[#F1C40F]"
                                onClick={changeLanguage}
                            >
                                <IoIosGlobe style={{ fontSize: "1.25rem" }} />
                                <span className="[@media(max-width:639px)]:hidden">
                                    {lng}
                                </span>
                            </button>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
};

export default Header;
