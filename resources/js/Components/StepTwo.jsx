import React from "react";
import { InputError } from "@/Components";

const StepTwo = ({ data, errors, handleOnChange, minutes, mode, stations }) => {
    return (
        <>
            <div className="grid grid-cols-1 gap-4 text-sm gap-y-2 md:grid-cols-5 mt-7">
                <div className="relative md:col-span-3">
                    <input
                        type="text"
                        name="address_1"
                        id="address_1"
                        placeholder="Address Line 1"
                        value={data.address_1}
                        className="w-full px-3 py-3 border border-gray-300 rounded-md shadow peer shadow-gray-100 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                        autoComplete="off"
                        onChange={handleOnChange}
                    />
                    <label
                        htmlFor="address_1"
                        className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none font-popp peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                    >
                        Address Line 1
                    </label>
                    {errors.address_1 && (
                        <InputError
                            message={errors.address_1}
                            className="mt-2"
                        />
                    )}
                </div>

                <div className="relative md:col-span-2">
                    <input
                        type="text"
                        name="address_2"
                        id="address_2"
                        placeholder="Address Line 2"
                        value={data.address_2}
                        className="w-full px-3 py-3 border border-gray-300 rounded-md shadow peer shadow-gray-100 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                        autoComplete="off"
                        onChange={handleOnChange}
                    />
                    <label
                        htmlFor="address_2"
                        className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none font-popp peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                    >
                        Address Line 2
                    </label>
                    {errors.address_2 && (
                        <InputError
                            message={errors.address_2}
                            className="mt-2"
                        />
                    )}
                </div>

                <div className="relative mt-5 md:col-span-2">
                    <input
                        type="text"
                        name="city"
                        id="city"
                        placeholder="City"
                        value={data.city}
                        className="w-full px-3 py-3 border border-gray-300 rounded-md shadow peer shadow-gray-100 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                        autoComplete="off"
                        onChange={handleOnChange}
                    />
                    <label
                        htmlFor="city"
                        className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none font-popp peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                    >
                        City
                    </label>

                    {errors.city && (
                        <InputError message={errors.city} className="mt-5" />
                    )}
                </div>

                <div className="relative mt-5 md:col-span-2">
                    <input
                        type="text"
                        name="area"
                        id="area"
                        placeholder="Area"
                        value={data.area}
                        className="w-full px-3 py-3 border border-gray-300 rounded-md shadow peer shadow-gray-100 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                        autoComplete="off"
                        onChange={handleOnChange}
                    />
                    <label
                        htmlFor="area"
                        className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none font-popp peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                    >
                        Area
                    </label>

                    {errors.area && (
                        <InputError message={errors.area} className="mt-5" />
                    )}
                </div>

                <div className="relative mt-5 md:col-span-1">
                    <input
                        type="text"
                        name="post_code"
                        id="post_code"
                        placeholder="Post Code"
                        value={data.post_code}
                        className="w-full px-3 py-3 border border-gray-300 rounded-md shadow peer shadow-gray-100 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                        autoComplete="off"
                        onChange={handleOnChange}
                    />
                    <label
                        htmlFor="post_code"
                        className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none font-popp peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                    >
                        TK
                    </label>
                    {errors.post_code && (
                        <InputError
                            message={errors.post_code}
                            className="mt-5"
                        />
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4 text-sm gap-y-2 md:grid-cols-6 mt-7">
                <div className="relative md:col-span-2">
                    <select
                        name="minutes"
                        value={data.minutes}
                        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        onChange={handleOnChange}
                    >
                        <option value="">--</option>
                        {minutes.map(({ id, name }) => (
                            <option key={id} value={id}>
                                {name}
                            </option>
                        ))}
                    </select>
                    <label
                        htmlFor="minutes"
                        className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none font-popp peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                    >
                        Minutes
                    </label>
                    {errors.minutes && (
                        <InputError message={errors.minutes} className="mt-2" />
                    )}
                </div>

                <div className="relative md:col-span-2">
                    <select
                        name="mode"
                        value={data.mode}
                        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        onChange={handleOnChange}
                    >
                        <option value="">--</option>
                        {mode.map(({ id, name }) => (
                            <option key={id} value={id}>
                                {name}
                            </option>
                        ))}
                    </select>
                    <label
                        htmlFor="mode"
                        className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none font-popp peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                    >
                        Mode
                    </label>
                    {errors.mode && (
                        <InputError message={errors.mode} className="mt-2" />
                    )}
                </div>

                <div className="relative md:col-span-2">
                    <select
                        name="station"
                        value={data.station}
                        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        onChange={handleOnChange}
                    >
                        <option value="">--</option>
                        {stations.map(({ id, name }) => (
                            <option key={id} value={id}>
                                {name}
                            </option>
                        ))}
                    </select>
                    <label
                        htmlFor="station"
                        className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none font-popp peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                    >
                        Station
                    </label>
                    {errors.station && (
                        <InputError message={errors.station} className="mt-2" />
                    )}
                </div>
            </div>
        </>
    );
};

export default StepTwo;
