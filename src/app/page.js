"use client";

import React, { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import LoadingScreen from "@/components/LoadingScreen";
import { addEnquiry, getApprovedReviews } from "@/service/firestore.service";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [approvedReviews, setApprovedReviews] = useState([]);
  const galleryScrollRef = useRef(null);

  const scrollGallery = (direction) => {
    if (galleryScrollRef.current) {
      const scrollAmount = direction === "left" ? -600 : 600;
      galleryScrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const [enquiry, setEnquiry] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
    course: "Certified Personal Trainer (CPT)",
  });

  useEffect(() => {
    const fetchApprovedReviews = async () => {
      try {
        const approved = await getApprovedReviews();
        setApprovedReviews(approved);
      } catch (err) {
        console.error("Failed to fetch approved reviews:", err);
      }
    };
    fetchApprovedReviews();
  }, []);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEnquiry((prev) => ({ ...prev, [name]: value }));
  };

  const handleEnquirySubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    if (enquiry.name && enquiry.phone && enquiry.email) {
      setIsSubmitting(true);
      try {
        const payload = {
          name: enquiry.name,
          phone: enquiry.phone,
          email: enquiry.email,
          city: enquiry.city,
          course: enquiry.course,
        };
        await addEnquiry(payload);
        setFormSubmitted(true);

        const message = `Hi IIFN, I would like to submit an enquiry.\nMy details are:\n- Name: ${payload.name}\n- Email: ${payload.email}\n- Phone: ${payload.phone}\n- City: ${payload.city || "N/A"}\n- Course: ${payload.course}`;
        const whatsappUrl = `https://wa.me/917001625285?text=${encodeURIComponent(message)}`;

        setEnquiry({
          name: "",
          phone: "",
          email: "",
          city: "",
          course: "Certified Personal Trainer (CPT)",
        });

        window.open(whatsappUrl, "_blank");
      } catch (err) {
        console.error(err);
        setSubmitError("Failed to submit enquiry. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const pressLogos = [
    { name: "ANI News", src: "/press/ANI-1.png.webp" },
    { name: "Live Today", src: "/press/LY_LOGO.svg_.png.webp" },
    { name: "The Telegraph", src: "/press/The-Telegraph.png.webp" },
    { name: "The Print", src: "/press/ThePrint_logo.png.webp" },
    { name: "Zee5", src: "/press/Zee-5-Logo.png.webp" },
    { name: "DailyHunt", src: "/press/daily-hunt.png.webp" },
  ];

  const alumniLogos = [
    { name: "Anytime Fitness", src: "/alumni/Anytime_Fitness_logo_wordmark.png.webp" },
    { name: "Apollo", src: "/alumni/Apollo-png-01.png.webp" },
    { name: "Gold's Gym", src: "/alumni/Golds_Gym_logo.svg_.png.webp" },
    { name: "J.W. Marriott", src: "/alumni/J-W-Marriot.png.webp" },
    { name: "Kick Fitness", src: "/alumni/Kick-Fitness-Studio.png.webp" },
    { name: "Starmark Fitness", src: "/alumni/Starmark_Fitness_Studio.png.webp" },
    { name: "Sugar.fit", src: "/alumni/Sugar.fit_.png.webp" },
    { name: "Talwalkars", src: "/alumni/Talwalkars.png.webp" },
    { name: "Cult.fit", src: "/alumni/cult-fit-logo.png.webp" },
    { name: "Fitness Factory", src: "/alumni/fitness-factory.png.webp" },
    { name: "Fitnet", src: "/alumni/fitnet-png-logo.png.webp" },
    { name: "Fitwit", src: "/alumni/fitwit-png.png.webp" },
    { name: "HealthifyMe", src: "/alumni/healthifyme-logo.png.webp" },
    { name: "ITC Hotel", src: "/alumni/itchotel.png.webp" },
    { name: "Rival Fitness", src: "/alumni/rival-png.png.webp" },
    { name: "Stark Fitness", src: "/alumni/stark-fitness.png.webp" },
    { name: "Calcutta Fitness Studio", src: "/alumni/the-calcutta-fitness-studio-png.png.webp" },
    { name: "Tribell Fitness", src: "/alumni/tribell-fitness.png.webp" },
  ];

  const affiliationLogos = [
    { name: "MSME", src: "/affilations/MSME-Logo.png.webp" },
    { name: "NSDC", src: "/affilations/NSDC-Logo.png.webp" },
    { name: "Startup India", src: "/affilations/StartupIndia-Logo.png.webp" },
    { name: "ISO Logo 1", src: "/affilations/iso-1.png.webp" },
    { name: "ISO Logo 2", src: "/affilations/iso2.png.webp" },
    { name: "ISO Logo 3", src: "/affilations/iso3-1.png.webp" },
    { name: "Medhavi", src: "/affilations/medhavi.png.webp" },
    { name: "RLSS", src: "/affilations/rlss.png.webp" },
    { name: "Skill India", src: "/affilations/skill-india.png.webp" },
    { name: "SPFL", src: "/affilations/spfl.png.webp" },
  ];

  const candidates = [
    { name: "SURYA BHAT", src: "/candidates/jgym1.jpeg" },
    { name: "ANIL SHETTY", src: "/candidates/jgym2.jpeg" },
    { name: "SURAJ MAAN", src: "/candidates/jgym3.jpeg" },
    { name: "SURAJIT RANA", src: "/candidates/jgym4.jpeg" },
    { name: "CIZHARUL ISLAM", src: "/candidates/jgym5.jpeg" },
    { name: "PRIYA MISHRA", src: "/candidates/jgym6.jpeg" },
    { name: "KULDIP SINGH", src: "/candidates/jgym7.jpeg" },
    { name: "SAMPAT JCOB", src: "/candidates/jgym8.jpeg" },
    { name: "", src: "/candidates/jgym11.jpeg" },
    { name: "IMRAN & IRFAN", src: "/candidates/jgym12.jpeg" },
    { name: "SILPA BHAGAT", src: "/candidates/jgym13.jpeg" },
    { name: "SURYA BHAT", src: "/candidates/jgym14.jpeg" },
    { name: "ROSAHAN THAKKAR", src: "/candidates/jgym15.jpeg" },
    { name: "RAHUL MISHRA", src: "/candidates/jgym16.jpeg" },
    { name: "RONALD PETER PALLIVILA", src: "/candidates/jgym92.jpeg" },
    { name: "NIKESH SHRESTHA", src: "/candidates/jgym93.jpeg" },
    { name: "AMIT KUMAR", src: "/candidates/jgym94.jpeg" },
    { name: "GUNJALI HARISH YADAV", src: "/candidates/jgym95.jpeg" },
    { name: "PRADEEP SINGH RAJPUT", src: "/candidates/jgym96.jpeg" },
    { name: "MUHAMED SAMEER M.S", src: "/candidates/jgym97.jpeg" },
    { name: "PRATIKSHA RAJENDRA KALE", src: "/candidates/jgym98.jpeg" },
  ];

  const stats = [
    { value: "15K+", label: "Certified Online" },
    { value: "94%", label: "Placement Success" },
    { value: "25+", label: "Global Partners" },
    { value: "4.9/5", label: "Student Rating" },
  ];

  const faqs = [
    {
      q: "Is the online certificate valid?",
      a: "Yes, IIFN certificates are ISO 9001:2015 certified and recognized globally by premium fitness chains. The certificates are NSDC SKILL INDIA and SPEFL-SC verified also, carrying the same weight as offline certifications."
    },
    {
      q: "How do online exams work?",
      a: "Exams are conducted through our secure proctored portal. You can take the exam from the comfort of your home using a laptop with a webcam."
    },
    {
      q: "Do I get practical training?",
      a: "Practical concepts are taught via high-definition video demonstrations and interactive live sessions where mentors correct your form virtually."
    },
    {
      q: "Placement Support?",
      a: "We provide 100% placement support to all students upon successful completion of their certification programs to jumpstart their career."
    }
  ];

  return (
    <>
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      <Navbar />

      {/* Hero Section */}
      <header className="relative w-full h-[85vh] min-h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div
            className="w-full h-full bg-cover bg-center opacity-70"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=2070&auto=format&fit=crop')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-secondary-container/20"></div>
        </div>
        <div className="relative z-10 px-6 md:px-12 w-full max-w-screen-xl mx-auto pt-16">
          <div className="flex flex-col gap-6 max-w-2xl">
            <div className="flex gap-3 flex-wrap">
              <span className="bg-secondary-container/20 border border-secondary-container/50 text-secondary text-[10px] font-bold px-3 py-1 uppercase tracking-widest">Global Online Certification</span>
              <span className="bg-secondary-container/20 border border-secondary-container/50 text-secondary text-[10px] font-bold px-3 py-1 uppercase tracking-widest">Science-Based Curriculum</span>
            </div>
            <h1 className="font-display text-4xl sm:text-6xl text-on-surface font-black uppercase leading-none">
              Master Fitness Science Online
            </h1>
            <p className="font-display text-lg md:text-2xl text-on-surface/75">
              The Gold Standard in Professional Online Fitness Education.
            </p>
            <div className="flex flex-wrap gap-4 mt-4">
              <Link href="/courses" className="bg-secondary-container text-white px-8 py-4 font-body font-bold text-xs uppercase red-glow hover:scale-105 transition-all text-center">
                Start Your Course
              </Link>
              <a href="/IIFN_Brochure.pdf" target="_blank" rel="noopener noreferrer" className="border-2 border-white text-white px-8 py-4 font-body font-bold text-xs uppercase hover:bg-white hover:text-black transition-all text-center">
                Download Brochure
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Media Marquee */}
      <section className="bg-surface py-12 border-b border-white/5 overflow-hidden">
        <div className="px-6 max-w-screen-xl mx-auto mb-6 text-center">
          <h2 className="text-[10px] font-bold text-secondary-container uppercase tracking-[0.3em] mb-2">Establishing Authority</h2>
          <p className="font-display text-lg font-black uppercase">As Featured In Global Media</p>
        </div>
        <div className="relative w-full flex overflow-x-hidden">
          <div className="animate-marquee flex gap-12 items-center whitespace-nowrap py-4">
            {pressLogos.concat(pressLogos).map((partner, index) => (
              <div key={index} className="mx-6 shrink-0 select-none bg-white p-3 rounded-sm shadow-md flex items-center justify-center h-24 w-42">
                <img
                  src={partner.src}
                  alt={partner.name}
                  className="h-16 max-w-full object-contain hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Affiliations */}
      <section className="py-20 bg-surface-container-low border-b border-white/5 overflow-hidden">
        <div className="px-6 max-w-screen-xl mx-auto flex flex-col items-center gap-12">
          <div className="text-center">
            <h2 className="font-display text-3xl font-black uppercase tracking-tight mb-3">Elite Global Affiliations</h2>
            <p className="text-secondary-container font-body font-bold uppercase tracking-[0.2em] text-[10px]">Internationally Recognized Accreditation &amp; Standards</p>
            <div className="w-16 h-1 bg-secondary-container mx-auto mt-4"></div>
          </div>

          <div className="relative w-full flex overflow-x-hidden max-w-5xl">
            <div className="animate-marquee flex gap-12 items-center whitespace-nowrap py-4">
              {affiliationLogos.concat(affiliationLogos).map((logo, index) => (
                <div key={index} className="mx-6 shrink-0 select-none bg-white p-3 rounded-sm shadow-md flex items-center justify-center h-36 w-48">
                  <img
                    src={logo.src}
                    alt={logo.name}
                    className="h-20 max-w-full object-contain hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 bg-black">
        <div className="px-6 max-w-screen-xl mx-auto">
          <div className="flex flex-col items-center text-center mb-16">
            <h2 className="font-display text-3xl font-black uppercase mb-3">How Does IIFN Work?</h2>
            <p className="text-on-surface/50 font-body font-bold uppercase tracking-widest text-[10px]">Your Journey to Professional Success in 6 Simple Steps</p>
            <div className="w-24 h-1 bg-secondary-container mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { step: "01", title: "Register", desc: "Choose your desired certification and complete the simple online registration form." },
              { step: "02", title: "Payment", desc: "Securely pay your course fee once or opt for flexible monthly installments." },
              { step: "03", title: "Learn", desc: "Instant access to live webinars and high-definition recorded classes on our LMS." },
              { step: "04", title: "Assignments", desc: "Apply your knowledge through practical assignments and case-study evaluations." },
              { step: "05", title: "Examination", desc: "Attempt the online proctored certification exam when you feel prepared." },
              { step: "06", title: "Transform", desc: "Receive your verified certificate and launch your elite career in fitness." }
            ].map((step, index) => (
              <div key={index} className="step-card bg-surface-container-low p-8 border border-white/5 transition-all duration-300 hover:border-secondary-container/50 group relative overflow-hidden rounded">
                <div className="absolute top-0 left-0 w-1 h-full bg-secondary-container/20 group-hover:bg-secondary-container transition-all"></div>
                <span className="font-display text-4xl font-black text-white/5 transition-all duration-300 block mb-3 group-hover:text-secondary-container/20">
                  {step.step}
                </span>
                <h3 className="font-display font-bold text-lg uppercase mb-2 text-white">{step.title}</h3>
                <p className="text-on-surface-variant text-sm font-body leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Course Highlights */}
      <section className="py-24 bg-surface-container-lowest">
        <div className="px-6 max-w-screen-xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-[10px] font-bold text-secondary-container uppercase tracking-[0.3em] mb-2">Master Your Craft</h2>
              <p className="font-display text-3xl font-black uppercase">World-Class Digital Certifications</p>
              <div className="w-16 h-1 bg-secondary-container mt-4"></div>
            </div>
            <Link href="/courses" className="bg-transparent border-2 border-secondary-container text-on-surface hover:bg-secondary-container hover:text-white px-8 py-4 font-body font-bold text-xs uppercase transition-all flex items-center gap-2 group">
              View All Courses
              <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Certified Personal Trainer (CPT)",
                dur: "1–3 Months",
                tag: "Best Seller",
                desc: "Learn: Human Anatomy & Physiology, Exercise Science, Biomechanics, Workout Programme Design, Injury Prevention, Nutrition, Professional Practice.",
                img: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=2069&auto=format&fit=crop"
              },
              {
                title: "Certification in Nutrition & Dietetics",
                dur: "1–3 Months",
                tag: "Science-Based",
                desc: "Learn: Fundamentals of Nutrition, Macronutrients & Micronutrients, Diet Planning & Meal Management, Sports Nutrition, Clinical Nutrition Basics, Supplements, Client Consultation.",
                img: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=2070&auto=format&fit=crop"
              },
              {
                title: "Combo Course (CPT + Nutrition & Dietetics)",
                dur: "2–4 Months",
                tag: "Best Value",
                desc: "✔ Personal Trainer (CPT) + Nutrition & Dietetics in One Comprehensive Course ✔ Complete Fitness & Nutrition Education ✔ Live Online Interactive Classes ✔ NSDC Government Certificate ✔ Placement Support",
                img: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=2070&auto=format&fit=crop"
              }
            ].map((course, index) => (
              <div key={index} className="bg-black border border-white/10 group overflow-hidden rounded">
                <div
                  className="h-56 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url('${course.img}')` }}
                />
                <div className="p-8">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[9px] bg-secondary-container/20 text-secondary-container px-2 py-1 font-bold uppercase">{course.tag}</span>
                    <span className="text-on-surface/50 text-[10px] uppercase font-bold">{course.dur}</span>
                  </div>
                  <h3 className="font-display font-bold text-lg uppercase mb-2 text-white">{course.title}</h3>
                  <p className="text-on-surface/60 text-sm mb-6 leading-relaxed line-clamp-2">{course.desc}</p>
                  <Link href="/courses" className="block text-center w-full py-3 border border-white/20 text-white font-body font-bold text-xs uppercase hover:bg-white hover:text-black transition-all">
                    Course Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose IIFN */}
      <section className="py-24 px-6 max-w-screen-xl mx-auto">
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="font-display text-3xl font-black uppercase mb-3">Science-Based Online Excellence</h2>
          <div className="w-24 h-1 bg-secondary-container"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: "laptop_chromebook", title: "100% Online Learning", desc: "Access world-class fitness education from anywhere, at any time, through our advanced LMS." },
            { icon: "science", title: "Science-Based Pedagogy", desc: "Curriculum built on the latest research in exercise physiology, biomechanics, and nutrition science." },
            { icon: "video_call", title: "Live Expert Mentorship", desc: "Weekly live interaction with industry veterans to clear concepts and discuss real-world case studies." },
            { icon: "workspace_premium", title: "Verified Digital Creds", desc: "Receive blockchain-verified digital certificates instantly upon successful course completion." },
            { icon: "groups", title: "Global Alumni Network", desc: "Join a community of 15,000+ professionals working across 20+ countries worldwide." },
            { icon: "history_edu", title: "Lifetime Access", desc: "Keep your knowledge fresh with lifetime access to updated course materials and webinars." }
          ].map((item, index) => (
            <div key={index} className="bg-surface-container-low p-8 border border-white/5 hover:border-secondary-container/50 transition-all group rounded">
              <div className="flex flex-col gap-4">
                <span className="material-symbols-outlined text-secondary-container text-4xl">
                  {item.icon}
                </span>
                <h3 className="font-display font-bold text-lg uppercase text-white">{item.title}</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Alumni Brands Marquee */}
      <section className="py-20 bg-surface-container-lowest border-y border-white/5 overflow-hidden">
        <div className="px-6 max-w-screen-xl mx-auto mb-10 text-center">
          <h3 className="text-[10px] font-bold text-secondary-container uppercase tracking-[0.3em] mb-2">Proven Placement Records</h3>
          <p className="font-display text-lg font-black uppercase">Our Alumni Drive The Global Industry</p>
        </div>
        <div className="relative w-full flex overflow-x-hidden">
          <div className="animate-marquee flex gap-12 items-center whitespace-nowrap py-2">
            {alumniLogos.concat(alumniLogos).map((brand, index) => (
              <div key={index} className="mx-6 shrink-0 select-none bg-white p-3 rounded-sm shadow-md flex items-center justify-center h-34 w-52">
                <img
                  src={brand.src}
                  alt={brand.name}
                  className="h-18 max-w-full object-contain hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-24 bg-black border-y border-white/5">
        <div className="px-6 max-w-screen-xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((s, index) => (
            <div key={index} className="flex flex-col gap-2">
              <span className="font-display text-4xl sm:text-5xl font-black text-secondary-container">{s.value}</span>
              <span className="font-body font-bold text-xs text-on-surface/50 uppercase tracking-widest">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 overflow-hidden">
        <div className="px-6 max-w-screen-xl mx-auto flex flex-col items-center mb-16">
          <h2 className="font-display text-3xl font-black uppercase text-center">Graduate Success Stories</h2>
          <p className="text-on-surface/50 font-body font-bold uppercase text-[10px] mt-2 tracking-widest">Transformed through Science-Based Education</p>
        </div>

        <div className="flex gap-6 overflow-x-auto pb-8 custom-scrollbar px-6 max-w-7xl mx-auto">
          {[
            { name: "Rahul Sharma", role: "Online CPT Graduate", comment: "IIFN online CPT course completely changed my approach. The emphasis on scientific biomechanics gave me the edge I needed to work at elite gyms.", rating: 5 },
            { name: "Ananya Gupta", role: "Nutrition Specialist", comment: "The bilingual support was a lifesaver. Being able to understand complex nutritional science online helped me score high in the certification.", rating: 4 },
            { name: "Vikram Dutta", role: "Master Diploma Graduate", comment: "I only hire IIFN certified trainers now. The quality of knowledge they bring from their online training is incomparable to other generic certifications.", rating: 4 }
          ].map((t, index) => (
            <div key={index} className="min-w-[300px] md:min-w-[400px] bg-surface-container-lowest p-8 border border-white/5 relative rounded flex flex-col justify-between">
              <div>
                <span className="material-symbols-outlined text-6xl text-secondary-container/10 absolute top-4 right-8 select-none">
                  format_quote
                </span>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center font-display font-black text-white text-lg shrink-0">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="font-display font-bold text-white text-base uppercase leading-tight">{t.name}</p>
                    <p className="text-secondary-container text-xs font-body">{t.role}</p>
                    <div className="flex gap-0.5 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={`material-symbols-outlined text-[12px] leading-none ${i < t.rating ? "text-red-600" : "text-gray-500"
                            }`}
                        >
                          {i < t.rating ? "star" : "star_rate"}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-on-surface/70 italic text-sm leading-relaxed font-body">&ldquo;{t.comment}&rdquo;</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Certificate Verification Section */}
      <section className="py-20 bg-[#111111] relative overflow-hidden border-t border-white/5" id="verify-your-certificate">
        <div className="absolute top-0 right-0 w-96 h-96 bg-secondary-container/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="px-6 max-w-screen-xl mx-auto relative z-10">
          <div className="bg-surface-container-lowest border border-white/5 p-8 md:p-12 flex flex-col lg:flex-row items-center justify-between gap-8 rounded relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 bg-secondary-container h-full"></div>

            <div className="flex items-start gap-5">
              <div className="w-12 h-12 bg-secondary-container/10 rounded-full flex items-center justify-center shrink-0 border border-secondary-container/20">
                <span className="material-symbols-outlined text-secondary-container text-2xl">verified_user</span>
              </div>
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-secondary-container uppercase tracking-widest block font-body">Government & NSDC Alignment</span>
                <h3 className="font-display text-2xl md:text-3xl font-black uppercase text-white tracking-tight">Verify Your Credentials</h3>
                <p className="font-body text-sm text-on-surface-variant max-w-2xl leading-relaxed">
                  Every IIFN certificate is registered nationally. You can verify your credential authenticity instantly by inputting your enrollment number on the official **NCBSD Skill India** student portal.
                </p>
              </div>
            </div>

            <div className="shrink-0 w-full lg:w-auto">
              <a
                href="https://www.ncbsdskillindia.com/student-result.php"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full lg:w-auto inline-flex items-center justify-center gap-2 bg-secondary-container text-white px-8 py-4 font-body font-bold text-xs uppercase tracking-widest red-glow-hover hover:scale-105 active:scale-95 transition-all rounded-sm cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">open_in_new</span>
                Verify Certificate
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Candidate Gallery */}
      <section className="py-24 bg-surface-container-low border-t border-white/5 overflow-hidden" id="gallery">
        <div className="px-6 max-w-screen-xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-secondary-container font-body font-bold uppercase tracking-[0.2em] text-[10px] block mb-2">
                IIFN Transformation &amp; Placement Gallery
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-black uppercase text-white tracking-tight">
                Our Certified Professionals
              </h2>
              <div className="w-16 h-1 bg-secondary-container mt-3"></div>
            </div>

            {/* Scroll Navigation Controls */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => scrollGallery("left")}
                aria-label="Scroll Left"
                className="w-10 h-10 rounded-full border border-white/10 bg-black/50 hover:bg-secondary-container hover:border-secondary-container text-white flex items-center justify-center transition-all cursor-pointer group shadow-md"
              >
                <span className="material-symbols-outlined text-lg group-hover:-translate-x-0.5 transition-transform">arrow_back</span>
              </button>
              <button
                onClick={() => scrollGallery("right")}
                aria-label="Scroll Right"
                className="w-10 h-10 rounded-full border border-white/10 bg-black/50 hover:bg-secondary-container hover:border-secondary-container text-white flex items-center justify-center transition-all cursor-pointer group shadow-md"
              >
                <span className="material-symbols-outlined text-lg group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* 3-Row Side-Wise Scrollable Container */}
          <div
            ref={galleryScrollRef}
            className="overflow-x-auto pb-6 pt-2 custom-scrollbar snap-x scroll-smooth select-none"
          >
            <div className="grid grid-rows-3 grid-flow-col auto-cols-[200px] sm:auto-cols-[240px] md:auto-cols-[260px] gap-5 w-max">
              {candidates.map((candidate, index) => (
                <div
                  key={index}
                  className="snap-start group relative overflow-hidden bg-black border border-white/10 rounded-sm hover:border-secondary-container/50 transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="h-52 sm:h-56 md:h-60 overflow-hidden relative bg-[#141414] flex items-center justify-center p-2">
                    <img
                      src={candidate.src}
                      alt={candidate.name}
                      className="w-full h-full object-contain scale-100 group-hover:scale-105 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-40 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                  <div className="p-3 text-center border-t border-white/5 bg-surface-container-lowest">
                    <h4 className="font-display font-bold text-xs uppercase text-white tracking-wide group-hover:text-secondary-container transition-colors truncate">
                      {candidate.name}
                    </h4>
                    <p className="text-[9px] text-on-surface/40 uppercase mt-0.5 tracking-wider font-body">Certified Specialist</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Verified Student Reviews Section */}
      {approvedReviews.length > 0 && (
        <section className="py-24 bg-surface-container-lowest border-t border-white/5" id="reviews">
          <div className="px-6 max-w-screen-xl mx-auto">
            <div className="flex flex-col items-center text-center mb-16">
              <h2 className="font-display text-3xl font-black uppercase mb-3">Student Reviews</h2>
              <p className="text-secondary-container font-body font-bold uppercase tracking-[0.2em] text-[10px]">Real Experiences of Our Certified Professionals</p>
              <div className="w-16 h-1 bg-secondary-container mx-auto mt-4"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {approvedReviews.map((rev) => (
                <div key={rev.id} className="bg-surface-container-low p-8 border border-white/5 rounded relative flex flex-col justify-between hover:border-secondary-container/30 transition-all duration-300">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-secondary-container/10 flex items-center justify-center font-display font-black text-secondary-container text-sm">
                          {(rev.name || "S")[0].toUpperCase()}
                        </div>
                        <div>
                          <p className="text-white font-bold leading-none font-body">{rev.name}</p>
                          <div className="flex gap-0.5 mt-1">
                            {[...Array(5)].map((_, i) => (
                              <span
                                key={i}
                                className={`material-symbols-outlined text-[10px] leading-none ${i < Number(rev.rating || 0) ? "text-red-600" : "text-gray-500"
                                  }`}
                              >
                                {i < Number(rev.rating || 0) ? "star" : "star_rate"}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-on-surface/70 italic text-sm leading-relaxed mb-6 font-body">
                      &ldquo;{rev.comment}&rdquo;
                    </p>
                  </div>
                  <div className="flex items-center justify-between border-t border-white/5 pt-4 text-[10px] font-body uppercase text-on-surface-variant font-bold tracking-wider">
                    <span>Verified Graduate</span>
                    <span>{rev.createdAt ? new Date(rev.createdAt.seconds ? rev.createdAt.seconds * 1000 : rev.createdAt).toLocaleDateString("en-IN", { day: '2-digit', month: 'short' }) : "Recently"}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Enquiry Form and FAQ */}
      <section className="py-24 bg-black">
        <div className="px-6 max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Enquiry Form */}
          <div className="bg-surface-container-low p-8 border border-white/10 relative rounded">
            <div className="absolute top-0 left-0 w-1 h-full bg-secondary-container"></div>
            <h3 className="font-display text-2xl font-black uppercase mb-6 text-white">Start Your Online Journey</h3>

            {formSubmitted ? (
              <div className="p-8 text-center bg-green-500/10 border border-green-500/30 rounded text-green-500">
                <span className="material-symbols-outlined text-5xl mb-3">task_alt</span>
                <p className="font-body font-bold uppercase text-sm">Thank You for Your Enquiry!</p>
                <p className="text-xs text-on-surface-variant mt-2 font-body">An admissions counselor will contact you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleEnquirySubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase text-on-surface/50 font-body font-bold tracking-widest">Full Name</label>
                    <input
                      name="name"
                      value={enquiry.name}
                      onChange={handleInputChange}
                      required
                      type="text"
                      className="bg-black border border-white/10 p-4 focus:border-secondary-container outline-none transition-all text-on-surface rounded text-sm placeholder:text-white/20"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase text-on-surface/50 font-body font-bold tracking-widest">Phone Number</label>
                    <input
                      name="phone"
                      value={enquiry.phone}
                      onChange={handleInputChange}
                      required
                      type="tel"
                      className="bg-black border border-white/10 p-4 focus:border-secondary-container outline-none transition-all text-on-surface rounded text-sm placeholder:text-white/20"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase text-on-surface/50 font-body font-bold tracking-widest">Email Address</label>
                  <input
                    name="email"
                    value={enquiry.email}
                    onChange={handleInputChange}
                    required
                    type="email"
                    className="bg-black border border-white/10 p-4 focus:border-secondary-container outline-none transition-all text-on-surface rounded text-sm placeholder:text-white/20"
                    placeholder="john@example.com"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase text-on-surface/50 font-body font-bold tracking-widest">City</label>
                    <input
                      name="city"
                      value={enquiry.city}
                      onChange={handleInputChange}
                      type="text"
                      className="bg-black border border-white/10 p-4 focus:border-secondary-container outline-none transition-all text-on-surface rounded text-sm placeholder:text-white/20"
                      placeholder="Mumbai"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase text-on-surface/50 font-body font-bold tracking-widest">Preferred Course</label>
                    <select
                      name="course"
                      value={enquiry.course}
                      onChange={handleInputChange}
                      className="bg-black border border-white/10 p-4 focus:border-secondary-container outline-none transition-all text-on-surface rounded text-sm"
                    >
                      <option value="Certified Personal Trainer (CPT)">Certified Personal Trainer (CPT)</option>
                      <option value="Certification in Nutrition & Dietetics">Certification in Nutrition & Dietetics</option>
                      <option value="Combo Course (CPT + Nutrition & Dietetics)">Combo Course (CPT + Nutrition & Dietetics)</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-secondary-container text-white py-4 font-display font-black text-sm uppercase red-glow mt-2 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:pointer-events-none"
                >
                  {isSubmitting ? "Sending..." : "Send Online Enquiry"}
                </button>
                {submitError && (
                  <p className="text-red-500 text-xs mt-2 font-body font-bold text-center">{submitError}</p>
                )}
              </form>
            )}
          </div>

          {/* FAQ Section */}
          <div className="flex flex-col gap-6">
            <h3 className="font-display text-2xl font-black uppercase text-white">Course FAQ</h3>
            <div className="flex flex-col gap-4">
              {faqs.map((faq, index) => (
                <details key={index} className="group bg-surface-container-lowest border border-white/5 overflow-hidden rounded">
                  <summary className="flex justify-between items-center p-6 cursor-pointer list-none hover:bg-white/5 transition-all select-none">
                    <span className="font-display font-bold uppercase text-sm text-white">{faq.q}</span>
                    <span className="material-symbols-outlined text-secondary-container transition-transform group-open:rotate-180">
                      expand_more
                    </span>
                  </summary>
                  <div className="p-6 pt-0 text-on-surface/70 border-t border-white/5 text-sm font-body leading-relaxed">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
