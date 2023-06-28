import React, { useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BsEyeFill } from "react-icons/bs";
import { Link, useForm } from "@inertiajs/react";
import moment from "moment";
import { HousePlaceholder } from "@/assets";
import { PrimaryButton, MessageModal } from "@/Components";

const FavouritePropertyCard = ({ property, index }) => {
    const { post } = useForm({});
    const [isOpen, setIsOpen] = useState(false);

    const closeModal = () => {
        setIsOpen(false);
    };

    const openModal = () => {
        setIsOpen(true);
    };

    const showImage = () => {
        return "/storage/";
    };

    //Handling on submit favourite event
    const submit = (e, id, model) => {
        e.preventDefault();

        post(`/${model}/${id}/favourite`, { preserveScroll: true });
    };
    return (
        <div
            key={index}
            className="relative flex w-full max-w-[26rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg"
        >
            <div className="relative mx-4 mt-4 overflow-hidden text-white shadow-lg rounded-xl bg-blue-gray-500 bg-clip-border shadow-blue-gray-500/40">
                <Link
                    href={route("property.show", [property.model, property.id])}
                >
                    <img
                        src={
                            property.images
                                ? showImage() + property?.images[0]
                                : HousePlaceholder
                        }
                        alt=""
                    />
                    <div className="absolute inset-0 w-full h-full to-bg-black-10 bg-gradient-to-tr from-transparent via-transparent to-black/60"></div>
                </Link>

                <form onSubmit={(e) => submit(e, property.id, property.model)}>
                    <div className="absolute top-3 right-3">
                        <PrimaryButton className="relative transition cursor-pointer hover:opacity-80">
                            <AiOutlineHeart
                                size={28}
                                className="fill-white absolute -top-[2px] -right-[2px]"
                            />
                            <AiFillHeart
                                size={24}
                                className={
                                    property.favouritedBy
                                        ? "fill-rose-500"
                                        : "fill-neutral-500/70"
                                }
                            />
                        </PrimaryButton>
                    </div>
                </form>
            </div>

            <div className="p-6">
                <Link
                    href={route("property.show", [property.model, property.id])}
                >
                    <div className="flex items-center justify-between mb-3">
                        <h5 className="block font-sans text-xl antialiased font-medium leading-snug tracking-normal text-blue-gray-900">
                            {property.address?.address_1},
                            {property.address?.area}
                        </h5>
                        <p className="flex items-center gap-1.5 font-sans text-base font-normal leading-relaxed text-blue-gray-900 antialiased">
                            <BsEyeFill className="-mt-0.5 h-5 w-5 text-yellow-700" />

                            {property.views}
                        </p>
                    </div>
                    <h2 className="block font-sans text-lg antialiased font-semibold leading-relaxed text-gray-700">
                        {property.title}
                    </h2>
                    <p className="block font-sans text-base antialiased font-light leading-relaxed text-gray-700">
                        {property.description}
                    </p>
                </Link>
                <div className="flex flex-row items-center gap-4 mt-4 font-light text-neutral-500">
                    <div>{property.size} rooms</div>
                    <div>Type: {property.type}</div>
                    <div>
                        Created at:{" "}
                        {moment(property.created_at).format("MMM DD, YYYY")}
                    </div>
                </div>
            </div>
            <MessageModal
                isOpen={isOpen}
                closeModal={closeModal}
                name={property.advertiser.first_name}
            />
            <div className="p-6 pt-3">
                <button
                    className="block w-full select-none rounded-full bg-[#FFF337] py-3.5 px-7 text-center align-middle font-sans text-sm font-medium text-black shadow-md shadow-yellow-500/20 transition-all hover:shadow-lg hover:shadow-yellow-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="button"
                    data-ripple-light="true"
                >
                    Message {property.advertiser.first_name}
                </button>
            </div>
        </div>
    );
};

export default FavouritePropertyCard;
