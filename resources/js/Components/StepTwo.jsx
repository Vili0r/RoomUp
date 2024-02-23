import React from "react";
import InputError from "./InputError";
import { useTranslation } from "react-i18next";
import { modes, minutes, stations } from "@/arrays/Array";

const StepTwo = ({ data, errors, handleOnChange }) => {
    const { t, i18n } = useTranslation();
    const {
        address1StepTwo,
        address2StepTwo,
        cityStepTwo,
        areaStepTwo,
        postCodeStepTwo,
        minutesStepTwo,
        modeStepTwo,
        stationStepTwo,
    } = t("shared.forms.stepTwo");
    return (
        <>
            <div className="grid grid-cols-1 gap-4 text-sm gap-y-2 md:grid-cols-5 mt-7">
                <div className="relative md:col-span-3">
                    <input
                        type="text"
                        id="address_1"
                        placeholder={address1StepTwo}
                        value={data.address_1}
                        className="w-full px-3 py-3 border border-gray-300 rounded-md shadow peer shadow-gray-100 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                        autoComplete="off"
                        disabled={true}
                    />
                    <label
                        htmlFor="address_1"
                        className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                    >
                        {address1StepTwo}
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
                        placeholder={address2StepTwo}
                        value={data.address_2}
                        className="w-full px-3 py-3 border border-gray-300 rounded-md shadow peer shadow-gray-100 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                        autoComplete="off"
                        disabled={true}
                    />
                    <label
                        htmlFor="address_2"
                        className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                    >
                        {address2StepTwo}
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
                        placeholder={cityStepTwo}
                        value={data.city}
                        className="w-full px-3 py-3 border border-gray-300 rounded-md shadow peer shadow-gray-100 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                        autoComplete="off"
                        disabled={true}
                    />
                    <label
                        htmlFor="city"
                        className={`${i18n.language == "en" ? "" : "-my-4"} ${
                            !errors.city ? "my-0" : ""
                        } absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800`}
                    >
                        {cityStepTwo}
                    </label>

                    {errors.city && (
                        <InputError message={errors.city} className="mt-3" />
                    )}
                </div>

                <div className="relative mt-5 md:col-span-2">
                    <input
                        type="text"
                        name="area"
                        id="area"
                        placeholder={areaStepTwo}
                        value={data.area}
                        className="w-full px-3 py-3 border border-gray-300 rounded-md shadow peer shadow-gray-100 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                        autoComplete="off"
                        disabled={true}
                    />
                    <label
                        htmlFor="area"
                        className={`${i18n.language == "en" ? "" : "-my-4"} ${
                            !errors.city ? "my-0" : ""
                        } absolute top-0 left-0 px-1 ml-3  text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800`}
                    >
                        {areaStepTwo}
                    </label>

                    {errors.area && (
                        <InputError message={errors.area} className="mt-3" />
                    )}
                </div>

                <div className="relative mt-5 md:col-span-1">
                    <input
                        type="text"
                        name="post_code"
                        id="post_code"
                        placeholder={postCodeStepTwo}
                        value={data.post_code}
                        className="w-full px-3 py-3 border border-gray-300 rounded-md shadow peer shadow-gray-100 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                        autoComplete="off"
                        disabled={true}
                    />
                    <label
                        htmlFor="post_code"
                        className={`${i18n.language == "en" ? "" : "-my-4"} ${
                            !errors.city ? "my-0" : ""
                        } absolute top-0 left-0 px-1 ml-3  text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800`}
                    >
                        {postCodeStepTwo}
                    </label>
                    {errors.post_code && (
                        <InputError
                            message={errors.post_code}
                            className="mt-2"
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
                        {minutes.map(({ id, nameEn, nameGr }) => (
                            <option key={id} value={id}>
                                {i18n.language === "en" ? nameEn : nameGr}
                            </option>
                        ))}
                    </select>
                    <label
                        htmlFor="minutes"
                        className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                    >
                        {minutesStepTwo}
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
                        {modes.map(({ id, nameEn, nameGr }) => (
                            <option key={id} value={id}>
                                {i18n.language === "en" ? nameEn : nameGr}
                            </option>
                        ))}
                    </select>
                    <label
                        htmlFor="mode"
                        className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                    >
                        {modeStepTwo}
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
                        {stations.map(({ id, nameEn, nameGr }) => (
                            <option key={id} value={id}>
                                {i18n.language === "en" ? nameEn : nameGr}
                            </option>
                        ))}
                    </select>
                    <label
                        htmlFor="station"
                        className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                    >
                        {stationStepTwo}
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
