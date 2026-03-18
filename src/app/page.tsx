'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useAuth } from '@/lib/AuthContext';
import { useState, useEffect } from 'react';

// Floating particles component
const FloatingParticles = () => {
  const [mounted, setMounted] = useState(false);
  const [particles, setParticles] = useState<Array<{x: number, y: number, delay: number, duration: number}>>([]);

  useEffect(() => {
    setMounted(true);
    // Generate particle positions only on client side
    const newParticles = [...Array(20)].map(() => ({
      x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
      y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
      delay: Math.random() * 5,
      duration: Math.random() * 10 + 10
    }));
    setParticles(newParticles);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {particles.map((particle, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-white/20 rounded-full"
          initial={{ 
            x: particle.x, 
            y: particle.y,
            opacity: 0 
          }}
          animate={{ 
            y: [null, particle.y - 100, null],
            opacity: [0, 1, 0]
          }}
          transition={{ 
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay
          }}
        />
      ))}
    </>
  );
};

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-fuchsia-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Particles */}
        <FloatingParticles />
      </div>

      {/* Hero Section */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="pt-20 pb-20 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex justify-center mb-8">
                <motion.div 
                  className="w-24 h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <span className="text-4xl">🎓</span>
                </motion.div>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6">
                <span className="block">Learn and grow with</span>
                <motion.span 
                  className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
                  animate={{ 
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  EduLearn
                </motion.span>
              </h1>
              
              <motion.p 
                className="mt-6 text-xl text-white/80 max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                🚀 A gamified learning platform designed for rural students. 
                Make education engaging, accessible, and fun with AI-powered personalization!
              </motion.p>
              
              <motion.div 
                className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link 
                    href="/login" 
                    className="group relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 flex items-center gap-3 shadow-2xl"
                  >
                    <span className="text-2xl">🎮</span>
                    <span className="text-lg">Start Learning</span>
                    <motion.span
                      className="inline-block"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </Link>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link 
                    href="/about" 
                    className="bg-white/10 backdrop-blur-lg hover:bg-white/20 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 flex items-center gap-3 border border-white/20"
                  >
                    <span className="text-2xl">📚</span>
                    <span className="text-lg">Learn More</span>
                  </Link>
                </motion.div>
              </motion.div>

              {/* Gamification Preview */}
              <motion.div 
                className="mt-16 flex justify-center gap-6 flex-wrap"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                {[
                  { icon: '🏆', label: 'Achievements', color: 'from-yellow-500 to-orange-500' },
                  { icon: '⚡', label: 'XP Points', color: 'from-blue-500 to-cyan-500' },
                  { icon: '🎯', label: 'Quests', color: 'from-green-500 to-emerald-500' },
                  { icon: '👥', label: 'Leaderboard', color: 'from-purple-500 to-pink-500' }
                ].map((item, index) => (
                  <motion.div
                    key={item.label}
                    className={`bg-gradient-to-r ${item.color} rounded-xl p-4 text-center shadow-lg`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 + index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="text-2xl mb-2">{item.icon}</div>
                    <div className="text-white font-semibold text-sm">{item.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-sm text-blue-400 font-semibold tracking-wide uppercase mb-4">🎯 Features</h2>
            <p className="text-4xl md:text-5xl font-extrabold text-white mb-4">
              Everything you need to learn effectively
            </p>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Experience the future of rural education with our comprehensive learning ecosystem
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: '🎮',
                title: 'Interactive Learning',
                description: 'Learn through engaging games, quizzes, and 3D simulations designed for rural contexts',
                color: 'from-blue-500 to-cyan-500',
                bgPattern: 'bg-blue-500/10'
              },
              {
                icon: '📊',
                title: 'Progress Tracking',
                description: 'Track your learning journey with XP points, achievements, and detailed analytics',
                color: 'from-green-500 to-emerald-500',
                bgPattern: 'bg-green-500/10'
              },
              {
                icon: '�',
                title: 'Offline Access',
                description: 'Download lessons and continue learning even without internet connectivity',
                color: 'from-purple-500 to-pink-500',
                bgPattern: 'bg-purple-500/10'
              },
              {
                icon: '🤖',
                title: 'AI Assistant',
                description: 'Get personalized help from our AI tutor powered by Google Gemini',
                color: 'from-orange-500 to-red-500',
                bgPattern: 'bg-orange-500/10'
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                className={`relative rounded-2xl p-6 ${feature.bgPattern} backdrop-blur-lg border border-white/10 hover:border-white/20 transition-all duration-300 group`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}></div>
                
                <motion.div 
                  className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center text-2xl mb-4 shadow-lg`}
                  whileHover={{ rotate: 10 }}
                >
                  {feature.icon}
                </motion.div>
                
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{feature.description}</p>
                
                <motion.div 
                  className="mt-4 flex items-center text-blue-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  whileHover={{ x: 5 }}
                >
                  Learn more →
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Stats Section */}
          <motion.div 
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {[
              { number: '5+', label: 'Educational Games', icon: '🎯' },
              { number: '100+', label: 'Learning Quests', icon: '🏆' },
              { number: '24/7', label: 'AI Support', icon: '🤖' },
              { number: '∞', label: 'Learning Paths', icon: '🚀' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-white/70 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Call to Action */}
          <motion.div 
            className="mt-20 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-lg rounded-3xl p-8 border border-white/10">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Ready to Transform Your Learning? 🚀
              </h3>
              <p className="text-white/80 mb-8 max-w-2xl mx-auto">
                Join thousands of students already learning with EduLearn. Start your gamified learning journey today!
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  href="/login" 
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-2xl"
                >
                  <span className="text-2xl">🎓</span>
                  <span className="text-lg">Start Your Journey</span>
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}