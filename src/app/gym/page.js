"use client";

import React, { useState } from "react";
import Link from "next/link";
import { addEnquiry } from "@/service/firestore.service";

export default function GymPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    unit: "UNIT 1 - GANGPUR",
    phone: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    if (formData.name && formData.phone) {
      setIsSubmitting(true);
      try {
        const payload = {
          name: formData.name,
          phone: formData.phone,
          unit: formData.unit,
          course: `Jewel Gym Membership Enquiry (${formData.unit})`,
        };
        await addEnquiry(payload);
        setFormSubmitted(true);

        const message = `Hi Jewel GYM , I would like to enquire about Gym Membership.\nMy details are:\n- Name: ${payload.name}\n- Phone: ${payload.phone}\n- Gym Branch Unit: ${payload.unit}`;
        const whatsappUrl = `https://wa.me/917001625285?text=${encodeURIComponent(message)}`;

        setFormData({
          name: "",
          unit: "UNIT 1 - GANGPUR",
          phone: "",
        });
        
        window.location.href = whatsappUrl;
      } catch (err) {
        console.error(err);
        setSubmitError("Failed to submit membership request. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="bg-[#131313] text-[#e5e2e1] font-sans overflow-x-hidden min-h-screen">
      {/* TopNavBar */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-[#131313]/80 backdrop-blur-xl flex justify-between items-center px-6 md:px-12 py-4">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <img
              alt="Jewel Gym Logo"
              className="h-10 w-10 object-contain"
              src="/gymlogo.png"
            />
            <div className="font-display text-lg font-black text-[#e5e2e1] tracking-tighter uppercase leading-none">
              JEWEL<br />
              <span className="text-[10px] tracking-[0.4em] text-[#ffb4a8]">GYM</span>
            </div>
          </div>
          <Link
            href="/"
            className="hidden sm:flex items-center gap-1 text-[10px] font-body font-bold uppercase tracking-widest text-[#e5e2e1]/50 hover:text-[#ffb4a8] transition-colors border border-white/10 px-3 py-1.5 rounded-sm"
          >
            <span className="material-symbols-outlined text-[14px]">arrow_back</span> IIFN Home
          </Link>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex gap-8 items-center">
          <a
            className="font-body font-bold text-xs uppercase tracking-wider text-on-surface hover:text-[#ffb4a8] transition-colors duration-300"
            href="#facilities"
          >
            Facilities
          </a>
          <a
            className="font-body font-bold text-xs uppercase tracking-wider text-on-surface hover:text-[#ffb4a8] transition-colors duration-300"
            href="#gallery"
          >
            Gallery
          </a>
          <a
            className="font-body font-bold text-xs uppercase tracking-wider text-on-surface hover:text-[#ffb4a8] transition-colors duration-300"
            href="#plans"
          >
            Plans
          </a>
          <a
            className="font-body font-bold text-xs uppercase tracking-wider text-on-surface hover:text-[#ffb4a8] transition-colors duration-300"
            href="#trainers"
          >
            Trainers
          </a>
          <a
            className="font-body font-bold text-xs uppercase tracking-wider text-on-surface hover:text-[#ffb4a8] transition-colors duration-300"
            href="#locations"
          >
            Locations
          </a>
        </div>

        {/* Action Toggles */}
        <div className="flex items-center gap-4">
          <a
            href="#contact"
            className="bg-[#e00600] text-white px-5 py-2 rounded-sm font-body font-bold text-xs uppercase shadow-[0_0_20px_rgba(224,6,0,0.3)] hover:shadow-[0_0_35px_rgba(224,6,0,0.5)] transition-all active:scale-95"
          >
            JOIN NOW
          </a>
          <button
            onClick={() => setIsOpen(true)}
            className="text-[#ffb4a8] cursor-pointer hover:text-white transition-colors"
          >
            <span className="material-symbols-outlined text-3xl">menu</span>
          </button>
        </div>
      </nav>

      {/* SideNavBar Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}
      <aside
        className={`fixed right-0 top-0 h-full w-full md:w-96 z-[70] bg-[#131313]/95 backdrop-blur-2xl border-l border-white/10 p-10 flex flex-col gap-8 transform transition-transform duration-500 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center mb-6">
          <div className="flex flex-col">
            <span className="font-display text-2xl text-[#ffb4a8] uppercase font-black tracking-tighter">
              JEWEL GYM
            </span>
            <span className="text-on-surface/50 font-body font-bold text-[10px] uppercase tracking-widest">
              Powered by IIFN
            </span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-on-surface hover:text-[#e00600] transition-colors"
          >
            <span className="material-symbols-outlined text-3xl">close</span>
          </button>
        </div>

        <nav className="flex flex-col gap-6">
          <Link
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-4 text-on-surface/70 hover:text-[#ffb4a8] transition-all group font-bold"
            href="/"
          >
            <span className="material-symbols-outlined text-xl">arrow_back</span>
            <span className="font-display text-lg uppercase tracking-wider">IIFN Home</span>
          </Link>
          <a
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-4 text-[#ffb4a8] font-bold group"
            href="#"
          >
            <span className="material-symbols-outlined text-xl">home</span>
            <span className="font-display text-lg uppercase tracking-wider">Home</span>
          </a>
          <a
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-4 text-on-surface/70 hover:text-on-surface transition-all group"
            href="#facilities"
          >
            <span className="material-symbols-outlined text-xl">fitness_center</span>
            <span className="font-display text-lg uppercase tracking-wider">Equipments</span>
          </a>
          <a
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-4 text-on-surface/70 hover:text-on-surface transition-all group"
            href="#gallery"
          >
            <span className="material-symbols-outlined text-xl">photo_library</span>
            <span className="font-display text-lg uppercase tracking-wider">Gallery</span>
          </a>
          <a
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-4 text-on-surface/70 hover:text-on-surface transition-all group"
            href="#plans"
          >
            <span className="material-symbols-outlined text-xl">payments</span>
            <span className="font-display text-lg uppercase tracking-wider">Pricing</span>
          </a>
          <a
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-4 text-on-surface/70 hover:text-on-surface transition-all group"
            href="#trainers"
          >
            <span className="material-symbols-outlined text-xl">groups</span>
            <span className="font-display text-lg uppercase tracking-wider">Trainers</span>
          </a>
          <a
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-4 text-on-surface/70 hover:text-on-surface transition-all group"
            href="#locations"
          >
            <span className="material-symbols-outlined text-xl">map</span>
            <span className="font-display text-lg uppercase tracking-wider">Locations</span>
          </a>
        </nav>

        <div className="mt-auto border-t border-white/5 pt-8">
          <a
            href="#contact"
            onClick={() => setIsOpen(false)}
            className="block w-full text-center py-4 bg-[#e00600] text-white font-body font-bold text-xs uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(224,6,0,0.3)] hover:shadow-[0_0_35px_rgba(224,6,0,0.5)] transition-all"
          >
            BOOK FREE TRIAL
          </a>
        </div>
      </aside>

      <main>
        {/* Hero Section */}
        <section className="relative h-[90vh] min-h-[650px] w-full flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-t from-[#131313] via-transparent to-[#131313]/50 z-10"></div>
            <div className="absolute inset-0 bg-black/60 z-10"></div>
            <img
              className="w-full h-full object-cover grayscale brightness-[0.35]"
              src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop"
              alt="Gym training background"
            />
          </div>
          <div className="relative z-20 text-center px-6 max-w-4xl pt-16">
            <img
              alt="Jewel Gym logo animation icon"
              className="w-24 mx-auto mb-6 animate-pulse"
              src="/gymlogo.png"
            />
            <h1 className="font-display text-4xl sm:text-6xl md:text-8xl uppercase italic leading-[0.9] font-black tracking-tight mb-8">
              TRANSFORM <br /> <span className="text-[#ffb4a8] not-italic">YOUR LIMITS</span>
            </h1>
            <p className="font-body text-sm sm:text-lg text-on-surface/90 max-w-2xl mx-auto mb-10 tracking-widest uppercase font-bold">
              At Jewel Gym, we don&apos;t just train; we build champions. Experience a high-intensity performance GYM designed for the elite.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contact"
                className="bg-[#e00600] text-white px-10 py-4 font-body font-bold text-xs uppercase tracking-widest text-center shadow-[0_0_20px_rgba(224,6,0,0.3)] hover:scale-105 transition-all"
              >
                JOIN NOW
              </a>
              <a
                href="#plans"
                className="border-2 border-white text-white px-10 py-4 font-body font-bold text-xs uppercase tracking-widest text-center hover:bg-white hover:text-black transition-all"
              >
                EXPLORE GYM PLANS
              </a>
            </div>
          </div>
        </section>

        {/* Pricing Plans Section */}
        <section className="py-24 bg-[#0e0e0e] border-y border-white/5" id="plans">
          <div className="px-6 max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-display text-3xl md:text-5xl font-black uppercase mb-4">
                THE GYM ACCESS
              </h2>
              <p className="text-[#ffb4a8] font-body font-bold tracking-widest uppercase text-xs">
                Start your evolution today
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Unit 1 Plan */}
              <div className="relative bg-[#20201f] border-2 border-white/10 p-8 md:p-12 hover:border-[#e00600] transition-all group overflow-hidden rounded-sm flex flex-col justify-between">
                <div>
                  <div className="absolute -right-8 -top-8 text-[120px] font-black opacity-[0.03] group-hover:opacity-[0.05] italic uppercase select-none">
                    U1
                  </div>
                  <span className="font-body font-bold text-xs uppercase text-[#ffb4a8] mb-4 block">
                    Unit 1 Plan
                  </span>
                  <h3 className="font-display font-black text-2xl uppercase mb-2">Monthly Access</h3>
                  <div className="text-5xl font-black text-white mb-8">
                    ₹400 <span className="text-sm font-normal text-on-surface/50">/ mo</span>
                  </div>
                  <ul className="space-y-4 mb-10 text-on-surface/85">
                    <li className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-[#ffb4a8] text-sm">check_circle</span>{" "}
                      Certified Trainer Support
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-[#ffb4a8] text-sm">check_circle</span>{" "}
                      Professional Dietitian
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-[#ffb4a8] text-sm">check_circle</span>{" "}
                      All High-End Equipments
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-[#ffb4a8] text-sm">check_circle</span> AC
                      Environment &amp; Music Zone
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-[#ffb4a8] text-sm">check_circle</span>{" "}
                      Locker &amp; Shower Facilities
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-[#ffb4a8] text-sm">check_circle</span>{" "}
                      RO Drinking Water
                    </li>
                  </ul>
                </div>
                <a
                  href="#contact"
                  className="block text-center w-full py-4 bg-[#e00600] text-white font-body font-bold text-sm uppercase tracking-widest shadow-[0_0_15px_rgba(224,6,0,0.2)] mt-auto"
                >
                  ENROLL AT UNIT 1
                </a>
              </div>

              {/* Unit 2 Plan */}
              <div className="relative bg-[#20201f] border-2 border-white/10 p-8 md:p-12 hover:border-[#e00600] transition-all group overflow-hidden rounded-sm flex flex-col justify-between">
                <div>
                  <div className="absolute -right-8 -top-8 text-[120px] font-black opacity-[0.03] italic uppercase select-none">
                    U2
                  </div>
                  <div className="absolute top-0 right-0 bg-[#e00600] text-white px-4 py-1 font-body font-bold text-[10px] uppercase">
                    New Center
                  </div>
                  <span className="font-body font-bold text-xs uppercase text-[#ffb4a8] mb-4 block">
                    Unit 2 Plan
                  </span>
                  <h3 className="font-display font-black text-2xl uppercase mb-2">Monthly Access</h3>
                  <div className="text-5xl font-black text-white mb-8">
                    ₹500 <span className="text-sm font-normal text-on-surface/50">/ mo</span>
                  </div>
                  <ul className="space-y-4 mb-10 text-on-surface/85">
                    <li className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-[#ffb4a8] text-sm">check_circle</span>{" "}
                      Guaranteed Fatloss/Muscle Gain
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-[#ffb4a8] text-sm">check_circle</span>{" "}
                      Certified Elite Trainers
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-[#ffb4a8] text-sm">check_circle</span>{" "}
                      Professional Dietitian Chart
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-[#ffb4a8] text-sm">check_circle</span>{" "}
                      All Premium Equipments
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-[#ffb4a8] text-sm">check_circle</span>{" "}
                      Locker &amp; Clean Showers
                    </li>
                  </ul>
                </div>
                <a
                  href="#contact"
                  className="block text-center w-full py-4 bg-white text-black font-body font-bold text-sm uppercase hover:bg-[#e00600] hover:text-white transition-all tracking-widest mt-auto"
                >
                  ENROLL AT UNIT 2
                </a>
              </div>

              {/* Personal Trainer Plan */}
              <div className="relative bg-[#20201f] border-2 border-[#e00600] p-8 md:p-12 shadow-[0_0_30px_rgba(224,6,0,0.15)] group overflow-hidden rounded-sm flex flex-col justify-between">
                <div>
                  <div className="absolute -right-8 -top-8 text-[120px] font-black opacity-[0.03] italic uppercase select-none">
                    PT
                  </div>
                  <div className="absolute top-0 right-0 bg-[#e00600] text-white px-4 py-1 font-body font-bold text-[10px] uppercase">
                    Both Branches
                  </div>
                  <span className="font-body font-bold text-xs uppercase text-[#ffb4a8] mb-4 block">
                    Elite Coaching Add-on
                  </span>
                  <h3 className="font-display font-black text-2xl uppercase mb-2">Personal Trainer</h3>
                  <div className="text-5xl font-black text-white mb-8">
                    ₹1,500 <span className="text-sm font-normal text-on-surface/50">/ mo</span>
                  </div>
                  <ul className="space-y-4 mb-10 text-on-surface/85">
                    <li className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-[#ffb4a8] text-sm">check_circle</span>{" "}
                      Available for Unit 1 &amp; Unit 2
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-[#ffb4a8] text-sm">check_circle</span>{" "}
                      Dedicated 1-on-1 Performance Coach
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-[#ffb4a8] text-sm">check_circle</span>{" "}
                      Biomechanical &amp; Lift Assessment
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-[#ffb4a8] text-sm">check_circle</span>{" "}
                      Custom Rep-by-Rep Program Design
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-[#ffb4a8] text-sm">check_circle</span>{" "}
                      Priority Spotting &amp; Form Correction
                    </li>
                  </ul>
                </div>
                <a
                  href="#contact"
                  className="block text-center w-full py-4 bg-white text-black font-body font-bold text-sm uppercase hover:bg-[#e00600] hover:text-white transition-all tracking-widest mt-auto"
                >
                  ENROLL FOR COACHING
                </a>
              </div>
            </div>

            <div className="mt-16 text-center">
              <p className="text-on-surface-variant uppercase font-body font-bold tracking-widest text-xs mb-4">
                Core Benefits Across All Units
              </p>
              <div className="flex flex-wrap justify-center gap-8 text-on-surface/60 text-xs font-bold tracking-wider">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#ffb4a8] text-base">verified</span>{" "}
                  CERTIFIED TRAINERS
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#ffb4a8] text-base">nutrition</span>{" "}
                  DIETITIAN
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#ffb4a8] text-base">ac_unit</span> AC
                  ENVIRONMENT
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#ffb4a8] text-base">water_drop</span> RO
                  WATER
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="py-24 bg-[#131313] border-t border-white/5" id="gallery">
          <div className="px-6 max-w-7xl mx-auto">
            <div className="mb-16 text-center">
              <h2 className="font-display text-3xl md:text-5xl font-black uppercase mb-4">
                THE GYM GALLERY
              </h2>
              <p className="text-[#ffb4a8] font-body font-bold tracking-widest uppercase text-xs">
                Visualizing Excellence
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="group relative overflow-hidden border border-[#ffb4a8]/35 rounded-sm">
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-500 z-10" />
                <img
                  alt="Gym Poster 1"
                  className="w-full h-[400px] object-cover transition-transform duration-500 group-hover:scale-105"
                  src="/poster1.png"
                />
                <div className="absolute bottom-0 left-0 p-6 z-20">
                  <span className="text-[#ffb4a8] font-body font-bold text-xs uppercase tracking-widest bg-black/60 px-3 py-1 rounded-sm">
                    Unit 1
                  </span>
                </div>
              </div>
              <div className="group relative overflow-hidden border border-[#ffb4a8]/35 rounded-sm">
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-500 z-10" />
                <img
                  alt="Gym Poster 2"
                  className="w-full h-[400px] object-cover transition-transform duration-500 group-hover:scale-105"
                  src="/poster2.png"
                />
                <div className="absolute bottom-0 left-0 p-6 z-20">
                  <span className="text-[#ffb4a8] font-body font-bold text-xs uppercase tracking-widest bg-black/60 px-3 py-1 rounded-sm">
                    Unit 2
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Facilities Section */}
        <section className="py-24 px-6 max-w-7xl mx-auto" id="facilities">
          <div className="mb-16">
            <h2 className="font-display text-3xl font-black uppercase border-l-4 border-[#e00600] pl-6 mb-4">
              Elite Facilities
            </h2>
            <p className="text-on-surface-variant font-body text-sm italic max-w-xl">
              The Jewel Gym infrastructure is built on science, performance, and luxury.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Modern Equipments */}
            <div className="group relative overflow-hidden bg-[#20201f] border border-white/5 p-8 transition-all hover:border-[#e00600] rounded-sm">
              <div className="mb-6 flex justify-between items-start">
                <span className="material-symbols-outlined text-[#e00600] text-5xl">fitness_center</span>
                <span className="text-on-surface/10 font-display font-black text-6xl italic group-hover:text-[#e00600]/10 transition-colors">
                  01
                </span>
              </div>
              <h3 className="font-display font-bold text-xl uppercase mb-4">Modern Equipments</h3>
              <p className="text-on-surface-variant font-body text-sm leading-relaxed">
                Precision-engineered machines from world-leading brands for maximum muscle activation and safety.
              </p>
              <div className="mt-8 border-t border-white/10 pt-4 flex gap-2 overflow-x-auto hide-scrollbar">
                <span className="text-[10px] font-body font-bold bg-white/5 px-2 py-1 rounded-sm uppercase">
                  STRENGTH
                </span>
                <span className="text-[10px] font-body font-bold bg-white/5 px-2 py-1 rounded-sm uppercase">
                  CARDIO
                </span>
                <span className="text-[10px] font-body font-bold bg-white/5 px-2 py-1 rounded-sm uppercase">
                  OLYMPIC
                </span>
              </div>
            </div>

            {/* Certified Training */}
            <div className="group relative overflow-hidden bg-[#20201f] border border-white/5 p-8 transition-all hover:border-[#e00600] rounded-sm">
              <div className="mb-6 flex justify-between items-start">
                <span className="material-symbols-outlined text-[#e00600] text-5xl">verified_user</span>
                <span className="text-on-surface/10 font-display font-black text-6xl italic group-hover:text-[#e00600]/10 transition-colors">
                  02
                </span>
              </div>
              <h3 className="font-display font-bold text-xl uppercase mb-4">Certified Training</h3>
              <p className="text-on-surface-variant font-body text-sm leading-relaxed">
                Personalized coaching from IIFN-certified performance architects who track every rep of your journey.
              </p>
              <div className="mt-8 border-t border-white/10 pt-4 flex gap-2 overflow-x-auto hide-scrollbar">
                <span className="text-[10px] font-body font-bold bg-white/5 px-2 py-1 rounded-sm uppercase">
                  PERSONAL
                </span>
                <span className="text-[10px] font-body font-bold bg-white/5 px-2 py-1 rounded-sm uppercase">
                  TRANSFORMATION
                </span>
              </div>
            </div>

            {/* Expert Dietitians */}
            <div className="group relative overflow-hidden bg-[#20201f] border border-white/5 p-8 transition-all hover:border-[#e00600] rounded-sm">
              <div className="mb-6 flex justify-between items-start">
                <span className="material-symbols-outlined text-[#e00600] text-5xl">restaurant</span>
                <span className="text-on-surface/10 font-display font-black text-6xl italic group-hover:text-[#e00600]/10 transition-colors">
                  03
                </span>
              </div>
              <h3 className="font-display font-bold text-xl uppercase mb-4">Expert Dietitians</h3>
              <p className="text-on-surface-variant font-body text-sm leading-relaxed">
                Clinical nutrition protocols tailored to your metabolism for guaranteed fat loss and muscle gain results.
              </p>
              <div className="mt-8 border-t border-white/10 pt-4 flex gap-2 overflow-x-auto hide-scrollbar">
                <span className="text-[10px] font-body font-bold bg-white/5 px-2 py-1 rounded-sm uppercase">
                  DIET CHART
                </span>
                <span className="text-[10px] font-body font-bold bg-white/5 px-2 py-1 rounded-sm uppercase">
                  SUPPLEMENTS
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Trainers Section */}
        <section className="py-24 bg-[#131313]" id="trainers">
          <div className="px-6 max-w-7xl mx-auto">
            <div className="mb-16">
              <h2 className="font-display text-3xl font-black uppercase border-l-4 border-[#e00600] pl-6 mb-4">
                THE ARCHITECTS OF IRON
              </h2>
              <p className="text-on-surface-variant font-body text-sm italic max-w-xl">
                Elite coaching for those who demand the best.
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
              {/* Lead Trainer */}
              <div className="bg-[#20201f] border-2 border-[#e00600] p-8 flex flex-col sm:flex-row gap-8 items-center shadow-[0_0_30px_rgba(224,6,0,0.1)] rounded-sm">
                <div className="w-40 h-40 border border-white/10 shrink-0 rounded-sm overflow-hidden bg-[#1a1a19]">
                  <img
                    src="/jewel.jpg"
                    alt="Jewel Roy"
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="material-symbols-outlined text-[#ffb4a8] text-base">nutrition</span>
                    <span className="text-[#ffb4a8] font-body font-bold uppercase tracking-widest text-[10px]">
                      Chief Performance Trainer
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <h3 className="font-display font-black text-2xl uppercase leading-none">JEWEL ROY</h3>
                    <a
                      href="https://www.instagram.com/jewelroy07/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[10px] font-body font-bold text-[#ffb4a8] hover:text-white uppercase tracking-widest bg-white/5 border border-white/10 hover:border-white/30 px-2 py-1 rounded transition-colors cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-xs">link</span>
                      Instagram
                    </a>
                  </div>
                  
                  <div className="space-y-1.5 mb-4 text-[10px] font-body font-bold text-on-surface-variant uppercase tracking-wider">
                    <p className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-[#e00600] rounded-full shrink-0"></span>
                      K11 Certified Health Coach
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-[#e00600] rounded-full shrink-0"></span>
                      Registered Dietitian (Medhavi University)
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-4 text-center">
                    <div>
                      <div className="text-[#ffb4a8] font-black text-xl">5+</div>
                      <div className="text-[9px] text-on-surface/50 uppercase">Years Exp</div>
                    </div>
                    <div>
                      <div className="text-[#ffb4a8] font-black text-xl">1000+</div>
                      <div className="text-[9px] text-on-surface/50 uppercase">Clients</div>
                    </div>
                    <div>
                      <div className="text-[#ffb4a8] font-black text-xl">100%</div>
                      <div className="text-[9px] text-on-surface/50 uppercase">Results</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Other Trainers Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-[#20201f] p-6 border border-white/5 rounded-sm flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="material-symbols-outlined text-[#ffb4a8] text-base">fitness_center</span>
                    <span className="text-on-surface/50 text-[10px] uppercase font-bold">
                      Strength Specialist
                    </span>
                  </div>
                  {/* <h4 className="font-display font-bold text-lg uppercase text-white">Vikram Singh</h4> */}
                </div>
                <div className="bg-[#20201f] p-6 border border-white/5 rounded-sm flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="material-symbols-outlined text-[#ffb4a8] text-base">bolt</span>
                    <span className="text-on-surface/50 text-[10px] uppercase font-bold">HIIT Expert</span>
                  </div>
                  {/* <h4 className="font-display font-bold text-lg uppercase text-white">Sarah D&apos;Souza</h4> */}
                </div>
                <div className="bg-[#20201f] p-6 border border-white/5 rounded-sm flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="material-symbols-outlined text-[#ffb4a8] text-base">monitoring</span>
                    <span className="text-on-surface/50 text-[10px] uppercase font-bold">
                      Body Recomp
                    </span>
                  </div>
                  {/* <h4 className="font-display font-bold text-lg uppercase text-white">Arjun Khanna</h4> */}
                </div>
                <div className="bg-[#20201f]/30 p-6 border border-dashed border-white/20 rounded-sm flex items-center justify-center">
                  <span className="text-on-surface/30 font-body font-bold uppercase text-xs">
                    Join the Team
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Locations and Sign Up Forms */}
        <section className="py-24 border-t border-white/5" id="locations">
          <div className="px-6 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-white/10 overflow-hidden rounded-sm">
              {/* Centers Coordinates */}
              <div className="bg-[#131313] p-8 md:p-16 flex flex-col justify-center">
                <h2 className="font-display text-3xl font-black uppercase mb-12 border-l-4 border-[#e00600] pl-6">
                  THE CENTERS
                </h2>
                <div className="space-y-12">
                  <div className="flex gap-6 group">
                    <span className="material-symbols-outlined text-[#e00600] text-3xl shrink-0">
                      location_on
                    </span>
                    <div>
                      <h5 className="font-display font-bold text-lg text-white mb-2 uppercase">
                        Unit 1 - Gangpur
                      </h5>
                      <p className="text-on-surface-variant font-body text-sm leading-relaxed">
                        Swastipally, Gangpur,
                        <br />
                        Burdwan - 713104
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-6 group">
                    <span className="material-symbols-outlined text-[#e00600] text-3xl shrink-0">
                      location_on
                    </span>
                    <div>
                      <h5 className="font-display font-bold text-lg text-white mb-2 uppercase">
                        Unit 2 - Barsul
                      </h5>
                      <p className="text-on-surface-variant font-body text-sm leading-relaxed">
                        Jagarani Club, Unnayani,
                        <br />
                        Barsul - 713124
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-6 border-t border-white/5 pt-12" id="contact">
                    <span className="material-symbols-outlined text-[#e00600] text-3xl shrink-0">call</span>
                    <div>
                      <h5 className="font-display font-bold text-lg text-white mb-2 uppercase">
                        RECRUITMENT &amp; ENQUIRY
                      </h5>
                      <p className="text-[#ffb4a8] font-display text-2xl font-black tracking-widest">
                        +91 7001625285
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Assessment Registration Form */}
              <div className="bg-[#e00600] p-8 md:p-16 flex flex-col justify-center relative overflow-hidden">
                <div className="absolute -right-16 -bottom-16 text-[150px] font-black opacity-10 select-none italic font-display uppercase tracking-tighter leading-none pointer-events-none">
                  JEWEL
                </div>
                <h2 className="font-display text-3xl sm:text-4xl font-black leading-tight uppercase mb-4 relative z-10">
                  CLAIM YOUR <br /> STATUS
                </h2>
                <p className="text-white/80 font-body text-sm mb-8 max-w-md relative z-10">
                  Ready to break your limits? Fill out the form for a priority membership assessment.
                </p>

                {formSubmitted ? (
                  <div className="w-full bg-black/40 border border-white/20 p-8 text-center rounded-sm relative z-10 animate-[fadeIn_0.5s_forwards]">
                    <span className="material-symbols-outlined text-white text-5xl mb-3">task_alt</span>
                    <p className="font-display font-bold uppercase text-lg text-white">Assessment Submitted!</p>
                    <p className="text-xs text-white/80 mt-2 font-body">
                      We have logged your application. A coordinator from {formData.unit} will phone you shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="w-full space-y-4 relative z-10">
                    <div>
                      <input
                        required
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full bg-black/20 border border-white/30 text-white placeholder:text-white/50 focus:border-white focus:ring-0 py-4 px-6 uppercase font-body font-bold text-xs rounded-sm outline-none transition-all"
                        placeholder="YOUR NAME"
                        type="text"
                      />
                    </div>
                    <div>
                      <select
                        name="unit"
                        value={formData.unit}
                        onChange={handleInputChange}
                        className="w-full bg-black/20 border border-white/30 text-white focus:border-white focus:ring-0 py-4 px-6 uppercase font-body font-bold text-xs rounded-sm outline-none transition-all"
                      >
                        <option className="text-black bg-white" value="UNIT 1 - GANGPUR">
                          UNIT 1 - GANGPUR
                        </option>
                        <option className="text-black bg-white" value="UNIT 2 - BARSUL">
                          UNIT 2 - BARSUL
                        </option>
                      </select>
                    </div>
                    <div>
                      <input
                        required
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full bg-black/20 border border-white/30 text-white placeholder:text-white/50 focus:border-white focus:ring-0 py-4 px-6 uppercase font-body font-bold text-xs rounded-sm outline-none transition-all"
                        placeholder="PHONE NUMBER"
                        type="tel"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-white text-black py-4 rounded-sm font-body font-bold text-xs uppercase tracking-widest hover:bg-black hover:text-white transition-all shadow-xl font-bold disabled:opacity-50 disabled:pointer-events-none"
                    >
                      {isSubmitting ? "SUBMITTING..." : "JOIN THE PERFORMANCE GYM"}
                    </button>
                    {submitError && (
                      <p className="text-white text-xs mt-2 font-body font-bold text-center">{submitError}</p>
                    )}
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-16 bg-[#0e0e0e] border-t-4 border-[#e00600]">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 px-6 md:px-12 mx-auto max-w-7xl">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <img
                alt="Jewel Gym logo mark"
                className="h-12 w-12 object-contain"
                src="/gymlogo.png"
              />
              <div className="font-display text-xl text-[#ffb4a8] uppercase leading-none font-black">
                JEWEL<br />
                <span className="text-[12px] tracking-[0.5em] text-white">GYM</span>
              </div>
            </div>
            <p className="text-on-surface-variant font-body text-sm max-w-xs mb-8 leading-relaxed">
              Jewel Gym is a premier performance-focused fitness sub-brand powered by IIFN. We are dedicated to providing high-level athletic training environments accessible to everyone.
            </p>
            <div className="flex gap-4">
              <a
                className="w-10 h-10 border border-white/10 flex items-center justify-center hover:bg-[#ffb4a8] hover:text-black transition-all"
                href="#"
              >
                <span className="material-symbols-outlined text-sm">share</span>
              </a>
              <a
                className="w-10 h-10 border border-white/10 flex items-center justify-center hover:bg-[#ffb4a8] hover:text-black transition-all"
                href="#"
              >
                <span className="material-symbols-outlined text-sm">public</span>
              </a>
              <a
                className="w-10 h-10 border border-white/10 flex items-center justify-center hover:bg-[#ffb4a8] hover:text-black transition-all"
                href="#"
              >
                <span className="material-symbols-outlined text-sm">videocam</span>
              </a>
            </div>
          </div>
          <div>
            <h6 className="font-body font-bold text-xs uppercase text-white mb-6 tracking-wider">Explore</h6>
            <ul className="space-y-4 text-sm font-semibold">
              <li>
                <a className="text-on-surface-variant hover:text-[#ffb4a8] transition-all" href="#facilities">
                  Equipments
                </a>
              </li>
              <li>
                <a className="text-on-surface-variant hover:text-[#ffb4a8] transition-all" href="#plans">
                  Pricing
                </a>
              </li>
              <li>
                <a className="text-on-surface-variant hover:text-[#ffb4a8] transition-all" href="#locations">
                  Locations
                </a>
              </li>
              <li>
                <a className="text-on-surface-variant hover:text-[#ffb4a8] transition-all" href="#contact">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h6 className="font-body font-bold text-xs uppercase text-white mb-6 tracking-wider">Units</h6>
            <ul className="space-y-4 text-sm text-on-surface-variant">
              <li>Unit 1 - Gangpur</li>
              <li>Unit 2 - Barsul</li>
              <li>Chamber - Gangpur</li>
            </ul>
          </div>
          <div>
            <h6 className="font-body font-bold text-xs uppercase text-white mb-6 tracking-wider">Operation</h6>
            <p className="text-on-surface-variant text-sm mb-4 italic">
              High-Intensity Hours
              <br />
              Daily: 05:00 AM - 11:00 PM
            </p>
            <p className="text-[#ffb4a8] font-body font-bold text-xs animate-pulse tracking-wide">
              ADMISSIONS OPEN FOR 2026
            </p>
          </div>
        </div>
        <div className="mt-16 text-center border-t border-white/5 pt-8 px-6">
          <p className="text-on-surface-variant/40 font-body font-bold text-[10px] uppercase tracking-[0.2em]">
            © 2026 Jewel Gym - Powered by IIFN. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
