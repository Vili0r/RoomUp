import React, { useState } from "react";
import { router } from "@inertiajs/react";
import { HousePlaceholder } from "@/assets";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { MdOutlinePhotoSizeSelectActual, MdOutlineClose } from "react-icons/md";

const PhotoGallery = ({ images, title, id, model, is_favourite }) => {
    const [showAllPhotos, setShowAllPhotos] = useState(false);
    const showImage = () => {
        return "/storage/";
    };

    const toggleFavourite = (id, model, favourite) => {
        router.put(`/property/${model}/${id}/favourite`, {
            is_favourite: !favourite,
        });
    };

    if (showAllPhotos) {
        return (
            <div className="absolute top-0 left-0 w-[100%] z-[100] h-[100%]">
                <div className="grid gap-4 p-8 bg-white">
                    <div>
                        <h2 className="mr-48 text-3xl">
                            Photos of
                            <span className="text-indigo-700"> {title}</span>
                        </h2>
                        <button
                            onClick={() => setShowAllPhotos(false)}
                            className="fixed flex gap-1 px-4 py-2 text-black bg-white right-12 top-8 rounded-3xl group"
                        >
                            <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                            <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black"></span>
                            <span className="relative text-black group-hover:text-white">
                                Close photos
                            </span>
                        </button>
                    </div>
                    <div className="p-5 sm:p-8">
                        <div className="columns-1 gap-5 sm:columns-2 sm:gap-8 md:columns-3 lg:columns-4 [&>img:not(:first-child)]:mt-8">
                            {images.map((image, index) => (
                                <img
                                    key={index}
                                    src={showImage() + image}
                                    alt={HousePlaceholder}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
            <img
                onClick={() => setShowAllPhotos(true)}
                className="object-cover w-full h-full cursor-pointer"
                src={images[0] ? showImage() + images[0] : HousePlaceholder}
                alt={title}
            />
            <div className="absolute top-5 right-5">
                <div
                    onClick={() => toggleFavourite(id, model, is_favourite)}
                    className="relative transition cursor-pointer hover:opacity-80"
                >
                    <AiOutlineHeart
                        size={28}
                        className="fill-white absolute -top-[2px] -right-[2px]"
                    />
                    <AiFillHeart
                        size={24}
                        className={
                            is_favourite
                                ? "fill-rose-500"
                                : "fill-neutral-500/70"
                        }
                    />
                </div>
            </div>
            <button
                onClick={() => setShowAllPhotos(true)}
                className="flex gap-1 absolute bottom-2 right-2 xs:py-2 xs:px-4 py-1 px-2 [@media(max-width:350px)]:py-0 [@media(max-width:350px)]:px-1 bg-white rounded-2xl shadow-md shadow-gray-500"
            >
                <MdOutlinePhotoSizeSelectActual className="w-6 h-6" />
                Show more photos
            </button>
        </div>
    );
};

export default PhotoGallery;
