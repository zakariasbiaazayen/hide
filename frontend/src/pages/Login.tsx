import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, Github, Loader2 } from 'lucide-react';
import Logo from '../components/ui/Logo'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import { useLogin } from '../hooks/useLogin';

export default function Login() {
const {
  email,
  setEmail,
  password,
  setPassword,
  showPassword,
  setShowPassword,
  isLoading,
  emailFocused,
  setEmailFocused,
  passwordFocused,
  setPasswordFocused,
  handleSubmit,
  handleOAuthLogin,
} = useLogin();


  return (
    <>
    <Header />
      <div className="min-h-screen pt-30 pb-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden relative">
      
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20"></div>

      {/* Floating Gradient Orbs */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-500"></div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md">
        <article
          className="group relative bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-8 sm:p-10 shadow-2xl hover:border-cyan-500/50 transition-all duration-500 hover:shadow-cyan-500/20"
          aria-labelledby="login-heading"
        >
          {/* Gradient Glow on Hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          <div className="relative z-10 space-y-8">
            
            {/* Logo & Club Name */}
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl rotate-6 group-hover:rotate-12 transition-transform duration-500"></div>
                  <div className="absolute inset-0 w-20 h-20 bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl flex items-center justify-center shadow-xl">
                    <Logo className="w-10 h-10 text-cyan-400" />
                  </div>
                </div>
              </div>
              
              <div>
                <h1
                  id="login-heading"
                  className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent"
                >
                  RoboClub
                </h1>
                <p className="text-slate-400 text-sm mt-2">
                  Welcome back! Sign in to continue
                </p>
              </div>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Email Input */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-slate-300">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className={`w-5 h-5 transition-colors duration-300 ${emailFocused ? 'text-cyan-400' : 'text-slate-400'}`} />
                  </div>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setEmailFocused(true)}
                    onBlur={() => setEmailFocused(false)}
                    placeholder="your.email@example.com"
                    required
                    className={`
                      w-full pl-12 pr-4 py-3.5
                      bg-slate-900/50 backdrop-blur-sm
                      border-2 rounded-lg
                      text-white placeholder-slate-500
                      transition-all duration-300
                      focus:outline-none
                      ${emailFocused
                        ? 'border-cyan-400 shadow-lg shadow-cyan-500/20'
                        : 'border-slate-700/50 hover:border-slate-600'
                      }
                    `}
                    aria-label="Email address"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-slate-300">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className={`w-5 h-5 transition-colors duration-300 ${passwordFocused ? 'text-cyan-400' : 'text-slate-400'}`} />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setPasswordFocused(true)}
                    onBlur={() => setPasswordFocused(false)}
                    placeholder="Enter your password"
                    required
                    className={`
                      w-full pl-12 pr-12 py-3.5
                      bg-slate-900/50 backdrop-blur-sm
                      border-2 rounded-lg
                      text-white placeholder-slate-500
                      transition-all duration-300
                      focus:outline-none
                      ${passwordFocused
                        ? 'border-cyan-400 shadow-lg shadow-cyan-500/20'
                        : 'border-slate-700/50 hover:border-slate-600'
                      }
                    `}
                    aria-label="Password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-cyan-400 transition-colors duration-300"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-slate-600 bg-slate-900/50 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-0 focus:ring-2 transition-all duration-300"
                  />
                  <span className="text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
                    Remember me
                  </span>
                </label>
                <a
                  href="/forgot-password"
                  className="text-slate-400 hover:text-cyan-400 transition-colors duration-300 font-medium"
                >
                  Forgot password?
                </a>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="group/btn relative w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg font-semibold text-white shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                aria-label="Sign in to your account"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    'Sign In'
                  )}
                </span>
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
              </button>
            </form>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-700/50"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-slate-800/50 text-slate-400">Or continue with</span>
              </div>
            </div>

            {/* OAuth Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => handleOAuthLogin('google')}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-slate-900/50 backdrop-blur-sm border-2 border-slate-700/50 rounded-lg font-medium text-slate-300 hover:border-slate-600 hover:bg-slate-800/50 hover:text-white transition-all duration-300 hover:scale-105"
                aria-label="Sign in with Google"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Google
              </button>

              <button
                type="button"
                onClick={() => handleOAuthLogin('github')}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-slate-900/50 backdrop-blur-sm border-2 border-slate-700/50 rounded-lg font-medium text-slate-300 hover:border-slate-600 hover:bg-slate-800/50 hover:text-white transition-all duration-300 hover:scale-105"
                aria-label="Sign in with GitHub"
              >
                <Github className="w-5 h-5" />
                GitHub
              </button>
            </div>

            {/* Sign Up Link */}
            <div className="text-center text-sm">
              <span className="text-slate-400">Don't have an account? </span>
              <a
                href="/register"
                className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors duration-300"
              >
                Create account
              </a>
            </div>

          </div>

          {/* Bottom Accent Line */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-b-2xl"></div>
        </article>

        {/* Additional Info */}
        <p className="mt-8 text-center text-sm text-slate-500">
          By signing in, you agree to our{' '}
          <a href="/terms" className="text-slate-400 hover:text-cyan-400 transition-colors duration-300">
            Terms of Service
          </a>
          {' '}and{' '}
          <a href="/privacy" className="text-slate-400 hover:text-cyan-400 transition-colors duration-300">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
    <Footer />
    </>
  );
}