import React from "react";
import { InputError } from "@/Components";

const CurrentFlatmate = ({
    data,
    errors,
    handleOnChange,
    currentFlatmateSmoking,
    pets,
    currentFlatmateOccupation,
    currentFlatmateGender,
}) => {
    return (
        <div className="max-w-2xl px-8 py-4 mt-4 mb-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
            <div className="flex items-center justify-between">
                <div className="relative">
                    <input
                        type="text"
                        name="current_flatmate_age"
                        id="current_flatmate_age"
                        placeholder="Current flatmate age"
                        value={data.current_flatmate_age}
                        className="w-full px-3 py-3 border border-gray-300 rounded-md shadow peer shadow-gray-100 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                        autoComplete="off"
                        onChange={handleOnChange}
                    />
                    <label
                        htmlFor="current_flatmate_age"
                        className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none font-popp peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                    >
                        Age
                    </label>

                    <InputError
                        message={errors.current_flatmate_age}
                        className="mt-2"
                    />
                </div>
                <span
                    className="px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-300 transform bg-gray-600 rounded cursor-pointer hover:bg-gray-500"
                    tabIndex="0"
                    role="button"
                >
                    Current flatmate information
                </span>
            </div>
            <div className="grid grid-cols-1 gap-4 text-sm gap-y-2 md:grid-cols-5 mt-7">
                <div className="relative md:col-span-3">
                    <div className="relative">
                        <select
                            name="current_flatmate_smoker"
                            value={data.current_flatmate_smoker}
                            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            onChange={handleOnChange}
                        >
                            <option value="">--</option>
                            {currentFlatmateSmoking.map(({ id, name }) => (
                                <option key={id} value={id}>
                                    {name}
                                </option>
                            ))}
                        </select>
                        <label
                            htmlFor="current_flatmate_smoker"
                            className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none font-popp peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                        >
                            Smoker
                        </label>

                        <InputError
                            message={errors.current_flatmate_smoker}
                            className="mt-2"
                        />
                    </div>
                </div>

                <div className="relative md:col-span-2">
                    <div className="relative">
                        <select
                            name="current_flatmate_pets"
                            value={data.current_flatmate_pets}
                            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            onChange={handleOnChange}
                        >
                            <option value="">--</option>
                            {pets.map(({ id, name }) => (
                                <option key={id} value={id}>
                                    {name}
                                </option>
                            ))}
                        </select>
                        <label
                            htmlFor="current_flatmate_pets"
                            className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none font-popp peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                        >
                            Pets
                        </label>

                        <InputError
                            message={errors.current_flatmate_pets}
                            className="mt-2"
                        />
                    </div>
                </div>

                <div className="relative mt-3 md:col-span-2">
                    <div className="relative">
                        <select
                            name="current_flatmate_occupation"
                            value={data.current_flatmate_occupation}
                            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            onChange={handleOnChange}
                        >
                            <option value="">--</option>
                            {currentFlatmateOccupation.map(({ id, name }) => (
                                <option key={id} value={id}>
                                    {name}
                                </option>
                            ))}
                        </select>
                        <label
                            htmlFor="current_flatmate_occupation"
                            className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none font-popp peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                        >
                            Occupation
                        </label>

                        <InputError
                            message={errors.current_flatmate_occupation}
                            className="mt-2"
                        />
                    </div>
                </div>

                <div className="relative mt-3 md:col-span-3">
                    <div className="relative">
                        <select
                            name="current_flatmate_gender"
                            value={data.current_flatmate_gender}
                            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            onChange={handleOnChange}
                        >
                            <option value="">--</option>
                            {currentFlatmateGender.map(({ id, name }) => (
                                <option key={id} value={id}>
                                    {name}
                                </option>
                            ))}
                        </select>
                        <label
                            htmlFor="current_flatmate_gender"
                            className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none font-popp peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                        >
                            Gender
                        </label>

                        <InputError
                            message={errors.current_flatmate_gender}
                            className="mt-2"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CurrentFlatmate;
