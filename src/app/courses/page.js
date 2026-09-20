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
    course: "Certified Personal Trainer",
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
        const payload = {
          name: advisorForm.name,
          phone: advisorForm.phone,
          email: advisorForm.email,
          city: "",
          course: "Advisor Consultation Request",
        };
        await addEnquiry(payload);
        setCounselorSubmitted(true);

        const message = `Hi IIFN, I would like to request an Advisor Consultation.\nMy details are:\n- Name: ${payload.name}\n- Email: ${payload.email}\n- Phone: ${payload.phone}`;
        const whatsappUrl = `https://wa.me/917001625285?text=${encodeURIComponent(message)}`;

        setAdvisorForm({ name: "", phone: "", email: "" });
        
        window.open(whatsappUrl, "_blank");
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
        let investment = "₹5,999/-";
        if (formData.course.includes("Diploma")) {
          investment = "₹9,999/-";
        }

        const payload = {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          occupation: formData.occupation,
          experience: formData.experience,
          course: formData.course,
          investment: investment,
          ...(userId ? { userId } : {}),
        };

        await addEnrollment(payload);
        setEnrollSubmitted(true);

        const message = `Hi IIFN, I would like to enroll in a course.\nMy details are:\n- Name: ${payload.name}\n- Email: ${payload.email}\n- Phone: ${payload.phone}\n- Occupation: ${payload.occupation}\n- Experience: ${payload.experience || "N/A"}\n- Course: ${payload.course}\n- Investment: ${payload.investment}`;
        const whatsappUrl = `https://wa.me/917001625285?text=${encodeURIComponent(message)}`;

        setFormData({
          name: "",
          email: "",
          phone: "",
          occupation: "Student",
          experience: "",
          course: "Certified Personal Trainer (CPT)",
        });

        window.open(whatsappUrl, "_blank");
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
      title: "Certified Personal Trainer",
      tag: "Best Seller",
      price: "₹5,999/-",
      dur: "1–3 Months",
      desc: "Comprehensive certification program mastering human anatomy, exercise science, program design, injury prevention, and client management.",
      img: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=2069&auto=format&fit=crop",
      syllabus: [
        "1. Anatomy & Physiology",
        "2. Kinesiology & Biomechanics",
        "3. Fitness Assessment",
        "4. Exercise Science",
        "5. Resistance Training",
        "6. Cardiovascular Training",
        "7. Strength & Hypertrophy Training",
        "8. Fat Loss & Body Transformation",
        "9. Exercise Programming",
        "10. Nutrition Fundamentals",
        "11. Special Population Training",
        "12. Injury Prevention & Safety",
        "13. Client Management & Communication",
        "14. Practical Personal Training",
        "15. Professional Ethics & Career Development"
      ]
    },
    {
      id: "nutrition",
      title: "Certified Nutritionist & Dietetics",
      tag: "Advanced Specialty",
      price: "₹5,999/-",
      dur: "1–3 Months",
      desc: "Science-based nutrition and dietetics education covering macronutrients, digestion, meal planning, sports & clinical nutrition, and supplementation.",
      img: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=2070&auto=format&fit=crop",
      syllabus: [
        "1. Fundamentals of Nutrition",
        "2. Human Anatomy & Physiology",
        "3. Macronutrients",
        "4. Micronutrients",
        "5. Digestion & Metabolism",
        "6. Meal Planning & Diet Planning",
        "7. Therapeutic Nutrition",
        "8. Weight Management",
        "9. Sports Nutrition",
        "10. Clinical Nutrition",
        "11. Nutrition Across the Life Cycle",
        "12. Food Science & Food Safety",
        "13. Nutritional Assessment",
        "14. Supplementation",
        "15. Practical Dietetics & Case Studies"
      ]
    },
    {
      id: "diploma",
      title: "Diploma in Personal Trainer & Dietetics",
      tag: "Best Value / Dual Degree",
      price: "₹9,999/-",
      dur: "2–4 Months",
      desc: "Master-level dual qualification combining personal training & dietetics for complete fitness and nutrition career dominance.",
      img: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=2070&auto=format&fit=crop",
      syllabus: [
        "1. Anatomy & Physiology",
        "2. Kinesiology & Biomechanics",
        "3. Fundamentals of Nutrition",
        "4. Macronutrients & Micronutrients",
        "5. Digestion & Metabolism",
        "6. Exercise Science",
        "7. Fitness Assessment",
        "8. Nutritional Assessment",
        "9. Resistance Training",
        "10. Cardiovascular Training",
        "11. Strength & Hypertrophy",
        "12. Fat Loss & Body Transformation",
        "13. Exercise Programming",
        "14. Meal Planning & Diet Planning",
        "15. Weight Management",
        "16. Sports Nutrition",
        "17. Clinical & Therapeutic Nutrition",
        "18. Special Population Training",
        "19. Supplementation",
        "20. Injury Prevention & Safety",
        "21. Client Management & Communication",
        "22. Practical Personal Training",
        "23. Practical Dietetics & Case Studies",
        "24. Professional Ethics & Career Development"
      ]
    },
    {
      id: "clinical",
      title: "Clinical Dietetics (Special Population)",
      tag: "Clinical Specialty",
      price: "₹5,999/-",
      dur: "1–3 Months",
      desc: "Specialized therapeutic nutrition for medical conditions including diabetes, PCOS, thyroid disorders, cardiovascular health, pregnancy, and clinical case studies.",
      img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop",
      syllabus: [
        "1. Clinical Nutrition Fundamentals",
        "2. Nutritional Assessment",
        "3. Therapeutic Diet Planning",
        "4. Diabetes & Insulin Resistance",
        "5. Obesity & Weight Management",
        "6. Cardiovascular Health",
        "7. Gastrointestinal Disorders",
        "8. Renal & Liver Disorders",
        "9. Thyroid & Endocrine Disorders",
        "10. PCOS & Women’s Health",
        "11. Pregnancy & Lactation Nutrition",
        "12. Pediatric Nutrition",
        "13. Geriatric Nutrition",
        "14. Sports & Athletic Nutrition",
        "15. Food Allergies & Intolerances",
        "16. Clinical Case Studies & Diet Planning"
      ]
    }
  ];

  return (
    <>
      <Navbar />

      <main className="pt-32 pb-24 bg-black min-h-screen">
        
        {/* Hero Title Section */}
        <section className="max-w-[1440px] mx-auto px-6 md:px-12 mb-12">
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

        {/* ONLINE LIVE CLASSES Banner */}
        <section className="max-w-[1440px] mx-auto px-6 md:px-12 mb-16">
          <div className="bg-gradient-to-r from-surface-container-low via-black to-surface-container-low border border-secondary-container/30 p-6 md:p-8 rounded-lg shadow-[0_0_30px_rgba(224,6,0,0.12)] flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded bg-secondary-container flex items-center justify-center shrink-0 shadow-lg mt-1">
                <span className="material-symbols-outlined text-white text-2xl">laptop_chromebook</span>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="bg-secondary-container text-white font-body font-bold text-[9px] uppercase px-2.5 py-0.5 rounded tracking-widest animate-pulse">
                    Interactive Schedule
                  </span>
                  <h3 className="font-display font-black text-lg md:text-xl text-white uppercase tracking-tight">
                    💻 ONLINE LIVE CLASSES
                  </h3>
                </div>
                <p className="text-on-surface-variant font-body text-xs leading-relaxed max-w-xl">
                  Real-time interactive lectures, practical exercise demonstrations, and clinical case study reviews with dedicated faculty support.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap sm:flex-nowrap items-center gap-6 bg-black/80 p-5 border border-white/10 rounded-md w-full lg:w-auto shrink-0 justify-between sm:justify-start">
              <div className="border-r border-white/10 pr-6">
                <span className="text-[10px] text-on-surface-variant uppercase font-body font-bold block mb-0.5">Saturday Class</span>
                <span className="font-display font-black text-base text-secondary-container">6:30 – 8:00 PM</span>
              </div>
              <div className="border-r border-white/10 pr-6">
                <span className="text-[10px] text-on-surface-variant uppercase font-body font-bold block mb-0.5">Sunday Class</span>
                <span className="font-display font-black text-base text-secondary-container">2:30 – 5:00 PM</span>
              </div>
              <div className="space-y-1.5 text-[11px] font-body text-white font-medium">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-green-400 text-sm">check_circle</span>
                  <span>Live + Recorded Classes</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-green-400 text-sm">check_circle</span>
                  <span>Doubt-Clearing Support</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary-container text-sm">translate</span>
                  <span className="text-secondary-container font-bold">English | Hindi</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bento Course Grid */}
        <section className="max-w-[1440px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-8">
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
                        <span className="material-symbols-outlined text-sm">schedule</span> {course.dur}
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
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-display font-bold text-xs uppercase text-white tracking-wider">
                          Syllabus Modules ({course.syllabus.length} Modules)
                        </h3>
                        <span className="text-[10px] text-secondary-container font-body font-bold uppercase">Certified Curriculum</span>
                      </div>
                      <div className="space-y-2 max-h-[340px] overflow-y-auto pr-2 custom-scrollbar">
                        {course.syllabus.map((moduleItem, modIdx) => (
                          <div key={modIdx} className="bg-black/60 p-3 border border-white/5 rounded-sm flex items-center gap-3 hover:border-white/20 transition-colors">
                            <span className="w-6 h-6 rounded-full bg-secondary-container/20 text-secondary-container font-display font-bold text-[10px] flex items-center justify-center shrink-0 border border-secondary-container/30">
                              {modIdx + 1}
                            </span>
                            <span className="text-xs text-white font-body font-semibold">
                              {typeof moduleItem === 'string' ? moduleItem.replace(/^\d+\.\s*/, '') : moduleItem.title}
                            </span>
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
                { icon: "badge", title: "ID Card", desc: "Official IIFN ID Card will delivered to your address." },
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
                      <option value="Certified Personal Trainer">Certified Personal Trainer — ₹5,999/-</option>
                      <option value="Certified Nutritionist & Dietetics">Certified Nutritionist & Dietetics — ₹5,999/-</option>
                      <option value="Diploma in Personal Trainer & Dietetics">Diploma in Personal Trainer & Dietetics — ₹9,999/-</option>
                      <option value="Clinical Dietetics (Special Population)">Clinical Dietetics (Special Population) — ₹5,999/-</option>
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
