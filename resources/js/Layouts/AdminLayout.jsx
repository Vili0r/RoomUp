import { useState } from "react";
import { logo, SidebarBg, text } from "@/assets";
import { Link } from "@inertiajs/react";
import { CgMenuRight } from "react-icons/cg";
import { AiOutlineUser, AiOutlineKey, AiOutlineHome } from "react-icons/ai";
import { MdFingerprint, MdOutlineArticle } from "react-icons/md";
import { BiCategoryAlt, BiCommentDetail } from "react-icons/bi";
import { CiLogout, CiSettings } from "react-icons/ci";
import { SlFlag } from "react-icons/sl";
import { RiProfileLine } from "react-icons/ri";
import { IoIosArrowForward } from "react-icons/io";
import { IoShieldCheckmark } from "react-icons/io5";
import SidebarNavLink from "../Components/SidebarNavLink";
import { GiProtectionGlasses } from "react-icons/gi";
import { TfiHeadphoneAlt } from "react-icons/tfi";

export default function AdminLayoutII({ auth, children }) {
    const [showSidebarMenu, setShowSidebarMenu] = useState(false);

    return (
        <div className="w-full min-h-screen bg-[#F7F4F4]">
            {/* HEADER */}
            <header className="header fixed top-0 left-0 w-[100%] z-[100] bg-[#2F3E4D] backdrop-blur-[16px]">
                <div className="mx-4 my-4 flex justify-between items-center h-[3.5rem] lg:h-[5rem]">
                    <div className="text-sm text-[#F2F2F2] cursor-pointer lg:text-2xl">
                        <button
                            onClick={() =>
                                setShowSidebarMenu(
                                    (previousState) => !previousState
                                )
                            }
                            type="button"
                            className="inline-flex items-center justify-center p-2 text-gray-400 transition duration-150 ease-in-out rounded-md dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 dark:hover:bg-gray-900 focus:outline-none dark:focus:bg-gray-900 focus:text-gray-500 dark:focus:text-gray-400"
                        >
                            <CgMenuRight className="inline-flex w-6 h-6" />
                        </button>
                    </div>

                    <Link
                        href={route("welcome")}
                        className="inline-flex space-x-2"
                    >
                        <img className="w-auto h-10" src={logo} />
                        <img className="w-auto h-10" src={text} />
                    </Link>
                </div>
            </header>

            {/* SIDEBAR  */}
            <div
                className={`${
                    showSidebarMenu
                        ? "lg:w-[120px] [@media(max-width:1023px)]:left-[-100%]"
                        : "lg:w-[300px] w-[280px]"
                }  sidebar fixed top-[3.5rem] bg-[#2F3E4D] h-[100%] lg:top-[5rem] lg:transition-width lg:duration-400 backdrop-blur-[16px] z-[100] py-8 px-6 [@media(max-width:300px)]:w-[232px] [@media(max-width:300px)]:px-4`}
                style={{ transition: "left .4s" }}
            >
                <nav className="flex flex-col gap-[2rem] pb-[3rem] h-[100%] lg:pb-[4rem] lg:overflow-hidden">
                    <div
                        className={` ${
                            showSidebarMenu ? "pl-[1rem]" : ""
                        } grid grid-cols-2 space-x-[.5rem] lg:transition-padding lg:duration-400`}
                    >
                        <Link
                            href={route("dashboard")}
                            className="inline-flex space-x-2"
                        >
                            <img className="w-[37px]" src={logo} />
                            <img
                                className={`${
                                    showSidebarMenu ? "opacity-0" : ""
                                } w-[100px]`}
                                src={text}
                            />
                        </Link>
                    </div>

                    <div className="sidebar__content overflow-auto relative pt-[2rem]">
                        <div className="flex flex-col gap-[.25rem]">
                            <SidebarNavLink
                                href={route("admin.index")}
                                active={route().current("admin.index")}
                                className=""
                                style={{ transition: "background .3s" }}
                            >
                                <AiOutlineHome className="text-xl text-[#F2F2F2]" />
                                <span
                                    className="font-[500]"
                                    style={{
                                        trnasition: "color .4s, opacity .4s",
                                    }}
                                >
                                    Dashboard
                                </span>
                                <span
                                    className={`${
                                        showSidebarMenu
                                            ? "opacity-100"
                                            : "opacity-0"
                                    } block text-xs max-w-max mx-auto absolute left-[-27px] right-0 bottom-[2px]`}
                                    style={{
                                        trasition: "color .4s, opacity .4s",
                                    }}
                                >
                                    Dashboard
                                </span>
                            </SidebarNavLink>

                            <SidebarNavLink
                                href={route("admin.blogs.index")}
                                active={route().current("admin.blogs.index")}
                                className=""
                                style={{ transition: "background .3s" }}
                            >
                                <MdOutlineArticle className="text-xl text-[#F2F2F2]" />
                                <span
                                    className="font-[500]"
                                    style={{
                                        trnasition: "color .4s, opacity .4s",
                                    }}
                                >
                                    Blog
                                </span>
                                <span
                                    className={`${
                                        showSidebarMenu
                                            ? "opacity-100"
                                            : "opacity-0"
                                    } block text-xs max-w-max mx-auto absolute left-[-10px] right-0 bottom-[2px]`}
                                >
                                    Blog
                                </span>
                            </SidebarNavLink>

                            <SidebarNavLink
                                href={route("admin.categories.index")}
                                active={route().current(
                                    "admin.categories.index"
                                )}
                                className=""
                                style={{ transition: "background .3s" }}
                            >
                                <BiCategoryAlt className="text-xl text-[#F2F2F2]" />
                                <span
                                    className="font-[500]"
                                    style={{
                                        trnasition: "color .4s, opacity .4s",
                                    }}
                                >
                                    Category
                                </span>
                                <span
                                    className={`${
                                        showSidebarMenu
                                            ? "opacity-100"
                                            : "opacity-0"
                                    } block text-xs max-w-max mx-auto absolute left-[-22px] right-0 bottom-[2px]`}
                                >
                                    Category
                                </span>
                            </SidebarNavLink>

                            <SidebarNavLink
                                href={route("admin.comments.index")}
                                active={route().current("admin.comments.index")}
                                className=""
                                style={{ transition: "background .3s" }}
                            >
                                <BiCommentDetail className="text-xl text-[#F2F2F2]" />
                                <span
                                    className="font-[500]"
                                    style={{
                                        trnasition: "color .4s, opacity .4s",
                                    }}
                                >
                                    Comments
                                </span>
                                <span
                                    className={`${
                                        showSidebarMenu
                                            ? "opacity-100"
                                            : "opacity-0"
                                    } block text-xs max-w-max mx-auto absolute left-[-27px] right-0 bottom-[2px]`}
                                >
                                    Comments
                                </span>
                            </SidebarNavLink>
                        </div>

                        {auth.user.roles == "admin" && (
                            <>
                                <h3
                                    className={`${
                                        showSidebarMenu
                                            ? "sidebar__title my-10"
                                            : "sidebar_title"
                                    }`}
                                >
                                    <span
                                        className={`${
                                            showSidebarMenu
                                                ? "opacity-0 pointer-events-none"
                                                : "relative block text-center text-[#F2F2F2] font-[.938rem]"
                                        }`}
                                        style={{ marginBlock: "2rem 1.5rem" }}
                                    >
                                        Customize
                                    </span>
                                </h3>

                                <div className="flex flex-col gap-[.25rem]">
                                    <SidebarNavLink
                                        href={route("admin.users.index")}
                                        active={route().current(
                                            "admin.users.index"
                                        )}
                                        className=""
                                        style={{ transition: "background .3s" }}
                                    >
                                        <AiOutlineUser className="text-xl text-[#F2F2F2]" />
                                        <span
                                            className="font-[500]"
                                            style={{
                                                trnasition:
                                                    "color .4s, opacity .4s",
                                            }}
                                        >
                                            Users
                                        </span>
                                        <span
                                            className={`${
                                                showSidebarMenu
                                                    ? "opacity-100"
                                                    : "opacity-0"
                                            } block text-xs max-w-max mx-auto absolute left-[-15px] right-0 bottom-[2px]`}
                                        >
                                            Users
                                        </span>
                                    </SidebarNavLink>

                                    <SidebarNavLink
                                        href={route(
                                            "admin.user.verification.index"
                                        )}
                                        active={route().current(
                                            "admin.user.verification.index"
                                        )}
                                        className=""
                                        style={{ transition: "background .3s" }}
                                    >
                                        <IoShieldCheckmark className="text-xl text-[#F2F2F2]" />
                                        <span
                                            className="font-[500]"
                                            style={{
                                                trnasition:
                                                    "color .4s, opacity .4s",
                                            }}
                                        >
                                            Verify
                                        </span>
                                        <span
                                            className={`${
                                                showSidebarMenu
                                                    ? "opacity-100"
                                                    : "opacity-0"
                                            } block text-xs max-w-max mx-auto absolute left-[-20px] right-0 bottom-[2px]`}
                                        >
                                            Verify
                                        </span>
                                    </SidebarNavLink>

                                    <SidebarNavLink
                                        href={route("admin.roles.index")}
                                        active={route().current(
                                            "admin.roles.index"
                                        )}
                                        className=""
                                        style={{ transition: "background .3s" }}
                                    >
                                        <AiOutlineKey className="text-xl text-[#F2F2F2]" />
                                        <span
                                            className="font-[500]"
                                            style={{
                                                trnasition:
                                                    "color .4s, opacity .4s",
                                            }}
                                        >
                                            Roles
                                        </span>
                                        <span
                                            className={`${
                                                showSidebarMenu
                                                    ? "opacity-100"
                                                    : "opacity-0"
                                            } block text-xs max-w-max mx-auto absolute left-[-15px] right-0 bottom-[2px]`}
                                        >
                                            Roles
                                        </span>
                                    </SidebarNavLink>

                                    <SidebarNavLink
                                        href={route("admin.permissions.index")}
                                        active={route().current(
                                            "admin.permissions.index"
                                        )}
                                        className=""
                                        style={{ transition: "background .3s" }}
                                    >
                                        <MdFingerprint className="text-xl text-[#F2F2F2]" />
                                        <span
                                            className="font-[500]"
                                            style={{
                                                trnasition:
                                                    "color .4s, opacity .4s",
                                            }}
                                        >
                                            Permissions
                                        </span>
                                        <span
                                            className={`${
                                                showSidebarMenu
                                                    ? "opacity-100"
                                                    : "opacity-0"
                                            } block text-xs max-w-max mx-auto absolute left-[-29px] right-0 bottom-[2px]`}
                                        >
                                            Permissions
                                        </span>
                                    </SidebarNavLink>
                                </div>
                            </>
                        )}

                        <h3
                            className={`${
                                showSidebarMenu
                                    ? "sidebar__title mt-10"
                                    : "sidebar_title"
                            }`}
                        >
                            <span
                                className={`${
                                    showSidebarMenu
                                        ? "opacity-0 pointer-events-none"
                                        : "relative block text-center text-[#F2F2F2] font-[.938rem]"
                                }`}
                                style={{ marginBlock: "2rem 1.5rem" }}
                            >
                                General
                            </span>
                        </h3>

                        <div className="flex flex-col gap-[.25rem]">
                            <SidebarNavLink
                                href={route("admin.reported-listings.index")}
                                active={route().current(
                                    "admin.reported-listings.index"
                                )}
                                className=""
                                style={{ transition: "background .3s" }}
                            >
                                <SlFlag className="text-xl text-[#F2F2F2]" />
                                <span
                                    className="font-[500]"
                                    style={{
                                        trnasition: "color .4s, opacity .4s",
                                    }}
                                >
                                    Flagged
                                </span>
                                <span
                                    className={`${
                                        showSidebarMenu
                                            ? "opacity-100"
                                            : "opacity-0"
                                    } block text-xs max-w-max mx-auto absolute left-[-20px] right-0 bottom-[2px]`}
                                >
                                    Flagged
                                </span>
                            </SidebarNavLink>
                            <SidebarNavLink
                                href={route("admin.virtual-tours.index")}
                                active={route().current(
                                    "admin.virtual-tours.index"
                                )}
                                className=""
                                style={{ transition: "background .3s" }}
                            >
                                <GiProtectionGlasses className="text-xl text-[#F2F2F2]" />
                                <span
                                    className="font-[500]"
                                    style={{
                                        trnasition: "color .4s, opacity .4s",
                                    }}
                                >
                                    Virtual Tours
                                </span>
                                <span
                                    className={`${
                                        showSidebarMenu
                                            ? "opacity-100"
                                            : "opacity-0"
                                    } block text-xs max-w-max mx-auto absolute left-[-20px] right-0 bottom-[2px]`}
                                >
                                    Virtual Tours
                                </span>
                            </SidebarNavLink>
                            <SidebarNavLink
                                href={route("admin.customer-contacts.index")}
                                active={route().current(
                                    "admin.customer-contacts.index"
                                )}
                                className=""
                                style={{ transition: "background .3s" }}
                            >
                                <TfiHeadphoneAlt className="text-xl text-[#F2F2F2]" />
                                <span
                                    className="font-[500]"
                                    style={{
                                        trnasition: "color .4s, opacity .4s",
                                    }}
                                >
                                    Customer Contact
                                </span>
                                <span
                                    className={`${
                                        showSidebarMenu
                                            ? "opacity-100"
                                            : "opacity-0"
                                    } block text-xs max-w-max mx-auto absolute left-[-20px] right-0 bottom-[2px]`}
                                >
                                    Customer Contact
                                </span>
                            </SidebarNavLink>
                            <SidebarNavLink
                                href={route("dashboard")}
                                active={route().current("dashboard")}
                                className=""
                                style={{ transition: "background .3s" }}
                            >
                                <CiSettings className="text-xl text-[#F2F2F2]" />
                                <span
                                    className="font-[500]"
                                    style={{
                                        trnasition: "color .4s, opacity .4s",
                                    }}
                                >
                                    Settings
                                </span>
                                <span
                                    className={`${
                                        showSidebarMenu
                                            ? "opacity-100"
                                            : "opacity-0"
                                    } block text-xs max-w-max mx-auto absolute left-[-20px] right-0 bottom-[2px]`}
                                >
                                    Settings
                                </span>
                            </SidebarNavLink>

                            <SidebarNavLink
                                href={route("profile.edit")}
                                active={route().current("profile.edit")}
                                className=""
                                style={{ transition: "background .3s" }}
                            >
                                <RiProfileLine className="text-xl text-[#F2F2F2]" />
                                <span
                                    className="font-[500]"
                                    style={{
                                        trnasition: "color .4s, opacity .4s",
                                    }}
                                >
                                    Profile
                                </span>
                                <span
                                    className={`${
                                        showSidebarMenu
                                            ? "opacity-100"
                                            : "opacity-0"
                                    } block text-xs max-w-max mx-auto absolute left-[-15px] right-0 bottom-[2px]`}
                                >
                                    Profile
                                </span>
                            </SidebarNavLink>

                            <SidebarNavLink
                                method="post"
                                href={route("logout")}
                                as="button"
                                className=""
                                style={{ transition: "background .3s" }}
                            >
                                <CiLogout className="text-xl text-[#F2F2F2]" />
                                <span
                                    className="font-[500]"
                                    style={{
                                        trnasition: "color .4s, opacity .4s",
                                    }}
                                >
                                    Logout
                                </span>
                                <span
                                    className={`${
                                        showSidebarMenu
                                            ? "opacity-100"
                                            : "opacity-0"
                                    } block text-xs max-w-max mx-auto absolute left-[-15px] right-0 bottom-[2px]`}
                                >
                                    Logout
                                </span>
                            </SidebarNavLink>
                        </div>
                    </div>

                    <div className="flex items-center gap-[.5rem] lg:gap-[1rem] lg:ml-[0.5rem] lg:mt-auto [@media(max-width:300px)]:flex-col [@media(max-width:300px)]:text-center">
                        <img
                            src={
                                auth.avatar
                                    ? auth.avatar
                                    : "https://www.gravatar.com/avatar/000000000000000000000000000000?d=mp"
                            }
                            alt="sidebar image"
                            className="w-[55px] rounded-[50%] border-2 border-white"
                        />

                        <div className="">
                            <h3 className="text-base text-[#F2F2F2] mb-[.25rem] capitalize">
                                {auth.user.first_name}
                            </h3>
                        </div>

                        <Link href={route("profile.edit")}>
                            <IoIosArrowForward className="text-xl text-[#F2F2F2] ml-[5rem] cursor-pointer [@media(max-width:300px)]:m-0" />
                        </Link>
                    </div>
                </nav>
            </div>

            <main
                className={` ${
                    showSidebarMenu ? "lg:pl-[120px]" : "lg:pl-[300px]"
                }
                 mx-[1.5rem] pt-[5rem] lg:pt-[6rem] `}
                style={{ transition: "padding .1s" }}
            >
                {children}
            </main>
        </div>
    );
}
