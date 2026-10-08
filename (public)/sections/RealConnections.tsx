import Image from "next/image";
import Link from "next/link";

export default function RealConnections() {
  return (
    <section className="bg-[#FFF6F6] py-12 w-full px-4 lg:px-10 xl:px-[134px]">
      <div className="mx-auto max-w-[1300px]">
        <div className="flex flex-col lg:flex-row gap-2 xl:gap-8 items-center">
          {/* Left: text */}
          <div className="px-4 lg:p-0 lg:pr-10 xl:pr-26 w-full lg:w-1/2">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-extrabold text-[#111827] leading-tight">
              Designed to Build Real Connections Not Just Matches
            </h2>
            <p className="mt-6 text-sm sm:text-base md:text-lg text-[#374151] max-w-prose">
              LovedIn isn’t just another dating app — it’s a platform built for
              meaningful connections. Whether you’re looking for love,
              companionship, or friendship, LovedIn helps you meet people who
              truly match your personality and lifestyle.
            </p>
            <p className="mt-4 text-sm sm:text-base md:text-lg text-[#374151] max-w-prose">
              With a beautifully intuitive design, smart recommendations, and a
              safe space to interact, every conversation feels natural and
              genuine.
            </p>
            <div className="mt-8">
              <Link
                href="/signup"
                className="inline-block bg-[#FF0854] text-white px-6 py-3 rounded-full text-sm sm:text-base font-medium"
              >
                Sign up
              </Link>
            </div>
          </div>

          {/* Right: decorative images (Commented out as requested) */}
          {/* 
          <div className="w-full lg:w-1/2 flex flex-col md:flex-row md:justify-around lg:h-[540px] items-center lg:items-stretch gap-0 relative lg:pt-8">
            <div className="flex justify-center lg:justify-start">
              <div
                className="w-[180px] h-[250px] sm:w-[220px] sm:h-80 md:w-60 md:h-[350px] lg:w-52 lg:h-[335px] xl:w-[245px] xl:h-[365px]
      rounded-tl-[110px] rounded-tr-[110px] rounded-bl-[160px] sm:rounded-tl-[140px] sm:rounded-tr-[140px] sm:rounded-bl-[200px] 
      lg:rounded-tl-[160px] lg:rounded-tr-[160px] lg:rounded-bl-[240px] bg-[#FFA1BE] shadow-md relative"
              >
                <Image
                  src="/images/couples_2.png"
                  alt=""
                  fill
                  className="object-cover"
                  priority
                  draggable={false}
                />
                <div className="absolute -right-14 top-8 md:-right-20 md:top-20 bg-white border border-[#FFA1BE] text-xs sm:text-sm rounded-full rounded-br-none px-3 sm:px-4 py-1 shadow-sm z-10 whitespace-nowrap">
                  Lasting Love
                </div>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end align-bottom">
              <div
                className="w-[180px] h-[250px] sm:w-[220px] sm:h-80 md:w-60 md:h-[350px] lg:w-52 lg:h-[335px] xl:w-[245px] xl:h-[365px] 
      rounded-tl-[110px] rounded-tr-[110px] rounded-br-[160px] sm:rounded-tl-[140px] sm:rounded-tr-[140px] sm:rounded-br-[200px] 
      lg:rounded-tl-[160px] lg:rounded-tr-[160px] lg:rounded-br-[240px] bg-[#FF0854] shadow-md relative mt-auto"
              >
                <Image
                  src="/images/couples_1.png"
                  alt=""
                  fill
                  className="object-cover"
                  priority
                  draggable={false}
                />
                <div className="absolute -left-16 bottom-2 md:-left-24 md:bottom-3 bg-white border border-[#FF0854] text-xs sm:text-sm rounded-full rounded-bl-none px-3 sm:px-4 py-1 shadow-sm whitespace-nowrap">
                  Deep Connections
                </div>
              </div>
            </div>
          </div> 
          */}

          {/* New Image Replacement: Precise fit with rounded corners */}
          <div className="w-full lg:w-1/2 flex items-center justify-center lg:justify-end mt-12 lg:mt-0 px-4 sm:px-0">
            <div className="relative w-full max-w-[800px] rounded-lg sm:rounded-xl overflow-hidden shadow-2xl border border-white/20 transition-all duration-700 hover:scale-[1.02] hover:shadow-[0_20px_50px_rgba(255,8,84,0.2)]">
              <Image
                src="/images/Lovedin_build_connections_image.png"
                alt="Build real connections"
                width={1200}
                height={675}
                className="w-full h-auto"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
