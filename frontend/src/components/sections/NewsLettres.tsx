import React, { useState, FormEvent } from "react";
import { Mail, MapPin, Send, CheckCircle2, Users } from "lucide-react";

export default function NewsletterLocationSection() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email) return;

    setIsSubmitted(true);

    // Simulate API call success feedback
    setTimeout(() => {
      setEmail("");
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <section
      className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-24 overflow-hidden"
      aria-labelledby="newsletter-heading"
    >
      {/* Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />

      {/* Glow effects */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply blur-3xl opacity-10 animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply blur-3xl opacity-10 animate-pulse delay-1000" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

          {/* ================= Newsletter ================= */}
          <article
            className="relative bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-8 sm:p-10 shadow-2xl hover:border-cyan-500/50 transition-all duration-500 hover:shadow-cyan-500/20"
            aria-labelledby="newsletter-heading"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 rounded-2xl" />

            <div className="relative z-10 space-y-8">
              {/* Header */}
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20">
                  <Mail className="w-4 h-4 text-cyan-400" />
                  <span className="text-sm font-medium text-cyan-300">Newsletter</span>
                </div>

                <h2
                  id="newsletter-heading"
                  className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight"
                >
                  <span className="block text-white">Stay Connected</span>
                  <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                    With Our Robotics Club
                  </span>
                </h2>

                <p className="text-lg text-slate-300 leading-relaxed">
                  Get exclusive updates on workshops, competitions, and robotics
                  innovations. Join our growing community of future engineers.
                </p>
              </div>

              {/* Form */}
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />

                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => setIsFocused(false)}
                      placeholder="Enter your email address"
                      required
                      className={`
                        w-full pl-12 pr-4 py-4
                        bg-slate-900/50 backdrop-blur-sm
                        border-2 rounded-xl
                        text-white placeholder-slate-400
                        transition-all duration-300
                        focus:outline-none
                        ${
                          isFocused
                            ? "border-cyan-500 shadow-lg shadow-cyan-500/20"
                            : "border-slate-700 hover:border-slate-600"
                        }
                      `}
                      aria-label="Email address for newsletter"
                    />
                  </div>

                  <button
                    type="submit"
                    className="group relative w-full px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg font-semibold text-white shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Subscribe Now
                      <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </span>

                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </button>
                </form>
              ) : (
                <div className="py-8 text-center space-y-4">
                  <div className="flex justify-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg shadow-cyan-500/30">
                      <CheckCircle2 className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-white">You're All Set!</h3>

                  <p className="text-slate-300">
                    Welcome to the robotics community. Check your inbox for a
                    confirmation email.
                  </p>
                </div>
              )}

              {/* Social proof */}
              <div className="flex items-center gap-3 pt-4 border-t border-slate-700/50">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 border-2 border-slate-800" />
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 border-2 border-slate-800" />
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 border-2 border-slate-800" />
                </div>

                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <Users className="w-4 h-4" />
                  <span>
                    <span className="font-semibold text-cyan-400">300+</span>
                    {" "}students already learning robotics
                  </span>
                </div>
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-b-2xl" />
          </article>

          {/* ================= Location ================= */}
          <article
            className="group relative bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700/50 overflow-hidden shadow-xl hover:border-slate-600/50 transition-all duration-500 hover:scale-[1.01] hover:shadow-2xl"
            aria-labelledby="location-heading"
          >
            <div className="p-6 space-y-3 border-b border-slate-700/50">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20">
                <MapPin className="w-4 h-4 text-purple-400" />
                <span className="text-sm font-medium text-purple-300">Our Location</span>
              </div>

              <h3 id="location-heading" className="text-2xl sm:text-3xl font-bold text-white">
                Visit Our Lab
              </h3>
            </div>

            {/* Map */}
            <div className="relative h-80 bg-gradient-to-br from-slate-700 to-slate-800">
              <iframe
                src="https://www.google.com/maps?q=Tunis&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Robotics Club Location"
                className="grayscale-[30%] contrast-[1.1]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent pointer-events-none" />
            </div>

            {/* Address */}
            <div className="p-6 space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />

                <div>
                  <p className="font-semibold text-white">
                    Engineering Building A, Room 205
                  </p>

                  <p className="text-sm text-slate-400">
                    University Campus, Tunis, Tunisia
                  </p>
                </div>
              </div>

              <p className="text-sm text-slate-400 italic border-t border-slate-700/50 pt-3">
                Visit during workshops & events • Mon‑Fri, 2PM‑8PM
              </p>

              <button className="group w-full px-6 py-3 bg-slate-800/50 backdrop-blur-sm border-2 border-slate-700 rounded-lg font-semibold text-white hover:border-purple-500 hover:bg-slate-800/80 transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2">
                Get Directions
                <MapPin className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </article>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-900 to-transparent pointer-events-none" />
    </section>
  );
}
