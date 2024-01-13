import { useEffect, useState, useRef } from "react";
import NavLink from "@/Components/NavLink";
import { Link, useForm } from "@inertiajs/react";
import Footer from "@/sections/Footer";
import Header from "@/sections/Header";
import { FaHouseUser } from "react-icons/fa";
import { CgUser } from "react-icons/cg";
import { MdSavedSearch } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import { FiLogOut, FiBookmark } from "react-icons/fi";
import { BiMessageDetail } from "react-icons/bi";
import { BsInbox } from "react-icons/bs";
import { TbFriends, TbLayoutSidebarLeftCollapse } from "react-icons/tb";
import { CgMenuRight } from "react-icons/cg";
import ResponsiveNavLink from "../Components/ResponsiveNavLink";
import { BsChat } from "react-icons/bs";
import { MdOutlineVerifiedUser } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import InputError from "@/Components/InputError";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

export default function Authenticated({ auth, children }) {
    const [replies, setReplies] = useState(null);
    const [showMenu, setShowMenu] = useState(false);
    const [showChat, setShowChat] = useState(false);
    const [isInitialRequestMade, setIsInitialRequestMade] = useState(false);
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);
    const { data, setData, post, processing, errors } = useForm({
        body: "",
    });
    const repliesEndRef = useRef(null);

    const handleOnChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const handleMenuToggle = () => {
        setShowMenu(!showMenu);
    };

    const { data: conversation, refetch } = useQuery({
        queryKey: ["customerSupportConversation"],
        queryFn: () =>
            axios.get("/customer-support").then((res) => {
                setReplies(res.data.replies);
                return res.data;
            }),
        enabled: false, // Prevents the query from automatically running
    });

    const handleChatToggle = () => {
        // Open the chat if it's currently closed
        if (!showChat && !isInitialRequestMade) {
            try {
                refetch();
                setIsInitialRequestMade(true);
            } catch (error) {
                console.error(error);
            }
        }
        setShowChat(!showChat);
    };

    const submit = (e) => {
        e.preventDefault();

        if (conversation != null) {
            Echo.leave(`conversation.${conversation.id}`);
        }

        post(route("conversation.reply", conversation.id), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                refetch();
                setData("body", "");
                add();
            },
        });
    };

    const add = () => {
        if (conversation != null) {
            Echo.private(`conversation.${conversation.id}`).listen(
                "ConversationReplyCreated",
                (e) => {
                    console.log(replies);
                    setReplies((prevReplies) => [...prevReplies, { ...e }]);
                }
            );
        }
    };

    const ConversationReplies = () => {
        return replies?.map((reply) =>
            reply.user_id !== auth.user.id ? (
                <div
                    key={reply.id}
                    ref={repliesEndRef}
                    className="flex flex-1 gap-3 my-4 text-sm text-gray-600"
                >
                    <span className="relative flex w-8 h-8 overflow-hidden rounded-full shrink-0">
                        <div className="p-1 bg-gray-100 border rounded-full">
                            <svg
                                stroke="none"
                                fill="black"
                                strokeWidth="1.5"
                                viewBox="0 0 24 24"
                                ariaHidden="true"
                                height="20"
                                width="20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
                                ></path>
                            </svg>
                        </div>
                    </span>
                    <p className="leading-relaxed">
                        <span className="block font-bold text-gray-700 capitalize">
                            Support{" "}
                        </span>
                        {reply.body}
                    </p>
                </div>
            ) : (
                <div
                    key={reply.id}
                    className="flex flex-1 gap-3 my-4 text-sm text-gray-600"
                >
                    <span className="relative flex w-8 h-8 overflow-hidden rounded-full shrink-0">
                        <div className="p-1 bg-gray-100 border rounded-full">
                            <svg
                                stroke="none"
                                fill="black"
                                strokeWidth="0"
                                viewBox="0 0 16 16"
                                height="20"
                                width="20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"></path>
                            </svg>
                        </div>
                    </span>
                    <p className="leading-relaxed">
                        <span className="block font-bold text-gray-700">
                            You{" "}
                        </span>
                        {reply.body}
                    </p>
                </div>
            )
        );
    };

    const handleMenuClose = () => {
        setShowMenu(false);
    };

    useEffect(() => {
        const main = document.querySelector("main");
        showMenu
            ? main.classList.add("show-menu")
            : main.classList.remove("show-menu");
    }, [showMenu]);

    const scrollToBottom = () => {
        repliesEndRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "end",
        });
    };

    return (
        <>
            <nav className="bg-[#270740] pt-[2rem] fixed top-0 left-0 w-[100%] h-[100vh]">
                <div className="max-w-[1024px] ml-[1.5rem] mr-[1.5rem] lg:ml-auto lg:mr-auto [@media(max-width:320px)]:ml-[1rem] [@media(max-width:320px)]:mr-[1rem]">
                    <div className="w-[200px] h-[200px] lg:w-[350px] lg:h-[350px] bg-[#42376d] rounded-[50%] absolute top-[-2rem] left-[-2rem] blur-[90px]"></div>
                    <div className="relative inline-flex hover:text-[#d6bdeb] text-[1.8rem] mb-[3.5rem] cursor-pointer text-[#9177a6]">
                        <button onClick={handleMenuClose} type="button">
                            <AiOutlineClose />
                        </button>
                    </div>

                    <div className="relative mb-[3rem]">
                        <div
                            className="w-[75px] h-[75px] sm:w-[100px] sm:h-[100px] lg:w-[120px] lg:h-[120px] lg:rounded-[2rem] lg:mb-[2rem] rounded-[1.5rem] overflow-hidden flex justify-center items-end mb-[1rem] "
                            style={{
                                background:
                                    "linear-gradient(224deg, #a22fe9 -2%, #ddaafe 97%)",
                            }}
                        >
                            <img
                                src={
                                    auth.user.avatar !==
                                    "https://www.gravatar.com/avatar/000000000000000000000000000000?d=mp"
                                        ? auth.user.avatar
                                        : "https://www.gravatar.com/avatar/000000000000000000000000000000?d=mp"
                                }
                                alt=""
                                className="w-[70px] sm:w-[90px] lg:w-[120px]"
                            />
                        </div>

                        <span className="block font-[500] mb-[.25rem] text-[#9177a6] text-[.813rem]">
                            Hi,
                        </span>
                        <h1 className="text-[#faf6fe] xs:text-3xl text-xl capitalize">
                            {auth.user.first_name}
                        </h1>
                    </div>

                    <ul className="flex flex-col gap-[1.5rem]">
                        <li className="nav__item">
                            <Link
                                href={route("favourites.index")}
                                className="lg:text-[1.25rem] hover:text-[#d6bdeb] text-[rgb(145, 119, 166)] inline-flex items-center gap-[1rem] text-[.813rem] font-[500]"
                                style={{
                                    tranisition: ".3s",
                                }}
                            >
                                <FiBookmark className="text-[1.15rem] lg:text-[1.5rem]" />
                                <span className="[@media(max-width:480px)]:hidden">
                                    Saved Properties
                                </span>
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
                                <span className="[@media(max-width:480px)]:hidden">
                                    Recently Viewed
                                </span>
                            </Link>
                        </li>
                        <li className="nav__item">
                            <Link
                                href={route("message.index")}
                                className="lg:text-[1.25rem] hover:text-[#d6bdeb] text-[rgb(145, 119, 166)] inline-flex items-center gap-[1rem] text-[.813rem] font-[500]"
                                style={{
                                    tranisition: ".3s",
                                }}
                            >
                                <BiMessageDetail className="text-[1.15rem] lg:text-[1.5rem]" />
                                <span className="[@media(max-width:480px)]:hidden">
                                    Messages
                                </span>
                            </Link>
                        </li>
                        <li className="nav__item">
                            <Link
                                href={route("conversation.index")}
                                className="lg:text-[1.25rem] hover:text-[#d6bdeb] text-[rgb(145, 119, 166)] inline-flex items-center gap-[1rem] text-[.813rem] font-[500]"
                                style={{
                                    tranisition: ".3s",
                                }}
                            >
                                <BsInbox className="text-[1.15rem] lg:text-[1.5rem]" />
                                <span className="[@media(max-width:480px)]:hidden">
                                    Inbox
                                </span>
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
                                <span className="[@media(max-width:480px)]:hidden">
                                    Profile
                                </span>
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
                                <span className="[@media(max-width:480px)]:hidden">
                                    Log Out
                                </span>
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
                                    <div className="flex items-center -mr-2 sm:hidden">
                                        <button
                                            onClick={() =>
                                                setShowingNavigationDropdown(
                                                    (previousState) =>
                                                        !previousState
                                                )
                                            }
                                            className="inline-flex items-center justify-center p-2 text-gray-400 transition duration-150 ease-in-out rounded-md dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 dark:hover:bg-gray-900 focus:outline-none dark:focus:bg-gray-900 focus:text-gray-500 dark:focus:text-gray-400"
                                        >
                                            <CgMenuRight
                                                className={
                                                    !showingNavigationDropdown
                                                        ? "inline-flex w-6 h-6"
                                                        : "hidden"
                                                }
                                            />
                                            <AiOutlineClose
                                                className={
                                                    showingNavigationDropdown
                                                        ? "inline-flex w-6 h-6"
                                                        : "hidden"
                                                }
                                            />
                                        </button>
                                    </div>
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
                                                className="gap-2"
                                                href={route("my-properties")}
                                                active={route().current(
                                                    "my-properties"
                                                )}
                                            >
                                                <FaHouseUser className="text-[1.15rem] lg:text-[1.5rem]" />
                                                My Properties
                                            </NavLink>
                                            <NavLink
                                                className="gap-2"
                                                href={route("roommate.index")}
                                                active={route().current(
                                                    "roommate.index"
                                                )}
                                            >
                                                <TbFriends className="text-[1.15rem] lg:text-[1.5rem]" />
                                                Roommate
                                            </NavLink>
                                            <NavLink
                                                className="gap-2"
                                                href={route(
                                                    "verification.index"
                                                )}
                                                active={route().current(
                                                    "verification.index"
                                                )}
                                            >
                                                <MdOutlineVerifiedUser className="text-[1.15rem] lg:text-[1.5rem]" />
                                                Verify
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
                                            <TbLayoutSidebarLeftCollapse
                                                className={
                                                    !showMenu
                                                        ? "inline-flex w-6 h-6"
                                                        : "hidden"
                                                }
                                            />
                                            <AiOutlineClose
                                                className={
                                                    showMenu
                                                        ? "inline-flex w-6 h-6"
                                                        : "hidden"
                                                }
                                            />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div
                                className={
                                    (showingNavigationDropdown
                                        ? "block"
                                        : "hidden") + " sm:hidden"
                                }
                            >
                                <div className="pt-2 pb-3 space-y-1">
                                    <ResponsiveNavLink
                                        href={route("dashboard")}
                                        active={route().current("dashboard")}
                                    >
                                        Dashboard
                                    </ResponsiveNavLink>
                                </div>

                                <div className="pt-4 pb-1 border-t border-gray-200 dark:border-gray-600">
                                    <div className="">
                                        <div className="text-base font-medium text-gray-800 dark:text-gray-200">
                                            {auth.user.roles == "admin" ||
                                            auth.user.roles == "moderator" ||
                                            auth.user.roles == "writer" ? (
                                                <ResponsiveNavLink
                                                    href={route("admin.index")}
                                                    active={route().current(
                                                        "admin.index"
                                                    )}
                                                >
                                                    Admin
                                                </ResponsiveNavLink>
                                            ) : (
                                                ""
                                            )}
                                        </div>
                                        <div className="text-sm font-medium text-gray-500">
                                            <ResponsiveNavLink
                                                className="gap-2"
                                                href={route("my-properties")}
                                                active={route().current(
                                                    "my-properties"
                                                )}
                                            >
                                                <FaHouseUser className="text-[1.15rem] lg:text-[1.5rem]" />
                                                My Properties
                                            </ResponsiveNavLink>
                                        </div>
                                        <div className="text-sm font-medium text-gray-500">
                                            <ResponsiveNavLink
                                                className="gap-2"
                                                href={route("roommate.index")}
                                                active={route().current(
                                                    "roommate.index"
                                                )}
                                            >
                                                <TbFriends className="text-[1.15rem] lg:text-[1.5rem]" />
                                                Roommate
                                            </ResponsiveNavLink>
                                        </div>
                                    </div>

                                    <div className="mt-3 space-y-1 border-t border-gray-200 dark:border-gray-600">
                                        <ResponsiveNavLink
                                            method="post"
                                            href={route("logout")}
                                            as="button"
                                        >
                                            Log Out
                                        </ResponsiveNavLink>
                                    </div>
                                </div>
                            </div>
                        </nav>
                        {children}
                    </div>
                    {auth.user.roles[0] !== "customer service" && (
                        <>
                            <button
                                onClick={handleChatToggle}
                                className="fixed inline-flex items-center justify-center w-16 h-16 p-0 m-0 text-sm font-medium leading-5 normal-case bg-black border border-gray-200 rounded-full cursor-pointer bottom-4 right-4 disabled:pointer-events-none disabled:opacity-50 hover:bg-gray-700 bg-none hover:text-gray-900"
                                type="button"
                            >
                                {showChat ? (
                                    <AiOutlineClose
                                        size={28}
                                        className="text-white transition-transform duration-500 ease-in-out rotate-target hover:rotate-90"
                                    />
                                ) : (
                                    <BsChat
                                        size={28}
                                        className="text-white transition-transform duration-500 ease-in-out rotate-target hover:rotate-12"
                                    />
                                )}
                            </button>
                            {showChat && (
                                <div
                                    style={{
                                        boxShadow: `0 0 #0000, 0 0 #0000, 0 1px 2px 0 rgb(0 0 0 / 0.05)`,
                                    }}
                                    className="fixed bottom-[calc(4rem+1.5rem)] right-0 mr-4 bg-white p-6 rounded-lg border border-[#e5e7eb] w-[440px] h-[483px]"
                                >
                                    <div className="flex flex-col space-y-1.5 pb-6">
                                        <h2 className="text-lg font-semibold tracking-tight">
                                            Customer Support
                                        </h2>

                                        <p className="text-sm text-[#6b7280] leading-3">
                                            Please enter your enquiry.
                                        </p>
                                    </div>
                                    <div className="pr-4 h-[324px] overflow-y-auto">
                                        {conversation ? (
                                            <>
                                                <div className="flex flex-1 gap-3 my-4 text-sm text-gray-600">
                                                    <span className="relative flex w-8 h-8 overflow-hidden rounded-full shrink-0">
                                                        <div className="p-1 bg-gray-100 border rounded-full">
                                                            <svg
                                                                stroke="none"
                                                                fill="black"
                                                                strokeWidth="1.5"
                                                                viewBox="0 0 24 24"
                                                                ariaHidden="true"
                                                                height="20"
                                                                width="20"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
                                                                ></path>
                                                            </svg>
                                                        </div>
                                                    </span>
                                                    <p className="leading-relaxed">
                                                        <span className="block font-bold text-gray-700 capitalize">
                                                            {
                                                                conversation
                                                                    .message
                                                                    .owner
                                                                    .receiver
                                                                    .first_name
                                                            }{" "}
                                                        </span>
                                                        {conversation.body}
                                                    </p>
                                                </div>
                                                {replies?.length > 0 && (
                                                    <ConversationReplies />
                                                )}
                                            </>
                                        ) : (
                                            "Loading..."
                                        )}
                                    </div>

                                    <button
                                        className="fixed bottom-[180px] right-6 rounded-full bg-gray-800 p-1"
                                        onClick={scrollToBottom}
                                    >
                                        <MdOutlineKeyboardArrowDown className="w-6 h-6 text-white" />
                                    </button>

                                    <div className="flex items-center pt-0">
                                        <form
                                            onSubmit={submit}
                                            className="flex items-center justify-center w-full space-x-2"
                                        >
                                            <input
                                                type="text"
                                                name="body"
                                                className="flex h-10 w-full rounded-md border border-[#e5e7eb] px-3 py-2 text-sm placeholder-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#9ca3af] disabled:cursor-not-allowed disabled:opacity-50 text-[#030712] focus-visible:ring-offset-2"
                                                placeholder="Type your message"
                                                value={data.body}
                                                onChange={handleOnChange}
                                            />
                                            <InputError
                                                message={errors.body}
                                                className="mt-2"
                                            />
                                            <button
                                                type="submit"
                                                disabled={processing}
                                                className="inline-flex items-center justify-center rounded-md text-sm font-medium text-[#f9fafb] disabled:pointer-events-none disabled:opacity-50 bg-black hover:bg-[#111827E6] h-10 px-4 py-2"
                                            >
                                                Send
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                    <Footer />
                </main>
            </div>
        </>
    );
}
