/*
 * Fynn Referral Partner Page
 * Route: /referral-partners/fynn
 */

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { trpc } from "@/lib/trpc";
import PageSEO from "@/components/PageSEO";

import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Zap,
  Users,
  BarChart3,
  Shield,
  Send,
  Loader2,
} from "lucide-react";

const FYNN_LOGO =
  "/images/partner-fynn.svg";

const features = [
  { icon: Zap, title: "Resident-Centered Intelligence", description: "Fynn monitors behaviors, mood, and subtle changes in condition to surface at-risk residents sooner." },
  { icon: Users, title: "Proactive Care Workflows", description: "Developed with Mayo Clinic, Fynn identifies risk earlier and embeds proactive workflows into daily care." },
  { icon: BarChart3, title: "Real-Time Leadership Dashboards", description: "Leaders get real-time dashboards that track KPIs, trends, and compliance." },
  { icon: Shield, title: "Family Engagement & Transparency", description: "Families get controlled, real-time visibility into their loved one's care." },
];

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  facilityType: string;
  message: string;
};

const EMPTY_FORM: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  company: "",
  facilityType: "",
  message: "",
};

export default function FynnPartner() {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState("");

  const submitLead = trpc.referral.submitLead.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      setForm(EMPTY_FORM);
      setFormError("");
    },
    onError: (err) => {
      setFormError(err.message || "Something went wrong. Please try again.");
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    if (!form.firstName || !form.lastName || !form.email) {
      setFormError("Please fill in all required fields.");
      return;
    }
    submitLead.mutate({ partnerSlug: "fynn", partnerName: "Fynn", ...form });
  };

  return (
    <div className="min-h-screen bg-white">
      <PageSEO path="/referral-partners/fynn" title="Fynn Referral Partner" description="SaffHire and Fynn partnership. AI-driven EHR for senior living communities paired with thorough background screening." />
      <Navbar />
      <section className="pt-20" style={{ backgroundColor: "#0f172a" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <a href="/referral-partners" className="inline-flex items-center gap-2 text-gray-400 hover:text-green-400 transition-colors text-sm mb-8"><ArrowLeft size={14} />Back to Referral Partners</a>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block text-xs font-bold uppercase tracking-widest mb-4 px-3 py-1 rounded-full" style={{ backgroundColor: "rgba(34,197,94,0.15)", color: "#22c55e", fontFamily: "'Montserrat', sans-serif" }}>Healthcare Technology</span>
              <h1 className="text-4xl lg:text-5xl font-black text-white mb-4 leading-tight" style={{ fontFamily: "'Montserrat', sans-serif" }}>Fynn</h1>
              <p className="text-lg font-semibold mb-5" style={{ color: "#22c55e", fontFamily: "'Montserrat', sans-serif" }}>AI-Driven EHR for Senior Living</p>
              <p className="text-gray-300 leading-relaxed mb-8 max-w-lg">Fynn is an intelligent electronic health record platform designed specifically for Assisted Living and Memory Care facilities.</p>
            </div>
            <div className="flex items-center justify-center">
              <div className="rounded-2xl p-12 flex items-center justify-center shadow-2xl" style={{ backgroundColor: "#ffffff", width: "100%", maxWidth: 420, minHeight: 220 }}>
                <img src={FYNN_LOGO} alt="Fynn logo" className="max-h-20 max-w-full object-contain" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20" style={{ backgroundColor: "#f8fafc" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="bg-white rounded-xl p-8 border border-gray-100 shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#f0fdf4" }}><Icon size={24} style={{ color: "#22c55e" }} /></div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>{feature.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
