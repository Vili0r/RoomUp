import React, { useState } from "react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import { MdOutlineBedroomParent } from "react-icons/md";
import { AiOutlineTeam } from "react-icons/ai";
import { RiAdvertisementLine } from "react-icons/ri";

const accordion = [
    {
        id: "accordion-1",
        title: "How to find a flatmate?",
        description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati iusto laboriosam molestiae maiores saepe perferendis aliquam explicabo, error eos magni ex atque, necessitatibus harum perspiciatis fugit, autem sunt sequi possimus.",
        icon: <AiOutlineTeam />,
    },
    {
        id: "accordion-2",
        title: "How to find a room / house?",
        description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati iusto laboriosam molestiae maiores saepe perferendis aliquam explicabo, error eos magni ex atque, necessitatibus harum perspiciatis fugit, autem sunt sequi possimus.",
        icon: <MdOutlineBedroomParent />,
    },
    {
        id: "accordion-3",
        title: "How to place an advertisment?",
        description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati iusto laboriosam molestiae maiores saepe perferendis aliquam explicabo, error eos magni ex atque, necessitatibus harum perspiciatis fugit, autem sunt sequi possimus.",
        icon: <RiAdvertisementLine />,
    },
];

const AccordionItem = () => {
    const [selected, setSelected] = useState(null);

    const toggle = (index) => {
        if (selected === index) {
            return setSelected(null);
        }

        setSelected(index);
    };
    return (
        <div>
            {accordion.map((item, index) => (
                <div
                    key={item.id}
                    className={`${
                        selected === index
                            ? "shadow-md shadow-[hsla(228, 66% 45%, .1)]"
                            : ""
                    } bg-white rounded-[.5rem] mb-[1rem]`}
                    style={{
                        border: "2px solid hsl(228, 99%, 98%)",
                        padding: "1rem .75rem",
                    }}
                    onClick={() => toggle(index)}
                >
                    <header className="flex items-center cursor-pointer">
                        <span
                            className="bg-[hsl(228, 100%, 97%)] font-popp p-[5px] rounded-[.25rem] text-[18px] text-[hsl(228, 66%, 53%)] mr-[.75rem]"
                            style={{ transition: ".3s" }}
                        >
                            {item.icon}
                        </span>
                        <h3 className="text-[.813rem] font-popp">
                            {item.title}
                        </h3>
                        <div
                            className="inline-flex bg-[hsl(228, 100%, 97%)] p-[.25rem] text-[#3E4147]"
                            style={{ transition: ".3s", marginLeft: "auto" }}
                        >
                            <ChevronUpIcon
                                className={`${
                                    selected === index
                                        ? ""
                                        : "rotate-180 transform"
                                } h-5 w-5 font-popp`}
                                style={{ transition: ".4s" }}
                            />
                        </div>
                    </header>
                    <div
                        className={
                            selected === index
                                ? "h-max "
                                : "overflow-hidden h-[0]"
                        }
                        style={{ transition: "all 0.5s ease" }}
                    >
                        <p
                            className="text-[.813rem] font-popp"
                            style={{ padding: "1.25rem 2.5rem 0 2.75rem" }}
                        >
                            {item.description}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AccordionItem;
