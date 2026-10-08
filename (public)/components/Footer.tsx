import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-900 text-gray-300 border-t border-gray-800 px-4 lg:px-[134px]">
      <div className="mx-auto max-w-[1300px] py-12 ">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
          {/* Left: logo + description */}
          <div className="md:col-span-4 max-w-[300px] md:pt-5">
            <Link href="/" className="inline-flex items-center mb-1">
              {/* <Image
                src="/logo/lovedin_logo.svg"
                alt="LovedIn"
                width={140}
                height={40}
                className="h-8 w-auto"
                priority={false}
              /> */}
              <span className="text-xl font-bold text-white">
                Meet. Socialize. Connect. Live
              </span>
            </Link>
            <p className="text-base text-[#C2C2C2] leading-[23px]">
              Connecting hearts across the world through trust, simplicity, and
              genuine relationships.
            </p>
          </div>

          {/* Middle: nav columns (two columns to match design) */}
          <div className="md:col-span-6">
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 pt-2">
              <div>
                <ul className="mt-3 space-y-2 text-lg">
                  <li>
                    <Link href="/about" className="hover:text-white">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact-us" className="hover:text-white">
                      Contact Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/terms-and-conditions"
                      className="hover:text-white"
                    >
                      Terms & Conditions <br /> and User Agreement
                    </Link>
                  </li>

                </ul>
              </div>

              <div>
                <ul className="mt-3 space-y-2 text-lg">
                  <li>
                    <Link href="/privacy-policy" className="hover:text-white">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="/copyright-policy" className="hover:text-white">
                      Copyright Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="/privacy-choices" className="hover:text-white">
                      Your Privacy Choices
                    </Link>
                  </li>
                  <li>
                    <Link href="/accessibility-statement" className="hover:text-white">
                      Accessibility Statement
                    </Link>
                  </li>
                  {/* <li>
                    <Link href="/terms-and-conditions" className="hover:text-white">
                      User agreement
                    </Link>
                  </li> */}
                </ul>
              </div>
            </div>
          </div>

          {/* Right: social icons */}
          <div className="md:col-span-2 flex flex-col items-start pt-4">
            <h4 className="text-lg font-semibold text-gray-200 ">Follow Us</h4>
            <div className="mt-3 flex flex-wrap gap-3">
              <Link href="mailto:hello@lovedin.example" className="group">
                <Image
                  src="/icons/social/mail.svg"
                  alt="Email"
                  width={20}
                  height={20}
                  className="opacity-80 group-hover:opacity-100"
                />
              </Link>
              <Link href="#" className="group">
                <Image
                  src="/icons/social/linkedin.svg"
                  alt="LinkedIn"
                  width={20}
                  height={20}
                  className="opacity-80 group-hover:opacity-100"
                />
              </Link>
              <Link href="#" className="group">
                <Image
                  src="/icons/social/twitter.svg"
                  alt="Twitter"
                  width={20}
                  height={20}
                  className="opacity-80 group-hover:opacity-100"
                />
              </Link>
              <Link href="https://www.instagram.com/lovedin_experience/" className="group">
                <Image
                  src="/icons/social/instagram.svg"
                  alt="Instagram"
                  width={20}
                  height={20}
                  className="opacity-80 group-hover:opacity-100"
                />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-[#3D3C3C] pt-6">
          <p className="text-center text-sm leading-3.5 text-[#7D7D7D]">
            © {new Date().getFullYear()} LovedIn. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
