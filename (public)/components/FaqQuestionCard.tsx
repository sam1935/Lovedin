"use client";
import React, { useState } from "react";
import Image from "next/image";

interface FaqQuestionCardProps {
  question: string;
  answer: string;
}
export function FaqQuestionCard({ question, answer }: FaqQuestionCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`rounded-xl overflow-hidden transition-all duration-300 bg-white shadow-sm border ${
        open ? "border-pink-400" : "border-transparent"
      }`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center px-4 py-4 text-left"
      >
        <span className="text-gray-800 font-medium">{question}</span>
        {open ? (
          <Image
            src="/icons/arrow_up.svg"
            width={20}
            height={20}
            alt="arrow up"
          />
        ) : (
          <Image
            src="/icons/arrow_down.svg"
            width={20}
            height={20}
            alt="arrow down"
          />
        )}
      </button>

      {open && <div className="px-4 pb-4 text-gray-600 text-sm">{answer}</div>}
    </div>
  );
}
