import Image from "next/image";
import { FaqQuestionCard } from "../components/FaqQuestionCard";

const faqData = [
  {
    q: "Can I use LovedIn for free?",
    a: "Yes! Our free plan lets you explore profiles and enjoy basic features.",
  },
  {
    q: "Can I cancel my subscription anytime?",
    a: "Absolutely! You can cancel your subscription whenever you&apos;d like.",
  },
  {
    q: "Do premium users get verified faster?",
    a: "Yes, premium users receive priority in the verification queue.",
  },
  {
    q: "Is my payment information secure?",
    a: "Yes! We use industry-standard encryption to keep your data safe.",
  },
  {
    q: "Do premium users get verified faster?",
    a: "Yes, premium users receive faster account verification.",
  },
];

export default function FaqSection() {
  return (
    <div className="w-full bg-[#FFE5E6] py-12 px-4 lg:px-10 xl:px-[134px]">
      <div className="max-w-[1300px] mx-auto grid md:grid-cols-2 gap-8 items-center">
        {/* Left Content */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 mb-6">
            Got Questions? We&apos;ve Got Answers.
          </p>

          <div className="space-y-3">
            {faqData.map((item, index) => (
              <FaqQuestionCard key={index} question={item.q} answer={item.a} />
            ))}
          </div>
        </div>

        {/* Right Image */}
        <div className="flex justify-center md:justify-end">
          <Image
            src="/images/girl_using_mobile.png"
            alt="FAQ image"
            width={400}
            height={600}
            className="rounded-3xl w-full max-w-sm shadow-md object-cover"
          />
        </div>
      </div>
    </div>
  );
}
