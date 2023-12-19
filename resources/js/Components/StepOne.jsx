import React from "react";
import InputError from "./InputError";

const StepOne = ({
    data,
    errors,
    handleOnChange,
    availableRooms,
    size,
    type,
    currentOccupants,
    whatIAm,
}) => {
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
                        <option value="">What i have</option>
                        {availableRooms.map(({ id, name }) => (
                            <option key={id} value={id}>
                                {name}
                            </option>
                        ))}
                    </select>
                    <label
                        htmlFor="available_rooms"
                        className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none font-popp peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                    >
                        I have
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
                        name="current_occupants"
                        value={data.current_occupants}
                        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        onChange={handleOnChange}
                    >
                        <option value="">Current occupants</option>
                        {currentOccupants.map(({ id, name }) => (
                            <option key={id} value={id}>
                                {name}
                            </option>
                        ))}
                    </select>
                    <label
                        htmlFor="current_occupants"
                        className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none font-popp peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                    >
                        Current occupants
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
                        <option value="">What i am</option>
                        {whatIAm.map(({ id, name }) => (
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
        </>
    );
};

export default StepOne;
