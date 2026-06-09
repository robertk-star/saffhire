'use client';

import { ReactNode } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Router, Route } from 'wouter';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/contexts/ThemeContext';

import Home from '@/legacy/Home';
import Blog from '@/legacy/Blog';
import BlogPost from '@/legacy/BlogPost';
import HealthcarePage from '@/legacy/HealthcarePage';
import StaffingPage from '@/legacy/StaffingPage';
import TransportationPage from '@/legacy/TransportationPage';
import ManufacturingPage from '@/legacy/ManufacturingPage';
import HospitalityPage from '@/legacy/HospitalityPage';
import EnergyPage from '@/legacy/EnergyPage';
import EducationPage from '@/legacy/EducationPage';
import ChurchNonProfitPage from '@/legacy/ChurchNonProfitPage';
import ReferralPartners from '@/legacy/ReferralPartners';
import BenefitsMePage from '@/legacy/partners/BenefitsMePage';
import WorkShieldPage from '@/legacy/partners/WorkShieldPage';
import GMGSavingsPage from '@/legacy/partners/GMGSavingsPage';
import NovaTechPage from '@/legacy/partners/NovaTechPage';
import DefenseByDesignPage from '@/legacy/partners/DefenseByDesignPage';
import SandeneStrategiesPage from '@/legacy/partners/SandeneStrategiesPage';
import FynnPartner from '@/legacy/FynnPartner';
import HoorayHealthPartner from '@/legacy/HoorayHealthPartner';
import StaffingForHealthcarePage from '@/legacy/StaffingForHealthcarePage';
import LevelCSolutionsPage from '@/legacy/LevelCSolutionsPage';
import CriminalBackgroundChecksPage from '@/legacy/CriminalBackgroundChecksPage';
import EmploymentVerificationPage from '@/legacy/EmploymentVerificationPage';
import DrugScreeningPage from '@/legacy/DrugScreeningPage';
import EducationVerificationPage from '@/legacy/EducationVerificationPage';
import MVRChecksPage from '@/legacy/MVRChecksPage';
import PrivacyPolicy from '@/legacy/PrivacyPolicy';
import TermsOfService from '@/legacy/TermsOfService';
import FCRANews from '@/legacy/FCRANews';
import ServicesPage from '@/legacy/ServicesPage';
import IndustriesPage from '@/legacy/IndustriesPage';
import ContactPage from '@/legacy/ContactPage';
import WhySaffHirePage from '@/legacy/WhySaffHirePage';
import AccountSetup from '@/legacy/AccountSetup';
import FAQPage from '@/legacy/FAQPage';
import BackgroundScreeningFriscoPage from '@/legacy/BackgroundScreeningFriscoPage';
import BackgroundScreeningDallasPage from '@/legacy/BackgroundScreeningDallasPage';
import BackgroundScreeningPlanoPage from '@/legacy/BackgroundScreeningPlanoPage';
import BackgroundScreeningMckinney from '@/legacy/BackgroundScreeningMckinney';
import BackgroundScreeningAllenPage from '@/legacy/BackgroundScreeningAllenPage';
import NotFound from '@/legacy/NotFound';

type PageKey =
  | 'home' | 'blog' | 'blogPost' | 'healthcare' | 'staffing' | 'transportation' | 'manufacturing' | 'hospitality' | 'energy' | 'education' | 'churchNonprofit'
  | 'referralPartners' | 'benefitsMe' | 'workShield' | 'gmgSavings' | 'novaTech' | 'defenseByDesign' | 'sandeneStrategies' | 'fynn' | 'hoorayHealth' | 'staffingForHealthcare' | 'levelC'
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
    <HelmetProvider>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Router hook={useStaticLocation as any}>{pageMap[page]()}</Router>
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}
