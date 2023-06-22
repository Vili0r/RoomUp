import React from "react";
import { VscListSelection } from "react-icons/vsc";

const MapCard = ({ toggleMap, setToggleMap }) => {
    return (
        <div
            className={
                toggleMap
                    ? "fixed top-0 left-0 w-[100%] z-[100] h-[100%]"
                    : "px-2 rounded-xl col-span-2 overflow-hidden [@media(max-width:1024px)]:hidden md:h-[930px]"
            }
        >
            <iframe
                className="w-full h-full rounded-xl"
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d19888.886967391547!2d-0.9595379997695183!3d51.456120793431964!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2suk!4v1675966769682!5m2!1sen!2suk"
                width="600"
                height="450"
                style={{ border: "0" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            <div
                className="fixed bottom-[2rem] left-[5rem] sm:left-[21rem] xxs:left-[11rem] md:hidden"
                style={{ transition: ".4s" }}
            >
                <button
                    onClick={() => setToggleMap(false)}
                    className="fixed flex justify-center gap-2 p-3 py-3 text-sm font-semibold text-white bg-gray-800 rounded-full font-popp"
                >
                    Show List
                    <VscListSelection className="mt-[3px]" />
                </button>
            </div>
        </div>
    );
};

export default MapCard;
