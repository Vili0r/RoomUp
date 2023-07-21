import React, { useState, useRef } from "react";

const MultiRangeSlider = ({
    rangeMin,
    rangeMax,
    initialMin,
    initialMax,
    onMinChange,
    onMaxChange,
}) => {
    const [min, setMin] = useState(initialMin);
    const [max, setMax] = useState(initialMax);

    const handleThumbMouseMove = (e) => {
        if (!dragLeft && !dragRight) return;

        const thumbEl = dragLeft ? minThumbRef.current : maxThumbRef.current;

        const sliderRect = sliderRef.current.getBoundingClientRect();

        let r = (e.clientX - sliderRect.left) / sliderRect.width;
        r = Math.max(0, Math.min(r, 1));
        const value = Math.floor(r * (rangeMax - rangeMin) + rangeMin);

        if (dragLeft) {
            setMin(value);
            setMax(Math.max(value, max));
            onMinChange(value);
        } else {
            setMax(value);
            setMin(Math.min(min, value));
            onMaxChange(value);
        }
    };

    const sliderRef = useRef(null);
    const minThumbRef = useRef(null);
    const maxThumbRef = useRef(null);
    const [dragLeft, setDragLeft] = useState(false);
    const [dragRight, setDragRight] = useState(false);

    return (
        <>
            <div className="flex items-center justify-center space-x-1">
                <div className="px-4 py-1 -mt-8 text-xs text-white truncate bg-black rounded">
                    £{min}
                </div>

                <div className="px-4 py-1 -mt-8 text-xs text-white truncate bg-black rounded">
                    £{max}
                </div>
            </div>
            <div className="flex items-center justify-center">
                <div className="relative w-full max-w-xl">
                    <input
                        className="absolute z-20 w-full h-2 opacity-0 appearance-none cursor-pointer pointer-events-none"
                        type="range"
                        name="age_min"
                        min={rangeMin}
                        max={rangeMax}
                        value={min}
                        onChange={(e) => setMin(parseInt(e.target.value))}
                    />
                    <input
                        className="absolute z-20 w-full h-2 opacity-0 appearance-none cursor-pointer pointer-events-none"
                        type="range"
                        name="age_max"
                        min={rangeMin}
                        max={rangeMax}
                        value={max}
                        onChange={(e) => setMax(parseInt(e.target.value))}
                    />

                    <div
                        className="relative flex items-center w-3/4 h-2 mt-4 bg-gray-300 rounded"
                        ref={sliderRef}
                        onMouseUp={() => {
                            setDragLeft(false);
                            setDragRight(false);
                        }}
                        onMouseMove={handleThumbMouseMove}
                        style={{ userSelect: "none" }}
                    >
                        <div
                            className="absolute top-0 bottom-0 z-20 bg-orange-400 rounded-md"
                            style={{
                                left: `${
                                    ((min - rangeMin) * 100) /
                                    (rangeMax - rangeMin)
                                }%`,
                                right: `${
                                    100 -
                                    ((max - rangeMin) * 100) /
                                        (rangeMax - rangeMin)
                                }%`,
                            }}
                        ></div>
                        <div
                            className="absolute top-0 left-0 z-30 w-6 h-6 -mt-2 bg-orange-400 rounded-full"
                            onMouseDown={() => setDragLeft(true)}
                            style={{
                                left: `${
                                    ((min - rangeMin) * 100) /
                                    (rangeMax - rangeMin)
                                }%`,
                            }}
                            ref={minThumbRef}
                        ></div>
                        <div
                            className="absolute top-0 right-0 z-30 w-6 h-6 -mt-2 bg-orange-400 rounded-full"
                            onMouseDown={() => setDragRight(true)}
                            style={{
                                left: `${
                                    ((max - rangeMin) * 100) /
                                    (rangeMax - rangeMin)
                                }%`,
                            }}
                            ref={maxThumbRef}
                        ></div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MultiRangeSlider;
