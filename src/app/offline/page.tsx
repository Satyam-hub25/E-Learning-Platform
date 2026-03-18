"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface DownloadableLesson {
  id: string;
  title: string;
  subject: string;
  duration: string;
  size: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  downloadProgress?: number;
  isDownloaded: boolean;
  isDownloading: boolean;
}

interface LanguageOption {
  code: string;
  name: string;
  flag: string;
  isSupported: boolean;
}

const lessons: DownloadableLesson[] = [
  {
    id: '1',
    title: 'Introduction to Algebra',
    subject: 'Mathematics',
    duration: '45 min',
    size: '120 MB',
    difficulty: 'Beginner',
    description: 'Learn the basics of algebraic expressions and equations',
    isDownloaded: true,
    isDownloading: false
  },
  {
    id: '2',
    title: 'Solar System Exploration',
    subject: 'Science',
    duration: '60 min',
    size: '250 MB',
    difficulty: 'Intermediate',
    description: 'Journey through our solar system and learn about planets',
    isDownloaded: false,
    isDownloading: false
  },
  {
    id: '3',
    title: 'Creative Writing Workshop',
    subject: 'English',
    duration: '30 min',
    size: '85 MB',
    difficulty: 'Advanced',
    description: 'Develop your creative writing skills with interactive exercises',
    isDownloaded: false,
    isDownloading: false
  }
];

const languages: LanguageOption[] = [
  { code: 'en', name: 'English', flag: '🇺🇸', isSupported: true },
  { code: 'hi', name: 'हिंदी', flag: '🇮🇳', isSupported: true },
  { code: 'es', name: 'Español', flag: '🇪🇸', isSupported: true },
  { code: 'fr', name: 'Français', flag: '🇫🇷', isSupported: true },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪', isSupported: true },
  { code: 'ja', name: '日本語', flag: '🇯🇵', isSupported: false },
  { code: 'ko', name: '한국어', flag: '🇰🇷', isSupported: false },
  { code: 'zh', name: '中文', flag: '🇨🇳', isSupported: false }
];

export default function OfflineAndLanguage() {
  const [activeTab, setActiveTab] = useState<'offline' | 'language'>('offline');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [lessonsData, setLessonsData] = useState(lessons);
  const [isTranslating, setIsTranslating] = useState(false);
  const [storageUsed, setStorageUsed] = useState(455); // MB
  const [totalStorage, setTotalStorage] = useState(2048); // MB

  const getDifficultyColor = (difficulty: DownloadableLesson['difficulty']) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-400 bg-green-400/20';
      case 'Intermediate': return 'text-yellow-400 bg-yellow-400/20';
      case 'Advanced': return 'text-red-400 bg-red-400/20';
    }
  };

  const handleDownload = (lessonId: string) => {
    setLessonsData(prev => prev.map(lesson => 
      lesson.id === lessonId 
        ? { ...lesson, isDownloading: true, downloadProgress: 0 }
        : lesson
    ));

    // Simulate download progress
    const interval = setInterval(() => {
      setLessonsData(prev => prev.map(lesson => {
        if (lesson.id === lessonId && lesson.downloadProgress !== undefined) {
          const newProgress = lesson.downloadProgress + 10;
          if (newProgress >= 100) {
            clearInterval(interval);
            return { 
              ...lesson, 
              downloadProgress: 100, 
              isDownloaded: true, 
              isDownloading: false 
            };
          }
          return { ...lesson, downloadProgress: newProgress };
        }
        return lesson;
      }));
    }, 300);
  };

  const handleLanguageChange = (languageCode: string) => {
    setIsTranslating(true);
    setSelectedLanguage(languageCode);
    
    // Simulate translation process
    setTimeout(() => {
      setIsTranslating(false);
    }, 2000);
  };

  const handleDeleteDownload = (lessonId: string) => {
    setLessonsData(prev => prev.map(lesson => 
      lesson.id === lessonId 
        ? { ...lesson, isDownloaded: false, downloadProgress: undefined }
        : lesson
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-fuchsia-900 text-white p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
            📱 Offline & Language Features
          </h1>
          <p className="text-white/80 mt-2">Download lessons for offline access and learn in your preferred language</p>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white/10 rounded-lg p-1 flex w-fit mx-auto">
          {(['offline', 'language'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-8 py-3 rounded-md font-medium transition-all capitalize ${
                activeTab === tab
                  ? 'bg-white/20 text-white shadow-lg'
                  : 'text-white/60 hover:text-white/80'
              }`}
            >
              {tab === 'offline' ? '📥 Offline Lessons' : '🌍 Languages'}
            </button>
          ))}
        </div>

        {/* Offline Tab */}
        {activeTab === 'offline' && (
          <div className="space-y-6">
            
            {/* Storage Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/10"
            >
              <h3 className="text-xl font-semibold mb-4">💾 Storage Usage</h3>
              <div className="flex items-center justify-between mb-2">
                <span>Used: {storageUsed} MB</span>
                <span>Available: {totalStorage - storageUsed} MB</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-3">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(storageUsed / totalStorage) * 100}%` }}
                  transition={{ duration: 1 }}
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                />
              </div>
              <div className="text-right text-sm text-white/60 mt-1">
                {Math.round((storageUsed / totalStorage) * 100)}% Used
              </div>
            </motion.div>

            {/* Download Management */}
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">📚 Available Lessons</h3>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm transition-all">
                  📥 Download All
                </button>
                <button className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm transition-all">
                  🗑️ Clear Cache
                </button>
              </div>
            </div>

            {/* Lessons List */}
            <div className="grid gap-4">
              {lessonsData.map((lesson, index) => (
                <motion.div
                  key={lesson.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/10"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold text-lg">{lesson.title}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(lesson.difficulty)}`}>
                          {lesson.difficulty}
                        </span>
                        {lesson.isDownloaded && (
                          <span className="text-green-400 text-sm">✓ Downloaded</span>
                        )}
                      </div>
                      <p className="text-white/60 text-sm mb-3">{lesson.description}</p>
                      <div className="flex items-center gap-4 text-sm text-white/60">
                        <span>📚 {lesson.subject}</span>
                        <span>⏱️ {lesson.duration}</span>
                        <span>💾 {lesson.size}</span>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2 ml-4">
                      {lesson.isDownloading ? (
                        <div className="w-32">
                          <div className="flex justify-between text-xs mb-1">
                            <span>Downloading...</span>
                            <span>{lesson.downloadProgress}%</span>
                          </div>
                          <div className="w-full bg-white/10 rounded-full h-2">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${lesson.downloadProgress}%` }}
                              className="h-full bg-gradient-to-r from-green-500 to-blue-500 rounded-full"
                            />
                          </div>
                        </div>
                      ) : lesson.isDownloaded ? (
                        <div className="flex gap-2">
                          <button className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-sm transition-all">
                            ▶️ Play
                          </button>
                          <button 
                            onClick={() => handleDeleteDownload(lesson.id)}
                            className="px-3 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm transition-all"
                          >
                            🗑️
                          </button>
                        </div>
                      ) : (
                        <button 
                          onClick={() => handleDownload(lesson.id)}
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm transition-all"
                        >
                          📥 Download
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Language Tab */}
        {activeTab === 'language' && (
          <div className="space-y-6">
            
            {/* Current Language */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/10 text-center"
            >
              <h3 className="text-xl font-semibold mb-4">🌐 Current Language</h3>
              <div className="flex items-center justify-center gap-3 text-2xl">
                <span>{languages.find(lang => lang.code === selectedLanguage)?.flag}</span>
                <span className="font-semibold">{languages.find(lang => lang.code === selectedLanguage)?.name}</span>
              </div>
              {isTranslating && (
                <div className="mt-4">
                  <div className="flex items-center justify-center gap-2 text-blue-400">
                    <div className="animate-spin">🔄</div>
                    <span>Translating content...</span>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Language Selection */}
            <div>
              <h3 className="text-xl font-semibold mb-4">📱 Available Languages</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {languages.map((language, index) => (
                  <motion.div
                    key={language.code}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className={`bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/10 cursor-pointer transition-all hover:bg-white/20 ${
                      selectedLanguage === language.code ? 'ring-2 ring-blue-400' : ''
                    } ${!language.isSupported ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={() => language.isSupported && handleLanguageChange(language.code)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{language.flag}</span>
                        <span className="font-medium">{language.name}</span>
                      </div>
                      {selectedLanguage === language.code && (
                        <span className="text-green-400">✓</span>
                      )}
                      {!language.isSupported && (
                        <span className="text-orange-400 text-xs">Coming Soon</span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Translation Settings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/10"
            >
              <h3 className="text-xl font-semibold mb-4">⚙️ Translation Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Auto-translate new content</div>
                    <div className="text-sm text-white/60">Automatically translate new lessons and materials</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Voice narration</div>
                    <div className="text-sm text-white/60">Enable audio narration in selected language</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Download translations</div>
                    <div className="text-sm text-white/60">Cache translations for offline access</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}