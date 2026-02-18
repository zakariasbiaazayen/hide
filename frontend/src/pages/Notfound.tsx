import { Link } from 'react-router-dom';
import { AlertTriangle, Home, ArrowLeft } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

export default function Notfound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white overflow-hidden">
      <Header />

      <main className="relative flex items-center justify-center px-4 pt-32 pb-24">
        {/* Glow background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-3xl" />
        </div>

        <section className="relative z-10 max-w-3xl w-full text-center space-y-10">
          {/* Icon */}
          <div className="flex justify-center">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-2xl shadow-cyan-500/30">
              <AlertTriangle className="w-12 h-12" />
            </div>
          </div>

          {/* 404 Number */}
          <h1 className="text-7xl sm:text-8xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            404
          </h1>

          {/* Message */}
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold">
              Page Not Found
            </h2>
            <p className="text-slate-300 text-lg max-w-xl mx-auto">
              The page you are looking for doesn’t exist or has been moved.
              Let’s get you back to exploring robotics, innovation, and
              technology with RoboClub.
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/"
              className="group inline-flex items-center gap-2 px-8 py-3 rounded-xl font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 shadow-lg shadow-blue-500/30 hover:scale-105 hover:shadow-blue-500/50 transition-all duration-300"
            >
              <Home className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
              Go Home
            </Link>

            <button
              onClick={() => window.history.back()}
              className="group inline-flex items-center gap-2 px-8 py-3 rounded-xl font-semibold border border-slate-600/50 bg-slate-800/40 backdrop-blur-sm hover:border-cyan-500/50 hover:scale-105 transition-all duration-300"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
              Go Back
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
