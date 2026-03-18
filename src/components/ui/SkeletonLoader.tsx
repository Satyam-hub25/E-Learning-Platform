"use client";

import React from 'react';

interface SkeletonLoaderProps {
  className?: string;
  lines?: number;
  height?: string;
}

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ 
  className = '', 
  lines = 1, 
  height = 'h-4' 
}) => {
  return (
    <div className={`animate-pulse ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className={`bg-gray-200 rounded ${height} ${index < lines - 1 ? 'mb-2' : ''}`}
        />
      ))}
    </div>
  );
};

export const QuestionSkeleton: React.FC = () => {
  return (
    <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20 animate-pulse">
      {/* Header skeleton */}
      <div className="flex items-center justify-between mb-6">
        <div className="h-6 bg-gray-200 rounded w-32"></div>
        <div className="flex gap-3">
          <div className="h-8 bg-gray-200 rounded-full w-20"></div>
          <div className="h-8 bg-gray-200 rounded-full w-16"></div>
        </div>
      </div>

      {/* Question skeleton */}
      <div className="mb-8">
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-6 bg-gray-200 rounded w-1/2"></div>
      </div>

      {/* Options skeleton */}
      <div className="space-y-4 mb-8">
        {[1, 2, 3, 4].map((index) => (
          <div key={index} className="p-4 rounded-xl border-2 border-gray-200">
            <div className="h-5 bg-gray-200 rounded w-2/3"></div>
          </div>
        ))}
      </div>

      {/* Button skeleton */}
      <div className="flex justify-center">
        <div className="h-12 bg-gray-200 rounded-xl w-32"></div>
      </div>
    </div>
  );
};

export const SubjectCardSkeleton: React.FC = () => {
  return (
    <div className="bg-gray-200 rounded-2xl p-6 shadow-xl animate-pulse">
      <div className="text-center">
        <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-3"></div>
        <div className="h-6 bg-gray-300 rounded w-24 mx-auto mb-2"></div>
        <div className="mt-4 pt-4 border-t border-gray-300">
          <div className="flex justify-between">
            <div className="h-4 bg-gray-300 rounded w-16"></div>
            <div className="h-4 bg-gray-300 rounded w-20"></div>
          </div>
        </div>
      </div>
    </div>
  );
};