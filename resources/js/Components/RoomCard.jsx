import React, { useEffect, useState } from "react";
import { MdOutlineEventAvailable } from "react-icons/md";
import { Link, useForm } from "@inertiajs/react";
import moment from "moment";
import { HousePlaceholder } from "@/assets";
import InputError from "./InputError";
import InputLabel from "./InputLabel";
import SecondaryButton from "./SecondaryButton";
import Modal from "./Modal";
import PrimaryButton from "./PrimaryButton";
import { useTranslation } from "react-i18next";

const RoomCard = ({ room }) => {
    const [openModal, setOpenModal] = useState(false);
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
        live_at: room.live_at,
        available: room.available,
    });

    const { t } = useTranslation();
    const {
        titleAvailability,
        liveAtForm,
        availableForm,
        cancelAvailabilityBtn,
        updateBtn,
    } = t("shared.show.roomCard.availabilityModal");
    const { halted, liveAtSpan, availableFromMisc, month } = t(
        "shared.show.roomCard.miscs"
    );

    const showImage = () => {
        return "/storage/";
    };

    const closeModal = () => {
        setOpenModal(false);

        reset();
    };

    const submit = (e) => {
        e.preventDefault();

        put(route("room.availability", room.id), {
            onSuccess: () => {
                closeModal();
            },
            onFinish: () => reset(),
            preserveScroll: true,
        });
    };

    useEffect(() => {
        setDefaults({
            live_at: data.live_at,
            available: data.available,
        });
    }, [data]);

    return (
        <div className="col-span-1 cursor-pointer group">
            <div className="flex flex-col w-full gap-2">
                <div className="relative w-full overflow-hidden aspect-square rounded-xl">
                    <Link href={route("room.edit", room.id)}>
                        <img
                            className="object-cover w-full h-full transition group-hover:scale-110"
                            src={
                                room.images && room.images[0] != null
                                    ? showImage() + room.images[0]
                                    : HousePlaceholder
                            }
                            alt=""
                        />
                    </Link>
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
                                            setData(
                                                "available",
                                                e.target.checked
                                            )
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

                    <div className="absolute flex items-center justify-between w-full p-1 top-3">
                        <div className="space-x-1 text-white text-[11px]">
                            {room.live_at === "" ? (
                                <PrimaryButton className="inline-flex items-center px-3 py-1 text-gray-500 bg-white rounded-full gap-x-2 hover:bg-gray-100/60 dark:bg-gray-800">
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
                                </PrimaryButton>
                            ) : (
                                <PrimaryButton className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-emerald-500 bg-emerald-100/60 dark:bg-gray-800">
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
                                        {liveAtSpan} {""}
                                        {moment(room.live_at).format(
                                            "MMM DD, YYYY"
                                        )}
                                    </h2>
                                </PrimaryButton>
                            )}
                        </div>
                        <div className="absolute right-3">
                            <PrimaryButton
                                onClick={() => setOpenModal(true)}
                                className="relative transition cursor-pointer hover:opacity-80"
                            >
                                <MdOutlineEventAvailable
                                    size={28}
                                    className="fill-black absolute -top-[18px] -right-[2px] hover:fill-slate-200"
                                />
                            </PrimaryButton>
                        </div>
                    </div>
                </div>
                <Link href={route("room.edit", room.id)}>
                    <div className="flex flex-row items-start justify-between mt-4">
                        <div>
                            <p className="text-sm text-gray-800">
                                {room.sub_title}
                            </p>
                            <p className="text-sm text-gray-800">
                                {availableFromMisc}{" "}
                                <span className="font-semibold">
                                    {moment(room.available_from).format(
                                        "MMM DD, YYYY"
                                    )}
                                </span>
                            </p>
                            <p className="mt-2 text-sm text-gray-800">
                                <strong>€{room.room_cost}</strong> /{month}
                            </p>
                        </div>
                        <div className="flex flex-row items-center">
                            {/* <dt className="sr-only">Saved</dt>
                            <dd className="flex items-center text-indigo-600 dark:text-indigo-400">
                                <BsEyeFill className="w-5 h-5 mr-1 stroke-current dark:stroke-indigo-500" />
                                <span>({room.views})</span> 
                            </dd> */}
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default RoomCard;
