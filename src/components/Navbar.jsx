"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { logoutUserWithAuth } from "@/service/firebaseAuth.service";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("iifn_user");
    if (storedUser) {
      setTimeout(() => {
        setUser(JSON.parse(storedUser));
      }, 0);
    }
  }, []);

  const handleLogout = async () => {
    try {
      await logoutUserWithAuth();
    } catch (e) {
      console.error("Error signing out of Firebase Auth", e);
    }
    localStorage.removeItem("iifn_user");
    setUser(null);
    setIsOpen(false);
    window.location.href = "/";
  };

  // Helper to check active link
  const isActive = (path) => pathname === path;

  const baseLinks = [
    { name: "Home", path: "/" },
    { name: "Courses", path: "/courses" },
    { name: "CPT Program", path: "/cpt" },
    { name: "Jewel Gym", path: "/gym" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const links =
    user?.role === "admin"
      ? [...baseLinks, { name: "Admin Dashboard", path: "/admin" }]
      : baseLinks;

  return (
    <>
      <nav className="fixed top-0 w-full z-50 border-b border-white/10 px-6 md:px-12 py-4 flex justify-between items-center glass-nav">
        <Link
          href="/"
          className="font-display font-black text-2xl text-on-surface tracking-tighter uppercase cursor-pointer"
        >
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
          {user ? (
            <div className="relative group cursor-pointer">
              <div className="w-9 h-9 rounded-full bg-secondary-container flex items-center justify-center font-display font-black text-white text-sm uppercase border border-white/10 hover:border-secondary-container transition-colors">
                {user.name ? user.name[0] : "U"}
              </div>
              {/* Tooltip Menu */}
              <div className="absolute right-0 top-10 bg-black border border-white/10 p-3 rounded shadow-xl hidden group-hover:block w-44 z-50 before:content-[''] before:absolute before:-top-3 before:left-0 before:w-full before:h-3 before:block">
                <p className="text-[9px] text-on-surface-variant font-body font-bold uppercase tracking-wider mb-1">
                  Signed In
                </p>
                <p className="text-xs text-white font-body font-bold truncate mb-2">
                  {user.name}
                </p>
                {user.role === "admin" && (
                  <Link
                    href="/admin"
                    className="block text-[10px] font-body font-bold text-secondary-container hover:underline mb-2 uppercase tracking-wide"
                  >
                    Admin Panel
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="w-full text-left text-[10px] font-body font-bold text-red-500 hover:underline uppercase tracking-wide cursor-pointer"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="hidden lg:block border border-secondary-container text-on-surface font-body font-bold text-xs px-6 py-2 uppercase transition-all hover:bg-secondary-container/10"
              >
                LOGIN
              </Link>
              <Link
                href="/signup"
                className="hidden lg:block bg-transparent border border-white/20 hover:border-white text-on-surface font-body font-bold text-xs px-6 py-2 uppercase transition-all"
              >
                SIGN UP
              </Link>
            </>
          )}
          <Link
            href="/cpt#enroll"
            className="bg-secondary-container text-white font-body font-bold text-xs px-6 py-2 uppercase red-glow-hover transition-all active:scale-95"
          >
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
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
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
            <h2 className="font-display text-2xl font-black text-secondary-container leading-none">
              IIFN
            </h2>
            <p className="text-[10px] uppercase tracking-[0.3em] text-on-surface/50 mt-1">
              Performance Lab
            </p>
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
                isActive(link.path)
                  ? "text-secondary-container scale-105 origin-left"
                  : "text-on-surface/70"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="mt-auto pt-8 border-t border-white/10 flex flex-col gap-4">
          {user ? (
            <div className="space-y-4">
              <div className="flex items-center gap-3 bg-white/5 p-3 border border-white/5 rounded-sm">
                <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center font-display font-black text-white text-xs uppercase">
                  {user.name ? user.name[0] : "U"}
                </div>
                <div className="truncate">
                  <p className="text-xs text-white font-body font-bold truncate">
                    {user.name}
                  </p>
                  <p className="text-[9px] text-on-surface-variant uppercase tracking-wider">
                    {user.role}
                  </p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="w-full text-center py-3 bg-red-600/20 hover:bg-red-600 border border-red-500/20 text-white font-body font-bold text-sm uppercase tracking-widest transition-all rounded-sm cursor-pointer"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
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
            </>
          )}
        </div>
      </aside>
    </>
  );
}
