'use client';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function LoadingSpinner({
  size = 'md',
  className = '',
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-12 w-12',
    lg: 'h-16 w-16',
  };

  return (
    <div
      className={`bg-dark flex min-h-screen items-center justify-center ${className}`}
    >
      <div
        className={`border-primary animate-spin rounded-full border-b-2 ${sizeClasses[size]}`}
      ></div>
    </div>
  );
}
