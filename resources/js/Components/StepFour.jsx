import React from "react";
import { InputError, Checkbox } from "@/Components";

const StepFour = ({ data, errors, handleOnChange }) => {
    return (
        <>
            <div>
                <div className="relative mt-5">
                    <input
                        type="text"
                        name="first_name"
                        id="first_name"
                        placeholder="First Name"
                        value={data.first_name}
                        className="w-full px-3 py-3 border border-gray-300 rounded-md shadow peer shadow-gray-100 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                        autoComplete="off"
                        onChange={handleOnChange}
                    />
                    <label
                        htmlFor="first_name"
                        className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none font-popp peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                    >
                        First Name
                    </label>
                </div>

                {errors.first_name && (
                    <InputError message={errors.first_name} className="mt-2" />
                )}
            </div>

            <div>
                <div className="relative mt-5">
                    <input
                        type="text"
                        name="last_name"
                        id="last_name"
                        placeholder="Last Name"
                        value={data.last_name}
                        className="w-full px-3 py-3 border border-gray-300 rounded-md shadow peer shadow-gray-100 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                        autoComplete="off"
                        onChange={handleOnChange}
                    />
                    <label
                        htmlFor="last_name"
                        className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none font-popp peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                    >
                        Last Name
                    </label>
                </div>

                {errors.last_name && (
                    <InputError message={errors.last_name} className="mt-2" />
                )}
            </div>

            <div className="mt-3">
                <label className="flex items-center">
                    <Checkbox
                        name="display_last_name"
                        value={data.display_last_name}
                        onChange={handleOnChange}
                        checked={data.display_last_name ? true : false}
                    />
                    <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                        Display Last Name
                    </span>
                    <InputError
                        message={errors.display_last_name}
                        className="mt-2"
                    />
                </label>
            </div>

            <div>
                <div className="relative mt-5">
                    <input
                        type="text"
                        name="telephone"
                        id="telephone"
                        placeholder="Telephone"
                        value={data.telephone}
                        className="w-full px-3 py-3 border border-gray-300 rounded-md shadow peer shadow-gray-100 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                        autoComplete="off"
                        onChange={handleOnChange}
                    />
                    <label
                        htmlFor="telephone"
                        className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none font-popp peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                    >
                        Telephone
                    </label>
                </div>

                {errors.telephone && (
                    <InputError message={errors.telephone} className="mt-2" />
                )}
            </div>

            <div className="mt-3">
                <label className="flex items-center">
                    <Checkbox
                        name="display_telephone"
                        value={data.display_telephone}
                        onChange={handleOnChange}
                        checked={data.display_telephone ? true : false}
                    />
                    <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                        Display Telephone
                    </span>
                    <InputError
                        message={errors.display_telephone}
                        className="mt-2"
                    />
                </label>
            </div>
        </>
    );
};

export default StepFour;
