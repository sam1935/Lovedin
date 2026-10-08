import BannerMessageSection from "../sections/BannerMessageSection";
import WhoWeAreSection from "../sections/WhoWeAreSection";
import Image from "next/image";

export default function AboutPage() {
  return (
    <>
      <WhoWeAreSection />
      <section className="w-full flex justify-center px-4 lg:px-10 xl:px-[134px] py-16">
        <div className="w-full max-w-[1300px] bg-[#FFE5E6] rounded-2xl px-8 py-12 flex flex-col items-center">
          <span className="text-[#FF0854] text-[24px] leading-[26px] font-medium mb-1">
            Our Story
          </span>
          <h2 className="text-3xl leading-[38px] md:text-5xl md:leading-[60px] font-bold text-center text-[#202020]  mb-6">
            How LovedIn Started
          </h2>
          <p className="text-lg md:text-[22px] md:leading-[34px] text-[#202020] max-w-5xl mx-auto text-center">
            LovedIn was born from a personal journey. After spending over a year single and searching for a life partner, I experienced firsthand how exhausting and discouraging modern dating can be. Endless swiping, shallow conversations, and uncertainty about who people really are made an already emotional process even harder. That experience inspired the creation of LovedIn  a platform designed to make finding meaningful connections less painful and far more intentional.
          </p>
        </div>
      </section>

      {/* <WhyChooseUsSection /> */}
      {/* <OurMembersSection /> */}

      <section className="w-full flex justify-center py-12 px-4 lg:px-10 xl:px-[134px]">
        <div className="w-full max-w-[1300px]  flex flex-col-reverse  lg:flex-row items-stretch gap-10 text-center lg:text-left mx-auto">
          {/* Right: Image */}
          <div className="flex-1 flex items-center justify-center 2xl:max-w-3xl">
            <div className="w-full p-2 flex items-center justify-center">
              <Image
                src="/images/whatmake.png"
                alt="Couple walking on the beach"
                width={420}
                height={350}
                className="object-cover rounded-2xl w-full h-full"
              />
            </div>
          </div>
          {/* Left: Text Content */}
          <div className="flex-1 flex flex-col 2xl:max-w-3xl xl:justify-center">

            <h2 className="text-3xl leading-[38px] md:text-5xl md:leading-[60px] font-bold text-[#202020] mb-3">
              What Makes Us Different
            </h2>
            <p className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020] tracking-[0] 1xl:pr-16 mb-2">
              Unlike traditional dating apps, LovedIn combines professional integrity with verified authenticity. Our one-time identity verification and live photo checks ensure that the people you meet are real, intentional, and serious about building meaningful relationships. This added layer of trust creates a higher-quality community  one where respect and transparency are the standard, not the exception.
            </p>
            <p className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020] tracking-[0] 1xl:pr-16 mb-6">
              We&apos;re not here to keep you endlessly scrolling. We&apos;re here to help you build connections that last  in an environment that feels as secure, respectful, and professional as the rest of your life.
            </p>

          </div>

        </div>
      </section>
      <BannerMessageSection />
    </>
  );
}
