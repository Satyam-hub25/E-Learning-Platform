"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface Student {
  id: string;
  name: string;
  avatar: string;
  level: number;
  xp: number;
  streak: number;
  lessonsCompleted: number;
  lastActive: string;
  performance: 'Excellent' | 'Good' | 'Needs Help';
}

interface Assignment {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  submitted: number;
  total: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

const students: Student[] = [
  {
    id: '1',
    name: 'Alex Kumar',
    avatar: '👦',
    level: 12,
    xp: 3450,
    streak: 15,
    lessonsCompleted: 45,
    lastActive: '2 hours ago',
    performance: 'Excellent'
  },
  {
    id: '2',
    name: 'Priya Sharma',
    avatar: '👧',
    level: 11,
    xp: 3200,
    streak: 12,
    lessonsCompleted: 42,
    lastActive: '1 day ago',
    performance: 'Good'
  },
  {
    id: '3',
    name: 'Raj Patel',
    avatar: '👦',
    level: 8,
    xp: 2100,
    streak: 5,
    lessonsCompleted: 28,
    lastActive: '3 days ago',
    performance: 'Needs Help'
  }
];

const assignments: Assignment[] = [
  {
    id: '1',
    title: 'Mathematics Quiz Chapter 5',
    subject: 'Mathematics',
    dueDate: '2025-09-25',
    submitted: 18,
    total: 25,
    difficulty: 'Medium'
  },
  {
    id: '2',
    title: 'Science Project: Solar System',
    subject: 'Science',
    dueDate: '2025-09-30',
    submitted: 12,
    total: 25,
    difficulty: 'Hard'
  }
];

export default function TeacherDashboard() {
  const [activeTab, setActiveTab] = useState<'students' | 'assignments'>('students');

  const getPerformanceColor = (performance: Student['performance']) => {
    switch (performance) {
      case 'Excellent': return 'text-green-400 bg-green-400/20';
      case 'Good': return 'text-yellow-400 bg-yellow-400/20';
      case 'Needs Help': return 'text-red-400 bg-red-400/20';
    }
  };

  const getDifficultyColor = (difficulty: Assignment['difficulty']) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-400 bg-green-400/20';
      case 'Medium': return 'text-yellow-400 bg-yellow-400/20';
      case 'Hard': return 'text-red-400 bg-red-400/20';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-fuchsia-900 text-white p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              👩‍🏫 Teacher Dashboard
            </h1>
            <p className="text-white/80 mt-1">Monitor student progress and manage assignments</p>
          </div>
          
          <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-semibold hover:shadow-lg transition-all">
            + Create Assignment
          </button>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-4">
          {[
            { label: 'Total Students', value: '25', icon: '👥', color: 'from-blue-500 to-cyan-500' },
            { label: 'Active Today', value: '18', icon: '🟢', color: 'from-green-500 to-emerald-500' },
            { label: 'Assignments Due', value: '3', icon: '📝', color: 'from-orange-500 to-red-500' },
            { label: 'Avg. Performance', value: '85%', icon: '📊', color: 'from-purple-500 to-pink-500' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/10"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-white/60 text-sm">{stat.label}</div>
                </div>
                <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${stat.color} flex items-center justify-center text-xl`}>
                  {stat.icon}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tab Navigation */}
        <div className="bg-white/10 rounded-lg p-1 flex w-fit">
          {(['students', 'assignments'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-md font-medium transition-all capitalize ${
                activeTab === tab
                  ? 'bg-white/20 text-white shadow-lg'
                  : 'text-white/60 hover:text-white/80'
              }`}
            >
              {tab === 'students' ? '👥 Students' : '📝 Assignments'}
            </button>
          ))}
        </div>

        {/* Content */}
        {activeTab === 'students' ? (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Student Monitoring</h2>
            {students.map((student, index) => (
              <motion.div
                key={student.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:bg-white/15 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-3xl">{student.avatar}</span>
                    <div>
                      <h3 className="font-semibold text-lg">{student.name}</h3>
                      <p className="text-white/60">Level {student.level} • {student.xp} XP</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <div className="text-lg font-bold">{student.streak}</div>
                      <div className="text-xs text-white/60">Day Streak</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold">{student.lessonsCompleted}</div>
                      <div className="text-xs text-white/60">Lessons</div>
                    </div>
                    <div className="text-center">
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${getPerformanceColor(student.performance)}`}>
                        {student.performance}
                      </div>
                      <div className="text-xs text-white/60 mt-1">{student.lastActive}</div>
                    </div>
                    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm transition-all">
                      View Details
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Assignment Management</h2>
            {assignments.map((assignment, index) => (
              <motion.div
                key={assignment.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/10"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">{assignment.title}</h3>
                    <p className="text-white/60">{assignment.subject}</p>
                  </div>
                  
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <div className="text-lg font-bold">{assignment.submitted}/{assignment.total}</div>
                      <div className="text-xs text-white/60">Submitted</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-white/80">Due: {assignment.dueDate}</div>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium mt-1 ${getDifficultyColor(assignment.difficulty)}`}>
                        {assignment.difficulty}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-sm transition-all">
                        Review
                      </button>
                      <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm transition-all">
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="mt-4">
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(assignment.submitted / assignment.total) * 100}%` }}
                      transition={{ duration: 1, delay: index * 0.2 }}
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}