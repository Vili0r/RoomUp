import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage, Link, useForm } from "@inertiajs/react";
import { InputError, InputLabel, PrimaryButton } from "@/Components";
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
        room,
        roomSize,
        furnishings,
        minimumStay,
        maximumStay,
        daysAvailable,
    } = usePage().props;

    const {
        data,
        setData,
        put,
        processing,
        errors,
        delete: destroy,
    } = useForm({
        sub_title: room.sub_title,
        sub_description: room.sub_description,
        room_size: room.room_size,
        room_cost: room.room_cost,
        room_deposit: room.room_deposit,
        room_references: room.room_references,
        room_furnished: room.room_furnished,
        available_from: room.available_from,
        minimum_stay: room.minimum_stay,
        maximum_stay: room.maximum_stay,
        days_available: room.days_available,
        short_term: room.short_term,
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

        put(route("room.update", room.id));
    };

    //Deleting images from database
    const handleDeletePhoto = (fileName) => {
        destroy(
            route("room.deletePhotos.destroy", {
                room: room.id,
                fileName: fileName,
            }),
            {
                preserveScroll: true,
            }
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
            <Head title="Edit My Rooms" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <form onSubmit={submit}>
                        <div className="w-full max-w-4xl p-6 mx-auto mt-4 bg-white rounded-2xl">
                            <div className="relative">
                                <input
                                    type="text"
                                    name="sub_title"
                                    id="title"
                                    placeholder="Title"
                                    value={data.sub_title}
                                    className="w-full px-3 py-3 border border-gray-300 rounded-md shadow peer shadow-gray-100 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                                    autoComplete="off"
                                    onChange={handleOnChange}
                                />
                                <label
                                    htmlFor="title"
                                    className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none font-popp peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                                >
                                    Title
                                </label>
                                <InputError
                                    message={errors.sub_title}
                                    className="mt-2"
                                />
                            </div>

                            <div className="flex items-center justify-between mt-7">
                                <div className="relative">
                                    <input
                                        type="date"
                                        name="available_from"
                                        id="available_from"
                                        placeholder="Available From"
                                        value={data.available_from}
                                        className="w-full px-3 py-3 border border-gray-300 rounded-md shadow peer shadow-gray-100 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                                        autoComplete="off"
                                        onChange={handleOnChange}
                                    />
                                    <label
                                        htmlFor="available_from"
                                        className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none font-popp peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                                    >
                                        Available From
                                    </label>

                                    <InputError
                                        message={errors.available_from}
                                        className="mt-2"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-6 mt-7 sm:grid-cols-2">
                                <div className="relative">
                                    <input
                                        type="text"
                                        name="room_cost"
                                        id="room_cost"
                                        placeholder="Room cost Per Month"
                                        value={data.room_cost}
                                        className="w-full px-3 py-3 border border-gray-300 rounded-md shadow peer shadow-gray-100 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                                        autoComplete="off"
                                        onChange={handleOnChange}
                                    />
                                    <label
                                        htmlFor="room_cost"
                                        className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none font-popp peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                                    >
                                        Room Cost Per Month
                                    </label>

                                    <InputError
                                        message={errors.room_cost}
                                        className="mt-2"
                                    />
                                </div>
                                <div className="relative">
                                    <input
                                        type="text"
                                        name="room_deposit"
                                        id="room_deposit"
                                        placeholder="Room Deposit"
                                        value={data.room_deposit}
                                        className="w-full px-3 py-3 border border-gray-300 rounded-md shadow peer shadow-gray-100 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                                        autoComplete="off"
                                        onChange={handleOnChange}
                                    />
                                    <label
                                        htmlFor="room_deposit"
                                        className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none font-popp peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                                    >
                                        Room Deposit
                                    </label>

                                    <InputError
                                        message={errors.room_deposit}
                                        className="mt-2"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-6 mt-7 sm:grid-cols-2">
                                <div className="relative">
                                    <select
                                        name="room_size"
                                        value={data.room_size}
                                        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        onChange={(event) =>
                                            handleFormChange(event, index)
                                        }
                                    >
                                        <option value="">--</option>
                                        {roomSize.map(({ id, name }) => (
                                            <option key={id} value={id}>
                                                {name}
                                            </option>
                                        ))}
                                    </select>
                                    <label
                                        htmlFor="room_size"
                                        className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none font-popp peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                                    >
                                        Room Size
                                    </label>

                                    <InputError
                                        message={errors.room_size}
                                        className="mt-2"
                                    />
                                </div>
                                <div className="relative">
                                    <select
                                        name="room_furnished"
                                        value={data.room_furnished}
                                        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        onChange={handleOnChange}
                                    >
                                        <option value="">--</option>
                                        {furnishings.map(({ id, name }) => (
                                            <option key={id} value={id}>
                                                {name}
                                            </option>
                                        ))}
                                    </select>
                                    <label
                                        htmlFor="room_furnished"
                                        className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none font-popp peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                                    >
                                        Room furnished
                                    </label>

                                    <InputError
                                        message={errors.room_furnished}
                                        className="mt-2"
                                    />
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
                                            data.room_references ? true : false
                                        }
                                        value={data.room_references}
                                        onChange={handleOnChange}
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
                                            value={data.minimum_stay}
                                            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                            onChange={handleOnChange}
                                        >
                                            <option value="">--</option>
                                            {minimumStay.map(({ id, name }) => (
                                                <option key={id} value={id}>
                                                    {name}
                                                </option>
                                            ))}
                                        </select>
                                        <label
                                            htmlFor="minimum_stay"
                                            className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none font-popp peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                                        >
                                            Minimum Stay
                                        </label>

                                        <InputError
                                            message={errors.minimum_stay}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div className="relative">
                                        <select
                                            name="maximum_stay"
                                            value={data.maximum_stay}
                                            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                            onChange={handleOnChange}
                                        >
                                            <option value="">--</option>
                                            {maximumStay.map(({ id, name }) => (
                                                <option key={id} value={id}>
                                                    {name}
                                                </option>
                                            ))}
                                        </select>
                                        <label
                                            htmlFor="maximum_stay"
                                            className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none font-popp peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                                        >
                                            Maximum Stay
                                        </label>

                                        <InputError
                                            message={errors.maximum_stay}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
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
                                        {daysAvailable.map(({ id, name }) => (
                                            <option key={id} value={id}>
                                                {name}
                                            </option>
                                        ))}
                                    </select>
                                    <label
                                        htmlFor="days_available"
                                        className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none font-popp peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                                    >
                                        Days available
                                    </label>

                                    <InputError
                                        message={errors.days_available}
                                        className="mt-2"
                                    />
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
                                                data.short_term ? true : false
                                            }
                                            value={data.short_term}
                                            onChange={handleOnChange}
                                            className="appearance-none h-6 w-6 border-2 rounded-[7px] border-[#f3f2f2]"
                                        />
                                        <BsCheck className="absolute w-8 h-8 text-white text-opacity-0 transition ease-out text-8xl -left-1 -top-1 check-1 after:bg-black" />
                                    </label>
                                </div>
                            </div>

                            <div className="relative mt-5">
                                <textarea
                                    type="text"
                                    name="sub_description"
                                    id="sub_description"
                                    rows="4"
                                    placeholder="description"
                                    value={data.sub_description}
                                    className="w-full px-3 py-3 border border-gray-300 rounded-md shadow peer shadow-gray-100 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                                    autoComplete="off"
                                    onChange={handleOnChange}
                                />
                                <label
                                    htmlFor="description"
                                    className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none font-popp peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                                >
                                    Description
                                </label>
                                <InputError
                                    message={errors.sub_description}
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
                                            "X-CSRF-TOKEN": props.csrf_token,
                                        },
                                    }}
                                    name="images"
                                    labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                                />

                                {room.images?.length > 0 && (
                                    <>
                                        <h2>
                                            Files uploaded when creating
                                            advertisment
                                        </h2>

                                        {room.images?.map((file, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center justify-center"
                                            >
                                                <div className="flex max-w-4xl px-3 mx-auto">
                                                    <div
                                                        className="relative w-1/3 px-3 overflow-hidden transition-all rounded-lg group hover:w-full"
                                                        key={index}
                                                    >
                                                        <img
                                                            src={
                                                                showImage() +
                                                                room.images[
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
                                        ))}
                                    </>
                                )}
                            </div>

                            <InputError
                                message={errors.images}
                                className="mt-2"
                            />
                        </div>

                        <div className="w-full max-w-4xl mx-auto mt-4">
                            <PrimaryButton
                                disabled={processing}
                                className="w-full hover:text-black rounded-md bg-black hover:bg-[#AED6F1] px-3 py-4 text-white focus:bg-neutral-800 focus:outline-none font-popp"
                            >
                                {processing
                                    ? "Processing..."
                                    : "Update your room"}
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Edit;
