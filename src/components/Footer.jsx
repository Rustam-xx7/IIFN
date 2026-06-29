import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full py-16 md:py-24 bg-surface-container-lowest border-t-4 border-secondary-container mt-auto">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-12 px-6 md:px-12 mx-auto max-w-7xl">
        <div className="md:col-span-2">
          <div className="font-display text-2xl font-black text-secondary-container mb-6 tracking-tighter uppercase">
            IIFN
          </div>
          <p className="font-body text-on-surface-variant max-w-sm mb-8 leading-relaxed">
            The Indian Institute of Fitness & Nutrition is a premier academic institution dedicated to high-performance fitness education and science-based research.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 border border-white/10 flex items-center justify-center hover:bg-secondary-container transition-all group">
              <span className="material-symbols-outlined text-white text-base">share</span>
            </a>
            <a href="#" className="w-10 h-10 border border-white/10 flex items-center justify-center hover:bg-secondary-container transition-all group">
              <span className="material-symbols-outlined text-white text-base">mail</span>
            </a>
          </div>
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
            <li><a href="#" className="hover:text-secondary-container transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-secondary-container transition-colors">Terms of Service</a></li>
            <li><a href="#" className="hover:text-secondary-container transition-colors">Refund Policy</a></li>
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
              <span className="material-symbols-outlined text-secondary-container text-sm">schedule</span> 
              Mon - Sat: 9am - 7pm
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-16 pt-8 border-t border-white/5 text-center px-6 flex flex-col sm:flex-row justify-between items-center gap-4 max-w-7xl mx-auto">
        <p className="font-body text-xs text-on-surface-variant/50">
          © 2026 Indian Institute of Fitness & Nutrition. All Rights Reserved.
        </p>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-secondary-container animate-pulse"></div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-on-surface-variant">Server Status: Optimal</span>
        </div>
      </div>
    </footer>
  );
}
