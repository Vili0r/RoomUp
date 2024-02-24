import GuestLayout from "@/Layouts/GuestLayout";
import React, { useState, useEffect } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import axios from "axios";
import { Head, useForm, usePage } from "@inertiajs/react";
import { DebounceInput } from "react-debounce-input";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import CreateSteps from "@/Components/CreateSteps";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import StepOne from "@/Components/StepOne";
import StepTwo from "@/Components/StepTwo";
import StepFour from "@/Components/StepFour";
import NewFlatmate from "@/Components/NewFlatmate";
import CurrentFlatmate from "@/Components/CurrentFlatmate";
import { BsCheck } from "react-icons/bs";
import {
    stepOneSchema,
    stepTwoSchema,
    stepThreeSchema,
    stepFourSchema,
    stepFiveSchema,
    stepSixSchema,
} from "../../Validations/SharedValidation";
import {
    furnishings,
    roomSize,
    minimumStay,
    maximumStay,
    daysAvailable,
    amenities,
} from "@/arrays/Array";
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

const Create = (props) => {
    const animatedComponents = makeAnimated();
    const [step, setStep] = useState(1);
    const [validationErrors, setValidationErrors] = useState({});
    const [search, setSearch] = useState("");
    const [selectedAddress, setSelectedAddress] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [roomAttributesValidationErrors, setRoomAttributesValidationErrors] =
        useState({});

    const [roomAttributes, setRoomAttributes] = useState([
        {
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
        },
    ]);

    const { csrf_token } = usePage().props;

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
            available_rooms: "",
            size: "",
            type: "",
            current_occupants: "",
            what_i_am: "",
            current_flatmate_age: "",
            current_flatmate_smoker: "",
            current_flatmate_pets: "",
            current_flatmate_occupation: "",
            current_flatmate_gender: "",
            current_flatmate_hobbies: "",
            address_1: "",
            address_2: "",
            area: "",
            city: "",
            post_code: "",
            lat: "",
            long: "",
            display_name: "",
            minutes: "",
            mode: "",
            station: "",
            amenities: "",
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
            rooms: "",
            images: [],
            selectedAmenities: [],
        },
        {
            //yup resolver required otherwise it cannot connect the useForm and yup
            resolver: yupResolver(stepOneSchema),
        }
    );

    const { t, i18n } = useTranslation();
    const {
        inputPlaceholder,
        nextBtn,
        backBtn,
        noResult,
        fixErrors,
        stepSixErrors,
        processingBtn,
        placeAdBtn,
    } = t("shared.miscs");
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
    const { amenitiesStepSix, titleStepSix, descriptionStepSix } = t(
        "shared.forms.stepSix"
    );

    //next step
    const handleNext = async () => {
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
                    schema = stepThreeSchema;
                    break;
                case 4:
                    schema = stepFourSchema(t);
                    break;
                case 5:
                    schema = stepFiveSchema(data.current_occupants, t);
                    break;
                case 6:
                    schema = stepSixSchema(t);
                    break;
                default:
                    break;
            }

            if (schema === stepThreeSchema) {
                const isValid = await validateDynamicInputs(t);
                if (!isValid) {
                    return;
                }
            } else {
                //checking if the schema validation is true or false
                await schema.validate(data, { abortEarly: false });
            }

            //await schema.validate(data, { abortEarly: false });
            setStep(step + 1);
        } catch (errors) {
            clearErrors();
            const validationErrors = {};
            errors.inner.forEach((error) => {
                validationErrors[error.path] = error.message;
            });

            setValidationErrors(validationErrors);
            setError(validationErrors);
        }
    };

    const validateDynamicInputs = async (t) => {
        try {
            await stepThreeSchema(t).validate(roomAttributes, {
                abortEarly: false,
            });
            return true;
        } catch (errors) {
            const validationErrors = {};
            errors.inner.forEach((error) => {
                const { path, message } = error;
                const [index, inputName] = path.split(".");
                validationErrors[`roomAttributes.${index}.${inputName}`] =
                    message;
            });
            setRoomAttributesValidationErrors(validationErrors);
            return false;
        }
    };

    //back step
    const handleBack = () => {
        //clearing errors before going to previous step as if it is already in the next step it has passed validation
        setValidationErrors({});
        setRoomAttributesValidationErrors({});
        clearErrors();
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

    useEffect(() => {
        //Adding quantity of rooms based on user input
        if (data.available_rooms >= 1) {
            setRoomAttributes((prevFields) => {
                if (prevFields) {
                    const newFields = [];
                    for (let i = 0; i < data.available_rooms; i++) {
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
                    return newFields;
                }
            });
        }
    }, [data.available_rooms]);

    //Form change on the Rooms
    const handleFormChange = (event, index) => {
        const roomItems = [...roomAttributes];
        roomItems[index][event.target.name] =
            event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value;

        setRoomAttributes(roomItems);
        setData("rooms", roomAttributes);
    };

    //Handling on submit events
    const submit = (e) => {
        e.preventDefault();

        //Transforming amenties so the backend can attach them to the pivot table
        data.amenities = data.selectedAmenities.map((item) => {
            return {
                id: item.value,
            };
        });

        post(route("shared.store"));
    };

    const handleFilePondRevert = (uniqueId, load, error) => {
        const responseObject = JSON.parse(uniqueId);
        const fileValue = responseObject.file;

        const existingImages = data.images;
        const updatedImages = existingImages.filter(
            (image) => image !== fileValue
        );

        setData("images", updatedImages);
        destroy(route("revert.image", uniqueId));
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

    const handleSelectedAddress = (selectedAddress) => {
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
        <GuestLayout user={props.auth.user}>
            <Head title="Place Shared Property Advertisment" />
            <div className="flex flex-col items-center min-h-screen pt-6 bg-white sm:justify-center sm:pt-0 dark:bg-gray-900">
                <div className="w-full mt-6 overflow-hidden sm:max-w-xl dark:bg-gray-800 sm:rounded-lg">
                    <div className="p-5">
                        <CreateSteps activeStep={step} />
                        <div className="p-4 mt-8">
                            <form onSubmit={submit}>
                                {step == "1" && (
                                    <>
                                        <div className="mt-10 flex relative items-center p-2 py-3 bg-white border border-[#bcbaba] rounded-full text-black font-bold  text-lg">
                                            <AiOutlineSearch className="w-7 h-7" />
                                            <DebounceInput
                                                value={search}
                                                minLength={1}
                                                debounceTimeout={500}
                                                onChange={(e) => {
                                                    getAddresses(
                                                        e.target.value
                                                    );
                                                    setSearch(e.target.value);
                                                }}
                                                className="w-full px-3 text-lg bg-transparent border-none focus:outline-none focus:border-none focus:ring-0 "
                                                placeholder={inputPlaceholder}
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
                                                        {searchResults.map(
                                                            (
                                                                address,
                                                                index
                                                            ) => (
                                                                <li className="border-b border-gray-200">
                                                                    <button
                                                                        onClick={() => {
                                                                            setSelectedAddress(
                                                                                address
                                                                            );
                                                                            handleSelectedAddress(
                                                                                address
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
                                                    {noResult}"{search}"
                                                </div>
                                            ))}

                                        <StepTwo
                                            data={data}
                                            errors={validationErrors}
                                            handleOnChange={handleOnChange}
                                        />

                                        <div className="my-6">
                                            <PrimaryButton
                                                onClick={handleNext}
                                                className="w-full hover:text-black rounded-md bg-black hover:bg-[#AED6F1] px-3 py-4 text-white focus:bg-neutral-800 focus:outline-none "
                                            >
                                                {nextBtn}
                                            </PrimaryButton>
                                        </div>
                                    </>
                                )}

                                {step == "2" && (
                                    <>
                                        <StepOne
                                            data={data}
                                            errors={validationErrors}
                                            handleOnChange={handleOnChange}
                                        />

                                        <div className="my-6">
                                            <PrimaryButton
                                                onClick={handleNext}
                                                className="w-full hover:text-black rounded-md bg-black hover:bg-[#AED6F1] px-3 py-4 text-white focus:bg-neutral-800 focus:outline-none "
                                            >
                                                {nextBtn}
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

                                {step == "3" && (
                                    <>
                                        {Object.keys(
                                            roomAttributesValidationErrors
                                        ).length > 0 && (
                                            <div className="mt-3 mb-2 border-l-8 border-red-900 bg-red-50">
                                                <div className="flex items-center">
                                                    <div className="p-2">
                                                        <div className="flex items-center">
                                                            <div className="ml-2">
                                                                <svg
                                                                    className="w-8 h-8 mr-2 text-red-900 cursor-pointer"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    fill="none"
                                                                    viewBox="0 0 24 24"
                                                                    stroke="currentColor"
                                                                >
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth="2"
                                                                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                                                                    />
                                                                </svg>
                                                            </div>
                                                            <p className="px-6 py-4 text-lg font-semibold text-red-900">
                                                                {fixErrors}
                                                            </p>
                                                        </div>
                                                        <div className="px-16 mb-4">
                                                            {Object.keys(
                                                                roomAttributesValidationErrors
                                                            ).map(
                                                                (errorKey) => (
                                                                    <li
                                                                        key={
                                                                            errorKey
                                                                        }
                                                                        className="text-sm font-bold text-red-500 text-md"
                                                                    >
                                                                        {
                                                                            roomAttributesValidationErrors[
                                                                                errorKey
                                                                            ]
                                                                        }
                                                                    </li>
                                                                )
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {roomAttributes.map((field, index) => (
                                            <div className="max-w-2xl px-8 py-4 mt-4 mb-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
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
                                                                    field.available_from
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
                                                        </div>
                                                        <span className="error">
                                                            {
                                                                roomAttributesValidationErrors[
                                                                    `roomAttrributes.${index}.available_from`
                                                                ]
                                                            }
                                                        </span>
                                                    </div>

                                                    <span
                                                        className="px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-300 transform bg-gray-600 rounded cursor-pointer hover:bg-gray-500"
                                                        tabindex="0"
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
                                                                field.room_cost
                                                            }
                                                            className="w-full px-3 py-3 border border-gray-300 rounded-md shadow peer shadow-gray-100 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                                                            autoComplete="off"
                                                            onChange={(event) =>
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
                                                            {roomCostStepThree}
                                                        </label>

                                                        <InputError
                                                            message={
                                                                validationErrors.room_cost
                                                            }
                                                            className="mt-2"
                                                        />
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
                                                                field.room_deposit
                                                            }
                                                            className="w-full px-3 py-3 border border-gray-300 rounded-md shadow peer shadow-gray-100 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                                                            autoComplete="off"
                                                            onChange={(event) =>
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
                                                        <InputError
                                                            message={
                                                                validationErrors.room_deposit
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-1 gap-6 mt-7 sm:grid-cols-2">
                                                    <div className="relative">
                                                        <select
                                                            name="room_size"
                                                            value={
                                                                field.room_size
                                                            }
                                                            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                                            onChange={(event) =>
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
                                                            htmlFor="room_size"
                                                            className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                                                        >
                                                            {roomSizeStepThree}
                                                        </label>

                                                        <InputError
                                                            message={
                                                                validationErrors.room_size
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                    <div className="relative">
                                                        <select
                                                            name="room_furnished"
                                                            value={
                                                                field.room_furnished
                                                            }
                                                            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                                            onChange={(event) =>
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
                                                            htmlFor="room_furnished"
                                                            className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                                                        >
                                                            {
                                                                roomFurnishedStepThree
                                                            }
                                                        </label>

                                                        <InputError
                                                            message={
                                                                validationErrors.room_furnished
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="flex justify-start gap-2 mt-3">
                                                    <span className="mt-1 text-sm "></span>
                                                    <InputLabel
                                                        htmlFor="room_references"
                                                        value={
                                                            referencesStepThree
                                                        }
                                                        className="mt-1 text-sm "
                                                    />
                                                    <label className="relative cursor-pointer">
                                                        <input
                                                            id="checkbox-1"
                                                            type="checkbox"
                                                            name="room_references"
                                                            value={
                                                                field.room_references
                                                            }
                                                            onChange={(event) =>
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
                                                                    field.minimum_stay
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
                                                                className="absolute top-0 left-0 px-1 ml-3 text-xs text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                                                            >
                                                                {
                                                                    minimumStayStepThree
                                                                }
                                                            </label>

                                                            <InputError
                                                                message={
                                                                    validationErrors.minimum_stay
                                                                }
                                                                className="mt-2"
                                                            />
                                                        </div>
                                                        <div className="relative">
                                                            <select
                                                                name="maximum_stay"
                                                                value={
                                                                    field.maximum_stay
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
                                                                className="absolute top-0 left-0 px-1 ml-3 text-xs text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                                                            >
                                                                {
                                                                    maximumStayStepThree
                                                                }
                                                            </label>

                                                            <InputError
                                                                message={
                                                                    validationErrors.maximum_stay
                                                                }
                                                                className="mt-2"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-1 gap-6 mt-7 sm:grid-cols-2">
                                                    <div className="relative">
                                                        <select
                                                            name="days_available"
                                                            value={
                                                                field.days_available
                                                            }
                                                            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                                            onChange={(event) =>
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
                                                            htmlFor="days_available"
                                                            className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                                                        >
                                                            {
                                                                daysAvailableStepThree
                                                            }
                                                        </label>
                                                        <InputError
                                                            message={
                                                                validationErrors.days_available
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                    <div className="flex justify-start gap-2 mt-3">
                                                        <span className="mt-1 text-sm "></span>
                                                        <InputLabel
                                                            htmlFor="short_term"
                                                            value={
                                                                shortTermStepThree
                                                            }
                                                            className="mt-1 text-sm "
                                                        />
                                                        <label className="relative cursor-pointer">
                                                            <input
                                                                id="checkbox-1"
                                                                type="checkbox"
                                                                name="short_term"
                                                                value={
                                                                    field.short_term
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

                                        <div className="my-6">
                                            <PrimaryButton
                                                onClick={handleNext}
                                                className="w-full hover:text-black rounded-md bg-black hover:bg-[#AED6F1] px-3 py-4 text-white focus:bg-neutral-800 focus:outline-none "
                                            >
                                                {nextBtn}
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

                                {step == "4" && (
                                    <>
                                        <StepFour
                                            data={data}
                                            errors={validationErrors}
                                            handleOnChange={handleOnChange}
                                        />

                                        <div className="my-6">
                                            <PrimaryButton
                                                onClick={handleNext}
                                                className="w-full hover:text-black rounded-md bg-black hover:bg-[#AED6F1] px-3 py-4 text-white focus:bg-neutral-800 focus:outline-none "
                                            >
                                                {nextBtn}
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

                                {step == "5" && (
                                    <>
                                        {data.current_occupants > 0 && (
                                            <CurrentFlatmate
                                                data={data}
                                                errors={validationErrors}
                                                handleOnChange={handleOnChange}
                                            />
                                        )}

                                        {data.available_rooms > 0 && (
                                            <NewFlatmate
                                                data={data}
                                                errors={validationErrors}
                                                handleOnChange={handleOnChange}
                                            />
                                        )}
                                        <div className="my-6">
                                            <PrimaryButton
                                                onClick={handleNext}
                                                className="w-full hover:text-black rounded-md bg-black hover:bg-[#AED6F1] px-3 py-4 text-white focus:bg-neutral-800 focus:outline-none "
                                            >
                                                {nextBtn}
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

                                {step == "6" && (
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
                                                                {stepSixErrors}
                                                            </h2>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        <div className="mt-7">
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
                                                message={errors.amenities}
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
                                                            csrf_token,
                                                    },
                                                }}
                                                name="images"
                                                labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                                            />
                                        </div>

                                        <InputError
                                            message={errors.images}
                                            className="mt-2"
                                        />

                                        <div className="my-6">
                                            <PrimaryButton
                                                disabled={processing}
                                                className="w-full hover:text-black rounded-md bg-black hover:bg-[#AED6F1] px-3 py-4 text-white focus:bg-neutral-800 focus:outline-none "
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
