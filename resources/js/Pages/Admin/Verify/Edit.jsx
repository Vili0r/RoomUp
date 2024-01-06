import React, { useState } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, usePage, Link, router, useForm } from "@inertiajs/react";
import { BiUser } from "react-icons/bi";
import { MdOutlineMailOutline } from "react-icons/md";
import { AiOutlinePhone } from "react-icons/ai";
import { MdOutlinePhotoCamera } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { HiOutlineIdentification } from "react-icons/hi2";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";
import { TfiSettings } from "react-icons/tfi";

const Edit = ({ auth }) => {
    const { user } = usePage().props;
    const { data, post, setData, processing } = useForm({
        text: "",
    });
    const [currentTab, setCurrentTab] = useState(0);

    const handleOnChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const handleTab = (index) => {
        setCurrentTab(index);
    };

    const handleApproval = () => {
        post(route("admin.user.approve.verification", user.id));
    };

    const handleRejection = () => {
        post(route("admin.user.reject.verification", user.id));
    };

    return (
        <AdminLayout auth={auth}>
            <Head title="Admin | User | Verification" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <section className="container px-4 mx-auto">
                                <div className="items-start justify-between md:flex">
                                    <div className="max-w-lg">
                                        <h3 className="text-xl font-bold text-gray-800 sm:text-2xl">
                                            Account verification application
                                        </h3>
                                    </div>
                                </div>
                                <div className="flex justify-around">
                                    <div className="w-full max-w-sm mt-5 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                        <div className="flex flex-col items-center pb-10">
                                            <img
                                                className="w-24 h-24 mb-3 rounded-full shadow-lg"
                                                src={user.avatar}
                                                alt="image"
                                            />
                                            <h5 className="mb-1 text-xl font-medium text-gray-900">
                                                {user.first_name}{" "}
                                                {user?.last_name}
                                            </h5>
                                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                                {user.email}
                                            </span>
                                            <div className="flex mt-4 space-x-2 md:mt-6">
                                                <PrimaryButton
                                                    onClick={handleApproval}
                                                    disabled={processing}
                                                    className="inline-flex items-center px-4 py-2 text-sm font-medium tracking-widest text-white transition duration-150 ease-in-out bg-gray-800 border border-transparent rounded-md hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300 disabled:opacity-25"
                                                >
                                                    Approve
                                                </PrimaryButton>
                                                <PrimaryButton
                                                    onClick={handleRejection}
                                                    disabled={processing}
                                                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700 ms-3"
                                                >
                                                    Reject
                                                </PrimaryButton>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="relative mt-5">
                                        <textarea
                                            type="text"
                                            name="text"
                                            value={data.text}
                                            placeholder="Message"
                                            className="block w-full h-32 px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 border border-gray-300 rounded-md shadow peer shadow-gray-100 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                                            autoComplete="off"
                                            onChange={handleOnChange}
                                        />
                                        <label
                                            htmlFor="text"
                                            className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none font-popp peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                                        >
                                            Message
                                        </label>
                                    </div>
                                </div>

                                <div className="gap-2 mt-5 md:flex">
                                    <ul className="mb-4 space-y-4 text-sm font-medium text-gray-500 flex-column space-y dark:text-gray-400 md:me-4 md:mb-0">
                                        <li>
                                            <button
                                                onClick={() => handleTab(0)}
                                                className={`${
                                                    currentTab === 0
                                                        ? "bg-gray-800 hover:bg-gray-700 text-white"
                                                        : "bg-gray-50 hover:bg-gray-100"
                                                } inline-flex items-center w-full px-4 py-3 rounded-lg active`}
                                            >
                                                <BiUser
                                                    className={`${
                                                        currentTab === 0
                                                            ? "text-white"
                                                            : "text-gray-800"
                                                    } + w-4 h-4 me-2`}
                                                />
                                                Profile
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                onClick={() => handleTab(1)}
                                                className={`${
                                                    currentTab === 1
                                                        ? "bg-gray-800 hover:bg-gray-700 text-white"
                                                        : "bg-gray-50 hover:bg-gray-100 "
                                                } inline-flex items-center w-full px-4 py-3 rounded-lg active`}
                                            >
                                                <MdOutlineMailOutline
                                                    className={`${
                                                        currentTab === 1
                                                            ? "text-white"
                                                            : "text-gray-800"
                                                    } + w-4 h-4 me-2`}
                                                />
                                                Email
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                onClick={() => handleTab(2)}
                                                className={`${
                                                    currentTab === 2
                                                        ? "bg-gray-800 hover:bg-gray-700 text-white"
                                                        : "bg-gray-50 hover:bg-gray-100 "
                                                } inline-flex items-center w-full px-4 py-3 rounded-lg active`}
                                            >
                                                <AiOutlinePhone
                                                    className={`${
                                                        currentTab === 2
                                                            ? "text-white"
                                                            : "text-gray-800"
                                                    } + w-4 h-4 me-2`}
                                                />
                                                Phone
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                onClick={() => handleTab(3)}
                                                className={`${
                                                    currentTab === 3
                                                        ? "bg-gray-800 hover:bg-gray-700 text-white"
                                                        : "bg-gray-50 hover:bg-gray-100 "
                                                } inline-flex items-center w-full px-4 py-3 rounded-lg active`}
                                            >
                                                <CgProfile
                                                    className={`${
                                                        currentTab === 3
                                                            ? "text-white"
                                                            : "text-gray-800"
                                                    } + w-4 h-4 me-2`}
                                                />
                                                Avatar
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                onClick={() => handleTab(4)}
                                                className={`${
                                                    currentTab === 4
                                                        ? "bg-gray-800 hover:bg-gray-700 text-white"
                                                        : "bg-gray-50 hover:bg-gray-100 "
                                                } inline-flex items-center w-full px-4 py-3 rounded-lg active`}
                                            >
                                                <TfiSettings
                                                    className={`${
                                                        currentTab === 4
                                                            ? "text-white"
                                                            : "text-gray-800"
                                                    } + w-4 h-4 me-2`}
                                                />
                                                Socials
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                onClick={() => handleTab(5)}
                                                className={`${
                                                    currentTab === 5
                                                        ? "bg-gray-800 hover:bg-gray-700 text-white"
                                                        : "bg-gray-50 hover:bg-gray-100 "
                                                } inline-flex items-center w-full px-4 py-3 rounded-lg active`}
                                            >
                                                <MdOutlinePhotoCamera
                                                    className={`${
                                                        currentTab === 5
                                                            ? "text-white"
                                                            : "text-gray-800"
                                                    } + w-4 h-4 me-2`}
                                                />
                                                Selfie
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                onClick={() => handleTab(6)}
                                                className={`${
                                                    currentTab === 6
                                                        ? "bg-gray-800 hover:bg-gray-700 text-white"
                                                        : "bg-gray-50 hover:bg-gray-100 "
                                                } inline-flex items-center w-full px-4 py-3 rounded-lg active`}
                                            >
                                                <HiOutlineIdentification
                                                    className={`${
                                                        currentTab === 6
                                                            ? "text-white"
                                                            : "text-gray-800"
                                                    } + w-4 h-4 me-2`}
                                                />
                                                ID
                                            </button>
                                        </li>
                                    </ul>

                                    <div className="w-full p-6 text-gray-500 rounded-lg bg-gray-50 text-medium dark:text-gray-400 dark:bg-gray-800">
                                        {currentTab === 0 && (
                                            <>
                                                <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">
                                                    Profile Verification Tab
                                                </h3>
                                                <div className="mt-3">
                                                    <InputLabel
                                                        htmlFor="last_name"
                                                        value="Last Name"
                                                    />
                                                    <div className="relative">
                                                        <TextInput
                                                            id="last_name"
                                                            className="block w-full mt-1"
                                                            value={
                                                                user.last_name
                                                            }
                                                            disabled
                                                            isFocused
                                                            autoComplete="off"
                                                        />
                                                        {user.verification
                                                            .last_name_verified_at !==
                                                        null ? (
                                                            <span className="bg-green-600/70 absolute px-2 py-1 text-white rounded-md top-[9px] right-1">
                                                                Verified
                                                            </span>
                                                        ) : (
                                                            <span className="bg-gray-600/70 absolute px-2 py-1 text-white rounded-md top-[9px] right-1">
                                                                Unverified
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                        {currentTab === 1 && (
                                            <>
                                                <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">
                                                    Email Verification Tab
                                                </h3>
                                                <div>
                                                    <InputLabel
                                                        htmlFor="email"
                                                        value="Email"
                                                    />
                                                    <div className="relative">
                                                        <TextInput
                                                            id="email"
                                                            type="email"
                                                            className="block w-full mt-1"
                                                            value={user.email}
                                                            disabled
                                                            autoComplete="username"
                                                        />
                                                        {user.verification
                                                            .email_verified_at !==
                                                        null ? (
                                                            <span className="bg-green-600/70 absolute px-2 py-1 text-white rounded-md top-[9px] right-1">
                                                                Verified
                                                            </span>
                                                        ) : (
                                                            <span className="bg-gray-600/70 absolute px-2 py-1 text-white rounded-md top-[9px] right-1">
                                                                Unverified
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                        {currentTab === 2 && (
                                            <>
                                                <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">
                                                    Phone Verification Tab
                                                </h3>
                                                <div>
                                                    <InputLabel
                                                        htmlFor="phone_number"
                                                        value="Phone Number ex. +306911234567"
                                                    />
                                                    <div className="relative">
                                                        <TextInput
                                                            id="phone_number"
                                                            className="block w-full mt-1"
                                                            value={
                                                                user.phone_number
                                                            }
                                                            disabled
                                                            isFocused
                                                            autoComplete="off"
                                                        />
                                                        {user.verification
                                                            .phone_verified_at !==
                                                        null ? (
                                                            <span className="bg-green-600/70 absolute px-2 py-1 text-white rounded-md top-[9px] right-1">
                                                                Verified
                                                            </span>
                                                        ) : (
                                                            <span className="bg-gray-600/70 absolute px-2 py-1 text-white rounded-md top-[9px] right-1">
                                                                Unverified
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                        {currentTab === 3 && (
                                            <>
                                                <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">
                                                    Avatar Verification Tab
                                                </h3>
                                                <div className="">
                                                    <img
                                                        src={
                                                            user.avatar !==
                                                            "https://www.gravatar.com/avatar/000000000000000000000000000000?d=mp"
                                                                ? user.avatar
                                                                : "https://www.gravatar.com/avatar/000000000000000000000000000000?d=mp"
                                                        }
                                                        alt=""
                                                        className="w-[150px] mb-3 h-auto"
                                                    />
                                                    {user.verification
                                                        .photo_verified_at !==
                                                    null ? (
                                                        <span className="px-2 py-1 text-white rounded-md bg-green-600/70">
                                                            Verified
                                                        </span>
                                                    ) : (
                                                        <span className="px-2 py-1 text-white rounded-md bg-gray-600/70">
                                                            Unverified
                                                        </span>
                                                    )}
                                                </div>
                                            </>
                                        )}
                                        {currentTab === 4 && (
                                            <>
                                                <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">
                                                    Social Medai Verification
                                                    Tab
                                                </h3>
                                                <div className="mb-5">
                                                    <div>
                                                        <InputLabel
                                                            htmlFor="facebook_link"
                                                            value="Facebook"
                                                        />

                                                        <TextInput
                                                            id="facebook_link"
                                                            className="block w-full mt-1"
                                                            value={
                                                                user
                                                                    .verification
                                                                    .facebook_link
                                                            }
                                                            disabled
                                                            isFocused
                                                            autoComplete="off"
                                                        />
                                                    </div>
                                                    <div>
                                                        <InputLabel
                                                            htmlFor="instagram_link"
                                                            value="Instagram"
                                                        />

                                                        <TextInput
                                                            id="instagram_link"
                                                            className="block w-full mt-1"
                                                            value={
                                                                user
                                                                    .verification
                                                                    .instagram_link
                                                            }
                                                            disabled
                                                            isFocused
                                                            autoComplete="off"
                                                        />
                                                    </div>
                                                    <div>
                                                        <InputLabel
                                                            htmlFor="tiktok_link"
                                                            value="Tik Tok"
                                                        />

                                                        <TextInput
                                                            id="tiktok_link"
                                                            className="block w-full mt-1"
                                                            value={
                                                                user
                                                                    .verification
                                                                    .tiktok_link
                                                            }
                                                            disabled
                                                            isFocused
                                                            autoComplete="off"
                                                        />
                                                    </div>
                                                    <div>
                                                        <InputLabel
                                                            htmlFor="linkedin_link"
                                                            value="Linkedin"
                                                        />

                                                        <TextInput
                                                            id="linkedin_link"
                                                            className="block w-full mt-1"
                                                            value={
                                                                user
                                                                    .verification
                                                                    .linkedin_link
                                                            }
                                                            disabled
                                                            isFocused
                                                            autoComplete="off"
                                                        />
                                                    </div>
                                                </div>
                                                {user.verification
                                                    .social_media_verified_at !==
                                                null ? (
                                                    <span className="px-2 py-1 text-white rounded-md bg-green-600/70">
                                                        Verified
                                                    </span>
                                                ) : (
                                                    <span className="px-2 py-1 text-white rounded-md bg-gray-600/70">
                                                        Unverified
                                                    </span>
                                                )}
                                            </>
                                        )}
                                        {currentTab === 5 && (
                                            <>
                                                <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">
                                                    Selfie Verification Tab
                                                </h3>
                                                <div className="">
                                                    <img
                                                        src={
                                                            user.verification
                                                                .selfie
                                                        }
                                                        alt="No Seflie"
                                                        className="w-[150px] mb-3 h-auto"
                                                    />
                                                    {user.verification
                                                        .selfie_verified_at !==
                                                    null ? (
                                                        <span className="px-2 py-1 text-white rounded-md bg-green-600/70">
                                                            Verified
                                                        </span>
                                                    ) : (
                                                        <span className="px-2 py-1 text-white rounded-md bg-gray-600/70">
                                                            Unverified
                                                        </span>
                                                    )}
                                                </div>
                                            </>
                                        )}
                                        {currentTab === 6 && (
                                            <>
                                                <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">
                                                    ID Verification Tab
                                                </h3>
                                                <div className="">
                                                    <img
                                                        src={
                                                            user.verification
                                                                .id_document
                                                        }
                                                        alt="No Id document"
                                                        className="w-[150px] mb-3 h-auto"
                                                    />
                                                    {user.verification
                                                        .id_document_verified_at !==
                                                    null ? (
                                                        <span className="px-2 py-1 text-white rounded-md bg-green-600/70">
                                                            Verified
                                                        </span>
                                                    ) : (
                                                        <span className="px-2 py-1 text-white rounded-md bg-gray-600/70">
                                                            Unverified
                                                        </span>
                                                    )}
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default Edit;
