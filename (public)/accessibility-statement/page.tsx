"use client";

export default function AccessibilityStatementPage() {
    return (
        <div className="w-full flex justify-center px-4 lg:px-10 xl:px-[134px] py-16">
            <div className="w-full max-w-[1300px]">
                {/* Content Section */}
                <div className="space-y-8">
                    <p className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                        LovedIn (&quot;<strong className="font-semibold">LovedIn</strong>,&quot; &quot;<strong className="font-semibold">we</strong>,&quot; &quot;<strong className="font-semibold">us</strong>,&quot; or &quot;<strong className="font-semibold">our</strong>&quot;) is committed to providing an accessible and
                        inclusive experience for all users, including individuals with disabilities.
                    </p>

                    <p className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                        This Accessibility Statement applies to the LovedIn website, mobile application, and related
                        services (collectively, the &quot;<strong className="font-semibold">Services</strong>&quot;).
                    </p>

                    {/* Our Commitment to Accessibility */}
                    <section className="space-y-4">
                        <h2 className="text-2xl leading-[32px] md:text-4xl md:leading-[48px] font-bold text-[#202020]">
                            Our Commitment to Accessibility
                        </h2>
                        <p className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                            We strive to ensure that LovedIn&apos;s Services are accessible to everyone and are designed with
                            usability and inclusivity in mind. Our goal is to provide a platform that can be accessed and used
                            by the widest possible audience, regardless of ability.
                        </p>
                    </section>

                    {/* Accessibility Standards */}
                    <section className="space-y-4">
                        <h2 className="text-2xl leading-[32px] md:text-4xl md:leading-[48px] font-bold text-[#202020]">
                            Accessibility Standards
                        </h2>
                        <p className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                            LovedIn makes reasonable efforts to align with:
                        </p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                                <strong className="font-semibold">Web Content Accessibility Guidelines (WCAG) 2.1</strong>, Level AA
                            </li>
                            <li className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                                Applicable provisions of the <strong className="font-semibold">Americans with Disabilities Act (ADA)</strong>
                            </li>
                        </ul>
                        <p className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                            Accessibility considerations may include:
                        </p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            {[
                                "Readable text and sufficient color contrast",
                                "Keyboard navigation support",
                                "Compatibility with screen readers and assistive technologies",
                                "Clear and consistent navigation"
                            ].map((item, index) => (
                                <li key={index} className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </section>

                    {/* Ongoing Improvements */}
                    <section className="space-y-4">
                        <h2 className="text-2xl leading-[32px] md:text-4xl md:leading-[48px] font-bold text-[#202020]">
                            Ongoing Improvements
                        </h2>
                        <p className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                            Accessibility is an ongoing effort. We regularly review our Services and work to identify and
                            address accessibility barriers as technology and standards evolve.
                        </p>
                        <p className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                            Due to the dynamic nature of digital platforms, some content or features may <strong className="font-semibold">not yet be fully accessible</strong>. We are <strong className="font-semibold">committed to making reasonable improvements over time</strong>.
                        </p>
                    </section>

                    {/* Third-Party Content */}
                    <section className="space-y-4">
                        <h2 className="text-2xl leading-[32px] md:text-4xl md:leading-[48px] font-bold text-[#202020]">
                            Third-Party Content
                        </h2>
                        <p className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                            Some features or content within LovedIn may be provided by third-party services (such as
                            payment processors or verification providers). While we encourage accessibility compliance
                            from our partners, <strong className="font-semibold">we cannot guarantee the accessibility of third-party content</strong>.
                        </p>
                    </section>

                    {/* Feedback & Assistance */}
                    <section className="space-y-4">
                        <h2 className="text-2xl leading-[32px] md:text-4xl md:leading-[48px] font-bold text-[#202020]">
                            Feedback & Assistance
                        </h2>
                        <p className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                            If you experience difficulty accessing any part of LovedIn or have suggestions to improve
                            accessibility, we encourage you to contact us.
                        </p>
                        <p className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                            We will make reasonable efforts to respond and provide assistance.
                        </p>
                        <p className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                            <span className="font-bold">Email:</span> Info@TechHubInnovation.com
                        </p>
                        <p className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                            <span className="font-bold">Website:</span> www.lovedin.net
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
