import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Disclosure } from "@headlessui/react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { Head, useForm, usePage } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import StepFour from "@/Components/StepFour";
import NewFlatmate from "@/Components/NewFlatmate";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
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

import { useTranslation } from "react-i18next";
import {
    hobbies,
    amenities,
    searchingFor,
    minimumStay,
    maximumStay,
    daysAvailable,
    roomSize,
    flatmateGender,
    flatmateOccupation,
    flatmatePets,
    flatmateSmoker,
} from "@/arrays/Array";

const Edit = (props) => {
    const { roommate } = usePage().props;
    const { t, i18n } = useTranslation();
    const selectedAmenitiesOptions = roommate.amenities.map((item) => {
        return {
            label: item.name,
            value: item.id,
        };
    });
    const selectedAmenitiesOptionsWithLabels = selectedAmenitiesOptions.map(
        (selectedOption) => {
            const amenity = amenities.find(
                (amenity) => amenity.id === selectedOption.value
            );
            const label =
                i18n.language === "gr" ? amenity.nameGr : amenity.nameEn;
            return { ...selectedOption, label };
        }
    );

    const selectedHobbiesOptions = roommate.hobbies.map((item) => {
        return {
            label: item.name,
            value: item.id,
        };
    });
    const selectedHobbiesOptionsWithLabels = selectedHobbiesOptions.map(
        (selectedOption) => {
            const hobby = hobbies.find(
                (hobby) => hobby.id === selectedOption.value
            );
            const label = i18n.language === "gr" ? hobby.nameGr : hobby.nameEn;
            return { ...selectedOption, label };
        }
    );

    const animatedComponents = makeAnimated();
    const [selectedAmenities, setSelectedAmenities] = useState(
        selectedAmenitiesOptionsWithLabels
    );
    const [selectedHobbies, setSelectedHobbies] = useState(
        selectedHobbiesOptionsWithLabels
    );

    const {
        data,
        setData,
        put,
        processing,
        errors,
        delete: destroy,
    } = useForm({
        title: roommate.title,
        description: roommate.description,
        budget: roommate.budget,
        searching_for: roommate.searching_for,
        room_size: roommate.room_size,
        age: roommate.age,
        smoker: roommate.smoker,
        pets: roommate.pets,
        occupation: roommate.occupation,
        gender: roommate.gender,
        area: roommate.area,
        city: roommate.city,
        available_from: roommate.availability.available_from,
        minimum_stay: roommate.availability.minimum_stay,
        maximum_stay: roommate.availability.maximum_stay,
        days_available: roommate.availability.days_available,
        short_term: roommate.availability.short_term,
        first_name: roommate.advertiser.first_name,
        last_name: roommate.advertiser.last_name,
        display_last_name: roommate.advertiser.display_last_name,
        telephone: roommate.advertiser.telephone,
        display_telephone: roommate.advertiser.display_telephone,
        new_flatmate_min_age: roommate.flatmate.new_flatmate_min_age,
        new_flatmate_max_age: roommate.flatmate.new_flatmate_max_age,
        new_flatmate_smoker: roommate.flatmate.new_flatmate_smoker,
        new_flatmate_pets: roommate.flatmate.new_flatmate_pets,
        new_flatmate_references: roommate.flatmate.new_flatmate_references,
        new_flatmate_couples: roommate.flatmate.new_flatmate_couples,
        new_flatmate_occupation: roommate.flatmate.new_flatmate_occupation,
        new_flatmate_gender: roommate.flatmate.new_flatmate_gender,
        new_flatmate_hobbies: roommate.flatmate.new_flatmate_hobbies,
        hobbies: roommate.hobbies,
        amenities: roommate.amenities,
        images: [],
    });
    const {
        fixErrors,
        propertyDetails,
        advertiserDetails,
        flatmatesDisclosure,
        yourInformation,
        confirmation,
        filesUploaded,
        processingBtn,
        updateBtn,
    } = t("roommate.edit");
    const {
        budgetStepOne,
        availableFromStepOne,
        searchingForStepOne,
        minimumStayStepOne,
        maximumStayStepOne,
        roomSizeStepOne,
        daysAvailableStepOne,
        shortTermStepOne,
        cityStepOne,
        areaStepOne,
    } = t("roommate.forms.stepOne");
    const {
        ageStepTwo,
        smokerStepTwo,
        petsStepTwo,
        occupationStepTwo,
        genderStepTwo,
    } = t("roommate.forms.stepTwo");
    const {
        amenitiesStepSix,
        hobbiesStepSix,
        titleStepSix,
        descriptionStepSix,
    } = t("roommate.forms.stepSix");

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

    //Handling on submit events
    const submit = (e) => {
        e.preventDefault();

        //Transforming amenties and Hobbies so the backend can attach them to the pivot table
        data.amenities = selectedAmenities.map((item) => {
            return {
                id: item.value,
            };
        });

        data.hobbies = selectedHobbies.map((item) => {
            return {
                id: item.value,
            };
        });

        put(route("roommate.update", roommate.id));
    };

    //Deleting images from database
    const handleDeletePhoto = (fileName) => {
        destroy(
            route(
                "roommate.deletePhotos.destroy",
                {
                    roommate: roommate.id,
                    fileName: fileName,
                },
                { preserveScroll: true }
            )
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
        destroy(route("revert.image", uniqueId), { preserveScroll: true });
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

    //Transforming amenties with label and value as required from react select package
    const options = amenities.map((item) => {
        return {
            label: i18n.language == "en" ? item.nameEn : item.nameGr,
            value: item.id,
        };
    });

    const hobbiesOptions = hobbies.map((item) => {
        return {
            label: i18n.language == "en" ? item.nameEn : item.nameGr,
            value: item.id,
        };
    });

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
            <Head title="Edit My Room Quest advertisement" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
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
                                            <div>
                                                <div className="relative mt-7">
                                                    <input
                                                        type="text"
                                                        name="budget"
                                                        id="budget"
                                                        placeholder={
                                                            budgetStepOne
                                                        }
                                                        value={data.budget}
                                                        className="w-full px-3 py-3 border border-gray-300 rounded-md shadow peer shadow-gray-100 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                                                        autoComplete="off"
                                                        onChange={
                                                            handleOnChange
                                                        }
                                                    />
                                                    <label
                                                        htmlFor="budget"
                                                        className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                                                    >
                                                        {budgetStepOne}
                                                    </label>
                                                </div>

                                                <InputError
                                                    message={errors.budget}
                                                    className="mt-2"
                                                />
                                            </div>
                                            <div className="grid grid-cols-1 gap-6 mt-7 sm:grid-cols-2">
                                                <div className="relative">
                                                    <input
                                                        type="date"
                                                        name="available_from"
                                                        id="available_from"
                                                        placeholder={
                                                            availableFromStepOne
                                                        }
                                                        value={
                                                            data.available_from
                                                        }
                                                        className="w-full px-3 py-3 border border-gray-300 rounded-md shadow peer shadow-gray-100 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                                                        autoComplete="off"
                                                        onChange={
                                                            handleOnChange
                                                        }
                                                    />
                                                    <label
                                                        htmlFor="available_from"
                                                        className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                                                    >
                                                        {availableFromStepOne}
                                                    </label>

                                                    {errors.available_from && (
                                                        <InputError
                                                            message={
                                                                errors.available_from
                                                            }
                                                            className="mt-2"
                                                        />
                                                    )}
                                                </div>
                                                <div className="relative">
                                                    <select
                                                        name="searching_for"
                                                        value={
                                                            data.searching_for
                                                        }
                                                        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                                        onChange={
                                                            handleOnChange
                                                        }
                                                    >
                                                        <option value="">
                                                            --
                                                        </option>
                                                        {searchingFor.map(
                                                            ({
                                                                id,
                                                                nameEn,
                                                                nameGr,
                                                            }) => (
                                                                <option
                                                                    key={id}
                                                                    value={id}
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
                                                        htmlFor="searching_for"
                                                        className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                                                    >
                                                        {searchingForStepOne}
                                                    </label>

                                                    {errors.searching_for && (
                                                        <InputError
                                                            message={
                                                                errors.searching_for
                                                            }
                                                            className="mt-2"
                                                        />
                                                    )}
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 gap-6 mt-7 sm:grid-cols-2">
                                                <div className="relative">
                                                    <select
                                                        name="minimum_stay"
                                                        value={
                                                            data.minimum_stay
                                                        }
                                                        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                                        onChange={
                                                            handleOnChange
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
                                                                    key={id}
                                                                    value={id}
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
                                                        {minimumStayStepOne}
                                                    </label>

                                                    {errors.minimum_stay && (
                                                        <InputError
                                                            message={
                                                                errors.minimum_stay
                                                            }
                                                            className="mt-2"
                                                        />
                                                    )}
                                                </div>
                                                <div className="relative">
                                                    <select
                                                        name="maximum_stay"
                                                        value={
                                                            data.maximum_stay
                                                        }
                                                        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                                        onChange={
                                                            handleOnChange
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
                                                                    key={id}
                                                                    value={id}
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
                                                        {maximumStayStepOne}
                                                    </label>

                                                    {errors.maximum_stay && (
                                                        <InputError
                                                            message={
                                                                errors.maximum_stay
                                                            }
                                                            className="mt-2"
                                                        />
                                                    )}
                                                </div>
                                            </div>

                                            <div className="relative mt-7">
                                                <select
                                                    name="room_size"
                                                    value={data.room_size}
                                                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                                    onChange={handleOnChange}
                                                >
                                                    <option value="">--</option>
                                                    {roomSize.map(
                                                        ({
                                                            id,
                                                            nameEn,
                                                            nameGr,
                                                        }) => (
                                                            <option
                                                                key={id}
                                                                value={id}
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
                                                    {roomSizeStepOne}
                                                </label>

                                                {errors.room_size && (
                                                    <InputError
                                                        message={
                                                            errors.room_size
                                                        }
                                                        className="mt-2"
                                                    />
                                                )}
                                            </div>

                                            <div className="grid grid-cols-1 gap-6 mt-7 sm:grid-cols-2">
                                                <div className="relative">
                                                    <select
                                                        name="days_available"
                                                        value={
                                                            data.days_available
                                                        }
                                                        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                                        onChange={
                                                            handleOnChange
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
                                                                    key={id}
                                                                    value={id}
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
                                                        {daysAvailableStepOne}
                                                    </label>
                                                    {errors.days_available && (
                                                        <InputError
                                                            message={
                                                                errors.days_available
                                                            }
                                                            className="mt-2"
                                                        />
                                                    )}
                                                </div>
                                                <div className="flex justify-start gap-2 mt-3">
                                                    <span className="mt-1 text-sm"></span>
                                                    <InputLabel
                                                        htmlFor="short_term"
                                                        value={shortTermStepOne}
                                                        className="mt-1 text-sm"
                                                    />
                                                    <label className="relative cursor-pointer">
                                                        <input
                                                            id="checkbox-1"
                                                            type="checkbox"
                                                            name="short_term"
                                                            value={
                                                                data.short_term
                                                            }
                                                            onChange={
                                                                handleOnChange
                                                            }
                                                            checked={
                                                                data.short_term
                                                                    ? true
                                                                    : false
                                                            }
                                                            className="appearance-none h-6 w-6 border-2 rounded-[7px] border-[#f3f2f2]"
                                                        />
                                                        <BsCheck className="absolute w-8 h-8 text-white text-opacity-0 transition ease-out text-8xl -left-1 -top-1 check-1 after:bg-black" />
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-1 gap-6 mt-7 sm:grid-cols-2">
                                                <div className="relative">
                                                    <input
                                                        type="text"
                                                        name="city"
                                                        id="city"
                                                        placeholder={
                                                            cityStepOne
                                                        }
                                                        value={data.city}
                                                        className="w-full px-3 py-3 border border-gray-300 rounded-md shadow peer shadow-gray-100 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                                                        autoComplete="off"
                                                        onChange={
                                                            handleOnChange
                                                        }
                                                    />
                                                    <label
                                                        htmlFor="city"
                                                        className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                                                    >
                                                        {cityStepOne}
                                                    </label>

                                                    {errors.city && (
                                                        <InputError
                                                            message={
                                                                errors.city
                                                            }
                                                            className="mt-5"
                                                        />
                                                    )}
                                                </div>

                                                <div className="relative ">
                                                    <input
                                                        type="text"
                                                        name="area"
                                                        id="area"
                                                        placeholder={
                                                            areaStepOne
                                                        }
                                                        value={data.area}
                                                        className="w-full px-3 py-3 border border-gray-300 rounded-md shadow peer shadow-gray-100 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                                                        autoComplete="off"
                                                        onChange={
                                                            handleOnChange
                                                        }
                                                    />
                                                    <label
                                                        htmlFor="area"
                                                        className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                                                    >
                                                        {areaStepOne}
                                                    </label>

                                                    {errors.area && (
                                                        <InputError
                                                            message={
                                                                errors.area
                                                            }
                                                            className="mt-5"
                                                        />
                                                    )}
                                                </div>
                                            </div>
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
                                            <div className="max-w-2xl px-8 py-4 mt-4 mb-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
                                                <div className="flex items-center justify-between">
                                                    <div className="relative">
                                                        <input
                                                            type="text"
                                                            name="age"
                                                            id="age"
                                                            placeholder={
                                                                ageStepTwo
                                                            }
                                                            value={data.age}
                                                            className="w-full px-3 py-3 border border-gray-300 rounded-md shadow peer shadow-gray-100 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                                                            autoComplete="off"
                                                            onChange={
                                                                handleOnChange
                                                            }
                                                        />
                                                        <label
                                                            htmlFor="age"
                                                            className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                                                        >
                                                            {ageStepTwo}
                                                        </label>

                                                        <InputError
                                                            message={errors.age}
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                    <span
                                                        className="px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-300 transform bg-gray-600 rounded cursor-pointer hover:bg-gray-500"
                                                        tabIndex="0"
                                                        role="button"
                                                    >
                                                        {yourInformation}
                                                    </span>
                                                </div>
                                                <div className="grid grid-cols-1 gap-4 text-sm gap-y-2 md:grid-cols-5 mt-7">
                                                    <div className="relative md:col-span-3">
                                                        <div className="relative">
                                                            <select
                                                                name="smoker"
                                                                value={
                                                                    data.smoker
                                                                }
                                                                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                                                onChange={
                                                                    handleOnChange
                                                                }
                                                            >
                                                                <option value="">
                                                                    --
                                                                </option>
                                                                {flatmateSmoker.map(
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
                                                                htmlFor="smoker"
                                                                className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                                                            >
                                                                {smokerStepTwo}
                                                            </label>

                                                            <InputError
                                                                message={
                                                                    errors.smoker
                                                                }
                                                                className="mt-2"
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="relative md:col-span-2">
                                                        <div className="relative">
                                                            <select
                                                                name="pets"
                                                                value={
                                                                    data.pets
                                                                }
                                                                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                                                onChange={
                                                                    handleOnChange
                                                                }
                                                            >
                                                                <option value="">
                                                                    --
                                                                </option>
                                                                {flatmatePets.map(
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
                                                                htmlFor="pets"
                                                                className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                                                            >
                                                                {petsStepTwo}
                                                            </label>

                                                            <InputError
                                                                message={
                                                                    errors.pets
                                                                }
                                                                className="mt-2"
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="relative mt-3 md:col-span-2">
                                                        <div className="relative">
                                                            <select
                                                                name="occupation"
                                                                value={
                                                                    data.occupation
                                                                }
                                                                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                                                onChange={
                                                                    handleOnChange
                                                                }
                                                            >
                                                                <option value="">
                                                                    --
                                                                </option>
                                                                {flatmateOccupation.map(
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
                                                                htmlFor="occupation"
                                                                className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                                                            >
                                                                {
                                                                    occupationStepTwo
                                                                }
                                                            </label>

                                                            <InputError
                                                                message={
                                                                    errors.occupation
                                                                }
                                                                className="mt-2"
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="relative mt-3 md:col-span-3">
                                                        <div className="relative">
                                                            <select
                                                                name="gender"
                                                                value={
                                                                    data.gender
                                                                }
                                                                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                                                onChange={
                                                                    handleOnChange
                                                                }
                                                            >
                                                                <option value="">
                                                                    --
                                                                </option>
                                                                {flatmateGender.map(
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
                                                                htmlFor="gender"
                                                                className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                                                            >
                                                                {genderStepTwo}
                                                            </label>

                                                            <InputError
                                                                message={
                                                                    errors.gender
                                                                }
                                                                className="mt-2"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <NewFlatmate
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
                                            <div className="">
                                                <InputLabel
                                                    htmlFor="amenties"
                                                    value={amenitiesStepSix}
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
                                                {errors.amenities && (
                                                    <InputError
                                                        message={
                                                            errors.amenities
                                                        }
                                                        className="mt-2"
                                                    />
                                                )}
                                            </div>

                                            <div className="mt-4">
                                                <InputLabel
                                                    htmlFor="hobbies"
                                                    value={hobbiesStepSix}
                                                    className="mb-3"
                                                />
                                                <Select
                                                    closeMenuOnSelect={false}
                                                    components={
                                                        animatedComponents
                                                    }
                                                    onChange={(opt) =>
                                                        setSelectedHobbies(opt)
                                                    }
                                                    isMulti
                                                    maxValues={15}
                                                    options={hobbiesOptions}
                                                    value={selectedHobbies}
                                                />
                                                {errors.hobbies && (
                                                    <InputError
                                                        message={errors.hobbies}
                                                        className="mt-2"
                                                    />
                                                )}
                                            </div>
                                            <div>
                                                <div className="relative mt-7">
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

                                                {roommate.images.length > 0 && (
                                                    <>
                                                        <h2>{filesUploaded}</h2>

                                                        {roommate.images.map(
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
                                                                                    roommate
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
