"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface LearningPath {
  id: string;
  title: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  progress: number;
  recommended: boolean;
  estimatedTime: string;
  subjects: string[];
}

const learningPaths: LearningPath[] = [
  {
    id: '1',
    title: 'Mathematics Fundamentals',
    difficulty: 'Beginner',
    progress: 65,
    recommended: true,
    estimatedTime: '2 weeks',
    subjects: ['Arithmetic', 'Basic Algebra', 'Geometry']
  },
  {
    id: '2',
    title: 'Science Explorer',
    difficulty: 'Intermediate',
    progress: 30,
    recommended: true,
    estimatedTime: '3 weeks',
    subjects: ['Physics', 'Chemistry', 'Biology']
  },
  {
    id: '3',
    title: 'English Mastery',
    difficulty: 'Beginner',
    progress: 80,
    recommended: false,
    estimatedTime: '1 week',
    subjects: ['Grammar', 'Vocabulary', 'Reading']
  }
];

export default function AdaptiveLearningPaths() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">🎯 Recommended Learning Paths</h2>
        <span className="text-sm text-white/60">AI-Powered Recommendations</span>
      </div>

      <div className="grid gap-4">
        {learningPaths.map((path, index) => (
          <motion.div
            key={path.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`relative rounded-2xl p-6 border transition-all duration-300 hover:scale-[1.02] cursor-pointer ${
              path.recommended 
                ? 'bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-blue-400/30 shadow-lg shadow-blue-500/10' 
                : 'bg-white/10 border-white/10'
            }`}
          >
            {path.recommended && (
              <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-bold px-3 py-1 rounded-full animate-pulse">
                ⭐ AI Recommended
              </div>
            )}

            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">{path.title}</h3>
                <div className="flex items-center gap-4 text-sm text-white/80">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    path.difficulty === 'Beginner' ? 'bg-green-500/20 text-green-400' :
                    path.difficulty === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {path.difficulty}
                  </span>
                  <span>⏱️ {path.estimatedTime}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-white">{path.progress}%</div>
                <div className="text-xs text-white/60">Complete</div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${path.progress}%` }}
                  transition={{ duration: 1, delay: index * 0.2 }}
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                />
              </div>
            </div>

            {/* Subjects */}
            <div className="flex flex-wrap gap-2">
              {path.subjects.map((subject) => (
                <span 
                  key={subject}
                  className="px-3 py-1 bg-white/10 rounded-full text-xs text-white/80"
                >
                  {subject}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}