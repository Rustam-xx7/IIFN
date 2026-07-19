"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function Dietitian() {
  return (
    <>
      <Navbar />

      <main className="bg-black min-h-screen pt-32 pb-24 text-on-surface">
        {/* Hero Section */}
        <section className="relative pb-24 overflow-hidden min-h-[90vh] flex items-center">
          <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
            <div>
              <span className="font-body font-bold text-secondary-container tracking-[0.3em] uppercase block mb-4">
                Elite Performance Dietitian
              </span>
              <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-6 text-white">
                DT. JEWEL <span className="text-secondary-container">ROY</span>
              </h1>
              <p className="font-body text-base text-on-surface-variant max-w-xl mb-10 leading-relaxed">
                Precision nutrition is the foundation of high performance. I translate complex biochemistry into sustainable, result-driven diet protocols for the serious athlete.
              </p>
              
              <div className="flex flex-col gap-6 mb-10">
                <div className="flex flex-wrap items-center gap-4">
                  <a 
                    href="#contact" 
                    className="inline-flex items-center gap-2 bg-secondary-container text-white font-body font-bold text-xs px-8 py-4 uppercase tracking-widest hover:scale-105 active:scale-95 transition-all red-glow-hover cursor-pointer rounded-sm"
                  >
                    <span className="material-symbols-outlined text-sm">calendar_today</span>
                    BOOK APPOINTMENT
                  </a>
                  <div className="flex flex-col">
                    <span className="text-[9px] uppercase font-body font-bold tracking-widest text-[#ffb4a8]">Charge starts at</span>
                    <span className="text-sm font-display font-black text-white">₹499/- Only</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <a 
                    href="https://wa.me/917001625285" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-2 bg-white/5 border border-white/10 px-5 py-2.5 hover:bg-secondary-container hover:border-secondary-container transition-all group rounded-sm cursor-pointer text-xs"
                  >
                    <span className="material-symbols-outlined text-secondary-container group-hover:text-white text-sm">chat</span>
                    <span className="font-body font-bold uppercase tracking-widest text-[9px] text-white">WhatsApp</span>
                  </a>
                  <a 
                    href="https://www.instagram.com/jewelroy07/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-2 bg-white/5 border border-white/10 px-5 py-2.5 hover:bg-secondary-container hover:border-secondary-container transition-all group rounded-sm cursor-pointer text-xs"
                  >
                    <span className="material-symbols-outlined text-secondary-container group-hover:text-white text-sm">photo_camera</span>
                    <span className="font-body font-bold uppercase tracking-widest text-[9px] text-white">Instagram</span>
                  </a>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/10">
                <div>
                  <div className="font-display text-3xl md:text-4xl font-black text-secondary-container">5+</div>
                  <div className="font-body font-bold text-[10px] uppercase text-on-surface-variant tracking-wider mt-1">Years Exp.</div>
                </div>
                <div>
                  <div className="font-display text-3xl md:text-4xl font-black text-secondary-container">1000+</div>
                  <div className="font-body font-bold text-[10px] uppercase text-on-surface-variant tracking-wider mt-1">Successes</div>
                </div>
                <div>
                  <div className="font-display text-3xl md:text-4xl font-black text-secondary-container">100%</div>
                  <div className="font-body font-bold text-[10px] uppercase text-on-surface-variant tracking-wider mt-1">Guaranteed</div>
                </div>
              </div>
            </div>
            
            <div className="relative flex justify-center lg:justify-end">
              <div className="w-full max-w-md aspect-[4/5] bg-surface-container relative red-heat-glow group rounded-sm overflow-hidden border border-white/10">
                <img 
                  className="w-full h-full object-cover" 
                  src="/jewel.jpg"
                  alt="Jewel Roy - Performance Dietitian"
                />
                <div className="absolute inset-0 border-[10px] border-secondary-container/20 -m-4 -z-10"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Professional Bio Section */}
        <section className="py-24 bg-[#111111] border-y border-white/5" id="bio">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-5">
                <h2 className="font-display text-3xl md:text-5xl font-black uppercase text-white leading-tight">
                  THE <span className="text-secondary-container">PHILOSOPHY</span> OF PERFORMANCE
                </h2>
              </div>
              <div className="lg:col-span-7 space-y-6">
                <p className="font-body text-base md:text-lg leading-relaxed border-l-4 border-secondary-container pl-8 italic text-white">
                  &quot;Your body is a high-performance machine. You wouldn&apos;t fuel a supercar with low-grade fuel.&quot;
                </p>
                <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                  As the lead dietitian at the IIFN Performance Lab, Dt. Jewel Roy specializes in <strong>Evidence-Based Metabolic Conditioning</strong>. His methodology focuses on nutrient timing, hormonal balance, and gut health. With over 1,000 transformations, his data-driven protocols translate complex biochemistry into sustainable, high-performance results.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Certification & Authenticity */}
        <section className="py-24 bg-black" id="certifications">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="text-center mb-16">
              <h2 className="font-display text-3xl md:text-5xl font-black uppercase text-white mb-2">
                VERIFIED <span className="text-secondary-container">CREDENTIALS</span>
              </h2>
              <div className="w-24 h-1 bg-secondary-container mx-auto mt-4"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Cert 1 */}
              <div className="glass-panel p-8 text-center transition-all hover:-translate-y-2 rounded duration-300">
                <span className="material-symbols-outlined text-[48px] text-secondary-container mb-4">verified</span>
                <h3 className="font-display font-bold text-lg uppercase text-white mb-2">IIFN CERTIFIED</h3>
                <p className="font-body text-xs text-on-surface-variant mb-6">Master Practitioner in Fitness &amp; Nutrition Sciences.</p>
                <div className="inline-block px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-[9px] font-body font-bold tracking-widest text-[#ffb4a8] uppercase">
                  License #99283-NF
                </div>
              </div>
              
              {/* Cert 2 */}
              <div className="glass-panel p-8 text-center transition-all hover:-translate-y-2 rounded duration-300">
                <span className="material-symbols-outlined text-[48px] text-secondary-container mb-4">clinical_notes</span>
                <h3 className="font-display font-bold text-lg uppercase text-white mb-2">CLINICAL DIETETICS</h3>
                <p className="font-body text-xs text-on-surface-variant mb-6">Specialization in therapeutic nutrition and recovery.</p>
                <div className="inline-block px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-[9px] font-body font-bold tracking-widest text-[#ffb4a8] uppercase">
                  Verified Expert
                </div>
              </div>
              
              {/* Cert 3 */}
              <div className="glass-panel p-8 text-center transition-all hover:-translate-y-2 rounded duration-300">
                <span className="material-symbols-outlined text-[48px] text-secondary-container mb-4">qr_code_2</span>
                <h3 className="font-display font-bold text-lg uppercase text-white mb-2">SCAN TO VERIFY</h3>
                <p className="font-body text-xs text-on-surface-variant mb-6">Full digital transcript and credentials portal.</p>
                <div className="w-24 h-24 bg-white/10 mx-auto flex items-center justify-center rounded">
                  <span className="material-symbols-outlined text-[48px] text-on-surface-variant">qr_code</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section (Bento Style) */}
        <section className="py-24 bg-[#0e0e0e] border-t border-white/5" id="services">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <h2 className="font-display text-3xl md:text-5xl font-black uppercase text-white mb-12">
              CORE <span className="text-secondary-container">PROGRAMS</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:auto-rows-[250px]">
              <div className="md:col-span-2 md:row-span-2 relative group overflow-hidden rounded border border-white/5 min-h-[300px]">
                <div 
                  className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" 
                  style={{ backgroundImage: `url('https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=2070&auto=format&fit=crop')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent z-10"></div>
                <div className="absolute bottom-0 left-0 p-8 z-20">
                  <h3 className="font-display font-bold text-xl text-white mb-2 uppercase">PERSONALIZED DIET DESIGN</h3>
                  <p className="font-body text-xs text-white/70 max-w-xs leading-relaxed">
                    Bespoke nutritional blueprints mapped to your unique metabolic profile.
                  </p>
                </div>
              </div>
              
              <div className="md:col-span-2 glass-panel p-8 flex flex-col justify-end relative group overflow-hidden rounded min-h-[200px]">
                <div className="absolute top-4 right-4 text-secondary-container/10">
                  <span className="material-symbols-outlined font-black select-none" style={{ fontSize: "100px", lineHeight: "1" }}>bolt</span>
                </div>
                <h3 className="font-display font-bold text-xl text-white mb-2 uppercase relative z-10">PERFORMANCE FUELING</h3>
                <p className="font-body text-xs text-on-surface-variant relative z-10 leading-relaxed max-w-md">
                  Intra-workout and competition-day strategies for elite athletes.
                </p>
              </div>
              
              <div className="md:col-span-1 glass-panel p-6 flex flex-col justify-between border-t-2 border-secondary-container rounded min-h-[180px]">
                <span className="material-symbols-outlined text-secondary-container text-3xl">health_and_safety</span>
                <div className="mt-4">
                  <h4 className="font-body font-bold text-xs uppercase text-white mb-1">Clinical Care</h4>
                  <p className="text-[11px] text-on-surface-variant leading-relaxed">Dietary management for chronic health conditions.</p>
                </div>
              </div>
              
              <div className="md:col-span-1 glass-panel p-6 flex flex-col justify-between hover:bg-secondary-container/10 transition-all cursor-pointer rounded min-h-[180px]">
                <span className="material-symbols-outlined text-secondary-container text-3xl">monitoring</span>
                <div className="mt-4">
                  <h4 className="font-body font-bold text-xs uppercase text-white mb-1">Bio-Tracking</h4>
                  <p className="text-[11px] text-on-surface-variant leading-relaxed">Blood work analysis &amp; metabolic monitoring.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Transformation Gallery */}
        <section className="py-24 bg-black border-y border-white/5" id="gallery">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="text-center mb-16">
              <h2 className="font-display text-3xl md:text-5xl font-black uppercase text-white mb-2">
                TRANSFORMATION <span className="text-secondary-container">GALLERY</span>
              </h2>
              <div className="w-24 h-1 bg-secondary-container mx-auto mt-4"></div>
              <p className="font-body text-sm text-on-surface-variant mt-6 max-w-2xl mx-auto leading-relaxed">
                Real results from athletes who committed to the protocol. Precision nutrition, elite performance.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="relative group overflow-hidden aspect-video bg-surface-container rounded border border-white/5">
                <img 
                  alt="Transformation Success 1" 
                  className="w-full h-full object-cover" 
                  src="/dietResult1.jpg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="font-body font-bold text-secondary-container uppercase tracking-widest text-[10px]">12-Week Protocol</div>
                  <div className="font-display font-black text-lg text-white uppercase">Body Recomposition</div>
                </div>
              </div>
              
              <div className="relative group overflow-hidden aspect-video bg-surface-container rounded border border-white/5">
                <img 
                  alt="Transformation Success 2" 
                  className="w-full h-full object-cover" 
                  src="/dietResult2.jpg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="font-body font-bold text-secondary-container uppercase tracking-widest text-[10px]">Off-Season Peak</div>
                  <div className="font-display font-black text-lg text-white uppercase">Hypertrophy Focus</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Ready to Transform CTA */}
        <section id="contact" className="py-24 bg-[#111111] relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 md:px-12 text-center relative z-10">
            <div className="inline-block bg-secondary-container/10 border border-secondary-container/30 px-6 py-2 mb-6 rounded-full text-[10px] font-body font-bold tracking-widest text-[#ffb4a8] uppercase">
              Appointment From 499/- Only
            </div>
            
            <h2 className="font-display text-4xl sm:text-5xl font-black text-white mb-6 uppercase">
              READY TO <span className="text-secondary-container">TRANSFORM?</span>
            </h2>
            <p className="font-body text-base text-on-surface-variant max-w-2xl mx-auto mb-10 leading-relaxed">
              I select only a limited number of clients per month to ensure 1:1 precision and guaranteed results. Start your journey today.
            </p>
            <a 
              className="inline-flex items-center gap-2 bg-secondary-container text-white font-body font-bold text-xs px-12 py-5 uppercase tracking-widest hover:scale-105 active:scale-95 transition-all red-glow-hover cursor-pointer rounded-sm" 
              href="https://wa.me/917001625285"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="material-symbols-outlined text-sm">chat</span>
              CONTACT ME ON WHATSAPP
            </a>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-10 pointer-events-none flex items-center justify-center">
            <span className="material-symbols-outlined text-secondary-container select-none" style={{ fontSize: "400px", lineHeight: "1" }}>bolt</span>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
