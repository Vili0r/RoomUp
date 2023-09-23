import React, { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage, useForm } from "@inertiajs/react";
import { MdOutlineBookmarkAdd } from "react-icons/md";
import { HiOutlineLocationMarker } from "react-icons/hi";
import {
    InputError,
    InputLabel,
    SecondaryButton,
    Modal,
    PrimaryButton,
    DangerButton,
    RoomCard,
} from "@/Components";
import moment from "moment";
import { HousePlaceholder } from "@/assets";
import { DebounceInput } from "react-debounce-input";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";

const Show = (props) => {
    const { shared, notification, csrf_token } = usePage().props;
    const [openModal, setOpenModal] = useState(false);
    const [openUpdateAddressModal, setOpenUpdateAddressModal] = useState(false);
    const [openDeletePropertyModal, setOpenDeletePropertyModal] =
        useState(false);
    const [visible, setVisible] = useState(false);
    const [search, setSearch] = useState("");
    const [selectedAddress, setSelectedAddress] = useState([]);
    const [searchResults, setSearchResults] = useState([]);

    const {
        data,
        setData,
        processing,
        reset,
        put,
        errors,
        delete: destroy,
        setDefaults,
    } = useForm({
        live_at: shared.live_at,
        available: shared.available,
        address_1: shared.address.address_1,
        address_2: shared.address.address_2,
        area: shared.address.area,
        city: shared.address.city,
        post_code: shared.address.post_code,
        lat: shared.address.lat,
        long: shared.address.long,
        display_name: shared.address.display_name,
    });

    const showImage = () => {
        return "/storage/";
    };

    const closeModal = () => {
        setOpenModal(false);

        reset();
    };

    const closeDeleteModal = () => {
        setOpenDeletePropertyModal(false);

        reset();
    };

    const closeUpdateAddressModal = () => {
        setOpenUpdateAddressModal(false);

        reset();
    };

    useEffect(() => {
        setDefaults({
            live_at: data.live_at,
            available: data.available,
        });
    }, [data]);

    useEffect(() => {
        let timer;

        if (notification !== null) {
            setVisible(true);
            timer = setTimeout(() => {
                setVisible(false);
            }, 10000);
        }

        return () => clearTimeout(timer);
    }, [notification]);

    const submit = (e) => {
        e.preventDefault();

        put(route("shared.availability", shared.id), {
            onSuccess: () => {
                closeModal();
            },
            onFinish: () => reset(),
        });
    };

    const updateAddress = (e) => {
        e.preventDefault();

        put(route("address.update", ["room", shared.id]), {
            onSuccess: () => {
                closeUpdateAddressModal();
            },
            onFinish: () => reset(),
        });
    };

    const deleteProperty = (e) => {
        e.preventDefault();

        destroy(route("shared.destroy", shared.id), {
            onSuccess: () => closeModal(),
            onFinish: () => reset(),
        });
    };

    const scrollToBottom = (position) => {
        window.scrollTo({
            top: position,
            behavior: "smooth",
        });
    };

    const handleSelectedAddress = (e, selectedAddress) => {
        e.preventDefault();
        setData({
            address_1: selectedAddress.address.name,
            city: selectedAddress.address.state,
            area: selectedAddress.address.suburb
                ? selectedAddress.address.suburb
                : selectedAddress.address.city,
            post_code: selectedAddress.address.postcode,
            lat: selectedAddress.lat,
            long: selectedAddress.lon,
            display_name: selectedAddress.display_name,
        });
    };

    const getAddresses = (search) => {
        if (search) {
            const url = new URL("http://roomup.test/api/autocomplete");
            url.searchParams.set("query", search);
            axios
                .get(url, {
                    headers: {
                        "X-CSRF-TOKEN": csrf_token,
                    },
                })
                .then(function (response) {
                    setSearchResults(response.data);
                })
                .catch(function (error) {
                    console.error(error);
                });
        }
    };

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Dashboard
                </h2>
            }
        >
            <Head title="My Property" />
            <div className="py-12">
                <Modal show={openModal} onClose={closeModal}>
                    <form onSubmit={submit} className="p-6">
                        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                            Manage availablity of your property
                        </h2>

                        <div className="relative mt-6">
                            <input
                                type="date"
                                name="live_at"
                                id="live_at"
                                placeholder="Live at"
                                value={data.live_at}
                                className="w-full px-3 py-3 border border-gray-300 rounded-md shadow peer shadow-gray-100 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                                autoComplete="off"
                                onChange={(e) =>
                                    setData("live_at", e.target.value)
                                }
                            />
                            <label
                                htmlFor="live_at"
                                className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none font-popp peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                            >
                                Live at
                            </label>

                            <InputError
                                message={errors.live_at}
                                className="mt-2"
                            />
                        </div>
                        <div className="relative mt-6">
                            <div className="relative">
                                <input
                                    name="available"
                                    type="checkbox"
                                    className="opacity-0 sr-only peer"
                                    id="available"
                                    checked={data.available ? true : false}
                                    value={data.available}
                                    onChange={(e) =>
                                        setData("available", e.target.checked)
                                    }
                                />
                                <label
                                    htmlFor="available"
                                    className="relative flex h-6 w-11 cursor-pointer items-center rounded-full bg-gray-400 px-0.5 outline-gray-400 transition-colors before:h-5 before:w-5 before:rounded-full before:bg-white before:shadow before:transition-transform before:duration-300 peer-checked:bg-indigo-500 peer-checked:before:translate-x-full peer-focus-visible:outline peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gray-400 peer-checked:peer-focus-visible:outline-green-500"
                                >
                                    <span className="sr-only">Enable</span>
                                </label>
                            </div>

                            <InputLabel htmlFor="available" value="Available" />

                            <InputError
                                message={errors.available}
                                className="mt-2"
                            />
                        </div>

                        <div className="flex justify-end mt-6">
                            <SecondaryButton onClick={closeModal}>
                                Cancel
                            </SecondaryButton>

                            <PrimaryButton
                                className="px-4 py-2 ml-3 text-white bg-black rounded-lg"
                                disabled={processing}
                            >
                                Update Availability
                            </PrimaryButton>
                        </div>
                    </form>
                </Modal>
                <Modal
                    show={openUpdateAddressModal}
                    onClose={closeUpdateAddressModal}
                >
                    <form onSubmit={updateAddress} className="p-6">
                        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                            Update address of your property
                        </h2>

                        <div className="mt-10 flex relative items-center p-2 py-3 bg-white border border-[#bcbaba] rounded-full text-black font-bold font-popp text-lg">
                            <AiOutlineSearch className="w-7 h-7" />
                            <DebounceInput
                                value={search}
                                minLength={1}
                                debounceTimeout={500}
                                onChange={(e) => {
                                    getAddresses(e.target.value);
                                    setSearch(e.target.value);
                                }}
                                className="w-full px-3 text-lg bg-transparent border-none focus:outline-none focus:border-none focus:ring-0 font-popp"
                                placeholder="Efterpis, Cholargos..."
                            />
                            <button
                                onClick={() => {
                                    setSearch("");
                                    getAddresses("");
                                }}
                                className="absolute top-5 right-5"
                            >
                                <AiOutlineClose size={28} />
                            </button>
                        </div>
                        {search.length >= 2 &&
                            (searchResults?.length > 0 ? (
                                <div className="w-full mt-4 overflow-y-auto text-sm rounded max-h-80">
                                    <ul>
                                        {searchResults.map((address, index) => (
                                            <li className="border-b border-gray-200">
                                                <button
                                                    onClick={(e) => {
                                                        setSelectedAddress(
                                                            address
                                                        );
                                                        handleSelectedAddress(
                                                            e,
                                                            address
                                                        );
                                                    }}
                                                    key={index}
                                                    className="flex items-center w-full px-3 py-3 transition border-b hover:bg-gray-200 tansition-all hover:rounded-t-md"
                                                >
                                                    <span className="ml-4">
                                                        {address.display_name}
                                                    </span>
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ) : (
                                <div className="px-3 py-3">
                                    No results for "{search}"
                                </div>
                            ))}

                        <div className="grid grid-cols-1 gap-4 text-sm gap-y-2 md:grid-cols-5 mt-7">
                            <div className="relative md:col-span-3">
                                <input
                                    type="text"
                                    id="address_1"
                                    placeholder="Address Line 1"
                                    value={data.address_1}
                                    className="w-full px-3 py-3 border border-gray-300 rounded-md shadow peer shadow-gray-100 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                                    autoComplete="off"
                                    disabled={true}
                                />
                                <label
                                    htmlFor="address_1"
                                    className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none font-popp peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                                >
                                    Address Line 1
                                </label>
                                {errors.address_1 && (
                                    <InputError
                                        message={errors.address_1}
                                        className="mt-2"
                                    />
                                )}
                            </div>

                            <div className="relative md:col-span-2">
                                <input
                                    type="text"
                                    name="address_2"
                                    id="address_2"
                                    placeholder="Address Line 2"
                                    value={data.address_2}
                                    className="w-full px-3 py-3 border border-gray-300 rounded-md shadow peer shadow-gray-100 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                                    autoComplete="off"
                                    disabled={true}
                                />
                                <label
                                    htmlFor="address_2"
                                    className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none font-popp peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                                >
                                    Address Line 2
                                </label>
                                {errors.address_2 && (
                                    <InputError
                                        message={errors.address_2}
                                        className="mt-2"
                                    />
                                )}
                            </div>

                            <div className="relative mt-5 md:col-span-2">
                                <input
                                    type="text"
                                    name="city"
                                    id="city"
                                    placeholder="City"
                                    value={data.city}
                                    className="w-full px-3 py-3 border border-gray-300 rounded-md shadow peer shadow-gray-100 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                                    autoComplete="off"
                                    disabled={true}
                                />
                                <label
                                    htmlFor="city"
                                    className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none font-popp peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                                >
                                    City
                                </label>

                                {errors.city && (
                                    <InputError
                                        message={errors.city}
                                        className="mt-5"
                                    />
                                )}
                            </div>

                            <div className="relative mt-5 md:col-span-2">
                                <input
                                    type="text"
                                    name="area"
                                    id="area"
                                    placeholder="Area"
                                    value={data.area}
                                    className="w-full px-3 py-3 border border-gray-300 rounded-md shadow peer shadow-gray-100 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                                    autoComplete="off"
                                    disabled={true}
                                />
                                <label
                                    htmlFor="area"
                                    className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none font-popp peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                                >
                                    Area
                                </label>

                                {errors.area && (
                                    <InputError
                                        message={errors.area}
                                        className="mt-5"
                                    />
                                )}
                            </div>

                            <div className="relative mt-5 md:col-span-1">
                                <input
                                    type="text"
                                    name="post_code"
                                    id="post_code"
                                    placeholder="Post Code"
                                    value={data.post_code}
                                    className="w-full px-3 py-3 border border-gray-300 rounded-md shadow peer shadow-gray-100 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                                    autoComplete="off"
                                    disabled={true}
                                />
                                <label
                                    htmlFor="post_code"
                                    className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none font-popp peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                                >
                                    TK
                                </label>
                                {errors.post_code && (
                                    <InputError
                                        message={errors.post_code}
                                        className="mt-5"
                                    />
                                )}
                            </div>
                        </div>

                        <div className="flex justify-end mt-6">
                            <SecondaryButton onClick={closeUpdateAddressModal}>
                                Cancel
                            </SecondaryButton>

                            <PrimaryButton
                                className="px-4 py-2 ml-3 text-white bg-black rounded-lg"
                                disabled={processing}
                            >
                                Update Address
                            </PrimaryButton>
                        </div>
                    </form>
                </Modal>
                <Modal
                    show={openDeletePropertyModal}
                    onClose={closeDeleteModal}
                >
                    <form onSubmit={deleteProperty} className="p-6">
                        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                            Are you sure you want to delete this property?
                        </h2>

                        <div className="flex justify-end mt-6">
                            <SecondaryButton onClick={closeDeleteModal}>
                                Cancel
                            </SecondaryButton>

                            <DangerButton
                                className="ml-3"
                                disabled={processing}
                            >
                                Delete Property
                            </DangerButton>
                        </div>
                    </form>
                </Modal>
                <div
                    className={`fixed top-[3.75rem] right-4 ${
                        visible ? "opacity-100" : "opacity-0"
                    } transition-opacity duration-300`}
                >
                    <div className="flex rounded-lg shadow-lg w-96">
                        <div className="flex items-center px-6 py-4 bg-green-500 rounded-l-lg">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="text-white fill-current"
                                viewBox="0 0 16 16"
                                width="20"
                                height="20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"
                                ></path>
                            </svg>
                        </div>
                        <div className="flex items-center justify-between w-full px-4 py-6 bg-white border border-gray-200 rounded-r-lg border-l-transparent">
                            <div>{notification}</div>
                            <button onClick={() => setVisible(false)}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="text-gray-700 fill-current"
                                    viewBox="0 0 16 16"
                                    width="20"
                                    height="20"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.75.75 0 111.06 1.06L9.06 8l3.22 3.22a.75.75 0 11-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 01-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 010-1.06z"
                                    ></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <main className="px-4 py-6 sm:p-6 md:py-10 md:px-8">
                                <div className="grid max-w-4xl grid-cols-1 mx-auto lg:max-w-5xl lg:gap-x-20 lg:grid-cols-2">
                                    <div className="relative flex flex-col-reverse col-start-1 row-start-1 p-3 rounded-lg bg-gradient-to-t from-black/75 via-black/0 sm:bg-none sm:row-start-2 sm:p-0 lg:row-start-1">
                                        <h1 className="mt-1 text-lg font-semibold text-white sm:text-slate-900 md:text-2xl dark:sm:text-white">
                                            {shared.title}
                                        </h1>
                                        <p className="text-sm font-medium leading-4 text-white sm:text-slate-500 dark:sm:text-slate-400">
                                            <SecondaryButton
                                                className="hover:bg-slate-100"
                                                onClick={() =>
                                                    scrollToBottom(650)
                                                }
                                            >
                                                Availbale rooms:{" "}
                                                {shared.available_rooms}
                                            </SecondaryButton>
                                        </p>
                                        <span className="mb-3">
                                            {shared.live_at === "" ? (
                                                <div className="inline-flex items-center px-3 py-1 text-gray-500 rounded-full gap-x-2 bg-gray-100/60 dark:bg-gray-800">
                                                    <svg
                                                        width="12"
                                                        height="12"
                                                        viewBox="0 0 12 12"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            d="M4.5 7L2 4.5M2 4.5L4.5 2M2 4.5H8C8.53043 4.5 9.03914 4.71071 9.41421 5.08579C9.78929 5.46086 10 5.96957 10 6.5V10"
                                                            stroke="#667085"
                                                            strokeWidth="1.5"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                    </svg>

                                                    <h2 className="text-sm font-normal">
                                                        Halted
                                                    </h2>
                                                </div>
                                            ) : (
                                                <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-emerald-500 bg-emerald-100/60 dark:bg-gray-800">
                                                    <svg
                                                        width="12"
                                                        height="12"
                                                        viewBox="0 0 12 12"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            d="M10 3L4.5 8.5L2 6"
                                                            stroke="currentColor"
                                                            strokeWidth="1.5"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                    </svg>

                                                    <h2 className="text-sm font-normal">
                                                        Live at{" "}
                                                        {moment(
                                                            shared.live_at
                                                        ).format(
                                                            "MMM DD, YYYY"
                                                        )}
                                                    </h2>
                                                </div>
                                            )}
                                            <button
                                                onClick={() =>
                                                    setOpenDeletePropertyModal(
                                                        true
                                                    )
                                                }
                                                className="ml-2 text-red-800 hover:underline"
                                            >
                                                Delete Property
                                            </button>
                                        </span>
                                    </div>
                                    <div className="grid col-start-1 col-end-3 row-start-1 gap-4 sm:mb-6 sm:grid-cols-4 lg:gap-6 lg:col-start-2 lg:row-end-6 lg:row-span-6 lg:mb-0">
                                        <img
                                            src={
                                                shared.images[0]
                                                    ? showImage() +
                                                      shared.images[0]
                                                    : HousePlaceholder
                                            }
                                            alt=""
                                            className="object-cover w-full rounded-lg h-60 sm:h-52 sm:col-span-2 lg:col-span-full"
                                            loading="lazy"
                                        />
                                        <img
                                            src={
                                                shared.images[1]
                                                    ? showImage() +
                                                      shared.images[1]
                                                    : HousePlaceholder
                                            }
                                            alt=""
                                            className="hidden object-cover w-full rounded-lg h-52 sm:block sm:col-span-2 md:col-span-1 lg:row-start-2 lg:col-span-2 lg:h-32"
                                            loading="lazy"
                                        />
                                        <img
                                            src={
                                                shared.images[2]
                                                    ? showImage() +
                                                      shared.images[2]
                                                    : HousePlaceholder
                                            }
                                            alt=""
                                            className="hidden object-cover w-full rounded-lg h-52 md:block lg:row-start-2 lg:col-span-2 lg:h-32"
                                            loading="lazy"
                                        />
                                    </div>
                                    <dl className="mt-4 text-xs font-medium flex items-center row-start-2 sm:mt-1 sm:row-start-3 md:mt-2.5 lg:row-start-2">
                                        <dt className="sr-only">Saved</dt>
                                        <dd className="flex items-center text-indigo-600 dark:text-indigo-400">
                                            <MdOutlineBookmarkAdd className="w-5 h-5 mr-1 stroke-current dark:stroke-indigo-500" />
                                            <span>(128)</span>
                                        </dd>
                                        <dt className="sr-only">Location</dt>
                                        <dd className="flex items-center capitalize">
                                            <HiOutlineLocationMarker className="w-5 h-5 mx-3 mr-1 text-slate-400 dark:text-slate-500" />
                                            {shared.address.area},{" "}
                                            {shared.address.city}
                                        </dd>
                                    </dl>
                                    <div className="self-center col-start-1 row-start-3 mt-4 sm:mt-0 sm:col-start-2 sm:row-start-2 sm:row-span-2 lg:mt-6 lg:col-start-1 lg:row-start-3 lg:row-end-4">
                                        <button
                                            type="button"
                                            onClick={() => setOpenModal(true)}
                                            className="px-3 py-2 text-sm font-medium leading-6 text-white bg-indigo-600 rounded-lg"
                                        >
                                            Manage availability
                                        </button>

                                        <PrimaryButton
                                            onClick={() =>
                                                setOpenUpdateAddressModal(true)
                                            }
                                            className="px-3 py-2 ml-3 text-sm font-medium leading-6 text-black border-2 border-black rounded-lg hover:text-white hover:bg-black"
                                        >
                                            Update Address
                                        </PrimaryButton>
                                    </div>
                                    <p className="col-start-1 mt-4 text-sm leading-6 sm:col-span-2 lg:mt-6 lg:row-start-4 lg:col-span-1 dark:text-slate-400">
                                        {shared.description}
                                    </p>
                                </div>
                            </main>
                        </div>
                    </div>
                </div>
                <div className="mx-auto mt-5 max-w-9xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
                        <div className="items-start justify-between md:flex">
                            <div className="max-w-lg mt-3 px-7">
                                <h3 className="text-xl font-bold text-gray-800 sm:text-2xl">
                                    Manage Rooms
                                </h3>
                                <p className="mt-2 text-gray-600">
                                    Select each room to edit and upload
                                    individual room photos
                                </p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 mt-[1rem] mb-[1rem] sm:grid-cols-2 lg:grid-cols-3 xxl:grid-cols-4 gap-8 p-4">
                            {shared.rooms.map((room) => (
                                <RoomCard key={room.id} room={room} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Show;
