import CTASection from "@/components/landing/CTASection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import { HeroSection } from "@/components/landing/HeroSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import ProblemSection from "@/components/landing/ProblemSection";
import ReviewsSection from "@/components/landing/ReviewsSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <HeroSection />
      <ProblemSection />
      <FeaturesSection />
      <HowItWorksSection />
      <ReviewsSection />
      <CTASection />
    </div>
  );
}
