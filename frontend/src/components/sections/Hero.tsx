import { Cpu, Zap, Code } from "lucide-react";
import type { FC } from "react";
import Logo from '../ui/Logo'
const stats = [
  { value: "150+", label: "Active Members" },
  { value: "50+", label: "Projects Built" },
  { value: "12", label: "Competitions Won" },
] as const;

const features = [
  { icon: Cpu, label: "AI & Machine Learning", color: "text-cyan-400" },
  { icon: Code, label: "Hands-on Projects", color: "text-purple-400" },
  { icon: Zap, label: "Competitions & Events", color: "text-blue-400" },
] as const;

const Hero: FC = () => {
  return (
    <section
      aria-label="Hero"
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900"
    >
      {/* Grid background */}
      <div className="pointer-events-none absolute inset-0 opacity-20 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]">
        <div className="h-full w-full bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      {/* Glow orbs */}
      <div className="pointer-events-none absolute left-10 top-20 h-72 w-72 animate-pulse rounded-full bg-blue-500 opacity-20 blur-3xl" />
      <div className="pointer-events-none absolute right-10 top-40 h-72 w-72 animate-pulse rounded-full bg-purple-500 opacity-20 blur-3xl delay-1000" />
      <div className="pointer-events-none absolute -bottom-8 left-1/2 h-72 w-72 animate-pulse rounded-full bg-cyan-500 opacity-20 blur-3xl delay-500" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-16 pt-24 sm:px-6 sm:pb-24 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-12 lg:flex-row">
          {/* Left content */}
          <div className="max-w-2xl flex-1 space-y-8 text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 backdrop-blur-sm">
              <Zap className="h-4 w-4 text-blue-400" aria-hidden />
              <span className="text-sm font-medium text-blue-300">
                Where Innovation Meets Engineering
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
              <span className="block">Build the</span>
              <span className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Future of Robotics
              </span>
            </h1>

            {/* Description */}
            <p className="max-w-xl text-xl leading-relaxed text-slate-300 sm:text-2xl">
              Join a community of innovators designing autonomous robots, AI systems,
              and cutting-edge electronics.
              <span className="font-semibold text-cyan-400">
                {" "}From concept to competition.
              </span>
            </p>

            {/* Features */}
            <div className="flex flex-wrap justify-center gap-3 lg:justify-start">
              {features.map(({ icon: Icon, label, color }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 rounded-lg border border-slate-700/50 bg-slate-800/50 px-4 py-2 backdrop-blur-sm"
                >
                  <Icon className={`h-5 w-5 ${color}`} aria-hidden />
                  <span className="text-sm text-slate-200">{label}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-col justify-center gap-4 pt-4 sm:flex-row lg:justify-start">
              <button
                type="button"
                className="cursor-pointer group relative rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 px-8 py-4 font-semibold text-white shadow-lg shadow-blue-500/30 transition-all duration-300 hover:scale-105 hover:shadow-blue-500/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              >
                <span className="relative z-10">Join the Club</span>
                <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </button>

              <button
                type="button"
                className="cursor-pointer group rounded-lg border-2 border-slate-700 bg-slate-800/50 px-8 py-4 font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-cyan-500 hover:bg-slate-800/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              >
                Explore Projects
                <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 border-t border-slate-700/50 pt-8 lg:justify-start">
              {stats.map(({ value, label }) => (
                <div key={label}>
                  <div className="text-3xl font-bold text-white">{value}</div>
                  <div className="text-sm text-slate-400">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right visual */}
          <div className="relative w-full max-w-lg flex-1">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-3xl" />

              <div className="relative rounded-3xl border border-slate-700/50 bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-8 shadow-2xl backdrop-blur-sm">
                <div className="relative aspect-square">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-full w-full animate-ping rounded-full border-2 border-cyan-500/30" />
                  </div>
                  <div className="absolute inset-8 flex items-center justify-center">
                    <div className="h-full w-full animate-pulse rounded-full border-2 border-blue-500/30" />
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      <div className="h-32 w-32 rotate-45 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-2xl shadow-blue-500/50" />
                      <div className="absolute inset-0 flex -rotate-45 items-center justify-center">
                        <Logo className="h-16 w-16 text-white"/>
                      </div>
                    </div>
                  </div>

                  <div className="absolute right-4 top-4 flex h-12 w-12 animate-bounce items-center justify-center rounded-lg border border-cyan-500/30 bg-cyan-500/20 backdrop-blur-sm delay-100">
                    <Code className="h-6 w-6 text-cyan-400" />
                  </div>
                  <div className="absolute bottom-4 left-4 flex h-12 w-12 animate-bounce items-center justify-center rounded-lg border border-purple-500/30 bg-purple-500/20 backdrop-blur-sm delay-300">
                    <Zap className="h-6 w-6 text-purple-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-900 to-transparent" />
    </section>
  );
};

export default Hero;