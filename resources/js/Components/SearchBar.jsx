import React, { useState } from "react";
import { router } from "@inertiajs/react";
import { AiOutlineSearch } from "react-icons/ai";
import { useTranslation } from "react-i18next";

const SearchBar = () => {
    const [type, setType] = useState("rent");
    const [search, setSearch] = useState("");
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(0);

    const { t } = useTranslation();
    const { content, rent, flatmate, minimumPrice, maximumPrice } =
        t("hero.searchBar");

    const switchType = (val) => {
        setType(val);
    };

    const handleHomeSearch = () => {
        console.log(type, minPrice, maxPrice);
        let href = "/home-search?";

        if (type === "rent") {
            if (minPrice !== 0 && minPrice !== "") {
                href += "filter[min_price]=" + minPrice + "&";
            }
            if (maxPrice !== 10000000 && maxPrice !== "" && maxPrice !== 0) {
                href += "filter[max_price]=" + maxPrice;
            }
            console.log(href);

            router.visit(
                href,
                {
                    data: {
                        search_type: "rent",
                        search,
                    },
                },
                { preserveScroll: true }
            );
        } else if (type === "flatmate") {
            if (minPrice !== 0 && minPrice !== "") {
                href += "filter[min_budget]=" + minPrice + "&";
            }
            if (maxPrice !== 10000000 && maxPrice !== "" && maxPrice !== 0) {
                href += "filter[max_budget]=" + maxPrice;
            }
            console.log(href);

            router.visit(
                href,
                {
                    data: { search_type: "flatmate", search },
                },
                { preserveScroll: true }
            );
        }
    };

    return (
        <div className="">
            <div className="">
                <button
                    onClick={() => switchType("rent")}
                    className={`${
                        type === "rent"
                            ? "bg-black text-white"
                            : "bg-white text-black"
                    }  sm:py-4 sm:px-9 px-7 py-3 border border-gray-400 cursor-pointer rounded-tl-[5px]`}
                    style={{ borderRight: "none", borderBottom: "none" }}
                >
                    {rent}
                </button>
                <button
                    onClick={() => switchType("flatmate")}
                    className={`${
                        type === "flatmate"
                            ? "bg-black text-white"
                            : "bg-white text-black"
                    }  sm:py-4 sm:px-9 px-7 py-3  border border-gray-400 cursor-pointer rounded-tr-[5px]`}
                    style={{ borderLeft: "none", borderBottom: "none" }}
                >
                    {flatmate}
                </button>
            </div>
            <div className="border border-gray-400 grid sm:flex sm:justify-between h-[64px] gap-[5px] bg-white">
                <input
                    type="text"
                    placeholder={content}
                    className="focus:ring-gray-100/10  lg:w-[200px] lg:px-[10px] md:w-[180px] w-auto px-[5px] [@media(max-width:639px)]:p-[20px]"
                    style={{ border: "none", outline: "none" }}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <input
                    type="number"
                    className="focus:ring-gray-100/10 lg:w-[200px] lg:px-[10px] md:w-[140px] w-auto px-[5px] [@media(max-width:639px)]:p-[18px]"
                    style={{ border: "none" }}
                    min={0}
                    max={10000000}
                    placeholder={minimumPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                />
                <input
                    type="number"
                    className="focus:ring-gray-100/10 lg:w-[200px] lg:px-[10px] md:w-[140px] w-auto px-[5px] [@media(max-width:639px)]:p-[18px]"
                    style={{ border: "none" }}
                    min={0}
                    max={10000000}
                    placeholder={maximumPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                />
                <button
                    onClick={handleHomeSearch}
                    className="cursor-pointer bg-[#F1C40F] flex items-center justify-center sm:w-[50px] w-auto [@media(max-width:639px)]:p-[10px]"
                    style={{ border: "none" }}
                >
                    <AiOutlineSearch className="w-6 h-6 text-black " />
                </button>
            </div>
        </div>
    );
};

export default SearchBar;
