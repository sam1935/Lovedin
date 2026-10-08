import Link from "next/link";
import Image from "next/image";
import SocialAuthButtons from "../components/SocialAuthButtons";
import AnimatedBackground from "@/app/components/ui/AnimatedBackground";

export default function Banner() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        {/* Gradient Background */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(45deg, #fef7fa 0%, #fff1f4 50%, #fcf1f3 100%)", // User-provided pink gradient
          }}
        />

        {/* Animated Background Elements (Client Component) */}
        <AnimatedBackground />
      </div>

      <div className="mx-auto w-full px-4 lg:px-10 xl:px-[134px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch min-h-[500px] md:min-h-[650px] lg:min-h-[700px] pt-10 pb-10">

          <div className="hidden lg:flex flex-col items-center justify-center order-1 lg:order-2 gap-4">
            <Image
              src="/logo/lovedin_logo.svg"
              alt="Couple silhouette"
              width={400}
              height={200}
              priority
            />
            <h2
              className="text-2xl font-semibold bg-linear-to-r from-[#8B5A8F] to-[#E91E63] bg-clip-text text-transparent"
              style={{
                backgroundImage: 'linear-gradient(90deg, #8B5A8F 0%, #E91E63 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Find Your Perfect Match
            </h2>
          </div>


          <div className="flex items-center mb-0 md:mb-12 order-2 lg:order-1">
            <div
              className="max-w-[505px] w-full rounded-2xl bg-white/80 backdrop-blur-md border border-white/40 p-5 sm:p-6 mx-auto"
              style={{
                // User-provided pink shadow color: #feeaef
                boxShadow: '0 20px 50px -12px #feeaef',
              }}
            >
              <h1 className="text-xl sm:text-3xl md:text-[36px] font-bold text-[#FF0854]/70 leading-snug md:leading-11 tracking-[0] drop-shadow-2xl">
                Meet. Socialize. Connect. Live
              </h1>

              {/* <p className="mt-4 text-base sm:text-lg md:text-[22px] text-[#202020] leading-6 md:leading-8">
                Discover authentic matches and create bonds that go beyond small
                talk.
              </p> */}

              <p className="mt-3 md:mt-2 italic text-sm sm:text-lg md:text-[22px] font-semibold text-gray-600">
                Continue with
              </p>

              <div className="mt-4 md:mt-2 flex flex-row md:grid md:grid-cols-2 items-center justify-center gap-6 md:gap-3">
                <SocialAuthButtons />

                <Link
                  href="/login"
                  className="flex items-center justify-center w-[40px] h-[40px] md:w-full md:h-[50px] rounded-full md:rounded-[40.7529px] text-[#FF0854] text-sm sm:text-base font-medium border border-[#FF0854] bg-white/40 hover:bg-[#FF0854] hover:text-white transition cursor-pointer group"
                >

                  <span className="">
                    {/* Mail SVG Icon */}
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-[#FF0854] group-hover:text-white"
                    >
                      <path d="M3 8L10.89 13.26C11.2187 13.4793 11.6049 13.5963 12 13.5963C12.3951 13.5963 12.7813 13.4793 13.11 13.26L21 8M5 19H19C19.5304 19 20.0391 18.7893 20.4142 18.4142C20.7893 18.0391 21 17.5304 21 17V7C21 6.46957 20.7893 5.96086 20.4142 5.58579C20.0391 5.21071 19.5304 5 19 5H5C4.46957 5 3.96086 5.21071 3.58579 5.58579C3.21071 5.96086 3 6.46957 3 7V17C3 17.5304 3.21071 18.0391 3.58579 18.4142C3.96086 18.7893 4.46957 19 5 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="hidden md:inline md:ml-2">Email</span>
                </Link>
              </div>
              <p className="mt-4 text-sm sm:text-base text-gray-500">
                By continuing, you agree to our{" "}
                <Link
                  href="/terms-and-conditions"
                  className="text-[#FF0854] underline"
                >
                  Terms & Conditions
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy-policy"
                  className="text-[#FF0854] underline"
                >
                  Privacy Policy
                </Link>
                .
              </p>

              <div className="mt-3 text-center text-[15px] flex justify-between gap-2 flex-wrap">
                <div>
                  <span className="text-gray-600">New to LovedIn? </span>
                  <Link href="/signup" className="text-[#FF0854] font-medium">
                    Sign Up Now
                  </Link>
                </div>

                <div>
                  <Link href="/login" className="text-gray-600">
                    Already a member?{" "}
                    <span className="text-[#FF0854]">Sign In</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
