import { RestaurantPlaceholder } from "@/assets";
import React from "react";
import { MdOutlinePinDrop } from "react-icons/md";
import { useTranslation } from "react-i18next";

const PlacesCard = ({ places }) => {
    const { t } = useTranslation();

    const { placesCardPrice, placesCardRanking } = t(
        "propertyDetails.placesCard"
    );

    return (
        <div className="overflow-y-scroll">
            {places.map((place, index) => (
                <div
                    key={index}
                    className="relative flex max-w-[26rem] mb-5 mx-auto flex-col overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700 shadow-md"
                >
                    <div className="relative m-0 overflow-hidden text-gray-700 bg-transparent rounded-none shadow-none bg-clip-border">
                        <img
                            src={
                                place.photo
                                    ? place.photo.images.large.url
                                    : RestaurantPlaceholder
                            }
                            className="w-full h-[350px] object-cover"
                            alt={place.name}
                        />
                    </div>
                    <div className="p-6">
                        <h4 className="block font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                            {place.name}
                        </h4>
                        <div className="flex justify-between">
                            <span>{placesCardPrice}</span>
                            <span>{place.price_level}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>{placesCardRanking}</span>
                            <span>{place.ranking}</span>
                        </div>
                        <div className="grid grid-cols-3 gap-[3px] mt-4">
                            {place?.cuisine?.map(({ name }) => (
                                <div
                                    key={name}
                                    className="px-3 py-1 text-gray-500 bg-gray-100 rounded-full "
                                >
                                    <h2 className="text-sm font-normal ">
                                        {name}
                                    </h2>
                                </div>
                            ))}
                        </div>
                        {place?.address && (
                            <span className="flex items-center justify-between mt-2">
                                <MdOutlinePinDrop className="w-6 h-6" />
                                {place.address}
                            </span>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PlacesCard;
