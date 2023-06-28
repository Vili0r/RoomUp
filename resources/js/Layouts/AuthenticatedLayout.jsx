import { useEffect, useState } from "react";
import NavLink from "@/Components/NavLink";
import { Link } from "@inertiajs/react";
import { Footer, Header } from "@/sections";
import { FaHouseUser } from "react-icons/fa";
import { CgUser } from "react-icons/cg";
import { MdSavedSearch } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import { FiLogOut, FiBookmark } from "react-icons/fi";
import { TfiSearch } from "react-icons/tfi";

export default function Authenticated({ auth, header, children }) {
    const [showMenu, setShowMenu] = useState(false);

    function handleMenuToggle() {
        setShowMenu(!showMenu);
    }

    function handleMenuClose() {
        setShowMenu(false);
    }
    const showAvatar = () => {
        return "/storage/";
    };

    useEffect(() => {
        const main = document.querySelector("main");
        showMenu
            ? main.classList.add("show-menu")
            : main.classList.remove("show-menu");
    }, [showMenu]);
    return (
        <>
            <nav className="bg-[#270740] pt-[2rem] fixed top-0 left-0 w-[100%] h-[100vh]">
                <div className="max-w-[1024px] ml-[1.5rem] mr-[1.5rem] lg:ml-auto lg:mr-auto [@media(max-width:320px)]:ml-[1rem] [@media(max-width:320px)]:mr-[1rem]">
                    <div className="w-[200px] h-[200px] lg:w-[350px] lg:h-[350px] bg-[#42376d] rounded-[50%] absolute top-[-2rem] left-[-2rem] blur-[90px]"></div>
                    <div className="relative inline-flex hover:text-[#d6bdeb] text-[1.8rem] mb-[3.5rem] cursor-pointer text-[#9177a6]">
                        <button onClick={handleMenuClose}>
                            <AiOutlineClose />
                        </button>
                    </div>

                    <div className="relative mb-[3rem]">
                        <div
                            className="w-[100px] h-[100px] lg:w-[120px] lg:h-[120px] lg:rounded-[2rem] lg:mb-[2rem] rounded-[1.5rem] overflow-hidden flex justify-center items-end mb-[1rem] "
                            style={{
                                background:
                                    "linear-gradient(224deg, #a22fe9 -2%, #ddaafe 97%)",
                            }}
                        >
                            <img
                                src={
                                    auth.user.avatar !==
                                    "https://www.gravatar.com/avatar/000000000000000000000000000000?d=mp"
                                        ? showAvatar() + auth.user.avatar
                                        : "https://www.gravatar.com/avatar/000000000000000000000000000000?d=mp"
                                }
                                alt=""
                                className="w-[70px] lg:w-[90px] mb-3"
                            />
                        </div>

                        <span className="block font-[500] mb-[.25rem] text-[#9177a6] text-[.813rem]">
                            Hi,
                        </span>
                        <h1 className="text-[#faf6fe] text-3xl capitalize">
                            {auth.user.first_name}
                        </h1>
                    </div>

                    <ul className="flex flex-col gap-[1.5rem]">
                        <li className="nav__item">
                            <Link
                                href={route("shared.index")}
                                className="lg:text-[1.25rem] hover:text-[#d6bdeb] text-[rgb(145, 119, 166)] inline-flex items-center gap-[1rem] text-[1rem] font-[500]"
                                style={{
                                    tranisition: ".3s",
                                }}
                            >
                                <FaHouseUser className="text-[1.15rem] lg:text-[1.5rem]" />
                                My Properties
                            </Link>
                        </li>
                        <li className="nav__item">
                            <Link
                                href={route("profile.edit")}
                                className="lg:text-[1.25rem] hover:text-[#d6bdeb] text-[rgb(145, 119, 166)] inline-flex items-center gap-[1rem] text-[.813rem] font-[500]"
                                style={{
                                    tranisition: ".3s",
                                }}
                            >
                                <CgUser className="text-[1.15rem] lg:text-[1.5rem]" />
                                Profile
                            </Link>
                        </li>
                        <li className="nav__item">
                            <Link
                                href={route("favourites.index")}
                                className="lg:text-[1.25rem] hover:text-[#d6bdeb] text-[rgb(145, 119, 166)] inline-flex items-center gap-[1rem] text-[.813rem] font-[500]"
                                style={{
                                    tranisition: ".3s",
                                }}
                            >
                                <FiBookmark className="text-[1.15rem] lg:text-[1.5rem]" />
                                Saved Properties
                            </Link>
                        </li>
                        <li className="nav__item">
                            <Link
                                href={route("property.viewed")}
                                className="lg:text-[1.25rem] hover:text-[#d6bdeb] text-[rgb(145, 119, 166)] inline-flex items-center gap-[1rem] text-[.813rem] font-[500]"
                                style={{
                                    tranisition: ".3s",
                                }}
                            >
                                <MdSavedSearch className="text-[1.15rem] lg:text-[1.5rem]" />
                                Recently Viewed
                            </Link>
                        </li>
                        <li className="nav__item">
                            <Link
                                method="post"
                                href={route("logout")}
                                as="button"
                                className="lg:text-[1.25rem] hover:text-[#d6bdeb] text-[rgb(145, 119, 166)] inline-flex items-center gap-[1rem] text-[.813rem] font-[500]"
                                style={{
                                    tranisition: ".3s",
                                }}
                            >
                                <FiLogOut className="text-[1.15rem] lg:text-[1.5rem]" />
                                Log Out
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
            <div className="">
                <main className="overflow-hidden main" id="main">
                    <div className="min-h-screen overflow-x-hidden bg-gray-100 dark:bg-gray-900">
                        <Header user={auth} />
                        <nav className="pt-[4rem] bg-white border-b border-gray-100 dark:bg-gray-800 dark:border-gray-700">
                            <div className="bg-indigo-600">
                                <div className="flex items-start justify-between max-w-screen-xl px-4 py-3 mx-auto text-white md:px-8">
                                    <div className="flex gap-x-4">
                                        <div className="flex items-center justify-center flex-none w-10 h-10 bg-indigo-800 rounded-lg">
                                            <svg
                                                className="w-6 h-6"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 001.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 010 3.46"
                                                />
                                            </svg>
                                        </div>
                                        <p className="py-2 font-medium">
                                            Welcome back to your account!{" "}
                                            <span className="font-semibold underline duration-150 hover:text-indigo-100">
                                                Keep searching for your home.
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                                <div className="flex justify-between h-16">
                                    <div className="flex">
                                        <div className="flex items-center shrink-0"></div>

                                        <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                                            <NavLink
                                                href={route("dashboard")}
                                                active={route().current(
                                                    "dashboard"
                                                )}
                                            >
                                                Dashboard
                                            </NavLink>
                                            <NavLink
                                                href={route("flat.index")}
                                                active={route().current(
                                                    "flat.index"
                                                )}
                                            >
                                                Flats
                                            </NavLink>
                                            {auth.user.roles == "admin" ||
                                            auth.user.roles == "moderator" ||
                                            auth.user.roles == "writer" ? (
                                                <NavLink
                                                    href={route("admin.index")}
                                                    active={route().current(
                                                        "admin.index"
                                                    )}
                                                >
                                                    Admin
                                                </NavLink>
                                            ) : (
                                                ""
                                            )}
                                            <NavLink
                                                href={route("shared.create")}
                                                active={route().current(
                                                    "shared.create"
                                                )}
                                            >
                                                Shared Ad
                                            </NavLink>
                                            <NavLink
                                                href={route("flat.create")}
                                                active={route().current(
                                                    "flat.create"
                                                )}
                                            >
                                                Flat Ad
                                            </NavLink>
                                        </div>
                                    </div>

                                    <div className="hidden mt-2 sm:flex sm:items-center sm:ml-6">
                                        <div className="relative ml-3">
                                            <button
                                                onClick={handleMenuToggle}
                                                className="relative rounded-md border-2 border-black bg-white px-10 py-3 text-lg font-semibold text-black transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[4px_4px_0_rgb(41,37,36)] hover:after:absolute hover:after:top-0 hover:after:left-0 hover:after:-bottom-2 hover:after:-right-2 hover:after:-z-10"
                                            >
                                                Account
                                            </button>
                                        </div>
                                    </div>
                                    <div className="flex items-center -mr-2 sm:hidden">
                                        <button
                                            onClick={handleMenuToggle}
                                            className="relative rounded-md border-2 border-black bg-white px-5 py-3 text-lg font-semibold text-black transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[5px_5px_0_rgb(41,37,36)]"
                                        >
                                            <svg
                                                className="w-6 h-6"
                                                stroke="currentColor"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    className={
                                                        !showMenu
                                                            ? "inline-flex"
                                                            : "hidden"
                                                    }
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M4 6h16M4 12h16M4 18h16"
                                                />
                                                <path
                                                    className={
                                                        showMenu
                                                            ? "inline-flex"
                                                            : "hidden"
                                                    }
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M6 18L18 6M6 6l12 12"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </nav>
                        {children}
                    </div>
                    <Footer />
                </main>
            </div>
        </>
    );
}
