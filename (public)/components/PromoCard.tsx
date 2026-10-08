"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
const PromoCard = () => {
  const [showPromo, setShowPromo] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowPromo(true), 5000);
    return () => clearTimeout(t);
  }, []);
  return (
    <>
      {showPromo && (
        <div
          role="dialog"
          aria-label="promo"
          className="fixed right-1 bottom-6 bg-white rounded-[20px] p-4 shadow-2xl w-80 md:w-[360px] transition-opacity duration-200 z-50"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image
                src="/logo/lovedin_logo.svg"
                alt="LovedIn"
                width={110}
                height={28}
                className="object-contain"
              />
            </div>

            <button
              aria-label="close promo"
              onClick={() => setShowPromo(false)}
            >
              <Image
                src="/icons/cross_icon.svg"
                alt="Close"
                width={20}
                height={20}
                className="object-contain"
              />
            </button>
          </div>

          <p className="text-sm text-gray-600 mt-1">
            Experience LovedIn at its best — continue on the app for more
            features and better performance.
          </p>

          <h4 className="mt-2 font-bold text-base">Download the app now!</h4>

          <div className="mt-3 flex items-center gap-3">
            <a
              href="https://play.google.com/store"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-105 transition-transform"
            >
              <Image
                src="/icons/play_store.svg"
                alt="Get it on Google Play"
                width={145}
                height={40}
              />
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=com.app.lovedin"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-105 transition-transform"
            >
              <Image
                src="/icons/apple_store.svg"
                alt="Download on the App Store"
                width={145}
                height={40}
              />
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default PromoCard;
