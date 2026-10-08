import Image from "next/image";
import Link from "next/link";

export default function WhoWeAreSection() {
  return (
    <section className="w-full flex justify-center py-12 px-4 lg:px-10 xl:px-[134px]">
      <div className="w-full max-w-[1300px]  flex flex-col-reverse  lg:flex-row items-stretch gap-10 text-center lg:text-left mx-auto">
        {/* Left: Text Content */}
        <div className="flex-1 flex flex-col 2xl:max-w-3xl xl:justify-center">
          <span className="text-[#FF0854] text-[24px] leading-[26px] font-medium tracking-[0] py-1 pt-4">
            Who We Are
          </span>
          <h2 className="text-2xl md:text-[42px] md:leading-[50px] lg:text-[46px] lg:leading-[54px] font-bold text-[#202020] mb-2">
            More Than Matches,
            <br />
            We Build Meaningful Connections
          </h2>
          <p className="text-base leading-7 md:text-[22px] md:leading-[34px] text-[#202020] tracking-[0] 1xl:pr-16 mb-6">
            LovedIn goes beyond dating. We also offer a social and activity-based platform for those looking to connect through shared interests and experiences. Whether you&apos;re searching for a weekend getaway companion, a sports partner, or simply someone to explore a new hobby with, LovedIn makes it easy to discover people, plan activities, and join communities centered around what you love.
          </p>

          <Link
            href="/signup"
            className="w-[156px] h-[50px] bg-[#FF0854] text-white font-bold rounded-full  text-base md:text-lg shadow-md hover:bg-[#e0356d] transition-all duration-200 flex items-center justify-center mx-auto lg:mx-0"
          >
            Sign up{" "}
          </Link>
        </div>
        {/* Right: Image */}
        <div className="flex-1 flex items-center justify-center 2xl:max-w-3xl">
          <div className="w-full p-2 flex items-center justify-center">
            <Image
              src="/images/whowe.png"
              alt="Couple walking on the beach"
              width={420}
              height={380}
              className="object-cover rounded-2xl w-full h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
