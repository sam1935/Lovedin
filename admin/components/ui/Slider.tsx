"use client";

import * as React from "react";

interface SliderProps {
    value: number[];
    onValueChange: (value: number[]) => void;
    min?: number;
    max?: number;
    step?: number;
    className?: string;
}

export function Slider({ value, onValueChange, min = 0, max = 100, step = 1, className = "" }: SliderProps) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onValueChange([parseFloat(e.target.value)]);
    };

    const percentage = ((value[0] - min) / (max - min)) * 100;

    return (
        <div className={`relative flex w-full touch-none select-none items-center ${className}`}>
            <div className="relative h-2 w-full grow overflow-hidden rounded-full bg-gray-100">
                <div
                    className="absolute h-full bg-pink-600"
                    style={{ width: `${percentage}%` }}
                />
            </div>
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value[0]}
                onChange={handleChange}
                className="absolute h-full w-full opacity-0 cursor-pointer"
            />
            <div
                className="block h-5 w-5 rounded-full border-2 border-pink-600 bg-white ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                style={{ left: `calc(${percentage}% - 10px)`, position: "absolute", pointerEvents: "none" }}
            />
        </div>
    );
}
