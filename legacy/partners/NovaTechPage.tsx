import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageSEO from "@/components/PageSEO";

import {
  CheckCircle,
  Monitor,
  Shield,
  Cloud,
  Printer,
  Phone,
  Settings,
  ArrowRight,
} from "lucide-react";

const NOVATECH_LOGO = "/images/partner-novatech.png";

const services = [
  { icon: Monitor, title: "Managed IT Services", description: "24/7 monitoring, remote helpdesk, and network consulting." },
  { icon: Shield, title: "Managed Cybersecurity", description: "Detection and response, firewall, Zero Trust, and awareness training." },
  { icon: Cloud, title: "Cloud Solutions", description: "Microsoft 365, Azure, collaboration tools, and document workflow." },
  { icon: Printer, title: "Copiers and Printers", description: "Managed print services from leading manufacturers." },
  { icon: Phone, title: "Voice and Video Collaboration", description: "Unified communications and video conferencing." },
  { icon: Settings, title: "Professional Services", description: "Hardware, infrastructure, and print management tailored to your workflows." },
];

export default function NovaTechPage() {
  return (
    <div className="min-h-screen bg-white">
      <PageSEO path="/referral-partners/novatech" title="NovaTech Referral Partner" description="SaffHire and NovaTech partnership. Background screening solutions for NovaTech clients." />
      <Navbar />
      <section className="bg-[#0a1628] pt-28 pb-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="bg-[#0f172a] rounded-xl p-5 inline-block mb-6 shadow-lg">
                <img src={NOVATECH_LOGO} alt="NovaTech" className="h-12 w-auto object-contain" />
              </div>
              <p className="text-[#39b54a] font-semibold text-sm uppercase tracking-widest mb-3">Managed IT Services Partner</p>
              <h1 className="text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-5">Bring Everything Up to Speed</h1>
              <p className="text-gray-300 text-lg leading-relaxed mb-8">NovaTech is a full-service managed office technology provider delivering IT support, cybersecurity, cloud solutions, and print management.</p>
              <a href="/#contact" className="inline-flex items-center gap-2 bg-[#39b54a] hover:bg-[#2ea03e] text-white font-bold px-8 py-4 rounded-lg transition-colors text-lg">Request an Introduction <ArrowRight className="w-5 h-5" /></a>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 bg-[#f8f9fa]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div key={service.title} className="bg-white rounded-xl p-6 shadow-sm">
                <div className="w-12 h-12 bg-[#0a1628] rounded-xl flex items-center justify-center mb-4">
                  <service.icon className="w-6 h-6 text-[#39b54a]" />
                </div>
                <h3 className="text-lg font-bold text-[#0a1628] mb-2">{service.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
