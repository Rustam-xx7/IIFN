"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function About() {
  const stats = [
    { value: "15,000+", label: "Students Certified" },
    { value: "12+", label: "Years of Excellence" },
    { value: "94%", label: "Placement Rate" }
  ];

  const affiliations = [
    { entity: "Ministry of Corporate Affairs (MCA)", reg: "U85300DL2021PTC384952", status: "Verified" },
    { entity: "ISO 9001:2015 Quality Management", reg: "21EQHV89", status: "Certified" },
    { entity: "Skill India Mission (NSDC Partner)", reg: "TP064522", status: "Active" },
    { entity: "FIT India Movement Registration", reg: "FI2022APP8829", status: "Registered" },
    { entity: "MSME (Udyam Registration)", reg: "UDYAM-DL-08-0012943", status: "Active" },
    { entity: "NITI Aayog (NGO Darpan)", reg: "DL/2021/0291484", status: "Active" },
    { entity: "International Health & Fitness Association", reg: "IHFA-MEM-IIFN-2024", status: "Member" }
  ];

  const faculty = [
    {
      name: "Dr. Aryan Sharma",
      role: "Master Diploma in Fitness",
      desc: "15+ Years Industry Experience, Specialist in Biomechanics.",
      img: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=2070&auto=format&fit=crop"
    },
    {
      name: "Sneha Kapoor",
      role: "Sports Nutrition Head",
      desc: "Registered Dietitian, Performance Nutrition Expert.",
      img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2069&auto=format&fit=crop"
    },
    {
      name: "Vikram Rathore",
      role: "Strength Specialist",
      desc: "Olympic Weightlifting Coach, CSCS Certified.",
      img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=2069&auto=format&fit=crop"
    },
    {
      name: "Rajesh Mehra",
      role: "Clinical Exercise",
      desc: "Physiotherapist & Advanced Personal Trainer.",
      img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop"
    }
  ];

  return (
    <>
      <Navbar />

      <main className="performance-grid bg-black min-h-screen">
        
        {/* Hero Section */}
        <section className="relative h-[80vh] min-h-[600px] w-full flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/60 to-background z-10"></div>
            <div 
              className="w-full h-full bg-cover bg-center grayscale opacity-50"
              style={{ backgroundImage: `url('https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=2070&auto=format&fit=crop')` }}
            />
          </div>
          <div className="relative z-20 text-center px-6 max-w-5xl">
            <span className="inline-block px-4 py-1 bg-secondary-container text-white font-body font-bold text-xs uppercase tracking-[0.2em] mb-6 animate-pulse">
              Excellence in Fitness Education
            </span>
            <h1 className="font-display text-4xl sm:text-7xl leading-tight text-white uppercase mb-8">
              Spreading <span className="text-secondary-container">Evidence-Based</span> Fitness Education
            </h1>
            <p className="font-body text-base md:text-lg text-on-surface-variant max-w-2xl mx-auto mb-12 leading-relaxed">
              Bridging the gap between athletic performance and scientific precision through a disciplined, high-octane curriculum.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a href="#affiliations" className="bg-secondary-container text-white font-body font-bold text-xs px-10 py-4 uppercase red-heat-glow transition-all text-center">
                Check Accreditations
              </a>
              <a href="#faculty" className="border-2 border-white text-white font-body font-bold text-xs px-10 py-4 uppercase hover:bg-white hover:text-black transition-all text-center">
                Our Faculty
              </a>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 relative z-20 px-6 max-w-7xl mx-auto -mt-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="glass-panel p-8 text-center group transition-all hover:border-secondary-container/50 rounded ">
                <div className="font-display text-4xl font-black text-secondary-container mb-2 text-glow">{stat.value}</div>
                <div className="font-body font-bold text-xs uppercase tracking-widest text-on-surface-variant group-hover:text-white transition-colors">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Mission/Vision Section */}
        <section className="py-24 px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-12">
              <div>
                <h2 className="font-display text-3xl font-black uppercase text-white mb-6 border-l-4 border-secondary-container pl-6">Our Mission</h2>
                <p className="font-body text-sm md:text-base text-on-surface-variant leading-relaxed">
                  To empower the next generation of fitness leaders with <span className="text-secondary-container font-bold">scientifically-backed knowledge</span> and practical rigor. We dismantle myths and replace them with peer-reviewed protocols that drive real results in performance labs and commercial gyms alike.
                </p>
              </div>
              <div>
                <h2 className="font-display text-3xl font-black uppercase text-white mb-6 border-l-4 border-secondary-container pl-6">Our Vision</h2>
                <p className="font-body text-sm md:text-base text-on-surface-variant leading-relaxed">
                  To become the global standard for <span className="text-secondary-container font-bold">Performance Education</span>. We envision an industry where every trainer is a researcher, and every workout is a calculated step toward physiological peak, fostered through innovation and integrity.
                </p>
              </div>
            </div>
            <div className="relative h-[450px] group rounded overflow-hidden border border-white/10 shadow-lg">
              <div className="absolute inset-0 border-2 border-secondary-container translate-x-4 translate-y-4 -z-10 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500 rounded"></div>
              <div 
                className="w-full h-full bg-cover bg-center grayscale transition-all duration-700 group-hover:grayscale-0"
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=2070&auto=format&fit=crop')` }}
              />
            </div>
          </div>
        </section>

        {/* Affiliations Section */}
        <section className="py-24 bg-surface-container-lowest px-6 border-y border-white/5" id="affiliations">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-display text-3xl font-black uppercase text-white mb-4">Accreditations &amp; Registrations</h2>
              <p className="text-secondary-container font-body text-xs font-bold uppercase tracking-widest">100% Legally Registered and Internationally Compliant</p>
              <div className="h-1 w-24 bg-secondary-container mx-auto mt-4"></div>
            </div>
            
            <div className="overflow-x-auto glass-panel rounded">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="bg-black/60 border-b border-white/10">
                    <th className="p-5 font-body font-bold text-xs uppercase text-secondary-container tracking-widest">Entity / Registration</th>
                    <th className="p-5 font-body font-bold text-xs uppercase text-secondary-container tracking-widest">Certificate / Reg. Number</th>
                    <th className="p-5 font-body font-bold text-xs uppercase text-secondary-container tracking-widest text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="font-body text-on-surface-variant text-sm divide-y divide-white/5">
                  {affiliations.map((aff, idx) => (
                    <tr key={idx} className="hover:bg-white/5 transition-colors">
                      <td className="p-5 text-white font-bold">{aff.entity}</td>
                      <td className="p-5 font-mono text-xs">{aff.reg}</td>
                      <td className="p-5 text-right">
                        <span className="inline-flex items-center gap-1.5 text-xs text-green-500 font-bold uppercase">
                          <span className="material-symbols-outlined text-sm">verified</span>
                          {aff.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Faculty Section */}
        <section className="py-24 px-6 max-w-7xl mx-auto" id="faculty">
          <div className="text-center lg:text-left mb-16 border-l-4 border-secondary-container pl-6">
            <h2 className="font-display text-4xl font-black uppercase text-white mb-2">Elite Faculty</h2>
            <p className="font-body text-base text-on-surface-variant max-w-xl">
              Learn from master trainers and sports nutritionists who live the performance lifestyle.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {faculty.map((f, idx) => (
              <div key={idx} className="bg-surface-container-low border border-white/5 overflow-hidden group rounded flex flex-col hover:border-secondary-container/40 transition-all duration-300">
                <div className="relative h-72 overflow-hidden bg-zinc-900 shrink-0">
                  <div className="absolute inset-0 bg-secondary-container/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-10"></div>
                  <img 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-105 group-hover:scale-100" 
                    src={f.img} 
                    alt={f.name}
                  />
                </div>
                <div className="p-6 relative flex-1 flex flex-col justify-between">
                  <div>
                    <div className="h-1 w-12 bg-secondary-container mb-4 group-hover:w-full transition-all duration-500"></div>
                    <h3 className="font-display font-bold text-lg text-white uppercase mb-1">{f.name}</h3>
                    <p className="font-body font-bold text-secondary-container text-xs uppercase tracking-wider mb-3">{f.role}</p>
                  </div>
                  <p className="font-body text-on-surface-variant text-xs leading-relaxed mt-auto">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-6 max-w-7xl mx-auto">
          <div className="glass-panel relative overflow-hidden group rounded-lg">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-secondary-container skew-x-12 translate-x-20 opacity-5 group-hover:opacity-15 transition-all duration-700"></div>
            <div className="relative z-10 p-10 md:p-20 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="max-w-2xl text-center md:text-left">
                <h2 className="font-display text-3xl md:text-5xl text-white uppercase mb-4 leading-tight">
                  Start Your <span className="text-secondary-container">Professional</span> Journey
                </h2>
                <p className="font-body text-sm md:text-base text-on-surface-variant">
                  Join thousands of elite fitness professionals. Registration for the next Cohort is now open.
                </p>
              </div>
              <a href="/cpt#enroll" className="whitespace-nowrap bg-secondary-container text-white font-body font-bold text-sm px-10 py-5 uppercase red-heat-glow hover:scale-105 transition-all text-center">
                Enroll Today
              </a>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
