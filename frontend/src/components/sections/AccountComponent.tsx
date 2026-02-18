import React from 'react';
import { Eye, EyeOff, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  required?: boolean;
}

export const FormInput: React.FC<FormInputProps> = ({
  label,
  error,
  helperText,
  leftIcon,
  required,
  className = '',
  ...props
}) => {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-slate-300">
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            {leftIcon}
          </div>
        )}
        <input
          className={`
            w-full bg-slate-700 text-white px-4 py-2.5 rounded-xl 
            border transition-all
            ${error 
              ? 'border-red-500 focus:border-red-400 focus:ring-2 focus:ring-red-500/20' 
              : 'border-slate-600 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20'
            }
            focus:outline-none
            disabled:opacity-50 disabled:cursor-not-allowed
            ${leftIcon ? 'pl-10' : ''}
            ${className}
          `}
          {...props}
        />
      </div>
      {error && (
        <div className="flex items-center gap-1.5 text-sm text-red-400">
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}
      {helperText && !error && (
        <p className="text-sm text-slate-400">{helperText}</p>
      )}
    </div>
  );
};

// ========================================
// PASSWORD INPUT COMPONENT
// ========================================
interface PasswordInputProps extends Omit<FormInputProps, 'type'> {
  showStrength?: boolean;
  strengthValue?: 'weak' | 'medium' | 'strong';
}

export const PasswordInput: React.FC<PasswordInputProps> = ({
  showStrength,
  strengthValue,
  ...props
}) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const strengthColors = {
    weak: 'bg-red-500',
    medium: 'bg-yellow-500',
    strong: 'bg-green-500',
  };

  const strengthWidths = {
    weak: 'w-1/3',
    medium: 'w-2/3',
    strong: 'w-full',
  };

  return (
    <div className="space-y-2">
      <div className="relative">
        <FormInput
          {...props}
          type={showPassword ? 'text' : 'password'}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-[38px] -translate-y-1/2 text-slate-400 hover:text-slate-300 transition-colors"
          tabIndex={-1}
        >
          {showPassword ? (
            <EyeOff className="w-5 h-5" />
          ) : (
            <Eye className="w-5 h-5" />
          )}
        </button>
      </div>

      {showStrength && strengthValue && props.value && (
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400">Password strength</span>
            <span className={`font-medium capitalize ${
              strengthValue === 'weak' ? 'text-red-400' :
              strengthValue === 'medium' ? 'text-yellow-400' :
              'text-green-400'
            }`}>
              {strengthValue}
            </span>
          </div>
          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${strengthColors[strengthValue]} ${strengthWidths[strengthValue]}`}
            />
          </div>
        </div>
      )}
    </div>
  );
};

// ========================================
// FORM TEXTAREA COMPONENT
// ========================================
interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  helperText?: string;
  required?: boolean;
}

export const FormTextarea: React.FC<FormTextareaProps> = ({
  label,
  error,
  helperText,
  required,
  className = '',
  ...props
}) => {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-slate-300">
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>
      <textarea
        className={`
          w-full bg-slate-700 text-white px-4 py-2.5 rounded-xl 
          border transition-all resize-none
          ${error 
            ? 'border-red-500 focus:border-red-400 focus:ring-2 focus:ring-red-500/20' 
            : 'border-slate-600 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20'
          }
          focus:outline-none
          disabled:opacity-50 disabled:cursor-not-allowed
          ${className}
        `}
        {...props}
      />
      {error && (
        <div className="flex items-center gap-1.5 text-sm text-red-400">
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}
      {helperText && !error && (
        <p className="text-sm text-slate-400">{helperText}</p>
      )}
    </div>
  );
};

// ========================================
// BUTTON COMPONENT
// ========================================
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  disabled,
  className = '',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-sm hover:shadow-md',
    secondary: 'bg-slate-700 hover:bg-slate-600 text-slate-200',
    ghost: 'bg-transparent hover:bg-slate-800 text-slate-300 border border-slate-700',
    danger: 'bg-red-600 hover:bg-red-500 text-white',
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm gap-1.5',
    md: 'px-4 py-2.5 text-sm gap-2',
    lg: 'px-6 py-3 text-base gap-2',
  };

  return (
    <button
      className={`
        ${baseStyles} 
        ${variants[variant]} 
        ${sizes[size]} 
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        leftIcon
      )}
      {children}
      {!isLoading && rightIcon}
    </button>
  );
};

// ========================================
// ALERT COMPONENT
// ========================================
interface AlertProps {
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  onClose?: () => void;
}

export const Alert: React.FC<AlertProps> = ({ type, message, onClose }) => {
  const styles = {
    success: {
      container: 'bg-green-500/10 border-green-500/20 text-green-400',
      icon: <CheckCircle2 className="w-5 h-5" />,
    },
    error: {
      container: 'bg-red-500/10 border-red-500/20 text-red-400',
      icon: <AlertCircle className="w-5 h-5" />,
    },
    warning: {
      container: 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400',
      icon: <AlertCircle className="w-5 h-5" />,
    },
    info: {
      container: 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400',
      icon: <AlertCircle className="w-5 h-5" />,
    },
  };

  const config = styles[type];

  return (
    <div className={`px-4 py-3 rounded-xl border ${config.container} flex items-start gap-3`}>
      <div className="flex-shrink-0 mt-0.5">
        {config.icon}
      </div>
      <p className="text-sm font-medium flex-1">{message}</p>
      {onClose && (
        <button
          onClick={onClose}
          className="flex-shrink-0 opacity-60 hover:opacity-100 transition-opacity"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
};

// ========================================
// CARD COMPONENT
// ========================================
interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  description?: string;
  action?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  title,
  description,
  action,
}) => {
  return (
    <div className={`bg-slate-800 rounded-2xl border border-slate-700 ${className}`}>
      {(title || description || action) && (
        <div className="px-6 py-5 border-b border-slate-700">
          <div className="flex items-start justify-between gap-4">
            <div>
              {title && (
                <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
              )}
              {description && (
                <p className="text-sm text-slate-400">{description}</p>
              )}
            </div>
            {action && <div className="flex-shrink-0">{action}</div>}
          </div>
        </div>
      )}
      <div className="p-6">{children}</div>
    </div>
  );
};

// ========================================
// LOADING SPINNER
// ========================================
export const LoadingSpinner: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({ size = 'md' }) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className="flex items-center justify-center py-12">
      <Loader2 className={`${sizes[size]} text-cyan-400 animate-spin`} />
    </div>
  );
};
