'use client';

// Each legacy page is its own chunk (next/dynamic keeps SSR), so a page only
// downloads its own code instead of all ~45 legacy pages.

import { ReactNode } from 'react';
import dynamic from 'next/dynamic';
import { Router, Route } from 'wouter';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/contexts/ThemeContext';

const Home = dynamic(() => import('@/legacy/Home'));
const Blog = dynamic(() => import('@/legacy/Blog'));
const BlogPost = dynamic(() => import('@/legacy/BlogPost'));
const HealthcarePage = dynamic(() => import('@/legacy/HealthcarePage'));
const StaffingPage = dynamic(() => import('@/legacy/StaffingPage'));
const TransportationPage = dynamic(() => import('@/legacy/TransportationPage'));
const ManufacturingPage = dynamic(() => import('@/legacy/ManufacturingPage'));
const HospitalityPage = dynamic(() => import('@/legacy/HospitalityPage'));
const EnergyPage = dynamic(() => import('@/legacy/EnergyPage'));
const EducationPage = dynamic(() => import('@/legacy/EducationPage'));
const ChurchNonProfitPage = dynamic(() => import('@/legacy/ChurchNonProfitPage'));
const ReferralPartners = dynamic(() => import('@/legacy/ReferralPartners'));
const BenefitsMePage = dynamic(() => import('@/legacy/partners/BenefitsMePage'));
const WorkShieldPage = dynamic(() => import('@/legacy/partners/WorkShieldPage'));
const GMGSavingsPage = dynamic(() => import('@/legacy/partners/GMGSavingsPage'));
const NovaTechPage = dynamic(() => import('@/legacy/partners/NovaTechPage'));
const DefenseByDesignPage = dynamic(() => import('@/legacy/partners/DefenseByDesignPage'));
const SandeneStrategiesPage = dynamic(() => import('@/legacy/partners/SandeneStrategiesPage'));
const FynnPartner = dynamic(() => import('@/legacy/FynnPartner'));
const HoorayHealthPartner = dynamic(() => import('@/legacy/HoorayHealthPartner'));
const StaffingForHealthcarePage = dynamic(() => import('@/legacy/StaffingForHealthcarePage'));
const LevelCSolutionsPage = dynamic(() => import('@/legacy/LevelCSolutionsPage'));
const CorporateTalentFinderPage = dynamic(() => import('@/legacy/CorporateTalentFinderPage'));
const CriminalBackgroundChecksPage = dynamic(() => import('@/legacy/CriminalBackgroundChecksPage'));
const EmploymentVerificationPage = dynamic(() => import('@/legacy/EmploymentVerificationPage'));
const DrugScreeningPage = dynamic(() => import('@/legacy/DrugScreeningPage'));
const EducationVerificationPage = dynamic(() => import('@/legacy/EducationVerificationPage'));
const MVRChecksPage = dynamic(() => import('@/legacy/MVRChecksPage'));
const PrivacyPolicy = dynamic(() => import('@/legacy/PrivacyPolicy'));
const TermsOfService = dynamic(() => import('@/legacy/TermsOfService'));
const FCRANews = dynamic(() => import('@/legacy/FCRANews'));
const ServicesPage = dynamic(() => import('@/legacy/ServicesPage'));
const IndustriesPage = dynamic(() => import('@/legacy/IndustriesPage'));
const ContactPage = dynamic(() => import('@/legacy/ContactPage'));
const WhySaffHirePage = dynamic(() => import('@/legacy/WhySaffHirePage'));
const AccountSetup = dynamic(() => import('@/legacy/AccountSetup'));
const FAQPage = dynamic(() => import('@/legacy/FAQPage'));
const BackgroundScreeningFriscoPage = dynamic(() => import('@/legacy/BackgroundScreeningFriscoPage'));
const BackgroundScreeningDallasPage = dynamic(() => import('@/legacy/BackgroundScreeningDallasPage'));
const BackgroundScreeningPlanoPage = dynamic(() => import('@/legacy/BackgroundScreeningPlanoPage'));
const BackgroundScreeningMckinney = dynamic(() => import('@/legacy/BackgroundScreeningMckinney'));
const BackgroundScreeningAllenPage = dynamic(() => import('@/legacy/BackgroundScreeningAllenPage'));
const NotFound = dynamic(() => import('@/legacy/NotFound'));

type PageKey =
  | 'home' | 'blog' | 'blogPost' | 'healthcare' | 'staffing' | 'transportation' | 'manufacturing' | 'hospitality' | 'energy' | 'education' | 'churchNonprofit'
  | 'referralPartners' | 'benefitsMe' | 'workShield' | 'gmgSavings' | 'novaTech' | 'defenseByDesign' | 'sandeneStrategies' | 'fynn' | 'hoorayHealth' | 'staffingForHealthcare' | 'levelC' | 'corporateTalentFinder'
  | 'criminal' | 'employment' | 'drug' | 'educationVerification' | 'mvr' | 'privacy' | 'terms' | 'fcraNews' | 'services' | 'industries' | 'contact' | 'why' | 'accountSetup' | 'faq'
  | 'frisco' | 'dallas' | 'plano' | 'mckinney' | 'allen' | 'notFound';

const pageMap: Record<PageKey, () => ReactNode> = {
  home: () => <Home />,
  blog: () => <Blog />,
  blogPost: () => <Route path="/blog/:slug" component={BlogPost} />,
  healthcare: () => <HealthcarePage />,
  staffing: () => <StaffingPage />,
  transportation: () => <TransportationPage />,
  manufacturing: () => <ManufacturingPage />,
  hospitality: () => <HospitalityPage />,
  energy: () => <EnergyPage />,
  education: () => <EducationPage />,
  churchNonprofit: () => <ChurchNonProfitPage />,
  referralPartners: () => <ReferralPartners />,
  benefitsMe: () => <BenefitsMePage />,
  workShield: () => <WorkShieldPage />,
  gmgSavings: () => <GMGSavingsPage />,
  novaTech: () => <NovaTechPage />,
  defenseByDesign: () => <DefenseByDesignPage />,
  sandeneStrategies: () => <SandeneStrategiesPage />,
  fynn: () => <FynnPartner />,
  hoorayHealth: () => <HoorayHealthPartner />,
  staffingForHealthcare: () => <StaffingForHealthcarePage />,
  levelC: () => <LevelCSolutionsPage />,
  corporateTalentFinder: () => <CorporateTalentFinderPage />,
  criminal: () => <CriminalBackgroundChecksPage />,
  employment: () => <EmploymentVerificationPage />,
  drug: () => <DrugScreeningPage />,
  educationVerification: () => <EducationVerificationPage />,
  mvr: () => <MVRChecksPage />,
  privacy: () => <PrivacyPolicy />,
  terms: () => <TermsOfService />,
  fcraNews: () => <FCRANews />,
  services: () => <ServicesPage />,
  industries: () => <IndustriesPage />,
  contact: () => <ContactPage />,
  why: () => <WhySaffHirePage />,
  accountSetup: () => <AccountSetup />,
  faq: () => <FAQPage />,
  frisco: () => <BackgroundScreeningFriscoPage />,
  dallas: () => <BackgroundScreeningDallasPage />,
  plano: () => <BackgroundScreeningPlanoPage />,
  mckinney: () => <BackgroundScreeningMckinney />,
  allen: () => <BackgroundScreeningAllenPage />,
  notFound: () => <NotFound />,
};

export default function LegacyClientPage({ page, path }: { page: PageKey; path: string }) {
  const useStaticLocation = () => [path, () => undefined] as const;
  return (
    <ThemeProvider defaultTheme="light">
      <TooltipProvider>
        <Router hook={useStaticLocation as any}>{pageMap[page]()}</Router>
        <Toaster />
      </TooltipProvider>
    </ThemeProvider>
  );
}
