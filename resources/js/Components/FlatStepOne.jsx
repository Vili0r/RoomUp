import React from "react";
import { InputError } from "@/Components";

const StepOne = ({
    data,
    errors,
    handleOnChange,
    size,
    type,
    whatIAmFlat,
    furnishings,
}) => {
    return (
        <>
            <div className="grid grid-cols-1 gap-6 mt-7 sm:grid-cols-2">
                <div>
                    <div className="relative">
                        <select
                            name="size"
                            value={data.size}
                            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            onChange={handleOnChange}
                        >
                            <option value="">Size</option>
                            {size.map(({ id, name }) => (
                                <option key={id} value={id}>
                                    {name}
                                </option>
                            ))}
                        </select>
                        <label
                            htmlFor="size"
                            className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none font-popp peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                        >
                            Size
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
                            <option value="">Type</option>
                            {type.map(({ id, name }) => (
                                <option key={id} value={id}>
                                    {name}
                                </option>
                            ))}
                        </select>
                        <label
                            htmlFor="type"
                            className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none font-popp peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                        >
                            Type
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
                        name="what_i_am"
                        value={data.what_i_am}
                        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        onChange={handleOnChange}
                    >
                        <option value="">What i am</option>
                        {whatIAmFlat.map(({ id, name }) => (
                            <option key={id} value={id}>
                                {name}
                            </option>
                        ))}
                    </select>
                    <label
                        htmlFor="what_i_am"
                        className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none font-popp peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                    >
                        What I Am
                    </label>
                </div>
                {errors.what_i_am && (
                    <InputError message={errors.what_i_am} className="mt-2" />
                )}
            </div>

            <div className="grid grid-cols-1 gap-6 mt-7 sm:grid-cols-2">
                <div className="relative">
                    <input
                        type="text"
                        name="cost"
                        id="cost"
                        placeholder="Room cost Per Month"
                        value={data.cost}
                        className="w-full px-3 py-3 border border-gray-300 rounded-md shadow peer shadow-gray-100 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                        autoComplete="off"
                        onChange={handleOnChange}
                    />
                    <label
                        htmlFor="cost"
                        className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none font-popp peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                    >
                        Cost Per Month
                    </label>

                    {errors.cost && (
                        <InputError message={errors.cost} className="mt-2" />
                    )}
                </div>
                <div className="relative">
                    <input
                        type="text"
                        name="deposit"
                        id="deposit"
                        placeholder="Room Deposit"
                        value={data.deposit}
                        className="w-full px-3 py-3 border border-gray-300 rounded-md shadow peer shadow-gray-100 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                        autoComplete="off"
                        onChange={handleOnChange}
                    />
                    <label
                        htmlFor="deposit"
                        className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none font-popp peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                    >
                        Deposit
                    </label>
                    {errors.deposit && (
                        <InputError message={errors.deposit} className="mt-2" />
                    )}
                </div>
            </div>

            <div className="relative mt-6">
                <select
                    name="furnished"
                    value={data.furnished}
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
                    htmlFor="furnished"
                    className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none font-popp peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                >
                    Furnished
                </label>

                {errors.furnished && (
                    <InputError message={errors.furnished} className="mt-2" />
                )}
            </div>
        </>
    );
};

export default StepOne;
