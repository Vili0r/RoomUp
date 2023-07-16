import React, { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage, Link, useForm } from "@inertiajs/react";
import { Disclosure } from "@headlessui/react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import {
    StepFour,
    StepOne,
    StepTwo,
    InputError,
    InputLabel,
    PrimaryButton,
    CurrentFlatmate,
    NewFlatmate,
} from "@/Components";
import { BsCheck, BsTrash } from "react-icons/bs";
// Import React FilePond
import { FilePond, registerPlugin } from "react-filepond";

// Import FilePond styles
import "filepond/dist/filepond.min.css";

// Import the Image EXIF Orientation and Image Preview plugins
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

// Register the plugins
registerPlugin(FilePondPluginImagePreview);

const Edit = (props) => {
    const {
        shared,
        whatIAm,
        size,
        type,
        availableRooms,
        currentOccupants,
        minutes,
        mode,
        stations,
        amenities,
        roomSize,
        furnishings,
        minimumStay,
        maximumStay,
        daysAvailable,
        newFlatmateSmoking,
        currentFlatmateSmoking,
        newFlatmateGender,
        currentFlatmateGender,
        newFlatmateOccupation,
        currentFlatmateOccupation,
        pets,
        references,
    } = usePage().props;
    const selectedOptions = shared.amenities.map((item) => {
        return {
            label: item.name,
            value: item.id,
        };
    });
    const animatedComponents = makeAnimated();
    const [selectedAmenities, setSelectedAmenities] = useState(selectedOptions);

    const {
        data,
        setData,
        put,
        processing,
        errors,
        delete: destroy,
    } = useForm({
        title: shared.title,
        description: shared.description,
        available_rooms: shared.available_rooms,
        size: shared.size,
        type: shared.type,
        current_occupants: shared.current_occupants,
        what_i_am: shared.what_i_am,
        current_flatmate_age: shared.current_flatmate_age,
        current_flatmate_smoker: shared.current_flatmate_smoker,
        current_flatmate_pets: shared.current_flatmate_pets,
        current_flatmate_occupation: shared.current_flatmate_occupation,
        current_flatmate_gender: shared.current_flatmate_gender,
        current_flatmate_hobbies: shared.current_flatmate_hobbies,
        address_1: shared.address.address_1,
        address_2: shared.address.address_2,
        area: shared.address.area,
        city: shared.address.city,
        post_code: shared.address.post_code,
        minutes: shared.transport.minutes,
        mode: shared.transport.mode,
        station: shared.transport.station,
        amenities: shared.amenities,
        first_name: shared.advertiser.first_name,
        last_name: shared.advertiser.last_name,
        display_last_name: shared.advertiser.display_last_name,
        telephone: shared.advertiser.telephone,
        display_telephone: shared.advertiser.display_telephone,
        new_flatmate_min_age: shared.flatmate.new_flatmate_min_age,
        new_flatmate_max_age: shared.flatmate.new_flatmate_max_age,
        new_flatmate_smoker: shared.flatmate.new_flatmate_smoker,
        new_flatmate_pets: shared.flatmate.new_flatmate_pets,
        new_flatmate_references: shared.flatmate.new_flatmate_references,
        new_flatmate_couples: shared.flatmate.new_flatmate_couples,
        new_flatmate_occupation: shared.flatmate.new_flatmate_occupation,
        new_flatmate_gender: shared.flatmate.new_flatmate_gender,
        new_flatmate_hobbies: shared.flatmate.new_flatmate_hobbies,
        rooms: shared.rooms,
        images: [],
    });

    const showImage = () => {
        return "/storage/";
    };

    //Handling On change
    const handleOnChange = (event) => {
        setData(
            event.target.name,
            event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value
        );
    };

    //Form change on the Rooms
    const handleFormChange = (event, index) => {
        const newRooms = [...data.rooms];
        newRooms[index][event.target.name] =
            event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value;

        setData("rooms", newRooms);
    };

    useEffect(() => {
        if (data.available_rooms < shared.rooms.length) {
            const arr = [...shared.rooms];
            const newArr = [
                ...arr.slice(0, data.available_rooms),
                ...arr.slice(data.available_rooms + 1),
            ];
            setData("rooms", newArr);
        } else if (
            data.available_rooms > shared.rooms.length &&
            data.available_rooms - data.rooms.length > 0
        ) {
            const newFields = [];
            for (let i = 0; i < data.available_rooms - data.rooms.length; i++) {
                let object = {
                    room_size: "",
                    room_cost: "",
                    room_deposit: "",
                    room_references: "",
                    room_furnished: "",
                    available_from: "",
                    minimum_stay: "",
                    maximum_stay: "",
                    days_available: "",
                    short_term: "",
                };
                newFields.push(object);
            }
            const newArr = [...data.rooms, ...newFields];
            setData("rooms", newArr);
        } else if (data.available_rooms == shared.rooms.length) {
            const newArr = [...shared.rooms];
            setData("rooms", newArr);
        } else if (data.rooms.length > data.available_rooms) {
            const diff = data.rooms.length - data.available_rooms;
            const newArr = data.rooms.slice(0, -diff);
            setData("rooms", newArr);
        }
    }, [data.available_rooms]);

    //Handling on submit events
    const submit = (e) => {
        e.preventDefault();

        //Transforming amenties so the backend can attach them to the pivot table
        data.amenities = selectedAmenities.map((item) => {
            return {
                id: item.value,
            };
        });

        put(route("shared.update", shared.id));
    };

    //Transforming amenties with label and value as required from react select package
    const options = amenities.map((item) => {
        return {
            label: item.name,
            value: item.id,
        };
    });

    //Deleting images from database
    const handleDeletePhoto = (fileName) => {
        destroy(
            route("shared.deletePhotos.destroy", {
                shared: shared.id,
                fileName: fileName,
            })
        );
    };

    const handleFilePondRevert = (uniqueId, load, error) => {
        const responseObject = JSON.parse(uniqueId);
        const fileValue = responseObject.file;

        const existingImages = data.images;
        const updatedImages = existingImages.filter(
            (image) => image !== fileValue
        );

        setData("images", updatedImages);
        destroy(route("revert.image", uniqueId), {
            preserveScroll: true,
        });
        load();
    };

    const handleFilePondUpload = (response) => {
        const responseObject = JSON.parse(response);
        const fileValue = responseObject.file;

        const existingImages = data.images;
        const updatedImages = existingImages.concat(fileValue);

        setData("images", updatedImages);
        return response;
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
            <Head title="Edit My Property" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <form onSubmit={submit}>
                        <div className="w-full max-w-2xl p-2 mx-auto bg-white rounded-2xl">
                            <Disclosure>
                                {({ open }) => (
                                    <>
                                        <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-indigo-900 bg-indigo-100 rounded-lg hover:bg-indigo-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                                            <span>Property details?</span>
                                            <ChevronUpIcon
                                                className={`${
                                                    open
                                                        ? "rotate-180 transform"
                                                        : ""
                                                } h-5 w-5 text-indigo-500`}
                                            />
                                        </Disclosure.Button>
                                        <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                                            <StepOne
                                                data={data}
                                                errors={errors}
                                                handleOnChange={handleOnChange}
                                                availableRooms={availableRooms}
                                                size={size}
                                                type={type}
                                                currentOccupants={
                                                    currentOccupants
                                                }
                                                whatIAm={whatIAm}
                                            />
                                        </Disclosure.Panel>
                                    </>
                                )}
                            </Disclosure>
                        </div>
                        <div className="w-full max-w-2xl p-2 mx-auto mt-4 bg-white rounded-2xl">
                            <Disclosure>
                                {({ open }) => (
                                    <>
                                        <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-indigo-900 bg-indigo-100 rounded-lg hover:bg-indigo-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                                            <span>
                                                Property Address details?
                                            </span>
                                            <ChevronUpIcon
                                                className={`${
                                                    open
                                                        ? "rotate-180 transform"
                                                        : ""
                                                } h-5 w-5 text-indigo-500`}
                                            />
                                        </Disclosure.Button>
                                        <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                                            <StepTwo
                                                data={data}
                                                errors={errors}
                                                handleOnChange={handleOnChange}
                                                minutes={minutes}
                                                mode={mode}
                                                stations={stations}
                                            />
                                        </Disclosure.Panel>
                                    </>
                                )}
                            </Disclosure>
                        </div>
                        <div className="w-full max-w-2xl p-2 mx-auto mt-4 bg-white rounded-2xl">
                            <Disclosure>
                                {({ open }) => (
                                    <>
                                        <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-indigo-900 bg-indigo-100 rounded-lg hover:bg-indigo-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                                            <span>
                                                Property Amenities details?
                                            </span>
                                            <ChevronUpIcon
                                                className={`${
                                                    open
                                                        ? "rotate-180 transform"
                                                        : ""
                                                } h-5 w-5 text-indigo-500`}
                                            />
                                        </Disclosure.Button>
                                        <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                                            <div className="mt-7">
                                                <InputLabel
                                                    htmlFor="amenties"
                                                    value="Amenities"
                                                    className="mb-3"
                                                />
                                                <Select
                                                    closeMenuOnSelect={false}
                                                    components={
                                                        animatedComponents
                                                    }
                                                    onChange={(opt) =>
                                                        setSelectedAmenities(
                                                            opt
                                                        )
                                                    }
                                                    isMulti
                                                    options={options}
                                                    value={selectedAmenities}
                                                />

                                                <InputError
                                                    message={errors.amenities}
                                                    className="mt-2"
                                                />
                                            </div>

                                            {data.rooms.map((room, index) => (
                                                <div
                                                    key={index}
                                                    className="max-w-2xl px-8 py-4 mt-4 mb-4 bg-white rounded-lg shadow-md dark:bg-gray-800"
                                                >
                                                    <div className="flex items-center justify-between">
                                                        <div>
                                                            <div className="relative">
                                                                <input
                                                                    type="date"
                                                                    name="available_from"
                                                                    id="available_from"
                                                                    placeholder="Available From"
                                                                    value={
                                                                        data
                                                                            .rooms[
                                                                            index
                                                                        ]
                                                                            .available_from
                                                                    }
                                                                    className="w-full px-3 py-3 border border-gray-300 rounded-md shadow peer shadow-gray-100 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                                                                    autoComplete="off"
                                                                    onChange={(
                                                                        event
                                                                    ) =>
                                                                        handleFormChange(
                                                                            event,
                                                                            index
                                                                        )
                                                                    }
                                                                />
                                                                <label
                                                                    htmlFor="available_from"
                                                                    className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none font-popp peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                                                                >
                                                                    Available
                                                                    From
                                                                </label>
                                                                {Object.keys(
                                                                    errors
                                                                ).map(
                                                                    (
                                                                        errorKey
                                                                    ) => {
                                                                        if (
                                                                            errorKey.includes(
                                                                                "available_from"
                                                                            ) &&
                                                                            errorKey.includes(
                                                                                `${index}`
                                                                            )
                                                                        ) {
                                                                            return (
                                                                                <div
                                                                                    key={
                                                                                        errorKey
                                                                                    }
                                                                                    className="mt-2 text-sm text-red-600 dark:text-red-400"
                                                                                >
                                                                                    {
                                                                                        errors[
                                                                                            errorKey
                                                                                        ]
                                                                                    }
                                                                                </div>
                                                                            );
                                                                        }
                                                                    }
                                                                )}
                                                            </div>
                                                        </div>

                                                        <span
                                                            className="px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-300 transform bg-gray-600 rounded cursor-pointer hover:bg-gray-500"
                                                            tabIndex="0"
                                                            role="button"
                                                        >
                                                            Room {index + 1}
                                                        </span>
                                                    </div>

                                                    <div className="grid grid-cols-1 gap-6 mt-7 sm:grid-cols-2">
                                                        <div className="relative">
                                                            <input
                                                                type="text"
                                                                name="room_cost"
                                                                id="room_cost"
                                                                placeholder="Room cost Per Month"
                                                                value={
                                                                    data.rooms[
                                                                        index
                                                                    ].room_cost
                                                                }
                                                                className="w-full px-3 py-3 border border-gray-300 rounded-md shadow peer shadow-gray-100 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                                                                autoComplete="off"
                                                                onChange={(
                                                                    event
                                                                ) =>
                                                                    handleFormChange(
                                                                        event,
                                                                        index
                                                                    )
                                                                }
                                                            />
                                                            <label
                                                                htmlFor="room_cost"
                                                                className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none font-popp peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                                                            >
                                                                Room Cost Per
                                                                Month
                                                            </label>

                                                            {Object.keys(
                                                                errors
                                                            ).map(
                                                                (errorKey) => {
                                                                    if (
                                                                        errorKey.includes(
                                                                            "room_cost"
                                                                        ) &&
                                                                        errorKey.includes(
                                                                            `${index}`
                                                                        )
                                                                    ) {
                                                                        return (
                                                                            <div
                                                                                key={
                                                                                    errorKey
                                                                                }
                                                                                className="mt-2 text-sm text-red-600 dark:text-red-400"
                                                                            >
                                                                                {
                                                                                    errors[
                                                                                        errorKey
                                                                                    ]
                                                                                }
                                                                            </div>
                                                                        );
                                                                    }
                                                                }
                                                            )}
                                                        </div>
                                                        <div className="relative">
                                                            <input
                                                                type="text"
                                                                name="room_deposit"
                                                                id="room_deposit"
                                                                placeholder="Room Deposit"
                                                                value={
                                                                    data.rooms[
                                                                        index
                                                                    ]
                                                                        .room_deposit
                                                                }
                                                                className="w-full px-3 py-3 border border-gray-300 rounded-md shadow peer shadow-gray-100 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                                                                autoComplete="off"
                                                                onChange={(
                                                                    event
                                                                ) =>
                                                                    handleFormChange(
                                                                        event,
                                                                        index
                                                                    )
                                                                }
                                                            />
                                                            <label
                                                                htmlFor="room_deposit"
                                                                className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none font-popp peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                                                            >
                                                                Room Deposit
                                                            </label>
                                                            {Object.keys(
                                                                errors
                                                            ).map(
                                                                (errorKey) => {
                                                                    if (
                                                                        errorKey.includes(
                                                                            "room_deposit"
                                                                        ) &&
                                                                        errorKey.includes(
                                                                            `${index}`
                                                                        )
                                                                    ) {
                                                                        return (
                                                                            <div
                                                                                key={
                                                                                    errorKey
                                                                                }
                                                                                className="mt-2 text-sm text-red-600 dark:text-red-400"
                                                                            >
                                                                                {
                                                                                    errors[
                                                                                        errorKey
                                                                                    ]
                                                                                }
                                                                            </div>
                                                                        );
                                                                    }
                                                                }
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div className="grid grid-cols-1 gap-6 mt-7 sm:grid-cols-2">
                                                        <div className="relative">
                                                            <select
                                                                name="room_size"
                                                                value={
                                                                    data.rooms[
                                                                        index
                                                                    ].room_size
                                                                }
                                                                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                                                onChange={(
                                                                    event
                                                                ) =>
                                                                    handleFormChange(
                                                                        event,
                                                                        index
                                                                    )
                                                                }
                                                            >
                                                                <option value="">
                                                                    --
                                                                </option>
                                                                {roomSize.map(
                                                                    ({
                                                                        id,
                                                                        name,
                                                                    }) => (
                                                                        <option
                                                                            key={
                                                                                id
                                                                            }
                                                                            value={
                                                                                id
                                                                            }
                                                                        >
                                                                            {
                                                                                name
                                                                            }
                                                                        </option>
                                                                    )
                                                                )}
                                                            </select>
                                                            <label
                                                                htmlFor="room_size"
                                                                className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none font-popp peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                                                            >
                                                                Room Size
                                                            </label>

                                                            {Object.keys(
                                                                errors
                                                            ).map(
                                                                (errorKey) => {
                                                                    if (
                                                                        errorKey.includes(
                                                                            "room_size"
                                                                        ) &&
                                                                        errorKey.includes(
                                                                            `${index}`
                                                                        )
                                                                    ) {
                                                                        return (
                                                                            <div
                                                                                key={
                                                                                    errorKey
                                                                                }
                                                                                className="mt-2 text-sm text-red-600 dark:text-red-400"
                                                                            >
                                                                                {
                                                                                    errors[
                                                                                        errorKey
                                                                                    ]
                                                                                }
                                                                            </div>
                                                                        );
                                                                    }
                                                                }
                                                            )}
                                                        </div>
                                                        <div className="relative">
                                                            <select
                                                                name="room_furnished"
                                                                value={
                                                                    data.rooms[
                                                                        index
                                                                    ]
                                                                        .room_furnished
                                                                }
                                                                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                                                onChange={(
                                                                    event
                                                                ) =>
                                                                    handleFormChange(
                                                                        event,
                                                                        index
                                                                    )
                                                                }
                                                            >
                                                                <option value="">
                                                                    --
                                                                </option>
                                                                {furnishings.map(
                                                                    ({
                                                                        id,
                                                                        name,
                                                                    }) => (
                                                                        <option
                                                                            key={
                                                                                id
                                                                            }
                                                                            value={
                                                                                id
                                                                            }
                                                                        >
                                                                            {
                                                                                name
                                                                            }
                                                                        </option>
                                                                    )
                                                                )}
                                                            </select>
                                                            <label
                                                                htmlFor="room_furnished"
                                                                className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none font-popp peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                                                            >
                                                                Room furnished
                                                            </label>

                                                            {Object.keys(
                                                                errors
                                                            ).map(
                                                                (errorKey) => {
                                                                    if (
                                                                        errorKey.includes(
                                                                            "room_furnished"
                                                                        ) &&
                                                                        errorKey.includes(
                                                                            `${index}`
                                                                        )
                                                                    ) {
                                                                        return (
                                                                            <div
                                                                                key={
                                                                                    errorKey
                                                                                }
                                                                                className="mt-2 text-sm text-red-600 dark:text-red-400"
                                                                            >
                                                                                {
                                                                                    errors[
                                                                                        errorKey
                                                                                    ]
                                                                                }
                                                                            </div>
                                                                        );
                                                                    }
                                                                }
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div className="flex justify-start gap-2 mt-3">
                                                        <span className="mt-1 text-sm font-popp"></span>
                                                        <InputLabel
                                                            htmlFor="room_references"
                                                            value="References?"
                                                            className="mt-1 text-sm font-popp"
                                                        />
                                                        <label className="relative cursor-pointer">
                                                            <input
                                                                id="checkbox-1"
                                                                type="checkbox"
                                                                name="room_references"
                                                                checked={
                                                                    data.rooms[
                                                                        index
                                                                    ]
                                                                        .room_references
                                                                        ? true
                                                                        : false
                                                                }
                                                                value={
                                                                    data.rooms[
                                                                        index
                                                                    ]
                                                                        .room_references
                                                                }
                                                                onChange={(
                                                                    event
                                                                ) =>
                                                                    handleFormChange(
                                                                        event,
                                                                        index
                                                                    )
                                                                }
                                                                className="appearance-none h-6 w-6 border-2 rounded-[7px] border-[#f3f2f2]"
                                                            />
                                                            <BsCheck className="absolute w-8 h-8 text-white text-opacity-0 transition ease-out text-8xl -left-1 -top-1 check-1 after:bg-black" />
                                                        </label>
                                                    </div>

                                                    <div className="flex items-center justify-between">
                                                        <div className="grid grid-cols-1 gap-6 mt-7 sm:grid-cols-2">
                                                            <div className="relative">
                                                                <select
                                                                    name="minimum_stay"
                                                                    value={
                                                                        data
                                                                            .rooms[
                                                                            index
                                                                        ]
                                                                            .minimum_stay
                                                                    }
                                                                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                                                    onChange={(
                                                                        event
                                                                    ) =>
                                                                        handleFormChange(
                                                                            event,
                                                                            index
                                                                        )
                                                                    }
                                                                >
                                                                    <option value="">
                                                                        --
                                                                    </option>
                                                                    {minimumStay.map(
                                                                        ({
                                                                            id,
                                                                            name,
                                                                        }) => (
                                                                            <option
                                                                                key={
                                                                                    id
                                                                                }
                                                                                value={
                                                                                    id
                                                                                }
                                                                            >
                                                                                {
                                                                                    name
                                                                                }
                                                                            </option>
                                                                        )
                                                                    )}
                                                                </select>
                                                                <label
                                                                    htmlFor="minimum_stay"
                                                                    className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none font-popp peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                                                                >
                                                                    Minimum Stay
                                                                </label>

                                                                {Object.keys(
                                                                    errors
                                                                ).map(
                                                                    (
                                                                        errorKey
                                                                    ) => {
                                                                        if (
                                                                            errorKey.includes(
                                                                                "minimum_stay"
                                                                            ) &&
                                                                            errorKey.includes(
                                                                                `${index}`
                                                                            )
                                                                        ) {
                                                                            return (
                                                                                <div
                                                                                    key={
                                                                                        errorKey
                                                                                    }
                                                                                    className="mt-2 text-sm text-red-600 dark:text-red-400"
                                                                                >
                                                                                    {
                                                                                        errors[
                                                                                            errorKey
                                                                                        ]
                                                                                    }
                                                                                </div>
                                                                            );
                                                                        }
                                                                    }
                                                                )}
                                                            </div>
                                                            <div className="relative">
                                                                <select
                                                                    name="maximum_stay"
                                                                    value={
                                                                        data
                                                                            .rooms[
                                                                            index
                                                                        ]
                                                                            .maximum_stay
                                                                    }
                                                                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                                                    onChange={(
                                                                        event
                                                                    ) =>
                                                                        handleFormChange(
                                                                            event,
                                                                            index
                                                                        )
                                                                    }
                                                                >
                                                                    <option value="">
                                                                        --
                                                                    </option>
                                                                    {maximumStay.map(
                                                                        ({
                                                                            id,
                                                                            name,
                                                                        }) => (
                                                                            <option
                                                                                key={
                                                                                    id
                                                                                }
                                                                                value={
                                                                                    id
                                                                                }
                                                                            >
                                                                                {
                                                                                    name
                                                                                }
                                                                            </option>
                                                                        )
                                                                    )}
                                                                </select>
                                                                <label
                                                                    htmlFor="maximum_stay"
                                                                    className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none font-popp peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                                                                >
                                                                    Maximum Stay
                                                                </label>
                                                                {Object.keys(
                                                                    errors
                                                                ).map(
                                                                    (
                                                                        errorKey
                                                                    ) => {
                                                                        if (
                                                                            errorKey.includes(
                                                                                "maximum_stay"
                                                                            ) &&
                                                                            errorKey.includes(
                                                                                `${index}`
                                                                            )
                                                                        ) {
                                                                            return (
                                                                                <div
                                                                                    key={
                                                                                        errorKey
                                                                                    }
                                                                                    className="mt-2 text-sm text-red-600 dark:text-red-400"
                                                                                >
                                                                                    {
                                                                                        errors[
                                                                                            errorKey
                                                                                        ]
                                                                                    }
                                                                                </div>
                                                                            );
                                                                        }
                                                                    }
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="grid grid-cols-1 gap-6 mt-7 sm:grid-cols-2">
                                                        <div className="relative">
                                                            <select
                                                                name="days_available"
                                                                value={
                                                                    data.rooms[
                                                                        index
                                                                    ]
                                                                        .days_available
                                                                }
                                                                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                                                onChange={(
                                                                    event
                                                                ) =>
                                                                    handleFormChange(
                                                                        event,
                                                                        index
                                                                    )
                                                                }
                                                            >
                                                                <option value="">
                                                                    --
                                                                </option>
                                                                {daysAvailable.map(
                                                                    ({
                                                                        id,
                                                                        name,
                                                                    }) => (
                                                                        <option
                                                                            key={
                                                                                id
                                                                            }
                                                                            value={
                                                                                id
                                                                            }
                                                                        >
                                                                            {
                                                                                name
                                                                            }
                                                                        </option>
                                                                    )
                                                                )}
                                                            </select>
                                                            <label
                                                                htmlFor="days_available"
                                                                className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none font-popp peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                                                            >
                                                                Days available
                                                            </label>
                                                            {Object.keys(
                                                                errors
                                                            ).map(
                                                                (errorKey) => {
                                                                    if (
                                                                        errorKey.includes(
                                                                            "days_available"
                                                                        ) &&
                                                                        errorKey.includes(
                                                                            `${index}`
                                                                        )
                                                                    ) {
                                                                        return (
                                                                            <div
                                                                                key={
                                                                                    errorKey
                                                                                }
                                                                                className="mt-2 text-sm text-red-600 dark:text-red-400"
                                                                            >
                                                                                {
                                                                                    errors[
                                                                                        errorKey
                                                                                    ]
                                                                                }
                                                                            </div>
                                                                        );
                                                                    }
                                                                }
                                                            )}
                                                        </div>
                                                        <div className="flex justify-start gap-2 mt-3">
                                                            <span className="mt-1 text-sm font-popp"></span>
                                                            <InputLabel
                                                                htmlFor="short_term"
                                                                value="Short term?"
                                                                className="mt-1 text-sm font-popp"
                                                            />
                                                            <label className="relative cursor-pointer">
                                                                <input
                                                                    id="checkbox-1"
                                                                    type="checkbox"
                                                                    name="short_term"
                                                                    checked={
                                                                        data
                                                                            .rooms[
                                                                            index
                                                                        ]
                                                                            .short_term
                                                                            ? true
                                                                            : false
                                                                    }
                                                                    value={
                                                                        data
                                                                            .rooms[
                                                                            index
                                                                        ]
                                                                            .short_term
                                                                    }
                                                                    onChange={(
                                                                        event
                                                                    ) =>
                                                                        handleFormChange(
                                                                            event,
                                                                            index
                                                                        )
                                                                    }
                                                                    className="appearance-none h-6 w-6 border-2 rounded-[7px] border-[#f3f2f2]"
                                                                />
                                                                <BsCheck className="absolute w-8 h-8 text-white text-opacity-0 transition ease-out text-8xl -left-1 -top-1 check-1 after:bg-black" />
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </Disclosure.Panel>
                                    </>
                                )}
                            </Disclosure>
                        </div>
                        <div className="w-full max-w-2xl p-2 mx-auto mt-4 bg-white rounded-2xl">
                            <Disclosure>
                                {({ open }) => (
                                    <>
                                        <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-indigo-900 bg-indigo-100 rounded-lg hover:bg-indigo-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                                            <span>Advertiser details?</span>
                                            <ChevronUpIcon
                                                className={`${
                                                    open
                                                        ? "rotate-180 transform"
                                                        : ""
                                                } h-5 w-5 text-indigo-500`}
                                            />
                                        </Disclosure.Button>
                                        <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                                            <StepFour
                                                data={data}
                                                errors={errors}
                                                handleOnChange={handleOnChange}
                                            />
                                        </Disclosure.Panel>
                                    </>
                                )}
                            </Disclosure>
                        </div>

                        <div className="w-full max-w-2xl p-2 mx-auto mt-4 bg-white rounded-2xl">
                            <Disclosure>
                                {({ open }) => (
                                    <>
                                        <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-indigo-900 bg-indigo-100 rounded-lg hover:bg-indigo-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                                            <span>Flatmates?</span>
                                            <ChevronUpIcon
                                                className={`${
                                                    open
                                                        ? "rotate-180 transform"
                                                        : ""
                                                } h-5 w-5 text-indigo-500`}
                                            />
                                        </Disclosure.Button>
                                        <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                                            {data.current_occupants > 0 && (
                                                <CurrentFlatmate
                                                    data={data}
                                                    errors={errors}
                                                    handleOnChange={
                                                        handleOnChange
                                                    }
                                                    currentFlatmateSmoking={
                                                        currentFlatmateSmoking
                                                    }
                                                    pets={pets}
                                                    currentFlatmateOccupation={
                                                        currentFlatmateOccupation
                                                    }
                                                    currentFlatmateGender={
                                                        currentFlatmateGender
                                                    }
                                                />
                                            )}

                                            {data.available_rooms > 0 && (
                                                <NewFlatmate
                                                    data={data}
                                                    errors={errors}
                                                    handleOnChange={
                                                        handleOnChange
                                                    }
                                                    newFlatmateSmoking={
                                                        newFlatmateSmoking
                                                    }
                                                    newFlatmateGender={
                                                        newFlatmateGender
                                                    }
                                                    newFlatmateOccupation={
                                                        newFlatmateOccupation
                                                    }
                                                    pets={pets}
                                                />
                                            )}
                                        </Disclosure.Panel>
                                    </>
                                )}
                            </Disclosure>
                        </div>

                        <div className="w-full max-w-2xl p-2 mx-auto mt-4 bg-white rounded-2xl">
                            <Disclosure>
                                {({ open }) => (
                                    <>
                                        <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-indigo-900 bg-indigo-100 rounded-lg hover:bg-indigo-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                                            <span>Confirmation?</span>
                                            <ChevronUpIcon
                                                className={`${
                                                    open
                                                        ? "rotate-180 transform"
                                                        : ""
                                                } h-5 w-5 text-indigo-500`}
                                            />
                                        </Disclosure.Button>
                                        <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                                            <div>
                                                <div className="relative">
                                                    <input
                                                        type="text"
                                                        name="title"
                                                        id="title"
                                                        placeholder="Title"
                                                        value={data.title}
                                                        className="w-full px-3 py-3 border border-gray-300 rounded-md shadow peer shadow-gray-100 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                                                        autoComplete="off"
                                                        onChange={
                                                            handleOnChange
                                                        }
                                                    />
                                                    <label
                                                        htmlFor="title"
                                                        className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none font-popp peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                                                    >
                                                        Title
                                                    </label>
                                                </div>

                                                <InputError
                                                    message={errors.title}
                                                    className="mt-2"
                                                />
                                            </div>

                                            <div>
                                                <div className="relative mt-5">
                                                    <textarea
                                                        type="text"
                                                        name="description"
                                                        id="description"
                                                        rows="8"
                                                        placeholder="description"
                                                        value={data.description}
                                                        className="w-full px-3 py-3 border border-gray-300 rounded-md shadow peer shadow-gray-100 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                                                        autoComplete="off"
                                                        onChange={
                                                            handleOnChange
                                                        }
                                                    />
                                                    <label
                                                        htmlFor="description"
                                                        className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none font-popp peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                                                    >
                                                        Description
                                                    </label>
                                                </div>

                                                <InputError
                                                    message={errors.description}
                                                    className="mt-2"
                                                />
                                            </div>

                                            <div className="relative flex flex-col p-4 mt-5 text-gray-400 border border-gray-200 rounded">
                                                <FilePond
                                                    allowMultiple={true}
                                                    maxFiles={9}
                                                    server={{
                                                        url: "",
                                                        process: {
                                                            url: "/upload",
                                                            method: "POST",
                                                            onload: handleFilePondUpload,
                                                        },
                                                        revert: handleFilePondRevert,
                                                        headers: {
                                                            "X-CSRF-TOKEN":
                                                                props.csrf_token,
                                                        },
                                                    }}
                                                    name="images"
                                                    labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                                                />

                                                {shared.images.length > 0 && (
                                                    <>
                                                        <h2>
                                                            Files uploaded when
                                                            creating
                                                            advertisment
                                                        </h2>

                                                        {shared.images.map(
                                                            (file, index) => (
                                                                <div
                                                                    key={index}
                                                                    className="flex items-center justify-center"
                                                                >
                                                                    <div className="flex max-w-4xl px-3 mx-auto">
                                                                        <div
                                                                            className="relative w-1/3 px-3 overflow-hidden transition-all rounded-lg group hover:w-full"
                                                                            key={
                                                                                index
                                                                            }
                                                                        >
                                                                            <img
                                                                                src={
                                                                                    showImage() +
                                                                                    shared
                                                                                        .images[
                                                                                        index
                                                                                    ]
                                                                                }
                                                                                alt="Property images"
                                                                                className="object-cover w-full h-full origin-bottom rounded-lg"
                                                                            />
                                                                            <button
                                                                                type="button"
                                                                                className="absolute top-0 z-50 p-1 bg-white rounded-bl right-2 focus:outline-none"
                                                                                onClick={() =>
                                                                                    handleDeletePhoto(
                                                                                        file
                                                                                    )
                                                                                }
                                                                            >
                                                                                <BsTrash className="w-4 h-4 text-gray-700" />
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )
                                                        )}
                                                    </>
                                                )}
                                            </div>

                                            <InputError
                                                message={errors.images}
                                                className="mt-2"
                                            />
                                        </Disclosure.Panel>
                                    </>
                                )}
                            </Disclosure>
                        </div>

                        <div className="w-full max-w-2xl mx-auto mt-4">
                            <PrimaryButton
                                disabled={processing}
                                className="w-full hover:text-black rounded-md bg-black hover:bg-[#AED6F1] px-3 py-4 text-white focus:bg-neutral-800 focus:outline-none font-popp"
                            >
                                {processing
                                    ? "Processing..."
                                    : "Update your ad"}
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Edit;
