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
} from "@/Components";
import moment from "moment";

const Show = (props) => {
    const { roommate } = usePage().props;
    const [openModal, setOpenModal] = useState(false);
    const [openDeletePropertyModal, setOpenDeletePropertyModal] =
        useState(false);

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
        live_at: roommate.live_at,
        available: roommate.available,
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

    useEffect(() => {
        setDefaults({
            live_at: data.live_at,
            available: data.available,
        });
    }, [data]);

    const submit = (e) => {
        e.preventDefault();

        put(route("roommate.availability", roommate.id), {
            onSuccess: () => {
                closeModal();
            },
            onFinish: () => reset(),
        });
    };

    const deleteProperty = (e) => {
        e.preventDefault();

        destroy(route("roommate.destroy", roommate.id), {
            onSuccess: () => closeModal(),
            onFinish: () => reset(),
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
                            Manage availablity of your room quest advertisment
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
                    show={openDeletePropertyModal}
                    onClose={closeDeleteModal}
                >
                    <form onSubmit={deleteProperty} className="p-6">
                        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                            Are you sure you want to delete this advertisement?
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
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <main className="px-4 py-6 sm:p-6 md:py-10 md:px-8">
                                <div className="grid max-w-4xl grid-cols-1 mx-auto lg:max-w-5xl lg:gap-x-20 lg:grid-cols-2">
                                    <div className="relative flex flex-col-reverse col-start-1 row-start-1 p-3 rounded-lg bg-gradient-to-t from-black/75 via-black/0 sm:bg-none sm:row-start-2 sm:p-0 lg:row-start-1">
                                        <h1 className="mt-1 text-lg font-semibold text-white sm:text-slate-900 md:text-2xl dark:sm:text-white">
                                            {roommate.title}
                                        </h1>
                                        <p className="text-sm font-medium leading-4 text-white sm:text-slate-500 dark:sm:text-slate-400">
                                            Budget: £{roommate.budget}
                                        </p>
                                        <span className="mb-3">
                                            {roommate.live_at === "" ? (
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
                                                            roommate.live_at
                                                        ).format(
                                                            "MMM DD, YYYY"
                                                        )}
                                                    </h2>
                                                </div>
                                            )}
                                        </span>
                                    </div>
                                    <div className="grid col-start-1 col-end-3 row-start-1 gap-4 sm:mb-6 sm:grid-cols-4 lg:gap-6 lg:col-start-2 lg:row-end-6 lg:row-span-6 lg:mb-0">
                                        <img
                                            src={
                                                roommate.images[0]
                                                    ? showImage() +
                                                      roommate.images[0]
                                                    : "https://www.gravatar.com/avatar/000000000000000000000000000000?d=mp"
                                            }
                                            alt=""
                                            className="object-cover w-full rounded-lg h-60 sm:h-52 sm:col-span-2 lg:col-span-full"
                                            loading="lazy"
                                        />
                                        <img
                                            src={
                                                roommate.images[1]
                                                    ? showImage() +
                                                      roommate.images[1]
                                                    : "https://www.gravatar.com/avatar/000000000000000000000000000000?d=mp"
                                            }
                                            alt=""
                                            className="hidden object-cover w-full rounded-lg h-52 sm:block sm:col-span-2 md:col-span-1 lg:row-start-2 lg:col-span-2 lg:h-32"
                                            loading="lazy"
                                        />
                                        <img
                                            src={
                                                roommate.images[2]
                                                    ? showImage() +
                                                      roommate.images[2]
                                                    : "https://www.gravatar.com/avatar/000000000000000000000000000000?d=mp"
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
                                            {roommate.area}, {roommate.city}
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
                                                setOpenDeletePropertyModal(true)
                                            }
                                            className="px-3 py-2 ml-3 text-sm font-medium leading-6 text-white bg-black rounded-lg"
                                        >
                                            Delete Property
                                        </PrimaryButton>
                                    </div>
                                    <p className="col-start-1 mt-4 text-sm leading-6 sm:col-span-2 lg:mt-6 lg:row-start-4 lg:col-span-1 dark:text-slate-400">
                                        {roommate.description}
                                    </p>
                                </div>
                            </main>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Show;
