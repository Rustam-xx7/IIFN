"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminSidebar from "@/components/AdminSidebar";
import { getEnquiries, getEnrollments, getUsers } from "@/service/firestore.service";

export default function AdminDashboard() {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [adminUser, setAdminUser] = useState(null);

  // Database States
  const [enquiries, setEnquiries] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState("enquiries"); // 'enquiries' | 'enrollments' | 'users'
  const [searchQuery, setSearchQuery] = useState("");

  // Verification & Loading Session Check
  useEffect(() => {
    const storedUser = localStorage.getItem("iifn_user");
    if (!storedUser) {
      router.push("/login");
      return;
    }
    const parsedUser = JSON.parse(storedUser);
    if (parsedUser.role !== "admin") {
      router.push("/");
      return;
    }
    setTimeout(() => {
      setAdminUser(parsedUser);
      setIsAdmin(true);
    }, 0);

    // Fetch Database Collections
    const fetchData = async () => {
      try {
        const enq = await getEnquiries();
        const enr = await getEnrollments();
        const usr = await getUsers();
        setEnquiries(enq);
        setEnrollments(enr);
        setUsers(usr);
      } catch (err) {
        console.error("Error fetching admin data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [router]);

  // Formatter for firebase timestamp
  const formatDate = (ts) => {
    if (!ts) return "N/A";
    if (ts.toDate) return ts.toDate().toLocaleDateString("en-IN", { day: '2-digit', month: 'short', year: 'numeric' });
    if (ts.seconds) return new Date(ts.seconds * 1000).toLocaleDateString("en-IN", { day: '2-digit', month: 'short', year: 'numeric' });
    return new Date(ts).toLocaleDateString("en-IN", { day: '2-digit', month: 'short', year: 'numeric' });
  };

  if (loading || !isAdmin) {
    return (
      <div className="flex h-screen items-center justify-center bg-black text-white font-body font-bold text-sm uppercase tracking-widest">
        <span className="animate-pulse">Loading Admin Session...</span>
      </div>
    );
  }

  // Filtered queries depending on activeTab
  const getFilteredData = () => {
    const query = searchQuery.toLowerCase();
    if (activeTab === "enquiries") {
      return enquiries.filter(item => 
        (item.name || "").toLowerCase().includes(query) || 
        (item.email || "").toLowerCase().includes(query) ||
        (item.phone || "").toLowerCase().includes(query) ||
        (item.course || "").toLowerCase().includes(query)
      );
    } else if (activeTab === "enrollments") {
      return enrollments.filter(item => 
        (item.name || "").toLowerCase().includes(query) || 
        (item.email || "").toLowerCase().includes(query) ||
        (item.phone || "").toLowerCase().includes(query) ||
        (item.course || "").toLowerCase().includes(query)
      );
    } else {
      return users.filter(item => 
        (item.name || "").toLowerCase().includes(query) || 
        (item.email || "").toLowerCase().includes(query)
      );
    }
  };

  const filteredData = getFilteredData();

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
                className="bg-transparent border-none focus:ring-0 text-xs text-on-surface outline-none placeholder:text-on-surface-variant/40 w-full ml-2" 
                placeholder={`Search in ${activeTab}...`} 
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-body font-bold text-white leading-none">{adminUser?.name || "Administrator"}</p>
                <p className="text-[9px] text-on-surface-variant uppercase font-bold tracking-tighter mt-1">Authorized Access</p>
              </div>
              <div className="w-10 h-10 rounded bg-secondary-container flex items-center justify-center font-display font-black text-white text-base">
                {adminUser?.name ? adminUser.name[0].toUpperCase() : "A"}
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Grid Content */}
        <div className="p-6 md:p-10 space-y-12">
          
          {/* Statistics Grid */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-surface-container-low p-6 md:p-8 border border-white/5 relative overflow-hidden group rounded">
              <p className="text-on-surface-variant font-body font-bold uppercase tracking-widest text-[10px] mb-4">Total Enquiries</p>
              <div className="flex items-end justify-between">
                <h3 className="text-4xl md:text-5xl font-black text-white font-display">{enquiries.length}</h3>
                <span className="text-secondary-container font-bold text-xs uppercase tracking-wider font-body">enquary</span>
              </div>
            </div>
            
            <div className="bg-surface-container-low p-6 md:p-8 border border-white/5 relative overflow-hidden group rounded">
              <p className="text-on-surface-variant font-body font-bold uppercase tracking-widest text-[10px] mb-4">Active Enrollments</p>
              <div className="flex items-end justify-between">
                <h3 className="text-4xl md:text-5xl font-black text-white font-display">{enrollments.length}</h3>
                <span className="text-secondary-container font-bold text-xs uppercase tracking-wider font-body">enrollment</span>
              </div>
            </div>
            
            <div className="bg-secondary-container p-6 md:p-8 relative overflow-hidden group shadow-[0_0_40px_rgba(224,6,0,0.15)] rounded">
              <p className="text-white/80 font-body font-bold uppercase tracking-widest text-[10px] mb-4">Registered Students</p>
              <div className="flex items-end justify-between">
                <h3 className="text-4xl md:text-5xl font-black text-white font-display">{users.length}</h3>
                <span className="text-white font-bold text-xs uppercase tracking-wider font-body">users</span>
              </div>
            </div>
          </section>

          {/* Database Viewer Section */}
          <section className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/10 pb-6">
              <div>
                <h4 className="font-display font-black text-xl text-white uppercase tracking-tight">Database Collections</h4>
                <p className="text-on-surface-variant text-xs font-body mt-1">Select a Firestore collection below to inspect live documents</p>
              </div>
              
              {/* Tab Selector */}
              <div className="flex gap-2 bg-surface-container-low p-1.5 border border-white/5 rounded-sm shrink-0">
                {[
                  { id: "enquiries", label: "Enquiries", count: enquiries.length },
                  { id: "enrollments", label: "Enrollments", count: enrollments.length },
                  { id: "users", label: "Users", count: users.length }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setSearchQuery("");
                    }}
                    className={`px-4 py-2 font-body font-bold text-[10px] uppercase tracking-wider transition-all duration-300 rounded-sm cursor-pointer ${
                      activeTab === tab.id 
                        ? "bg-secondary-container text-white shadow-md" 
                        : "text-on-surface-variant hover:text-white"
                    }`}
                  >
                    {tab.label} ({tab.count})
                  </button>
                ))}
              </div>
            </div>

            {/* Collection Table */}
            <div className="bg-surface-container-low border border-white/5 overflow-hidden rounded">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[750px]">
                  <thead>
                    <tr className="bg-black/40 border-b border-white/5">
                      {activeTab === "enquiries" && (
                        <>
                          <th className="px-6 py-4 font-body font-bold uppercase text-[10px] tracking-widest text-on-surface-variant">Name / Contact</th>
                          <th className="px-6 py-4 font-body font-bold uppercase text-[10px] tracking-widest text-on-surface-variant">Course / Pathway</th>
                          <th className="px-6 py-4 font-body font-bold uppercase text-[10px] tracking-widest text-on-surface-variant">City</th>
                          <th className="px-6 py-4 font-body font-bold uppercase text-[10px] tracking-widest text-on-surface-variant">Date</th>
                          <th className="px-6 py-4 font-body font-bold uppercase text-[10px] tracking-widest text-on-surface-variant">Role</th>
                        </>
                      )}
                      {activeTab === "enrollments" && (
                        <>
                          <th className="px-6 py-4 font-body font-bold uppercase text-[10px] tracking-widest text-on-surface-variant">Candidate / Contact</th>
                          <th className="px-6 py-4 font-body font-bold uppercase text-[10px] tracking-widest text-on-surface-variant">Program</th>
                          <th className="px-6 py-4 font-body font-bold uppercase text-[10px] tracking-widest text-on-surface-variant">Occupation</th>
                          <th className="px-6 py-4 font-body font-bold uppercase text-[10px] tracking-widest text-on-surface-variant">Investment</th>
                          <th className="px-6 py-4 font-body font-bold uppercase text-[10px] tracking-widest text-on-surface-variant">Date</th>
                          <th className="px-6 py-4 font-body font-bold uppercase text-[10px] tracking-widest text-on-surface-variant">Role</th>
                        </>
                      )}
                      {activeTab === "users" && (
                        <>
                          <th className="px-6 py-4 font-body font-bold uppercase text-[10px] tracking-widest text-on-surface-variant">Full Name</th>
                          <th className="px-6 py-4 font-body font-bold uppercase text-[10px] tracking-widest text-on-surface-variant">Email Address</th>
                        </>
                      )}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-sm">
                    {filteredData.length > 0 ? (
                      filteredData.map((item) => (
                        <tr key={item.id} className="hover:bg-white/5 transition-colors">
                          {activeTab === "enquiries" && (
                            <>
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 bg-surface-container-high rounded flex items-center justify-center font-display font-black text-secondary-container text-xs shrink-0">
                                    {(item.name || "E")[0].toUpperCase()}
                                  </div>
                                  <div>
                                    <p className="text-white font-bold font-body">{item.name || "N/A"}</p>
                                    <p className="text-[10px] text-on-surface-variant font-body">{item.email || "N/A"} | {item.phone || "N/A"}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 text-white font-body text-xs uppercase">{item.course || "N/A"}</td>
                              <td className="px-6 py-4 text-on-surface-variant font-body text-xs uppercase">{item.city || "N/A"}</td>
                              <td className="px-6 py-4 text-on-surface-variant font-body text-xs">{formatDate(item.createdAt)}</td>
                              <td className="px-6 py-4">
                                <span className="inline-flex items-center px-2 py-0.5 rounded bg-secondary-container/20 text-secondary-container border border-secondary-container/20 text-[9px] font-bold uppercase tracking-wider">
                                  {item.role || "user"}
                                </span>
                              </td>
                            </>
                          )}
                          {activeTab === "enrollments" && (
                            <>
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 bg-surface-container-high rounded flex items-center justify-center font-display font-black text-secondary-container text-xs shrink-0">
                                    {(item.name || "C")[0].toUpperCase()}
                                  </div>
                                  <div>
                                    <p className="text-white font-bold font-body">{item.name || "N/A"}</p>
                                    <p className="text-[10px] text-on-surface-variant font-body">{item.email || "N/A"} | {item.phone || "N/A"}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 text-white font-body text-xs uppercase">{item.course || "N/A"}</td>
                              <td className="px-6 py-4 text-on-surface-variant font-body text-xs">{item.occupation || "N/A"}</td>
                              <td className="px-6 py-4 text-secondary-container font-body font-bold text-xs">{item.investment || "₹5,999"}</td>
                              <td className="px-6 py-4 text-on-surface-variant font-body text-xs">{formatDate(item.createdAt)}</td>
                              <td className="px-6 py-4">
                                <span className="inline-flex items-center px-2 py-0.5 rounded bg-secondary-container/20 text-secondary-container border border-secondary-container/20 text-[9px] font-bold uppercase tracking-wider">
                                  {item.role || "user"}
                                </span>
                              </td>
                            </>
                          )}
                          {activeTab === "users" && (
                            <>
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 bg-surface-container-high rounded flex items-center justify-center font-display font-black text-secondary-container text-xs shrink-0">
                                    {(item.name || "U")[0].toUpperCase()}
                                  </div>
                                  <p className="text-white font-bold font-body">{item.name || "N/A"}</p>
                                </div>
                              </td>
                              <td className="px-6 py-4 text-on-surface-variant font-body text-xs">{item.email || "N/A"}</td>
                            </>
                          )}
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={activeTab === "users" ? 2 : activeTab === "enrollments" ? 6 : 5} className="px-6 py-12 text-center text-on-surface-variant/40 font-body">
                          No documents found matching the search criteria.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

        </div>

        {/* Dashboard Footer */}
        <footer className="mt-auto px-6 md:px-10 py-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 bg-surface-container-lowest shrink-0">
          <p className="text-[10px] text-on-surface-variant font-body">© 2026 Indian Institute of Fitness &amp; Nutrition. Admin Portal v3.0.0</p>
          <div className="flex gap-6">
            <a href="#" className="text-[9px] font-body font-bold uppercase tracking-wider text-on-surface-variant hover:text-white transition-colors">Documentation</a>
            <a href="#" className="text-[9px] font-body font-bold uppercase tracking-wider text-on-surface-variant hover:text-white transition-colors">System Support</a>
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
