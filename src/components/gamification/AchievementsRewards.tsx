"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
  unlocked: boolean;
  progress?: number;
  maxProgress?: number;
  reward: string;
}

const achievements: Achievement[] = [
  {
    id: '1',
    title: 'First Steps',
    description: 'Complete your first lesson',
    icon: '👶',
    rarity: 'Common',
    unlocked: true,
    reward: '+50 XP'
  },
  {
    id: '2',
    title: 'Speed Demon',
    description: 'Complete 5 lessons in one day',
    icon: '⚡',
    rarity: 'Rare',
    unlocked: true,
    reward: '+200 XP'
  },
  {
    id: '3',
    title: 'Perfect Score',
    description: 'Get 100% on 10 quizzes',
    icon: '🎯',
    rarity: 'Epic',
    unlocked: false,
    progress: 7,
    maxProgress: 10,
    reward: '+500 XP'
  },
  {
    id: '4',
    title: 'Knowledge Master',
    description: 'Complete all courses in Mathematics',
    icon: '👑',
    rarity: 'Legendary',
    unlocked: false,
    progress: 3,
    maxProgress: 8,
    reward: '+1000 XP + Special Badge'
  }
];

export default function AchievementsRewards() {
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);

  const getRarityColor = (rarity: Achievement['rarity']) => {
    switch (rarity) {
      case 'Common': return 'from-gray-500 to-gray-600';
      case 'Rare': return 'from-blue-500 to-blue-600';
      case 'Epic': return 'from-purple-500 to-purple-600';
      case 'Legendary': return 'from-yellow-500 to-orange-500';
    }
  };

  const getRarityBorder = (rarity: Achievement['rarity']) => {
    switch (rarity) {
      case 'Common': return 'border-gray-400';
      case 'Rare': return 'border-blue-400';
      case 'Epic': return 'border-purple-400';
      case 'Legendary': return 'border-yellow-400 shadow-yellow-400/20';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          🏆 Achievements & Rewards
        </h2>
        <div className="text-right">
          <div className="text-sm text-white/60">Total XP Earned</div>
          <div className="text-2xl font-bold text-yellow-400">2,450</div>
        </div>
      </div>

      {/* Achievement Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {achievements.map((achievement, index) => (
          <motion.div
            key={achievement.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => setSelectedAchievement(achievement)}
            className={`relative rounded-2xl p-6 border-2 cursor-pointer transition-all duration-300 hover:scale-105 ${
              achievement.unlocked 
                ? `bg-gradient-to-br ${getRarityColor(achievement.rarity)}/20 ${getRarityBorder(achievement.rarity)} shadow-lg`
                : 'bg-white/5 border-white/10 opacity-60'
            }`}
          >
            {achievement.unlocked && (
              <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-bounce">
                ✓ Unlocked
              </div>
            )}

            <div className="flex items-start gap-4">
              <div className="text-4xl">{achievement.icon}</div>
              <div className="flex-1">
                <h3 className="font-bold text-white text-lg">{achievement.title}</h3>
                <p className="text-white/80 text-sm mb-2">{achievement.description}</p>
                
                <div className="flex items-center gap-2 mb-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${getRarityColor(achievement.rarity)} text-white`}>
                    {achievement.rarity}
                  </span>
                  <span className="text-yellow-400 text-sm font-medium">{achievement.reward}</span>
                </div>

                {/* Progress Bar for Locked Achievements */}
                {!achievement.unlocked && achievement.progress !== undefined && (
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-white/60">
                      <span>Progress</span>
                      <span>{achievement.progress}/{achievement.maxProgress}</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(achievement.progress! / achievement.maxProgress!) * 100}%` }}
                        transition={{ duration: 1, delay: index * 0.2 }}
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Reward Collection Animation */}
      <AnimatePresence>
        {selectedAchievement && selectedAchievement.unlocked && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={() => setSelectedAchievement(null)}
          >
            <motion.div
              initial={{ scale: 0.5, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.5, y: 50 }}
              className="bg-gradient-to-br from-purple-900 to-blue-900 p-8 rounded-3xl border border-purple-400 shadow-2xl text-center max-w-md mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
                className="text-6xl mb-4"
              >
                {selectedAchievement.icon}
              </motion.div>
              <h3 className="text-2xl font-bold text-white mb-2">{selectedAchievement.title}</h3>
              <p className="text-white/80 mb-4">{selectedAchievement.description}</p>
              <div className="text-yellow-400 text-xl font-bold mb-4">{selectedAchievement.reward}</div>
              <button 
                onClick={() => setSelectedAchievement(null)}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
              >
                Awesome! 🎉
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}