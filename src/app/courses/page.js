"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { addEnquiry } from "@/service/firestore.service";

export default function Courses() {
  const [showAdvisorModal, setShowAdvisorModal] = useState(false);
  const [counselorSubmitted, setCounselorSubmitted] = useState(false);
  const [advisorForm, setAdvisorForm] = useState({ name: "", phone: "", email: "" });
  const [expandedSyllabusId, setExpandedSyllabusId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdvisorForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdvisorSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    if (advisorForm.name && advisorForm.phone && advisorForm.email) {
      setIsSubmitting(true);
      try {
        await addEnquiry({
          name: advisorForm.name,
          phone: advisorForm.phone,
          email: advisorForm.email,
          city: "",
          course: "Advisor Consultation Request",
        });
        setCounselorSubmitted(true);
        setAdvisorForm({ name: "", phone: "", email: "" });
        setTimeout(() => {
          setCounselorSubmitted(false);
          setShowAdvisorModal(false);
        }, 4000);
      } catch (err) {
        console.error(err);
        setSubmitError("Failed to submit request. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const courseList = [
    {
      id: "cpt",
      title: "Certified Personal Trainer (CPT)",
      tag: "Best Seller",
      desc: "Master the physiology, biomechanics, and program design required to become an elite fitness coach.",
      img: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=2069&auto=format&fit=crop",
    },
    {
      id: "csn",
      title: "Certified Sports Nutritionist (CSN)",
      tag: "Advanced",
      desc: "Biochemistry, macronutrient guidelines, metabolism, and lifestyle diet planning for performance.",
      img: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=2070&auto=format&fit=crop",
    },
    {
      id: "cfc",
      title: "Certified Fitness Coach (CFC)",
      tag: "Popular",
      desc: "Integrate fitness education, posture checks, and behavioral science to drive sustainable client results.",
      img: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=2070&auto=format&fit=crop",
    },
    {
      id: "cbrs",
      title: "Certified Body Recomposition Specialist",
      tag: "Specialty",
      desc: "Scientific protocols for concurrent fat loss and hypertrophic muscle gains in modern clients.",
      img: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=2070&auto=format&fit=crop",
    },
    {
      id: "cwmc",
      title: "Certified Weight Management Coach",
      tag: "Specialty",
      desc: "Obesity mechanics, metabolic assessments, and calorie management guidelines for health coaches.",
      img: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=2070&auto=format&fit=crop",
    },
    {
      id: "cscs",
      title: "Strength & Conditioning Specialist",
      tag: "Elite",
      desc: "Athletic preparation patterns, speed conditioning, plyometrics, and injury mitigation methodologies.",
      img: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=2070&auto=format&fit=crop",
    },
    {
      id: "mdfs",
      title: "Master Diploma in Fitness Sciences",
      tag: "Premium",
      desc: "Dual certification in CPT and Sports Nutrition for ultimate authority and premium job placements.",
      img: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=2069&auto=format&fit=crop",
    },
  ];

  const syllabusModules = [
    {
      title: "🧠 MODULE 1: HUMAN ANATOMY & PHYSIOLOGY",
      items: ["Muscular System", "Skeletal System", "Joints & Movement Patterns", "Cardiovascular & Respiratory Basics"]
    },
    {
      title: "🏋️ MODULE 2: EXERCISE SCIENCE",
      items: ["Types of Exercises", "Resistance Training Principles", "Cardio & Endurance Training", "Warm-up, Cool-down & Stretching"]
    },
    {
      title: "🔄 MODULE 3: PRACTICAL TRAINING (LIVE)",
      items: ["Exercise Demonstrations", "Correct Form & Posture", "Beginner to Advanced Progressions", "Common Gym Mistakes Correction"]
    },
    {
      title: "🔥 MODULE 4: HUMAN BODY COMPONENTS",
      items: ["Training strategies", "Program Design Basics", "Lifestyle & Recovery Factors", "Client Transformation Approach"]
    },
    {
      title: "🛡️ MODULE 5: INJURY PREVENTION & SAFETY",
      items: ["Common Gym Injuries", "Injury Prevention Techniques", "Safe Training Guidelines", "Client Risk Management"]
    },
    {
      title: "🥗 MODULE 6: NUTRITION",
      items: ["Macronutrients & Micronutrients", "Diet Planning Basics", "Fat Loss & Muscle Gain Nutrition", "Supplement Awareness"]
    },
    {
      title: "◀️ MODULE 7: PROFESSIONAL PRACTICE & CAREER DEVELOPMENT",
      items: ["Exercise & Diet Samples", "Client Case Studies", "Introduction To CPR", "Trainer Job Role", "Marketing Your Skill"]
    }
  ];

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
        <section className="max-w-[1440px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courseList.map((course, index) => {
            const isExpanded = expandedSyllabusId === course.id;
            const isFeatured = index === 0;
            return (
              <div 
                key={course.id} 
                className={`bg-[#111111] border border-white/5 hover:border-secondary-container/50 transition-all duration-500 rounded group overflow-hidden flex flex-col justify-between relative ${isFeatured ? "lg:col-span-2" : ""}`}
              >
                <div className="absolute top-0 left-0 w-1.5 h-full bg-secondary-container"></div>
                
                <div>
                  <div className="relative h-64 overflow-hidden">
                    <div 
                      className="absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-700" 
                      style={{ backgroundImage: `url('${course.img}')` }}
                    />
                    <div className="absolute top-4 right-4 bg-surface/80 backdrop-blur-md px-3 py-1 font-body font-bold text-[9px] text-white uppercase rounded-sm border border-white/5">
                      {course.tag}
                    </div>
                  </div>
                  
                  <div className="p-8 md:p-10 flex flex-col">
                    <div className="flex items-center gap-4 mb-6">
                      <span className="text-on-surface-variant font-body font-bold text-[11px] flex items-center gap-1 uppercase">
                        <span className="material-symbols-outlined text-sm">schedule</span> 3 Months
                      </span>
                      <span className="text-on-surface-variant font-body font-bold text-[11px] flex items-center gap-1 uppercase">
                        <span className="material-symbols-outlined text-sm">language</span> Online
                      </span>
                    </div>
                    
                    <h2 className="font-display font-black text-xl md:text-2xl mb-4 leading-tight uppercase text-white">
                      {course.title}
                    </h2>
                    
                    <p className="text-on-surface-variant font-body text-sm mb-2 leading-relaxed">
                      {course.desc}
                    </p>
                  </div>
                </div>

                <div className="px-8 pb-8 mt-auto flex flex-col gap-4">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link href="/cpt" className="flex-1 text-center bg-secondary-container text-white font-body font-bold text-xs py-4 px-6 uppercase tracking-widest red-glow-hover transition-all duration-300">
                      Enroll Now
                    </Link>
                    <button 
                      onClick={() => setExpandedSyllabusId(isExpanded ? null : course.id)}
                      className="flex-1 text-center border-white/10 border font-body font-bold text-xs py-4 px-6 uppercase tracking-widest text-on-surface-variant hover:text-white hover:border-white transition-all duration-300"
                    >
                      {isExpanded ? "Hide Syllabus" : "View Syllabus"}
                    </button>
                  </div>

                  {/* Expandable Syllabus Section */}
                  {isExpanded && (
                    <div className="mt-6 border-t border-white/10 pt-6 animate-fadeIn">
                      <h3 className="font-display font-bold text-xs uppercase text-white mb-4 tracking-wider">
                        Syllabus Modules
                      </h3>
                      <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                        {syllabusModules.map((module, modIdx) => (
                          <div key={modIdx} className="bg-black/40 p-4 border border-white/5 rounded-sm">
                            <h4 className="font-display font-bold text-[11px] text-[#ffb4a8] uppercase mb-2">
                              {module.title}
                            </h4>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
                              {module.items.map((item, itemIdx) => (
                                <li key={itemIdx} className="flex items-center gap-2 text-xs text-on-surface-variant font-body">
                                  <span className="h-1.5 w-1.5 rounded-full bg-secondary-container"></span>
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
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
                  disabled={isSubmitting}
                  className="w-full bg-secondary-container text-white py-4 font-body font-bold text-xs uppercase tracking-widest hover:scale-105 active:scale-95 red-glow-hover transition-all disabled:opacity-50 disabled:pointer-events-none"
                >
                  {isSubmitting ? "Requesting..." : "Request Consultation"}
                </button>
                {submitError && (
                  <p className="text-red-500 text-xs mt-2 font-body font-bold text-center">{submitError}</p>
                )}
              </form>
            )}
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
