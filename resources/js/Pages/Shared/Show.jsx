import React, { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage, useForm } from "@inertiajs/react";
import { MdOutlineBookmarkAdd } from "react-icons/md";
import { HiOutlineLocationMarker } from "react-icons/hi";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import DangerButton from "@/Components/DangerButton";
import Modal from "@/Components/Modal";
import RoomCard from "@/Components/RoomCard";
import moment from "moment";
import { HousePlaceholder } from "@/assets";
import { useTranslation } from "react-i18next";

const Show = (props) => {
    const { shared, notification } = usePage().props;
    const [openModal, setOpenModal] = useState(false);
    const [openVirtualTourModal, setOpenVirtualTourModal] = useState(false);
    const [openDeletePropertyModal, setOpenDeletePropertyModal] =
        useState(false);
    const [visible, setVisible] = useState(false);

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
        owner_id: shared.id,
        owner_type: "shared",
        contact_name: "",
        email: "",
        contact_number: "",
        details: "",
    });

    const { t, i18n } = useTranslation();
    const {
        titleAvailability,
        liveAtForm,
        availableForm,
        cancelAvailabilityBtn,
        updateBtn,
    } = t("show.availabilityModal");
    const {
        titleVirtualTour,
        fullNameForm,
        emailForm,
        phoneNumberForm,
        detailsForm,
        cancelVirtualTourBtn,
        bookBtn,
    } = t("show.virtualTourModal");
    const { titleConfirmation, cancelConfirmationBtn, deleteBtn } = t(
        "show.deleteConfirmationModal"
    );
    const { halted, liveAtSpan, manageRooms, manageRoomsTitle } =
        t("show.miscs");
    const {
        availableRoomsBtn,
        deletePropertyBtn,
        manageAvailabilityBtn,
        virtualTourBtn,
    } = t("show.buttons");

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

    const closeVirtualTourModal = () => {
        setOpenVirtualTourModal(false);

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

    const handleVirtualTour = () => {
        if (shared?.tour?.payment_status !== "Successful") {
            setOpenVirtualTourModal(true);
        }
    };

    const storeVirtualTourBooking = (e) => {
        e.preventDefault();

        axios
            .post("/virtual-tour", data)
            .then((response) => {
                // Redirect to Stripe Checkout
                window.location.href = response.data.url;
            })
            .catch((error) => {
                console.error("Error creating Stripe session", error);
            });
    };

    const handleOnChange = (event) => {
        setData(
            event.target.name,
            event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value
        );
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
                            {titleAvailability}
                        </h2>

                        <div className="relative mt-6">
                            <input
                                type="date"
                                name="live_at"
                                id="live_at"
                                placeholder={liveAtForm}
                                value={data.live_at}
                                className="w-full px-3 py-3 border border-gray-300 rounded-md shadow peer shadow-gray-100 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                                autoComplete="off"
                                onChange={(e) =>
                                    setData("live_at", e.target.value)
                                }
                            />
                            <label
                                htmlFor="live_at"
                                className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                            >
                                {liveAtForm}
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

                            <InputLabel
                                htmlFor="available"
                                value={availableForm}
                            />

                            <InputError
                                message={errors.available}
                                className="mt-2"
                            />
                        </div>

                        <div className="flex justify-end mt-6">
                            <SecondaryButton onClick={closeModal}>
                                {cancelAvailabilityBtn}
                            </SecondaryButton>

                            <PrimaryButton
                                className="px-4 py-2 ml-3 text-white bg-black rounded-lg"
                                disabled={processing}
                            >
                                {updateBtn}
                            </PrimaryButton>
                        </div>
                    </form>
                </Modal>
                <Modal
                    show={openVirtualTourModal}
                    onClose={closeVirtualTourModal}
                >
                    <form onSubmit={storeVirtualTourBooking} className="p-6">
                        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                            {titleVirtualTour}
                        </h2>

                        <div className="mt-2">
                            <p className="text-sm text-gray-500">
                                <div className="relative mt-[3rem]">
                                    <input
                                        type="text"
                                        name="contact_name"
                                        value={data.contact_name}
                                        placeholder={fullNameForm}
                                        className="w-full px-3 py-3 border border-gray-300 rounded-md shadow w-contact peer shadow-gray-100 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                                        autoComplete="off"
                                        onChange={handleOnChange}
                                    />
                                    <label
                                        htmlFor="name"
                                        className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                                    >
                                        {fullNameForm}
                                    </label>
                                    <InputError
                                        message={errors.contact_name}
                                        className="mt-2"
                                    />
                                </div>
                                <div className="relative mt-5">
                                    <input
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        placeholder={emailForm}
                                        className="w-full px-3 py-3 border border-gray-300 rounded-md shadow peer shadow-gray-100 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                                        autoComplete="off"
                                        onChange={handleOnChange}
                                    />
                                    <label
                                        htmlFor="email"
                                        className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                                    >
                                        {emailForm}
                                    </label>
                                    <InputError
                                        message={errors.email}
                                        className="mt-2"
                                    />
                                </div>
                                <div className="relative mt-5">
                                    <input
                                        name="contact_number"
                                        value={data.contact_number}
                                        placeholder={phoneNumberForm}
                                        className="w-full px-3 py-3 border border-gray-300 rounded-md shadow peer shadow-gray-100 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                                        autoComplete="off"
                                        onChange={handleOnChange}
                                    />
                                    <label
                                        htmlFor="contact_number"
                                        className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                                    >
                                        {phoneNumberForm}
                                    </label>
                                    <InputError
                                        message={errors.contact_number}
                                        className="mt-2"
                                    />
                                </div>
                                <div className="relative mt-5">
                                    <textarea
                                        type="text"
                                        name="details"
                                        value={data.details}
                                        placeholder={detailsForm}
                                        className="block w-full h-32 px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 border border-gray-300 rounded-md shadow peer shadow-gray-100 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                                        autoComplete="off"
                                        onChange={handleOnChange}
                                    />
                                    <label
                                        htmlFor="details"
                                        className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                                    >
                                        {detailsForm}
                                    </label>
                                    <InputError
                                        message={errors.details}
                                        className="mt-2"
                                    />
                                </div>
                            </p>
                        </div>

                        <div className="flex justify-end mt-6">
                            <SecondaryButton onClick={closeVirtualTourModal}>
                                {cancelVirtualTourBtn}
                            </SecondaryButton>

                            <PrimaryButton
                                className="px-4 py-2 ml-3 text-white bg-black rounded-lg"
                                disabled={processing}
                            >
                                {bookBtn}
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
                            {titleConfirmation}
                        </h2>

                        <div className="flex justify-end mt-6">
                            <SecondaryButton onClick={closeDeleteModal}>
                                {cancelConfirmationBtn}
                            </SecondaryButton>

                            <DangerButton
                                className="ml-3"
                                disabled={processing}
                            >
                                {deleteBtn}
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
                            <div>
                                {visible && i18n.language == "en"
                                    ? notification
                                    : "Παρακαλώ ενημερώστε τα δωμάτιά σας μεμονωμένα"}
                            </div>
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
                                                {availableRoomsBtn}{" "}
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
                                                        {halted}
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
                                                        {liveAtSpan}{" "}
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
                                                {deletePropertyBtn}
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
                                            {manageAvailabilityBtn}
                                        </button>

                                        <PrimaryButton
                                            onClick={handleVirtualTour}
                                            disabled={
                                                shared?.tour?.payment_status ===
                                                "Successful"
                                            }
                                            className="px-3 py-2 ml-3 text-sm font-medium leading-6 text-black border-2 border-black rounded-lg hover:text-white hover:bg-black"
                                        >
                                            {virtualTourBtn}{" "}
                                            {shared?.tour?.payment_status ===
                                                "Successful" &&
                                                shared.tour.status}
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
                                    {manageRooms}
                                </h3>
                                <p className="mt-2 text-gray-600">
                                    {manageRoomsTitle}
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
