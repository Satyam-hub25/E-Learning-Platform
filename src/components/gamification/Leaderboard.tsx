"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface LeaderboardEntry {
  rank: number;
  name: string;
  avatar: string;
  xp: number;
  level: number;
  streak: number;
  isCurrentUser?: boolean;
}

const classLeaderboard: LeaderboardEntry[] = [
  { rank: 1, name: 'Alex Kumar', avatar: '👦', xp: 3450, level: 12, streak: 15 },
  { rank: 2, name: 'Priya Sharma', avatar: '👧', xp: 3200, level: 11, streak: 12 },
  { rank: 3, name: 'You', avatar: '🧑', xp: 2450, level: 9, streak: 7, isCurrentUser: true },
  { rank: 4, name: 'Raj Patel', avatar: '👦', xp: 2100, level: 8, streak: 5 },
  { rank: 5, name: 'Anita Singh', avatar: '👧', xp: 1890, level: 7, streak: 3 },
];

const friendsLeaderboard: LeaderboardEntry[] = [
  { rank: 1, name: 'Best Friend', avatar: '👫', xp: 2800, level: 10, streak: 9 },
  { rank: 2, name: 'You', avatar: '🧑', xp: 2450, level: 9, streak: 7, isCurrentUser: true },
  { rank: 3, name: 'Study Buddy', avatar: '👬', xp: 2200, level: 8, streak: 4 },
  { rank: 4, name: 'Classmate', avatar: '👭', xp: 1950, level: 7, streak: 6 },
];

export default function Leaderboard() {
  const [activeTab, setActiveTab] = useState<'class' | 'friends'>('class');

  const currentLeaderboard = activeTab === 'class' ? classLeaderboard : friendsLeaderboard;

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return '🥇';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return `#${rank}`;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1: return 'from-yellow-400 to-yellow-600';
      case 2: return 'from-gray-300 to-gray-500';
      case 3: return 'from-orange-400 to-orange-600';
      default: return 'from-blue-400 to-purple-500';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          🏅 Leaderboard
        </h2>
        
        {/* Tab Switcher */}
        <div className="bg-white/10 rounded-lg p-1 flex">
          {(['class', 'friends'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all capitalize ${
                activeTab === tab
                  ? 'bg-white/20 text-white shadow-lg'
                  : 'text-white/60 hover:text-white/80'
              }`}
            >
              {tab} {tab === 'class' ? '👥' : '👫'}
            </button>
          ))}
        </div>
      </div>

      {/* Leaderboard List */}
      <div className="space-y-3">
        {currentLeaderboard.map((entry, index) => (
          <motion.div
            key={`${activeTab}-${entry.rank}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`relative rounded-2xl p-4 border transition-all duration-300 hover:scale-[1.02] ${
              entry.isCurrentUser
                ? 'bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-blue-400/50 shadow-lg shadow-blue-500/10'
                : 'bg-white/10 border-white/10'
            }`}
          >
            {entry.isCurrentUser && (
              <div className="absolute -top-2 -right-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                You! 🎯
              </div>
            )}

            <div className="flex items-center gap-4">
              {/* Rank */}
              <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${getRankColor(entry.rank)} flex items-center justify-center font-bold text-white shadow-lg`}>
                {typeof getRankIcon(entry.rank) === 'string' && getRankIcon(entry.rank).startsWith('#') 
                  ? getRankIcon(entry.rank) 
                  : <span className="text-lg">{getRankIcon(entry.rank)}</span>
                }
              </div>

              {/* Avatar & Name */}
              <div className="flex items-center gap-3 flex-1">
                <span className="text-3xl">{entry.avatar}</span>
                <div>
                  <h3 className="font-semibold text-white">{entry.name}</h3>
                  <p className="text-white/60 text-sm">Level {entry.level}</p>
                </div>
              </div>

              {/* Stats */}
              <div className="text-right space-y-1">
                <div className="text-xl font-bold text-white">{entry.xp.toLocaleString()} XP</div>
                <div className="flex items-center gap-2 text-sm text-white/80">
                  <span>🔥 {entry.streak}</span>
                  <span>📈 Level {entry.level}</span>
                </div>
              </div>
            </div>

            {/* XP Progress Bar */}
            <div className="mt-3">
              <div className="w-full bg-white/10 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min((entry.xp / 4000) * 100, 100)}%` }}
                  transition={{ duration: 1, delay: index * 0.2 }}
                  className={`h-full bg-gradient-to-r ${getRankColor(entry.rank)} rounded-full`}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Your Position Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl p-6 border border-purple-400/30"
      >
        <h3 className="text-lg font-semibold text-white mb-3">📊 Your Performance</h3>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-white">#{currentLeaderboard.find(e => e.isCurrentUser)?.rank}</div>
            <div className="text-sm text-white/60">Rank</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white">2,450</div>
            <div className="text-sm text-white/60">XP</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white">7</div>
            <div className="text-sm text-white/60">Day Streak</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}