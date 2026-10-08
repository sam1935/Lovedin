"use client";

export default function CopyrightPolicyPage() {
    return (
        <div className="w-full flex justify-center px-4 lg:px-10 xl:px-[134px] py-16">
            <div className="w-full max-w-[1300px]">
                {/* Content Section */}
                <div className="space-y-8">
                    <p className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                        LovedIn (&quot;<strong className="font-semibold">LovedIn</strong>,&quot; &quot;<strong className="font-semibold">we</strong>,&quot; &quot;<strong className="font-semibold">us</strong>,&quot; or &quot;<strong className="font-semibold">our</strong>&quot;) respects the intellectual property rights of others and
                        expects users to do the same. This Copyright &amp; Content Policy explains how copyrighted content
                        is handled on the LovedIn platform and how to submit claims of infringement.
                    </p>

                    <p className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                        This policy applies to all content uploaded, posted, transmitted, or otherwise made available
                        through the LovedIn website, mobile application, and related services (collectively, the
                        &quot;<strong className="font-semibold">Services</strong>&quot;).
                    </p>

                    {/* 1. User-Generated Content Responsibility */}
                    <section className="space-y-4">
                        <h2 className="text-2xl leading-[32px] md:text-4xl md:leading-[48px] font-bold text-[#202020]">
                            User-Generated Content Responsibility
                        </h2>
                        <p className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                            LovedIn allows users to upload and share content, <strong className="font-semibold">including but not limited to:</strong>
                        </p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            {[
                                "Profile photos",
                                "Profile text and bios",
                                "Messages",
                                "Media and other materials"
                            ].map((item, index) => (
                                <li key={index} className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <p className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                            <strong className="font-semibold">You are solely responsible</strong> for ensuring that any content you upload:
                        </p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                                Is owned by you <strong className="font-semibold">or</strong>
                            </li>
                            <li className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                                You have the legal right, license, or permission to use and share it
                            </li>
                        </ul>
                        <p className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                            Uploading content without proper rights may result in content removal or account termination.
                        </p>
                    </section>

                    {/* 2. License Grant to LovedIn */}
                    <section className="space-y-4">
                        <h2 className="text-2xl leading-[32px] md:text-4xl md:leading-[48px] font-bold text-[#202020]">
                            License Grant to LovedIn
                        </h2>
                        <p className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                            By uploading or submitting content to LovedIn, you grant LovedIn a:
                        </p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            {[
                                "Worldwide",
                                "Non-exclusive",
                                "Royalty-free",
                                "Sublicensable",
                                "Transferable license"
                            ].map((item, index) => (
                                <li key={index} className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020] font-semibold">
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <p className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                            to host, store, display, reproduce, modify, adapt, and distribute your content <strong className="font-semibold">solely for the purpose of operating, improving, and promoting the Services</strong>, subject to your privacy
                            settings and applicable law.
                        </p>
                        <p className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                            This license ends when your content is deleted from the platform, except where retention is
                            required for legal, safety, or compliance purposes.
                        </p>
                    </section>

                    {/* 3. Copyright Infringement & DMCA Compliance */}
                    <section className="space-y-4">
                        <h2 className="text-2xl leading-[32px] md:text-4xl md:leading-[48px] font-bold text-[#202020]">
                            Copyright Infringement & DMCA Compliance
                        </h2>
                        <p className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                            LovedIn complies with the <strong className="font-semibold">Digital Millennium Copyright Act (DMCA)</strong> and responds promptly
                            to valid notices of alleged copyright infringement.
                        </p>
                        <p className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                            If you believe that content on LovedIn infringes your copyright, you may submit a <strong className="font-semibold">DMCA Takedown Notice</strong> including the following information:
                        </p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            {[
                                "A physical or electronic signature of the copyright owner or authorized agent",
                                "Identification of the copyrighted work claimed to have been infringed",
                                "Identification of the infringing material and its location on LovedIn",
                                "Your contact information (name, email address, phone number)",
                                "A statement that you have a good-faith belief the use is unauthorized",
                                "A statement, under penalty of perjury, that the information is accurate and that you are the copyright owner or authorized to act on their behalf"
                            ].map((item, index) => (
                                <li key={index} className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </section>

                    {/* 4. Designated DMCA Agent */}
                    <section className="space-y-4">
                        <h2 className="text-2xl leading-[32px] md:text-4xl md:leading-[48px] font-bold text-[#202020]">
                            Designated DMCA Agent
                        </h2>
                        <p className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                            DMCA notices should be sent to:
                        </p>
                        <p className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                            <span className="font-bold">Email:</span> Info@TechHubInnovation.com
                        </p>
                        <p className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                            <span className="font-bold">Subject Line:</span> <strong className="font-semibold">DMCA Takedown Request</strong>
                        </p>
                        <p className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                            LovedIn may request additional information to verify claims.
                        </p>
                    </section>

                    {/* 5. Counter-Notification Process */}
                    <section className="space-y-4">
                        <h2 className="text-2xl leading-[32px] md:text-4xl md:leading-[48px] font-bold text-[#202020]">
                            Counter-Notification Process
                        </h2>
                        <p className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                            If you believe content was removed in error, you may submit a <strong className="font-semibold">DMCA Counter-Notification</strong>
                            including:
                        </p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            {[
                                "Your physical or electronic signature",
                                "Identification of the removed content and its prior location",
                                "A statement under penalty of perjury that the content was removed due to mistake or misidentification",
                                "Your name, address, and contact information",
                                "Consent to the jurisdiction of the federal courts in the United States"
                            ].map((item, index) => (
                                <li key={index} className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <p className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                            Upon receipt of a valid counter-notification, LovedIn may restore the content <strong className="font-semibold">unless</strong> the original
                            complainant files a court action.
                        </p>
                    </section>

                    {/* 6. Repeat Infringer Policy */}
                    <section className="space-y-4">
                        <h2 className="text-2xl leading-[32px] md:text-4xl md:leading-[48px] font-bold text-[#202020]">
                            Repeat Infringer Policy
                        </h2>
                        <p className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                            LovedIn reserves the right to:
                        </p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                                Suspend or terminate accounts of users who are <strong className="font-semibold">repeat infringers</strong>
                            </li>
                            {[
                                "Remove content without prior notice where legally required",
                                "Limit access to features for users who abuse reporting systems"
                            ].map((item, index) => (
                                <li key={index} className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </section>

                    {/* 7. Prohibited Content */}
                    <section className="space-y-4">
                        <h2 className="text-2xl leading-[32px] md:text-4xl md:leading-[48px] font-bold text-[#202020]">
                            Prohibited Content
                        </h2>
                        <p className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                            The following content is <strong className="font-semibold">not permitted</strong> on LovedIn:
                        </p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            {[
                                "Copyrighted images or media without permission",
                                "Impersonation or stolen identity content",
                                "Explicit or unlawful material",
                                "Content promoting hate, violence, or harassment",
                                "Content used for commercial solicitation without authorization"
                            ].map((item, index) => (
                                <li key={index} className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <p className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                            Violations may result in immediate removal and account termination.
                        </p>
                    </section>

                    {/* 8. No Ownership Transfer */}
                    <section className="space-y-4">
                        <h2 className="text-2xl leading-[32px] md:text-4xl md:leading-[48px] font-bold text-[#202020]">
                            No Ownership Transfer
                        </h2>
                        <p className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                            Nothing in this policy transfers ownership of intellectual property to LovedIn or to other users.
                            Ownership remains with the original rights holder, subject to the licenses granted herein.
                        </p>
                    </section>

                    {/* 9. Policy Updates */}
                    <section className="space-y-4">
                        <h2 className="text-2xl leading-[32px] md:text-4xl md:leading-[48px] font-bold text-[#202020]">
                            Policy Updates
                        </h2>
                        <p className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                            LovedIn may update this policy at any time. Updates will be posted with a revised &quot;Last
                            Updated&quot; date. Continued use of the Services constitutes acceptance of the updated policy.
                        </p>
                    </section>

                    {/* 10. Contact Information */}
                    <section className="space-y-4">
                        <h2 className="text-2xl leading-[32px] md:text-4xl md:leading-[48px] font-bold text-[#202020]">
                            Contact Information
                        </h2>
                        <p className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                            For copyright or content-related inquiries:
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
