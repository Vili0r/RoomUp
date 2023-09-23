import React from "react";
import { BsBookmark } from "react-icons/bs";
import { VscSymbolProperty } from "react-icons/vsc";
import { AiOutlineUserAdd, AiOutlineCheck } from "react-icons/ai";
import { FaRegAddressCard } from "react-icons/fa";
import { CgAttribution } from "react-icons/cg";
import { TbFileDescription } from "react-icons/tb";

const steps = [
    {
        id: "1",
        icon: <FaRegAddressCard className="w-full h-full" />,
        title: "Address",
    },
    {
        id: "2",
        icon: <VscSymbolProperty className="w-full h-full" />,
        title: "Property",
    },
    {
        id: "3",
        icon: <CgAttribution className="w-full h-full" />,
        title: "Details",
    },
    {
        id: "4",
        icon: <AiOutlineUserAdd className="w-full h-full" />,
        title: "Advertiser",
    },
    {
        id: "5",
        icon: <TbFileDescription className="w-full h-full" />,
        title: "Flatmates",
    },
    {
        id: "6",
        icon: <AiOutlineCheck className="w-full h-full" />,
        title: "Confirm",
    },
];

const CreateSteps = ({ activeStep }) => {
    return (
        <div className="w-full p-4">
            <div className="flex items-center">
                {steps.map((step, index) => (
                    <>
                        <div
                            key={step.id}
                            className={`${
                                activeStep < index && "text-gray-500"
                            } ${
                                activeStep > index && "text-white"
                            } relative flex items-center`}
                        >
                            <div
                                className={`${
                                    activeStep > index ? "bg-[#F1C40F]" : ""
                                } [@media(min-width:370px)]:w-12 [@media(min-width:370px)]:h-12 w-10 h-10 py-3 transition duration-500 ease-in-out border-2 border-[#F1C40F] rounded-full`}
                            >
                                {step.icon}
                            </div>
                            <div
                                className={`${
                                    activeStep <= index
                                        ? "[@media(max-width:480px)]:hidden text-gray-500"
                                        : "text-[#F1C40F]"
                                } absolute top-0 w-32 mt-16 -ml-10 text-base font-medium text-center capitalize`}
                            >
                                {step.title}
                            </div>
                        </div>
                        <div
                            className={
                                step.id == "6"
                                    ? "hidden"
                                    : "flex-auto transition duration-500 ease-in-out border-t-2 border-[#F1C40F]"
                            }
                        ></div>
                    </>
                ))}
            </div>
        </div>
    );
};

export default CreateSteps;
