import { IoCloseOutline } from "react-icons/io5";

const Drawer = ({ isOpen, setIsOpen }) => {
    return (
        <main
            className={
                " fixed overflow-hidden z-10 bg-gray-900 bg-opacity-75 bg-blur inset-0 transform ease-in-out " +
                (isOpen
                    ? " transition-opacity opacity-100 duration-500 translate-x-0  "
                    : " transition-all delay-500 opacity-0 translate-x-full  ")
            }
        >
            <section
                className={
                    " w-screen max-w-lg right-0 absolute bg-white h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform  " +
                    (isOpen ? " translate-x-0 " : " translate-x-full ")
                }
            >
                <article className="relative flex flex-col w-screen h-full max-w-lg pb-10 space-y-6 overflow-y-scroll mt-[5rem]">
                    <header className="flex justify-between p-4 text-lg font-bold">
                        <span></span>
                        <button
                            onClick={() => {
                                setIsOpen(false);
                            }}
                            className=" sm:hidden"
                        >
                            <IoCloseOutline className="w-6 h-6" />
                        </button>
                    </header>
                </article>
            </section>
            <section
                className="w-screen h-full cursor-pointer "
                onClick={() => {
                    setIsOpen(false);
                }}
            ></section>
        </main>
    );
};

export default Drawer;
