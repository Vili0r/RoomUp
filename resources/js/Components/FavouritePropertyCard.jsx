import React, { useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
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
            <Link href={route("property.show", [property.model, property.id])}>
                <div className="relative mx-4 mt-4 overflow-hidden text-white shadow-lg rounded-xl bg-blue-gray-500 bg-clip-border shadow-blue-gray-500/40">
                    <img
                        src={
                            property.images
                                ? showImage() + property?.images[0]
                                : HousePlaceholder
                        }
                        alt=""
                    />
                    <div className="absolute inset-0 w-full h-full to-bg-black-10 bg-gradient-to-tr from-transparent via-transparent to-black/60"></div>
                    <form
                        onSubmit={(e) => submit(e, property.id, property.model)}
                    >
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
            </Link>

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
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                ariaHidden="true"
                                className="-mt-0.5 h-5 w-5 text-yellow-700"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                            5.0
                        </p>
                    </div>
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
