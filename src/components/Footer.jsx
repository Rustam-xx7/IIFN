"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { addReview } from "@/service/firestore.service";

export default function Footer() {
  const [user, setUser] = useState(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("iifn_user");
    if (storedUser) {
      setTimeout(() => {
        setUser(JSON.parse(storedUser));
      }, 0);
    }
  }, []);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    if (!comment.trim()) return;
    setIsSubmitting(true);
    try {
      // Pass logged in user credentials (name, email, phone) alongside rating and comment
      await addReview(
        user.name || "Anonymous",
        user.email || "",
        user.phone || "",
        rating,
        comment
      );
      setSubmitted(true);
      setComment("");
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    } catch (err) {
      console.error(err);
      setSubmitError("Failed to submit review. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="w-full py-16 md:py-24 bg-surface-container-lowest border-t-4 border-secondary-container mt-auto">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-12 px-6 md:px-12 mx-auto max-w-7xl">
        <div className="md:col-span-2">
          <div className="font-display text-2xl font-black text-secondary-container mb-6 tracking-tighter uppercase">
            IIFN
          </div>
          <p className="font-body text-on-surface-variant max-w-sm mb-6 leading-relaxed">
            The Indian Institute of Fitness & Nutrition is a premier academic institution dedicated to high-performance fitness education and science-based research.
          </p>
          <div className="flex gap-4 mb-6">
            <a href="https://maps.app.goo.gl/74q3wzBMj7w2HMam7" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-white/10 flex items-center justify-center hover:bg-secondary-container transition-all group" aria-label="Location">
              <span className="material-symbols-outlined text-white text-base">share</span>
            </a>
            <a href="mailto:iifnofficial@gmail.com" className="w-10 h-10 border border-white/10 flex items-center justify-center hover:bg-secondary-container transition-all group">
              <span className="material-symbols-outlined text-white text-base">mail</span>
            </a>
          </div>

          {user && (
            <div className="bg-white/5 border border-white/10 p-5 rounded-sm max-w-sm">
              <h5 className="font-display font-black text-white text-[10px] uppercase mb-3 tracking-widest">Leave a Review</h5>
              {submitted ? (
                <p className="text-[10px] text-green-500 font-body font-bold uppercase tracking-wider">✓ Thank you for your feedback!</p>
              ) : (
                <form onSubmit={handleReviewSubmit} className="space-y-3">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setRating(star)}
                        className={`material-symbols-outlined text-base cursor-pointer hover:scale-110 transition-transform active:scale-90 ${
                          star <= rating ? "text-red-600" : "text-gray-500"
                        }`}
                      >
                        {star <= rating ? "star" : "star_rate"}
                      </button>
                    ))}
                    <span className="text-[10px] uppercase font-bold text-on-surface-variant/80 ml-2">{rating} Star{rating > 1 ? 's' : ''}</span>
                  </div>
                  <textarea
                    required
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows="3"
                    className="w-full bg-black/40 border border-white/10 rounded p-2 text-xs text-white outline-none focus:border-secondary-container placeholder:text-white/20 font-body"
                    placeholder="Share your experience at IIFN..."
                  />
                  {submitError && (
                    <p className="text-red-500 text-[10px] font-bold font-body">{submitError}</p>
                  )}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-secondary-container text-white text-[10px] font-bold uppercase py-2 px-4 rounded-sm tracking-wider cursor-pointer hover:bg-secondary-container/85 disabled:opacity-50 transition-all font-body active:scale-95"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Review"}
                  </button>
                </form>
              )}
            </div>
          )}
        </div>

        <div>
          <h4 className="font-body font-bold uppercase text-white mb-6 tracking-widest text-xs">Resources</h4>
          <ul className="space-y-4 font-body text-on-surface-variant text-sm">
            <li><Link href="/courses" className="hover:text-secondary-container transition-colors">Curriculum</Link></li>
            <li><Link href="/about#affiliations" className="hover:text-secondary-container transition-colors">Affiliations</Link></li>
            <li><Link href="/about#faculty" className="hover:text-secondary-container transition-colors">Faculty</Link></li>
            <li><Link href="/courses" className="hover:text-secondary-container transition-colors">Alumni</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-body font-bold uppercase text-white mb-6 tracking-widest text-xs">Legal</h4>
          <ul className="space-y-4 font-body text-on-surface-variant text-sm">
            <li><a href="/iifn_legal_policies.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-secondary-container transition-colors">Privacy Policy</a></li>
            <li><a href="/iifn_legal_policies.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-secondary-container transition-colors">Terms of Service</a></li>
            <li><a href="/iifn_legal_policies.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-secondary-container transition-colors">Refund Policy</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-body font-bold uppercase text-white mb-6 tracking-widest text-xs">Contact</h4>
          <ul className="space-y-4 font-body text-on-surface-variant text-sm">
            <li className="flex gap-2">
              <span className="material-symbols-outlined text-secondary-container text-sm">location_on</span> 
              West Bengal , India 
            </li>
            <li className="flex gap-2">
              <span className="material-symbols-outlined text-secondary-container text-sm">call</span> 
              +91 7001625285(Jewel Roy)
            </li>
            <li className="flex gap-2">
              <span className="material-symbols-outlined text-secondary-container text-sm">mail</span> 
              <a href="mailto:iifnofficial@gmail.com" className="hover:text-secondary-container transition-colors">
                iifnofficial@gmail.com
              </a>
            </li>
            <li className="flex gap-2">
              <span className="material-symbols-outlined text-secondary-container text-sm">schedule</span> 
              Mon - Sat: 9am - 7pm
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-16 pt-8 border-t border-white/5 text-center px-6 flex flex-col sm:flex-row justify-between items-center gap-4 max-w-7xl mx-auto">
        <div className="flex flex-col items-center sm:items-start gap-2">
          <p className="font-body text-xs text-on-surface-variant/50">
            © 2026 Indian Institute of Fitness & Nutrition. All Rights Reserved.
          </p>
          <div className="flex items-center gap-2 text-xs text-on-surface-variant/40 font-body">
            <span>Designed & Developed by</span>
            <span className="font-bold text-white font-display text-[10px] uppercase tracking-wider">Kaizen_devs</span>
            <span className="text-on-surface-variant/20">|</span>
            <span className="text-[10px] font-mono">kaizen_rus</span>
            <div className="flex items-center gap-2.5 ml-2">
              <a 
                href="https://www.instagram.com/kaizen_rus?igsh=cnR0YWlkb2dtdnE0" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-on-surface-variant/40 hover:text-[#e1306c] transition-colors flex items-center"
                title="Instagram"
              >
                <span className="material-symbols-outlined text-xs">photo_camera</span>
              </a>
              <a 
                href="https://wa.me/919641682925" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-on-surface-variant/40 hover:text-[#25d366] transition-colors flex items-center"
                title="WhatsApp"
              >
                <span className="material-symbols-outlined text-xs">chat</span>
              </a>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-secondary-container animate-pulse"></div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-on-surface-variant">Server Status: Optimal</span>
        </div>
      </div>
    </footer>
  );
}
