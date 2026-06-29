"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Signup() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    course: "Certified Personal Trainer (CPT)",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Simple validation mocks
    if (formData.name.trim().length < 3) {
      setError("Name must be at least 3 characters.");
      return;
    }
    if (!formData.email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    if (formData.phone.length < 10) {
      setError("Please enter a valid phone number.");
      return;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setSuccess(true);
    setTimeout(() => {
      // Redirect to student/admin dashboard
      router.push("/admin");
    }, 2000);
  };

  return (
    <main className="performance-grid bg-black min-h-screen flex items-center justify-center p-6 relative">
      <div className="absolute top-6 left-6">
        <Link href="/" className="font-display font-black text-2xl text-white uppercase tracking-tighter hover:text-secondary-container transition-colors">
          IIFN
        </Link>
      </div>

      <div className="w-full max-w-lg glass-panel p-8 md:p-10 rounded relative overflow-hidden my-12">
        <div className="absolute top-0 left-0 w-full h-1 bg-secondary-container"></div>
        
        <div className="text-center mb-8">
          <h1 className="font-display font-black text-2xl uppercase text-white">Create Account</h1>
          <p className="text-on-surface-variant text-xs mt-1 font-body">Register for the performance learning campus</p>
        </div>

        {error && (
          <div className="p-4 bg-error/10 border border-error/20 rounded text-error text-xs font-body mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-base">error</span>
            {error}
          </div>
        )}

        {success ? (
          <div className="p-8 bg-green-500/10 border border-green-500/20 rounded text-green-500 text-xs font-body text-center space-y-3 mb-6">
            <span className="material-symbols-outlined text-5xl animate-bounce">task_alt</span>
            <p className="font-bold uppercase tracking-wider text-sm">Account Created!</p>
            <p className="text-on-surface-variant">Registering credentials and routing to admissions center...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="font-body font-bold text-[10px] uppercase text-on-surface/60 tracking-widest block">Full Name</label>
                <input 
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  type="text" 
                  className="w-full bg-black border border-white/10 p-3.5 focus:border-secondary-container text-white placeholder:text-white/20 text-sm rounded outline-none transition-all" 
                  placeholder="e.g. Arjun Das" 
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-body font-bold text-[10px] uppercase text-on-surface/60 tracking-widest block">Mobile Number</label>
                <input 
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  type="tel" 
                  className="w-full bg-black border border-white/10 p-3.5 focus:border-secondary-container text-white placeholder:text-white/20 text-sm rounded outline-none transition-all" 
                  placeholder="+91 99999 88888" 
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="font-body font-bold text-[10px] uppercase text-on-surface/60 tracking-widest block">Email Address</label>
              <input 
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                type="email" 
                className="w-full bg-black border border-white/10 p-3.5 focus:border-secondary-container text-white placeholder:text-white/20 text-sm rounded outline-none transition-all" 
                placeholder="arjun@example.com" 
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-body font-bold text-[10px] uppercase text-on-surface/60 tracking-widest block">Choose Password</label>
              <input 
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                type="password" 
                className="w-full bg-black border border-white/10 p-3.5 focus:border-secondary-container text-white placeholder:text-white/20 text-sm rounded outline-none transition-all" 
                placeholder="••••••••" 
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-body font-bold text-[10px] uppercase text-on-surface/60 tracking-widest block">Preferred Program Pathway</label>
              <select 
                name="course"
                value={formData.course}
                onChange={handleInputChange}
                className="w-full bg-black border border-white/10 p-3.5 focus:border-secondary-container text-white text-sm rounded outline-none transition-all"
              >
                <option>Certified Personal Trainer (CPT)</option>
                <option>Certified Sports Nutritionist (CSN)</option>
                <option>Master Diploma in Fitness</option>
              </select>
            </div>

            <button type="submit" className="w-full bg-secondary-container text-white py-4 font-display font-black text-sm uppercase tracking-widest red-glow hover:scale-[1.01] active:scale-95 transition-all mt-6">
              Create Student Account
            </button>
          </form>
        )}

        <div className="mt-8 text-center pt-6 border-t border-white/5">
          <p className="text-xs text-on-surface-variant font-body">
            Already have credentials?{" "}
            <Link href="/login" className="text-secondary-container font-bold hover:underline">
              Access student portal
            </Link>
          </p>
        </div>
      </div>

      {/* Background atmosphere glow */}
      <div className="fixed inset-0 pointer-events-none z-[-1] opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-secondary-container/15 blur-[120px]"></div>
      </div>
    </main>
  );
}
