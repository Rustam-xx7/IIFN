"use client";

import React from "react";
import Link from "next/link";
import { logoutUserWithAuth } from "@/service/firebaseAuth.service";
import { usePathname } from "next/navigation";

export default function AdminSidebar({ isOpen, onClose }) {
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      await logoutUserWithAuth();
    } catch (e) {
      console.error("Error signing out of Firebase", e);
    }
    localStorage.removeItem("iifn_user");
    window.location.href = "/";
  };

  const menuItems = [
    { name: "Dashboard", path: "/admin", icon: "dashboard" },
    { name: "Users", path: "#users", icon: "group" },
    { name: "Reviews", path: "#reviews", icon: "reviews" },
    { name: "Courses", path: "/courses", icon: "school" },
    { name: "Analytics", path: "#analytics", icon: "analytics" },
  ];

  return (
    <>
      {/* Backdrop for mobile */}
      {isOpen && (
        <div 
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
        />
      )}

      {/* Sidebar Panel */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-surface-container-lowest border-r border-white/5 flex flex-col transition-transform duration-300 ease-in-out transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:relative md:flex md:w-72 shrink-0`}
      >
        {/* Brand Header */}
        <div className="p-6 flex items-center justify-between border-b border-white/5 h-20 shrink-0">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-secondary-container flex items-center justify-center rounded-sm shrink-0">
              <span className="material-symbols-outlined text-white text-2xl">
                fitness_center
              </span>
            </div>
            <div>
              <h1 className="font-display text-lg font-black text-white tracking-tighter uppercase leading-none">
                IIFN
              </h1>
              <p className="text-[9px] uppercase tracking-widest text-on-surface-variant font-bold mt-1">
                Performance Lab
              </p>
            </div>
          </div>
          {/* Mobile Close Button */}
          <button
            onClick={onClose}
            className="material-symbols-outlined text-on-surface-variant hover:text-white md:hidden cursor-pointer text-xl"
          >
            close
          </button>
        </div>

        {/* Nav Menu */}
        <nav className="flex-1 mt-8 px-4 space-y-2">
          {menuItems.map((item) => {
            const isActive =
              pathname === item.path ||
              (item.path.startsWith("#") && pathname === "/admin");
            return (
              <Link
                key={item.name}
                href={item.path}
                onClick={onClose}
                className={`flex items-center gap-4 p-4 rounded-lg transition-all group ${
                  isActive
                    ? "bg-secondary-container text-white font-bold shadow-[0_0_20px_rgba(224,6,0,0.2)]"
                    : "text-on-surface-variant hover:bg-white/5 hover:text-white"
                }`}
              >
                <span className="material-symbols-outlined text-xl">
                  {item.icon}
                </span>
                <span className="font-body font-bold text-xs uppercase tracking-wider">
                  {item.name}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-white/5 space-y-2">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-4 p-4 rounded-lg text-on-surface-variant hover:bg-white/5 hover:text-white transition-all text-left cursor-pointer"
          >
            <span className="material-symbols-outlined">logout</span>
            <span className="font-body font-bold text-xs uppercase tracking-wider">
              Logout
            </span>
          </button>
          
          <div className="bg-surface-container-high p-4 rounded border border-white/5">
            <p className="text-[9px] text-on-surface-variant uppercase mb-2 font-bold tracking-widest">
              Active Server
            </p>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-[11px] font-body font-bold text-white uppercase">
                MUMBAI-SC-01
              </span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
