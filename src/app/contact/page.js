"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { addEnquiry } from "@/service/firestore.service";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    course: "Advanced Personal Training",
    experience: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    if (form.name && form.email && form.phone) {
      setIsSubmitting(true);
      try {
        await addEnquiry({
          name: form.name,
          email: form.email,
          phone: form.phone,
          course: form.course,
          experience: form.experience,
        });
        setSubmitted(true);
        setForm({
          name: "",
          email: "",
          phone: "",
          course: "Advanced Personal Training",
          experience: "",
        });
        setTimeout(() => {
          setSubmitted(false);
        }, 5000);
      } catch (err) {
        console.error(err);
        setSubmitError("Failed to submit application. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <>
      <Navbar />

      <main className="pt-32 pb-24 max-w-[1440px] mx-auto px-6 md:px-12 bg-black min-h-screen">
        {/* Hero Section */}
        <header className="mb-16 text-center lg:text-left">
          <span className="text-secondary-container font-body font-bold text-xs uppercase tracking-[0.3em] block mb-2">Get In Touch</span>
          <h1 className="font-display text-4xl md:text-6xl font-black uppercase mb-4 text-on-surface">
            Elite <span className="text-secondary-container">Admissions</span>
          </h1>
          <p className="font-body text-base text-on-surface-variant max-w-2xl leading-relaxed">
            Elevate your professional trajectory at India&apos;s premier fitness research institute. Join the league of elite performance specialists.
          </p>
        </header>

        {/* Main Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: Enquiry Form */}
          <section className="lg:col-span-7 glass-panel p-8 md:p-10 rounded relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-secondary-container"></div>
            <h2 className="font-display text-2xl font-bold uppercase mb-8 text-white">Application Enquiry</h2>
            
            {submitted ? (
              <div className="p-8 text-center bg-green-500/10 border border-green-500/30 rounded text-green-500">
                <span className="material-symbols-outlined text-5xl mb-3">check_circle</span>
                <p className="font-body font-bold uppercase text-sm">Application Received!</p>
                <p className="text-xs text-on-surface-variant mt-2 font-body">Our admissions registrar has logged your request. We will contact you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="font-body font-bold text-[10px] uppercase text-on-surface/60 tracking-wider block">Full Name</label>
                    <input 
                      name="name"
                      value={form.name}
                      onChange={handleInputChange}
                      required
                      type="text" 
                      className="w-full bg-black border border-white/10 focus:border-secondary-container text-white py-3 px-4 text-sm rounded outline-none transition-all placeholder:text-white/20" 
                      placeholder="e.g. ARJUN SHARMA" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="font-body font-bold text-[10px] uppercase text-on-surface/60 tracking-wider block">Email Address</label>
                    <input 
                      name="email"
                      value={form.email}
                      onChange={handleInputChange}
                      required
                      type="email" 
                      className="w-full bg-black border border-white/10 focus:border-secondary-container text-white py-3 px-4 text-sm rounded outline-none transition-all placeholder:text-white/20" 
                      placeholder="arjun.s@performance.com" 
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="font-body font-bold text-[10px] uppercase text-on-surface/60 tracking-wider block">Mobile Number</label>
                    <input 
                      name="phone"
                      value={form.phone}
                      onChange={handleInputChange}
                      required
                      type="tel" 
                      className="w-full bg-black border border-white/10 focus:border-secondary-container text-white py-3 px-4 text-sm rounded outline-none transition-all placeholder:text-white/20" 
                      placeholder="+91 98XXX XXXXX" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="font-body font-bold text-[10px] uppercase text-on-surface/60 tracking-wider block">Desired Course</label>
                    <select 
                      name="course"
                      value={form.course}
                      onChange={handleInputChange}
                      className="w-full bg-black border border-white/10 focus:border-secondary-container text-white py-3 px-4 text-sm rounded outline-none transition-all"
                    >
                      <option>GYM Membership</option>
                      <option>Diet Plans</option>
                      <option>CERTIFIED PERSONAL TRAINER</option>
                      <option>CERTIFICATION IN NUTRITION & DIETETICS</option>
                      <option>Combo Courses</option>
                    </select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="font-body font-bold text-[10px] uppercase text-on-surface/60 tracking-wider block">Your Experience / Goals</label>
                  <textarea 
                    name="experience"
                    value={form.experience}
                    onChange={handleInputChange}
                    className="w-full bg-black border border-white/10 focus:border-secondary-container text-white py-3 px-4 text-sm rounded outline-none transition-all placeholder:text-white/20" 
                    placeholder="Tell us about your fitness background..." 
                    rows="4"
                  />
                </div>
                                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full py-4 bg-secondary-container text-white font-body font-bold uppercase tracking-[0.2em] red-glow-hover transition-all hover:scale-[1.01] active:scale-95 text-xs disabled:opacity-50 disabled:pointer-events-none"
                >
                  {isSubmitting ? "SUBMITTING..." : "SUBMIT APPLICATION"}
                </button>
                {submitError && (
                  <p className="text-red-500 text-xs mt-2 font-body font-bold text-center">{submitError}</p>
                )}
              </form>
            )}
          </section>

          {/* Right: Contact Details & Map */}
          <aside className="lg:col-span-5 space-y-8">
            <div className="bg-surface-container-low border border-white/5 p-8 space-y-8 rounded">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-secondary-container text-3xl">location_on</span>
                  <div>
                    <h3 className="font-body font-bold text-xs uppercase text-secondary-container tracking-wider">Headquarters</h3>
                    <p className="text-on-surface-variant text-sm mt-1 leading-relaxed">
                      IIFN Performance Lab,<br/>Swastipally, Est Burdwan-713104, West Bengal, India
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-secondary-container text-3xl">schedule</span>
                  <div>
                    <h3 className="font-body font-bold text-xs uppercase text-secondary-container tracking-wider">Performance Hours</h3>
                    <p className="text-on-surface-variant text-sm mt-1">Mon - Fri: 08:00 - 20:00</p>
                    <div className="mt-2 flex gap-2 items-center">
                      <span className="px-2 py-0.5 bg-secondary-container/20 text-secondary-container text-[9px] font-black uppercase rounded-sm border border-secondary-container/10">Classes Active</span>
                      <p className="text-on-surface text-xs font-bold font-body">Sat - Sun: 09:00 - 17:00</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Call / Chat Shortcuts */}
              <div className="grid grid-cols-2 gap-4">
                <a href="tel:+917001625285" className="flex items-center justify-center gap-2 py-3 border border-white/20 text-white font-body font-bold uppercase text-[10px] tracking-wider hover:bg-white hover:text-black transition-all rounded">
                  <span className="material-symbols-outlined text-sm">call</span> CALL NOW
                </a>
                <a href="https://wa.me/917001625285" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 py-3 border border-white/20 text-white font-body font-bold uppercase text-[10px] tracking-wider hover:bg-secondary-container hover:border-secondary-container transition-all rounded">
                  <span className="material-symbols-outlined text-sm">chat</span> WHATSAPP
                </a>
              </div>

              {/* Social Row */}
              <div className="flex items-center gap-6 pt-6 border-t border-white/10">
                <span className="font-body font-bold text-[9px] uppercase tracking-widest text-on-surface/40">Connect</span>
                <div className="flex gap-3">
                  {["photo_camera", "smart_display", "share"].map((icon, idx) => (
                    <a key={idx} href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-surface-container-high text-secondary-container hover:bg-secondary-container hover:text-white transition-all">
                      <span className="material-symbols-outlined text-base">{icon}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Map Widget (Stylized dark representation) */}
            <div className="h-64 w-full bg-surface-container-lowest border border-white/5 relative group overflow-hidden rounded grayscale hover:grayscale-0 transition-all duration-700">
              <div className="w-full h-full flex items-center justify-center bg-[#0a0a0a]">
                <div className="text-center p-8">
                  <span className="material-symbols-outlined text-secondary-container text-4xl mb-3 animate-bounce">
                    map
                  </span>
                  <p className="font-body font-bold uppercase tracking-wider text-[10px] text-on-surface/40">Interactive Map Loading</p>
                </div>
              </div>
              <div className="absolute inset-0 pointer-events-none border-4 border-black/20"></div>
            </div>
          </aside>
        </div>

        {/* Admissions Timeline */}
        <section className="mt-24 border-t border-white/10 pt-16">
          <h2 className="font-display text-3xl font-black uppercase mb-12 text-center lg:text-left">
            The Admission <span className="text-secondary-container">Cycle</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { num: "01", title: "Application Review", desc: "Our admissions committee evaluates your fitness background and professional intent to ensure a cohort of high-performing individuals." },
              { num: "02", title: "Elite Interview", desc: "A session with our lead faculty to map your career goals with our rigorous science-based curriculum." },
              { num: "03", title: "Lab Induction", desc: "Once accepted, you receive your Student Portal credentials and preparatory high-intensity training materials." }
            ].map((step, idx) => (
              <div key={idx} className="space-y-4 bg-white/5 p-6 rounded border border-white/5">
                <div className="text-secondary-container font-display text-4xl font-black opacity-30 leading-none">{step.num}</div>
                <h3 className="font-display font-bold text-base uppercase text-white">{step.title}</h3>
                <p className="text-on-surface-variant text-sm font-body leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
