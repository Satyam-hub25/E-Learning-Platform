'use client';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  light?: boolean;
}

export function Spinner({ size = 'md', light = false }: SpinnerProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8'
  };

  return (
    <div className="flex justify-center items-center">
      <div className={`animate-spin rounded-full border-2 border-b-transparent ${sizeClasses[size]} ${light ? 'border-white' : 'border-primary-600'}`} />
    </div>
  );
}