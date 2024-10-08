import React, { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage, useForm } from "@inertiajs/react";
import { Disclosure } from "@headlessui/react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import StepOne from "@/Components/StepOne";
import StepTwo from "@/Components/StepTwo";
import StepFour from "@/Components/StepFour";
import NewFlatmate from "@/Components/NewFlatmate";
import CurrentFlatmate from "@/Components/CurrentFlatmate";
import { BsCheck, BsTrash } from "react-icons/bs";
import { RxExclamationTriangle } from "react-icons/rx";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import { DebounceInput } from "react-debounce-input";
// Import React FilePond
import { FilePond, registerPlugin } from "react-filepond";
import {
    furnishings,
    roomSize,
    minimumStay,
    maximumStay,
    daysAvailable,
    amenities,
} from "@/arrays/Array";
import {
    stepOneSchema,
    stepTwoSchema,
    stepThreeSchema,
    stepFourSchema,
    stepFiveSchema,
    stepSixSchema,
} from "../../Validations/SharedValidation";
import * as yup from "yup";

// Import FilePond styles
import "filepond/dist/filepond.min.css";

// Import the Image EXIF Orientation and Image Preview plugins
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

// Register the plugins
registerPlugin(FilePondPluginImagePreview);

import { useTranslation } from "react-i18next";

const Edit = (props) => {
    const { shared, notification, csrf_token } = usePage().props;
    const { t, i18n } = useTranslation();
    const selectedOptions = shared.amenities.map((item) => {
        return {
            label: item.name,
            value: item.id,
        };
    });
    const selectedOptionsWithLabels = selectedOptions.map((selectedOption) => {
        const amenity = amenities.find(
            (amenity) => amenity.id === selectedOption.value
        );
        const label = i18n.language === "gr" ? amenity.nameGr : amenity.nameEn;
        return { ...selectedOption, label };
    });
    const animatedComponents = makeAnimated();
    const [validationErrors, setValidationErrors] = useState({});
    const [visible, setVisible] = useState(false);
    const [search, setSearch] = useState("");
    const [selectedAddress, setSelectedAddress] = useState([]);
    const [searchResults, setSearchResults] = useState([]);

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
        lat: shared.address.lat,
        long: shared.address.long,
        display_name: shared.address.display_name,
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
        selectedAmenities: selectedOptionsWithLabels,
    });

    const {
        fixErrors,
        propertyDetails,
        propertyAddressDetails,
        noResults,
        propertyAmenitiesDetails,
        advertiserDetails,
        flatmatesDisclosure,
        confirmation,
        filesUploaded,
        inputPlaceholder,
        amenitiesDisclosureThree,
        processingBtn,
        updateBtn,
    } = t("shared.edit.miscs");

    const {
        availableFromStepThree,
        roomCostStepThree,
        roomDepositStepThree,
        roomSizeStepThree,
        roomFurnishedStepThree,
        roomStepThree,
        referencesStepThree,
        minimumStayStepThree,
        maximumStayStepThree,
        daysAvailableStepThree,
        shortTermStepThree,
    } = t("shared.forms.stepThree");

    const { titleStepSix, descriptionStepSix } = t("shared.forms.stepSix");

    // Function to combine all schemas
    const createCombinedSchema = (t, current_occupants) => {
        return yup.object().shape({
            ...stepOneSchema(t).fields,
            ...stepTwoSchema(t).fields,
            ...stepFourSchema(t).fields,
            ...stepFiveSchema(current_occupants, t).fields,
            ...stepSixSchema(t).fields,
            // Combine fields from other schemas similarly
        });
    };
    const combinedSchema = createCombinedSchema(t, data.current_occupants);

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

    useEffect(() => {
        let timer;

        if (notification !== null) {
            setVisible(true);
            timer = setTimeout(() => {
                setVisible(false);
            }, 10000);
        }
        // router.reload({ only: ["notification"] });

        return () => clearTimeout(timer);
    }, [props]);

    //Handling on submit events
    const submit = async (e) => {
        e.preventDefault();
        setValidationErrors({});
        try {
            // Validate the data using the combined schema
            await combinedSchema.validate(data, { abortEarly: false });

            //Transforming amenties so the backend can attach them to the pivot table
            data.amenities = data.selectedAmenities.map((item) => {
                return {
                    id: item.value,
                };
            });

            put(route("shared.update", shared.id));
        } catch (errors) {
            // Handle validation errors
            const validationErrors = {};

            errors.inner.forEach((error) => {
                validationErrors[error.path] = error.message;
            });

            setValidationErrors(validationErrors);
        }
    };

    //Transforming amenties with label and value as required from react select package
    const options = amenities.map((item) => {
        return {
            label: i18n.language == "en" ? item.nameEn : item.nameGr,
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

        if (data.images) {
            const existingImages = data.images;
            const updatedImages = existingImages.concat(fileValue);

            setData("images", updatedImages);
        } else {
            setData("images", [fileValue]);
        }
        return response;
    };

    const handleSelectedAddress = (selectedAddress, e) => {
        e.preventDefault();

        setData((prevData) => ({
            ...prevData,
            address_1: selectedAddress.address.name,
            city: selectedAddress.address.state,
            area: selectedAddress.address.suburb
                ? selectedAddress.address.suburb
                : selectedAddress.address.city,
            post_code: selectedAddress.address.postcode,
            lat: selectedAddress.lat,
            long: selectedAddress.lon,
            display_name: selectedAddress.display_name,
        }));
    };

    const getAddresses = (search) => {
        if (search) {
            const url = `/api/autocomplete?query=${search}`;
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
            <Head title="Edit My Property" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div
                        className={`fixed top-[3.75rem] right-4 ${
                            visible ? "opacity-100" : "opacity-0"
                        } transition-opacity duration-300`}
                    >
                        <div className="flex rounded-lg shadow-lg w-96">
                            <div className="flex items-center px-6 py-4 bg-yellow-500 rounded-l-lg">
                                <RxExclamationTriangle className="w-6 h-6 text-gray-700" />
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

                    <form onSubmit={submit}>
                        {Object.keys(errors).length !== 0 && (
                            <div className="w-full max-w-2xl mx-auto mb-5">
                                <div className="flex p-5 bg-white rounded-lg shadow">
                                    <div>
                                        <svg
                                            className="w-6 h-6 text-yellow-500 fill-current"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                d="M0 0h24v24H0V0z"
                                                fill="none"
                                            />
                                            <path d="M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z" />
                                        </svg>
                                    </div>
                                    <div className="ml-3">
                                        <h2 className="font-semibold text-gray-800">
                                            {fixErrors}
                                        </h2>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className="w-full max-w-2xl p-2 mx-auto bg-white rounded-2xl">
                            <Disclosure>
                                {({ open }) => (
                                    <>
                                        <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-indigo-900 bg-indigo-100 rounded-lg hover:bg-indigo-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                                            <span>{propertyDetails}</span>
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
                                                errors={validationErrors}
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
                                            <span>
                                                {propertyAddressDetails}
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
                                            <div className="mt-10 flex relative items-center p-2 py-3 bg-white border border-[#bcbaba] rounded-full text-black font-bold text-lg">
                                                <AiOutlineSearch className="w-7 h-7" />
                                                <DebounceInput
                                                    value={search}
                                                    minLength={1}
                                                    debounceTimeout={500}
                                                    onChange={(e) => {
                                                        getAddresses(
                                                            e.target.value
                                                        );
                                                        setSearch(
                                                            e.target.value
                                                        );
                                                    }}
                                                    className="w-full px-3 text-lg bg-transparent border-none focus:outline-none focus:border-none focus:ring-0"
                                                    placeholder={
                                                        inputPlaceholder
                                                    }
                                                />
                                            </div>
                                            {search.length >= 2 &&
                                                (searchResults?.length > 0 ? (
                                                    <div className="w-full mt-4 overflow-y-auto text-sm rounded max-h-80">
                                                        <ul>
                                                            {searchResults.map(
                                                                (
                                                                    address,
                                                                    index
                                                                ) => (
                                                                    <li className="border-b border-gray-200">
                                                                        <button
                                                                            onClick={(
                                                                                e
                                                                            ) => {
                                                                                setSelectedAddress(
                                                                                    address
                                                                                );
                                                                                handleSelectedAddress(
                                                                                    address,
                                                                                    e
                                                                                );
                                                                            }}
                                                                            key={
                                                                                index
                                                                            }
                                                                            className="flex items-center w-full px-3 py-3 transition border-b hover:bg-gray-200 tansition-all hover:rounded-t-md"
                                                                        >
                                                                            <span className="ml-4">
                                                                                {
                                                                                    address.display_name
                                                                                }
                                                                            </span>
                                                                        </button>
                                                                    </li>
                                                                )
                                                            )}
                                                        </ul>
                                                    </div>
                                                ) : (
                                                    <div className="px-3 py-3">
                                                        {noResults} "{search}"
                                                    </div>
                                                ))}
                                            <StepTwo
                                                data={data}
                                                errors={validationErrors}
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
                                            <span>
                                                {propertyAmenitiesDetails}
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
                                                    value={
                                                        amenitiesDisclosureThree
                                                    }
                                                    className="mb-3"
                                                />
                                                <Select
                                                    closeMenuOnSelect={false}
                                                    components={
                                                        animatedComponents
                                                    }
                                                    onChange={(opt) =>
                                                        setData(
                                                            "selectedAmenities",
                                                            opt
                                                        )
                                                    }
                                                    isMulti
                                                    options={options}
                                                    value={
                                                        data.selectedAmenities
                                                    }
                                                />

                                                <InputError
                                                    message={
                                                        validationErrors.selectedAmenities
                                                    }
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
                                                                    placeholder={
                                                                        availableFromStepThree
                                                                    }
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
                                                                    className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                                                                >
                                                                    {
                                                                        availableFromStepThree
                                                                    }
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
                                                                                    {errors[
                                                                                        errorKey
                                                                                    ] ===
                                                                                        `The rooms.${index}.available_from field must be a date after today.` &&
                                                                                    i18n.language ===
                                                                                        "en"
                                                                                        ? "Available from date field must be a date after today"
                                                                                        : "Η ημερομηνία διαθεσιμότητας πρέπει να είναι στο μέλλον"}
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
                                                            {roomStepThree}{" "}
                                                            {index + 1}
                                                        </span>
                                                    </div>

                                                    <div className="grid grid-cols-1 gap-6 mt-7 sm:grid-cols-2">
                                                        <div className="relative">
                                                            <input
                                                                type="text"
                                                                name="room_cost"
                                                                id="room_cost"
                                                                placeholder={
                                                                    roomCostStepThree
                                                                }
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
                                                                className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                                                            >
                                                                {
                                                                    roomCostStepThree
                                                                }
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
                                                                                {errors[
                                                                                    errorKey
                                                                                ].includes(
                                                                                    `The rooms.${index}.room_cost field must be a number`
                                                                                ) &&
                                                                                i18n.language ===
                                                                                    "en"
                                                                                    ? `The room cost field in room ${
                                                                                          index +
                                                                                          1
                                                                                      } must be a number`
                                                                                    : errors[
                                                                                          errorKey
                                                                                      ] ===
                                                                                          `The room cost field in Room ${
                                                                                              index +
                                                                                              1
                                                                                          } is required` &&
                                                                                      i18n.language ===
                                                                                          "en"
                                                                                    ? `Room cost in room ${
                                                                                          index +
                                                                                          1
                                                                                      } is required`
                                                                                    : `Η προκαταβολή του δωματίου ${
                                                                                          index +
                                                                                          1
                                                                                      } είναι υποχρεωτική`}
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
                                                                placeholder={
                                                                    roomDepositStepThree
                                                                }
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
                                                                className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                                                            >
                                                                {
                                                                    roomDepositStepThree
                                                                }
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
                                                                                {errors[
                                                                                    errorKey
                                                                                ] &&
                                                                                    (errors[
                                                                                        errorKey
                                                                                    ].includes(
                                                                                        `The rooms.${index}.room_deposit field must be a number`
                                                                                    ) &&
                                                                                    i18n.language ===
                                                                                        "en"
                                                                                        ? `The room deposit field in room ${
                                                                                              index +
                                                                                              1
                                                                                          } must be a number`
                                                                                        : errors[
                                                                                              errorKey
                                                                                          ] ===
                                                                                              `The room deposit field in Room ${
                                                                                                  index +
                                                                                                  1
                                                                                              } is required` &&
                                                                                          i18n.language ===
                                                                                              "en"
                                                                                        ? `Room deposit in room ${
                                                                                              index +
                                                                                              1
                                                                                          } is required`
                                                                                        : `Η προκαταβολή του δωματίου ${
                                                                                              index +
                                                                                              1
                                                                                          } είναι υποχρεωτική`)}
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
                                                                        nameEn,
                                                                        nameGr,
                                                                    }) => (
                                                                        <option
                                                                            key={
                                                                                id
                                                                            }
                                                                            value={
                                                                                id
                                                                            }
                                                                        >
                                                                            {i18n.language ==
                                                                            "en"
                                                                                ? nameEn
                                                                                : nameGr}
                                                                        </option>
                                                                    )
                                                                )}
                                                            </select>
                                                            <label
                                                                htmlFor="room_size"
                                                                className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                                                            >
                                                                {
                                                                    roomSizeStepThree
                                                                }
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
                                                                                {errors[
                                                                                    errorKey
                                                                                ] ==
                                                                                    `The room size field in Room ${
                                                                                        index +
                                                                                        1
                                                                                    } is required` &&
                                                                                i18n.language ===
                                                                                    "en"
                                                                                    ? `The room size field in Room ${
                                                                                          index +
                                                                                          1
                                                                                      } is required`
                                                                                    : `Το μέγεθος του δωματίου ${
                                                                                          index +
                                                                                          1
                                                                                      } είναι υποχρεωτικό`}
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
                                                                        nameEn,
                                                                        nameGr,
                                                                    }) => (
                                                                        <option
                                                                            key={
                                                                                id
                                                                            }
                                                                            value={
                                                                                id
                                                                            }
                                                                        >
                                                                            {i18n.language ==
                                                                            "en"
                                                                                ? nameEn
                                                                                : nameGr}
                                                                        </option>
                                                                    )
                                                                )}
                                                            </select>
                                                            <label
                                                                htmlFor="room_furnished"
                                                                className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                                                            >
                                                                {
                                                                    roomFurnishedStepThree
                                                                }
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
                                                                                {errors[
                                                                                    errorKey
                                                                                ] ===
                                                                                    `The room furnished field in Room ${
                                                                                        index +
                                                                                        1
                                                                                    } is required` &&
                                                                                i18n.language ==
                                                                                    "en"
                                                                                    ? `The room furnished field in Room ${
                                                                                          index +
                                                                                          1
                                                                                      } is required`
                                                                                    : `Η επίπλωση του δωματίου ${
                                                                                          index +
                                                                                          1
                                                                                      } είναι υποχρεωτική`}
                                                                            </div>
                                                                        );
                                                                    }
                                                                }
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div className="flex justify-start gap-2 mt-3">
                                                        <span className="mt-1 text-sm"></span>
                                                        <InputLabel
                                                            htmlFor="room_references"
                                                            value={
                                                                referencesStepThree
                                                            }
                                                            className="mt-1 text-sm"
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
                                                                            nameEn,
                                                                            nameGr,
                                                                        }) => (
                                                                            <option
                                                                                key={
                                                                                    id
                                                                                }
                                                                                value={
                                                                                    id
                                                                                }
                                                                            >
                                                                                {i18n.language ==
                                                                                "en"
                                                                                    ? nameEn
                                                                                    : nameGr}
                                                                            </option>
                                                                        )
                                                                    )}
                                                                </select>
                                                                <label
                                                                    htmlFor="minimum_stay"
                                                                    className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                                                                >
                                                                    {
                                                                        minimumStayStepThree
                                                                    }
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
                                                                                    {errors[
                                                                                        errorKey
                                                                                    ] ===
                                                                                        `The minimum stay field in Room ${
                                                                                            index +
                                                                                            1
                                                                                        } is required` &&
                                                                                    i18n.language ==
                                                                                        "en"
                                                                                        ? `The minimum stay field in Room ${
                                                                                              index +
                                                                                              1
                                                                                          } is required`
                                                                                        : `Το ελάχιστο διάστημα διαμονής του δωματίου ${
                                                                                              index +
                                                                                              1
                                                                                          } είναι υποχρεωτικό`}
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
                                                                            nameEn,
                                                                            nameGr,
                                                                        }) => (
                                                                            <option
                                                                                key={
                                                                                    id
                                                                                }
                                                                                value={
                                                                                    id
                                                                                }
                                                                            >
                                                                                {i18n.language ==
                                                                                "en"
                                                                                    ? nameEn
                                                                                    : nameGr}
                                                                            </option>
                                                                        )
                                                                    )}
                                                                </select>
                                                                <label
                                                                    htmlFor="maximum_stay"
                                                                    className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                                                                >
                                                                    {
                                                                        maximumStayStepThree
                                                                    }
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
                                                                                    {errors[
                                                                                        errorKey
                                                                                    ] &&
                                                                                        (errors[
                                                                                            errorKey
                                                                                        ].includes(
                                                                                            `The rooms.${index}.maximum_stay field must be greater than`
                                                                                        ) &&
                                                                                        i18n.language ===
                                                                                            "en"
                                                                                            ? "Maximum stay must be greater than minimum stay"
                                                                                            : errors[
                                                                                                  errorKey
                                                                                              ] ===
                                                                                                  `The maximum stay field in Room ${
                                                                                                      index +
                                                                                                      1
                                                                                                  } is required` &&
                                                                                              i18n.language ===
                                                                                                  "en"
                                                                                            ? `The maximum stay field in Room ${
                                                                                                  index +
                                                                                                  1
                                                                                              } is required`
                                                                                            : `Το μέγιστο διάστημα διαμονής πρέπει να είναι μεγαλύτερο από το ελάχιστο διάστημα`)}
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
                                                                        nameEn,
                                                                        nameGr,
                                                                    }) => (
                                                                        <option
                                                                            key={
                                                                                id
                                                                            }
                                                                            value={
                                                                                id
                                                                            }
                                                                        >
                                                                            {i18n.language ==
                                                                            "en"
                                                                                ? nameEn
                                                                                : nameGr}
                                                                        </option>
                                                                    )
                                                                )}
                                                            </select>
                                                            <label
                                                                htmlFor="days_available"
                                                                className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                                                            >
                                                                {
                                                                    daysAvailableStepThree
                                                                }
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
                                                                                {errors[
                                                                                    errorKey
                                                                                ] ===
                                                                                    `The days available field in Room ${
                                                                                        index +
                                                                                        1
                                                                                    } is required` &&
                                                                                i18n.language ==
                                                                                    "en"
                                                                                    ? `The days available field in Room ${
                                                                                          index +
                                                                                          1
                                                                                      } is required`
                                                                                    : `Οι ημέρες διαθεσιμότητας του δωματίου ${
                                                                                          index +
                                                                                          1
                                                                                      } είναι υποχρεωτικές`}
                                                                            </div>
                                                                        );
                                                                    }
                                                                }
                                                            )}
                                                        </div>
                                                        <div className="flex justify-start gap-2 mt-3">
                                                            <span className="mt-1 text-sm"></span>
                                                            <InputLabel
                                                                htmlFor="short_term"
                                                                value={
                                                                    shortTermStepThree
                                                                }
                                                                className="mt-1 text-sm"
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
                                            <span>{advertiserDetails}</span>
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
                                                errors={validationErrors}
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
                                            <span>{flatmatesDisclosure}</span>
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
                                                    errors={validationErrors}
                                                    handleOnChange={
                                                        handleOnChange
                                                    }
                                                />
                                            )}

                                            {data.available_rooms > 0 && (
                                                <NewFlatmate
                                                    data={data}
                                                    errors={validationErrors}
                                                    handleOnChange={
                                                        handleOnChange
                                                    }
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
                                            <span>{confirmation}</span>
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
                                                        placeholder={
                                                            titleStepSix
                                                        }
                                                        value={data.title}
                                                        className="w-full px-3 py-3 border border-gray-300 rounded-md shadow peer shadow-gray-100 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                                                        autoComplete="off"
                                                        onChange={
                                                            handleOnChange
                                                        }
                                                    />
                                                    <label
                                                        htmlFor="title"
                                                        className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                                                    >
                                                        {titleStepSix}
                                                    </label>
                                                </div>

                                                <InputError
                                                    message={
                                                        validationErrors.title
                                                    }
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
                                                        placeholder={
                                                            descriptionStepSix
                                                        }
                                                        value={data.description}
                                                        className="w-full px-3 py-3 border border-gray-300 rounded-md shadow peer shadow-gray-100 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                                                        autoComplete="off"
                                                        onChange={
                                                            handleOnChange
                                                        }
                                                    />
                                                    <label
                                                        htmlFor="description"
                                                        className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                                                    >
                                                        {descriptionStepSix}
                                                    </label>
                                                </div>

                                                <InputError
                                                    message={
                                                        validationErrors.description
                                                    }
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
                                                                csrf_token,
                                                        },
                                                    }}
                                                    name="images"
                                                    labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                                                />

                                                {shared.images.length > 0 && (
                                                    <>
                                                        <h2>{filesUploaded}</h2>

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
                                                message={
                                                    validationErrors.images
                                                }
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
                                className="w-full hover:text-black rounded-md bg-black hover:bg-[#AED6F1] px-3 py-4 text-white focus:bg-neutral-800 focus:outline-none"
                            >
                                {processing ? processingBtn : updateBtn}
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Edit;
