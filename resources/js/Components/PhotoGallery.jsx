import React, { useState } from "react";
import { Popular1, Popular2, Popular3, Popular4, Popular5 } from "@/assets";
import { MdOutlinePhotoSizeSelectActual, MdOutlineClose } from "react-icons/md";

const PhotoGallery = () => {
    const [showAllPhotos, setShowAllPhotos] = useState(false);

    if (showAllPhotos) {
        return (
            <div className="absolute top-0 left-0 w-[100%] z-[100] h-[100%]">
                <div className="bg-white p-8 grid gap-4">
                    <div>
                        <h2 className="text-3xl mr-48">Photos of ....</h2>
                        <button
                            onClick={() => setShowAllPhotos(false)}
                            className="fixed right-12 top-8 flex gap-1 py-2 px-4 rounded-3xl shadow shadow-black bg-white text-black"
                        >
                            <MdOutlineClose className="w-6 h-6" />
                            Close photos
                        </button>
                    </div>
                    <div className="p-5 sm:p-8">
                        <div className="columns-1 gap-5 sm:columns-2 sm:gap-8 md:columns-3 lg:columns-4 [&>img:not(:first-child)]:mt-8">
                            <img src={Popular1} alt="" />
                            <img src={Popular2} alt="" />
                            <img src={Popular3} alt="" />
                            <img src={Popular4} alt="" />
                            <img src={Popular5} alt="" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="mt-8 relative">
            <div className="md:grid md:grid-cols-[2fr_1fr] md:gap-2 rounded-2xl overflow-hidden">
                <div>
                    <img
                        onClick={() => setShowAllPhotos(true)}
                        className="aspect-square cursor-pointer object-cover h-full [@media(max-width:800px)]:w-[100%]"
                        src={Popular1}
                        alt=""
                    />
                </div>
                <div className="md:grid hidden">
                    <img
                        onClick={() => setShowAllPhotos(true)}
                        className="aspect-square cursor-pointer object-cover"
                        src={Popular2}
                        alt=""
                    />
                    <div className="overflow-hidden">
                        <img
                            onClick={() => setShowAllPhotos(true)}
                            className="aspect-square cursor-pointer object-cover relative top-2"
                            src={Popular3}
                            alt=""
                        />
                    </div>
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
