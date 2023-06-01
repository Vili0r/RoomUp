import React, { useEffect, useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, useForm, Link, usePage } from "@inertiajs/react";
import { InputError, PrimaryButton, InputLabel } from "@/Components";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const genders = [
    {
        id: "1",
        title: "Male",
    },
    {
        id: "2",
        title: "Female",
    },
    {
        id: "3",
        title: "Prefer not to say",
    },
];

const lookingFor = [
    {
        id: "1",
        title: "I am looking for a flat or a house share",
    },
    {
        id: "2",
        title: "I have a flat or house share",
    },
    {
        id: "3",
        title: "I would like to find people to form share",
    },
];

const Index = ({ auth }) => {
    const { roles, permissions } = usePage().props;
    const [showPassword, setShowPassword] = useState("password");
    const [selectedRoles, setSelectedRoles] = useState();
    const [selectedPermissions, setSelectedPermissions] = useState();
    const { data, setData, post, processing, errors, reset } = useForm({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        password_confirmation: "",
        gender: "",
        birthdate: "",
        looking_for: "",
        avatar: null,
        roles: [],
        permissions: [],
    });
    const animatedComponents = makeAnimated();

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const handleOnChange = (event) => {
        setData(
            event.target.name,
            event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value
        );
    };

    const submit = (e) => {
        e.preventDefault();

        data.permissions = selectedPermissions.map((item) => {
            return {
                id: item.value,
                name: item.label,
            };
        });

        data.roles = selectedRoles.map((item) => {
            return {
                id: item.value,
                name: item.label,
            };
        });

        post(route("admin.users.store"));
    };

    const rolesOptions = roles.map((item) => {
        return {
            label: item.name,
            value: item.id,
        };
    });

    const permissionsOptions = permissions.map((item) => {
        return {
            label: item.name,
            value: item.id,
        };
    });
    return (
        <AdminLayout auth={auth}>
            <Head title="Admin | Create User" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <section className="container px-4 mx-auto">
                                <div className="sm:flex sm:items-center sm:justify-between">
                                    <div className="flex items-center gap-x-3">
                                        <h2 className="text-lg font-medium text-gray-800 dark:text-white">
                                            Create New User
                                        </h2>
                                    </div>
                                </div>

                                <div className="mt-6 md:flex md:items-center md:justify-between">
                                    <div className="inline-flex overflow-hidden bg-white border divide-x rounded-lg dark:bg-gray-900 rtl:flex-row-reverse dark:border-gray-700 dark:divide-gray-700">
                                        <Link
                                            href={route("admin.users.index")}
                                            className="px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 bg-gray-100 sm:text-sm dark:bg-gray-800 dark:text-gray-300"
                                        >
                                            Back
                                        </Link>
                                    </div>

                                    <div className="relative flex items-center mt-4 md:mt-0">
                                        <span className="absolute">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                stroke="currentColor"
                                                className="w-5 h-5 mx-3 text-gray-400 dark:text-gray-600"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                                                />
                                            </svg>
                                        </span>

                                        <input
                                            type="text"
                                            placeholder="Search"
                                            className="block w-full py-1.5 pr-5 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-80 placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col mt-6">
                                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                            <div className="max-w-xl mx-auto overflow-hidden md:rounded-lg">
                                                <form onSubmit={submit}>
                                                    <div>
                                                        <div className="relative mt-5">
                                                            <input
                                                                type="text"
                                                                name="first_name"
                                                                id="first_name"
                                                                placeholder="First Name"
                                                                value={
                                                                    data.first_name
                                                                }
                                                                className="w-full px-3 py-3 border border-gray-300 rounded-md shadow peer shadow-gray-100 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                                                                autoComplete="off"
                                                                onChange={
                                                                    handleOnChange
                                                                }
                                                            />
                                                            <label
                                                                htmlFor="first_name"
                                                                className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none font-popp peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                                                            >
                                                                First Name
                                                            </label>
                                                        </div>
                                                        {errors.first_name && (
                                                            <InputError
                                                                message={
                                                                    errors.first_name
                                                                }
                                                                className="mt-2"
                                                            />
                                                        )}
                                                    </div>

                                                    <div>
                                                        <div className="relative mt-5">
                                                            <input
                                                                type="text"
                                                                name="last_name"
                                                                id="last_name"
                                                                placeholder="Last Name"
                                                                value={
                                                                    data.last_name
                                                                }
                                                                className="w-full px-3 py-3 border border-gray-300 rounded-md shadow peer shadow-gray-100 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                                                                autoComplete="off"
                                                                onChange={
                                                                    handleOnChange
                                                                }
                                                            />
                                                            <label
                                                                htmlFor="last_name"
                                                                className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none font-popp peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                                                            >
                                                                Last Name
                                                            </label>
                                                        </div>

                                                        {errors.last_name && (
                                                            <InputError
                                                                message={
                                                                    errors.last_name
                                                                }
                                                                className="mt-2"
                                                            />
                                                        )}
                                                    </div>

                                                    <div>
                                                        <div className="relative mt-5">
                                                            <input
                                                                type="email"
                                                                name="email"
                                                                id="email"
                                                                value={
                                                                    data.email
                                                                }
                                                                placeholder="Email Address"
                                                                className="w-full px-3 py-3 border border-gray-300 rounded-md shadow peer shadow-gray-100 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                                                                autoComplete="off"
                                                                onChange={
                                                                    handleOnChange
                                                                }
                                                            />
                                                            <label
                                                                htmlFor="email"
                                                                className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none font-popp peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                                                            >
                                                                Email Address
                                                            </label>
                                                        </div>

                                                        {errors.email && (
                                                            <InputError
                                                                message={
                                                                    errors.email
                                                                }
                                                                className="mt-2"
                                                            />
                                                        )}
                                                    </div>

                                                    <div>
                                                        <div className="relative mt-5">
                                                            {showPassword ==
                                                            "password" ? (
                                                                <AiOutlineEye
                                                                    onClick={() =>
                                                                        setShowPassword(
                                                                            "text"
                                                                        )
                                                                    }
                                                                    className="w-[22px] h-[22px] absolute right-0 mt-4 mr-3 cursor-pointer"
                                                                />
                                                            ) : (
                                                                <AiOutlineEyeInvisible
                                                                    onClick={() =>
                                                                        setShowPassword(
                                                                            "password"
                                                                        )
                                                                    }
                                                                    className="w-[22px] h-[22px] absolute right-0 mt-4 mr-3 cursor-pointer"
                                                                />
                                                            )}
                                                            <input
                                                                type={
                                                                    showPassword
                                                                }
                                                                name="password"
                                                                id="password"
                                                                placeholder="Password"
                                                                value={
                                                                    data.password
                                                                }
                                                                onChange={
                                                                    handleOnChange
                                                                }
                                                                className="w-full px-3 py-3 border border-gray-300 rounded-md shadow peer shadow-gray-100 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                                                            />

                                                            <label
                                                                htmlFor="password"
                                                                className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none font-popp peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                                                            >
                                                                Password
                                                            </label>
                                                        </div>
                                                        {errors.password && (
                                                            <InputError
                                                                message={
                                                                    errors.password
                                                                }
                                                                className="mt-2"
                                                            />
                                                        )}
                                                    </div>

                                                    <div>
                                                        <div className="relative mt-5">
                                                            <input
                                                                type="password"
                                                                name="password_confirmation"
                                                                id="password_confirmation"
                                                                placeholder="Confirm Password"
                                                                value={
                                                                    data.password_confirmation
                                                                }
                                                                onChange={
                                                                    handleOnChange
                                                                }
                                                                className="w-full px-3 py-3 border border-gray-300 rounded-md shadow peer shadow-gray-100 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                                                            />

                                                            <label
                                                                htmlFor="password_confirmation"
                                                                className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none font-popp peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                                                            >
                                                                Confirm Password
                                                            </label>
                                                        </div>
                                                        {errors.password_confirmation && (
                                                            <InputError
                                                                message={
                                                                    errors.password_confirmation
                                                                }
                                                                className="mt-2"
                                                            />
                                                        )}
                                                    </div>

                                                    <div>
                                                        <div className="relative mt-5">
                                                            <input
                                                                type="date"
                                                                name="birthdate"
                                                                id="birthdate"
                                                                placeholder="Date Of Birth"
                                                                value={
                                                                    data.birthdate
                                                                }
                                                                className="w-full px-3 py-3 border border-gray-300 rounded-md shadow peer shadow-gray-100 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                                                                autoComplete="off"
                                                                onChange={
                                                                    handleOnChange
                                                                }
                                                            />
                                                            <label
                                                                htmlFor="birthdate"
                                                                className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none font-popp peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                                                            >
                                                                Date Of Birth
                                                            </label>
                                                        </div>
                                                        {errors.birthdate && (
                                                            <InputError
                                                                message={
                                                                    errors.birthdate
                                                                }
                                                                className="mt-2"
                                                            />
                                                        )}
                                                    </div>

                                                    <div>
                                                        <div className="relative mt-5">
                                                            <select
                                                                type="text"
                                                                name="gender"
                                                                id="gender"
                                                                placeholder="Gender"
                                                                value={
                                                                    data.gender
                                                                }
                                                                className="w-full px-3 py-3 border border-gray-300 rounded-md shadow peer shadow-gray-100 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                                                                autoComplete="off"
                                                                onChange={(e) =>
                                                                    setData(
                                                                        "gender",
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                            >
                                                                <option value="">
                                                                    Select your
                                                                    gender
                                                                </option>
                                                                {genders.map(
                                                                    ({
                                                                        id,
                                                                        title,
                                                                    }) => (
                                                                        <option
                                                                            key={
                                                                                id
                                                                            }
                                                                            value={
                                                                                title
                                                                            }
                                                                        >
                                                                            {
                                                                                title
                                                                            }
                                                                        </option>
                                                                    )
                                                                )}
                                                            </select>
                                                            <label
                                                                htmlFor="gender"
                                                                className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none font-popp peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                                                            >
                                                                Gender
                                                            </label>
                                                        </div>
                                                        {errors.gender && (
                                                            <InputError
                                                                message={
                                                                    errors.gender
                                                                }
                                                                className="mt-2"
                                                            />
                                                        )}
                                                    </div>

                                                    <div>
                                                        <div className="relative mt-5">
                                                            <select
                                                                type="text"
                                                                name="looking_for"
                                                                id="looking_for"
                                                                placeholder="Looking For"
                                                                value={
                                                                    data.looking_for
                                                                }
                                                                className="w-full px-3 py-3 border border-gray-300 rounded-md shadow peer shadow-gray-100 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                                                                autoComplete="off"
                                                                onChange={(e) =>
                                                                    setData(
                                                                        "looking_for",
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                            >
                                                                <option value="">
                                                                    Select what
                                                                    you are
                                                                    looking for
                                                                </option>
                                                                {lookingFor.map(
                                                                    ({
                                                                        id,
                                                                        title,
                                                                    }) => (
                                                                        <option
                                                                            key={
                                                                                id
                                                                            }
                                                                            value={
                                                                                title
                                                                            }
                                                                        >
                                                                            {
                                                                                title
                                                                            }
                                                                        </option>
                                                                    )
                                                                )}
                                                            </select>
                                                            <label
                                                                htmlFor="looking_for"
                                                                className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none font-popp peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                                                            >
                                                                Looking For
                                                            </label>
                                                        </div>

                                                        {errors.looking_for && (
                                                            <InputError
                                                                message={
                                                                    errors.looking_for
                                                                }
                                                                className="mt-2"
                                                            />
                                                        )}
                                                    </div>

                                                    <div className="relative mt-5">
                                                        <input
                                                            type="file"
                                                            name="avatar"
                                                            className="w-full px-3 py-3 border border-gray-300 rounded-md shadow peer shadow-gray-100 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                                                            onChange={(e) =>
                                                                setData(
                                                                    "avatar",
                                                                    e.target
                                                                        .files[0]
                                                                )
                                                            }
                                                        />

                                                        <label
                                                            htmlFor="avatar"
                                                            className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none font-popp peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                                                        >
                                                            Photo Profile
                                                        </label>
                                                        {errors.avatar && (
                                                            <InputError
                                                                message={
                                                                    errors.avatar
                                                                }
                                                                className="mt-2"
                                                            />
                                                        )}
                                                    </div>

                                                    <div className="mt-4">
                                                        <InputLabel
                                                            htmlFor="Roles"
                                                            value="Roles"
                                                        />
                                                        <Select
                                                            closeMenuOnSelect={
                                                                false
                                                            }
                                                            components={
                                                                animatedComponents
                                                            }
                                                            onChange={(opt) =>
                                                                setSelectedRoles(
                                                                    opt
                                                                )
                                                            }
                                                            isMulti
                                                            options={
                                                                rolesOptions
                                                            }
                                                        />
                                                    </div>

                                                    <div className="mt-4 mb-20">
                                                        <InputLabel
                                                            htmlFor="Permissions"
                                                            value="Permissions"
                                                        />
                                                        <Select
                                                            closeMenuOnSelect={
                                                                false
                                                            }
                                                            components={
                                                                animatedComponents
                                                            }
                                                            onChange={(opt) =>
                                                                setSelectedPermissions(
                                                                    opt
                                                                )
                                                            }
                                                            isMulti
                                                            options={
                                                                permissionsOptions
                                                            }
                                                        />
                                                    </div>
                                                    <div className="my-6">
                                                        <PrimaryButton
                                                            disabled={
                                                                processing
                                                            }
                                                            className="w-full hover:text-black rounded-md bg-black hover:bg-[#AED6F1] px-3 py-4 text-white focus:bg-neutral-800 focus:outline-none font-popp"
                                                        >
                                                            {processing
                                                                ? "Processing..."
                                                                : "Create User"}
                                                        </PrimaryButton>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
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

export default Index;
