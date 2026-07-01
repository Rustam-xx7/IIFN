"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminSidebar() {
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", path: "/admin", icon: "dashboard" },
    { name: "Users", path: "#users", icon: "group" },
    { name: "Reviews", path: "#reviews", icon: "reviews" },
    { name: "Courses", path: "/courses", icon: "school" },
    { name: "Analytics", path: "#analytics", icon: "analytics" },
  ];

  return (
    <aside className="w-20 md:w-72 bg-surface-container-lowest border-r border-white/5 flex flex-col z-[40] transition-all duration-300">
      {/* Brand Header */}
      <Link href="/" className="p-6 flex items-center gap-4 border-b border-white/5 h-20 shrink-0 hover:opacity-80 transition-all cursor-pointer">
        <div className="w-10 h-10 bg-secondary-container flex items-center justify-center rounded-sm shrink-0">
          <span className="material-symbols-outlined text-white text-2xl">fitness_center</span>
        </div>
        <div className="hidden md:block">
          <h1 className="font-display text-lg font-black text-white tracking-tighter uppercase leading-none">IIFN</h1>
          <p className="text-[9px] uppercase tracking-widest text-on-surface-variant font-bold mt-1">Performance Lab</p>
        </div>
      </Link>

      {/* Nav Menu */}
      <nav className="flex-1 mt-8 px-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.path || (item.path.startsWith("#") && pathname === "/admin");
          return (
            <Link
              key={item.name}
              href={item.path}
              className={`flex items-center gap-4 p-4 rounded-lg transition-all group ${
                isActive
                  ? "bg-secondary-container text-white font-bold shadow-[0_0_20px_rgba(224,6,0,0.2)]"
                  : "text-on-surface-variant hover:bg-white/5 hover:text-white"
              }`}
            >
              <span className="material-symbols-outlined text-xl">{item.icon}</span>
              <span className="hidden md:inline font-body font-bold text-xs uppercase tracking-wider">
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-white/5 space-y-2">
        <button 
          onClick={() => {
            localStorage.removeItem("iifn_user");
            window.location.href = "/";
          }}
          className="w-full flex items-center gap-4 p-4 rounded-lg text-on-surface-variant hover:bg-white/5 hover:text-white transition-all text-left cursor-pointer"
        >
          <span className="material-symbols-outlined">logout</span>
          <span className="hidden md:inline font-body font-bold text-xs uppercase tracking-wider">Logout</span>
        </button>
        <div className="bg-surface-container-high p-4 rounded-xl hidden md:block border border-white/5">
          <p className="text-[9px] text-on-surface-variant uppercase mb-2 font-bold tracking-widest">Active Server</p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-[11px] font-body font-bold text-white uppercase">MUMBAI-SC-01</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
