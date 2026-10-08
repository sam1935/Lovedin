"use client";

import Image from "next/image";
import {
    handleGoogleLogin,
    handleFacebookLogin,
    handleAppleLogin,
} from "@/lib/utils/socialAuth";

export default function SocialAuthButtons() {
    return (
        <div className="contents">
            <button
                type="button"
                onClick={handleGoogleLogin}
                className="flex items-center justify-center w-[40px] h-[40px] md:w-full md:h-[50px] rounded-full md:rounded-[40.7529px] border border-[#FF0854] bg-white/40 hover:bg-[#FF0854] text-[#FF0854] hover:text-white transition group"
            >
                <Image
                    src="/icons/social/google_icon.svg"
                    alt="Google"
                    width={24}
                    height={24}
                    className="md:bg-white md:rounded-full md:p-1 md:mr-3"
                />
                <span className="hidden md:inline font-medium text-sm sm:text-base">Google</span>
            </button>

            <button
                type="button"
                onClick={handleFacebookLogin}
                className="flex items-center justify-center w-[40px] h-[40px] md:w-full md:h-[50px] rounded-full md:rounded-[40.7529px] border border-[#FF0854] bg-white/40 hover:bg-[#FF0854] text-[#FF0854] hover:text-white transition group"
            >
                <Image
                    src="/icons/social/facebook_icon.svg"
                    alt="Facebook"
                    width={26}
                    height={26}
                    className="md:bg-white md:rounded-full md:p-1 md:mr-3"
                />
                <span className="hidden md:inline font-medium text-sm sm:text-base">Facebook</span>
            </button>

            <button
                type="button"
                onClick={handleAppleLogin}
                className="flex items-center justify-center w-[40px] h-[40px] md:w-full md:h-[50px] rounded-full md:rounded-[40.7529px] border border-[#FF0854] bg-white/40 hover:bg-[#FF0854] text-[#FF0854] hover:text-white transition group"
            >
                <Image
                    src="/icons/social/apple_icon.svg"
                    alt="Apple"
                    width={24}
                    height={24}
                    className="md:bg-white md:rounded-full md:p-1 md:mr-3"
                />
                <span className="hidden md:inline font-medium text-sm sm:text-base">Apple</span>
            </button>
        </div>
    );
}
