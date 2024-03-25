import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
    const container1Ref = useRef(null);
    const maskRef = useRef(null);
    const sectionRefs = useRef([]);
    sectionRefs.current = [];

    const addToRefs = (el) => {
        if (el && !sectionRefs.current.includes(el)) {
            sectionRefs.current.push(el);
        }
    };

    useGSAP(() => {
        const sections = sectionRefs.current;
        const mask = maskRef.current;

        // Horizontal scrolling of the sections
        const scrollTween = gsap.to(sections, {
            xPercent: -100 * (sections.length - 1),
            ease: "none",
            scrollTrigger: {
                trigger: container1Ref.current,
                pin: true,
                scrub: 1,
                end: "+=3000",
            },
        });

        // Progress bar animation
        gsap.to(mask, {
            width: "100%",
            scrollTrigger: {
                trigger: ".wrapper",
                start: "top left",
                scrub: 1,
            },
        });

        // Animation for each section
        sections.forEach((section) => {
            const texts = gsap.utils.toArray(".anim", section);
            if (texts.length === 0) return;

            gsap.from(texts, {
                y: -130,
                opacity: 0,
                duration: 2,
                ease: "elastic",
                stagger: 0.1,
                scrollTrigger: {
                    trigger: section,
                    containerAnimation: scrollTween,
                    start: "left center",
                },
            });
        });
    });

    return (
        <div className="relative overflow-x-hidden wrapper bg-[#F9F9FA]">
            <div
                ref={container1Ref}
                className="flex w-[300vw] container1 scrollx"
            >
                <svg
                    viewBox="0 0 900 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute top-[12em] left-[10vw] w-[50vw]"
                >
                    <path
                        d="M9.89998 6C9.43671 8.28224 7.41896 10 5 10C2.23858 10 0 7.76142 0 5C0 2.23858 2.23858 0 5 0C7.41896 0 9.43671 1.71776 9.89998 4H445.1C445.563 1.71776 447.581 0 450 0C452.419 0 454.437 1.71776 454.9 4H890.1C890.563 1.71776 892.581 0 895 0C897.761 0 900 2.23858 900 5C900 7.76142 897.761 10 895 10C892.581 10 890.563 8.28224 890.1 6H454.9C454.437 8.28224 452.419 10 450 10C447.581 10 445.563 8.28224 445.1 6H9.89998Z"
                        fill="#D9D9D9"
                    />
                    <mask
                        id="mask0_0_1"
                        style={{ maskType: "alpha" }}
                        maskUnits="userSpaceOnUse"
                        x="0"
                        y="0"
                        width="900"
                        height="10"
                    >
                        <path
                            d="M9.89998 6C9.43671 8.28224 7.41896 10 5 10C2.23858 10 0 7.76142 0 5C0 2.23858 2.23858 0 5 0C7.41896 0 9.43671 1.71776 9.89998 4H445.1C445.563 1.71776 447.581 0 450 0C452.419 0 454.437 1.71776 454.9 4H890.1C890.563 1.71776 892.581 0 895 0C897.761 0 900 2.23858 900 5C900 7.76142 897.761 10 895 10C892.581 10 890.563 8.28224 890.1 6H454.9C454.437 8.28224 452.419 10 450 10C447.581 10 445.563 8.28224 445.1 6H9.89998Z"
                            fill="#D9D9D9"
                        />
                    </mask>
                    <g mask="url(#mask0_0_1)">
                        <rect
                            ref={maskRef}
                            className="mask"
                            y="-49"
                            height="99"
                            fill="black"
                        />
                    </g>
                </svg>

                <section ref={addToRefs} className="w-screen p-[20vw_10vw]">
                    <span className="block">Advanced1</span>
                    <h1 className="m-0 text-3xl">Signify Elegance</h1>

                    <div className="flex gap-3 col">
                        <p className="text-[0.8rem]">
                            Lorem ipsum dolor sit amet consectetur. Egestas
                            euismod nec sit sed massa turpis in. Sit praesent
                            arcu leo lectus pellentesque. Ornare elit orci morbi
                            volutpat. Ut fermentum lorem morbi quis risus amet
                            urna. Urna egestas lorem.
                        </p>
                        <p className="text-[0.8rem]">
                            Lorem ipsum dolor sit amet consectetur. Egestas
                            euismod nec sit sed massa turpis in. Sit praesent
                            arcu leo lectus pellentesque. Ornare elit orci morbi
                            volutpat. Ut fermentum lorem morbi quis risus amet
                            urna. Urna egestas lorem.
                        </p>
                    </div>
                </section>
                <section ref={addToRefs} className="w-screen p-[20vw_10vw]">
                    <span className="block anim">Advanced2</span>
                    <h1 className="m-0 text-3xl anim">Signify Elegance</h1>

                    <div className="flex gap-3 col anim">
                        <p className="text-[0.8rem]">
                            Lorem ipsum dolor sit amet consectetur. Egestas
                            euismod nec sit sed massa turpis in. Sit praesent
                            arcu leo lectus pellentesque. Ornare elit orci morbi
                            volutpat. Ut fermentum lorem morbi quis risus amet
                            urna. Urna egestas lorem.
                        </p>
                        <p className="text-[0.8rem]">
                            Lorem ipsum dolor sit amet consectetur. Egestas
                            euismod nec sit sed massa turpis in. Sit praesent
                            arcu leo lectus pellentesque. Ornare elit orci morbi
                            volutpat. Ut fermentum lorem morbi quis risus amet
                            urna. Urna egestas lorem.
                        </p>
                    </div>
                </section>
                <section ref={addToRefs} className="w-screen p-[20vw_10vw]">
                    <span className="block anim">Advanced3</span>
                    <h1 className="m-0 text-3xl anim">Signify Elegance</h1>

                    <div className="flex gap-3 col anim">
                        <p className="text-[0.8rem]">
                            Lorem ipsum dolor sit amet consectetur. Egestas
                            euismod nec sit sed massa turpis in. Sit praesent
                            arcu leo lectus pellentesque. Ornare elit orci morbi
                            volutpat. Ut fermentum lorem morbi quis risus amet
                            urna. Urna egestas lorem.
                        </p>
                        <p className="text-[0.8rem]">
                            Lorem ipsum dolor sit amet consectetur. Egestas
                            euismod nec sit sed massa turpis in. Sit praesent
                            arcu leo lectus pellentesque. Ornare elit orci morbi
                            volutpat. Ut fermentum lorem morbi quis risus amet
                            urna. Urna egestas lorem.
                        </p>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Services;
