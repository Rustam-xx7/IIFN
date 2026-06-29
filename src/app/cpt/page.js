"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function CPTCourse() {
  const [activeSyllabus, setActiveSyllabus] = useState(0);
  const [enrollSubmitted, setEnrollSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    occupation: "Student",
    experience: "",
  });

  const toggleAccordion = (index) => {
    setActiveSyllabus(activeSyllabus === index ? null : index);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEnrollSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.phone) {
      setEnrollSubmitted(true);
      setTimeout(() => {
        setEnrollSubmitted(false);
        setFormData({
          name: "",
          email: "",
          phone: "",
          occupation: "Student",
          experience: "",
        });
      }, 5000);
    }
  };

  const syllabusItems = [
    { title: "Anatomy & Kinesiology", content: "Deep dive into musculoskeletal structure, joint mechanics, and functional movement analysis. Master the language of human motion." },
    { title: "Exercise Science", content: "Understanding bioenergetics, cardiovascular responses to exercise, and endocrine system adaptations." },
    { title: "Practical Training Tech", content: "Corrective exercise programming, lifting technique optimization, and equipment mastery." },
    { title: "Human Body Systems", content: "Integrated physiology and pathophysiology in relation to physical activity and health." },
    { title: "Injury Prevention", content: "Risk stratification, postural assessment, and rehabilitation-to-performance pipelines." },
    { title: "Performance Nutrition", content: "Macronutrient fueling, supplement science, and weight management strategies for athletes." },
    { title: "Professional Practice", content: "Business of fitness, client communication, marketing, and ethical standards for CPTs." }
  ];

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <div 
            className="w-full h-full bg-cover bg-center opacity-40 grayscale hover:grayscale-0 transition-all duration-700"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50"></div>
        </div>
        <div className="relative z-10 text-center px-6 max-w-5xl">
          <span className="inline-block px-4 py-1 bg-secondary-container text-white font-body font-bold text-xs uppercase tracking-[0.2em] mb-6 animate-pulse">
            Elite Academic Certification
          </span>
          <h1 className="font-display text-4xl sm:text-6xl md:text-8xl text-white font-black leading-tight mb-6">
            CERTIFIED <span className="text-secondary-container">PERSONAL TRAINER</span> (CPT)
          </h1>
          <p className="font-body text-base md:text-lg text-on-surface-variant max-w-2xl mx-auto mb-12 leading-relaxed">
            The gold standard in fitness education. Transform your passion into a professional career with our globally recognized performance laboratory curriculum.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a href="#enroll" className="bg-secondary-container text-white font-body font-bold text-xs px-10 py-5 uppercase red-glow hover:scale-105 transition-all text-center">
              START YOUR JOURNEY
            </a>
            <a href="#" className="border-2 border-white text-white font-body font-bold text-xs px-10 py-5 uppercase hover:bg-white hover:text-black transition-all text-center">
              DOWNLOAD SYLLABUS
            </a>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce flex flex-col items-center gap-2">
          <span className="text-on-surface-variant text-[10px] uppercase tracking-widest font-body font-bold">Scroll</span>
          <span className="material-symbols-outlined text-secondary-container">expand_more</span>
        </div>
      </section>

      {/* Sticky Summary Bar */}
      <div className="sticky top-[72px] z-40 bg-surface-container-lowest/95 backdrop-blur-md border-y border-white/5 py-4 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-wrap justify-between items-center gap-4">
          <div className="flex gap-8 md:gap-16">
            <div className="flex flex-col">
              <span className="text-[9px] text-on-surface-variant uppercase tracking-wider font-body">Duration</span>
              <span className="font-body font-bold text-sm text-white uppercase mt-0.5">3 Months</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] text-on-surface-variant uppercase tracking-wider font-body">Investment</span>
              <span className="font-body font-bold text-sm text-secondary-container uppercase mt-0.5">₹5,999 <span className="text-white/40 line-through text-xs ml-1">₹12,000</span></span>
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] text-on-surface-variant uppercase tracking-wider font-body">Academic Mode</span>
              <span className="font-body font-bold text-sm text-white uppercase mt-0.5">Online Live</span>
            </div>
          </div>
          <a href="#enroll" className="bg-secondary-container text-white px-8 py-3 font-body font-bold text-xs uppercase tracking-widest hover:scale-105 transition-all active:scale-95 text-center">
            Enroll Now
          </a>
        </div>
      </div>

      {/* Syllabus Section */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5">
          <h2 className="font-display text-4xl font-black text-white mb-8 uppercase leading-tight">
            Scientific <br/><span className="text-secondary-container">Curriculum</span>
          </h2>
          <p className="font-body text-base text-on-surface-variant mb-12 leading-relaxed">
            Our modules are designed by elite performance coaches and medical professionals to ensure you bridge the gap between science and real-world application.
          </p>
          <div className="glass-panel p-8 rounded border-l-4 border-secondary-container">
            <span className="material-symbols-outlined text-secondary-container mb-4 text-4xl">
              science
            </span>
            <h4 className="font-display font-bold text-lg text-white mb-2 uppercase">Lab Driven Method</h4>
            <p className="text-on-surface-variant text-sm font-body leading-relaxed">Every module includes practical case studies and laboratory simulation assessments.</p>
          </div>
        </div>
        
        <div className="lg:col-span-7 flex flex-col gap-4">
          {syllabusItems.map((item, index) => {
            const isActive = activeSyllabus === index;
            return (
              <div 
                key={index} 
                className={`accordion-item glass-panel group transition-all duration-300 rounded ${
                  isActive ? "border-secondary-container/50 bg-white/5" : ""
                }`}
              >
                <div 
                  onClick={() => toggleAccordion(index)}
                  className="flex justify-between items-center p-6 cursor-pointer hover:bg-white/5 transition-all select-none"
                >
                  <div className="flex gap-6 items-center">
                    <span className="text-on-surface-variant font-body font-bold text-sm">{(index + 1).toString().padStart(2, '0')}</span>
                    <h3 className="font-display font-bold text-base text-white uppercase">{item.title}</h3>
                  </div>
                  <span className={`material-symbols-outlined text-secondary-container transition-transform duration-300 ${
                    isActive ? "rotate-180" : ""
                  }`}>
                    expand_more
                  </span>
                </div>
                <div 
                  className="accordion-content bg-black/40 transition-all duration-300"
                  style={{ maxHeight: isActive ? "200px" : "0px" }}
                >
                  <div className="p-6 text-on-surface-variant font-body text-sm leading-relaxed border-t border-white/5">
                    {item.content}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* What You Receive */}
      <section className="bg-surface-container-low py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h2 className="font-display text-4xl font-black text-white mb-16 text-center uppercase">
            What You <span className="text-secondary-container">Receive</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: "book", title: "Study Material", desc: "Comprehensive IIFN proprietary research papers and textbooks." },
              { icon: "workspace_premium", title: "Dual Certifications", desc: "Dual certifications recognized globally for your professional career." },
              { icon: "badge", title: "Digital ID Card", desc: "Official IIFN Performance Laboratory credentials for verification." },
              { icon: "description", title: "Official Marksheet", desc: "Detailed performance breakdown of your theoretical and practical scores." },
              { icon: "support_agent", title: "Faculty Access", desc: "Direct mentorship from high-performance athletic coaches." },
              { icon: "work", title: "Placement Portal", desc: "Access to our network of elite fitness clubs and sports organizations." }
            ].map((item, index) => (
              <div key={index} className="flex gap-6 items-start p-6 hover:bg-white/5 transition-all rounded">
                <div className="bg-secondary-container p-4 rounded-sm shrink-0">
                  <span className="material-symbols-outlined text-white text-3xl">
                    {item.icon}
                  </span>
                </div>
                <div>
                  <h4 className="font-body font-bold text-white uppercase mb-2 text-sm tracking-wider">{item.title}</h4>
                  <p className="text-on-surface-variant text-sm font-body leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Credential Showcase */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-secondary-container font-body font-bold tracking-widest uppercase text-xs">Accreditations &amp; Creds</span>
          <h2 className="font-display text-4xl font-black text-white uppercase mt-2">Earn Your Stripes</h2>
          <div className="w-12 h-1 bg-secondary-container mx-auto mt-4"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "IIFN Professional Certificate", type: "Academy Credential", color: "from-secondary-container/20 to-black" },
            { title: "NSDC National Certification", type: "Skill India Endorsement", color: "from-white/5 to-black" },
            { title: "IIFN Elite ID Card", type: "Performance Badge", color: "from-secondary-container/10 to-white/5" }
          ].map((mock, index) => (
            <div key={index} className="group">
              <div className="relative aspect-[4/3] bg-surface-container-lowest border border-white/10 rounded overflow-hidden group-hover:border-secondary-container/50 transition-all flex flex-col items-center justify-center p-8 text-center">
                <div className={`absolute inset-0 bg-gradient-to-br ${mock.color} opacity-40`} />
                <span className="material-symbols-outlined text-5xl text-secondary-container/40 group-hover:text-secondary-container transition-colors mb-4 relative z-10">
                  workspace_premium
                </span>
                <h4 className="font-display font-bold text-base text-white uppercase relative z-10">{mock.title}</h4>
                <p className="text-[10px] text-on-surface-variant uppercase tracking-widest font-body mt-2 relative z-10">{mock.type}</p>
              </div>
              <h3 className="mt-4 font-body font-bold text-white text-xs uppercase text-center tracking-wider">{mock.title}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Enrollment form */}
      <section className="py-24 bg-surface-container-lowest border-t-4 border-secondary-container relative overflow-hidden" id="enroll">
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl font-black text-white mb-4 uppercase">Enrollment <span className="text-secondary-container">Center</span></h2>
            <p className="text-on-surface-variant font-body">Secure your spot in the next cohort. Batch starting soon.</p>
          </div>
          
          <div className="glass-panel p-8 md:p-10 rounded-lg">
            {enrollSubmitted ? (
              <div className="py-12 text-center text-green-500 bg-green-500/10 border border-green-500/20 rounded">
                <span className="material-symbols-outlined text-5xl mb-4">check_circle</span>
                <h3 className="font-display font-black text-xl uppercase mb-2">Enrollment Requested Successfully!</h3>
                <p className="text-sm text-on-surface-variant font-body">Our academic registrar will reach out to you within 12 hours with payment invoices and LMS credentials.</p>
              </div>
            ) : (
              <form onSubmit={handleEnrollSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="font-body font-bold text-[10px] uppercase text-on-surface-variant tracking-widest block">Full Name</label>
                    <input 
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      type="text" 
                      className="w-full bg-black border border-white/10 p-4 focus:border-secondary-container outline-none transition-all text-white placeholder:text-white/20 text-sm rounded" 
                      placeholder="John Doe" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="font-body font-bold text-[10px] uppercase text-on-surface-variant tracking-widest block">Email Address</label>
                    <input 
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      type="email" 
                      className="w-full bg-black border border-white/10 p-4 focus:border-secondary-container outline-none transition-all text-white placeholder:text-white/20 text-sm rounded" 
                      placeholder="john@athlete.com" 
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="font-body font-bold text-[10px] uppercase text-on-surface-variant tracking-widest block">Phone Number</label>
                    <input 
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      type="tel" 
                      className="w-full bg-black border border-white/10 p-4 focus:border-secondary-container outline-none transition-all text-white placeholder:text-white/20 text-sm rounded" 
                      placeholder="+91 00000 00000" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="font-body font-bold text-[10px] uppercase text-on-surface-variant tracking-widest block">Current Occupation</label>
                    <select 
                      name="occupation"
                      value={formData.occupation}
                      onChange={handleInputChange}
                      className="w-full bg-black border border-white/10 p-4 focus:border-secondary-container outline-none transition-all text-white text-sm rounded"
                    >
                      <option>Student</option>
                      <option>Fitness Professional</option>
                      <option>Working Professional</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="font-body font-bold text-[10px] uppercase text-on-surface-variant tracking-widest block">Experience (if any)</label>
                  <textarea 
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    className="w-full bg-black border border-white/10 p-4 focus:border-secondary-container outline-none transition-all text-white placeholder:text-white/20 text-sm rounded" 
                    placeholder="Tell us about your fitness background..." 
                    rows="4"
                  />
                </div>
                
                <div className="flex flex-wrap items-center gap-4 py-4 border-y border-white/5">
                  <span className="text-on-surface-variant text-sm font-body">Selected Program:</span>
                  <span className="font-body font-bold text-white uppercase border border-secondary-container/50 px-4 py-1 rounded-full text-xs">
                    Certified Personal Trainer (CPT)
                  </span>
                  <span className="ml-auto font-display font-black text-2xl text-secondary-container">₹5,999</span>
                </div>
                
                <button type="submit" className="w-full bg-secondary-container text-white py-6 font-display font-black text-sm uppercase red-glow hover:scale-[1.01] active:scale-95 transition-all">
                  Complete Enrollment
                </button>
                <p className="text-[9px] text-on-surface-variant text-center uppercase tracking-widest font-body">By clicking above, you agree to IIFN's Code of Conduct and Terms of Service.</p>
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
