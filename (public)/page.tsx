import PromoCard from "./components/PromoCard";
import Banner from "./sections/Banner";
import BannerMessageSection from "./sections/BannerMessageSection";
import FindYourMatch from "./sections/FindYourMatch";
import RealConnections from "./sections/RealConnections";
import ReviewsSection from "./sections/ReviewsSection";
import UsageSteps from "./sections/UsageSteps";

export default function LandingPage() {
  return (
    <>
      <Banner />
      <PromoCard />
      <RealConnections />
      {/* <UsageSteps /> */}
      <FindYourMatch />
      {/* <ReviewsSection /> */}
      <BannerMessageSection />
    </>
  );
}
