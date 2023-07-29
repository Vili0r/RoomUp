import React, { useState } from "react";
import { ImOffice, ImArrowRight2, ImArrowLeft2 } from "react-icons/im";
import { router } from "@inertiajs/react";
import { BsCheck } from "react-icons/bs";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import {
    MultiRangeSlider,
    PrimaryButton,
    SecondaryButton,
    InputLabel,
    TextInput,
} from "@/Components";
import { DebounceInput } from "react-debounce-input";

const roomSize = [
    { id: 1, name: "Single" },
    { id: 2, name: "Double" },
];

const hobbies = [
    { id: 1, name: "Reading" },
    { id: 2, name: "Writing" },
    { id: 3, name: "Painting" },
    { id: 4, name: "Drawing" },
    { id: 5, name: "Photography" },
    { id: 6, name: "Gardening" },
    { id: 7, name: "Cooking/Baking" },
    { id: 8, name: "Playing a musical instrument" },
    { id: 9, name: "Singing" },
    { id: 10, name: "Dancing" },
    { id: 11, name: "Knitting/Crocheting" },
    { id: 12, name: "Sewing" },
    { id: 13, name: "Woodworking" },
    { id: 14, name: "Sculpting" },
    { id: 15, name: "Pottery/Ceramics" },
    { id: 16, name: "Hiking/Outdoor activities" },
    { id: 17, name: "Cycling" },
    { id: 18, name: "Running/Jogging" },
    { id: 19, name: "Swimming" },
    { id: 20, name: "Yoga" },
    { id: 21, name: "Meditation" },
    { id: 22, name: "Gaming" },
    { id: 23, name: "Collecting" },
    { id: 24, name: "Model building" },
    { id: 25, name: "Sports" },
    { id: 26, name: "Football" },
    { id: 27, name: "Fishing" },
    { id: 28, name: "Camping" },
    { id: 29, name: "Traveling" },
    { id: 30, name: "Volunteering" },
    { id: 31, name: "Learning a new language" },
    { id: 32, name: "Film/TV series watching" },
    { id: 33, name: "Playing chess" },
    { id: 34, name: "DIY projects" },
    { id: 35, name: "Wine tasting" },
    { id: 36, name: "Home brewing" },
    { id: 37, name: "Theatre" },
    { id: 38, name: "Calligraphy" },
    { id: 39, name: "Astronomy/Stargazing" },
    { id: 40, name: "Chess" },
    { id: 41, name: "Martial arts" },
    { id: 42, name: "Cars" },
];

const RoommateSearchModal = ({
    step,
    handleBack,
    handleNext,
    flatmateGender,
    flatmateOccupation,
    flatmatePets,
    flatmateSmoker,
}) => {
    const animatedComponents = makeAnimated();
    const [selectedHobbies, setSelectedHobbies] = useState([]);
    const [title, setTitle] = useState("");
    const [city, setCity] = useState("");
    const [area, setArea] = useState("");
    const [pets, setPets] = useState("");
    const [gender, setGender] = useState("");
    const [occupation, setOccupation] = useState("");
    const [smoker, setSmoker] = useState("");
    const [size, setSize] = useState("");
    const [min, setMin] = useState(0);
    const [max, setMax] = useState(10000);
    const [minAge, setMinAge] = useState("");
    const [maxAge, setMaxAge] = useState("");

    const handleMinChange = (value) => {
        setMin(value);
    };

    const handleMaxChange = (value) => {
        setMax(value);
    };

    const handleHobbyChange = (id) => {
        setSelectedHobbies((prev) => {
            // Check if the ID already exists in the array
            const exists = prev.includes(id);

            // If the ID exists, remove it from the array, otherwise add it
            if (exists) {
                return prev.filter((amenityId) => amenityId !== id);
            } else {
                return [...prev, id];
            }
        });
    };

    const handleFlatmateFilterSubmit = () => {
        let href = "/flatmate-search?";

        if (title !== "") {
            href += "filter[title]=" + title + "&";
        }
        if (area !== "") {
            href += "filter[area]=" + area + "&";
        }
        if (city !== "") {
            href += "filter[city]=" + city + "&";
        }
        if (min !== 0 && min !== "") {
            href += "filter[min_price]=" + min + "&";
        }
        if (max !== 10000 && max !== "") {
            href += "filter[max_price]=" + max + "&";
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
            href += "&filter[hobbies]=" + hobbies + "&";
        }
        if (pets !== "") {
            href += "&filter[pets]=" + pets + "&";
        }
        if (gender !== "") {
            href += "&filter[gender]=" + gender + "&";
        }
        if (occupation !== "") {
            href += "&filter[occupation]=" + occupation + "&";
        }
        if (smoker !== "") {
            href += "&filter[smoker]=" + smoker + "&";
        }

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
                            <InputLabel
                                htmlFor="city"
                                value="City of advertisement"
                            />
                            <TextInput
                                type="text"
                                autoComplete="off"
                                name="title"
                                onChange={(e) => setCity(e.target.value)}
                                className="w-full px-3 py-3 bg-transparent border border-gray-300 rounded-md shadow peer shadow-gray-100 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                                placeholder=" "
                            />
                        </div>
                        <div className="relative xxs:col-span-2">
                            <InputLabel
                                htmlFor="area"
                                value="Area of advertisement"
                            />
                            <TextInput
                                type="text"
                                autoComplete="off"
                                name="title"
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
                    <div className="mt-3 mb-8 [@media(max-width:350px)]:ml-8 w-[16rem] xxs:w-[20rem] xs:w-96">
                        <InputLabel
                            htmlFor="hobbies"
                            value="Hobbies"
                            className="mb-3"
                        />
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

                    <div className="grid grid-cols-1 gap-6 px-4 mt-7 xs:grid-cols-2">
                        <div className="relative h-10 w-full min-w-[200px]">
                            <InputLabel htmlFor="minAge" value="Minimum age" />
                            <TextInput
                                type="number"
                                autoComplete="off"
                                name="minAge"
                                onChange={(e) => setMinAge(e.target.value)}
                                className="w-full px-3 py-3 bg-transparent border border-gray-300 rounded-md shadow peer shadow-gray-100 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                                placeholder=" "
                            />
                        </div>

                        <div className="relative [@media(max-width:479px)]:mt-4">
                            <InputLabel htmlFor="maxAge" value="Maximum age" />
                            <TextInput
                                type="number"
                                autoComplete="off"
                                name="maxAge"
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
                    <div className="grid grid-cols-1 gap-6 px-4 mt-7 xs:grid-cols-2">
                        <div className="relative h-10 w-full min-w-[200px]">
                            <InputLabel htmlFor="size" value="Room Size" />
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

                        <div className="relative [@media(max-width:479px)]:mt-4">
                            <InputLabel
                                htmlFor="smoker"
                                value="Flatmate Smoker"
                            />
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
                            <InputLabel htmlFor="pets" value="Pets" />
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
                            <InputLabel
                                htmlFor="occupation"
                                value="Flatmate Occupation"
                            />
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
                            <InputLabel
                                htmlFor="gender"
                                value="Flatmate Gender"
                            />
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
