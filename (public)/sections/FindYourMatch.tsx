import Image from "next/image";

type Feature = {
  icon: string;
  title: string;
  description: string;
  variant: "primary" | "secondary";
};

const features: Feature[] = [
  {
    icon: "user_verified",
    title: "Verified Profiles",
    description: "Ensuring authenticity and trust.",
    variant: "primary",
  },
  {
    icon: "swipe_left",
    title: "Swipe & Match",
    description: "Fun, quick, and interactive discovery.",
    variant: "secondary",
  },
  {
    icon: "real_time_chat",
    title: "Real-Time Chat",
    description: "Text, stickers, voice, and video — all in one app.",
    variant: "secondary",
  },
  {
    icon: "stories_create",
    title: "Stories & Daily Updates",
    description: "Share your life moments and connect deeper.",
    variant: "secondary",
  },
  {
    icon: "socialize_activity",
    title: "Socialize and do activities",
    description: "Attend events, and find activity partners.",
    variant: "secondary",
  },
  {
    icon: "privacy_control",
    title: "Privacy Control",
    description: "Decide who sees your profile and when.",
    variant: "secondary",
  },
];

export default function FindYourMatch() {
  return (
    <section className="w-full relative  py-16 px-4 lg:px-10 xl:px-[134px] bg-[#FFF9F9] overflow-hidden">
      <div className="max-w-[1300px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-6 lg:gap-10 items-center">
          {/* Left side - Content */}
          <div className="flex flex-col gap-8">
            <h2 className="text-3xl md:text-4xl lg:text-4xl font-bold text-[#202020] leading-[60px]">
              Why LovedIn?
            </h2>

            {/* Grid feature list */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <FeatureCard key={index} {...feature} />
              ))}
            </div>
          </div>

          {/* Right side - Image */}
          <div className="w-full  h-fit md:h-[500px] lg:h-[600px] flex items-center justify-center">
            <Image
              src="/images/couple.png"
              alt="Couple embracing in heart shape"
              width={700}
              height={700}
              className="object-contain rounded-2xl max-w-full max-h-full"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}

type FeatureCardProps = Feature;

function FeatureCard({ icon, title, description, variant }: FeatureCardProps) {
  const baseClasses =
    "flex items-center min-h-[90px] gap-3 p-4 rounded-2xl transition-all duration-300 hover:shadow-lg cursor-pointer group";
  const variantClasses =
    variant === "primary"
      ? "bg-[#FFE8EE] text-gray-900 hover:bg-gradient-to-br hover:from-[#FF0854] hover:to-[#EE686E]"
      : "bg-[#FFE8EE] text-gray-900 hover:bg-gradient-to-br hover:from-[#FF0854] hover:to-[#EE686E]";

  return (
    <div className={`${baseClasses} ${variantClasses}`}>
      <div className="shrink-0 text-pink-500 group-hover:text-white transition-colors duration-200">
        <Image
          src={`/icons/${icon}.svg`}
          alt={title}
          width={32}
          height={32}
          className="w-8 h-8 group-hover:brightness-0 group-hover:invert transition-all duration-200"
        />
      </div>

      <div className="flex flex-col gap-0.5">
        <h3 className="text-base md:text-[18px] lg:text-[20px] font-medium lg:leading-tight text-[#202020] group-hover:text-white transition-colors duration-200">
          {title}
        </h3>
        <p className="text-[13px] md:text-[14px] lg:text-[15px] text-[#615353] lg:leading-snug group-hover:text-white transition-colors duration-200">
          {description}
        </p>
      </div>
    </div>
  );
}
