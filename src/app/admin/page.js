"use client";

import React, { useState } from "react";
import AdminSidebar from "@/components/AdminSidebar";

export default function AdminDashboard() {
  // Mock users list state
  const [users, setUsers] = useState([
    { id: 1, name: "Arjun Mehta", email: "arjun.m@example.com", course: "Advanced Personal Training", date: "12 Oct 2023", status: "Active" },
    { id: 2, name: "Saira Khan", email: "s.khan@example.com", course: "Sports Nutrition Certification", date: "20 Nov 2023", status: "Pending" },
    { id: 3, name: "Rohan Das", email: "rohan.d@example.com", course: "Master Diploma in Bodybuilding", date: "05 Jan 2024", status: "Active" }
  ]);

  // Mock reviews moderation state
  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: "Priya Sharma",
      date: "14 Feb 2024",
      rating: 5,
      comment: "The Advanced Personal Training course completely transformed my approach to client programming. The biomechanics module was particularly eye-opening. Highly recommended for professionals!",
      approved: true,
      initials: "PS"
    },
    {
      id: 2,
      name: "Kabir Varma",
      date: "12 Feb 2024",
      rating: 4,
      comment: "Excellent depth in the Sports Nutrition course. Some of the case studies were slightly outdated but the core principles are solid and scientifically backed. Ready to implement these with my athletes.",
      approved: false,
      initials: "KV"
    }
  ]);

  const [searchQuery, setSearchQuery] = useState("");

  // Handlers for user management
  const handleDeleteUser = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  const handleToggleStatus = (id) => {
    setUsers(users.map(user => {
      if (user.id === id) {
        return { ...user, status: user.status === "Active" ? "Pending" : "Active" };
      }
      return user;
    }));
  };

  // Handlers for reviews moderation
  const handleToggleReviewApproval = (id) => {
    setReviews(reviews.map(rev => {
      if (rev.id === id) {
        return { ...rev, approved: !rev.approved };
      }
      return rev;
    }));
  };

  const handleDeleteReview = (id) => {
    setReviews(reviews.filter(rev => rev.id !== id));
  };

  // Filtered users by query
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    user.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen overflow-hidden bg-black text-on-surface">
      
      {/* Sidebar Navigation */}
      <AdminSidebar />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-background overflow-y-auto relative">
        
        {/* Top App Bar */}
        <header className="sticky top-0 h-20 glass-panel z-30 flex items-center justify-between px-6 md:px-10 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-8">
            <h2 className="font-display font-black text-lg md:text-xl text-white uppercase tracking-tight">Admin Portal</h2>
            <div className="hidden lg:flex items-center bg-surface-container-low px-4 py-2 rounded border border-white/5 min-w-[300px]">
              <span className="material-symbols-outlined text-on-surface-variant text-sm">search</span>
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none focus:ring-0 text-xs text-on-surface placeholder:text-on-surface-variant/40 w-full ml-2 outline-none" 
                placeholder="Search students or courses..." 
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="relative text-on-surface hover:text-secondary-container transition-colors p-1">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-secondary-container text-[9px] flex items-center justify-center rounded-full text-white font-bold font-body">4</span>
            </button>
            <div className="h-6 w-px bg-white/10 mx-2"></div>
            
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-body font-bold text-white leading-none">Vikram Singh</p>
                <p className="text-[9px] text-on-surface-variant uppercase font-bold tracking-tighter mt-1">Chief Administrator</p>
              </div>
              <div className="w-10 h-10 rounded bg-secondary-container flex items-center justify-center font-display font-black text-white text-base">
                VS
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Grid Content */}
        <div className="p-6 md:p-10 space-y-12">
          
          {/* Statistics Grid */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-surface-container-low p-6 md:p-8 border border-white/5 relative overflow-hidden group rounded">
              <div className="absolute top-0 right-0 w-32 h-32 bg-secondary-container/5 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-500"></div>
              <p className="text-on-surface-variant font-body font-bold uppercase tracking-widest text-[10px] mb-4">Total Students</p>
              <div className="flex items-end justify-between">
                <h3 className="text-4xl md:text-5xl font-black text-white font-display">{users.length + 4889}</h3>
                <span className="text-green-500 font-bold text-xs mb-2 flex items-center">
                  <span className="material-symbols-outlined text-sm mr-1">trending_up</span>+12%
                </span>
              </div>
            </div>
            
            <div className="bg-surface-container-low p-6 md:p-8 border border-white/5 relative overflow-hidden group rounded">
              <div className="absolute top-0 right-0 w-32 h-32 bg-secondary-container/5 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-500"></div>
              <p className="text-on-surface-variant font-body font-bold uppercase tracking-widest text-[10px] mb-4">Active Reviews</p>
              <div className="flex items-end justify-between">
                <h3 className="text-4xl md:text-5xl font-black text-white font-display">{reviews.length}</h3>
                <span className="text-secondary-container font-bold text-xs mb-2 uppercase tracking-wider font-body">Needs Moderation</span>
              </div>
            </div>
            
            <div className="bg-secondary-container p-6 md:p-8 relative overflow-hidden group shadow-[0_0_40px_rgba(224,6,0,0.15)] rounded">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
              <p className="text-white/80 font-body font-bold uppercase tracking-widest text-[10px] mb-4">Course Sales</p>
              <div className="flex items-end justify-between">
                <h3 className="text-4xl md:text-5xl font-black text-white font-display">₹2.4M</h3>
                <span className="text-white font-bold text-xs mb-2 uppercase tracking-wider font-body">This Month</span>
              </div>
            </div>
          </section>

          {/* User Management Section */}
          <section className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h4 className="font-display font-black text-lg md:text-xl text-white uppercase tracking-tight">User Management</h4>
                <p className="text-on-surface-variant text-xs font-body mt-1">Manage student profiles, search registry, and toggle enrollment status</p>
              </div>
              <button className="bg-white text-black px-6 py-2.5 rounded-sm font-body font-bold text-xs uppercase hover:bg-secondary-container hover:text-white transition-all shrink-0">
                Export Database
              </button>
            </div>
            
            <div className="bg-surface-container-low border border-white/5 overflow-hidden rounded">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[700px]">
                  <thead>
                    <tr className="bg-black/40 border-b border-white/5">
                      <th className="px-6 py-4 font-body font-bold uppercase text-[10px] tracking-widest text-on-surface-variant">Student Info</th>
                      <th className="px-6 py-4 font-body font-bold uppercase text-[10px] tracking-widest text-on-surface-variant">Course Pathway</th>
                      <th className="px-6 py-4 font-body font-bold uppercase text-[10px] tracking-widest text-on-surface-variant">Enrolled Date</th>
                      <th className="px-6 py-4 font-body font-bold uppercase text-[10px] tracking-widest text-on-surface-variant">Status</th>
                      <th className="px-6 py-4 font-body font-bold uppercase text-[10px] tracking-widest text-on-surface-variant text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-sm">
                    {filteredUsers.length > 0 ? (
                      filteredUsers.map((user) => (
                        <tr key={user.id} className="hover:bg-white/5 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 bg-surface-container-high rounded flex items-center justify-center font-display font-black text-secondary-container text-xs shrink-0">
                                {user.name.split(" ").map(n => n[0]).join("")}
                              </div>
                              <div>
                                <p className="text-white font-bold font-body">{user.name}</p>
                                <p className="text-[10px] text-on-surface-variant font-body">{user.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-white font-body text-xs uppercase">{user.course}</td>
                          <td className="px-6 py-4 text-on-surface-variant font-body text-xs">{user.date}</td>
                          <td className="px-6 py-4">
                            <button 
                              onClick={() => handleToggleStatus(user.id)}
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider cursor-pointer border ${
                                user.status === "Active" 
                                  ? "bg-green-500/10 text-green-500 border-green-500/20" 
                                  : "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                              }`}
                            >
                              {user.status}
                            </button>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-3">
                              <button 
                                onClick={() => handleToggleStatus(user.id)}
                                title="Toggle Status"
                                className="p-1 text-on-surface-variant hover:text-white transition-colors"
                              >
                                <span className="material-symbols-outlined text-base">sync</span>
                              </button>
                              <button 
                                onClick={() => handleDeleteUser(user.id)}
                                title="Delete Student"
                                className="p-1 text-on-surface-variant hover:text-secondary-container transition-colors"
                              >
                                <span className="material-symbols-outlined text-base">delete</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="px-6 py-10 text-center text-on-surface-variant/40 font-body">No student entries match current query.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Review Moderation Section */}
          <section className="space-y-6">
            <div>
              <h4 className="font-display font-black text-lg md:text-xl text-white uppercase tracking-tight">Review Moderation</h4>
              <p className="text-on-surface-variant text-xs font-body mt-1">Review student testimonials before publishing them onto the landing page</p>
            </div>
            
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {reviews.length > 0 ? (
                reviews.map((rev) => (
                  <div key={rev.id} className="bg-surface-container-low p-6 border border-white/5 relative flex flex-col justify-between hover:border-secondary-container/30 transition-all rounded">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center font-display font-black text-white text-sm shrink-0">
                            {rev.initials}
                          </div>
                          <div>
                            <p className="text-white font-bold leading-none font-body">{rev.name}</p>
                            <div className="flex text-secondary-container mt-1">
                              {[...Array(5)].map((_, i) => (
                                <span key={i} className="material-symbols-outlined text-xs">
                                  {i < rev.rating ? "star" : "star_rate"}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        <p className="text-[9px] uppercase font-bold text-on-surface-variant tracking-wider font-body">{rev.date}</p>
                      </div>
                      <p className="text-on-surface-variant text-sm italic leading-relaxed mb-6 font-body">
                        "{rev.comment}"
                      </p>
                    </div>
                    <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-auto">
                      <label className="relative inline-flex items-center cursor-pointer select-none">
                        <input 
                          type="checkbox" 
                          checked={rev.approved} 
                          onChange={() => handleToggleReviewApproval(rev.id)}
                          className="sr-only peer" 
                        />
                        <div className="w-10 h-5 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-secondary-container"></div>
                        <span className={`ml-3 text-[10px] font-body font-bold uppercase tracking-wider ${
                          rev.approved ? "text-white" : "text-on-surface-variant"
                        }`}>
                          {rev.approved ? "Live on Landing Page" : "Review Hidden"}
                        </span>
                      </label>
                      <button 
                        onClick={() => handleDeleteReview(rev.id)}
                        className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest text-secondary-container hover:underline"
                      >
                        <span className="material-symbols-outlined text-sm">delete</span> Delete Review
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-2 p-8 text-center text-on-surface-variant/40 border border-dashed border-white/10 rounded">
                  All student reviews handled.
                </div>
              )}
            </div>
          </section>

        </div>

        {/* Dashboard Footer */}
        <footer className="mt-auto px-6 md:px-10 py-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 bg-surface-container-lowest shrink-0">
          <p className="text-[10px] text-on-surface-variant font-body">© 2026 Indian Institute of Fitness &amp; Nutrition. Admin Portal v2.4.1</p>
          <div className="flex gap-6">
            <a href="#" className="text-[9px] font-body font-bold uppercase tracking-wider text-on-surface-variant hover:text-white transition-colors">Documentation</a>
            <a href="#" className="text-[9px] font-body font-bold uppercase tracking-wider text-on-surface-variant hover:text-white transition-colors">Support Support</a>
            <a href="#" className="text-[9px] font-body font-bold uppercase tracking-wider text-secondary-container">System Health</a>
          </div>
        </footer>

        {/* Atmosphere glowing lights */}
        <div className="fixed inset-0 pointer-events-none z-[-1] opacity-20">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-secondary-container/10 blur-[120px]"></div>
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-white/5 blur-[100px]"></div>
        </div>
      </main>

    </div>
  );
}
