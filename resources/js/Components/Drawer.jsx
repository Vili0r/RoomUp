import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { IoCloseOutline } from "react-icons/io5";
import axios from "axios";
import LoadingSkeleton from "./LoadingSkeleton";
import PlacesCard from "./PlacesCard";
import { useTranslation } from "react-i18next";

const Drawer = ({ isOpen, setIsOpen, latitude, longitude }) => {
    const [type, setType] = useState("restaurants");
    const [rating, setRating] = useState("");
    const [filteredPlaces, setFilteredPlaces] = useState([]);
    const { t } = useTranslation();
    const fetchRestaurants = async () => {
        const options = {
            method: "GET",
            url: `https://travel-advisor.p.rapidapi.com/${type}/list-by-latlng`,
            params: {
                latitude: latitude,
                longitude: longitude,
            },
            headers: {
                "X-RapidAPI-Key":
                    "a93562e483msh5e7685936415f1fp19061djsn5302c733213f",
                "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
            },
        };

        const {
            data: { data },
        } = await axios.request(options);
        return data;
    };

    const { data, isLoading } = useQuery({
        queryKey: [`${latitude}${longitude}${type}restaurants`],
        queryFn: () => fetchRestaurants(),
        enabled: isOpen,
    });

    useEffect(() => {
        const filteredPlaces = data?.filter((place) => place.rating > rating);

        setFilteredPlaces(filteredPlaces);
    }, [rating]);

    const PlacesData = () => {
        return isOpen && (isLoading ? <LoadingSkeleton /> : <Card />);
    };

    const Card = () => {
        return (
            <PlacesCard
                places={filteredPlaces?.length ? filteredPlaces : data}
            />
        );
    };

    const {
        title,
        chooseRating,
        chooseType,
        drawerRestaurants,
        drawerAttractions,
        drawerAll,
        draweAboveThree,
        draweAboveFour,
        draweAboveFourPointFive,
    } = t("propertyDetails.drawer");

    return (
        <main
            className={
                " fixed overflow-hidden z-10 bg-gray-900 bg-opacity-75 bg-blur inset-0 transform ease-in-out " +
                (isOpen
                    ? " transition-opacity opacity-100 duration-500 translate-x-0  "
                    : " transition-all delay-500 opacity-0 translate-x-full  ")
            }
        >
            <section
                className={
                    " w-screen max-w-lg right-0 absolute bg-white h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform  " +
                    (isOpen ? " translate-x-0 " : " translate-x-full ")
                }
            >
                <article className="relative flex flex-col w-screen h-full max-w-lg pb-10 space-y-6  mt-[5rem]">
                    <header className="p-4 text-lg font-bold ">
                        <div className="flex justify-between">
                            <h1 className="text-xl font-bold text-gray-700 ">
                                {title}
                            </h1>

                            <button
                                onClick={() => {
                                    setIsOpen(false);
                                }}
                                className=" sm:hidden"
                            >
                                <IoCloseOutline className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="flex justify-between gap-4 mt-6">
                            <label
                                htmlFor="underline_select"
                                className="sr-only"
                            >
                                Underline select
                            </label>
                            <select
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                                className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                            >
                                <option value="">{chooseType}</option>
                                <option value="restaurants">
                                    {drawerRestaurants}
                                </option>
                                <option value="attractions">
                                    {drawerAttractions}
                                </option>
                            </select>
                            <label
                                htmlFor="underline_select"
                                className="sr-only"
                            >
                                Underline select
                            </label>
                            <select
                                value={rating}
                                onChange={(e) => setRating(e.target.value)}
                                className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                            >
                                <option value="">{chooseRating}</option>
                                <option value={0}>{drawerAll}</option>
                                <option value={3}>{draweAboveThree}</option>
                                <option value={4}>{draweAboveFour}</option>
                                <option value={4.5}>
                                    {draweAboveFourPointFive}
                                </option>
                            </select>
                        </div>
                    </header>
                    <PlacesData />
                </article>
            </section>
            <section
                className="w-screen h-full cursor-pointer "
                onClick={() => {
                    setIsOpen(false);
                }}
            ></section>
        </main>
    );
};

export default Drawer;
