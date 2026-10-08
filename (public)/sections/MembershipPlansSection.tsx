import MembershipPlanCard from "../components/MembershipPlanCard";

export default function MembershipPlansSection() {
  return (
    <section className="w-full flex flex-col items-center px-4 lg:px-10 xl:px-[134px] py-8 lg:py-12">
      <div className="max-w-[1300px] mx-auto">
        <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-center text-[#202020] mb-8 lg:mb-12 leading-tight">
          Choose the Plan That Matches
          <br />
          Your Heart.
        </h2>
        <form
          className="w-full flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-4 xl:gap-6 lg:min-h-[490px] xl:min-h-[539px]"
          aria-label="Membership plans"
        >
          <MembershipPlanCard variant="free" />
          <MembershipPlanCard variant="premium" defaultSelected />
        </form>
      </div>
    </section>
  );
}
