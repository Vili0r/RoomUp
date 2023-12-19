import React, { useState } from "react";
import { ImArrowRight2, ImArrowLeft2 } from "react-icons/im";
import { router, usePage } from "@inertiajs/react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import TextInput from "./TextInput";
import PrimaryButton from "./PrimaryButton";
import {
    roomSize,
    hobbies,
    flatmateGender,
    flatmateOccupation,
    flatmateSmoker,
    flatmatePets,
} from "@/arrays/Array";
import { BsCheck } from "react-icons/bs";

const RoommateSearchModal = ({ step, handleBack, handleNext }) => {
    const { selectedRoommateQueries } = usePage().props;
    const hobbiesArray = (selectedRoommateQueries?.filter.hobbies ?? "")
        .split(",")
        .map(Number);
    const selectedHobbiesOptions = hobbies
        .filter((hobby) => hobbiesArray?.includes(hobby.id))
        .map((item) => ({
            label: item.name,
            value: item.id,
        }));
    const animatedComponents = makeAnimated();
    const [selectedHobbies, setSelectedHobbies] = useState(
        selectedHobbiesOptions ?? []
    );
    const [city, setCity] = useState(
        selectedRoommateQueries?.filter?.city ?? ""
    );
    const [area, setArea] = useState(
        selectedRoommateQueries?.filter?.area ?? ""
    );
    const [pets, setPets] = useState(
        selectedRoommateQueries?.filter?.pets ?? ""
    );
    const [gender, setGender] = useState(
        selectedRoommateQueries?.filter?.gender ?? ""
    );
    const [occupation, setOccupation] = useState(
        selectedRoommateQueries?.filter?.occupation ?? ""
    );
    const [smoker, setSmoker] = useState(
        selectedRoommateQueries?.filter?.smoker ?? ""
    );
    const [size, setSize] = useState(
        selectedRoommateQueries?.filter?.room_size ?? ""
    );
    const [min, setMin] = useState(
        selectedRoommateQueries?.filter?.min_budget ?? 0
    );
    const [max, setMax] = useState(
        selectedRoommateQueries?.filter?.max_budget ?? 10000
    );
    const [minAge, setMinAge] = useState(
        selectedRoommateQueries?.filter?.min_age ?? ""
    );
    const [maxAge, setMaxAge] = useState(
        selectedRoommateQueries?.filter?.max_age ?? ""
    );
    const [shortTerm, setShortTerm] = useState(
        selectedRoommateQueries?.filter?.short_term
            ? JSON.parse(selectedRoommateQueries?.filter?.short_term)
            : false
    );

    const handleMinChange = (value) => {
        setMin(value);
    };

    const handleMaxChange = (value) => {
        setMax(value);
    };

    const handleOnChange = (event) => {
        setShortTerm(event.target.checked);
    };

    const handleFlatmateFilterSubmit = () => {
        let href = "/flatmate-search?";

        if (area !== "") {
            href += "filter[area]=" + area + "&";
        }
        if (city !== "") {
            href += "filter[city]=" + city + "&";
        }
        if (min !== 0 && min !== "") {
            href += "filter[min_budget]=" + min + "&";
        }
        if (max !== 10000 && max !== "") {
            href += "filter[max_budget]=" + max + "&";
        }
        if (minAge !== "") {
            href += "filter[min_age]=" + minAge + "&";
        }
        if (maxAge !== "") {
            href += "filter[max_age]=" + maxAge + "&";
        }
        if (size !== "") {
            href += "filter[room_size]=" + size + "&";
        }
        if (selectedHobbies.length) {
            let hobbies = selectedHobbies.map((item) => item.value);
            href += "filter[hobbies]=" + hobbies + "&";
        }
        if (pets !== "") {
            href += "filter[pets]=" + pets + "&";
        }
        if (gender !== "") {
            href += "filter[gender]=" + gender + "&";
        }
        if (occupation !== "") {
            href += "filter[occupation]=" + occupation + "&";
        }
        if (smoker !== "") {
            href += "filter[smoker]=" + smoker + "&";
        }
        href += "filter[short_term]=" + shortTerm;

        router.visit(href, {}, { preserveScroll: true });
    };

    const hobbiesOptions = hobbies.map((item) => {
        return {
            label: item.name,
            value: item.id,
        };
    });

    return (
        <div className="">
            <button
                onClick={handleFlatmateFilterSubmit}
                className={`relative inline-flex px-4 py-2 mt-4 overflow-hidden text-base font-medium text-white transition duration-300 ease-out bg-black rounded-lg group hover:scale-105 hover:shadow-orange-600 active:translate-y-1 ${
                    step === 2 ? "[@media(max-width:350px)]:ml-8" : ""
                }`}
            >
                <span className="absolute inset-0 transition duration-300 ease-out opacity-0 bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 group-hover:opacity-100 group-active:opacity-90"></span>
                <span className="relative group-hover:text-white">Search</span>
            </button>
            {step === 1 && (
                <>
                    <div className="relative w-full h-10 mb-[5rem] ml-8">
                        <p className="flex items-center justify-center mb-8 text-sm font-semibold font-popp lg:pl-2 xl:pl-0">
                            Budget
                        </p>
                        <MultiRangeSlider
                            rangeMin={0}
                            rangeMax={10000}
                            initialMin={min}
                            initialMax={max}
                            onMinChange={handleMinChange}
                            onMaxChange={handleMaxChange}
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-6 px-4 mt-12 xxs:grid-cols-4">
                        <div className="relative xxs:col-span-2">
                            <p className="text-sm font-semibold font-popp lg:pl-2 xl:pl-0">
                                City
                            </p>

                            <TextInput
                                type="text"
                                autoComplete="off"
                                name="title"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                className="w-full px-3 py-3 bg-transparent border border-gray-300 rounded-md shadow peer shadow-gray-100 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                                placeholder=" "
                            />
                        </div>
                        <div className="relative xxs:col-span-2">
                            <p className="text-sm font-semibold font-popp lg:pl-2 xl:pl-0">
                                Area
                            </p>

                            <TextInput
                                type="text"
                                autoComplete="off"
                                name="title"
                                value={area}
                                onChange={(e) => setArea(e.target.value)}
                                className="w-full px-3 py-3 bg-transparent border border-gray-300 rounded-md shadow peer shadow-gray-100 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                                placeholder=" "
                            />
                        </div>
                    </div>

                    <div className="flex justify-end mt-6">
                        <PrimaryButton
                            onClick={handleNext}
                            className="group relative inline-flex w-40 items-center justify-center overflow-hidden rounded-full bg-[#FFF337] px-8 py-3 font-medium text-white transition duration-300 ease-out md:w-auto"
                        >
                            <span className="ease absolute inset-0 flex h-full w-full -translate-x-full items-center justify-center bg-[#FFF337] text-black duration-300 group-hover:translate-x-0">
                                <ImArrowRight2 className="w-5 h-5" />
                            </span>
                            <span className="absolute flex items-center justify-center w-full h-full text-black transition-all duration-300 transform ease group-hover:translate-x-full">
                                Next
                            </span>
                            <span className="relative invisible">Next</span>
                        </PrimaryButton>
                    </div>
                </>
            )}

            {step === 2 && (
                <>
                    <div className="mt-7 mb-8 [@media(max-width:350px)]:ml-8 w-[16rem] xxs:w-[20rem] xs:w-96">
                        <p className="text-sm font-semibold font-popp lg:pl-2 xl:pl-0">
                            Hobbies
                        </p>
                        <Select
                            closeMenuOnSelect={false}
                            components={animatedComponents}
                            onChange={(opt) => setSelectedHobbies(opt)}
                            isMulti
                            maxValues={15}
                            options={hobbiesOptions}
                            value={selectedHobbies}
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-6 px-4 xxs:px-0 mt-7 xs:grid-cols-2">
                        <div className="relative h-10 w-full min-w-[200px]">
                            <p className="text-sm font-semibold font-popp lg:pl-2 xl:pl-0">
                                Minimum Age
                            </p>
                            <TextInput
                                type="number"
                                autoComplete="off"
                                name="minAge"
                                value={minAge}
                                onChange={(e) => setMinAge(e.target.value)}
                                className="w-full px-3 py-3 bg-transparent border border-gray-300 rounded-md shadow peer shadow-gray-100 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                                placeholder=" "
                            />
                        </div>

                        <div className="relative [@media(max-width:479px)]:mt-4">
                            <p className="text-sm font-semibold font-popp lg:pl-2 xl:pl-0">
                                Maximum Age
                            </p>
                            <TextInput
                                type="number"
                                autoComplete="off"
                                name="maxAge"
                                value={maxAge}
                                onChange={(e) => setMaxAge(e.target.value)}
                                className="w-full px-3 py-3 bg-transparent border border-gray-300 rounded-md shadow peer shadow-gray-100 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                                placeholder=" "
                            />
                        </div>
                    </div>

                    <div className="flex justify-center mt-6 space-x-2">
                        <PrimaryButton
                            onClick={handleBack}
                            className="group relative inline-flex w-40 items-center justify-center overflow-hidden rounded-full bg-[#FFF337] px-8 py-3 font-medium text-white transition duration-300 ease-out md:w-auto"
                        >
                            <span className="ease absolute inset-0 flex h-full w-full -translate-x-full items-center justify-center bg-[#FFF337] text-black duration-300 group-hover:translate-x-0">
                                <ImArrowLeft2 className="w-5 h-5" />
                            </span>
                            <span className="absolute flex items-center justify-center w-full h-full text-black transition-all duration-300 transform ease group-hover:translate-x-full">
                                Previous
                            </span>
                            <span className="relative invisible">Previous</span>
                        </PrimaryButton>
                        <PrimaryButton
                            onClick={handleNext}
                            className="group relative inline-flex w-40 items-center justify-center overflow-hidden rounded-full bg-[#FFF337] px-8 py-3 font-medium text-white transition duration-300 ease-out md:w-auto"
                        >
                            <span className="ease absolute inset-0 flex h-full w-full -translate-x-full items-center justify-center bg-[#FFF337] text-black duration-300 group-hover:translate-x-0">
                                <ImArrowRight2 className="w-5 h-5" />
                            </span>
                            <span className="absolute flex items-center justify-center w-full h-full text-black transition-all duration-300 transform ease group-hover:translate-x-full">
                                Next
                            </span>
                            <span className="relative invisible">Next</span>
                        </PrimaryButton>
                    </div>
                </>
            )}

            {step === 3 && (
                <>
                    <div className="grid grid-cols-1 gap-4 m-4 text-sm xxs:grid-cols-2 gap-y-2 sm:grid-cols-6 mt-7">
                        <div className="relative sm:col-span-2">
                            <p className="text-sm font-semibold font-popp lg:pl-2 xl:pl-0">
                                Room Size
                            </p>
                            <select
                                name="size"
                                value={size}
                                className="block w-full mt-1 bg-transparent border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                onChange={(e) => setSize(e.target.value)}
                            >
                                <option value="">--</option>
                                {roomSize.map(({ id, name }) => (
                                    <option key={id} value={id}>
                                        {name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="relative sm:col-span-2">
                            <div className="flex justify-start gap-2 my-3 sm:my-7">
                                <span className="mt-1 text-sm font-popp"></span>
                                <p className="text-sm font-semibold font-popp lg:pl-2 xl:pl-0">
                                    Short Term
                                </p>
                                <label className="relative cursor-pointer">
                                    <input
                                        id="checkbox-1"
                                        type="checkbox"
                                        name="short_term"
                                        value={shortTerm}
                                        checked={shortTerm}
                                        onChange={handleOnChange}
                                        className="appearance-none h-6 w-6 focus:ring-0 bg-transparent border-2 rounded-[7px] border-[#9a9898]"
                                    />
                                    <BsCheck className="absolute w-8 h-8 text-white text-opacity-0 transition ease-out text-8xl -left-1 -top-1 check-1 after:bg-black" />
                                </label>
                            </div>
                        </div>

                        <div className="relative sm:col-span-2">
                            <p className="text-sm font-semibold font-popp lg:pl-2 xl:pl-0">
                                Smoker
                            </p>
                            <select
                                name="smoker"
                                value={smoker}
                                className="block w-full mt-1 bg-transparent border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                onChange={(e) => setSmoker(e.target.value)}
                            >
                                <option value="">--</option>
                                {flatmateSmoker.map(({ id, name }) => (
                                    <option key={id} value={id}>
                                        {name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4 m-4 text-sm xxs:grid-cols-2 gap-y-2 sm:grid-cols-6 mt-7">
                        <div className="relative sm:col-span-2">
                            <p className="text-sm font-semibold font-popp lg:pl-2 xl:pl-0">
                                Pets
                            </p>
                            <select
                                name="pets"
                                value={pets}
                                className="block w-full mt-1 bg-transparent border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                onChange={(e) => setPets(e.target.value)}
                            >
                                <option value="">--</option>
                                {flatmatePets.map(({ id, name }) => (
                                    <option key={id} value={id}>
                                        {name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="relative sm:col-span-2">
                            <p className="text-sm font-semibold font-popp lg:pl-2 xl:pl-0">
                                Flatmate Occupation
                            </p>

                            <select
                                name="occupation"
                                value={occupation}
                                className="block w-full mt-1 bg-transparent border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                onChange={(e) => setOccupation(e.target.value)}
                            >
                                <option value="">--</option>
                                {flatmateOccupation.map(({ id, name }) => (
                                    <option key={id} value={id}>
                                        {name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="relative sm:col-span-2">
                            <p className="text-sm font-semibold font-popp lg:pl-2 xl:pl-0">
                                Flatmate Gender
                            </p>
                            <select
                                name="gender"
                                value={gender}
                                className="block w-full mt-1 bg-transparent border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                onChange={(e) => setGender(e.target.value)}
                            >
                                <option value="">--</option>
                                {flatmateGender.map(({ id, name }) => (
                                    <option key={id} value={id}>
                                        {name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="flex justify-start px-8 mt-8 space-x-2">
                        <PrimaryButton
                            onClick={handleBack}
                            className="group relative inline-flex w-40 items-center justify-center overflow-hidden rounded-full bg-[#FFF337] px-8 py-3 font-medium text-white transition duration-300 ease-out md:w-auto"
                        >
                            <span className="ease absolute inset-0 flex h-full w-full -translate-x-full items-center justify-center bg-[#FFF337] text-black duration-300 group-hover:translate-x-0">
                                <ImArrowLeft2 className="w-5 h-5" />
                            </span>
                            <span className="absolute flex items-center justify-center w-full h-full text-black transition-all duration-300 transform ease group-hover:translate-x-full">
                                Previous
                            </span>
                            <span className="relative invisible">Previous</span>
                        </PrimaryButton>
                    </div>
                </>
            )}
        </div>
    );
};

export default RoommateSearchModal;
