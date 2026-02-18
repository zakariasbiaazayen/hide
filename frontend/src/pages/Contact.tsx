import React from "react";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <Header />
      <div className="max-w-7xl mx-auto px-6 py-30 space-y-20">

        {/* Header */}
        <section className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Contact Us
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Have questions about our robotics club, events, or membership? Reach out to us and our team will respond as soon as possible.
          </p>
        </section>

        {/* Main Grid */}
        <section className="grid lg:grid-cols-2 gap-10">

          {/* Contact Form */}
          <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700 rounded-2xl p-8 space-y-6 shadow-xl">
            <h2 className="text-2xl font-semibold">Send a Message</h2>

            <form className="space-y-5">
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full bg-slate-900/60 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full bg-slate-900/60 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition"
                />
              </div>

              <input
                type="text"
                placeholder="Subject"
                className="w-full bg-slate-900/60 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition"
              />

              <textarea
                rows={5}
                placeholder="Your Message..."
                className="w-full bg-slate-900/60 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition resize-none"
              />

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:opacity-90 transition rounded-lg py-3 font-semibold shadow-lg"
              >
                <Send className="w-4 h-4" />
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">

            <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700 rounded-2xl p-6 flex items-start gap-4">
              <Mail className="text-cyan-400" />
              <div>
                <h3 className="font-semibold">Email</h3>
                <p className="text-slate-400">roboticsclub@email.com</p>
              </div>
            </div>

            <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700 rounded-2xl p-6 flex items-start gap-4">
              <Phone className="text-cyan-400" />
              <div>
                <h3 className="font-semibold">Phone</h3>
                <p className="text-slate-400">+216 00 000 000</p>
              </div>
            </div>

            <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700 rounded-2xl p-6 flex items-start gap-4">
              <MapPin className="text-cyan-400" />
              <div>
                <h3 className="font-semibold">Location</h3>
                <p className="text-slate-400">University Campus, Robotics Lab</p>
              </div>
            </div>

            <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700 rounded-2xl p-6 flex items-start gap-4">
              <Clock className="text-cyan-400" />
              <div>
                <h3 className="font-semibold">Working Hours</h3>
                <p className="text-slate-400">Mon – Fri : 9:00 AM – 6:00 PM</p>
              </div>
            </div>

          </div>
        </section>

        {/* Google Map Section */}
        <section className="space-y-6">
          <h2 className="text-3xl font-semibold text-center">Find Us on the Map</h2>

          <div className="rounded-2xl overflow-hidden border border-slate-700 shadow-xl">
            <iframe
              title="Robotics Club Location"
              src="https://www.google.com/maps?q=36.8065,10.1815&z=15&output=embed"
              className="w-full h-[400px] border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </section>

        {/* FAQ Section */}
        <section className="space-y-10">
          <h2 className="text-3xl font-semibold text-center">Frequently Asked Questions</h2>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                q: "How can I join the robotics club?",
                a: "You can register through our website or contact us directly via email or phone."
              },
              {
                q: "Do I need prior robotics experience?",
                a: "No. We welcome beginners and provide training workshops for all levels."
              },
              {
                q: "Are events free?",
                a: "Some workshops are free, while competitions or advanced training may require a small fee."
              },
              {
                q: "Where are sessions held?",
                a: "Most sessions take place in the university robotics laboratory or partner innovation spaces."
              }
            ].map((item, i) => (
              <div
                key={i}
                className="bg-slate-800/40 backdrop-blur-xl border border-slate-700 rounded-2xl p-6"
              >
                <h3 className="font-semibold mb-2">{item.q}</h3>
                <p className="text-slate-400 text-sm">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

      </div>
    <Footer />
    </div>
  );
}
