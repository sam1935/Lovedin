import Image from "next/image";

const features = [
  {
    title: "Authentic Profiles",
    desc: "Every account is verified for trust and safety.",
  },
  {
    title: "Smart Matchmaking",
    desc: "",
  },
  {
    title: "Privacy First",
    desc: "",
  },
  {
    title: "Inclusive Platform",
    desc: "",
  },
];

export default function WhyChooseUsSection() {
  return (
    <section className="w-full relative flex justify-center items-center px-0 py-16 md:py-20">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full ">
        <Image
          src="/images/couple_img_bg.png"
          alt="Couple on the beach background"
          fill
          priority
          className="object-cover object-left md:object-center w-full h-full"
        />
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* Card Content */}
      <div className="w-full max-w-[1300px] flex flex-col md:flex-row items-center justify-end md:px-8 z-10 px-4 lg:px-10">
        <div
          className="w-full md:w-[532px] rounded-2xl shadow-lg p-6 md:p-8 flex flex-col gap-2 md:ml-auto md:mr-0"
          style={{
            background:
              "linear-gradient(45.16deg, #FFF8F8 13.76%, #FFF8F8 95.96%)",
          }}
        >
          <h2 className="text-2xl md:text-3xl lg:text-[40px] lg:leading-12 font-bold text-[#202020] mb-2 tracking-[0]">
            Why People Choose LovedIn
          </h2>
          <p className="text-base md:text-lg lg:text-[22px] md:leading-8 text-[#202020] mb-2 tracking-[0] font-normal">
            LovedIn stands out by making dating authentic and meaningful, Not
            just another swipe game.
          </p>
          <ul className="flex flex-col gap-4">
            {features.map((f, i) => (
              <li
                key={f.title}
                className="pb-4 border-b last:border-b-0 border-[#E5E5E5]"
              >
                <div className="flex items-start gap-3">
                  <span className="text-lg md:text-xl font-bold text-[#20202080] min-w-8">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <span className="text-lg leading-6 md:text-[22px] md:leading-8 font-semibold text-[#202020]">
                      {f.title}
                    </span>
                    {f.desc && (
                      <div className="text-base md:text-lg leading-5 md:leading-[25px] text-[#202020] mt-1">
                        {f.desc}
                      </div>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
