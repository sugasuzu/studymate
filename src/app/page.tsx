import CTASection from '@/components/landing/CTASection';
import FeaturesSection from '@/components/landing/FeaturesSection';
import { HeroSection } from '@/components/landing/HeroSection';
import HowItWorksSection from '@/components/landing/HowItWorksSection';
import ProblemSection from '@/components/landing/ProblemSection';
import ReviewsSection from '@/components/landing/ReviewsSection';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Studymate | 志望大学の先輩のリアルな教材レビュー',
  description:
    '志望大学・取得資格で絞り込める、信頼性の高い教材レビューサイト。サクラレビューに惑わされない、本当の先輩の声が見つかる。',
  openGraph: {
    title: 'Studymate | 志望大学の先輩のリアルな教材レビュー',
    description:
      '志望大学・取得資格で絞り込める、信頼性の高い教材レビューサイト',
    type: 'website',
    url: 'https://studymate.jp',
  },
};

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
