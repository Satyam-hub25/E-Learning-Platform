"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface ChildProgress {
  id: string;
  name: string;
  avatar: string;
  grade: string;
  level: number;
  xp: number;
  streak: number;
  weeklyHours: number;
  subjects: {
    name: string;
    progress: number;
    grade: string;
    color: string;
  }[];
  recentAchievements: string[];
  upcomingAssignments: {
    title: string;
    subject: string;
    dueDate: string;
    status: 'pending' | 'in-progress' | 'completed';
  }[];
}

const childData: ChildProgress = {
  id: '1',
  name: 'Alex Kumar',
  avatar: '👦',
  grade: '8th Grade',
  level: 12,
  xp: 3450,
  streak: 15,
  weeklyHours: 8.5,
  subjects: [
    { name: 'Mathematics', progress: 78, grade: 'A-', color: 'from-blue-500 to-cyan-500' },
    { name: 'Science', progress: 85, grade: 'A', color: 'from-green-500 to-emerald-500' },
    { name: 'English', progress: 92, grade: 'A+', color: 'from-purple-500 to-pink-500' },
    { name: 'Social Studies', progress: 68, grade: 'B+', color: 'from-orange-500 to-red-500' }
  ],
  recentAchievements: [
    'Math Master - Completed 50 math problems',
    'Science Explorer - Finished 3 experiments',
    'Reading Champion - Read 5 books this month'
  ],
  upcomingAssignments: [
    { title: 'Math Quiz Chapter 5', subject: 'Mathematics', dueDate: '2025-09-25', status: 'pending' },
    { title: 'Science Project', subject: 'Science', dueDate: '2025-09-30', status: 'in-progress' },
    { title: 'English Essay', subject: 'English', dueDate: '2025-10-05', status: 'pending' }
  ]
};

const weeklyActivity = [
  { day: 'Mon', hours: 1.5 },
  { day: 'Tue', hours: 2.0 },
  { day: 'Wed', hours: 1.2 },
  { day: 'Thu', hours: 1.8 },
  { day: 'Fri', hours: 1.0 },
  { day: 'Sat', hours: 0.5 },
  { day: 'Sun', hours: 0.5 }
];

export default function ParentDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'progress' | 'communication'>('overview');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-400 bg-green-400/20';
      case 'in-progress': return 'text-yellow-400 bg-yellow-400/20';
      case 'pending': return 'text-red-400 bg-red-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return 'text-green-400';
    if (grade.startsWith('B')) return 'text-yellow-400';
    if (grade.startsWith('C')) return 'text-orange-400';
    return 'text-red-400';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-fuchsia-900 text-white p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              👨‍👩‍👧‍👦 Parent Dashboard
            </h1>
            <p className="text-white/80 mt-1">Track your child's learning journey and progress</p>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all">
              📊 Generate Report
            </button>
            <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-semibold hover:shadow-lg transition-all">
              💬 Message Teacher
            </button>
          </div>
        </div>

        {/* Child Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/10"
        >
          <div className="flex items-center gap-6">
            <span className="text-6xl">{childData.avatar}</span>
            <div className="flex-1">
              <h2 className="text-2xl font-bold">{childData.name}</h2>
              <p className="text-white/60">{childData.grade}</p>
              <div className="flex items-center gap-6 mt-3">
                <div className="flex items-center gap-2">
                  <span className="text-yellow-400">🏆</span>
                  <span className="font-semibold">Level {childData.level}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-blue-400">⭐</span>
                  <span>{childData.xp} XP</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-orange-400">🔥</span>
                  <span>{childData.streak} day streak</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-400">⏰</span>
                  <span>{childData.weeklyHours}h this week</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <div className="bg-white/10 rounded-lg p-1 flex w-fit">
          {(['overview', 'progress', 'communication'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-md font-medium transition-all capitalize ${
                activeTab === tab
                  ? 'bg-white/20 text-white shadow-lg'
                  : 'text-white/60 hover:text-white/80'
              }`}
            >
              {tab === 'overview' && '📈 Overview'}
              {tab === 'progress' && '📊 Progress'}
              {tab === 'communication' && '💬 Messages'}
            </button>
          ))}
        </div>

        {/* Content based on active tab */}
        {activeTab === 'overview' && (
          <div className="grid lg:grid-cols-2 gap-6">
            
            {/* Subject Progress */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/10"
            >
              <h3 className="text-xl font-semibold mb-4">📚 Subject Progress</h3>
              <div className="space-y-4">
                {childData.subjects.map((subject, index) => (
                  <div key={subject.name} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{subject.name}</span>
                      <span className={`font-bold ${getGradeColor(subject.grade)}`}>
                        {subject.grade}
                      </span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-3">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${subject.progress}%` }}
                        transition={{ duration: 1, delay: index * 0.2 }}
                        className={`h-full bg-gradient-to-r ${subject.color} rounded-full`}
                      />
                    </div>
                    <div className="text-right text-sm text-white/60">
                      {subject.progress}% Complete
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Weekly Activity */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/10"
            >
              <h3 className="text-xl font-semibold mb-4">📅 Weekly Activity</h3>
              <div className="flex items-end justify-between gap-2 h-32">
                {weeklyActivity.map((day, index) => (
                  <div key={day.day} className="flex flex-col items-center flex-1">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${(day.hours / 2) * 100}%` }}
                      transition={{ duration: 0.8, delay: index * 0.1 }}
                      className="bg-gradient-to-t from-blue-500 to-purple-500 rounded-t-md w-full min-h-[4px]"
                    />
                    <div className="text-xs text-white/60 mt-2">{day.day}</div>
                    <div className="text-xs text-white/40">{day.hours}h</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Recent Achievements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/10"
            >
              <h3 className="text-xl font-semibold mb-4">🏆 Recent Achievements</h3>
              <div className="space-y-3">
                {childData.recentAchievements.map((achievement, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3 p-3 bg-white/5 rounded-lg"
                  >
                    <span className="text-yellow-400 text-xl">🏅</span>
                    <span className="text-sm">{achievement}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Upcoming Assignments */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/10"
            >
              <h3 className="text-xl font-semibold mb-4">📝 Upcoming Assignments</h3>
              <div className="space-y-3">
                {childData.upcomingAssignments.map((assignment, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
                  >
                    <div>
                      <div className="font-medium">{assignment.title}</div>
                      <div className="text-xs text-white/60">{assignment.subject}</div>
                    </div>
                    <div className="text-right">
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(assignment.status)}`}>
                        {assignment.status}
                      </div>
                      <div className="text-xs text-white/60 mt-1">{assignment.dueDate}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        )}

        {activeTab === 'progress' && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📊</div>
            <h3 className="text-2xl font-semibold mb-2">Detailed Progress Reports</h3>
            <p className="text-white/60 mb-6">Advanced analytics and detailed progress tracking coming soon!</p>
            <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-semibold">
              Request Custom Report
            </button>
          </div>
        )}

        {activeTab === 'communication' && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">💬</div>
            <h3 className="text-2xl font-semibold mb-2">Teacher Communication</h3>
            <p className="text-white/60 mb-6">Direct messaging with teachers and school updates</p>
            <div className="flex gap-4 justify-center">
              <button className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl font-semibold">
                Message Teacher
              </button>
              <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl font-semibold">
                View Announcements
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}