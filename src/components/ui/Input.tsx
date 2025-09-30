'use client';

import React from 'react';

import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  variant?: 'default' | 'filled' | 'dark';
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = 'text',
      label,
      error,
      variant = 'default',
      fullWidth = false,
      leftIcon,
      rightIcon,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'flex h-10 w-full rounded-md border px-3 py-2 text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50';

    const variants = {
      default:
        'border-gray-300 bg-white text-gray-900 hover:border-primary focus:border-primary',
      filled:
        'border-transparent bg-gray-100 text-gray-900 hover:bg-gray-200 focus:bg-white focus:border-primary',
      dark: 'border-gray-600 bg-gray-800 text-white placeholder:text-gray-400 hover:border-primary focus:border-primary focus:bg-gray-700',
    };

    const errorStyles = error
      ? 'border-red-500 focus-visible:ring-red-500'
      : '';

    return (
      <div className={cn('flex flex-col gap-1', fullWidth && 'w-full')}>
        {label && (
          <label
            className={cn(
              'text-sm font-medium',
              variant === 'dark' ? 'text-gray-200' : 'text-gray-700'
            )}
          >
            {label}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <div
              className={cn(
                'absolute top-1/2 left-3 -translate-y-1/2',
                variant === 'dark' ? 'text-gray-400' : 'text-gray-400'
              )}
            >
              {leftIcon}
            </div>
          )}

          <input
            type={type}
            className={cn(
              baseStyles,
              variants[variant],
              errorStyles,
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              className
            )}
            ref={ref}
            disabled={disabled}
            {...props}
          />

          {rightIcon && (
            <div
              className={cn(
                'absolute top-1/2 right-3 -translate-y-1/2',
                variant === 'dark' ? 'text-gray-400' : 'text-gray-400'
              )}
            >
              {rightIcon}
            </div>
          )}
        </div>

        {error && <span className="text-sm text-red-600">{error}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
