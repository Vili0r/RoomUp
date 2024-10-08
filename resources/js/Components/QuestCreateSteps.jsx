import React from "react";
import { VscSymbolProperty } from "react-icons/vsc";
import { AiOutlineUserAdd, AiOutlineCheck } from "react-icons/ai";
import { TbFileDescription } from "react-icons/tb";
import { useTranslation } from "react-i18next";

const steps = [
    {
        id: "1",
        icon: <VscSymbolProperty className="w-full h-full" />,
        titleEn: "Property",
        titleGr: "Κατοικία",
    },
    {
        id: "2",
        icon: <TbFileDescription className="w-full h-full" />,
        titleEn: "Flatmates",
        titleGr: "Συγκάτοικοι",
    },
    {
        id: "3",
        icon: <AiOutlineUserAdd className="w-full h-full" />,
        titleEn: "Advertiser",
        titleGr: "Στοιχεία",
    },
    {
        id: "4",
        icon: <AiOutlineCheck className="w-full h-full" />,
        titleEn: "Confirm",
        titleGr: "Επιβεβαίωση",
    },
];

const CreateSteps = ({ activeStep }) => {
    const { i18n } = useTranslation();
    return (
        <div className="w-full p-4 mx-4">
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
                                } w-12 h-12 py-3 transition duration-500 ease-in-out border-2 border-[#F1C40F] rounded-full`}
                            >
                                {step.icon}
                            </div>
                            <div
                                className={`${
                                    activeStep <= index
                                        ? "text-gray-500"
                                        : "text-[#F1C40F]"
                                } absolute top-0 w-32 mt-16 -ml-10 text-xs font-medium text-center uppercase`}
                            >
                                {i18n.language == "en"
                                    ? step.titleEn
                                    : step.titleGr}
                            </div>
                        </div>
                        <div
                            className={
                                step.id == "4"
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
