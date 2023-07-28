import React, { useState } from "react";
import { ImOffice, ImArrowRight2, ImArrowLeft2 } from "react-icons/im";
import { router } from "@inertiajs/react";
import { BsCheck } from "react-icons/bs";
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
        if (size !== "") {
            href += "filter[room_size]=" + size + "&";
        }
        if (selectedHobbies.length) {
            href += "&filter[hobbies]=" + selectedHobbies + "&";
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
    return (
        <div className="">
            <button
                onClick={handleFlatmateFilterSubmit}
                className="relative inline-flex px-4 py-2 mt-4 overflow-hidden text-base font-medium text-white transition duration-300 ease-out bg-black rounded-lg group hover:scale-105 hover:shadow-orange-600 active:translate-y-1"
            >
                <span className="absolute inset-0 transition duration-300 ease-out opacity-0 bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 group-hover:opacity-100 group-active:opacity-90"></span>
                <span className="relative group-hover:text-white">Search</span>
            </button>
            {step === 1 && (
                <>
                    <div className="grid grid-cols-1 gap-6 px-8 mt-7 xs:grid-cols-4">
                        <div className="relative w-full h-10 xs:col-span-2">
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
                        <div className="relative w-full h-10 xs:col-span-2">
                            <InputLabel
                                htmlFor="title"
                                value="Title of advertisement"
                            />
                            <TextInput
                                type="text"
                                autoComplete="off"
                                name="title"
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full px-3 py-3 bg-transparent border border-gray-300 rounded-md shadow peer shadow-gray-100 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                                placeholder=" "
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-6 px-8 mt-12 mb-[4rem] xxs:grid-cols-4">
                        <div className="relative w-full h-10 xxs:col-span-2">
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
                        <div className="relative w-full h-10 xxs:col-span-2">
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
                    <div className="mt-[2rem]">
                        <p className="text-sm font-semibold font-popp">
                            Hobbies
                        </p>

                        <div className="grid grid-cols-2 mt-3">
                            {hobbies.map((hobby) => (
                                <div
                                    key={hobby.id}
                                    className="flex justify-between mb-2"
                                >
                                    <span className="mt-1 ml-2 text-sm font-popp">
                                        {hobby.name}
                                    </span>
                                    <label className="relative cursor-pointer">
                                        <input
                                            id="checkbox-1"
                                            type="checkbox"
                                            onChange={() =>
                                                handleHobbyChange(hobby.id)
                                            }
                                            checked={selectedHobbies.includes(
                                                hobby.id
                                            )}
                                            className="appearance-none h-6 w-6 border-2 rounded-[7px] border-[#f3f2f2]"
                                        />
                                        <BsCheck className="absolute w-8 h-8 text-white text-opacity-0 transition ease-out text-8xl -left-1 -top-1 check-1 after:bg-black" />
                                    </label>
                                </div>
                            ))}
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
                    <div className="grid grid-cols-1 gap-4 mt-[3rem] px-8 text-sm gap-y-2 md:grid-cols-4">
                        <div className="relative md:col-span-2">
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

                        <div className="relative md:col-span-2">
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
                    <div className="grid grid-cols-1 gap-4 mt-[1.5rem] px-8 text-sm gap-y-2 md:grid-cols-6">
                        <div className="relative md:col-span-2">
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

                        <div className="relative md:col-span-2">
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

                        <div className="relative md:col-span-2">
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
