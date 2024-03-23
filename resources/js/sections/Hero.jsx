import React, { useRef } from "react";
import { HeroIllustration } from "@/assets";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import SearchBar from "@/Components/SearchBar";

const Hero = () => {
    const line3Ref = useRef(null);
    const line4Ref = useRef(null);
    const { t } = useTranslation();
    const { line1, line2, line3, line4 } = t("hero.title");

    useGSAP(() => {
        // Set initial visibility
        gsap.set(line4Ref.current, { autoAlpha: 0 });

        // Create a timeline that repeats indefinitely
        const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.5 });

        // Sequence the animations for line3 and line4
        tl.to(line3Ref.current, { autoAlpha: 0, duration: 1 })
            .to(line4Ref.current, { autoAlpha: 1, duration: 1 }) // Delay the start slightly to ensure line3 fades out first
            .to(line4Ref.current, { autoAlpha: 0, duration: 1 }, "+=2") // Keep line4 visible for a bit before fading out
            .to(line3Ref.current, { autoAlpha: 1, duration: 1 }); // Fade line3 back in
    });

    return (
        <section
            className="w-full bg-center bg-cover h-[38rem]"
            style={{
                backgroundImage: `url(${HeroIllustration})`,
            }}
        >
            <div className="flex items-center justify-center w-full h-full bg-gray-900/10">
                <div className="mt-[7rem]">
                    <div className="flex items-center">
                        <h1 className="flex items-center gap-2 font-bold">
                            <span className="xs:text-[2.25rem] xxs:text-[1.75rem] text-[1.7rem] leading-[120%] text-[#f0e9e9]">
                                {line1}
                            </span>
                            <span className="xs:text-[2.25rem] xxs:text-[1.75rem] text-[1.7rem] leading-[120%] text-[#f0e9e9]">
                                {line2}
                            </span>
                            <div className="relative mb-8 xs:mb-10">
                                <span
                                    ref={line3Ref}
                                    className="absolute xs:text-[2.25rem] xxs:text-[1.75rem] text-[1.7rem] leading-[120%] text-[#f0e9e9]"
                                >
                                    {line3}
                                </span>
                                <span
                                    ref={line4Ref}
                                    className="absolute opacity-0 xs:text-[2.25rem] xxs:text-[1.75rem] text-[1.7rem] leading-[120%] text-[#f0e9e9] "
                                >
                                    {line4}
                                </span>
                            </div>
                        </h1>
                    </div>

                    <p className="sm:mb-[2rem] mb-2 mr-[2rem] md:text-[1rem] sm:text-[0.825rem] text-[0.79rem] text-gray-100 font-bold">
                        {t("hero.description")}
                    </p>
                    <SearchBar />
                </div>
            </div>
        </section>
    );
};

export default Hero;
