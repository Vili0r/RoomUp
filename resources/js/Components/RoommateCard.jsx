import React from "react";
import { Link, useForm } from "@inertiajs/react";
import { PrimaryButton } from "@/Components";
import moment from "moment";
import { HousePlaceholder } from "@/assets";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BsEyeFill } from "react-icons/bs";

const RoommateCard = ({ roommate, index }) => {
    const { post } = useForm({});
    const showImage = () => {
        return "/storage/";
    };

    const submit = (e, id) => {
        e.preventDefault();

        post(`/roommate/${id}/favourite`, { preserveScroll: true });
    };
    return (
        <div className="col-span-1 cursor-pointer group" key={index}>
            <div className="flex flex-col w-full gap-2">
                <div className="relative w-full overflow-hidden aspect-square rounded-xl">
                    <Link href={route("single.roommate.show", roommate.id)}>
                        <img
                            className="object-cover w-full h-full transition group-hover:scale-110"
                            src={
                                roommate.images
                                    ? showImage() + roommate.images[0]
                                    : HousePlaceholder
                            }
                            alt=""
                        />
                    </Link>

                    <form onSubmit={(e) => submit(e, roommate.id)}>
                        <div className="absolute top-3 right-3">
                            <PrimaryButton className="relative transition cursor-pointer hover:opacity-80">
                                <AiOutlineHeart
                                    size={28}
                                    className="fill-white absolute -top-[2px] -right-[2px]"
                                />
                                <AiFillHeart
                                    size={24}
                                    className={
                                        roommate.favouritedBy
                                            ? "fill-rose-500"
                                            : "fill-neutral-500/70"
                                    }
                                />
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
                <Link href={route("single.roommate.show", roommate.id)}>
                    <div className="flex flex-row items-start justify-between mt-4">
                        <div>
                            <p className="text-sm font-bold text-gray-800">
                                {roommate.city}, {roommate.area}
                            </p>
                            <p className="text-sm text-gray-800">
                                {roommate.title}
                            </p>
                            <p className="text-sm text-gray-800">
                                Available from{" "}
                                <span className="font-semibold">
                                    {moment(
                                        roommate.availability.available_from
                                    ).format("MMM DD, YYYY")}
                                </span>
                            </p>
                            <p className="text-sm text-gray-800">
                                Searching for{" "}
                                <span className="font-semibold">
                                    {roommate.searching_for}
                                </span>
                            </p>
                            <p className="mt-2 text-sm text-gray-800">
                                <strong>${roommate.budget}</strong> /month
                            </p>
                        </div>
                        <div className="flex flex-row items-center">
                            <dt className="sr-only">Saved</dt>
                            <dd className="flex items-center text-indigo-600 dark:text-indigo-400">
                                <BsEyeFill className="w-5 h-5 mr-1 stroke-current dark:stroke-indigo-500" />
                                <span>({roommate.views})</span>
                            </dd>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default RoommateCard;
