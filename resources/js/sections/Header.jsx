import React, { useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import { logo } from "@/assets";
import { AiOutlineMenu } from "react-icons/ai";
import PlaceAdModal from "@/Components/PlaceAdModal";
import SearchModal from "@/Components/SearchModal";
import { IoIosGlobe } from "react-icons/io";
import { useTranslation } from "react-i18next";

const Header = ({ user }) => {
    const [navColor, setNavColor] = useState(false);
    const { url } = usePage();
    const [isOpen, setIsOpen] = useState(false);
    const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
    const [isMenuIconOpen, setIsMenuIconOpen] = useState(false);
    const { i18n } = useTranslation();
    const [lng, setLng] = useState(i18n.language);
    const { t } = useTranslation();
    const { placeAd, blog, searchHeader, login } = t("header");

    const closeModal = () => {
        setIsOpen(false);
    };

    const openModal = () => {
        setIsOpen(true);
        setIsMenuIconOpen(false);
    };

    const closeSearchModal = () => {
        setIsSearchModalOpen(false);
    };

    const openSearchModal = () => {
        setIsSearchModalOpen(true);
        setIsMenuIconOpen(false);
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
        } else {
            i18n.changeLanguage("en");
            setLng("en");
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
                <PlaceAdModal isOpen={isOpen} closeModal={closeModal} />
                <SearchModal
                    isOpen={isSearchModalOpen}
                    closeModal={closeSearchModal}
                />

                <div className="ml-[auto] md:mr-[3rem] [@media(max-width:639px)]:hidden">
                    <ul className="flex justify-between items-center gap-0 sm:gap-1 md:gap-[4rem]">
                        <li>
                            <button
                                onClick={openModal}
                                className="flex items-center justify-between gap-2 pl-3 pr-4 text-gray-600 md:hover:bg-transparent hover:text-black md:p-0"
                            >
                                <span className="  md:m-[-2rem]">
                                    {placeAd}
                                </span>
                            </button>
                        </li>

                        <li>
                            <Link
                                href={route("blog")}
                                className="flex items-center justify-between gap-2 pl-3 pr-4 text-gray-600 md:hover:bg-transparent hover:text-black md:p-0"
                            >
                                {blog}
                            </Link>
                        </li>
                        <li>
                            <button
                                onClick={openSearchModal}
                                className="flex items-center justify-between gap-2 pl-3 pr-4 text-gray-600 md:hover:bg-transparent hover:text-black md:p-0"
                            >
                                <span className=" md:m-[-2rem]">
                                    {searchHeader}
                                </span>
                            </button>
                        </li>
                        <li>
                            {user ? (
                                url !== "/dashboard" ? (
                                    <Link
                                        href={route("dashboard")}
                                        className="font-semibold text-gray-600 md:hover:bg-transparent hover:text-dark md:p-0"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    ""
                                )
                            ) : (
                                <>
                                    <Link
                                        href={route("login")}
                                        className=" sm:text-white sm:bg-[#F1C40F] [@media(max-width:639px)]:hover:text-[#F1C40F] sm:hover:bg-orange-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:-mr-10 dark:hover:bg-[#6D4C41] dark:bg-[#3E4147]"
                                    >
                                        {login}
                                    </Link>
                                </>
                            )}
                        </li>
                        <li>
                            <button
                                className="flex items-center gap-1 text-gray-600 hover:text-black"
                                onClick={changeLanguage}
                            >
                                <IoIosGlobe style={{ fontSize: "1.25rem" }} />
                                {lng}
                            </button>
                        </li>
                    </ul>
                </div>
                <div
                    onClick={() => setIsMenuIconOpen((prev) => !prev)}
                    className="[@media(min-width:640px)]:hidden z-10"
                >
                    <AiOutlineMenu className="w-6 h-6 text-white" />
                </div>
                <div
                    className={`${
                        isMenuIconOpen ? "right-0" : "right-[-50%]"
                    } absolute bg-black h-[100vh] text-white w-[50%] top-0 transition-all duration-1000 ease-in flex flex-col justify-center items-center font-thin text-base space-y-8`}
                >
                    <button onClick={openModal}>{placeAd}</button>
                    <button onClick={openSearchModal}>{searchHeader}</button>
                    <Link href={route("blog")}>{blog}</Link>
                    {user ? (
                        url !== "/dashboard" ? (
                            <Link href={route("dashboard")}>Dashboard</Link>
                        ) : (
                            ""
                        )
                    ) : (
                        <>
                            <Link href={route("login")}>{login}</Link>
                        </>
                    )}
                    <Link href={route("register")}>Sign up</Link>
                    <button
                        className="flex items-center gap-1 "
                        onClick={changeLanguage}
                    >
                        <IoIosGlobe style={{ fontSize: "1.25rem" }} />
                        {lng}
                    </button>
                </div>
            </nav>
        </header>
    );
};

export default Header;
