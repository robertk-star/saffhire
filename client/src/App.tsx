import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import HealthcarePage from "./pages/HealthcarePage";
import StaffingPage from "./pages/StaffingPage";
import TransportationPage from "./pages/TransportationPage";
import ManufacturingPage from "./pages/ManufacturingPage";
import HospitalityPage from "./pages/HospitalityPage";
import EnergyPage from "./pages/EnergyPage";
import EducationPage from "./pages/EducationPage";
import ChurchNonProfitPage from "./pages/ChurchNonProfitPage";
import ReferralPartners from "./pages/ReferralPartners";
import BenefitsMePage from "./pages/partners/BenefitsMePage";
import WorkShieldPage from "./pages/partners/WorkShieldPage";
import GMGSavingsPage from "./pages/partners/GMGSavingsPage";
import NovaTechPage from "./pages/partners/NovaTechPage";
import DefenseByDesignPage from "./pages/partners/DefenseByDesignPage";
import SandeneStrategiesPage from "./pages/partners/SandeneStrategiesPage";
import FynnPartner from "./pages/FynnPartner";
import HoorayHealthPartner from "./pages/HoorayHealthPartner";
import StaffingForHealthcarePage from "./pages/StaffingForHealthcarePage";
import LevelCSolutionsPage from "./pages/LevelCSolutionsPage";
import CriminalBackgroundChecksPage from "./pages/CriminalBackgroundChecksPage";
import EmploymentVerificationPage from "./pages/EmploymentVerificationPage";
import DrugScreeningPage from "./pages/DrugScreeningPage";
import EducationVerificationPage from "./pages/EducationVerificationPage";
import MVRChecksPage from "./pages/MVRChecksPage";
import CriminalBackgroundChecks from "./pages/CriminalBackgroundChecks";
import EmploymentVerification from "./pages/EmploymentVerification";
import EducationVerification from "./pages/EducationVerification";
import DrugScreening from "./pages/DrugScreening";
import MVRChecks from "./pages/MVRChecks";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import FCRANews from "./pages/FCRANews";
import ServicesPage from "./pages/ServicesPage";
import IndustriesPage from "./pages/IndustriesPage";
import ContactPage from "./pages/ContactPage";
import WhySaffHirePage from "./pages/WhySaffHirePage";
import AccountSetup from "./pages/AccountSetup";
import FAQPage from "./pages/FAQPage";
import BackgroundScreeningFriscoPage from "./pages/BackgroundScreeningFriscoPage";
import BackgroundScreeningDallasPage from "./pages/BackgroundScreeningDallasPage";
import BackgroundScreeningPlanoPage from "./pages/BackgroundScreeningPlanoPage";
import BackgroundScreeningMckinney from "./pages/BackgroundScreeningMckinney";
import BackgroundScreeningAllenPage from "./pages/BackgroundScreeningAllenPage";

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/blog"} component={Blog} />
      <Route path={"/blog/:slug"} component={BlogPost} />
      <Route path={"/industries/healthcare"} component={HealthcarePage} />
      <Route path={"/industries/staffing"} component={StaffingPage} />
      <Route path={"/industries/transportation"} component={TransportationPage} />
      <Route path={"/industries/manufacturing"} component={ManufacturingPage} />
      <Route path={"/industries/hospitality"} component={HospitalityPage} />
      <Route path={"/industries/energy"} component={EnergyPage} />
      <Route path={"/industries/education"} component={EducationPage} />
      <Route path={"/industries/church-nonprofit"} component={ChurchNonProfitPage} />
      <Route path={"/referral-partners"} component={ReferralPartners} />
      <Route path={"/referral-partners/benefitsme"} component={BenefitsMePage} />
      <Route path={"/referral-partners/workshield"} component={WorkShieldPage} />
      <Route path={"/referral-partners/gmg-savings"} component={GMGSavingsPage} />
      <Route path={"/referral-partners/novatech"} component={NovaTechPage} />
      <Route path={"/referral-partners/defense-by-design"} component={DefenseByDesignPage} />
      <Route path={"/referral-partners/sandene-strategies"} component={SandeneStrategiesPage} />
      <Route path={"/referral-partners/fynn"} component={FynnPartner} />
      <Route path={"/referral-partners/hooray-health"} component={HoorayHealthPartner} />
      <Route path={"/referral-partners/staffing-for-healthcare"} component={StaffingForHealthcarePage} />
      <Route path={"/referral-partners/level-c-solutions"} component={LevelCSolutionsPage} />
      <Route path={"/test-signup"} component={AccountSetup} />
      <Route path={"/criminal-background-checks"} component={CriminalBackgroundChecksPage} />
      <Route path={"/employment-verification"} component={EmploymentVerificationPage} />
      <Route path={"/education-verification"} component={EducationVerificationPage} />
      <Route path={"/drug-screening"} component={DrugScreeningPage} />
      <Route path={"/mvr-checks"} component={MVRChecksPage} />
      <Route path={"/privacy-policy"} component={PrivacyPolicy} />
      <Route path={"/terms-of-service"} component={TermsOfService} />
      <Route path={"/fcra-news"} component={FCRANews} />
      <Route path={"/services"} component={ServicesPage} />
      <Route path={"/industries"} component={IndustriesPage} />
      <Route path={"/contact"} component={ContactPage} />
      <Route path={"/why-saffhire"} component={WhySaffHirePage} />
      <Route path={"/faq"} component={FAQPage} />
      <Route path={"/background-screening-frisco-tx"} component={BackgroundScreeningFriscoPage} />
      <Route path={"/background-screening-dallas-tx"} component={BackgroundScreeningDallasPage} />
      <Route path={"/background-screening-plano-tx"} component={BackgroundScreeningPlanoPage} />
      <Route path={"/background-screening-mckinney-tx"} component={BackgroundScreeningMckinney} />
      <Route path={"/background-screening-allen-tx"} component={BackgroundScreeningAllenPage} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
