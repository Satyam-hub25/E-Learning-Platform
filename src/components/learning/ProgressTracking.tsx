"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface ProgressMetric {
  label: string;
  value: number;
  target: number;
  icon: string;
  color: string;
}

const progressMetrics: ProgressMetric[] = [
  { label: 'Daily Streak', value: 7, target: 30, icon: '🔥', color: 'from-orange-500 to-red-500' },
  { label: 'Lessons Completed', value: 23, target: 50, icon: '📚', color: 'from-blue-500 to-cyan-500' },
  { label: 'Quiz Accuracy', value: 85, target: 90, icon: '🎯', color: 'from-green-500 to-emerald-500' },
  { label: 'Study Hours', value: 12, target: 20, icon: '⏰', color: 'from-purple-500 to-pink-500' }
];

export default function ProgressTracking() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white flex items-center gap-2">
        📊 Your Learning Analytics
      </h2>

      <div className="grid md:grid-cols-2 gap-4">
        {progressMetrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/10"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{metric.icon}</span>
                <div>
                  <h3 className="font-semibold text-white">{metric.label}</h3>
                  <p className="text-white/60 text-sm">Target: {metric.target}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-white">{metric.value}</div>
                <div className="text-sm text-white/60">
                  {Math.round((metric.value / metric.target) * 100)}%
                </div>
              </div>
            </div>

            {/* Progress Ring */}
            <div className="relative">
              <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min((metric.value / metric.target) * 100, 100)}%` }}
                  transition={{ duration: 1, delay: index * 0.2 }}
                  className={`h-full bg-gradient-to-r ${metric.color} rounded-full relative overflow-hidden`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Weekly Progress Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/10"
      >
        <h3 className="text-xl font-semibold text-white mb-4">📈 Weekly Learning Activity</h3>
        <div className="flex items-end justify-between h-32 gap-2">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => {
            const height = Math.random() * 80 + 20; // Random height for demo
            return (
              <div key={day} className="flex-1 flex flex-col items-center">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="w-full bg-gradient-to-t from-blue-500 to-purple-500 rounded-t-lg mb-2 min-h-[4px]"
                />
                <span className="text-xs text-white/60">{day}</span>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}