"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { loginUserWithAuth } from "@/service/firebaseAuth.service";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setIsSubmitting(true);
    try {
      const user = await loginUserWithAuth(email, password);
      // Store user session in localStorage for local state checking in admin
      localStorage.setItem("iifn_user", JSON.stringify(user));
      setSuccess(true);
      setTimeout(() => {
        // Redirect based on role
        if (user.role === "admin") {
          router.push("/admin");
        } else {
          router.push("/");
        }
      }, 1500);
    } catch (err) {
      console.error(err);
      setError(err.message || "Invalid email or password.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="performance-grid bg-black min-h-screen flex items-center justify-center p-6 relative">
      <div className="absolute top-6 left-6">
        <Link
          href="/"
          className="font-display font-black text-2xl text-white uppercase tracking-tighter hover:text-secondary-container transition-colors"
        >
          IIFN
        </Link>
      </div>

      <div className="w-full max-w-md glass-panel p-8 md:p-10 rounded relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-secondary-container"></div>

        <div className="text-center mb-8">
          <h1 className="font-display font-black text-2xl uppercase text-white">
            Student Portal
          </h1>
          <p className="text-on-surface-variant text-xs mt-1 font-body">
            Sign in to your learning management system
          </p>
        </div>

        {error && (
          <div className="p-4 bg-error/10 border border-error/20 rounded text-error text-xs font-body mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-base">error</span>
            {error}
          </div>
        )}

        {success ? (
          <div className="p-6 bg-green-500/10 border border-green-500/20 rounded text-green-500 text-xs font-body text-center space-y-3 mb-6">
            <span className="material-symbols-outlined text-4xl animate-bounce">
              task_alt
            </span>
            <p className="font-bold uppercase tracking-wider">Access Granted</p>
            <p className="text-on-surface-variant">
              Redirecting to Performance Dashboard...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="font-body font-bold text-[10px] uppercase text-on-surface/60 tracking-widest block">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-black border border-white/10 p-4 focus:border-secondary-container text-white placeholder:text-white/20 text-sm rounded outline-none transition-all"
                placeholder="john@athlete.com"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="font-body font-bold text-[10px] uppercase text-on-surface/60 tracking-widest block">
                  Password
                </label>
                <a
                  href="#"
                  className="text-[9px] uppercase tracking-wider font-bold text-secondary-container hover:underline"
                >
                  Forgot?
                </a>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-black border border-white/10 p-4 pr-12 focus:border-secondary-container text-white placeholder:text-white/20 text-sm rounded outline-none transition-all"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-white transition-colors"
                >
                  <span className="material-symbols-outlined text-lg">
                    {showPassword ? "visibility_off" : "visibility"}
                  </span>
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-secondary-container text-white py-4 font-display font-black text-sm uppercase tracking-widest red-glow hover:scale-[1.01] active:scale-95 transition-all mt-4 disabled:opacity-50 disabled:pointer-events-none"
            >
              {isSubmitting ? "Authorizing..." : "Authorize Login"}
            </button>
          </form>
        )}

        <div className="mt-8 text-center pt-6 border-t border-white/5">
          <p className="text-xs text-on-surface-variant font-body">
            New applicant?{" "}
            <Link
              href="/signup"
              className="text-secondary-container font-bold hover:underline"
            >
              Create student account
            </Link>
          </p>
        </div>
      </div>

      {/* Background radial atmosphere */}
      <div className="fixed inset-0 pointer-events-none z-[-1] opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-secondary-container/20 blur-[120px]"></div>
      </div>
    </main>
  );
}
