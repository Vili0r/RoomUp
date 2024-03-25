import React from "react";

const HowItWorks = () => {
    return (
        <section className="bg-[#F9F9FA]">
            <div className="p-4 ">
                <div className="flex flex-col gap-4 sm:grid sm:grid-cols-3 sm:grid-rows-3">
                    <div className="flex items-center justify-center col-span-2 row-span-2 p-4 bg-yellow-400 rounded-[5px]">
                        <div>
                            <p>Big and bigger.</p>

                            <div className="flex justify-center space-x-2">
                                <div className="p-8 text-white bg-black">
                                    iPhone 14
                                </div>
                                <div className="p-8 text-white bg-black">
                                    iPhone 14 Plus
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-center p-4 bg-green-300 rounded-[5px]">
                        <p>The loooongest battery life of any iPhone. Ever.</p>
                    </div>

                    <div className="flex items-center justify-center p-4 bg-yellow-100 rounded-[5px]">
                        <p>Ceramic Shield Tougher than any smartphone glass.</p>
                    </div>

                    <div className="flex items-center justify-center p-4 bg-green-200 rounded-[5px]">
                        <p>Water resistance. (Phew.)</p>
                    </div>

                    <div className="flex items-center justify-center col-span-2 p-4 text-white bg-black rounded-[5px]">
                        <p>Action mode Shaky shots, stable video.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
