"use client";

export default function TermsAndConditionsPage() {
    return (
        <div className="w-full flex justify-center px-4 lg:px-10 xl:px-[134px] py-16">
            <div className="w-full max-w-[1300px]">
                {/* Header Section */}
                {/* <div className="bg-[#FFE5E6] rounded-2xl px-8 py-12 flex flex-col items-center mb-10">
                    <h1 className="text-3xl leading-[38px] md:text-5xl md:leading-[60px] font-bold text-center text-[#202020] mb-3">
                        Terms of Service & User Agreement
                    </h1>
                    <p className="text-lg md:text-[22px] md:leading-[34px] text-[#FF0854] font-medium text-center">
                        Effective Date: January 13, 2026
                    </p>
                </div> */}

                {/* Content Section */}
                <div className="space-y-8">
                    {/* Introduction */}
                    <div className="space-y-4">
                        <p className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                            Welcome to LovedIn. These Terms of Service and User Agreement (<strong className="font-semibold">Terms</strong>) govern your
                            access to and use of the LovedIn website, mobile application, and related services
                            (collectively, the <strong className="font-semibold">Services</strong>).
                        </p>

                        <p className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                            By accessing or using LovedIn, you agree to be bound by these <strong className="font-semibold">Terms</strong>. If you do not
                            agree, do not use the <strong className="font-semibold">Services</strong>.
                        </p>
                    </div>

                    {/* 1. Eligibility */}
                    <section className="space-y-4">
                        <h2 className="text-2xl leading-[32px] md:text-4xl md:leading-[48px] font-bold text-[#202020]">
                            Eligibility
                        </h2>
                        <p className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">You must:</p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            {[
                                "Be at least 18 years old",
                                "Provide accurate and truthful information",
                                "Comply with all applicable laws"
                            ].map((item, index) => (
                                <li key={index} className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <p className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                            LovedIn reserves the right to suspend or terminate accounts that violate these requirements.
                        </p>
                    </section>

                    {/* 2. Account Registration & Responsibilities */}
                    <section className="space-y-4">
                        <h2 className="text-2xl leading-[32px] md:text-4xl md:leading-[48px] font-bold text-[#202020]">
                            Account Registration & Responsibilities
                        </h2>
                        <p className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">You are responsible for:</p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            {[
                                "Maintaining the confidentiality of your login credentials",
                                "All activity occurring under your account",
                                "Ensuring your profile information is accurate"
                            ].map((item, index) => (
                                <li key={index} className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <p className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                            LovedIn is not responsible for unauthorized access caused by user negligence.
                        </p>
                    </section>

                    {/* 3. User Conduct */}
                    <section className="space-y-4">
                        <h2 className="text-2xl leading-[32px] md:text-4xl md:leading-[48px] font-bold text-[#202020]">
                            User Conduct
                        </h2>
                        <p className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">You agree <strong className="font-semibold">not</strong> to:</p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            {[
                                "Impersonate another person",
                                "Create fake or misleading profiles",
                                "Harass, abuse, stalk, or harm others",
                                "Upload unlawful, explicit, or hateful content",
                                "Use LovedIn for commercial solicitation",
                                "Attempt to reverse engineer or manipulate the platform"
                            ].map((item, index) => (
                                <li key={index} className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <p className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                            Violation may result in <strong className="font-semibold">immediate suspension or termination</strong>, with or without notice.
                        </p>
                    </section>

                    {/* 4. User Content & License */}
                    <section className="space-y-4">
                        <h2 className="text-2xl leading-[32px] md:text-4xl md:leading-[48px] font-bold text-[#202020]">
                            User Content & License
                        </h2>
                        <p className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                            You retain ownership of content you upload (photos, text, messages).
                        </p>
                        <p className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                            By using LovedIn, you grant LovedIn a:
                        </p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020] font-semibold">
                                Worldwide
                            </li>
                            <li className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020] font-semibold">
                                Non-exclusive
                            </li>
                            <li className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020] font-semibold">
                                Royalty-free
                            </li>
                            <li className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020] font-semibold">
                                Transferable license
                            </li>
                        </ul>
                        <p className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                            to host, display, modify, and distribute your content solely for operating and improving the Services.
                        </p>
                    </section>

                    {/* 5. AI-Assisted Matching & No Guarantees */}
                    <section className="space-y-4">
                        <h2 className="text-2xl leading-[32px] md:text-4xl md:leading-[48px] font-bold text-[#202020]">
                            AI-Assisted Matching & No Guarantees
                        </h2>
                        <p className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                            LovedIn uses automated systems and AI-assisted tools to:
                        </p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            {[
                                "Recommend matches",
                                "Rank or suggest profiles",
                                "Detect fraud or misuse"
                            ].map((item, index) => (
                                <li key={index} className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <p className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020] font-semibold">Important disclosures:</p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                                Matches are <strong className="font-semibold">not guaranteed</strong>
                            </li>
                            <li className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                                Compatibility outcomes are subjective
                            </li>
                            <li className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                                LovedIn does <strong className="font-semibold">not guarantee relationships, dates, or results</strong>
                            </li>
                        </ul>
                    </section>

                    {/* 6. Optional Account Verification */}
                    <section className="space-y-4">
                        <h2 className="text-2xl leading-[32px] md:text-4xl md:leading-[48px] font-bold text-[#202020]">
                            Optional Account Verification (Paid Feature)
                        </h2>
                        <p className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                            LovedIn offers optional paid account verification.
                        </p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                                Verification does <strong className="font-semibold">not</strong> guarantee authenticity of other users
                            </li>
                            <li className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                                Verification status reflects completion of a verification process at a point in time
                            </li>
                            <li className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                                LovedIn may revoke verification if misuse or fraud is detected
                            </li>
                        </ul>
                        <p className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                            Verification services may be provided through trusted third-party vendors.
                        </p>
                    </section>

                    {/* 7. Subscriptions & Payments */}
                    <section className="space-y-4">
                        <h2 className="text-2xl leading-[32px] md:text-4xl md:leading-[48px] font-bold text-[#202020]">
                            Subscriptions & Payments
                        </h2>
                        <p className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                            LovedIn may offer paid subscriptions that provide premium features.
                        </p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            {[
                                "Subscription pricing and features are disclosed at purchase",
                                "Payments are processed via third-party payment providers",
                                "Subscriptions may renew automatically unless canceled"
                            ].map((item, index) => (
                                <li key={index} className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <p className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                            Users are responsible for managing subscriptions through their platform (App Store, Google Play, or website).
                        </p>
                    </section>

                    {/* 8. Refund Policy */}
                    <section className="space-y-4">
                        <h2 className="text-2xl leading-[32px] md:text-4xl md:leading-[48px] font-bold text-[#202020]">
                            Refund Policy (Good-Faith & Discretionary)
                        </h2>
                        <p className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                            LovedIn aims to provide a high-quality user experience and may issue refunds <strong className="font-semibold">at its discretion</strong>, including for:
                        </p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            {[
                                "Technical issues preventing feature access",
                                "Accidental duplicate charges",
                                "Exceptional customer service circumstances"
                            ].map((item, index) => (
                                <li key={index} className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <p className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020] font-semibold">Important terms:</p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                                Verification fees may be <strong className="font-semibold">non-refundable once the verification process begins</strong>
                            </li>
                            <li className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                                Partial refunds may be issued when appropriate
                            </li>
                            <li className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                                Refund eligibility does <strong className="font-semibold">not</strong> create an obligation for future refunds
                            </li>
                        </ul>
                        <p className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                            Refund requests must be submitted through customer support.
                        </p>
                    </section>

                    {/* 9. Account Suspension & Termination */}
                    <section className="space-y-4">
                        <h2 className="text-2xl leading-[32px] md:text-4xl md:leading-[48px] font-bold text-[#202020]">
                            Account Suspension & Termination
                        </h2>
                        <p className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                            LovedIn may suspend or terminate your account if you:
                        </p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            {[
                                "Violate these Terms",
                                "Engage in harmful or abusive behavior",
                                "Create legal or reputational risk"
                            ].map((item, index) => (
                                <li key={index} className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <p className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                            Termination may result in loss of access to content or features, without refund, except where required by law.
                        </p>
                    </section>

                    {/* 10. Disclaimers */}
                    <section className="space-y-4">
                        <h2 className="text-2xl leading-[32px] md:text-4xl md:leading-[48px] font-bold text-[#202020]">
                            Disclaimers
                        </h2>
                        <p className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                            LovedIn is provided <strong className="font-semibold">&quot;as is&quot;</strong> and <strong className="font-semibold">&quot;as available.&quot;</strong>
                        </p>
                        <p className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                            We disclaim all warranties, including:
                        </p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            {[
                                "Fitness for a particular purpose",
                                "Accuracy of matches or profiles",
                                "Continuous or error-free service"
                            ].map((item, index) => (
                                <li key={index} className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </section>

                    {/* 11. Limitation of Liability */}
                    <section className="space-y-4">
                        <h2 className="text-2xl leading-[32px] md:text-4xl md:leading-[48px] font-bold text-[#202020]">
                            Limitation of Liability
                        </h2>
                        <p className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                            To the maximum extent permitted by law, LovedIn shall not be liable for:
                        </p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            {[
                                "Indirect or consequential damages",
                                "Emotional distress or personal outcomes",
                                "User interactions or offline conduct"
                            ].map((item, index) => (
                                <li key={index} className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <p className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                            Total liability shall not exceed the amount paid to LovedIn in the last 12 months.
                        </p>
                    </section>

                    {/* 12. Mandatory Arbitration & Class Action Waiver */}
                    <section className="space-y-4">
                        <h2 className="text-2xl leading-[32px] md:text-4xl md:leading-[48px] font-bold text-[#202020]">
                            Mandatory Arbitration & Class Action Waiver
                        </h2>
                        <p className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020] font-semibold">
                            PLEASE READ CAREFULLY.
                        </p>
                        <p className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                            Any dispute arising out of or relating to these Terms or the Services shall be resolved by <strong className="font-semibold">binding arbitration</strong>, not in court.
                        </p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            {[
                                "Arbitration will be conducted in the United States",
                                "You waive the right to participate in class actions",
                                "Claims must be brought individually"
                            ].map((item, index) => (
                                <li key={index} className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <p className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                            This does not prevent users from seeking relief in small claims court where applicable.
                        </p>
                    </section>

                    {/* 13. Governing Law */}
                    <section className="space-y-4">
                        <h2 className="text-2xl leading-[32px] md:text-4xl md:leading-[48px] font-bold text-[#202020]">
                            Governing Law
                        </h2>
                        <p className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                            These <strong className="font-semibold">Terms</strong> are governed by the laws of the <strong className="font-semibold">State of Georgia</strong>, without regard to conflict-of-law principles.
                        </p>
                    </section>

                    {/* 14. Changes to These Terms */}
                    <section className="space-y-4">
                        <h2 className="text-2xl leading-[32px] md:text-4xl md:leading-[48px] font-bold text-[#202020]">
                            Changes to These Terms
                        </h2>
                        <p className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                            LovedIn may update these Terms at any time. Continued use after updates constitutes acceptance.
                        </p>
                    </section>

                    {/* 15. Contact Information */}
                    <section className="space-y-4">
                        <h2 className="text-2xl leading-[32px] md:text-4xl md:leading-[48px] font-bold text-[#202020]">
                            Contact Information
                        </h2>
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
