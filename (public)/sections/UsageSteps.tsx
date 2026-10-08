import Image from "next/image";

type Step = {
  label: string;
  title: string;
  desc: string;
};

// Content (cards and images kept separate for a precise grid)
const steps: Step[] = [
  {
    label: "Step 01",
    title: "Create Your Profile",
    desc: "Add photos, interests, and what you're looking for.",
  },
  {
    label: "Step 02",
    title: "Discover Matches",
    desc: "Use filters or see who's nearby & start connecting.",
  },
  {
    label: "Step 03",
    title: "Start Chatting",
    desc: "Send messages, even video call your match",
  },
  {
    label: "Step 04",
    title: "Build a Connection",
    desc: "Let your story unfold — naturally and securely.",
  },
];

export default function UsageSteps() {
  return (
    <section className="w-full py-12 px-4 lg:px-10 xl:px-[134px] flex flex-col items-center bg-white">
      <div className="max-w-[1300px] mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-gray-900 leading-tight">
          Simple, Seamless, and
          <br />
          Truly Engaging
        </h2>

        <div className="w-full grid grid-cols-1 gap-y-4 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 sm:gap-y-3 lg:gap-y-0 items-stretch">
          {/* Column 1 (left) */}
          <div className="flex flex-col gap-6 lg:gap-6 sm:col-start-1 sm:row-start-1">
            <StepCard {...steps[0]} className="h-[184px]" />
            <ImageTile
              src="/images/couples_3.png"
              alt="Couple sitting by the water"
              className="h-[294px]"
            />
          </div>

          {/* Center: do NOT span rows on sm */}
          <div className="sm:col-start-2 sm:row-start-1 lg:col-start-2 lg:col-span-2 flex flex-col gap-6">
            <ImageTile
              src="/images/hands_img_1.png"
              alt="Couple holding hands at dinner"
              className="h-[290px]"
              priority
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <StepCard {...steps[1]} className="h-52" />
              <StepCard {...steps[2]} className="h-52" />
            </div>
          </div>

          {/* Column 4: row on sm, column on lg */}
          <div
            className="flex flex-col sm:flex-row lg:flex-col gap-6 lg:gap-6
                        sm:col-start-1 sm:row-start-3 sm:col-span-2
                        lg:col-start-4 lg:row-start-1 lg:col-span-1"
          >
            <StepCard
              {...steps[3]}
              className="h-[184px] sm:h-[184px] sm:flex-1 lg:flex-none"
            />
            <ImageTile
              src="/images/hands_img_2.png"
              alt="Couple exchanging flowers"
              className="h-[290px] sm:h-[184px] sm:flex-1 lg:flex-none lg:h-[305px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

type StepCardProps = Step & {
  className?: string;
};

function StepCard({ label, title, desc, className = "" }: StepCardProps) {
  return (
    <div
      className={`flex flex-col justify-between rounded-2xl h-[200px] p-3
         text-white shadow-lg ${className}`}
      style={{
        background: "linear-gradient(21.9deg, #FF0854 23.32%, #EE686E 93.29%)",
      }}
    >
      <div className="text-[22px] font-bold leading-[35px]">{label}</div>
      <div className="font-bold text-[20px] leading-[34px]">
        {title}
        <div className="text-[18px] mt-1 leading-[23px] font-normal">
          {desc}
        </div>
      </div>
    </div>
  );
}

type ImageTileProps = {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
};

function ImageTile({
  src,
  alt,
  className = "",
  priority = false,
}: ImageTileProps) {
  return (
    <div className={`rounded-2xl overflow-hidden shadow-lg ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={800}
        height={500}
        className="w-full h-full object-cover"
        priority={priority}
      />
    </div>
  );
}
