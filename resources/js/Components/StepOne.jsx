import React from "react";
import InputError from "./InputError";
import { useTranslation } from "react-i18next";
import {
    availableRooms,
    size,
    type,
    whatIAm,
    currentOccupants,
} from "@/arrays/Array";

const StepOne = ({ data, errors, handleOnChange }) => {
    const { t, i18n } = useTranslation();
    const {
        availableRoomsStepOne,
        sizeStepOne,
        typeStepOne,
        currentOccupantsStepOne,
        whatIAmStepOne,
    } = t("shared.forms.stepOne");
    return (
        <>
            <div>
                <div className="relative mt-5">
                    <select
                        name="available_rooms"
                        value={data.available_rooms}
                        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        onChange={handleOnChange}
                    >
                        <option value="">{availableRoomsStepOne}</option>
                        {availableRooms.map(({ id, nameEn, nameGr }) => (
                            <option key={id} value={id}>
                                {i18n.language == "en" ? nameEn : nameGr}
                            </option>
                        ))}
                    </select>
                    <label
                        htmlFor="available_rooms"
                        className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                    >
                        {availableRoomsStepOne}
                    </label>
                </div>
                {errors.available_rooms && (
                    <InputError
                        message={errors.available_rooms}
                        className="mt-2"
                    />
                )}
            </div>

            <div className="grid grid-cols-1 gap-6 mt-7 sm:grid-cols-2">
                <div>
                    <div className="relative">
                        <select
                            name="size"
                            value={data.size}
                            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            onChange={handleOnChange}
                        >
                            <option value="">{sizeStepOne}</option>
                            {size.map(({ id, nameEn, nameGr }) => (
                                <option key={id} value={id}>
                                    {i18n.language == "en" ? nameEn : nameGr}
                                </option>
                            ))}
                        </select>
                        <label
                            htmlFor="size"
                            className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                        >
                            {sizeStepOne}
                        </label>
                    </div>
                    {errors.size && (
                        <InputError message={errors.size} className="mt-2" />
                    )}
                </div>

                <div>
                    <div className="relative">
                        <select
                            name="type"
                            value={data.type}
                            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            onChange={handleOnChange}
                        >
                            <option value="">{typeStepOne}</option>
                            {type.map(({ id, nameEn, nameGr }) => (
                                <option key={id} value={id}>
                                    {i18n.language == "en" ? nameEn : nameGr}
                                </option>
                            ))}
                        </select>
                        <label
                            htmlFor="type"
                            className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                        >
                            {typeStepOne}
                        </label>
                    </div>
                    {errors.type && (
                        <InputError message={errors.type} className="mt-2" />
                    )}
                </div>
            </div>
            <div>
                <div className="relative mt-7">
                    <select
                        name="current_occupants"
                        value={data.current_occupants}
                        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        onChange={handleOnChange}
                    >
                        <option value=""> {currentOccupantsStepOne}</option>
                        {currentOccupants.map(({ id, nameEn, nameGr }) => (
                            <option key={id} value={id}>
                                {i18n.language == "en" ? nameEn : nameGr}
                            </option>
                        ))}
                    </select>
                    <label
                        htmlFor="current_occupants"
                        className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                    >
                        {currentOccupantsStepOne}
                    </label>
                </div>
                {errors.current_occupants && (
                    <InputError
                        message={errors.current_occupants}
                        className="mt-2"
                    />
                )}
            </div>

            <div>
                <div className="relative mt-7">
                    <select
                        name="what_i_am"
                        value={data.what_i_am}
                        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        onChange={handleOnChange}
                    >
                        <option value="">{whatIAmStepOne}</option>
                        {whatIAm.map(({ id, nameEn, nameGr }) => (
                            <option key={id} value={id}>
                                {i18n.language == "en" ? nameEn : nameGr}
                            </option>
                        ))}
                    </select>
                    <label
                        htmlFor="what_i_am"
                        className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                    >
                        {whatIAmStepOne}
                    </label>
                </div>
                {errors.what_i_am && (
                    <InputError message={errors.what_i_am} className="mt-2" />
                )}
            </div>
        </>
    );
};

export default StepOne;
