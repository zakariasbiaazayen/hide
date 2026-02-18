import React, { useState, useEffect } from 'react';
import { Send, Users, Plus, Trash2, Sparkles, User, Mail, Phone } from 'lucide-react';
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'

type FieldType = 'text' | 'email' | 'number' | 'select' | 'textarea';

interface Field {
  id: number;
  label: string;
  type: FieldType;
  required?: boolean;
  options?: string[];
  isTeamSize?: boolean;
}

interface TeamMember {
  fullName: string;
  email: string;
  phone: string;
}

interface FormData {
  [key: number]: string;
}

interface PreInscriptionPageProps {
  fields: Field[];
}

function PreInscriptionPage({ fields }: PreInscriptionPageProps) {
  const [formData, setFormData] = useState<FormData>({});
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const teamSizeField = fields.find(f => f.isTeamSize);

  useEffect(() => {
    if (teamSizeField && formData[teamSizeField.id]) {
      const teamSize = parseInt(formData[teamSizeField.id]);
      const currentSize = teamMembers.length;

      if (teamSize > currentSize) {
        const newMembers = Array(teamSize - currentSize).fill(null).map(() => ({
          fullName: '',
          email: '',
          phone: ''
        }));
        setTeamMembers([...teamMembers, ...newMembers]);
      } else if (teamSize < currentSize) {
        setTeamMembers(teamMembers.slice(0, teamSize));
      }
    }
  }, [formData, teamSizeField, teamMembers.length]);

  const handleInputChange = (fieldId: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [fieldId]: value
    }));
  };

  const handleTeamMemberChange = (index: number, field: keyof TeamMember, value: string) => {
    const updated = [...teamMembers];
    updated[index] = {
      ...updated[index],
      [field]: value
    };
    setTeamMembers(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise(resolve => setTimeout(resolve, 1500));

    const submissionData = {
      fields: formData,
      teamMembers: teamMembers.length > 0 ? teamMembers : undefined
    };

    console.log('Form Submission Data:', JSON.stringify(submissionData, null, 2));

    setIsSubmitting(false);
    alert('Form submitted successfully! Check console for data.');
  };

  const renderField = (field: Field) => {
    const isFocused = focusedField === `field-${field.id}`;
    const commonClasses = `
      w-full px-4 py-3.5
      bg-slate-900/50 backdrop-blur-sm
      border-2 rounded-lg
      text-white placeholder-slate-500
      transition-all duration-300
      focus:outline-none
      ${isFocused
        ? 'border-cyan-400 shadow-lg shadow-cyan-500/20'
        : 'border-slate-700/50 hover:border-slate-600'
      }
    `;

    switch (field.type) {
      case 'select':
        return (
          <select
            id={`field-${field.id}`}
            value={formData[field.id] || ''}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
            onFocus={() => setFocusedField(`field-${field.id}`)}
            onBlur={() => setFocusedField(null)}
            required={field.required}
            className={`${commonClasses} appearance-none cursor-pointer`}
          >
            <option value="" disabled>Select an option</option>
            {field.options?.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        );

      case 'textarea':
        return (
          <textarea
            id={`field-${field.id}`}
            value={formData[field.id] || ''}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
            onFocus={() => setFocusedField(`field-${field.id}`)}
            onBlur={() => setFocusedField(null)}
            required={field.required}
            placeholder={`Enter ${field.label.toLowerCase()}`}
            rows={4}
            className={`${commonClasses} resize-none`}
          />
        );

      default:
        return (
          <input
            type={field.type}
            id={`field-${field.id}`}
            value={formData[field.id] || ''}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
            onFocus={() => setFocusedField(`field-${field.id}`)}
            onBlur={() => setFocusedField(null)}
            required={field.required}
            placeholder={`Enter ${field.label.toLowerCase()}`}
            className={commonClasses}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 overflow-hidden relative">
      <Header />
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20"></div>

      {/* Floating Gradient Orbs */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-500"></div>

      <div className="relative z-10">
        
        {/* Hero Header */}
        <section className="relative pb-10 pt-30 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="text-sm font-medium text-cyan-300">Event Registration</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              <span className="block text-white">Event</span>
              <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Pre-Inscription
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Register for our upcoming robotics event. Complete all required fields below to secure your spot. 
              Team registrations will require additional member information.
            </p>
          </div>
        </section>

        {/* Main Form Card */}
        <section className="pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="group relative bg-slate-800/50 backdrop-blur-sm rounded-3xl border border-slate-700/50 p-8 sm:p-12 shadow-2xl hover:border-cyan-500/50 transition-all duration-500 hover:shadow-cyan-500/20">
              
              {/* Gradient Glow on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative z-10">
                <form onSubmit={handleSubmit} className="space-y-8">
                  
                  {/* Dynamic Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {fields.map((field) => (
                      <div 
                        key={field.id} 
                        className={field.type === 'textarea' ? 'md:col-span-2' : ''}
                      >
                        <label 
                          htmlFor={`field-${field.id}`}
                          className="block text-sm font-medium text-slate-300 mb-2"
                        >
                          {field.label}
                          {field.required && <span className="text-cyan-400 ml-1">*</span>}
                        </label>
                        {renderField(field)}
                      </div>
                    ))}
                  </div>

                  {/* Team Members Section */}
                  {teamMembers.length > 0 && (
                    <div className="space-y-6 pt-8 border-t border-slate-700/50">
                      <div className="flex items-center gap-3">
                        <Users className="w-6 h-6 text-cyan-400" />
                        <h3 className="text-2xl font-bold text-white">
                          Team Members Information
                        </h3>
                      </div>

                      <p className="text-slate-400 text-sm">
                        Please provide information for all {teamMembers.length} team member{teamMembers.length > 1 ? 's' : ''} below.
                      </p>

                      {teamMembers.map((member, index) => (
                        <div 
                          key={index}
                          className="relative bg-slate-900/30 backdrop-blur-sm rounded-2xl border border-slate-700/30 p-6 space-y-4"
                        >
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                                <span className="text-white font-bold">{index + 1}</span>
                              </div>
                              <h4 className="text-lg font-semibold text-white">
                                Team Member {index + 1}
                              </h4>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-slate-300 mb-2">
                                Full Name <span className="text-cyan-400">*</span>
                              </label>
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                  <User className="w-4 h-4 text-slate-500" />
                                </div>
                                <input
                                  type="text"
                                  value={member.fullName}
                                  onChange={(e) => handleTeamMemberChange(index, 'fullName', e.target.value)}
                                  onFocus={() => setFocusedField(`member-${index}-name`)}
                                  onBlur={() => setFocusedField(null)}
                                  required
                                  placeholder="John Doe"
                                  className={`
                                    w-full pl-11 pr-4 py-3
                                    bg-slate-900/50 backdrop-blur-sm
                                    border-2 rounded-lg
                                    text-white placeholder-slate-500
                                    transition-all duration-300
                                    focus:outline-none
                                    ${focusedField === `member-${index}-name`
                                      ? 'border-cyan-400 shadow-lg shadow-cyan-500/20'
                                      : 'border-slate-700/50 hover:border-slate-600'
                                    }
                                  `}
                                />
                              </div>
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-slate-300 mb-2">
                                Email <span className="text-cyan-400">*</span>
                              </label>
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                  <Mail className="w-4 h-4 text-slate-500" />
                                </div>
                                <input
                                  type="email"
                                  value={member.email}
                                  onChange={(e) => handleTeamMemberChange(index, 'email', e.target.value)}
                                  onFocus={() => setFocusedField(`member-${index}-email`)}
                                  onBlur={() => setFocusedField(null)}
                                  required
                                  placeholder="john@example.com"
                                  className={`
                                    w-full pl-11 pr-4 py-3
                                    bg-slate-900/50 backdrop-blur-sm
                                    border-2 rounded-lg
                                    text-white placeholder-slate-500
                                    transition-all duration-300
                                    focus:outline-none
                                    ${focusedField === `member-${index}-email`
                                      ? 'border-cyan-400 shadow-lg shadow-cyan-500/20'
                                      : 'border-slate-700/50 hover:border-slate-600'
                                    }
                                  `}
                                />
                              </div>
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-slate-300 mb-2">
                                Phone <span className="text-cyan-400">*</span>
                              </label>
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                  <Phone className="w-4 h-4 text-slate-500" />
                                </div>
                                <input
                                  type="text"
                                  value={member.phone}
                                  onChange={(e) => handleTeamMemberChange(index, 'phone', e.target.value)}
                                  onFocus={() => setFocusedField(`member-${index}-phone`)}
                                  onBlur={() => setFocusedField(null)}
                                  required
                                  placeholder="+1 234 567 8900"
                                  className={`
                                    w-full pl-11 pr-4 py-3
                                    bg-slate-900/50 backdrop-blur-sm
                                    border-2 rounded-lg
                                    text-white placeholder-slate-500
                                    transition-all duration-300
                                    focus:outline-none
                                    ${focusedField === `member-${index}-phone`
                                      ? 'border-cyan-400 shadow-lg shadow-cyan-500/20'
                                      : 'border-slate-700/50 hover:border-slate-600'
                                    }
                                  `}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="pt-6">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group/btn relative w-full px-8 py-5 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl font-bold text-lg text-white shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3"
                    >
                      <span className="relative z-10">
                        {isSubmitting ? 'Submitting Registration...' : 'Complete Pre-Inscription'}
                      </span>
                      {!isSubmitting && (
                        <Send className="relative z-10 w-6 h-6 group-hover/btn:translate-x-1 transition-transform duration-300" />
                      )}
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                    </button>
                  </div>

                  {/* Privacy Notice */}
                  <p className="text-sm text-slate-500 text-center">
                    By submitting this form, you agree to our{' '}
                    <a href="/privacy" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                      Privacy Policy
                    </a>
                    {' '}and{' '}
                    <a href="/terms" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                      Terms of Service
                    </a>
                  </p>
                </form>
              </div>

              {/* Bottom Accent Line */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-b-3xl"></div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
export default function inscription() {
  const mockFields = [
    {
      id: 1,
      label: 'Full Name',
      type: 'text' as const,
      required: true
    },
    {
      id: 2,
      label: 'Email Address',
      type: 'email' as const,
      required: true
    },
    {
      id: 3,
      label: 'Phone Number',
      type: 'text' as const,
      required: true
    },
    {
      id: 4,
      label: 'Age',
      type: 'number' as const,
      required: true
    },
    {
      id: 5,
      label: 'Experience Level',
      type: 'select' as const,
      required: true,
      options: ['Beginner', 'Intermediate', 'Advanced', 'Expert']
    },
    {
      id: 6,
      label: 'Track Preference',
      type: 'select' as const,
      required: true,
      options: [
        'Beginner Track - Introduction to Robotics',
        'Intermediate Track - AI Integration',
        'Advanced Track - Competition Challenge'
      ]
    },
    {
      id: 7,
      label: 'University/School',
      type: 'text' as const,
      required: false
    },
    {
      id: 8,
      label: 'Team Size',
      type: 'select' as const,
      required: true,
      isTeamSize: true,
      options: ['1', '2', '3', '4']
    },
    {
      id: 9,
      label: 'Why do you want to join this event?',
      type: 'textarea' as const,
      required: false
    }
  ];

  return <PreInscriptionPage fields={mockFields} />;
}