"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [showAppModal, setShowAppModal] = useState(false);
  return (
    <header className="w-full bg-transparent border-b border-gray-200 px-4 lg:px-10 xl:px-[134px] relative z-50">
      <div className="max-w-[1300px] mx-auto">
        <div className="flex h-16 items-center justify-between">
          {/* Left: logo */}
          <div className="flex items-center">
            <Link href="/" className="inline-flex items-center gap-2">
              {/* logo from public/logo directory */}
              <Image
                src={encodeURI("/logo/lovedin_logo.svg")}
                alt="LovedIn logo"
                width={151}
                height={43}
                priority
              />
            </Link>
          </div>

          {/* Right: combined nav + actions (desktop) and mobile menu button */}
          <div className="flex items-center gap-6">
            <nav className="hidden md:flex md:items-center md:space-x-6">
              <Link
                href="/about"
                className="text-sm text-gray-700 hover:text-[#FF0854]"
              >
                About Us
              </Link>
              {/* <Link
                href="/membership"
                className="text-sm text-gray-700 hover:text-[#FF0854]"
              >
                Membership
              </Link> */}
              <button
                onClick={() => setShowAppModal(true)}
                className="text-sm text-gray-700 hover:text-[#FF0854]"
              >
                Get the App
              </button>
            </nav>

            <div className="hidden md:flex md:items-center md:gap-3">
              <Link
                href="/login"
                className="text-sm px-3 py-1.5 rounded-full border border-[#FF0854] text-[#FF0854] hover:bg-pink-50"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="text-sm px-4 py-2 rounded-full bg-[#FF0854] text-white hover:bg-pink-700"
              >
                Join Now
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:bg-gray-100 md:hidden"
              aria-controls="mobile-menu"
              aria-expanded={open}
              onClick={() => setOpen(!open)}
            >
              <span className="sr-only">Open main menu</span>
              {open ? (
                <Image
                  src="/icons/cross_icon.svg"
                  alt="Close menu"
                  width={24}
                  height={24}
                  className="h-6 w-6"
                  priority={false}
                />
              ) : (
                <Image
                  src="/icons/menu_icon.svg"
                  alt="Open menu"
                  width={24}
                  height={24}
                  className="h-6 w-6"
                  priority={false}
                />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {open && (
        <>
          {/* Backdrop to close menu when clicking outside */}
          <div
            className="fixed inset-0 z-40 bg-transparent"
            onClick={() => setOpen(false)}
          />

          {/* Menu Content - Absolute positioned to float over content */}
          <div id="mobile-menu" className="absolute top-16 left-0 w-full z-50 md:hidden border-t border-gray-100 bg-[#fff9f9] shadow-lg">
            <div className="space-y-1 px-4 pt-4 pb-4 text-base leading-[30px]">
              <Link
                href="/about"
                className="block text-gray-700 py-2"
                onClick={() => setOpen(false)}
              >
                About Us
              </Link>
              {/* <Link
                href="/membership"
                className="block text-gray-700 py-2"
                onClick={() => setOpen(false)}
              >
                Membership
              </Link> */}
              <button
                onClick={() => {
                  setShowAppModal(true);
                  setOpen(false);
                }}
                className="block text-gray-700 py-2 w-full text-left"
              >
                Get the App
              </button>
              <div className="mt-2 flex items-center gap-3 text-lg">
                <Link
                  href="/login"
                  className="flex-1 text-center text-[#FF0854] border border-pink-500 rounded-full px-3 py-2"
                  onClick={() => setOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="flex-1 text-center bg-[#FF0854] text-white rounded-full px-3 py-2"
                  onClick={() => setOpen(false)}
                >
                  Join Now
                </Link>
              </div>
            </div>
          </div>
        </>
      )}

      {/* App Download Modal */}
      {showAppModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setShowAppModal(false)}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

          {/* Modal */}
          <div
            className="relative bg-white rounded-3xl shadow-2xl max-w-3xl w-full h-fit mx-5 md:w-[555px] md:h-[270px] flex flex-col items-center justify-center p-8 animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowAppModal(false)}
              className="absolute top-6 right-6"
              aria-label="Close modal"
            >
              <Image
                src="/icons/cross_icon_small.svg"
                alt="Close"
                width={24}
                height={24}
                className="h-6 w-6"
              />
            </button>

            {/* Modal Content */}
            <div className="text-center pt-2 md:pt-0">
              <h2 className="text-xl leading-relaxed md:text-3xl lg:text-[38px] md:leading-12 font-bold text-[#191919]">
                Download the App now!
              </h2>
              <p className="text-base md:text-lg lg:text-[20px] text-[#202020] leading-[29px] max-w-[445px] mx-auto ">
                The best of LovedIn — now in your pocket. Chat, match, and
                connect anytime, anywhere
              </p>

              {/* App Store Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 mt-3">
                <a
                  href="https://play.google.com/store/apps/details?id=com.app.lovedin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:scale-105 transition-transform"
                >
                  <Image
                    src="/icons/play_store.svg"
                    alt="Get it on Google Play"
                    width={166}
                    height={49}
                  />
                </a>
                <a
                  href="https://www.apple.com/app-store/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:scale-105 transition-transform"
                >
                  <Image
                    src="/icons/apple_store.svg"
                    alt="Download on the App Store"
                    width={166}
                    height={49}
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
