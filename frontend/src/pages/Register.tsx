import React, { useState  } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, Phone, User, ChevronRight, ChevronLeft, CheckCircle2, Cpu, Loader2, Hash } from 'lucide-react';
import Logo from '../components/ui/Logo'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import { registerRequest } from '../services/auth.service';

interface FormData {
  name: string;
  email: string;
  password: string;
  age: string;
  role: 'User' | 'Join Team';
  phone: string;
  verificationCode: string;
  otherInfo: { [key: string]: string };
}

interface DynamicField {
  id: string;
  label: string;
  type: 'text' | 'number' | 'email';
  required: boolean;
}

export default function Register() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    age: '',
    role: 'User',
    phone: '',
    verificationCode: '',
    otherInfo: {}
  });
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  // Simulated dynamic fields (as if coming from admin configuration)
  const dynamicFields: DynamicField[] = [
    { id: 'university', label: 'University/School Name', type: 'text', required: true },
    { id: 'major', label: 'Major/Field of Study', type: 'text', required: false },
    { id: 'experience', label: 'Years of Robotics Experience', type: 'number', required: false },
    { id: 'linkedin', label: 'LinkedIn Profile', type: 'text', required: false }
  ];

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user types
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleDynamicInputChange = (fieldId: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      otherInfo: { ...prev.otherInfo, [fieldId]: value }
    }));
    if (errors[fieldId]) {
      setErrors(prev => ({ ...prev, [fieldId]: '' }));
    }
  };

  const validateStep1 = (): boolean => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name) {
      newErrors.name = 'Name is required';
    }else if (formData.name.length < 3) {
      newErrors.name = 'Name must be at least 3 characters';
    }
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    // Age validation
    if (!formData.age) {
      newErrors.age = 'Age is required';
    } else if (parseInt(formData.age) < 13) {
      newErrors.age = 'Must be at least 13 years old';
    }

    // Phone validation
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.verificationCode) {
      newErrors.verificationCode = 'Verification code is required';
    } else if (formData.verificationCode !== '123456') {
      // Simulated verification - in real app, this would be checked against backend
      newErrors.verificationCode = 'Invalid verification code (use 123456 for demo)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    dynamicFields.forEach(field => {
      if (field.required && !formData.otherInfo[field.id]) {
        newErrors[field.id] = `${field.label} is required`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = async () => {
    if (currentStep === 1 && !validateStep1()) return;
    if (currentStep === 2 && !validateStep2()) return;

    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!formData.email || !formData.password) {
    setError("Email and password are required");
    return;
  }

  setIsLoading(true);
  setError(null);
  const formattedData = {
  name: formData.name,
  email: formData.email,
  password: formData.password,
  dateOfBirth: formData.age, // ISO string
  role: formData.role.toLowerCase(), // 'user' or 'admin'
  phoneNumber: Number(formData.phone),
  University: formData.otherInfo.university,
  major: formData.otherInfo.major,
  Experience: Number(formData.otherInfo.experience),
  LinkedIn: formData.otherInfo.linkedin
};



  try {
    const data = await registerRequest(formattedData)

    localStorage.setItem("access_token", data.access_token);
    localStorage.setItem("user", JSON.stringify(data.user));

    const role = data.user.role;
    if (role === "admin") {
      navigate("/admin/dashboard", { replace: true });
    } else {
      navigate("/", { replace: true });
    }
  } catch (err: any) {
    if (err.response?.status === 401) {
      setError("Invalid email or password");
    } else {
      setError("Something went wrong. Please try again.");
    }
  } finally {
    setIsLoading(false);
  }
};

  return (
    <>
    <Header />
      <div className="pb-20 pt-30 min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 overflow-hidden relative">
      
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20"></div>

      {/* Floating Gradient Orbs */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-500"></div>

      {/* Registration Card */}
      <div className="relative z-10 w-full max-w-2xl">
        <article
          className="group relative bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-8 sm:p-10 shadow-2xl hover:border-cyan-500/50 transition-all duration-500 hover:shadow-cyan-500/20"
          aria-labelledby="register-heading"
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
                    <Logo className="w-10 h-10"/>
                  </div>
                </div>
              </div>
              
              <div>
                <h1
                  id="register-heading"
                  className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent"
                >
                  Join RoboClub
                </h1>
                <p className="text-slate-400 text-sm mt-2">
                  Create your account in just a few steps
                </p>
              </div>
            </div>

            {/* Step Indicator */}
            <div className="flex items-center justify-center gap-3">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center gap-3">
                  <div
                    className={`
                      w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300
                      ${currentStep === step
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/30'
                        : currentStep > step
                        ? 'bg-cyan-500/20 text-cyan-400 border-2 border-cyan-500/30'
                        : 'bg-slate-700/30 text-slate-500 border-2 border-slate-600/30'
                      }
                    `}
                  >
                    {currentStep > step ? <CheckCircle2 className="w-5 h-5" /> : step}
                  </div>
                  {step < 3 && (
                    <div className={`w-12 h-0.5 transition-colors duration-300 ${currentStep > step ? 'bg-cyan-500' : 'bg-slate-700/50'}`}></div>
                  )}
                </div>
              ))}
            </div>

            {/* Step Labels */}
            <div className="flex justify-center gap-8 text-xs text-slate-400">
              <span className={currentStep === 1 ? 'text-cyan-400 font-semibold' : ''}>Basic Info</span>
              <span className={currentStep === 2 ? 'text-cyan-400 font-semibold' : ''}>Verification</span>
              <span className={currentStep === 3 ? 'text-cyan-400 font-semibold' : ''}>Final Details</span>
            </div>

            {/* Step 1: Basic Information */}
            {currentStep === 1 && (
              <form onSubmit={(e) => { e.preventDefault(); handleNext(); }} className="space-y-5 animate-fadeIn">
                {/* name */}
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium text-slate-300">
                    Full Name <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <User className="w-5 h-5 text-slate-400" />
                    </div>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Your full name"
                      className={`
                        w-full pl-12 pr-4 py-3.5 bg-slate-900/50 backdrop-blur-sm border-2 rounded-lg
                        text-white placeholder-slate-500 transition-all duration-300 focus:outline-none
                        ${errors.name ? 'border-red-500' : 'border-slate-700/50 focus:border-cyan-400 focus:shadow-lg focus:shadow-cyan-500/20'}
                      `}
                      aria-label="Full name"
                    />
                  </div>
                  {errors.name && <p className="text-sm text-red-400">{errors.name}</p>}
                </div>
                {/* Email */}
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-slate-300">
                    Email Address <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail className="w-5 h-5 text-slate-400" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="your.email@example.com"
                      className={`
                        w-full pl-12 pr-4 py-3.5 bg-slate-900/50 backdrop-blur-sm border-2 rounded-lg
                        text-white placeholder-slate-500 transition-all duration-300 focus:outline-none
                        ${errors.email ? 'border-red-500' : 'border-slate-700/50 focus:border-cyan-400 focus:shadow-lg focus:shadow-cyan-500/20'}
                      `}
                      aria-label="Email address"
                    />
                  </div>
                  {errors.email && <p className="text-sm text-red-400">{errors.email}</p>}
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <label htmlFor="password" className="block text-sm font-medium text-slate-300">
                    Password <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className="w-5 h-5 text-slate-400" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      placeholder="Enter a strong password"
                      className={`
                        w-full pl-12 pr-12 py-3.5 bg-slate-900/50 backdrop-blur-sm border-2 rounded-lg
                        text-white placeholder-slate-500 transition-all duration-300 focus:outline-none
                        ${errors.password ? 'border-red-500' : 'border-slate-700/50 focus:border-cyan-400 focus:shadow-lg focus:shadow-cyan-500/20'}
                      `}
                      aria-label="Password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-cyan-400 transition-colors duration-300"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {errors.password && <p className="text-sm text-red-400">{errors.password}</p>}
                </div>

                {/* Age & Role */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label htmlFor="age" className="block text-sm font-medium text-slate-300">
                      Age <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="date"
                      id="age"
                      value={formData.age}
                      onChange={(e) => handleInputChange('age', e.target.value)}
                      placeholder="18"
                      className={`
                        w-full px-4 py-3.5 bg-slate-900/50 backdrop-blur-sm border-2 rounded-lg
                        text-white placeholder-slate-500 transition-all duration-300 focus:outline-none
                        ${errors.age ? 'border-red-500' : 'border-slate-700/50 focus:border-cyan-400 focus:shadow-lg focus:shadow-cyan-500/20'}
                      `}
                      aria-label="Age"
                    />
                    {errors.age && <p className="text-sm text-red-400">{errors.age}</p>}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="role" className="block text-sm font-medium text-slate-300">
                      Role <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <User className="w-5 h-5 text-slate-400" />
                      </div>
                      <select
                        id="role"
                        value={formData.role}
                        onChange={(e) => handleInputChange('role', e.target.value as 'User' | 'Join Team')}
                        className="w-full pl-12 pr-4 py-3.5 bg-slate-900/50 backdrop-blur-sm border-2 border-slate-700/50 rounded-lg text-white transition-all duration-300 focus:outline-none focus:border-cyan-400 focus:shadow-lg focus:shadow-cyan-500/20 appearance-none cursor-pointer"
                        aria-label="Role"
                      >
                        <option value="User">User</option>
                        <option value="Join Team">Join Team</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <label htmlFor="phone" className="block text-sm font-medium text-slate-300">
                    Phone Number <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Phone className="w-5 h-5 text-slate-400" />
                    </div>
                    <input
                      type="tel"
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="+1 (555) 123-4567"
                      className={`
                        w-full pl-12 pr-4 py-3.5 bg-slate-900/50 backdrop-blur-sm border-2 rounded-lg
                        text-white placeholder-slate-500 transition-all duration-300 focus:outline-none
                        ${errors.phone ? 'border-red-500' : 'border-slate-700/50 focus:border-cyan-400 focus:shadow-lg focus:shadow-cyan-500/20'}
                      `}
                      aria-label="Phone number"
                    />
                  </div>
                  {errors.phone && <p className="text-sm text-red-400">{errors.phone}</p>}
                </div>

                {/* Next Button */}
                <button
                  type="submit"
                  className="group/btn relative w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg font-semibold text-white shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Next Step
                    <ChevronRight className="w-5 h-5" />
                  </span>
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                </button>
              </form>
            )}

            {/* Step 2: Verification */}
            {currentStep === 2 && (
              <form onSubmit={(e) => { e.preventDefault(); handleNext(); }} className="space-y-6 animate-fadeIn">
                <div className="text-center space-y-3 py-4">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full flex items-center justify-center border-2 border-cyan-500/30">
                    <Mail className="w-8 h-8 text-cyan-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Check Your Email</h3>
                  <p className="text-slate-400">
                    We've sent a verification code to <span className="text-cyan-400 font-semibold">{formData.email}</span>
                  </p>
                  <p className="text-xs text-slate-500">
                    (Demo: use code <span className="text-cyan-400 font-mono">123456</span>)
                  </p>
                </div>

                <div className="space-y-2">
                  <label htmlFor="code" className="block text-sm font-medium text-slate-300">
                    Verification Code <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Hash className="w-5 h-5 text-slate-400" />
                    </div>
                    <input
                      type="text"
                      id="code"
                      value={formData.verificationCode}
                      onChange={(e) => handleInputChange('verificationCode', e.target.value)}
                      placeholder="Enter 6-digit code"
                      maxLength={6}
                      className={`
                        w-full pl-12 pr-4 py-3.5 bg-slate-900/50 backdrop-blur-sm border-2 rounded-lg
                        text-white placeholder-slate-500 text-center text-2xl tracking-widest font-mono
                        transition-all duration-300 focus:outline-none
                        ${errors.verificationCode ? 'border-red-500' : 'border-slate-700/50 focus:border-cyan-400 focus:shadow-lg focus:shadow-cyan-500/20'}
                      `}
                      aria-label="Verification code"
                    />
                  </div>
                  {errors.verificationCode && <p className="text-sm text-red-400">{errors.verificationCode}</p>}
                </div>

                <button
                  type="button"
                  className="text-sm text-slate-400 hover:text-cyan-400 transition-colors duration-300"
                >
                  Didn't receive the code? Resend
                </button>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="flex-1 px-6 py-4 bg-slate-900/50 backdrop-blur-sm border-2 border-slate-700 rounded-lg font-semibold text-white hover:border-slate-600 hover:bg-slate-800/50 transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2"
                  >
                    <ChevronLeft className="w-5 h-5" />
                    Back
                  </button>
                  
                  <button
                    type="submit"
                    className="flex-1 group/btn relative px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg font-semibold text-white shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Verify & Continue
                      <ChevronRight className="w-5 h-5" />
                    </span>
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                  </button>
                </div>
              </form>
            )}

            {/* Step 3: Other Information */}
            {currentStep === 3 && (
              <form onSubmit={handleSubmit} className="space-y-5 animate-fadeIn">
                <div className="text-center pb-4">
                  <h3 className="text-xl font-bold text-white">Almost There!</h3>
                  <p className="text-slate-400 text-sm mt-1">Just a few more details to complete your profile</p>
                </div>

                {dynamicFields.map((field) => (
                  <div key={field.id} className="space-y-2">
                    <label htmlFor={field.id} className="block text-sm font-medium text-slate-300">
                      {field.label} {field.required && <span className="text-red-400">*</span>}
                    </label>
                    <input
                      type={field.type}
                      id={field.id}
                      value={formData.otherInfo[field.id] || ''}
                      onChange={(e) => handleDynamicInputChange(field.id, e.target.value)}
                      placeholder={`Enter your ${field.label.toLowerCase()}`}
                      className={`
                        w-full px-4 py-3.5 bg-slate-900/50 backdrop-blur-sm border-2 rounded-lg
                        text-white placeholder-slate-500 transition-all duration-300 focus:outline-none
                        ${errors[field.id] ? 'border-red-500' : 'border-slate-700/50 focus:border-cyan-400 focus:shadow-lg focus:shadow-cyan-500/20'}
                      `}
                      aria-label={field.label}
                    />
                    {errors[field.id] && <p className="text-sm text-red-400">{errors[field.id]}</p>}
                  </div>
                ))}

                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="flex-1 px-6 py-4 bg-slate-900/50 backdrop-blur-sm border-2 border-slate-700 rounded-lg font-semibold text-white hover:border-slate-600 hover:bg-slate-800/50 transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2"
                  >
                    <ChevronLeft className="w-5 h-5" />
                    Back
                  </button>
                  
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 group/btn relative px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg font-semibold text-white shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      {isLoading ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Creating Account...
                        </>
                      ) : (
                        <>
                          Complete Registration
                          <CheckCircle2 className="w-5 h-5" />
                        </>
                      )}
                    </span>
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                  </button>
                </div>
              </form>
            )}

          </div>

          {/* Bottom Accent Line */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-b-2xl"></div>
        </article>

        {/* Login Link */}
        <p className="mt-8 text-center text-sm text-slate-400">
          Already have an account?{' '}
          <a href="/login" className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors duration-300">
            Sign in here
          </a>
        </p>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
    <Footer />
    </>
  );
}