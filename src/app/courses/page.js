"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function Courses() {
  const [showAdvisorModal, setShowAdvisorModal] = useState(false);
  const [counselorSubmitted, setCounselorSubmitted] = useState(false);
  const [advisorForm, setAdvisorForm] = useState({ name: "", phone: "", email: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdvisorForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdvisorSubmit = (e) => {
    e.preventDefault();
    if (advisorForm.name && advisorForm.phone && advisorForm.email) {
      setCounselorSubmitted(true);
      setTimeout(() => {
        setCounselorSubmitted(false);
        setShowAdvisorModal(false);
        setAdvisorForm({ name: "", phone: "", email: "" });
      }, 4000);
    }
  };

  return (
    <>
      <Navbar />

      <main className="pt-32 pb-24 bg-black min-h-screen">
        {/* Hero Title Section */}
        <section className="max-w-[1440px] mx-auto px-6 md:px-12 mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-l-4 border-secondary-container pl-8">
            <div>
              <span className="font-body font-bold text-[10px] text-secondary-container tracking-[0.3em] uppercase block mb-2">Academic Offerings</span>
              <h1 className="font-display text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-4 text-white">
                Elite Performance<br/><span className="text-secondary-container">Curriculum</span>
              </h1>
              <p className="font-body text-base text-on-surface-variant max-w-2xl leading-relaxed">
                Industry-leading certifications designed for the next generation of high-performance coaches and clinical nutrition specialists. Driven by science, tested in the lab.
              </p>
            </div>
            <div className="flex flex-col items-start md:items-end gap-2 shrink-0">
              <span className="font-body font-bold text-xs text-secondary-container tracking-[0.2em] uppercase">Status: Open Enrollment</span>
              <div className="h-1 w-32 bg-secondary-container"></div>
            </div>
          </div>
        </section>

        {/* Bento Course Grid */}
        <section className="max-w-[1440px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Course 1: Diploma in Personal Training */}
          <div className="md:col-span-8 bg-[#111] border border-white/5 hover:border-secondary-container/50 transition-all duration-500 overflow-hidden relative rounded group">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-secondary-container"></div>
            <div className="flex flex-col lg:flex-row h-full">
              <div 
                className="lg:w-1/2 relative min-h-[300px] bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-700"
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=2069&auto=format&fit=crop')` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#111111] hidden lg:block" />
              </div>
              <div className="lg:w-1/2 p-8 md:p-10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <span className="bg-secondary-container text-white px-3 py-1 font-body font-bold text-[9px] uppercase tracking-widest">Most Popular</span>
                    <span className="text-on-surface-variant font-body font-bold text-[11px] flex items-center gap-1 uppercase">
                      <span className="material-symbols-outlined text-sm">schedule</span> 6 Months
                    </span>
                  </div>
                  <h2 className="font-display font-black text-2xl md:text-3xl mb-4 leading-tight uppercase text-white">
                    Diploma in <span class="text-secondary-container">Personal Training</span> + CPR
                  </h2>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center gap-3 text-on-surface-variant font-body text-sm">
                      <span className="material-symbols-outlined text-secondary-container text-base">check_circle</span>
                      Live practical training sessions
                    </li>
                    <li className="flex items-center gap-3 text-on-surface-variant font-body text-sm">
                      <span className="material-symbols-outlined text-secondary-container text-base">check_circle</span>
                      10+ Global Certifications included
                    </li>
                    <li className="flex items-center gap-3 text-on-surface-variant font-body text-sm">
                      <span className="material-symbols-outlined text-secondary-container text-base">check_circle</span>
                      Hybrid Mode: Online + Offline access
                    </li>
                  </ul>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                  <Link href="/cpt" className="flex-1 text-center bg-secondary-container text-white font-body font-bold text-xs py-4 px-6 uppercase tracking-widest red-glow-hover transition-all duration-300 active:scale-95">
                    Enroll Now
                  </Link>
                  <Link href="/cpt" className="flex-1 text-center border-white/20 border-2 text-white font-body font-bold text-xs py-4 px-6 uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300">
                    View Syllabus
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Stats/Atmosphere Block */}
          <div className="md:col-span-4 bg-secondary-container p-8 flex flex-col justify-center items-center text-center rounded relative overflow-hidden group">
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
            <div className="relative z-10">
              <span className="material-symbols-outlined text-5xl mb-4 text-white">fitness_center</span>
              <div className="font-display text-5xl font-black text-white leading-none">25K+</div>
              <div className="font-body font-bold text-white uppercase tracking-[0.2em] text-[10px] mt-2">Elite Graduates</div>
              <p className="mt-6 text-white/80 font-body text-sm max-w-[200px] mx-auto leading-relaxed">Join India's most intensive training ecosystem.</p>
            </div>
          </div>

          {/* Course 2: Diploma in Applied Nutrition */}
          <div className="md:col-span-6 bg-[#111111] border border-white/5 hover:border-secondary-container/50 transition-all duration-500 flex flex-col rounded group overflow-hidden">
            <div className="relative h-64 overflow-hidden">
              <div 
                className="absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-700" 
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=2070&auto=format&fit=crop')` }}
              />
              <div className="absolute top-4 right-4 bg-surface/80 backdrop-blur-md px-3 py-1 font-body font-bold text-[9px] text-white uppercase rounded-sm border border-white/5">Advanced Level</div>
            </div>
            <div className="p-8 md:p-10 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-on-surface-variant font-body font-bold text-[11px] flex items-center gap-1 uppercase">
                    <span className="material-symbols-outlined text-sm">schedule</span> 12 Months
                  </span>
                  <span className="text-on-surface-variant font-body font-bold text-[11px] flex items-center gap-1 uppercase">
                    <span className="material-symbols-outlined text-sm">language</span> Online
                  </span>
                </div>
                <h2 className="font-display font-black text-xl md:text-2xl mb-4 leading-tight uppercase text-white">
                  Diploma in <span className="text-secondary-container">Applied Nutrition</span>, Food Science &amp; Dietetics
                </h2>
                <p className="text-on-surface-variant font-body text-sm mb-8 leading-relaxed">Master the clinical side of fitness. From metabolic pathways to medical nutrition therapy, become a certified specialist in performance fueling.</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                <Link href="/cpt" className="flex-1 text-center bg-secondary-container text-white font-body font-bold text-xs py-4 px-6 uppercase tracking-widest red-glow-hover transition-all duration-300">
                  Enroll Now
                </Link>
                <Link href="/cpt" className="flex-1 text-center border-white/10 border font-body font-bold text-xs py-4 px-6 uppercase tracking-widest text-on-surface-variant hover:text-white hover:border-white transition-all duration-300">
                  View Syllabus
                </Link>
              </div>
            </div>
          </div>

          {/* Course 3: Certification in Applied Nutrition */}
          <div className="md:col-span-6 bg-[#111111] border border-white/5 hover:border-secondary-container/50 transition-all duration-500 flex flex-col rounded group overflow-hidden">
            <div className="relative h-64 overflow-hidden">
              <div 
                className="absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-700" 
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=2070&auto=format&fit=crop')` }}
              />
              <div className="absolute top-4 right-4 bg-surface/80 backdrop-blur-md px-3 py-1 font-body font-bold text-[9px] text-white uppercase rounded-sm border border-white/5">Foundation</div>
            </div>
            <div className="p-8 md:p-10 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-on-surface-variant font-body font-bold text-[11px] flex items-center gap-1 uppercase">
                    <span className="material-symbols-outlined text-sm">schedule</span> 4 Months
                  </span>
                  <span className="text-on-surface-variant font-body font-bold text-[11px] flex items-center gap-1 uppercase">
                    <span className="material-symbols-outlined text-sm">bolt</span> Fast-track
                  </span>
                </div>
                <h2 className="font-display font-black text-xl md:text-2xl mb-4 leading-tight uppercase text-white">
                  Certification in <span className="text-secondary-container">Applied Nutrition</span>
                </h2>
                <p className="text-on-surface-variant font-body text-sm mb-8 leading-relaxed">Perfect for athletes and entry-level coaches looking to master the fundamentals of macros, micros, and effective supplement strategies.</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                <Link href="/cpt" className="flex-1 text-center bg-secondary-container text-white font-body font-bold text-xs py-4 px-6 uppercase tracking-widest red-glow-hover transition-all duration-300">
                  Enroll Now
                </Link>
                <Link href="/cpt" className="flex-1 text-center border-white/10 border font-body font-bold text-xs py-4 px-6 uppercase tracking-widest text-on-surface-variant hover:text-white hover:border-white transition-all duration-300">
                  View Syllabus
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Lab Advisor CTA Section */}
        <section className="max-w-[1440px] mx-auto px-6 md:px-12 mt-24">
          <div className="bg-[#0e0e0e] border border-white/5 p-12 md:p-24 flex flex-col items-center text-center relative overflow-hidden rounded">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-secondary-container to-transparent opacity-50"></div>
            <h3 className="font-display text-3xl font-black mb-6 uppercase tracking-tighter text-white">Not sure which path to take?</h3>
            <p className="font-body text-base text-on-surface-variant max-w-xl mb-8 leading-relaxed">
              Our academic advisors are available for a 1-on-1 performance consultation to map out your career in the fitness industry.
            </p>
            <button 
              onClick={() => setShowAdvisorModal(true)}
              className="border-2 border-white text-white px-10 py-5 font-body font-bold text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-500"
            >
              Talk to an Advisor
            </button>
          </div>
        </section>
      </main>

      {/* Advisor Consultation Modal */}
      {showAdvisorModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex items-center justify-center p-4">
          <div className="bg-surface-container-low border border-white/10 p-8 rounded max-w-md w-full relative">
            <button 
              onClick={() => setShowAdvisorModal(false)}
              className="material-symbols-outlined text-on-surface/50 hover:text-white absolute top-4 right-4 text-2xl cursor-pointer"
            >
              close
            </button>
            <h3 className="font-display font-black text-xl uppercase mb-2 text-white">Academic Advisor Contact</h3>
            <p className="text-on-surface-variant text-xs mb-6 font-body">Complete the details below, and an expert will get in touch.</p>
            
            {counselorSubmitted ? (
              <div className="py-8 text-center text-green-500 bg-green-500/10 border border-green-500/20 rounded">
                <span className="material-symbols-outlined text-4xl mb-2">done_all</span>
                <p className="font-body font-bold uppercase text-xs">Consultation Requested</p>
                <p className="text-[10px] text-on-surface-variant mt-1">We will call you back in 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleAdvisorSubmit} className="space-y-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] uppercase tracking-wider font-bold text-on-surface/50">Full Name</label>
                  <input 
                    name="name"
                    value={advisorForm.name}
                    onChange={handleInputChange}
                    required
                    type="text" 
                    className="w-full bg-black border border-white/10 p-3 outline-none focus:border-secondary-container text-white text-sm rounded" 
                    placeholder="Arjun Verma"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] uppercase tracking-wider font-bold text-on-surface/50">Phone Number</label>
                  <input 
                    name="phone"
                    value={advisorForm.phone}
                    onChange={handleInputChange}
                    required
                    type="tel" 
                    className="w-full bg-black border border-white/10 p-3 outline-none focus:border-secondary-container text-white text-sm rounded" 
                    placeholder="+91 99999 88888"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] uppercase tracking-wider font-bold text-on-surface/50">Email Address</label>
                  <input 
                    name="email"
                    value={advisorForm.email}
                    onChange={handleInputChange}
                    required
                    type="email" 
                    className="w-full bg-black border border-white/10 p-3 outline-none focus:border-secondary-container text-white text-sm rounded" 
                    placeholder="arjun@example.com"
                  />
                </div>
                <button 
                  type="submit" 
                  className="w-full bg-secondary-container text-white py-4 font-body font-bold text-xs uppercase tracking-widest hover:scale-105 active:scale-95 red-glow-hover transition-all"
                >
                  Request Consultation
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
