"use client";

export default function PrivacyChoicesPage() {
    return (
        <div className="w-full flex justify-center px-4 lg:px-10 xl:px-[134px] py-16">
            <div className="w-full max-w-[1300px]">
                {/* Content Section */}
                <div className="space-y-8">
                    <p className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                        LovedIn (&quot;<strong className="font-semibold">LovedIn</strong>,&quot; &quot;<strong className="font-semibold">we</strong>,&quot; &quot;<strong className="font-semibold">us</strong>,&quot; or &quot;<strong className="font-semibold">our</strong>&quot;) respects your privacy rights and is committed to
                        transparency regarding how personal information is handled.
                    </p>

                    <p className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                        This page explains your rights under applicable U.S. privacy laws, including the <strong className="font-semibold">California Consumer Privacy Act (CCPA)</strong> and the <strong className="font-semibold">California Privacy Rights Act (CPRA)</strong>.
                    </p>

                    {/* 1. Do We Sell or Share Personal Information? */}
                    <section className="space-y-4">
                        <h2 className="text-2xl leading-[32px] md:text-4xl md:leading-[48px] font-bold text-[#202020]">
                            Do We Sell or Share Personal Information?
                        </h2>
                        <p className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                            LovedIn does <strong className="font-semibold">not sell</strong> your personal information in exchange for money.
                        </p>
                        <p className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                            We may <strong className="font-semibold">share limited personal information</strong> with trusted service providers (such as payment
                            processors, verification vendors, analytics providers, and cloud services) <strong className="font-semibold">solely to operate and
                                improve our Services</strong>, as permitted by law.
                        </p>
                        <p className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                            Such sharing is <strong className="font-semibold">not considered a &quot;sale&quot;</strong> under CCPA/CPRA when conducted under appropriate
                            contractual safeguards.
                        </p>
                    </section>

                    {/* 2. Your Right to Opt Out */}
                    <section className="space-y-4">
                        <h2 className="text-2xl leading-[32px] md:text-4xl md:leading-[48px] font-bold text-[#202020]">
                            Your Right to Opt Out
                        </h2>
                        <p className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                            Even though LovedIn does not sell personal information, you have the right to:
                        </p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                                Opt out of the <strong className="font-semibold">sale or sharing</strong> of personal information
                            </li>
                            <li className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                                Limit the use of sensitive personal information (where applicable)
                            </li>
                        </ul>
                        <p className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                            We honor these rights for <strong className="font-semibold">all users</strong>, regardless of state or country of residence.
                        </p>
                    </section>

                    {/* 3. Categories of Information Covered */}
                    <section className="space-y-4">
                        <h2 className="text-2xl leading-[32px] md:text-4xl md:leading-[48px] font-bold text-[#202020]">
                            Categories of Information Covered
                        </h2>
                        <p className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                            This page applies to personal information such as:
                        </p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            {[
                                "Identifiers (e.g., email address, username)",
                                "Profile data and preferences",
                                "Usage and interaction data",
                                "Device and technical information",
                                "Verification status metadata (not raw ID images)"
                            ].map((item, index) => (
                                <li key={index} className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <p className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                            For full details, please review our <strong className="font-semibold">Privacy Policy</strong>.
                        </p>
                    </section>

                    {/* 4. How to Submit a Request */}
                    <section className="space-y-4">
                        <h2 className="text-2xl leading-[32px] md:text-4xl md:leading-[48px] font-bold text-[#202020]">
                            How to Submit a Request
                        </h2>
                        <p className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                            You may submit a request to opt out or inquire about data practices by:
                        </p>
                        <p className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                            <span className="font-bold">Email:</span> Info@TechHubInnovation.com
                        </p>
                        <p className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                            <span className="font-bold">Subject Line:</span> &quot;Do Not Sell or Share My Personal Information&quot;
                        </p>
                        <p className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                            We may need to verify your identity before processing your request.
                        </p>
                    </section>

                    {/* 5. Authorized Agents */}
                    <section className="space-y-4">
                        <h2 className="text-2xl leading-[32px] md:text-4xl md:leading-[48px] font-bold text-[#202020]">
                            Authorized Agents
                        </h2>
                        <p className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                            You may designate an authorized agent to submit a request on your behalf. Proof of
                            authorization may be required.
                        </p>
                    </section>

                    {/* 6. Non-Discrimination */}
                    <section className="space-y-4">
                        <h2 className="text-2xl leading-[32px] md:text-4xl md:leading-[48px] font-bold text-[#202020]">
                            Non-Discrimination
                        </h2>
                        <p className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                            LovedIn will <strong className="font-semibold">not discriminate</strong> against you for exercising your privacy rights. This means we
                            will not:
                        </p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            {[
                                "Deny services",
                                "Charge different prices",
                                "Provide a different level or quality of service"
                            ].map((item, index) => (
                                <li key={index} className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <p className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                            except as permitted by law.
                        </p>
                    </section>

                    {/* 7. Global Users */}
                    <section className="space-y-4">
                        <h2 className="text-2xl leading-[32px] md:text-4xl md:leading-[48px] font-bold text-[#202020]">
                            Global Users
                        </h2>
                        <p className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                            Although this page is designed to meet California requirements, LovedIn applies these
                            protections <strong className="font-semibold">globally</strong> as part of our commitment to privacy and transparency.
                        </p>
                    </section>

                    {/* 8. Updates to This Page */}
                    <section className="space-y-4">
                        <h2 className="text-2xl leading-[32px] md:text-4xl md:leading-[48px] font-bold text-[#202020]">
                            Updates to This Page
                        </h2>
                        <p className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                            We may update this page periodically. Changes will be reflected by the &quot;Last Updated&quot; date
                            above.
                        </p>
                    </section>

                    {/* 9. Contact Us */}
                    <section className="space-y-4">
                        <h2 className="text-2xl leading-[32px] md:text-4xl md:leading-[48px] font-bold text-[#202020]">
                            Contact Us
                        </h2>
                        <p className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                            If you have questions about this page or your privacy rights:
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
