"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Helper to check active link
  const isActive = (path) => pathname === path;

  const links = [
    { name: "Home", path: "/" },
    { name: "Courses", path: "/courses" },
    { name: "CPT Program", path: "/cpt" },
    { name: "Jewel Gym", path: "/gym" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Admin Dashboard", path: "/admin" },
  ];

  return (
    <>
      <nav className="fixed top-0 w-full z-50 border-b border-white/10 px-6 md:px-12 py-4 flex justify-between items-center glass-nav">
        <Link href="/" className="font-display font-black text-2xl text-on-surface tracking-tighter uppercase cursor-pointer">
          IIFN
        </Link>
        
        {/* Desktop Nav Links */}
        <div className="hidden md:flex gap-8">
          {links.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`font-body font-bold text-xs uppercase tracking-widest transition-all duration-300 pb-1 border-b-2 hover:text-secondary-container ${
                isActive(link.path)
                  ? "text-secondary-container border-secondary-container"
                  : "text-on-surface border-transparent"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          <Link href="/login" className="hidden lg:block border border-secondary-container text-on-surface font-body font-bold text-xs px-6 py-2 uppercase transition-all hover:bg-secondary-container/10">
            LOGIN
          </Link>
          <Link href="/signup" className="hidden lg:block bg-transparent border border-white/20 hover:border-white text-on-surface font-body font-bold text-xs px-6 py-2 uppercase transition-all">
            SIGN UP
          </Link>
          <Link href="/cpt#enroll" className="bg-secondary-container text-white font-body font-bold text-xs px-6 py-2 uppercase red-glow-hover transition-all active:scale-95">
            ENROLL NOW
          </Link>
          <button 
            onClick={() => setIsOpen(true)} 
            className="material-symbols-outlined text-on-surface cursor-pointer text-2xl md:hidden hover:text-secondary-container"
          >
            menu
          </button>
        </div>
      </nav>

      {/* Side drawer navigation for mobile */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />
      <aside 
        className={`fixed right-0 top-0 h-full w-full sm:w-80 z-[70] bg-background/95 backdrop-blur-2xl border-l border-white/10 shadow-[0_0_40px_rgba(224,6,0,0.15)] flex flex-col p-10 gap-8 transform transition-transform duration-500 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="font-display text-2xl font-black text-secondary-container leading-none">IIFN</h2>
            <p className="text-[10px] uppercase tracking-[0.3em] text-on-surface/50 mt-1">Performance Lab</p>
          </div>
          <button 
            className="material-symbols-outlined text-on-surface/70 hover:text-secondary-container text-3xl cursor-pointer"
            onClick={() => setIsOpen(false)}
          >
            close
          </button>
        </div>
        
        <nav className="flex flex-col gap-6">
          {links.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              onClick={() => setIsOpen(false)}
              className={`font-display text-lg uppercase font-bold tracking-wider hover:text-secondary-container transition-colors ${
                isActive(link.path) ? "text-secondary-container scale-105 origin-left" : "text-on-surface/70"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="mt-auto pt-8 border-t border-white/10 flex flex-col gap-4">
          <Link 
            href="/login" 
            onClick={() => setIsOpen(false)}
            className="w-full text-center py-3 border border-white/20 text-white font-body font-bold text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-all"
          >
            Login
          </Link>
          <Link 
            href="/signup" 
            onClick={() => setIsOpen(false)}
            className="w-full text-center py-3 bg-secondary-container text-white font-body font-bold text-sm uppercase tracking-widest red-glow-hover transition-all"
          >
            Sign Up
          </Link>
        </div>
      </aside>
    </>
  );
}
