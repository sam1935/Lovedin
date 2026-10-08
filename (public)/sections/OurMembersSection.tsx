import Image from "next/image";

const members = [
  {
    name: "Olivia Brooks",
    role: "Head of Product Design",
    image: "/images/members/member_1.png",
  },
  {
    name: "Ethan Mitchel",
    role: "Lead Software Engineer",
    image: "/images/members/member_2.png",
  },
  {
    name: "Sophia Hayes",
    role: "Community & Trust Manager",
    image: "/images/members/member_3.png",
  },
  {
    name: "Liam Parker",
    role: "Marketing & Brand Director",
    image: "/images/members/member_4.png",
  },
  {
    name: "Chloe Bennett",
    role: "Customer Experience Lead",
    image: "/images/members/member_5.png",
  },
  {
    name: "Mason Cooper",
    role: "Data & Relationship Insights Lead",
    image: "/images/members/member_6.png",
  },
];

export default function OurMembersSection() {
  return (
    <section className="w-full flex flex-col items-center px-4 lg:px-10 xl:px-[134px]  py-16">
      <div className="w-full max-w-[1300px] mx-auto">
        <span className="text-[#FF0854] text-[24px] leading-[26px] font-semibold block text-center mb-2">
          Our Members
        </span>
        <h2 className="text-3xl leading-[38px] md:text-5xl md:leading-[60px] font-bold text-center text-[#202020] mb-10">
          The Hearts Behind LovedIn
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {members.map((m) => (
            <div key={m.name} className="flex flex-col items-center">
              <div className="w-[220px] h-[218px] md:w-[278px] md:h-[276px] lg:w-[310px] lg:h-[308px] xl:w-[346px] xl:h-[344px] 2xl:w-[376px] 2xl:h-[374px] overflow-hidden mb-4">
                <Image
                  src={m.image}
                  alt={m.name}
                  width={376}
                  height={374}
                  className="object-cover w-full h-full"
                  priority
                />
              </div>
              <div className="w-full text-center">
                <h3 className="text-lg leading-5 md:text-xl md:leading-[34px] font-bold text-[#000000] mb-1">
                  {m.name}
                </h3>
                <p className="text-base leading-[18px] md:text-[18px] md:leading-[23px] text-[#000000]">
                  {m.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
