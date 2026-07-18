"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { addEnquiry, addEnrollment } from "@/service/firestore.service";

export default function Courses() {
  const [showAdvisorModal, setShowAdvisorModal] = useState(false);
  const [counselorSubmitted, setCounselorSubmitted] = useState(false);
  const [advisorForm, setAdvisorForm] = useState({ name: "", phone: "", email: "" });
  const [expandedSyllabusId, setExpandedSyllabusId] = useState(null);
  
  // Enrollment Form States
  const [enrollSubmitted, setEnrollSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    occupation: "Student",
    experience: "",
    course: "Certified Personal Trainer (CPT)",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdvisorForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEnrollInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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

  const handleEnrollSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    if (formData.name && formData.email && formData.phone) {
      setIsSubmitting(true);
      try {
        let userId = null;
        try {
          const storedUser = localStorage.getItem("iifn_user");
          if (storedUser) {
            const user = JSON.parse(storedUser);
            if (user && user.id) {
              userId = user.id;
            }
          }
        } catch (err) {
          console.error("Error reading user session for enrollment", err);
        }

        // Determine price based on course
        let investment = "₹5,999";
        if (formData.course.includes("Combo")) {
          investment = "₹9,999";
        }

        await addEnrollment({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          occupation: formData.occupation,
          experience: formData.experience,
          course: formData.course,
          investment: investment,
          ...(userId ? { userId } : {}),
        });
        setEnrollSubmitted(true);
        setFormData({
          name: "",
          email: "",
          phone: "",
          occupation: "Student",
          experience: "",
          course: "Certified Personal Trainer (CPT)",
        });
        setTimeout(() => {
          setEnrollSubmitted(false);
        }, 5000);
      } catch (err) {
        console.error(err);
        setSubmitError("Failed to enroll. Please check network connection.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleEnrollClick = (courseTitle) => {
    setFormData((prev) => ({ ...prev, course: courseTitle }));
    const element = document.getElementById("enroll");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const courseList = [
    {
      id: "cpt",
      title: "Certified Personal Trainer (CPT)",
      tag: "Best Seller",
      price: "₹5,999",
      dur: "1–3 Months",
      desc: "Learn: Human Anatomy & Physiology, Exercise Science, Biomechanics, Workout Programme Design, Injury Prevention, Nutrition, Professional Practice.",
      img: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=2069&auto=format&fit=crop",
      syllabus: [
        { title: "🧠 MODULE 1: HUMAN ANATOMY & PHYSIOLOGY", items: ["Muscular System", "Skeletal System", "Joints & Movement Patterns", "Cardiovascular & Respiratory Basics"] },
        { title: "🏋️ MODULE 2: EXERCISE SCIENCE", items: ["Types of Exercises", "Resistance Training Principles", "Cardio & Endurance Training", "Warm-up, Cool-down & Stretching"] },
        { title: "🔄 MODULE 3: BIOMECHANICS, MOVEMENT & CORRECTIVE EXERCISES (PRACTICAL TRAINING)", items: ["Exercise Demonstrations", "Correct Form & Posture", "Beginner to Advanced Progressions", "Common Gym Mistakes Correction"] },
        { title: "🔥 MODULE 4: HUMAN BODY COMPONENTS & WORKOUT PROGRAMME DESIGN", items: ["Training Strategies", "Program Design Basics", "Lifestyle & Recovery Factors", "Client Transformation Approach"] },
        { title: "🛡️ MODULE 5: INJURY PREVENTION & SAFETY", items: ["Common Gym Injuries", "Injury Prevention Techniques", "Safe Training Guidelines", "Client Risk Management"] },
        { title: "🥗 MODULE 6: NUTRITION", items: ["Macronutrients & Micronutrients", "Diet Planning Basics", "Fat Loss & Muscle Gain Nutrition", "Supplement Awareness"] },
        { title: "◀️ MODULE 7: PROFESSIONAL PRACTICE & CAREER DEVELOPMENT", items: ["Exercise & Diet Samples", "Client Case Studies", "Introduction to CPR", "Trainer Job Role", "Marketing Your Skills"] }
      ]
    },
    {
      id: "nutrition",
      title: "Certification in Nutrition & Dietetics",
      tag: "Advanced Specialty",
      price: "₹5,999",
      dur: "1–3 Months",
      desc: "Learn: Fundamentals of Nutrition, Macronutrients & Micronutrients, Diet Planning & Meal Management, Sports Nutrition, Clinical Nutrition Basics, Supplements, Client Consultation.",
      img: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=2070&auto=format&fit=crop",
      syllabus: [
        { title: "🥗 MODULE 1: FUNDAMENTALS OF NUTRITION", items: ["Introduction to Nutrition", "Functions of Nutrients", "Balanced Diet Principles", "Energy Requirements"] },
        { title: "🍎 MODULE 2: MACRONUTRIENTS & MICRONUTRIENTS", items: ["Carbohydrates, Proteins & Fats", "Vitamins & Minerals", "Water & Hydration", "Nutrient Functions & Food Sources"] },
        { title: "⚖️ MODULE 3: DIET PLANNING & MEAL MANAGEMENT", items: ["Weight Loss Diet Planning", "Weight Gain Diet Planning", "Meal Planning Techniques", "Portion Control & Food Exchange"] },
        { title: "🏃 MODULE 4: SPORTS NUTRITION", items: ["Nutrition for Exercise & Performance", "Pre-, During & Post-Workout Nutrition", "Recovery Nutrition", "Hydration Strategies"] },
        { title: "🩺 MODULE 5: CLINICAL NUTRITION BASICS", items: ["Nutrition for Diabetes", "Hypertension & Heart Health", "Obesity Management", "Basic Therapeutic Diets"] },
        { title: "🍽️ MODULE 6: SUPPLEMENTS & NUTRITIONAL SUPPORT", items: ["Supplement Basics", "Protein, Creatine & Vitamins", "Safe Supplement Use", "Evidence-Based Recommendations"] },
        { title: "💬 MODULE 7: CLIENT CONSULTATION & PROFESSIONAL PRACTICE", items: ["Client Assessment & Diet Consultation", "Diet History & Goal Setting", "Sample Diet Plans & Case Studies", "Professional Ethics & Career Guidance"] }
      ]
    },
    {
      id: "combo",
      title: "Combo Course (CPT + Nutrition & Dietetics)",
      tag: "Best Value / Dual Degree",
      price: "₹9,999",
      dur: "2–4 Months",
      desc: "✔ Personal Trainer (CPT) + Nutrition & Dietetics in One Comprehensive Course\n✔ Complete Fitness & Nutrition Education\n✔ Live Online Interactive Classes\n✔ Practical Workout Demonstrations\n✔ Sample Workout & Diet Plans\n✔ Case Study-Based Learning\n✔ IIFN Certificate + NSDC Government Certificate + Student ID Card\n✔ Placement & Career Support\n✔ Career Opportunities as a Personal Trainer & Nutrition Coach",
      img: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=2070&auto=format&fit=crop",
      syllabus: [
        { title: "🧠 MODULE 1: HUMAN ANATOMY & PHYSIOLOGY", items: ["Muscular System", "Skeletal System", "Joints & Movement Patterns", "Cardiovascular & Respiratory Basics"] },
        { title: "🏋️ MODULE 2: EXERCISE SCIENCE & BIOMECHANICS", items: ["Types of Exercises", "Resistance & Cardio Training Principles", "Correct Exercise Technique & Posture", "Corrective Exercises & Movement Analysis"] },
        { title: "🔥 MODULE 3: WORKOUT PROGRAMME DESIGN", items: ["Beginner to Advanced Training Programs", "Fat Loss & Muscle Gain Programming", "Strength & Endurance Planning", "Recovery & Lifestyle Management"] },
        { title: "🥗 MODULE 4: NUTRITION SCIENCE", items: ["Macronutrients & Micronutrients", "Balanced Diet & Energy Requirements", "Meal Planning & Portion Control", "Food Sources & Hydration"] },
        { title: "🩺 MODULE 5: SPORTS & CLINICAL NUTRITION", items: ["Sports Performance Nutrition", "Weight Loss & Weight Gain Diet Planning", "Nutrition for Diabetes, Hypertension & Obesity", "Therapeutic Diet Basics"] },
        { title: "🛡️ MODULE 6: SUPPLEMENTS & INJURY MANAGEMENT", items: ["Evidence-Based Supplementation", "Protein, Creatine & Vitamins", "Injury Prevention & Safe Exercise Guidelines", "Client Risk Assessment"] },
        { title: "📈 MODULE 7: CLIENT CONSULTATION & PROFESSIONAL DEVELOPMENT", items: ["Fitness & Nutrition Assessment", "Workout & Diet Plan Preparation", "Client Case Studies", "Introduction to CPR", "Professional Ethics", "Trainer & Nutrition Coach Career Guidance", "Marketing Your Skills & Business Growth"] }
      ]
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
        <section className="max-w-[1440px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {courseList.map((course) => {
            const isExpanded = expandedSyllabusId === course.id;
            return (
              <div 
                key={course.id} 
                className="bg-[#111111] border border-white/5 hover:border-secondary-container/50 transition-all duration-500 rounded group overflow-hidden flex flex-col justify-between relative"
              >
                <div className="absolute top-0 left-0 w-1.5 h-full bg-secondary-container"></div>
                
                <div>
                  <div className="relative h-64 overflow-hidden">
                    <div 
                      className="absolute inset-0 bg-cover bg-center md:grayscale md:group-hover:grayscale-0 transition-all duration-700" 
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
                        <span className="material-symbols-outlined text-sm">language</span> Online Live
                      </span>
                    </div>
                    
                    <h2 className="font-display font-black text-xl md:text-2xl mb-4 leading-tight uppercase text-white">
                      {course.title}
                    </h2>
                    
                    <p className="text-on-surface-variant font-body text-xs leading-relaxed whitespace-pre-line mb-4">
                      {course.desc}
                    </p>
                    
                    <div className="flex justify-between items-center py-3 border-t border-white/5 mt-2">
                      <span className="text-[10px] text-on-surface-variant uppercase font-body font-bold tracking-widest">Academic Fee</span>
                      <span className="font-display font-black text-xl text-secondary-container">{course.price}</span>
                    </div>
                  </div>
                </div>

                <div className="px-8 pb-8 mt-auto flex flex-col gap-4">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button 
                      onClick={() => handleEnrollClick(course.title)}
                      className="flex-1 text-center bg-secondary-container text-white font-body font-bold text-xs py-4 px-6 uppercase tracking-widest red-glow-hover transition-all duration-300 cursor-pointer"
                    >
                      Enroll Now
                    </button>
                    <button 
                      onClick={() => setExpandedSyllabusId(isExpanded ? null : course.id)}
                      className="flex-1 text-center border-white/10 border font-body font-bold text-xs py-4 px-6 uppercase tracking-widest text-on-surface-variant hover:text-white hover:border-white transition-all duration-300 cursor-pointer"
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
                        {course.syllabus.map((module, modIdx) => (
                          <div key={modIdx} className="bg-black/45 p-4 border border-white/5 rounded-sm">
                            <h4 className="font-display font-bold text-[11px] text-[#ffb4a8] uppercase mb-2">
                              {module.title}
                            </h4>
                            <ul className="grid grid-cols-1 gap-2 mt-1">
                              {module.items.map((item, itemIdx) => (
                                <li key={itemIdx} className="flex items-center gap-2 text-xs text-on-surface-variant font-body">
                                  <span className="h-1.5 w-1.5 rounded-full bg-secondary-container shrink-0"></span>
                                  <span>{item}</span>
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

        {/* What You Receive */}
        <section className="bg-surface-container-low py-24 mt-24">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <h2 className="font-display text-4xl font-black text-white mb-16 text-center uppercase">
              What You <span className="text-secondary-container">Receive</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: "book", title: "Study Material", desc: "Comprehensive IIFN proprietary research papers and textbooks." },
                { icon: "workspace_premium", title: "Dual Certifications", desc: "Dual certifications recognized globally for your professional career." },
                { icon: "badge", title: "ID Card", desc: "Official IIFN ID Card will delivered to your address for verification." },
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

        {/* Enrollment Form */}
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
                        onChange={handleEnrollInputChange}
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
                        onChange={handleEnrollInputChange}
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
                        onChange={handleEnrollInputChange}
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
                        onChange={handleEnrollInputChange}
                        className="w-full bg-black border border-white/10 p-4 focus:border-secondary-container outline-none transition-all text-white text-sm rounded cursor-pointer"
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
                      onChange={handleEnrollInputChange}
                      className="w-full bg-black border border-white/10 p-4 focus:border-secondary-container outline-none transition-all text-white placeholder:text-white/20 text-sm rounded font-body" 
                      placeholder="Tell us about your fitness background..." 
                      rows="4"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="font-body font-bold text-[10px] uppercase text-on-surface-variant tracking-widest block">Program Track</label>
                    <select 
                      name="course"
                      value={formData.course}
                      onChange={handleEnrollInputChange}
                      className="w-full bg-black border border-white/10 p-4 focus:border-secondary-container outline-none transition-all text-white text-sm rounded cursor-pointer"
                    >
                      <option value="Certified Personal Trainer (CPT)">Certified Personal Trainer (CPT)</option>
                      <option value="Certification in Nutrition & Dietetics">Certification in Nutrition & Dietetics</option>
                      <option value="Combo Course (CPT + Nutrition & Dietetics)">Combo Course (CPT + Nutrition & Dietetics)</option>
                    </select>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-4 py-4 border-y border-white/5">
                    <span className="text-on-surface-variant text-sm font-body">Selected Program:</span>
                    <span className="font-body font-bold text-white uppercase border border-secondary-container/50 px-4 py-1 rounded-full text-xs">
                      {formData.course}
                    </span>
                    <span className="ml-auto font-display font-black text-2xl text-secondary-container">
                      {formData.course.includes("Combo") ? "₹9,999" : "₹5,999"}
                    </span>
                  </div>
                  
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-secondary-container text-white py-6 font-display font-black text-sm uppercase red-glow hover:scale-[1.01] active:scale-95 transition-all disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
                  >
                    {isSubmitting ? "Processing..." : "Complete Enrollment"}
                  </button>
                  {submitError && (
                    <p className="text-red-500 text-xs mt-2 font-body font-bold text-center">{submitError}</p>
                  )}
                  <p className="text-[9px] text-on-surface-variant text-center uppercase tracking-widest font-body mt-2">By clicking above, you agree to IIFN&apos;s Code of Conduct and Terms of Service.</p>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* Lab Advisor CTA Section */}
        <section className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="bg-[#0e0e0e] border border-white/5 p-12 md:p-24 flex flex-col items-center text-center relative overflow-hidden rounded">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-secondary-container to-transparent opacity-50"></div>
            <h3 className="font-display text-3xl font-black mb-6 uppercase tracking-tighter text-white">Not sure which path to take?</h3>
            <p className="font-body text-base text-on-surface-variant max-w-xl mb-8 leading-relaxed">
              Our academic advisors are available for a 1-on-1 performance consultation to map out your career in the fitness industry.
            </p>
            <button 
              onClick={() => setShowAdvisorModal(true)}
              className="border-2 border-white text-white px-10 py-5 font-body font-bold text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-500 cursor-pointer"
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
                  className="w-full bg-secondary-container text-white py-4 font-body font-bold text-xs uppercase tracking-widest hover:scale-105 active:scale-95 red-glow-hover transition-all disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
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
