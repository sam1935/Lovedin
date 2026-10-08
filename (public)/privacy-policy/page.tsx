"use client";

import React from "react";

export default function PrivacyPolicyPage() {
    return (
        <div className="w-full flex justify-center px-4 lg:px-10 xl:px-[134px] py-16">
            <div className="w-full max-w-[1300px]">
                {/* Content Section */}
                <div className="space-y-12">

                    {/* Unified Introduction */}
                    <div className="space-y-6">
                        <p className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                            LovedIn (&quot;<strong className="font-semibold">LovedIn</strong>,&quot; &quot;<strong className="font-semibold">we</strong>,&quot; &quot;<strong className="font-semibold">us</strong>,&quot; or &quot;<strong className="font-semibold">our</strong>&quot;) is committed to maintaining a safe and respectful platform. We have a <strong className="font-semibold">zero-tolerance policy</strong> for any form of child exploitation, abuse, or endangerment.
                        </p>
                        <p className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                            LovedIn values your privacy. This Privacy Policy explains how we collect, use, disclose, and protect personal information when you access or use the LovedIn website, mobile application, and related services (collectively, the &quot;<strong className="font-semibold">Services</strong>&quot;). This document also incorporates our comprehensive <strong className="font-semibold">Child Safety Policy</strong>, outlining our standards, enforcement mechanisms, and reporting procedures.
                        </p>
                        <p className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                            By using LovedIn, you agree to the practices described in this Privacy Policy.
                        </p>
                    </div>

                    {/* 1. Information We Collect */}
                    <section className="space-y-8">
                        <h2 className="text-2xl leading-[32px] md:text-4xl md:leading-[48px] font-bold text-[#202020]">
                            1. Information We Collect
                        </h2>

                        <div className="space-y-6">
                            <h3 className="text-xl leading-[28px] md:text-3xl md:leading-[40px] font-semibold text-[#202020]">
                                A. Information You Provide
                            </h3>
                            <p className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                                We may collect information you voluntarily provide, including:
                            </p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                {[
                                    "Name, username, email address",
                                    "Date of birth (to verify age eligibility)",
                                    "Registration and Profile information (photos, bio, interests, preferences)",
                                    "Linked Social Media Information",
                                    "Payment information (processed by third-party payment providers)",
                                    "Geolocation, Device, Purchase, Link Information",
                                    "Customer support communications and Messages",
                                    "Cookies and other Technology information"
                                ].map((item, index) => (
                                    <li key={index} className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="space-y-6">
                            <h3 className="text-xl leading-[28px] md:text-3xl md:leading-[40px] font-semibold text-[#202020]">
                                B. Verification Information (Optional, Paid)
                            </h3>
                            <p className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                                If you choose to verify your account, we may collect:
                            </p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                {[
                                    "Government-issued ID (processed via a third-party verification provider)",
                                    "Selfie or photo verification",
                                    "Verification status and metadata"
                                ].map((item, index) => (
                                    <li key={index} className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <p className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020] border-l-4 border-gray-200 pl-4">
                                <span className="font-bold italic">Important:</span> LovedIn does <strong className="font-semibold">not</strong> store raw government ID images unless required for legal or fraud-prevention purposes. Verification data is handled by trusted third-party providers.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <h3 className="text-xl leading-[28px] md:text-3xl md:leading-[40px] font-semibold text-[#202020]">
                                B-1. Face Data (Optional, Verification Only)
                            </h3>
                            <p className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                                If you choose to verify your account, LovedIn temporarily processes face data solely to confirm that a real, live person is taking the selfie and that the selfie matches your profile photo. Face data is NOT used for account login or authentication; LocalAuthentication (Apple Face ID / Touch ID) remains the device-level biometric. Face verification is fully optional.
                            </p>
                            <p className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020] font-semibold">
                                What we collect:
                            </p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                {[
                                    "A short-lived selfie image captured by the device camera",
                                    "Liveness signals (blink, smile) computed on-device to confirm the user is live",
                                    "A numeric similarity score comparing the selfie to your profile photo"
                                ].map((item, index) => (
                                    <li key={index} className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <p className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020] font-semibold">
                                How face data is used:
                            </p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                {[
                                    "Confirm the user is a real, live human (liveness)",
                                    "Match the selfie against the user's existing profile photo for the Verified badge",
                                    "Detect impersonation, fraud, and fake accounts"
                                ].map((item, index) => (
                                    <li key={index} className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <p className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020] font-semibold">
                                Sharing &amp; storage:
                            </p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                {[
                                    "Face data is not sold, licensed, or shared with advertisers or unaffiliated third parties",
                                    "Processing is performed by LovedIn's verification service and a trusted KYC provider under a data processing agreement",
                                    "Selfie images and any derived face templates are deleted within 30 days of a verification decision, except where a longer retention is required by law or for fraud-prevention investigations"
                                ].map((item, index) => (
                                    <li key={index} className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <p className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                                You may request deletion of your face data at any time by contacting <strong className="font-semibold">info@techhubinnovation.com</strong>. Deleting face data does not delete your LovedIn account; it only removes verification artifacts.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <h3 className="text-xl leading-[28px] md:text-3xl md:leading-[40px] font-semibold text-[#202020]">
                                C. Automatically Collected Information
                            </h3>
                            <p className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                                We automatically collect certain technical data, including:
                            </p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                {[
                                    "IP address",
                                    "Device type, operating system, and app version",
                                    "Usage data (features used, interactions, timestamps)",
                                    "Approximate location (country, city)"
                                ].map((item, index) => (
                                    <li key={index} className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="space-y-6">
                            <h3 className="text-xl leading-[28px] md:text-3xl md:leading-[40px] font-semibold text-[#202020]">
                                D. Cookies & Tracking Technologies
                            </h3>
                            <p className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                                We use cookies and similar technologies to operate and improve the platform, analyze usage trends, and prevent fraud and abuse. You can manage cookie preferences through your browser or device settings.
                            </p>
                        </div>
                    </section>

                    {/* 2. How We Use Your Information */}
                    <section className="space-y-8">
                        <h2 className="text-2xl leading-[32px] md:text-4xl md:leading-[48px] font-bold text-[#202020]">
                            2. How We Use Your Information
                        </h2>
                        <p className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                            We use your information to:
                        </p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            {[
                                "Create and manage your LovedIn account",
                                "Facilitate matches and connections",
                                "Provide AI-assisted recommendations",
                                "Process subscriptions and verification payments",
                                "Prevent fraud, impersonation, and abuse",
                                "Enforce our Terms of Service and Safety Policies",
                                "Provide customer support",
                                "Improve and personalize the Services",
                                "Comply with legal obligations"
                            ].map((item, index) => (
                                <li key={index} className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </section>

                    {/* 3. AI & Automated Processing Disclosure */}
                    <section className="space-y-8">
                        <h2 className="text-2xl leading-[32px] md:text-4xl md:leading-[48px] font-bold text-[#202020]">
                            3. AI & Automated Processing Disclosure
                        </h2>
                        <p className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                            LovedIn uses automated systems and AI-assisted tools to recommend potential matches, rank and suggest profiles, and <strong className="font-semibold">detect suspicious or abusive behavior</strong>.
                        </p>
                        <p className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020] italic">
                            These systems do not make legal or significant life decisions, and matches are not guaranteed. Users may adjust preferences or discontinue use at any time.
                        </p>
                    </section>

                    {/* 4. How We Share Information */}
                    <section className="space-y-8">
                        <h2 className="text-2xl leading-[32px] md:text-4xl md:leading-[48px] font-bold text-[#202020]">
                            4. How We Share Information
                        </h2>

                        <div className="space-y-6">
                            <h3 className="text-xl leading-[28px] md:text-3xl md:leading-[40px] font-semibold text-[#202020]">
                                A. Service Providers
                            </h3>
                            <p className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                                We share information with identity verification services, payment processors, cloud hosting providers, and analytics vendors. These providers are contractually obligated to protect your data.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <h3 className="text-xl leading-[28px] md:text-3xl md:leading-[40px] font-semibold text-[#202020]">
                                B. Other Users
                            </h3>
                            <p className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                                Information you choose to make public (e.g., profile photos, bio) is visible to other platform users.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <h3 className="text-xl leading-[28px] md:text-3xl md:leading-[40px] font-semibold text-[#202020]">
                                C. Legal & Safety Purposes
                            </h3>
                            <p className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                                We may disclose information if required to comply with legal obligations, respond to lawful requests, or protect the safety, rights, or property of LovedIn or users. <strong className="font-semibold">This includes full cooperation with law enforcement and regulatory authorities in cases involving exploitation, abuse, or child safety risks.</strong>
                            </p>
                        </div>
                    </section>

                    {/* 5. International Data Transfers & Retention */}
                    <section className="space-y-8">
                        <h2 className="text-2xl leading-[32px] md:text-4xl md:leading-[48px] font-bold text-[#202020]">
                            5. International Data Transfers & Retention
                        </h2>
                        <p className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                            LovedIn is based in the United States. If you access the Services from outside the U.S., your data may be transferred to and processed in the U.S. or other countries with different data protection laws. By using LovedIn, you consent to such transfers.
                        </p>
                        <p className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                            We retain personal data only as long as necessary to provide the Services, fulfill legal obligations, resolve disputes, and enforce agreements. You may request account deletion at any time.
                        </p>
                    </section>

                    {/* 6. Your Privacy Rights */}
                    <section className="space-y-8">
                        <h2 className="text-2xl leading-[32px] md:text-4xl md:leading-[48px] font-bold text-[#202020]">
                            6. Your Privacy Rights
                        </h2>
                        <div className="space-y-6">
                            <h3 className="text-xl leading-[28px] md:text-3xl md:leading-[40px] font-semibold text-[#202020]">
                                A. U.S. Residents (CCPA / CPRA)
                            </h3>
                            <p className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                                You have the right to know what personal information we collect, request deletion, opt out of data &quot;sale&quot; or &quot;sharing&quot;, and access your information. LovedIn does <strong className="font-semibold">not</strong> sell personal information.
                            </p>
                        </div>
                        <div className="space-y-6">
                            <h3 className="text-xl leading-[28px] md:text-3xl md:leading-[40px] font-semibold text-[#202020]">
                                B. International Users (GDPR-Aligned Rights)
                            </h3>
                            <p className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                                Depending on your location, you may have rights to access, correct, or delete your data, restrict or object to processing, and data portability.
                            </p>
                        </div>
                    </section>

                    {/* 7. Do Not Sell or Share My Personal Information */}
                    <section className="space-y-8">
                        <h2 className="text-2xl leading-[32px] md:text-4xl md:leading-[48px] font-bold text-[#202020]">
                            7. Do Not Sell or Share My Personal Information
                        </h2>
                        <p className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                            LovedIn does <strong className="font-semibold">not</strong> sell personal information. Users may submit requests regarding data sharing preferences via our <strong className="font-semibold">Do Not Sell or Share My Personal Information</strong> page.
                        </p>
                    </section>

                    {/* 8. Child Safety Policy (THE 10 POINTS) */}
                    <section className="space-y-12 py-10 border-t border-b border-gray-100">
                        <div className="space-y-4">
                            <h2 className="text-3xl leading-[40px] md:text-5xl md:leading-[60px] font-bold text-[#202020]">
                                Child Safety Policy
                            </h2>
                            <p className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020] italic">
                                This comprehensive standard ensures LovedIn remains an adult-only platform dedicated to user safety.
                            </p>
                        </div>

                        {/* Point 1 */}
                        <div className="space-y-4">
                            <h3 className="text-xl leading-[28px] md:text-3xl md:leading-[40px] font-semibold text-[#202020]">
                                1. Age Restriction (18+ Only Platform)
                            </h3>
                            <p className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                                LovedIn is strictly intended for individuals 18 years of age or older. We take the following measures:
                            </p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                {[
                                    "Require users to confirm age during registration",
                                    "Prohibit minors from creating accounts",
                                    "Actively monitor and remove accounts suspected of underage use"
                                ].map((item, index) => (
                                    <li key={index} className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <p className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                                Any account found to belong to a minor will be:
                            </p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                {[
                                    "Immediately suspended or terminated",
                                    "Removed from the platform"
                                ].map((item, index) => (
                                    <li key={index} className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Point 2 */}
                        <div className="space-y-4">
                            <h3 className="text-xl leading-[28px] md:text-3xl md:leading-[40px] font-semibold text-[#202020]">
                                2. Zero Tolerance for Child Sexual Abuse & Exploitation (CSAE)
                            </h3>
                            <p className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                                LovedIn strictly prohibits:
                            </p>
                            <ul className="list-disc list-inside space-y-2 ml-4 text-[#202020]">
                                {[
                                    "Any content involving minors in a sexual or exploitative context",
                                    "Grooming, solicitation, or predatory behavior",
                                    "Sharing, requesting, or distributing child sexual abuse material (CSAM)",
                                    "Attempting to engage minors on or off the platform"
                                ].map((item, index) => (
                                    <li key={index} className="text-base leading-7 md:text-[22px] md:leading-[30px]">
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <p className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                                <strong className="font-semibold text-red-600 uppercase">Violations will result in:</strong>
                            </p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                {[
                                    "Immediate account termination",
                                    "Removal of content",
                                    "Reporting to appropriate law enforcement authorities (including NCMEC)"
                                ].map((item, index) => (
                                    <li key={index} className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Point 3 */}
                        <div className="space-y-4">
                            <h3 className="text-xl leading-[28px] md:text-3xl md:leading-[40px] font-semibold text-[#202020]">
                                3. Content Moderation & Detection
                            </h3>
                            <p className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                                LovedIn uses a combination of:
                            </p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                {[
                                    "Automated systems",
                                    "AI-assisted monitoring",
                                    "User reporting tools",
                                    "Manual review processes"
                                ].map((item, index) => (
                                    <li key={index} className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <p className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                                To detect and prevent:
                            </p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                {[
                                    "Underage users",
                                    "Suspicious or harmful behavior",
                                    "Policy violations related to child safety"
                                ].map((item, index) => (
                                    <li key={index} className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Point 4 */}
                        <div className="space-y-4">
                            <h3 className="text-xl leading-[28px] md:text-3xl md:leading-[40px] font-semibold text-[#202020]">
                                4. User Reporting Mechanism
                            </h3>
                            <p className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                                Users can report concerns directly within the app or via email. Reports may include:
                            </p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                {[
                                    "Suspected underage users",
                                    "Inappropriate or illegal content",
                                    "Suspicious behavior"
                                ].map((item, index) => (
                                    <li key={index} className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <p className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                                All reports are:
                            </p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                {[
                                    "Reviewed promptly",
                                    "Handled confidentially",
                                    "Escalated when necessary"
                                ].map((item, index) => (
                                    <li key={index} className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Point 5 */}
                        <div className="space-y-4">
                            <h3 className="text-xl leading-[28px] md:text-3xl md:leading-[40px] font-semibold text-[#202020]">
                                5. Cooperation with Law Enforcement
                            </h3>
                            <p className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                                LovedIn cooperates fully with law enforcement and regulatory authorities in cases involving:
                            </p>
                            <ul className="list-disc list-inside space-y-2 ml-4 text-[#202020]">
                                {[
                                    "Child safety risks",
                                    "Exploitation or abuse",
                                    "Illegal content or activity"
                                ].map((item, index) => (
                                    <li key={index} className="text-base leading-7 md:text-[22px] md:leading-[30px]">
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <p className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                                Where required, we will:
                            </p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                {[
                                    "Preserve relevant data",
                                    "Provide information in accordance with applicable laws"
                                ].map((item, index) => (
                                    <li key={index} className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Point 6 */}
                        <div className="space-y-4">
                            <h3 className="text-xl leading-[28px] md:text-3xl md:leading-[40px] font-semibold text-[#202020]">
                                6. Account Enforcement Actions
                            </h3>
                            <p className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                                LovedIn may take the following actions without notice to users who pose a risk to minors:
                            </p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                {[
                                    "Remove content",
                                    "Suspend accounts",
                                    "Permanently ban users",
                                    "Block devices or IP addresses"
                                ].map((item, index) => (
                                    <li key={index} className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <p className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020] italic">
                                This applies to any behavior that may pose a risk to minors.
                            </p>
                        </div>

                        {/* Point 7 */}
                        <div className="space-y-4">
                            <h3 className="text-xl leading-[28px] md:text-3xl md:leading-[40px] font-semibold text-[#202020]">
                                7. Third-Party Verification & Safety Measures
                            </h3>
                            <p className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                                LovedIn may use trusted third-party providers to:
                            </p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                {[
                                    "Verify user identity",
                                    "Detect fraudulent or suspicious behavior"
                                ].map((item, index) => (
                                    <li key={index} className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <p className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                                These measures help reduce:
                            </p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                {[
                                    "Fake accounts",
                                    "Impersonation",
                                    "Potential misuse involving minors"
                                ].map((item, index) => (
                                    <li key={index} className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Point 8 */}
                        <div className="space-y-4">
                            <h3 className="text-xl leading-[28px] md:text-3xl md:leading-[40px] font-semibold text-[#202020]">
                                8. Safety by Design
                            </h3>
                            <p className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                                LovedIn incorporates safety features including:
                            </p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                {[
                                    "Age restriction enforcement",
                                    "Reporting and blocking tools",
                                    "Profile moderation",
                                    "Behavior monitoring systems"
                                ].map((item, index) => (
                                    <li key={index} className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <p className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                                We continuously improve our systems to enhance user safety for everyone.
                            </p>
                        </div>
                    </section>

                    {/* 9. Security Measures */}
                    <section className="space-y-8">
                        <h2 className="text-2xl leading-[32px] md:text-4xl md:leading-[48px] font-bold text-[#202020]">
                            9. Security Measures
                        </h2>
                        <p className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                            We implement reasonable administrative, technical, and organizational safeguards to protect your personal data. However, as no system is 100% secure, we encourage users to take active steps in protecting their account credentials.
                        </p>
                    </section>

                    {/* 10. Policy Updates (POINT 10) */}
                    <section className="space-y-8">
                        <h2 className="text-2xl leading-[32px] md:text-4xl md:leading-[48px] font-bold text-[#202020]">
                            10. Policy Updates
                        </h2>
                        <p className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                            LovedIn may update this policy periodically. Updates will be posted with a revised &quot;Last Updated&quot; date, and continued use of the Services constitutes acceptance of any updates.
                        </p>
                    </section>

                    {/* 11. Contact Information (POINT 9) */}
                    <section className="space-y-12">
                        <h2 className="text-2xl leading-[32px] md:text-4xl md:leading-[48px] font-bold text-[#202020]">
                            11. Contact Us
                        </h2>

                        <div className="space-y-12">
                            {/* General Inquiries */}
                            <div className="space-y-4">
                                <h3 className="text-xl leading-[28px] md:text-3xl md:leading-[40px] font-semibold text-[#202020]">
                                    General Inquiries
                                </h3>
                                <p className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                                    <span className="font-bold">Email:</span> Info@TechHubInnovation.com
                                </p>
                                <p className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                                    <span className="font-bold">Website:</span> www.lovedin.net
                                </p>
                            </div>

                            {/* Safety Concerns */}
                            <div className="space-y-4 pt-4 border-t border-gray-100">
                                <h3 className="text-xl leading-[28px] md:text-3xl md:leading-[40px] font-semibold text-[#202020]">
                                    Contact for Safety Concerns
                                </h3>
                                <p className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                                    If you have concerns related to child safety, please contact us immediately:
                                </p>
                                <p className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                                    <span className="font-bold">Email:</span> Info@techhubinnovation.com
                                </p>
                                <p className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020]">
                                    <span className="font-bold">Subject Line:</span> <span className="italic">Child Safety Concern</span>
                                </p>
                                <p className="text-base leading-7 md:text-[22px] md:leading-[30px] text-[#202020] italic">
                                    We prioritize and respond to safety-related reports as quickly as possible.
                                </p>
                            </div>
                        </div>
                    </section>

                </div>
            </div>
        </div>
    );
}
