import GuestLayout from "@/Layouts/GuestLayout";
import React, { useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { Head, useForm, usePage } from "@inertiajs/react";
import QuestCreateSteps from "@/Components/QuestCreateSteps";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import StepFour from "@/Components/StepFour";
import NewFlatmate from "@/Components/NewFlatmate";
import { BsCheck } from "react-icons/bs";
import {
    stepOneSchema,
    stepTwoSchema,
    stepThreeSchema,
    stepFourSchema,
} from "../../Validations/RoommateValidation";
import { yupResolver } from "@hookform/resolvers/yup";
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

const Create = (props) => {
    const animatedComponents = makeAnimated();
    const [step, setStep] = useState(1);
    const [selectedAmenities, setSelectedAmenities] = useState([]);
    const [selectedHobbies, setSelectedHobbies] = useState([]);
    const [validationErrors, setValidationErrors] = useState({});

    const {
        data,
        setData,
        post,
        processing,
        errors,
        setError,
        clearErrors,
        delete: destroy,
    } = useForm(
        {
            title: "",
            description: "",
            budget: "",
            searching_for: "",
            room_size: "",
            age: "",
            smoker: "",
            pets: "",
            occupation: "",
            gender: "",
            area: "",
            city: "",
            available_from: "",
            minimum_stay: "",
            maximum_stay: "",
            days_available: "",
            short_term: "",
            first_name: "",
            last_name: "",
            display_last_name: "",
            telephone: "",
            display_telephone: "",
            new_flatmate_min_age: "",
            new_flatmate_max_age: "",
            new_flatmate_smoker: "",
            new_flatmate_pets: "",
            new_flatmate_references: "",
            new_flatmate_couples: "",
            new_flatmate_occupation: "",
            new_flatmate_gender: "",
            new_flatmate_hobbies: "",
            selectedHobbies: [],
            selectedAmenities: [],
            amenities: [],
            hobbies: [],
            images: [],
        },
        {
            //yup resolver required otherwise it cannot connect the useForm and yup
            resolver: yupResolver(stepOneSchema),
        }
    );

    const { t, i18n } = useTranslation();
    const {
        nextBtn,
        backBtn,
        yourInformation,
        fixErrors,
        processingBtn,
        placeAdBtn,
    } = t("roommate.misc");
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

    //back step
    const handleBack = () => {
        //clearing errors before going to previous step as if it is already in the next step it has passed validation
        clearErrors();
        setValidationErrors({});
        setStep(step - 1);
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
    const submit = async (e) => {
        e.preventDefault();
        clearErrors();
        setValidationErrors({});
        //check if the current step has passed validation and only if true then proceed to next
        try {
            let schema;
            switch (step) {
                case 1:
                    schema = stepOneSchema(t);
                    break;
                case 2:
                    schema = stepTwoSchema(t);
                    break;
                case 3:
                    schema = stepThreeSchema(t);
                    break;
                case 4:
                    schema = stepFourSchema(t);
                    break;
                default:
                    break;
            }

            await schema.validate(data, { abortEarly: false });
            if (step < 4) {
                setStep(step + 1);
            } else {
                //Transforming amenties and Hobbies so the backend can attach them to the pivot table
                data.amenities = data.selectedAmenities.map((item) => {
                    return {
                        id: item.value,
                    };
                });

                data.hobbies = data.selectedHobbies.map((item) => {
                    return {
                        id: item.value,
                    };
                });

                post(route("roommate.store"));
            }
        } catch (errors) {
            clearErrors();
            const validationErrors = {};

            errors.inner.forEach((error) => {
                validationErrors[error.path] = error.message;
            });

            setValidationErrors(validationErrors);
            console.log(validationErrors);
            setError(validationErrors);
        }
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

        if (data.images) {
            const existingImages = data.images;
            const updatedImages = existingImages.concat(fileValue);

            setData("images", updatedImages);
        } else {
            setData("images", [fileValue]);
        }
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
        <GuestLayout user={props.auth.user}>
            <Head title="Place Room Quest Advertisment" />
            <div className="flex flex-col items-center min-h-screen pt-6 bg-white sm:justify-center sm:pt-0 dark:bg-gray-900">
                <div className="w-full mt-6 overflow-hidden sm:max-w-xl dark:bg-gray-800 sm:rounded-lg">
                    <div className="p-5">
                        <QuestCreateSteps activeStep={step} />
                        <div className="p-4 mt-8">
                            <form onSubmit={submit}>
                                {step == "1" && (
                                    <>
                                        <div>
                                            <div className="relative mt-7">
                                                <input
                                                    type="text"
                                                    name="budget"
                                                    id="budget"
                                                    placeholder={budgetStepOne}
                                                    value={data.budget}
                                                    className="w-full px-3 py-3 border border-gray-300 rounded-md shadow peer shadow-gray-100 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                                                    autoComplete="off"
                                                    onChange={handleOnChange}
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
                                                    value={data.available_from}
                                                    className="w-full px-3 py-3 border border-gray-300 rounded-md shadow peer shadow-gray-100 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                                                    autoComplete="off"
                                                    onChange={handleOnChange}
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
                                                    value={data.searching_for}
                                                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                                    onChange={handleOnChange}
                                                >
                                                    <option value="">--</option>
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
                                                    value={data.minimum_stay}
                                                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                                    onChange={handleOnChange}
                                                >
                                                    <option value="">--</option>
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
                                                    value={data.maximum_stay}
                                                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                                    onChange={handleOnChange}
                                                >
                                                    <option value="">--</option>
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
                                                    message={errors.room_size}
                                                    className="mt-2"
                                                />
                                            )}
                                        </div>

                                        <div className="grid grid-cols-1 gap-6 mt-7 sm:grid-cols-2">
                                            <div className="relative">
                                                <select
                                                    name="days_available"
                                                    value={data.days_available}
                                                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                                    onChange={handleOnChange}
                                                >
                                                    <option value="">--</option>
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
                                                        value={data.short_term}
                                                        onChange={
                                                            handleOnChange
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
                                                    placeholder={cityStepOne}
                                                    value={data.city}
                                                    className="w-full px-3 py-3 border border-gray-300 rounded-md shadow peer shadow-gray-100 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                                                    autoComplete="off"
                                                    onChange={handleOnChange}
                                                />
                                                <label
                                                    htmlFor="city"
                                                    className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                                                >
                                                    {cityStepOne}
                                                </label>

                                                {errors.city && (
                                                    <InputError
                                                        message={errors.city}
                                                        className="mt-5"
                                                    />
                                                )}
                                            </div>

                                            <div className="relative ">
                                                <input
                                                    type="text"
                                                    name="area"
                                                    id="area"
                                                    placeholder={areaStepOne}
                                                    value={data.area}
                                                    className="w-full px-3 py-3 border border-gray-300 rounded-md shadow peer shadow-gray-100 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                                                    autoComplete="off"
                                                    onChange={handleOnChange}
                                                />
                                                <label
                                                    htmlFor="area"
                                                    className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                                                >
                                                    {areaStepOne}
                                                </label>

                                                {errors.area && (
                                                    <InputError
                                                        message={errors.area}
                                                        className="mt-5"
                                                    />
                                                )}
                                            </div>
                                        </div>

                                        <div className="my-6">
                                            <PrimaryButton
                                                onClick={submit}
                                                type="button"
                                                className="w-full hover:text-black rounded-md bg-black hover:bg-[#AED6F1] px-3 py-4 text-white focus:bg-neutral-800 focus:outline-none"
                                            >
                                                {nextBtn}
                                            </PrimaryButton>
                                        </div>
                                    </>
                                )}

                                {step == "2" && (
                                    <>
                                        <div className="max-w-2xl px-8 py-4 mt-4 mb-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
                                            <div className="flex items-center justify-between">
                                                <div className="relative">
                                                    <input
                                                        type="text"
                                                        name="age"
                                                        id="age"
                                                        placeholder={ageStepTwo}
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
                                                            value={data.smoker}
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
                                                                        key={id}
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
                                                            value={data.pets}
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
                                                                        key={id}
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
                                                                        key={id}
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
                                                            {occupationStepTwo}
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
                                                            value={data.gender}
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
                                                                        key={id}
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
                                            errors={validationErrors}
                                            handleOnChange={handleOnChange}
                                        />

                                        <div className="my-6">
                                            <PrimaryButton
                                                type="button"
                                                onClick={submit}
                                                className="w-full hover:text-black rounded-md bg-black hover:bg-[#AED6F1] px-3 py-4 text-white focus:bg-neutral-800 focus:outline-none"
                                            >
                                                {nextBtn}
                                            </PrimaryButton>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>

                                            <PrimaryButton
                                                type="button"
                                                className="cursor-pointer hover:text-[#F1C40F]"
                                                onClick={handleBack}
                                            >
                                                {backBtn}
                                            </PrimaryButton>

                                            <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
                                        </div>
                                    </>
                                )}

                                {step == "3" && (
                                    <>
                                        <StepFour
                                            data={data}
                                            errors={validationErrors}
                                            handleOnChange={handleOnChange}
                                        />

                                        <div className="my-6">
                                            <PrimaryButton
                                                type="button"
                                                onClick={submit}
                                                className="w-full hover:text-black rounded-md bg-black hover:bg-[#AED6F1] px-3 py-4 text-white focus:bg-neutral-800 focus:outline-none"
                                            >
                                                {nextBtn}
                                            </PrimaryButton>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>

                                            <PrimaryButton
                                                type="button"
                                                className="cursor-pointer hover:text-[#F1C40F]"
                                                onClick={handleBack}
                                            >
                                                {backBtn}
                                            </PrimaryButton>

                                            <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
                                        </div>
                                    </>
                                )}

                                {step == "4" && (
                                    <>
                                        {Object.keys(validationErrors)
                                            .length !== 0 ||
                                            (Object.keys(errors).length !==
                                                0 && (
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
                                                            {errors.images && (
                                                                <InputError
                                                                    message={
                                                                        i18n.language ===
                                                                        "en"
                                                                            ? errors.images
                                                                            : "Οι εικόνες είναι υποχρεωτικές"
                                                                    }
                                                                    className="mt-2"
                                                                />
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        <div className="">
                                            <InputLabel
                                                htmlFor="amenties"
                                                value={amenitiesStepSix}
                                                className="mb-3"
                                            />
                                            <Select
                                                closeMenuOnSelect={false}
                                                components={animatedComponents}
                                                onChange={(opt) =>
                                                    setData(
                                                        "selectedAmenities",
                                                        opt
                                                    )
                                                }
                                                isMulti
                                                options={options}
                                                value={data.selectedAmenities}
                                            />

                                            <InputError
                                                message={
                                                    errors.selectedAmenities
                                                }
                                                className="mt-2"
                                            />
                                        </div>

                                        <div className="mt-4">
                                            <InputLabel
                                                htmlFor="hobbies"
                                                value={hobbiesStepSix}
                                                className="mb-3"
                                            />
                                            <Select
                                                closeMenuOnSelect={false}
                                                components={animatedComponents}
                                                onChange={(opt) =>
                                                    setData(
                                                        "selectedHobbies",
                                                        opt
                                                    )
                                                }
                                                isMulti
                                                maxValues={15}
                                                options={hobbiesOptions}
                                                value={data.selectedHobbies}
                                            />

                                            <InputError
                                                message={
                                                    validationErrors.selectedHobbies
                                                }
                                                className="mt-2"
                                            />
                                        </div>
                                        <div>
                                            <div className="relative mt-7">
                                                <input
                                                    type="text"
                                                    name="title"
                                                    id="title"
                                                    placeholder={titleStepSix}
                                                    value={data.title}
                                                    className="w-full px-3 py-3 border border-gray-300 rounded-md shadow peer shadow-gray-100 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                                                    autoComplete="off"
                                                    onChange={handleOnChange}
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
                                                    onChange={handleOnChange}
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
                                        </div>

                                        <InputError
                                            message={validationErrors.images}
                                            className="mt-2"
                                        />

                                        <div className="my-6">
                                            <PrimaryButton
                                                disabled={processing}
                                                className="w-full hover:text-black rounded-md bg-black hover:bg-[#AED6F1] px-3 py-4 text-white focus:bg-neutral-800 focus:outline-none"
                                            >
                                                {processing
                                                    ? processingBtn
                                                    : placeAdBtn}
                                            </PrimaryButton>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>

                                            <PrimaryButton
                                                className="cursor-pointer hover:text-[#F1C40F]"
                                                onClick={handleBack}
                                            >
                                                {backBtn}
                                            </PrimaryButton>

                                            <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
                                        </div>
                                    </>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
};

export default Create;
