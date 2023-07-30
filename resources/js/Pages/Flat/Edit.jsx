import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage, useForm } from "@inertiajs/react";
import { Disclosure } from "@headlessui/react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import {
    StepFour,
    FlatStepOne,
    StepTwo,
    InputError,
    InputLabel,
    PrimaryButton,
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
        flat,
        whatIAmFlat,
        size,
        type,
        minutes,
        mode,
        stations,
        amenities,
        furnishings,
        minimumStay,
        maximumStay,
        daysAvailable,
        newFlatmateSmoking,
        newFlatmateGender,
        newFlatmateOccupation,
        pets,
        references,
    } = usePage().props;
    const selectedOptions = flat.amenities.map((item) => {
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
        title: flat.title,
        description: flat.description,
        size: flat.size,
        type: flat.type,
        cost: flat.cost,
        deposit: flat.deposit,
        what_i_am: flat.what_i_am,
        furnished: flat.furnished,
        address_1: flat.address.address_1,
        address_2: flat.address.address_2,
        area: flat.address.area,
        city: flat.address.city,
        post_code: flat.address.post_code,
        minutes: flat.transport.minutes,
        mode: flat.transport.mode,
        station: flat.transport.station,
        amenities: flat.amenities,
        first_name: flat.advertiser.first_name,
        last_name: flat.advertiser.last_name,
        display_last_name: flat.advertiser.display_last_name,
        telephone: flat.advertiser.telephone,
        display_telephone: flat.advertiser.display_telephone,
        available_from: flat.availability.available_from,
        minimum_stay: flat.availability.minimum_stay,
        maximum_stay: flat.availability.maximum_stay,
        days_available: flat.availability.days_available,
        short_term: flat.availability.short_term,
        new_flatmate_min_age: flat.flatmate.new_flatmate_min_age,
        new_flatmate_max_age: flat.flatmate.new_flatmate_max_age,
        new_flatmate_smoker: flat.flatmate.new_flatmate_smoker,
        new_flatmate_pets: flat.flatmate.new_flatmate_pets,
        new_flatmate_references: flat.flatmate.new_flatmate_references,
        new_flatmate_couples: flat.flatmate.new_flatmate_couples,
        new_flatmate_occupation: flat.flatmate.new_flatmate_occupation,
        new_flatmate_gender: flat.flatmate.new_flatmate_gender,
        new_flatmate_hobbies: flat.flatmate.new_flatmate_hobbies,
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

    //Handling on submit events
    const submit = (e) => {
        e.preventDefault();

        //Transforming amenties so the backend can attach them to the pivot table
        data.amenities = selectedAmenities.map((item) => {
            return {
                id: item.value,
            };
        });

        put(route("flat.update", flat.id));
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
            route("flat.deletePhotos.destroy", {
                flat: flat.id,
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
                                            Please fix the errors
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
                                            <FlatStepOne
                                                data={data}
                                                errors={errors}
                                                handleOnChange={handleOnChange}
                                                size={size}
                                                type={type}
                                                whatIAmFlat={whatIAmFlat}
                                                furnishings={furnishings}
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

                                            <div>
                                                <div className="relative mt-6">
                                                    <input
                                                        type="date"
                                                        name="available_from"
                                                        id="available_from"
                                                        placeholder="Available From"
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
                                                        className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none font-popp peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                                                    >
                                                        Available From
                                                    </label>
                                                </div>

                                                <InputError
                                                    message={
                                                        errors.available_from
                                                    }
                                                    className="mt-2"
                                                />
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
                                                            ({ id, name }) => (
                                                                <option
                                                                    key={id}
                                                                    value={id}
                                                                >
                                                                    {name}
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

                                                    <InputError
                                                        message={
                                                            errors.minimum_stay
                                                        }
                                                        className="mt-2"
                                                    />
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
                                                            ({ id, name }) => (
                                                                <option
                                                                    key={id}
                                                                    value={id}
                                                                >
                                                                    {name}
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

                                                    <InputError
                                                        message={
                                                            errors.maximum_stay
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
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
                                                            ({ id, name }) => (
                                                                <option
                                                                    key={id}
                                                                    value={id}
                                                                >
                                                                    {name}
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

                                                    <InputError
                                                        message={
                                                            errors.days_available
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                                <div className="flex justify-start gap-2 mt-3">
                                                    <span className="mt-1 text-sm font-popp"></span>
                                                    <InputLabel
                                                        htmlFor="short_term"
                                                        value="Short term"
                                                        className="mt-1 text-sm font-popp"
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
                                                            className="appearance-none h-6 w-6 border-2 rounded-[7px] border-[#f3f2f2]"
                                                        />
                                                        <BsCheck className="absolute w-8 h-8 text-white text-opacity-0 transition ease-out text-8xl -left-1 -top-1 check-1 after:bg-black" />
                                                    </label>
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
                                            <NewFlatmate
                                                data={data}
                                                errors={errors}
                                                handleOnChange={handleOnChange}
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

                                                {flat.images.length > 0 && (
                                                    <>
                                                        <h2>
                                                            Files uploaded when
                                                            creating
                                                            advertisment
                                                        </h2>

                                                        {flat.images.map(
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
                                                                                    flat
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
