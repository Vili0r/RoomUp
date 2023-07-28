import React, { useState, useContext } from "react";
import { Link, usePage } from "@inertiajs/react";
import ThemeContext from "../context/ThemeContext";
import { logo } from "@/assets";
import { FaBloggerB } from "react-icons/fa";
import { AiOutlineTeam, AiOutlineHome, AiOutlineSearch } from "react-icons/ai";
import { RiAdvertisementLine } from "react-icons/ri";
import { PlaceAdModal, SearchModal } from "@/Components";

const Header = ({ user, selectedQueries }) => {
    const { theme, handleTheme } = useContext(ThemeContext);
    const [navColor, setNavColor] = useState(false);
    const { url } = usePage();
    const [isOpen, setIsOpen] = useState(false);
    const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

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
                                self-center ml-2  text-xl font-[500] whitespace-nowrap font-popp`}
                    >
                        RoomUp
                    </span>
                </Link>

                {/* {url.includes("/home-search") && (
                    <div className="flex md:relative items-center p-2 py-3 bg-white border border-[#f3f2f2] hover:border-[#bcbaba] rounded-full text-black font-bold font-popp text-lg">
                        <AiOutlineSearch className="w-7 h-7" />
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="w-full px-3 text-lg bg-transparent border-none focus:outline-none focus:border-none focus:ring-0 font-popp"
                            placeholder="Enter address, city or zipcode"
                        />
                    </div>
                )} */}
                <div className="[@media(max-width:799px)]:fixed [@media(max-width:799px)]:bottom-[2rem] [@media(max-width:799px)]:bg-[#fff] [@media(max-width:799px)]:shadow [@media(max-width:799px)]:shadow-gray-400 [@media(max-width:799px)]:w-[90%] [@media(max-width:799px)]:left-0 [@media(max-width:799px)]:right-0 [@media(max-width:799px)]:mx-auto [@media(max-width:799px)]:p-3 [@media(max-width:799px)]:rounded-[1.25rem] [@media(max-width:320px)]:px-[0rem] [@media(min-width:576px)]:w-[324px] w-[initial] ml-[auto] md:mr-[3rem]">
                    <ul className="flex justify-between items-center gap-[2.5rem] [@media(max-width:350px)]:gap-[2rem] xxs:gap-[2.25rem] [@media(max-width:320px)]:ml-[-0.5rem]">
                        <li>
                            <Link
                                href={route("welcome")}
                                className="flex justify-between text-[hsl(228, 12%, 75%)] items-center gap-2 py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#F1C40F] md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                            >
                                <AiOutlineHome
                                    className="md:hidden"
                                    style={{ fontSize: "1.25rem" }}
                                />
                                <span className="[@media(max-width:799px)]:hidden font-popp">
                                    Home
                                </span>
                            </Link>
                        </li>
                        <li>
                            <button
                                onClick={openModal}
                                className="flex justify-between items-center gap-2 py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#F1C40F] md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                            >
                                <RiAdvertisementLine
                                    className="md:hidden"
                                    style={{ fontSize: "1.25rem" }}
                                />
                                <span className="[@media(max-width:799px)]:hidden font-popp md:m-[-2rem]">
                                    Place Ad
                                </span>
                            </button>
                        </li>
                        <PlaceAdModal isOpen={isOpen} closeModal={closeModal} />
                        <SearchModal
                            isOpen={isSearchModalOpen}
                            closeModal={closeSearchModal}
                            selectedQueries={selectedQueries}
                        />

                        <li>
                            <Link
                                href={route("blog")}
                                className="flex justify-between items-center gap-2 py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#F1C40F] md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                            >
                                <FaBloggerB
                                    className="md:hidden"
                                    style={{ fontSize: "1.25rem" }}
                                />
                                <span className="[@media(max-width:799px)]:hidden font-popp">
                                    Blog
                                </span>
                            </Link>
                        </li>
                        <li>
                            <button
                                onClick={openSearchModal}
                                className="flex justify-between items-center gap-2 py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#F1C40F] md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                            >
                                <AiOutlineTeam
                                    className="md:hidden"
                                    style={{ fontSize: "1.25rem" }}
                                />
                                <span className="[@media(max-width:799px)]:hidden font-popp md:m-[-2rem]">
                                    Search
                                </span>
                            </button>
                        </li>
                    </ul>
                </div>
                {/* <button
                    onClick={handleTheme}
                    className={`${
                        navColor ? "text-[#1f2f70]" : "text-gray-400"
                    } hover:text-[#F5B041] text-[1.25rem] cursor-pointer mr-10 md:mr-4 dark:text-gray-400`}
                    style={{ transition: ".3s" }}
                >
                    {theme === "dark" ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                            />
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                            />
                        </svg>
                    )}
                </button> */}
                {user ? (
                    url !== "/dashboard" ? (
                        <Link
                            href={route("dashboard")}
                            className="font-semibold md:hover:bg-transparent md:hover:text-[#F1C40F] md:p-0 md:dark:hover:text-white"
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
                            className="text-white [@media(max-width:799px)]:hidden bg-[#F1C40F] hover:bg-orange-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:hover:bg-[#6D4C41] dark:bg-[#3E4147]"
                        >
                            Login
                        </Link>
                    </>
                )}
            </nav>
        </header>
    );
};

export default Header;
