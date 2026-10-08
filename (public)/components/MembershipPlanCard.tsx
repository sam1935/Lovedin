type PlanFeatureGroup = { group: string; items: string[] };
type MembershipPlan = {
  key: "free" | "premium";
  title: string;
  subtitle: string;
  description: string;
  price: string | null;
  features: PlanFeatureGroup[];
};

const STATIC_PLANS: Record<"free" | "premium", MembershipPlan> = {
  free: {
    key: "free",
    title: "Free Plan",
    subtitle: "Free Plan Details",
    description: "For those who want to explore the basics of connection.",
    price: null,
    features: [
      {
        group: "Profile & Discovery",
        items: [
          "Create your personal profile with photos, interests, and lifestyle choices.",
          "Use basic filters — age, gender, and location — to explore matches.",
          "Get standard match suggestions powered by our algorithm.",
        ],
      },
      {
        group: "Connections & Chat",
        items: [
          "Create your personal profile with photos, interests, and lifestyle choices.",
          "Use basic filters — age, gender, and location — to explore matches.",
          "Get standard match suggestions powered by our algorithm.",
        ],
      },
      {
        group: "Search & Visibility",
        items: [
          "Create your personal profile with photos, interests, and lifestyle choices.",
          "Use basic filters — age, gender, and location — to explore matches.",
          "Get standard match suggestions powered by our algorithm.",
        ],
      },
    ],
  },
  premium: {
    key: "premium",
    title: "Premium Plan",
    subtitle: "Premium Plan Details",
    description: "For those who want to explore the basics of connection.",
    price: "$99.9/Monthly",
    features: [
      {
        group: "Profile & Discovery",
        items: [
          "Create your personal profile with photos, interests, and lifestyle choices.",
          "Use basic filters — age, gender, and location — to explore matches.",
          "Get standard match suggestions powered by our algorithm.",
        ],
      },
      {
        group: "Connections & Chat",
        items: [
          "Create your personal profile with photos, interests, and lifestyle choices.",
          "Use basic filters — age, gender, and location — to explore matches.",
          "Get standard match suggestions powered by our algorithm.",
        ],
      },
      {
        group: "Search & Visibility",
        items: [
          "Create your personal profile with photos, interests, and lifestyle choices.",
          "Use basic filters — age, gender, and location — to explore matches.",
          "Get standard match suggestions powered by our algorithm.",
        ],
      },
    ],
  },
};

interface MembershipPlanCardProps {
  variant: "free" | "premium";
  defaultSelected?: boolean;
  name?: string; // radio group name
}

// Server component: purely declarative, no hooks.
export function MembershipPlanCard({
  variant,
  defaultSelected = false,
  name = "membershipPlan",
}: MembershipPlanCardProps) {
  const plan = STATIC_PLANS[variant];
  const inputId = `plan-${plan.key}`;

  const isPremium = plan.key === "premium";
  // Derive price parts for premium formatting
  let priceAmount: string | null = null;
  let pricePeriod: string | null = null;
  if (plan.price) {
    const parts = plan.price.split("/");
    priceAmount = parts[0] || null; // e.g. $99.9
    pricePeriod = parts[1] || null; // e.g. Monthly
  }
  return (
    <div
      className="relative plan-card w-full max-w-[420px] lg:max-w-none lg:w-auto xl:w-auto"
      data-plan={plan.key}
    >
      <input
        id={inputId}
        type="radio"
        name={name}
        value={plan.key}
        defaultChecked={defaultSelected}
        className="sr-only"
        aria-label={plan.title}
      />
      {/* Label as the visual card so clicking toggles the radio */}
      <label
        htmlFor={inputId}
        className="outer block mx-auto rounded-[20px] border border-[#F3F3F3] bg-white transition-all duration-500 ease-out overflow-hidden w-full h-auto lg:w-[340px] lg:h-[460px] xl:w-[376px] xl:h-[490px]"
      >
        {/* Title bar: always for collapsed premium, always for free */}
        <div className="title-bar">
          <span className="title-text">
            {isPremium ? "Premium Plan" : plan.title}
          </span>
        </div>
        <div className="inner rounded-[20px] w-full h-full relative">
          {/* Top panel (Rectangle 164) with header content */}
          <div className="top-panel">
            <div className="tp-content flex flex-col gap-2">
              <div className="header-main">
                {isPremium && (
                  <div className="price-wrapper mb-2">
                    {priceAmount && (
                      <span className="price-amount text-[#202020]">
                        {priceAmount}
                      </span>
                    )}
                    {pricePeriod && (
                      <span className="price-period text-[#202020] text-[20px] ml-1 align-baseline">
                        /{pricePeriod}
                      </span>
                    )}
                  </div>
                )}
                <h3 className="plan-title font-extrabold text-[#202020] text-[37.71px] leading-[37px]">
                  {plan.title}
                </h3>
              </div>
              <div className="header-meta">
                {plan.subtitle ? (
                  <p className="text-[#FF0854] font-semibold mb-1 text-[16px] lg:text-[18px] leading-tight">
                    {plan.subtitle}
                  </p>
                ) : null}
                {plan.description ? (
                  <p className="text-[#000000] text-[11px] lg:text-[12px] leading-relaxed font-normal">
                    {plan.description}
                  </p>
                ) : null}
              </div>
            </div>
          </div>
          {/* Collapsed content (desktop only, shows when NOT expanded) */}
          <div className="content-collapsed">
            {plan.features.slice(0, 2).map((group, gi) => (
              <div
                key={`c-${group.group}`}
                className={`mt-2${
                  gi > 0 ? " pt-3 border-t border-[#F3F3F3]" : ""
                }`}
              >
                <h4 className="text-[16px] leading-[30px] font-medium text-[#202020] tracking-[0] mb-1">
                  {group.group}
                </h4>
                <ul className="space-y-1">
                  {group.items.map((item, idx) => {
                    const gradientId = `grad-pink-${plan.key}-c-${gi}-${idx}`;
                    return (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-[#000000] text-[12px] leading-[18px] font-light"
                      >
                        <svg
                          className="mt-0.5 flex-none"
                          width="11"
                          height="11"
                          viewBox="0 0 11 11"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                        >
                          <defs>
                            <linearGradient
                              id={gradientId}
                              x1="0"
                              y1="0"
                              x2="11"
                              y2="11"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop offset="0%" stopColor="#FF0854" />
                              <stop offset="100%" stopColor="#EE686E" />
                            </linearGradient>
                          </defs>
                          <circle
                            cx="5.5"
                            cy="5.5"
                            r="5"
                            fill={`url(#${gradientId})`}
                          />
                          <path
                            d="M3.3 5.6l1.4 1.4 2.7-3.3"
                            stroke="white"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span>{item}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
          {/* Content visible always on mobile, only when expanded on desktop */}
          <div className="content">
            {/* <div className=" w-full bg-[#F8D5DD] mb-4" /> */}
            {plan.features.map((group, gi) => (
              <div key={group.group} className="mt-2">
                <h4 className="text-[16px] leading-[30px] font-medium text-[#202020] tracking-[0] mb-1">
                  {group.group}
                </h4>
                <ul className="space-y-1">
                  {group.items.map((item, idx) => {
                    const gradientId = `grad-pink-${plan.key}-${gi}-${idx}`;
                    return (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-[#000000] text-[12px] leading-[18px] font-light"
                      >
                        <svg
                          className="mt-0.5 flex-none"
                          width="11"
                          height="11"
                          viewBox="0 0 11 11"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                        >
                          <defs>
                            <linearGradient
                              id={gradientId}
                              x1="0"
                              y1="0"
                              x2="11"
                              y2="11"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop offset="0%" stopColor="#FF0854" />
                              <stop offset="100%" stopColor="#EE686E" />
                            </linearGradient>
                          </defs>
                          <circle
                            cx="5.5"
                            cy="5.5"
                            r="5"
                            fill={`url(#${gradientId})`}
                          />
                          <path
                            d="M3.3 5.6l1.4 1.4 2.7-3.3"
                            stroke="white"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span>{item}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </label>
    </div>
  );
}

export default MembershipPlanCard;
