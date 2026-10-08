import Image from "next/image";
import Link from "next/link";

export default function BannerMessageSection() {
  return (
    <section className="w-full relative min-h-[253px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/red_bg_hearts.png"
          alt="Hearts background"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-6 px-4 py-12 text-center">
        <h2 className="text-3xl md:text-[40px] lg:text-[60px] xl:text-[70px] font-extrabold text-white leading-[34px] md:leading-11 lg:leading-16 xl:leading-[71px] max-w-4xl tracking-[0]">
          Join our community and
          <br />
          meet your partner
        </h2>

        <Link
          href="/signup"
          className="w-[138px] h-[46px] md:w-[161px] md:h-12 bg-white rounded-full flex items-center justify-center text-[#202020]   text-[16px] md:text-lg font-bold shadow-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 active:scale-95"
        >
          Get the App
        </Link>
      </div>
    </section>
  );
}
