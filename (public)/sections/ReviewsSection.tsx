"use client";

import { useState } from "react";
import Image from "next/image";

type Review = {
  id: number;
  name: string;
  rating: number;
  review: string;
  image: string;
};

const reviews: Review[] = [
  {
    id: 1,
    name: "Jenny Wilmson",
    rating: 5,
    review:
      "Finally, an app that focuses on real connections instead of endless swipes. I met my partner here, and we've been together ever since.",
    image: "/images/Jenny_user.png",
  },
  {
    id: 2,
    name: "Sarah Mitchell",
    rating: 4,
    review:
      "The best dating app I've used! The verification process makes me feel safe, and I love the video chat feature. Found my soulmate here!",
    image: "/images/Jenny_user.png",
  },
  {
    id: 3,
    name: "Michael Chen",
    rating: 3,
    review:
      "What sets this app apart is the genuine community. People here are actually looking for meaningful relationships. Highly recommend!",
    image: "/images/Jenny_user.png",
  },
];

export default function ReviewsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");

  const handlePrevious = () => {
    setDirection("left");
    setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection("right");
    setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  const currentReview = reviews[currentIndex];

  // Use currentIndex and direction to create unique keys for animations
  const animKey = `${currentIndex}-${direction}`;

  return (
    <section className="w-full pt-12 px-4 lg:px-10 xl:px-[134px] flex flex-col items-center ">
      <div className="w-full max-w-[1300px] max-auto rounded-t-2xl bg-[#FFE5E6] px-5 py-5 pb-20 lg:pb-40 flex flex-col gap-6">
        <h2 className="text-3xl md:text-[48px] font-bold text-center text-[#202020] leading-[60px]">
          What they say about us
        </h2>
        <div className="w-full bg-white rounded-2xl px-8 flex flex-col-reverse md:flex-row items-center md:items-start justify-between gap-2 md:gap-8 min-h-[204px] max-h-fit relative">
          <div className="w-full md:pt-8 md:pr-16">
            <div className="flex flex-col gap-2 md:gap-6">
              <div className="flex gap-2 mb-4">
                {[...Array(currentReview.rating)].map((_, index) => (
                  <Image
                    key={`${animKey}-star-${index}`}
                    src="/icons/star_yellow.svg"
                    alt="Star"
                    width={24}
                    height={24}
                    style={{ animationDelay: `${index * 90}ms` }}
                    className="w-6 h-6 star-anim"
                  />
                ))}
              </div>
              <div>
                <p
                  key={`review-${animKey}`}
                  className={`text-[18px]  text-[#615353] leading-relaxed ${
                    direction === "right"
                      ? "animate-review-right"
                      : "animate-review-left"
                  }`}
                >
                  {currentReview.review}
                </p>
              </div>
            </div>

            <div className="flex gap-3 py-4 lg:py-0 md:relative   lg:top-15 xl:top-20  [@media(min-width:1071px)_and_(max-width:1535px)]:top-20 2xl:top-26 left-2">
              <button
                onClick={handlePrevious}
                className="w-[30px] h-[30px] flex items-center justify-center  transition-all duration-300 hover:scale-110 active:scale-95"
                aria-label="Previous review"
              >
                <Image
                  src="/icons/arrow_left.svg"
                  alt="Previous"
                  width={30}
                  height={30}
                />
              </button>
              <button
                onClick={handleNext}
                className="w-[30px] h-[30px]  flex items-center justify-center  transition-all duration-300 hover:scale-110 active:scale-95"
                aria-label="Next review"
              >
                <Image
                  src="/icons/arrow_right.svg"
                  alt="Next"
                  width={30}
                  height={30}
                />
              </button>
            </div>
          </div>

          <div className="md:relative h-full mt-4 md:mt-0">
            <div
              key={`imagewrap-${animKey}`}
              className={`max-w-[270px] min-h-[216px] max-h-fit w-[269px] relative md:top-18 [@media(min-width:812px)_and_(max-width:912px)]:top-12 [@media(min-width:913px)_and_(max-width:1023px)]:top-6 lg:top-16 flex flex-col justify-center items-center ${
                direction === "right"
                  ? "animate-review-right"
                  : "animate-review-left"
              }`}
            >
              <Image
                key={`image-${animKey}`}
                src={currentReview.image}
                alt={currentReview.name}
                width={269}
                height={216}
                className="rounded-lg md:absolute top-0"
              />
              <div
                key={`name-${animKey}`}
                className={`md:absolute md:-translate-x-full md:bottom-1 w-full md:flex justify-end md:pr-4 ${
                  direction === "right"
                    ? "animate-review-right"
                    : "animate-review-left"
                }`}
              >
                <h3 className="text-[24px] leading-[34px] tracking-[0] font-bold text-center rounded px-2 py-1 text-[#615353]">
                  {currentReview.name}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
